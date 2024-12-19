const sqlite3 = require("sqlite3").verbose();

// Chemin de la base de données (un fichier local)
const db = new sqlite3.Database("./db.db", (err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err.message);
  } else {
    console.log("Connexion réussie à SQLite.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      article TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table:", err.message);
    } else {
      console.log("Table 'articles' prête.");
    }
  });
});

module.exports = db;
