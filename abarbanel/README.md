# 📄 Projet Abarbanel – README

## 🎯 Présentation
Site statique multilingue pour la diffusion de contenus audio (YouTube) organisés par Sefer et Paracha.

---

## 📦 Fonctionnalités
- Navigation multilingue (FR / EN / HE)
- Recherche et filtres dynamiques
- Interface d’administration locale
- Responsive mobile-first
- 100% statique – aucun backend requis

---

## 🛠️ Utilisation

### 🔹 Ajouter un audio
1. Ouvrir `admin/index.html` dans votre navigateur.
2. Remplir le formulaire avec :
   - Lien YouTube
   - Titres (FR, EN, HE)
   - Séfer et Paracha
3. Cliquez sur **Ajouter**.
4. Cliquez sur **Télécharger le JSON**.
5. Remplacez le fichier `data/audios.json` par le nouveau.

### 🔹 Modifier les textes statiques
- Page "À propos" : modifier le texte dans `a-propos.html` ou dans `languages.js` (`aboutText`).
- Traductions : éditer `assets/js/languages.js`.

### 🔹 Déployer
Le site est entièrement statique. Déployez-le sur :
- **GitHub Pages** : push sur `main` → Settings → Pages
- **Netlify** : glisser-déposer le dossier
- **Vercel** : `vercel` CLI

---

## ⚠️ Attention
- L’interface admin est **locale uniquement** (pas de sauvegarde serveur).
- Ne pas utiliser sur un réseau public sans précaution.
- Toujours sauvegarder `audios.json`.

---

## 🧑‍💻 Développé avec
- HTML5 / CSS3 / JavaScript
- Pas de framework
- Compatible tous navigateurs

✅ Prêt à l’emploi.