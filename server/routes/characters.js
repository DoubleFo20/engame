// server/routes/characters.js — Characters + Hotspots CRUD
const express = require('express');
const pool = require('../db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/characters — list all with hotspots (public)
router.get('/', async (req, res) => {
    try {
        const [chars] = await pool.query('SELECT * FROM characters ORDER BY id');
        const [hotspots] = await pool.query('SELECT * FROM hotspots ORDER BY id');

        const result = chars.map((c) => ({
            ...c,
            hotspots: hotspots.filter((h) => h.character_id === c.id),
        }));

        res.json(result);
    } catch (err) {
        console.error('Get characters error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/characters — add character (admin)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { name, role, img, color } = req.body;
        if (!name || !role) return res.status(400).json({ error: 'Name and role required' });

        const [result] = await pool.query(
            'INSERT INTO characters (name, role, img, color) VALUES (?, ?, ?, ?)',
            [name, role, img || '/characters/default.png', color || 'blue']
        );

        res.status(201).json({
            id: result.insertId,
            name, role,
            img: img || '/characters/default.png',
            color: color || 'blue',
            hotspots: [],
        });
    } catch (err) {
        console.error('Add character error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/characters/:id — update character (admin)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { name, role, img, color } = req.body;
        await pool.query(
            'UPDATE characters SET name = ?, role = ?, img = ?, color = ? WHERE id = ?',
            [name, role, img, color, req.params.id]
        );
        res.json({ message: 'Character updated' });
    } catch (err) {
        console.error('Update character error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/characters/:id — delete character + hotspots + vocab refs (admin)
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const charId = req.params.id;
        // Delete user_vocab entries that reference this character's hotspots
        await pool.query(
            'DELETE FROM user_vocab WHERE hotspot_id IN (SELECT id FROM hotspots WHERE character_id = ?)',
            [charId]
        );
        // Delete hotspots
        await pool.query('DELETE FROM hotspots WHERE character_id = ?', [charId]);
        // Delete the character
        await pool.query('DELETE FROM characters WHERE id = ?', [charId]);
        res.json({ message: 'Character deleted' });
    } catch (err) {
        console.error('Delete character error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ===== HOTSPOT sub-routes =====

// POST /api/characters/hotspots — add word
router.post('/hotspots', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { character_id, x, y, word, mean, type } = req.body;
        if (!character_id || !word || !mean || !type) {
            return res.status(400).json({ error: 'All fields required' });
        }
        const [result] = await pool.query(
            'INSERT INTO hotspots (character_id, x, y, word, mean, type) VALUES (?, ?, ?, ?, ?, ?)',
            [character_id, x || 50, y || 50, word, mean, type]
        );
        res.status(201).json({
            id: result.insertId,
            character_id, x: x || 50, y: y || 50, word, mean, type,
        });
    } catch (err) {
        console.error('Add hotspot error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/characters/hotspots/:id — edit word
router.put('/hotspots/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { x, y, word, mean, type } = req.body;
        await pool.query(
            'UPDATE hotspots SET x = ?, y = ?, word = ?, mean = ?, type = ? WHERE id = ?',
            [x, y, word, mean, type, req.params.id]
        );
        res.json({ message: 'Hotspot updated' });
    } catch (err) {
        console.error('Update hotspot error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/characters/hotspots/:id — delete word
router.delete('/hotspots/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        await pool.query('DELETE FROM hotspots WHERE id = ?', [req.params.id]);
        res.json({ message: 'Hotspot deleted' });
    } catch (err) {
        console.error('Delete hotspot error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
