const express = require('express');
const router = express.Router();
const pool = require('../db');

// Login endpoint
router.post('/login', async (req, res) => {
    debugger
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;