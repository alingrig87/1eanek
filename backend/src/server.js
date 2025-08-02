const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello from backend API!');
});

app.get('/admin', (_req, res) => {
  res.send('Admin endpoint');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
