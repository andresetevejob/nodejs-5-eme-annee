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
