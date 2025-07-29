# 📚 Projet Abarbanel – Documentation

Site web statique multilingue pour la diffusion d'études audio Torah.

---

## 🚀 Déploiement

1. Clonez ou téléchargez ce projet.
2. Déployez sur GitHub Pages, Netlify, Vercel, ou tout hébergeur statique.
   - Sur GitHub : `Settings > Pages > Source: Deploy from a branch (main)`

---

## 🛠️ Ajouter un audio via l'interface Admin

1. Ouvrez `/admin/index.html` dans votre navigateur.
2. Remplissez le formulaire :
   - **Titre** : Nom de l'étude
   - **URL YouTube** : Utilisez le lien `embed` (ex: `https://www.youtube.com/embed/abc123`)
   - **Sefer** : Choisissez dans la liste
   - **Paracha** : Tapez le nom (ex: Béréchit)
3. Cliquez sur **Ajouter l'audio**.
4. Cliquez sur **Télécharger audios.json**.
5. Remplacez le fichier `data/audios.json` par le nouveau téléchargé.

✅ L’audio apparaîtra automatiquement sur le site après rafraîchissement.

---

## 🔁 Remplacer manuellement le fichier `audios.json`

1. Modifiez `data/audios.json` directement avec un éditeur de texte.
2. Respectez le format :
```json
{
  "id": 1,
  "title": "Mon titre",
  "url": "https://www.youtube.com/embed/...",
  "sefer": "Beréchit",
  "parasha": "Noa'h",
  "date": "2025-04-05"
}