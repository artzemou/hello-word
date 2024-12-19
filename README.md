

# Résumé du code

## **database.js Fonctionnalité principale :**
Ce script initialise une base de données SQLite, crée une table pour stocker les articles, et expose la connexion à la base de données pour être utilisée dans d'autres fichiers.

---

## **Détails des fonctionnalités**

### **1. Connexion à SQLite**
- Utilise le module `sqlite3` en mode **verbose** (pour afficher les messages d'erreur détaillés).
- Définit le chemin du fichier de la base de données : `./data.db`.
- Établit une connexion avec SQLite :
  - Affiche un message de succès en cas de connexion réussie.
  - Affiche une erreur si la connexion échoue.

### **2. Création de la table `articles`**
- Vérifie si la table `articles` existe, et la crée si elle est absente.
- La table contient les colonnes suivantes :
  - `id` : Clé primaire, générée automatiquement.
  - `title` : Titre de l'article (non vide).
  - `slug` : Slug unique pour identifier l'article (non vide).
  - `article` : Contenu de l'article (non vide).
- Affiche un message indiquant si la table a été créée avec succès.
- Signale une erreur si la création échoue.

### **3. Exportation de la base de données**
- Exporte l'objet `db`, permettant d'utiliser cette connexion à la base de données dans d'autres modules Node.js.

---

## **Objectif global**
Ce script initialise une base de données SQLite et prépare une table pour stocker des articles. Il est conçu pour être réutilisé dans une application web ou toute autre application nécessitant une gestion de contenu avec SQLite.


## **App.js Fonctionnalité principale :**
Ce script crée une application web avec **Express.js**, connectée à une base de données SQLite, pour gérer des articles. Il inclut des fonctionnalités pour afficher, ajouter et naviguer entre les articles.

---

## **Détails des fonctionnalités**

### **1. Configuration**
- Utilise **Express** pour créer le serveur.
- Active des middlewares pour traiter les données JSON et les données de formulaire.
- Sert des fichiers statiques depuis un dossier `public`.

### **2. Routes définies**

#### **1. Récupérer tous les articles**
- **Route :** `GET /articles`
- Extrait tous les articles de la base de données SQLite et les renvoie sous forme de JSON.

#### **2. Afficher un article spécifique**
- **Route :** `GET /article/:slug`
- Recherche un article dans la base de données selon son **slug**.
- Si l'article existe :
  - Génère dynamiquement une page HTML affichant :
    - Le contenu de l'article.
    - Une navigation contenant des liens vers tous les articles disponibles.
- Si l'article n'existe pas : renvoie une erreur 404.

#### **3. Ajouter un nouvel article**
- **Route :** `POST /addArticle`
- Reçoit un titre et le contenu de l'article via le formulaire.
- Génère un **slug** à partir du titre (en remplaçant les espaces et caractères spéciaux par des tirets).
- Insère un nouvel article dans la base de données SQLite.
- Redirige vers la page d'accueil après ajout.

---

### **3. Gestion des erreurs**
- Si des erreurs surviennent (connexion à la base de données, champs manquants, etc.), le serveur renvoie un message d'erreur approprié.

---

## **Lancement du serveur**
- Le serveur écoute sur le port **3000**.
- Affiche l'URL du serveur dans la console (`http://localhost:3000`).

---

## **Objectif global**
Ce script est un gestionnaire d'articles simple permettant de :
- Consulter une liste d'articles.
- Afficher un article spécifique via un **slug**.
- Ajouter de nouveaux articles via un formulaire.

## **buildHTML.js Fonctionnalité principale :**
Ce script génère des pages HTML statiques à partir d'articles stockés dans une base de données SQLite. Chaque article est transformé en une page HTML individuelle, et une page d'index liste tous les articles avec des liens vers leurs pages respectives.

---

## **Détails des fonctionnalités**

### **1. Préparation du dossier de sortie**
- Le chemin du dossier de sortie (`build`) est défini avec `path.join`.
- Si le dossier n'existe pas, il est créé avec `fs.mkdirSync` en utilisant l'option `{ recursive: true }` pour gérer les dossiers inexistants.

### **2. Génération de la page d'accueil (index)**
- **Fonction :** `generateIndexPage`
- Accepte une liste d'articles.
- Crée un fichier `index.html` contenant :
  - Un titre principal.
  - Une liste de liens vers les pages HTML générées pour chaque article (basé sur leur `slug`).

### **3. Génération des pages individuelles pour les articles**
- **Fonction :** `generateArticlePage`
- Accepte un article en paramètre.
- Crée un fichier HTML dont le nom correspond au `slug` de l'article (par exemple, `article-example.html`).
- Le contenu inclut :
  - Un titre avec le nom de l'article.
  - Le contenu de l'article.
  - Un lien pour retourner à la page d'index.

### **4. Récupération des articles et génération des fichiers**
- Utilise la méthode `db.all` pour récupérer tous les articles depuis la base de données SQLite.
- Si une erreur survient lors de la récupération des données, elle est affichée dans la console.
- Une fois les articles récupérés :
  - La page d'index est générée à l'aide de `generateIndexPage`.
  - Une page HTML est générée pour chaque article avec `generateArticlePage`.

### **5. Message de confirmation**
- Une fois toutes les pages générées, un message **"Pages statiques générées avec succès !"** est affiché dans la console.

---

## **Objectif global**
Ce script automatise la génération de pages HTML statiques pour une liste d'articles stockés dans une base de données. Il est utile pour créer un site web statique où chaque article a sa propre page et une page principale liste tous les articles disponibles.
