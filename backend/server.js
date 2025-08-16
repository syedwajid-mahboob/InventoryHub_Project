
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// DB Connection
const db = new sqlite3.Database('./inventoryhub.db', (err) => {
  if (err) console.error('DB Error:', err);
  else console.log('Connected to SQLite DB');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to InventoryHub API - by Syed Wajid Mahboob');
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
