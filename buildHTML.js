const fs = require("fs");
const path = require("path");
const db = require("./database"); // Connexion à la base de données SQLite

const outputDir = path.join(__dirname, ".");

console.log(outputDir)

// Assurez-vous que le dossier de sortie existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Génération de la page d'accueil
const generateIndexPage = (articles) => {
  const content = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index des articles</title>
  </head>
  <body>
    <h1>Code informatique et sciences participatives</h1>
    <h2>Liste des articles</h2>
    <ol>
      ${articles
      .map(
        (article) =>
          `<li><a href="./${article.slug}.html">${article.title}</a></li>`
      )
      .join("")}
    </ol>
  </body>
  </html>
  `;
  fs.writeFileSync(path.join(outputDir, "index.html"), content, "utf-8");
};

// Génération des pages d'articles
const generateArticlePage = (articles, article) => {
  const content = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title}</title>
  </head>
  <body>
    <h1>${article.title}</h1>
    <article>${article.article}</article>
    <a href="./index.html">Retour à l'index</a>
    <ol>
      ${articles
      .filter(({ title }) => title !== article.title)
      .map(
        (article) =>
          `<li><a href="./${article.slug}.html">${article.title}</a></li>`
      )
      .join("")}
    </ol>
  </body>
  </html>
  `;


  fs.writeFileSync(
    path.join(outputDir, `${article.slug}.html`),
    content,
    "utf-8"
  );
};

// Récupération des articles et génération des fichiers
db.all("SELECT * FROM articles", [], (err, articles) => {
  if (err) {
    console.error("Erreur lors de la récupération des articles :", err.message);
    return;
  }
  generateIndexPage(articles); // Génération de l'index
  articles.forEach((article) => generateArticlePage(articles, article)); // Génération des articles
  console.log("Pages statiques générées avec succès !");
});
