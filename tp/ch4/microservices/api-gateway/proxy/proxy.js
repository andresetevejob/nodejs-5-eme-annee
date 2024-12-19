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