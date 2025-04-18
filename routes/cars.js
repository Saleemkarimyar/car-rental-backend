const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all cars
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
});

// Add a car
router.post('/', async (req, res) => {
    const { make, model, year, price, availability, color, image_url } = req.body;
    const result = await pool.query(
        'INSERT INTO cars (make, model, year, price, availability, color, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [make, model, year, price, availability, color, image_url]
    );
    res.json(result.rows[0]);
});

// Update a car
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { make, model, year, price, availability, color, image_url } = req.body;
    const result = await pool.query(
        'UPDATE cars SET make = $1, model = $2, year = $3, price = $4, availability = $5, color = $6, image_url = $7 WHERE id = $8 RETURNING *',
        [make, model, year, price, availability, color, image_url, id]
    );
    res.json(result.rows[0]);
});

// Delete a car
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM cars WHERE id = $1', [id]);
    res.json({ message: 'Car deleted' });
});

module.exports = router;