# Mise en place d'un loadbalacing avec cluster module

### Pre-requis

* Installer nodemon : npm i -g nodemon

### Installation des dépendances

* npm i 

### Démarrer le service sans le cluster module

* nodemon app.js

### Lancer le benchmark

npx autocannon -c 20 -d 50 http://localhost:3000/heavy

### Résultats
![Alt text](/images/bench-without-cluster.png "a title")


## Démarrer le service avec le mode cluster

* nodemon app-cluster.js

### Lancer le benchmark

npx autocannon -c 20 -d 50 http://localhost:3000/heavy

### Résultats
![Alt text](/images/cluster-with-loadbalacing.png "a title")