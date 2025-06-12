// === Updated script.js ===

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const cursor = document.getElementById("cursor");
  const cursor2 = document.getElementById("cursor2");
  const cursor3 = document.getElementById("cursor3");

  document.body.addEventListener("mousemove", function (e) {
    [cursor, cursor2, cursor3].forEach(el => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    });
  });

  function addHover() {
    cursor2.classList.add("hover");
    cursor3.classList.add("hover");
  }

  function removeHover() {
    cursor2.classList.remove("hover");
    cursor3.classList.remove("hover");
  }

  const wolfText = document.getElementById("wolfverelst");

  if (wolfText) {
    wolfText.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-wolfverelst");
      addHover();
    });

    wolfText.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-wolfverelst");
      removeHover();
    });
  }

  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 1500);
  let isPaused = false;
  const slideshowContainer = document.getElementById('slideshow');

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      event.preventDefault();
      if (!isPaused) {
        clearInterval(slideInterval);
        slideshowContainer.classList.add('expanded');
        isPaused = true;
      } else {
        slideInterval = setInterval(nextSlide, 1000);
        slideshowContainer.classList.remove('expanded');
        isPaused = false;
      }
    }
  });
});

// Horizontal scroll effect for each project scroll wrapper
document.addEventListener("scroll", () => {
  const wrappers = document.querySelectorAll(".horizontal-scroll-wrapper");

  wrappers.forEach(wrapper => {
    const scrollContent = wrapper.querySelector(".horizontal-scroll");
    if (!scrollContent) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const startY = wrapperRect.top;
    const endY = wrapperRect.bottom;
    const scrollRange = endY - startY;

    if (startY < window.innerHeight && endY > 0) {
      const scrollY = Math.min(Math.max(window.innerHeight - startY, 0), scrollRange);
      const maxScroll = scrollContent.scrollWidth - window.innerWidth;
      const scrollPercent = scrollY / scrollRange;
      const scrollX = -scrollPercent * maxScroll * 0.7;

      scrollContent.style.transform = `translateX(${scrollX}px)`;
    }
  });
});

// === FIXED TOP NAV ===
const topNavLinks = document.querySelectorAll('.nav-link');
const topNavMap = {};
topNavLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href.startsWith('#')) {
    topNavMap[href] = link;
  }
});

function setTopNavActive() {
  const scrollPos = window.scrollY + document.querySelector('.header').offsetHeight + 50;
  let activeFound = false;

  Object.entries(topNavMap).forEach(([href, link]) => {
    const section = document.querySelector(href);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (!activeFound && scrollPos >= sectionTop && scrollPos < sectionBottom) {
        topNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        activeFound = true;
      }
    }
  });
}

// === FIXED ABOUT NAV ===
const aboutNavLinks = document.querySelectorAll('.about-nav-link');
const aboutSections = document.querySelectorAll('.about-section');

function setAboutNavActive() {
  const scrollPos = window.scrollY + document.querySelector('.header').offsetHeight + 50;
  aboutNavLinks.forEach(link => link.classList.remove('active'));

  let activeIndex = 0;
  aboutSections.forEach((section, i) => {
    if (scrollPos >= section.offsetTop - 100) {
      activeIndex = i;
    }
  });
  if (aboutNavLinks[activeIndex]) {
    aboutNavLinks[activeIndex].classList.add('active');
  }
}

// INIT
window.addEventListener('scroll', () => {
  setAboutNavActive();
});

window.addEventListener('load', () => {
  setTopNavActive();
  setAboutNavActive();
});

topNavLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Remove all .active classes
    topNavLinks.forEach(l => l.classList.remove('active'));

    // Add .active to the one that was clicked
    this.classList.add('active');
  });
});
aboutNavLinks.forEach(link => link.addEventListener('click', () => {
  setTimeout(setAboutNavActive, 400);
}));