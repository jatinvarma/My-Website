// Complete JavaScript code

(function () {
  'use strict';

  // Navigation
  const navLinks = document.querySelectorAll('#main-nav .nav-link');
  const sections = document.querySelectorAll('main section');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const target = link.getAttribute('href').replace('#', '');
      sections.forEach(section => {
        section.hidden = section.id !== target;
      });
      // Scroll to section
      const section = document.getElementById(target);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Show only home section at start
  sections.forEach(section => {
    section.hidden = section.id !== 'home';
  });

  // Auth Modal (simple alert for demo)
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  if (loginBtn) loginBtn.addEventListener('click', () => alert('Login functionality not implemented.'));
  if (signupBtn) signupBtn.addEventListener('click', () => alert('Sign Up functionality not implemented.'));

  // Psychometric Test
  const testForm = document.getElementById('test-form');
  const testResult = document.getElementById('test-result');
  if (testForm) {
    testForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(testForm);
      const count = { gaming: 0, medical: 0, engineering: 0 };
      for (let [, value] of formData.entries()) {
        if (count.hasOwnProperty(value)) count[value]++;
      }
      // Find max
      let max = 'gaming', maxVotes = 0;
      for (const k in count) {
        if (count[k] > maxVotes) {
          maxVotes = count[k];
          max = k;
        }
      }
      testResult.textContent = `You are most interested in: ${max.toUpperCase()}`;
      setTimeout(() => {
        // Show preferences section and select sector
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('a[href="#preferences"]').classList.add('active');
        sections.forEach(section => {
          section.hidden = section.id !== 'preferences';
        });
        selectSector(max);
        document.getElementById('preferences').scrollIntoView({ behavior: 'smooth' });
      }, 2000);
    });
  }

  // College sector switching
  const sectorButtons = document.querySelectorAll('.sector-buttons button');
  const collegeList = document.getElementById('college-list');

  // Example data
  const collegesData = {
    gaming: [
      { name: 'GameTech University', contact: '+1 234 567 890', location: 'Mountain View, CA' },
      { name: 'Pixel Arts College', contact: '+1 987 654 321', location: 'Cupertino, CA' }
    ],
    medical: [
      { name: 'Health Sciences University', contact: '+1 222 333 4444', location: 'Pasadena, CA' },
      { name: 'Medical College of Excellence', contact: '+1 333 444 5555', location: 'Philadelphia, PA' }
    ],
    engineering: [
      { name: 'Techno Engineering University', contact: '+1 111 222 3333', location: 'Stanford, CA' },
      { name: 'Institute of Advanced Engineering', contact: '+1 222 333 4444', location: 'Philadelphia, PA' }
    ]
  };

  function selectSector(sector) {
    sectorButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sector === sector);
    });
    renderColleges(sector);
  }

  function renderColleges(sector) {
    if (!collegeList) return;
    collegeList.innerHTML = '';
    (collegesData[sector] || []).forEach(college => {
      const div = document.createElement('div');
      div.className = 'college-card';
      div.innerHTML = `
        <h4>${college.name}</h4>
        <p><strong>Contact:</strong> ${college.contact}</p>
        <p><em>${college.location}</em></p>
      `;
      collegeList.appendChild(div);
    });
  }

  sectorButtons.forEach(btn => {
    btn.addEventListener('click', () => selectSector(btn.dataset.sector));
  });

  // Default sector on load
  if (document.getElementById('preferences') && !document.getElementById('preferences').hidden) {
    selectSector('gaming');
  }
})();
// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle?.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Auto-close mobile menu when nav link clicked
document.querySelectorAll('#main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      mainNav.classList.remove('open');
    }
  });
});
const authModal = document.getElementById('auth-modal');
const authClose = document.getElementById('auth-close');
const authTitle = document.getElementById('auth-title');
const authForm = document.getElementById('auth-form');
const toggleAuthMode = document.getElementById('toggle-auth-mode');
const usernameGroup = document.getElementById('username-group');
const authSubmit = document.getElementById('auth-submit');

let isLogin = true;

// Open modal from header buttons
document.getElementById('login-btn').addEventListener('click', () => openAuthModal(true));
document.getElementById('signup-btn').addEventListener('click', () => openAuthModal(false));

// Toggle Login/Signup
toggleAuthMode.addEventListener('click', (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  updateAuthForm();
});

authClose.addEventListener('click', () => {
  authModal.hidden = true;
});

// Optional: Close on ESC or outside
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') authModal.hidden = true;
});
window.addEventListener('click', e => {
  if (e.target === authModal) authModal.hidden = true;
});
