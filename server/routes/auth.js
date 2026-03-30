// server/routes/auth.js — Login, Register, Password Reset & Change Password
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { authMiddleware, adminOnly } = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'engame_secret';

// Helper: log activity
async function logActivity(userId, action, details, req) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
        await pool.query(
            'INSERT INTO activity_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)',
            [userId, action, details, ip]
        );
    } catch (e) {
        console.error('Failed to log activity:', e.message);
    }
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid username or password' });

        // Check if user is blocked (soft deleted)
        if (user.is_blocked) return res.status(403).json({ error: 'บัญชีของคุณถูกระงับ (Your account has been blocked)' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '7d' });

        // Log login activity
        await logActivity(user.id, 'login', `User "${user.username}" logged in`, req);

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email || '',
                xp: user.xp,
                rank: user.rank,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, password, name, email } = req.body;
        if (!username || !password || !name || !email) return res.status(400).json({ error: 'All fields required' });

        // Check if username exists
        const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existing.length > 0) return res.status(409).json({ error: 'Username taken!' });

        // Check if email exists
        const [existingEmail] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingEmail.length > 0) return res.status(409).json({ error: 'Email already registered!' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, password, name, email, xp, rank, role) VALUES (?, ?, ?, ?, 0, ?, ?)',
            [username, hashedPassword, name, email, 'Bronze III', 'guest']
        );

        const token = jwt.sign({ id: result.insertId, username, role: 'guest' }, SECRET, { expiresIn: '7d' });

        // Log registration
        await logActivity(result.insertId, 'register', `New user "${username}" registered`, req);

        res.status(201).json({
            token,
            user: {
                id: result.insertId,
                username,
                name,
                email,
                xp: 0,
                rank: 'Bronze III',
                role: 'guest',
            },
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/auth/forgot-password — Verify username + email, then reset password
router.post('/forgot-password', async (req, res) => {
    try {
        const { username, email, newPassword } = req.body;
        if (!username || !email || !newPassword) {
            return res.status(400).json({ error: 'Username, email, and new password required' });
        }
        if (newPassword.length < 3) {
            return res.status(400).json({ error: 'Password must be at least 3 characters' });
        }

        // Verify username + email match
        const [rows] = await pool.query(
            'SELECT id, username, is_blocked FROM users WHERE username = ? AND email = ?',
            [username, email]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'ไม่พบบัญชีที่ตรงกับ Username และ Email นี้' });
        }

        if (rows[0].is_blocked) {
            return res.status(403).json({ error: 'บัญชีนี้ถูกระงับ กรุณาติดต่อ Admin' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, rows[0].id]);

        // Log
        await logActivity(rows[0].id, 'forgot_password', `User "${username}" reset password via email verification`, req);

        res.json({ message: 'รีเซ็ตรหัสผ่านสำเร็จ! กรุณาเข้าสู่ระบบด้วยรหัสใหม่' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/auth/change-password — User changes own password
router.put('/change-password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new password required' });
        }
        if (newPassword.length < 3) {
            return res.status(400).json({ error: 'Password must be at least 3 characters' });
        }

        // Get user from DB
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

        // Verify current password
        const valid = await bcrypt.compare(currentPassword, rows[0].password);
        if (!valid) return res.status(401).json({ error: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);

        // Log
        await logActivity(req.user.id, 'change_password', `User "${req.user.username}" changed password`, req);

        res.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ!' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/auth/reset-password/:id — Admin resets user password
router.put('/reset-password/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 3) {
            return res.status(400).json({ error: 'Password must be at least 3 characters' });
        }

        const [user] = await pool.query('SELECT username FROM users WHERE id = ?', [req.params.id]);
        if (user.length === 0) return res.status(404).json({ error: 'User not found' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.params.id]);

        // Log admin action
        await logActivity(req.user.id, 'admin_reset_password', `Admin reset password for "${user[0].username}"`, req);

        res.json({ message: `Password reset for "${user[0].username}"` });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
