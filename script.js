// ===== قائمة الهامبرجر =====
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    })
  );
}

// ===== شريط التقدم =====
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  });
}

// ===== تمييز الرابط النشط =====
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ===== زر الحقائق التفاعلي =====
const factBtn  = document.getElementById('factBtn');
const factBox  = document.getElementById('factBox');
const factText = document.getElementById('factText');

if (factBtn && factBox && factText) {
  let facts = [];
  try { facts = JSON.parse(factBox.dataset.facts || '[]'); } catch(e) {}
  let idx = 0;
  factBtn.addEventListener('click', () => {
    if (!facts.length) return;
    factText.textContent = facts[idx];
    factBox.classList.add('show');
    idx = (idx + 1) % facts.length;
    factBtn.textContent = idx === 0 ? '🔄 ابدأ من جديد' : '💡 حقيقة أخرى';
  });
}

// ===== أنيميشن الظهور عند التمرير =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.region-card, .city-card, .news-card, .stat-item, .sidebar-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
