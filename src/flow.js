// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-YK11EX325Z");
gtag("config", "G-D2Q87TKQBX");

// Tabblad-titel verandert bij verlaten
document.addEventListener("visibilitychange", function () {
  document.title = document.hidden
    ? "hey! come back!"
    : "wolf ver elst – portfolio";
});// Smooth scrolling for navigation links







document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    document.addEventListener('keydown', function(event) {
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
            const scrollX = -scrollPercent * maxScroll * 0.4;

            scrollContent.style.transform = `translateX(${scrollX}px)`;
        }
    });
});

// Active nav highlight for About section
const aboutNavLinks = document.querySelectorAll('.about-nav-link');
const sections = document.querySelectorAll('.about-section');

function setActiveLink() {
    const scrollPos = window.scrollY + document.querySelector('.header').offsetHeight + 40;

    let activeIndex = 0;
    sections.forEach((section, i) => {
        if (scrollPos >= section.offsetTop) {
            activeIndex = i;
        }
    });

    aboutNavLinks.forEach(link => link.classList.remove('active'));
    if (aboutNavLinks[activeIndex]) {
        aboutNavLinks[activeIndex].classList.add('active');
    }
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Active state for top nav
const topNavLinks = document.querySelectorAll('.nav-link');
const topSections = [
    { id: '#work', link: topNavLinks[0] },
    { id: '#studio', link: topNavLinks[1] },
    { id: '#about-contact', link: topNavLinks[2] }
];
function setTopNavActive() {
    const scrollPos = window.scrollY + document.querySelector('.header').offsetHeight + 40;

    topNavLinks.forEach(link => link.classList.remove('active'));

    let activeFound = false;

    topSections.slice().reverse().forEach(({ id, link }) => {
        const section = document.querySelector(id);
        if (section && !activeFound && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            link.classList.add('active');
            activeFound = true;
        }
    });
}

window.addEventListener('scroll', setTopNavActive);
window.addEventListener('load', setTopNavActive);



