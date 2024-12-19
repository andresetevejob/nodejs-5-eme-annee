// server-serviceA.js
const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.json({ message: 'Réponse du Service A' });
});

app.listen(PORT, () => {
  console.log(`Service A démarré sur http://localhost:${PORT}`);
});
