// script.js - Separate JavaScript File

// Smooth Scrolling for Navbar Links
// const navLinks = document.querySelectorAll('nav a');
// navLinks.forEach(link => {
//   link.addEventListener('click', e => {
//     e.preventDefault();
//     const target = document.querySelector(e.target.getAttribute('href'));
//     if (target) target.scrollIntoView({ behavior: 'smooth' });
//   });
// });
// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navList.classList.toggle('open');
});

// Smooth scrolling for navbar links + close menu on click (mobile)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });

    // Close mobile menu after click
    menuToggle.classList.remove('active');
    navList.classList.remove('open');
  });
});


// Highlight Active Section in Navbar
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});

// Courses card toggle description
// Courses Cards
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
    const desc = card.getAttribute('data-desc');
    card.querySelector('.course-desc').textContent = desc;
  });
});

// Why Us Cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
    const desc = card.getAttribute('data-desc');
    card.querySelector('.feature-desc').textContent = desc;
  });
});

const icons = ["📚","🎓","✏️","🖊️","👨‍🎓","👩‍🎓","🧠","📖","🧪","📐","📓","📘"];
const container = document.querySelector('.floating-icons');

for (let i = 0; i < 25; i++) {
  const span = document.createElement('span');
  span.textContent = icons[Math.floor(Math.random() * icons.length)];

  span.style.left = Math.random() * 100 + "vw";
  span.style.animationDuration = (10 + Math.random() * 15) + "s";
  span.style.animationDelay = Math.random() * 19 + "s";

  container.appendChild(span);
}



// Fade-in Animation on Scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('reveal');
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));



// Optional: Testimonial hover effect
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
  card.addEventListener('mouseover', () => card.classList.add('hover'));
  card.addEventListener('mouseout', () => card.classList.remove('hover'));
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

// About section image slider (Swiper)
const aboutSwiper = new Swiper('.about-slider', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.about-slider .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.about-slider .swiper-button-next',
    prevEl: '.about-slider .swiper-button-prev',
  },
  speed: 700,
});

 document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("campusVideo");
    if (!video) return;

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Try to play
                video.play().then(() => {
                    // Try unmute automatically
                    video.muted = false;
                }).catch(() => {
                    console.log("Browser blocked sound autoplay.");
                });

            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(video);

    // Fallback: first tap enables sound if blocked
    document.addEventListener("click", () => {
        if (video.muted) {
            video.muted = false;
        }
        video.play();
    }, { once: true });
});