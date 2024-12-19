const express = require("express");
const db = require("./database"); // Connexion à la base de données SQLite
const path = require("path");
const app = express();
const port = 3000;

// Middleware pour traiter les données JSON et les données de formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir la page HTML (formulaire)
app.use(express.static(path.join(__dirname, "public")));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
