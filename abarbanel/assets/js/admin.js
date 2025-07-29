// admin.js
let audios = [];

// Charger les données JSON
async function loadJson() {
  try {
    const res = await fetch('../data/audios.json');
    audios = await res.json();
    updateJsonPreview();
  } catch (err) {
    alert("Impossible de charger audios.json. Vérifiez le chemin.");
  }
}

// Mettre à jour l'aperçu JSON
function updateJsonPreview() {
  document.getElementById('json-output').value = JSON.stringify(audios, null, 2);
}

// Ajouter un nouvel audio
document.getElementById('audio-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const url = document.getElementById('url').value;
  const sefer = document.getElementById('sefer').value;
  const parasha = document.getElementById('parasha').value;
  const id = audios.length ? Math.max(...audios.map(a => a.id)) + 1 : 1;

  audios.push({ id, title, url, sefer, parasha, date: new Date().toISOString().split('T')[0] });
  updateJsonPreview();
  e.target.reset();
});

// Télécharger le fichier JSON
document.getElementById('download-json').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(audios, null, 2)], { type: 'application/json' });
  saveAs(blob, 'audios.json');
  alert("Fichier audios.json prêt à être téléchargé. Remplacez-le dans /data/.");
});

// Charger au démarrage
loadJson();