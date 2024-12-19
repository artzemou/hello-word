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

// Route pour récupérer tous les articles
app.get("/articles", (req, res) => {
  db.all("SELECT * FROM articles", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Route pour afficher un article spécifique par son slug
app.get("/article/:slug", (req, res) => {
  const { slug } = req.params;
  db.get("SELECT * FROM articles WHERE slug = ?", [slug], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).send("Article non trouvé");
    } else {
      db.all("SELECT * FROM articles", [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          // Rendre un fichier HTML de l'article
          const page = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${row.title}</title>
        </head>
        <body>
          <nav>
            <li><a href="/">Index</a></li>
            ${rows.map(row => `<li><a href="/article/${row.slug}">${row.title}</a></li>`).join('')}
          </nav>
          <main>
            <h2>${row.title}</h2>
            <article>${row.article}</article>
          </main>
        </body>
        </html>
      `;
          res.send(page); // Envoi de la page HTML dynamique
        }
      });
    }
  });
});

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
