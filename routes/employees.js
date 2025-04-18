const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all employees
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
});

// Add an employee
router.post('/', async (req, res) => {
    const { full_name, date_of_birth, phone_number, email_address, employee_id, image_url } = req.body;
    const result = await pool.query(
        'INSERT INTO employees (full_name, date_of_birth, phone_number, email_address, employee_id, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [full_name, date_of_birth, phone_number, email_address, employee_id, image_url]
    );
    res.json(result.rows[0]);
});

module.exports = router;