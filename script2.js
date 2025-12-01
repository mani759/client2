/* ========================================
   XYZ COLLEGE WEBSITE - JAVASCRIPT
   ======================================== */

/* ========== SMOOTH SCROLL TO CONTACT ========== */
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
}


/* ========== NAVBAR SMOOTH SCROLLING ========== */
function setupNavbarScrolling() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


/* ========== HIGHLIGHT ACTIVE NAVBAR LINK ========== */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
    let currentSection = '';
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });
}


/* ========== COURSE CARDS - SHOW/HIDE DESCRIPTION ========== */
function setupCourseCards() {
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach(function(card) {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      courseCards.forEach(function(c) {
        c.classList.remove('active');
      });
      
      // Add active class to clicked card
      card.classList.add('active');
      
      // Get description from data attribute
      const description = card.getAttribute('data-desc');
      
      // Show description in the card
      const descElement = card.querySelector('.course-desc');
      descElement.textContent = description;
    });
  });
}


/* ========== FEATURE CARDS - SHOW/HIDE DESCRIPTION ========== */
function setupFeatureCards() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(function(card) {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      featureCards.forEach(function(c) {
        c.classList.remove('active');
      });
      
      // Add active class to clicked card
      card.classList.add('active');
      
      // Get description from data attribute
      const description = card.getAttribute('data-desc');
      
      // Show description in the card
      const descElement = card.querySelector('.feature-desc');
      descElement.textContent = description;
    });
  });
}


/* ========== TAB SWITCHING ========== */
function openTab(event, tabName) {
  event.preventDefault();
  
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function(tab) {
    tab.classList.remove('active');
  });
  
  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(function(btn) {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to clicked button
  event.target.classList.add('active');
}


/* ========== FADE-IN ANIMATION ON SCROLL ========== */
function setupScrollAnimation() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(function(section) {
    observer.observe(section);
  });
}


/* ========== INITIALIZE ALL FUNCTIONS ========== */
document.addEventListener('DOMContentLoaded', function() {
  // Run all setup functions when page loads
  setupNavbarScrolling();
  updateActiveNavLink();
  setupCourseCards();
  setupFeatureCards();
  setupScrollAnimation();
});


// Animated number counters on scroll
const counters = document.querySelectorAll('.count');
let countersStarted = false;

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500; // total time in ms
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value + (target >= 1000 ? '+' : '');
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + (target >= 1000 ? '+' : '');
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger when stats section is visible
const statsSection = document.querySelector('#stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          startCounters();
          statsObserver.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.4 }
  );

  statsObserver.observe(statsSection);
}
