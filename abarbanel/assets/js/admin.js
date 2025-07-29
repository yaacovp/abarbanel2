let audios = [];

// Charger les audios
async function loadAudios() {
  const res = await fetch('../data/audios.json');
  audios = await res.json();
  updateParashaOptions();
}

// Mettre à jour les options de paracha selon le sefer
function updateParashaOptions() {
  const sefer = document.getElementById('sefer').value;
  const parashaSelect = document.getElementById('parasha');
  parashaSelect.innerHTML = '<option value="">Choisir...</option>';

  const parashot = {
    "Beréchit": ["Béréchit", "Noa'h", "Lekh Lekha", "Vayera", "Hayye Sarah", "Toledot", "Vayetze", "Vayishlach", "Vayeshev", "Mikketz", "Vayigash", "Vayehi"],
    "Chemot": ["Chémot", "Vaéra", "Bo", "Beshallach", "Yitro", "Mishpatim", "Terouma", "Tetsave", "Ki Tissa", "Vayak'hel", "Pekoudé"],
    "Vayikra": ["Vayikra", "Tzav", "Chemini", "Tazria", "Metzora", "Aharei Mot", "Kedochim", "Emor", "Behar", "Bechoukotai"],
    "Bamidbar": ["Bamidbar", "Nasso", "Behaalotekha", "Chla'h Lekha", "Korah", "Choukhat", "Balak", "Pine'has", "Matot", "Massei"],
    "Devarim": ["Devarim", "Vaetchanan", "Ekev", "Re'eh", "Shoftim", "Ki Tetze", "Ki Tavo", "Nitsavim", "Vayelech"]
  };

  if (parashot[sefer]) {
    parashot[sefer].forEach(p => {
      const option = document.createElement('option');
      option.value = p;
      option.textContent = p;
      parashaSelect.appendChild(option);
    });
  }
}

// Ajouter un nouvel audio
function addAudio() {
  const youtubeUrl = document.getElementById('youtubeUrl').value;
  const titleFr = document.getElementById('titleFr').value;
  const titleEn = document.getElementById('titleEn').value;
  const titleHe = document.getElementById('titleHe').value;
  const sefer = document.getElementById('sefer').value;
  const parasha = document.getElementById('parasha').value;

  // Extraire l'ID YouTube
  const videoIdMatch = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&?/]+)/);
  const youtubeId = videoIdMatch ? videoIdMatch[1] : null;

  if (!youtubeId || !titleFr || !sefer || !parasha) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  const newAudio = {
    id: Date.now(),
    title: {
      fr: titleFr,
      en: titleEn,
      he: titleHe
    },
    sefer,
    parasha,
    youtubeId,
    date: new Date().toISOString().split('T')[0]
  };

  audios.push(newAudio);
  document.getElementById('status').style.display = 'block';
  document.getElementById('status').textContent = `Audio ajouté : ${titleFr}`;
}

// Télécharger le JSON
function downloadJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(audios, null, 2));
  const a = document.createElement('a');
  a.href = dataStr;
  a.download = 'audios.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  loadAudios();
  document.getElementById('sefer').addEventListener('change', updateParashaOptions);
  document.getElementById('addBtn').addEventListener('click', addAudio);
  document.getElementById('downloadBtn').addEventListener('click', downloadJson);
});