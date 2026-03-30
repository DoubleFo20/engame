// server/routes/users.js — User management (Admin) with activity logging
const express = require('express');
const pool = require('../db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Helper: log admin activity
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

// GET /api/users — list all users (admin only)
router.get('/', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, username, name, xp, `rank`, role, is_blocked, created_at FROM users ORDER BY xp DESC'
        );
        res.json(rows);
    } catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/users/:id — update user (admin only)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { name, xp, rank, role } = req.body;
        await pool.query(
            'UPDATE users SET name = ?, xp = ?, `rank` = ?, role = ? WHERE id = ?',
            [name, xp, rank, role, req.params.id]
        );
        const [rows] = await pool.query(
            'SELECT id, username, name, xp, `rank`, role, is_blocked FROM users WHERE id = ?',
            [req.params.id]
        );

        // Log admin action
        await logActivity(req.user.id, 'admin_edit_user', `Admin edited user "${rows[0]?.username}"`, req);

        res.json(rows[0]);
    } catch (err) {
        console.error('Update user error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/users/:id — SOFT DELETE: block user instead of deleting (admin only)
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        // Don't allow blocking admin
        const [user] = await pool.query('SELECT role, username FROM users WHERE id = ?', [req.params.id]);
        if (user.length > 0 && user[0].role === 'admin') {
            return res.status(403).json({ error: 'Cannot block admin user' });
        }
        // Soft delete: set is_blocked = 1
        await pool.query('UPDATE users SET is_blocked = 1 WHERE id = ?', [req.params.id]);

        // Log admin action
        await logActivity(req.user.id, 'admin_block_user', `Admin blocked user "${user[0]?.username}"`, req);

        res.json({ message: 'User blocked (soft deleted)' });
    } catch (err) {
        console.error('Block user error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/users/:id/unblock — Unblock user (admin only)
router.put('/:id/unblock', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [user] = await pool.query('SELECT username FROM users WHERE id = ?', [req.params.id]);
        await pool.query('UPDATE users SET is_blocked = 0 WHERE id = ?', [req.params.id]);

        // Log admin action
        await logActivity(req.user.id, 'admin_unblock_user', `Admin unblocked user "${user[0]?.username}"`, req);

        res.json({ message: 'User unblocked' });
    } catch (err) {
        console.error('Unblock user error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
