let audios = [];
let currentLang = 'fr';

// Charger les audios
async function loadAudios() {
  const res = await fetch('data/audios.json');
  audios = await res.json();
  displayAudios(audios);
}

// Afficher les audios
function displayAudios(list) {
  const container = document.getElementById('audio-list');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `<p>${getTranslation('noAudio')}</p>`;
    return;
  }

  list.forEach(audio => {
    const iframe = `<iframe src="https://www.youtube.com/embed/${audio.youtubeId}?start=2" allow="fullscreen" style="width:100%; height:200px; border:none;"></iframe>`;
    const title = audio.title[currentLang] || audio.title.fr;

    const div = document.createElement('div');
    div.className = 'audio-item';
    div.innerHTML = `
      <h3>${title}</h3>
      <p><strong>${audio.sefer}</strong> - ${audio.parasha}</p>
      ${iframe}
    `;
    container.appendChild(div);
  });
}

// Traduction
function getTranslation(key) {
  return translations[currentLang][key] || key;
}

// Changer de langue
function switchLanguage(lang) {
  currentLang = lang;
  document.body.className = lang === 'he' ? 'hebrew' : '';

  document.getElementById('search').placeholder = getTranslation('search');
  document.getElementById('filter-sefer').previousElementSibling.textContent = getTranslation('filterBySefer');
  document.getElementById('filter-parasha').previousElementSibling.textContent = getTranslation('filterByParasha');
  document.getElementById('sort').previousElementSibling.textContent = getTranslation('sortBy');
  document.getElementById('sort-name').textContent = getTranslation('sortName');
  document.getElementById('sort-date').textContent = getTranslation('sortDate');

  const links = document.querySelectorAll('nav a');
  links[0].textContent = getTranslation('home');
  links[1].textContent = getTranslation('about');
  document.getElementById('admin-link').textContent = getTranslation('admin');

  // Mettre à jour les audios
  filterAndSort();
}

// Filtrer et trier
function filterAndSort() {
  let filtered = [...audios];

  const search = document.getElementById('search').value.toLowerCase();
  const sefer = document.getElementById('filter-sefer').value;
  const parasha = document.getElementById('filter-parasha').value;
  const sort = document.getElementById('sort').value;

  if (search) {
    filtered = filtered.filter(a => 
      (a.title.fr + a.title.en + a.title.he).toLowerCase().includes(search)
    );
  }
  if (sefer) filtered = filtered.filter(a => a.sefer === sefer);
  if (parasha) filtered = filtered.filter(a => a.parasha === parasha);

  if (sort === 'name') {
    filtered.sort((a, b) => (a.title[currentLang] || a.title.fr).localeCompare(b.title[currentLang] || b.title.fr));
  } else if (sort === 'date') {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  displayAudios(filtered);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  loadAudios();

  document.getElementById('search').addEventListener('input', filterAndSort);
  document.getElementById('filter-sefer').addEventListener('change', filterAndSort);
  document.getElementById('filter-parasha').addEventListener('change', filterAndSort);
  document.getElementById('sort').addEventListener('change', filterAndSort);

  // Langues
  document.getElementById('lang-fr').addEventListener('click', () => switchLanguage('fr'));
  document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
  document.getElementById('lang-he').addEventListener('click', () => switchLanguage('he'));

  switchLanguage('fr');
});