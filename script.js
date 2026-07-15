
const START_DATE = '2025-11-16'; 
// =============================================

const bgMusic = document.getElementById('bgMusic');
const galleryPhotos = document.querySelectorAll('#gallery .photo');

function animateGalleryPhotos() {
  galleryPhotos.forEach((photo, index) => {
    photo.classList.remove('is-visible');
    photo.style.setProperty('--photo-delay', `${index * 0.08}s`);
    setTimeout(() => photo.classList.add('is-visible'), 20);
  });
}

function resetGalleryPhotos() {
  galleryPhotos.forEach((photo) => photo.classList.remove('is-visible'));
}

if (bgMusic) {
  bgMusic.volume = 0.15;

  const tryPlayMusic = async () => {
    try {
      bgMusic.currentTime = 0;
      await bgMusic.play();
      bgMusic.muted = false;
    } catch (error) {
      console.log('Audio autoplay was blocked:', error);
    }
  };

  document.addEventListener('DOMContentLoaded', tryPlayMusic);
  window.addEventListener('load', tryPlayMusic);
  document.addEventListener('click', tryPlayMusic, { once: true });
  document.addEventListener('touchstart', tryPlayMusic, { once: true });
}

// Tab switching
const tabs = document.querySelectorAll('.tab');
const sections = {
  home: document.getElementById('home'),
  pin: document.getElementById('pin'),
  gallery: document.getElementById('gallery'),
};

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    Object.values(sections).forEach(s => s.classList.add('hidden'));
    sections[tab.dataset.tab].classList.remove('hidden');

    if (tab.dataset.tab === 'gallery') {
      animateGalleryPhotos();
    } else {
      resetGalleryPhotos();
    }
  });
});

// Months counter logic
function getFullMonthsBetween(start, end) {
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  // If end day is before start day, bawas 1 month
  if (end.getDate() < start.getDate()) {
    months--;
  }
  return months < 0 ? 0 : months;
}

const start = new Date(START_DATE + 'T00:00:00');
const today = new Date();
const months = getFullMonthsBetween(start, today);

document.getElementById('monthsCount').textContent = months;
document.getElementById('startDateText').textContent = start.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});