require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const serviceRoutes = require('./routes/router');
const proxy = require('./proxy/proxy');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/services', serviceRoutes);
app.use('/proxy/:serviceName', proxy());

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`API Gateway démarrée sur http://localhost:${PORT}`);
});
