/**
 * Dr.Job - REST API (Node.js + Express + PostgreSQL)
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db');
const { sign, verify, getBearerToken } = require('./middleware/auth');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// GET /diseases
app.get('/diseases', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, description, image, video_url, audio_url FROM diseases ORDER BY name'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /disease/:id
app.get('/disease/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ success: false, error: 'Invalid id' });
    const { rows } = await pool.query('SELECT * FROM diseases WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, error: 'Disease not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /herbs
app.get('/herbs', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, benefits, usage_method, image FROM herbs ORDER BY name'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /herb/:id
app.get('/herb/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ success: false, error: 'Invalid id' });
    const { rows } = await pool.query('SELECT * FROM herbs WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, error: 'Herb not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /symptoms
app.get('/symptoms', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name FROM symptoms ORDER BY name');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /symptom-check
app.post('/symptom-check', async (req, res) => {
  try {
    const symptomIds = req.body.symptom_ids;
    if (!Array.isArray(symptomIds) || symptomIds.length === 0) {
      return res.status(400).json({ success: false, error: 'symptom_ids required' });
    }
    const ids = symptomIds.slice(0, 20).map((x) => parseInt(x, 10)).filter((x) => !isNaN(x));
    if (ids.length === 0) {
      return res.status(400).json({ success: false, error: 'Valid symptom_ids required' });
    }
    const { rows } = await pool.query(
      `SELECT d.id, d.name, d.description, d.image, COUNT(ds.symptom_id)::int AS match_score
       FROM diseases d
       INNER JOIN disease_symptoms ds ON ds.disease_id = d.id AND ds.symptom_id = ANY($1)
       GROUP BY d.id, d.name, d.description, d.image
       ORDER BY match_score DESC
       LIMIT 15`,
      [ids]
    );
    res.json({ success: true, diseases: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /videos
app.get('/videos', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, description, video_url, thumbnail FROM videos ORDER BY id DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /audios
app.get('/audios', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, title, audio_url FROM audios ORDER BY id DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /register
app.post('/register', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const phone = String(req.body.phone || '').trim();
    const password = req.body.password;
    if (!name || !phone || password == null || password === '') {
      return res.status(400).json({ success: false, error: 'Name, phone and password required' });
    }
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (name, phone, password) VALUES ($1, $2, $3) RETURNING id, name, phone, subscription_status',
      [name, phone, hash]
    ).catch((err) => {
      if (err.code === '23505') throw Object.assign(err, { statusCode: 409 });
      throw err;
    });
    if (rows.length === 0) return res.status(500).json({ success: false, error: 'Insert failed' });
    const user = rows[0];
    const token = sign({ sub: user.id, phone: user.phone });
    res.status(201).json({ success: true, token, user });
  } catch (err) {
    if (err.statusCode === 409) return res.status(409).json({ success: false, error: 'Phone already registered' });
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const phone = String(req.body.phone || '').trim();
    const password = req.body.password;
    if (!phone || password == null || password === '') {
      return res.status(400).json({ success: false, error: 'Phone and password required' });
    }
    const { rows } = await pool.query(
      'SELECT id, name, phone, password, subscription_status FROM users WHERE phone = $1',
      [phone]
    );
    if (rows.length === 0) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    delete user.password;
    const token = sign({ sub: user.id, phone: user.phone });
    res.json({ success: true, token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dr.Job API running on http://0.0.0.0:${PORT}`);
});
