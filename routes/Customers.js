const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all customers
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
});

// Add a customer
router.post('/', async (req, res) => {
    const { full_name, date_of_birth, license_number } = req.body;
    const result = await pool.query(
        'INSERT INTO customers (full_name, date_of_birth, license_number) VALUES ($1, $2, $3) RETURNING *',
        [full_name, date_of_birth, license_number]
    );
    res.json(result.rows[0]);
});

module.exports = router;