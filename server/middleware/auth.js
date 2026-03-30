// server/middleware/auth.js — JWT authentication middleware
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'engame_secret';

async function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No token provided' });

    const token = header.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: 'Invalid token format' });

    try {
        const decoded = jwt.verify(token, SECRET);

        // Check if user is blocked in database
        const [rows] = await pool.query('SELECT is_blocked, role FROM users WHERE id = ?', [decoded.id]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        if (rows[0].is_blocked) {
            return res.status(403).json({ error: 'บัญชีของคุณถูกระงับ (Your account has been blocked)' });
        }

        req.user = { ...decoded, role: rows[0].role }; // Use latest role from DB
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token expired or invalid' });
    }
}

// Admin-only middleware
function adminOnly(req, res, next) {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

module.exports = { authMiddleware, adminOnly };
