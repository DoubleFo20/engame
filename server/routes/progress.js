// server/routes/progress.js — XP / Progress updates
const express = require('express');
const pool = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// PUT /api/progress/xp — add XP to current user
router.put('/xp', authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        if (typeof amount !== 'number' || amount < 0) {
            return res.status(400).json({ error: 'Invalid XP amount' });
        }

        await pool.query('UPDATE users SET xp = xp + ? WHERE id = ?', [amount, req.user.id]);

        const [rows] = await pool.query(
            'SELECT id, username, name, xp, `rank`, role FROM users WHERE id = ?',
            [req.user.id]
        );

        res.json(rows[0]);
    } catch (err) {
        console.error('Update XP error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/progress — get current user's progress
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, username, name, xp, `rank`, role FROM users WHERE id = ?',
            [req.user.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error('Get progress error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
