const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, '../public')));

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// profile API
app.get('/profile', async (req, res) => {
  console.log('🟡 /profile called');

  try {
    const result = await pool.query(
      'SELECT * FROM profile WHERE id = $1',
      [1]
    );

    res.json(result.rows[0] || {});

  } catch (err) {
    console.error('❌ DB ERROR:', err.message);
    res.status(500).json({ error: 'DB error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});