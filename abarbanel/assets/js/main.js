// main.js
let audios = [];
let currentLang = 'fr';
const translations = {
  fr: {
    featured: "Études en vedette",
    search: "Rechercher un audio...",
    filter: "Toutes les parachiot"
  },
  en: {
    featured: "Featured Studies",
    search: "Search an audio...",
    filter: "All Parashot"
  },
  he: {
    featured: "למודים מומלצים",
    search: "חפש שיעור...",
    filter: "כל הפרשות"
  }
};

// Charger les audios
async function loadAudios() {
  try {
    const res = await fetch('../data/audios.json');
    audios = await res.json();
  } catch (err) {
    console.error("Erreur de chargement des audios", err);
    audios = []; // fallback
  }
}

// Charger un Sefer spécifique
async function loadSefer(seferName) {
  await loadAudios();
  const filtered = audios.filter(a => a.sefer === seferName);
  const parashot = [...new Set(filtered.map(a => a.parasha))];

  const filter = document.getElementById('parasha-filter');
  filter.innerHTML = `<option value="">${translations[currentLang].filter}</option>`;
  parashot.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    filter.appendChild(opt);
  });

  renderAudioList(filtered);

  document.getElementById('search').addEventListener('input', () => {
    const q = document.getElementById('search').value;
    const parasha = filter.value;
    let results = audios.filter(a => a.sefer === seferName);
    if (parasha) results = results.filter(a => a.parasha === parasha);
    if (q) results = fuseSearch(results, q);
    renderAudioList(results);
  });

  filter.addEventListener('change', () => {
    const q = document.getElementById('search').value;
    const p = filter.value;
    let results = audios.filter(a => a.sefer === seferName);
    if (p) results = results.filter(a => a.parasha === p);
    if (q) results = fuseSearch(results, q);
    renderAudioList(results);
  });
}

// Recherche avec Fuse.js
function fuseSearch(list, query) {
  const fuse = new Fuse(list, { keys: ['title', 'parasha'] });
  return fuse.search(query).map(r => r.item);
}

// Afficher les audios
function renderAudioList(list) {
  const container = document.getElementById('audio-list');
  container.innerHTML = list.map(a => `
    <div class="audio-item">
      <h4>${a.title}</h4>
      <p><strong>Paracha :</strong> ${a.parasha}</p>
      <iframe width="100%" height="315" src="${a.url}" 
              frameborder="0" allowfullscreen></iframe>
    </div>
  `).join('');
}

// Page d'accueil : afficher les audios en vedette
async function renderFeatured() {
  await loadAudios();
  const featured = audios.slice(0, 3);
  const container = document.getElementById('featured-audios');
  container.innerHTML = featured.map(a => `
    <div class="audio-card">
      <iframe width="100%" height="200" src="${a.url}" frameborder="0" allowfullscreen></iframe>
      <h4>${a.title}</h4>
      <p>${a.sefer} - ${a.parasha}</p>
    </div>
  `).join('');
}

// Gestion des langues
function setupLanguage() {
  const select = document.getElementById('lang-switch');
  if (!select) return;

  select.value = currentLang;
  select.addEventListener('change', (e) => {
    currentLang = e.target.value;
    location.reload(); // Pour simplifier (pas de traduction dynamique complète)
  });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  setupLanguage();

  if (document.getElementById('featured-audios')) {
    renderFeatured();
  }
});