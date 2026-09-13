/**
 * MIKHAIL EMAD ALBER — EXECUTIVE ENGINEERING PORTFOLIO SCRIPT
 * Multi-Track Domain Engine, 3D Three.js Constellation, Interactive Filtering & Telemetry
 */

// Global Track Switcher
window.switchTrack = function(trackId) {
  // Update Buttons
  const tabButtons = document.querySelectorAll('.track-tab-btn');
  tabButtons.forEach((btn) => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  const activeBtn = document.getElementById(`tab-${trackId}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
  }

  // Update Panes
  const panes = document.querySelectorAll('.track-view-pane');
  panes.forEach((pane) => {
    pane.classList.remove('active');
  });

  const activePane = document.getElementById(`track-pane-${trackId}`);
  if (activePane) {
    activePane.classList.add('active');
  }
};

// Global Quick Copy Contact Handler
window.copyContact = function(text, btnElement) {
  if (!text || !btnElement) return;

  const btnTextEl = btnElement.querySelector('.btn-text');
  const originalText = btnTextEl ? btnTextEl.textContent : '';

  const setSuccessState = () => {
    btnElement.classList.add('copied');
    if (btnTextEl) btnTextEl.textContent = 'COPIED TO CLIPBOARD!';
    setTimeout(() => {
      btnElement.classList.remove('copied');
      if (btnTextEl) btnTextEl.textContent = originalText;
    }, 2200);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(setSuccessState).catch(() => {
      fallbackCopy(text, setSuccessState);
    });
  } else {
    fallbackCopy(text, setSuccessState);
  }
};

function fallbackCopy(text, callback) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    if (callback) callback();
  } catch (err) {
    console.error('Fallback copy error:', err);
  }
  document.body.removeChild(textArea);
}

document.addEventListener('DOMContentLoaded', () => {
  initTrackSwitcher();
  initCopyButtons();
  init3DCardTilt();
  initProjectFilters();
  initMobileNav();
  initScrollSpy();
});

function initTrackSwitcher() {
  const tabButtons = document.querySelectorAll('.track-tab-btn');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const trackId = btn.id.replace('tab-', '');
      if (window.switchTrack) {
        window.switchTrack(trackId);
      }
    });
  });
}

function initCopyButtons() {
  const emailBtn = document.getElementById('copy-email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      window.copyContact('Mikhailemad999@gmail.com', emailBtn);
    });
  }
  const phoneBtn = document.getElementById('copy-phone-btn');
  if (phoneBtn) {
    phoneBtn.addEventListener('click', () => {
      window.copyContact('+201289981076', phoneBtn);
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE 3D PERSPECTIVE CARD TILT
   ========================================================================== */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.tilt-target');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   3. PROJECT FILTERING & REAL-TIME SEARCH
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const searchInput = document.getElementById('project-search-input');
  const projectCards = document.querySelectorAll('.project-matrix-card');

  let activeFilter = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
      const summary = (card.querySelector('.card-summary')?.textContent || '').toLowerCase();

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch =
        !searchQuery ||
        title.includes(searchQuery) ||
        summary.includes(searchQuery) ||
        keywords.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  // Filter Buttons Click
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* ==========================================================================
   4. MOBILE NAVIGATION & DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. SCROLL SPY & HEADER SHADOW ELEVATION
   ========================================================================== */
function initScrollSpy() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-item');

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.pageYOffset;

      // Header shadow elevation
      if (header) {
        if (scrollY > 30) {
          header.style.borderBottomColor = 'rgba(255, 255, 255, 0.14)';
          header.style.background = 'rgba(10, 10, 10, 0.92)';
        } else {
          header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
          header.style.background = 'rgba(14, 14, 14, 0.85)';
        }
      }

      // Section active indicator
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { passive: true }
  );
}
