// server/routes/activity.js — Activity Logs
const express = require('express');
const pool = require('../db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /api/activity/log — Log a user action
router.post('/log', authMiddleware, async (req, res) => {
    try {
        const { action, details } = req.body;
        if (!action) return res.status(400).json({ error: 'action is required' });

        const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';

        await pool.query(
            'INSERT INTO activity_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)',
            [req.user.id, action, details || null, ip]
        );

        res.json({ message: 'Activity logged' });
    } catch (err) {
        console.error('Log activity error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/activity/recent — Get recent activity logs (admin only)
router.get('/recent', authMiddleware, adminOnly, async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 50, 200);
        const [rows] = await pool.query(
            `SELECT al.id, al.action, al.details, al.ip_address, al.created_at,
                    u.username, u.name as user_name
             FROM activity_logs al
             JOIN users u ON al.user_id = u.id
             ORDER BY al.created_at DESC
             LIMIT ?`,
            [limit]
        );
        res.json(rows);
    } catch (err) {
        console.error('Get activity logs error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/activity/user/:id — Get logs for specific user (admin only)
router.get('/user/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT al.id, al.action, al.details, al.ip_address, al.created_at,
                    u.username, u.name as user_name
             FROM activity_logs al
             JOIN users u ON al.user_id = u.id
             WHERE al.user_id = ?
             ORDER BY al.created_at DESC
             LIMIT 50`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Get user activity error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/activity/stats — Activity summary stats (admin only)
router.get('/stats', authMiddleware, adminOnly, async (req, res) => {
    try {
        // Today's active users
        const [todayActive] = await pool.query(
            `SELECT COUNT(DISTINCT user_id) as count FROM activity_logs 
             WHERE DATE(created_at) = CURDATE()`
        );
        // Total logins today
        const [todayLogins] = await pool.query(
            `SELECT COUNT(*) as count FROM activity_logs 
             WHERE action = 'login' AND DATE(created_at) = CURDATE()`
        );
        // Total logins this week
        const [weekLogins] = await pool.query(
            `SELECT COUNT(*) as count FROM activity_logs 
             WHERE action = 'login' AND created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`
        );

        res.json({
            todayActiveUsers: todayActive[0].count,
            todayLogins: todayLogins[0].count,
            weekLogins: weekLogins[0].count,
        });
    } catch (err) {
        console.error('Activity stats error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
