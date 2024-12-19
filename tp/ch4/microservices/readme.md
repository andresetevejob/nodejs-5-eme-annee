# API-GATEWAY

## I - API-GATEWAY

### 1 - Dependances
```
* http-proxy-middleware
* express
* mongoose
* dotenv
```

### 2 - Création du model service models/services.js
```
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);

```
## 3 - Connection à la base de données Mongodb db.js
```
const mongoose = require('mongoose');

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connecté !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error.message);
    process.exit(1);
  }
};

module.exports = mongoDBConnect;
```

## 4 - Router 
```
const express = require('express');
const router = express.Router();
const Service = require('../models/services');

// Endpoint pour enregistrer un service
router.post('/register', async (req, res) => {
  const { name, url, description } = req.body;

  if (!name || !url) {
    return res.status(400).json({ message: 'Nom et URL sont requis.' });
  }

  try {
    const service = new Service({ name, url, description });
    await service.save();
    res.status(201).json({ message: 'Service enregistré avec succès !', service });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’enregistrement.', error: error.message });
  }
});

// Endpoint pour lister les services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des services.', error: error.message });
  }
});

module.exports = router;

```
## 5 - Proxy
```
const Service = require('../models/services');
const { createProxyMiddleware } = require('http-proxy-middleware');

function proxy() {
    return async (req, res, next) => {
        const serviceName = req.params.serviceName;

        try {
            // Rechercher l'URL du service dans la base de données
            const service = await Service.findOne({ name: serviceName });

            if (!service) {
                return res.status(404).json({ message: `Service ${serviceName} non trouvé` });
            }

            // Proxy la requête vers l'URL du service enregistré
            createProxyMiddleware({
                target: service.url,
                changeOrigin: true,
                pathRewrite: {
                    '^/proxy': '', // Optionnel : Retirer "/proxy" de l'URL du service
                },
            })(req, res, next);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors du routage vers le service.', error: error.message });
        }
    };
}
module.exports = proxy;
```
## 6 - fichier server.js
```
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
```
## 7 - configuration .env
```
# Port où l'API Gateway s'exécute
PORT=3000

# URI de la base de données MongoDB
MONGO_URI=mongodb://localhost:27017/api-gateway-db
```

## II - Création du service A

### Pré-requis
npm i express

### 1 - créer un fichier serviceA/server.js
```
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

```

## III - Démarrer les services

* nodemon api-gateway/server.js

* Importer ce curl dans postman
```
curl --location 'http://localhost:3000/api/services/register' \
--header 'Content-Type: application/json' \
--data '{
  "name": "ServiceA",
  "url": "http://localhost:4000",
  "description": "Description de Service A"
}'
```
* nodemon serviceA/server.js

* Appeler le serviceA

```
curl --location 'http://localhost:3000/proxy/ServiceA'

Features

