(function () {
  const STEPS = ['envelope', 'bloom', 'tracklist'];

  const META = {
    envelope: {
      pageLabel: 'Pagina 1',
      sticker: 'PARA TI',
      title: 'Un pequeño regalo<br>para ti',
      subtitle: 'espero te guste aun que sea digital...',
      status: 'Rst-1',
    },
    bloom: {
      pageLabel: 'Pagina 2',
      sticker: 'LO SIENTO',
      title: '¿Que paso?',
      subtitle: '',
      status: 'Rst-2',
    },
    tracklist: {
      pageLabel: 'Pagina 3',
      sticker: 'TQM BONITA',
      title: 'Ey, mira',
      subtitle: 'Ya que no salio como esperaba, pues de alguna forma tenia que hacerlo así que mira un Snoopy todo bonito dandote flores',
      status: 'Rst-3',
    },
  };

  const galleryImages = ['assets/snoopy-sunflower.jpg', 'assets/snoopy-rose.jpg'];
  let galleryIndex = 0;
  let currentStep = 'envelope';
  let isPlaying = false;

  const pageLabelEl = document.getElementById('pageLabel');
  const stickerEl = document.getElementById('sticker');
  const heroTitleEl = document.getElementById('heroTitle');
  const heroSubtitleEl = document.getElementById('heroSubtitle');
  const statusTextEl = document.getElementById('statusText');
  const galleryImg = document.getElementById('galleryImg');
  const galleryBtn = document.getElementById('galleryBtn');
  const trackRow = document.getElementById('trackRow');
  const toast = document.getElementById('toast');

  function goStep(step) {
    currentStep = step;
    const meta = META[step];

    pageLabelEl.textContent = meta.pageLabel;
    stickerEl.textContent = meta.sticker;
    heroTitleEl.innerHTML = meta.title;
    heroSubtitleEl.textContent = meta.subtitle;
    heroSubtitleEl.style.display = meta.subtitle ? '' : 'none';
    statusTextEl.textContent = meta.status;

    document.querySelectorAll('[data-step]').forEach((el) => {
      el.hidden = el.dataset.step !== step;
    });

    document.querySelectorAll('.nav-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.nav === step);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateGallery() {
    galleryImg.src = galleryImages[galleryIndex];
    galleryBtn.textContent = `${galleryIndex + 1}/${galleryImages.length}`;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => goStep(btn.dataset.nav));
  });

  // Envelope -> bloom
  document.getElementById('toBloomBtn').addEventListener('click', () => goStep('bloom'));

  // Bloom -> tracklist
  document.getElementById('toTracklistBtn').addEventListener('click', () => goStep('tracklist'));

  // Tracklist -> back to bloom
  document.getElementById('backBtn').addEventListener('click', () => goStep('bloom'));

  // Gallery cycling
  galleryBtn.addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateGallery();
  });

  // Song row toggle
  function toggleTrack() {
    isPlaying = !isPlaying;
    trackRow.classList.toggle('is-playing', isPlaying);
  }
  trackRow.addEventListener('click', toggleTrack);
  trackRow.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTrack();
    }
  });

  // Copy link
  document.getElementById('copyLinkBtn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('https://youtu.be/kMIaYXxLnUA?si=TVeCH1ZKfWkmc8b8');
      showToast('Link copiado');
    } catch (err) {
      showToast('No se pudo copiar el link');
    }
  });

  // Init
  updateGallery();
  goStep('envelope');
})();
