// server/routes/vocab.js — User vocabulary management
const express = require('express');
const pool = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/vocab — get current user's saved vocab
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT uv.id as vocab_id, h.id, h.character_id, h.x, h.y, h.word, h.mean, h.type, uv.created_at
       FROM user_vocab uv
       JOIN hotspots h ON uv.hotspot_id = h.id
       WHERE uv.user_id = ?
       ORDER BY uv.created_at DESC`,
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Get vocab error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/vocab — save word to vocab
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { hotspot_id } = req.body;
        if (!hotspot_id) return res.status(400).json({ error: 'hotspot_id required' });

        const [result] = await pool.query(
            'INSERT IGNORE INTO user_vocab (user_id, hotspot_id) VALUES (?, ?)',
            [req.user.id, hotspot_id]
        );

        if (result.affectedRows === 0) {
            return res.status(409).json({ error: 'Word already saved' });
        }

        res.status(201).json({ message: 'Word saved', id: result.insertId });
    } catch (err) {
        console.error('Save vocab error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/vocab/:hotspotId — remove from vocab
router.delete('/:hotspotId', authMiddleware, async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM user_vocab WHERE user_id = ? AND hotspot_id = ?',
            [req.user.id, req.params.hotspotId]
        );
        res.json({ message: 'Word removed' });
    } catch (err) {
        console.error('Delete vocab error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
