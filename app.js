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

app.post("/addArticle", (req, res) => {
  const { title, article } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (!title || !article) {
    return res.status(400).send("Les champs 'title' et 'article' sont requis");
  }

  db.run("INSERT INTO articles (title, slug, article) VALUES (?, ?,)", [title, slug, article], function (err) {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout de l'article");
    } else {
      res.redirect("/"); // Rediriger vers la page d'accueil après ajout
    }
  });
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
