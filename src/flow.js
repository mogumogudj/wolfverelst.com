(() => {
  'use strict';

  /* =========================================================
     SETTINGS + HELPERS
  ========================================================= */

  const header = document.querySelector('.header');
  const getHeaderHeight = () => (header ? header.offsetHeight : 0);
  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const desktopMotion = window.matchMedia(
    '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
  );

  const finePointer = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  );

  const isTouchDevice = () =>
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    );


  /* =========================================================
     SMOOTH SCROLLING FOR INTERNAL LINKS
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      // Some existing links use href="#" as a placeholder.
      if (!href || href === '#') return;

      let target;

      try {
        target = document.querySelector(href);
      } catch {
        return;
      }

      if (!target) return;

      event.preventDefault();

      const targetY =
        target.getBoundingClientRect().top +
        window.scrollY -
        getHeaderHeight() -
        20;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    });
  });


  /* =========================================================
     HERO SLIDESHOW
  ========================================================= */

  const slideshow = document.querySelector('#slideshow');

  const slides = slideshow
    ? Array.from(slideshow.querySelectorAll('.slide'))
    : [];

  const pauseInstruction =
    document.querySelector('#pause-instruction');

  let currentSlide = 0;
  let slideshowTimer = null;
  let slideshowPaused = false;

  const SLIDE_DELAY = 1500;


  const showSlide = (index) => {
    if (!slides.length) return;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };


  const nextSlide = () => {
    currentSlide =
      (currentSlide + 1) % slides.length;

    showSlide(currentSlide);
  };


  const stopSlideshow = () => {
    if (slideshowTimer !== null) {
      clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  };


  const startSlideshow = () => {
    stopSlideshow();

    if (
      slides.length < 2 ||
      slideshowPaused ||
      document.hidden
    ) {
      return;
    }

    slideshowTimer =
      setInterval(nextSlide, SLIDE_DELAY);
  };


  const updatePauseInstruction = () => {
    if (!pauseInstruction) return;

    const mobile =
      isTouchDevice() ||
      window.innerWidth <= 767;

    if (mobile) {
      pauseInstruction.textContent =
        slideshowPaused
          ? '[tap to resume]'
          : '[tap to pause]';
    } else {
      pauseInstruction.textContent =
        slideshowPaused
          ? '[click or press space to resume]'
          : '[click or press space to pause]';
    }
  };


  const toggleSlideshow = () => {
    if (!slides.length) return;

    slideshowPaused = !slideshowPaused;

    slideshow?.classList.toggle(
      'expanded',
      slideshowPaused
    );

    if (slideshowPaused) {
      stopSlideshow();
    } else {
      startSlideshow();
    }

    updatePauseInstruction();
  };


  if (slides.length) {
    showSlide(currentSlide);

    updatePauseInstruction();

    startSlideshow();


    slideshow?.addEventListener(
      'click',
      toggleSlideshow
    );


    document.addEventListener(
      'keydown',
      (event) => {

        const activeElement =
          document.activeElement;

        const isTyping =
          activeElement &&
          (
            activeElement.matches(
              'input, textarea, select'
            ) ||
            activeElement.isContentEditable
          );


        if (
          event.code === 'Space' &&
          !isTyping
        ) {
          event.preventDefault();

          toggleSlideshow();
        }
      }
    );


    document.addEventListener(
      'visibilitychange',
      () => {

        if (document.hidden) {
          stopSlideshow();
        } else {
          startSlideshow();
        }

      }
    );


    window.addEventListener(
      'resize',
      updatePauseInstruction,
      {
        passive: true
      }
    );
  }


  /* =========================================================
     WAYSIDE-STYLE PROJECT SCROLL
     DESKTOP ONLY

     Text stays pinned behind the images.
     Images move horizontally over the text.

     Mobile uses the CSS scroll-snap gallery instead.
  ========================================================= */

  const projectScenes = Array.from(
    document.querySelectorAll(
      '[data-project-scene]'
    )
  );


  let projectMetrics = [];

  let projectTicking = false;

  let projectResizeTimer = null;


  const resetProjectScenes = () => {

    projectScenes.forEach((scene) => {

      scene.style.removeProperty(
        '--scene-height'
      );

      const track =
        scene.querySelector(
          '.horizontal-scroll'
        );

      track?.style.removeProperty(
        '--track-x'
      );

    });


    projectMetrics = [];
  };


  const updateProjectScenes = () => {

    projectTicking = false;


    if (
      !desktopMotion.matches ||
      !projectMetrics.length
    ) {
      return;
    }


    const scrollY =
      window.scrollY;


    projectMetrics.forEach(
      (metric) => {

        const progress =
          clamp(
            (
              scrollY -
              metric.top
            ) /
            metric.travel
          );


        const x =
          metric.startX +
          (
            metric.endX -
            metric.startX
          ) *
          progress;


        metric.track.style.setProperty(
          '--track-x',
          `${x.toFixed(2)}px`
        );

      }
    );
  };


  const measureProjectScenes = () => {

    resetProjectScenes();


    /*
      IMPORTANT:

      Under 768px this completely stops
      the desktop horizontal scroll
      animation.

      Mobile is controlled by CSS instead.
    */

    if (
      !desktopMotion.matches ||
      !projectScenes.length
    ) {
      return;
    }


    const viewportWidth =
      window.innerWidth;

    const viewportHeight =
      window.innerHeight;


    projectMetrics =
      projectScenes
        .map((scene) => {

          const track =
            scene.querySelector(
              '.horizontal-scroll'
            );


          if (!track) {
            return null;
          }


          const trackWidth =
            track.scrollWidth;


          /*
            The gallery starts mostly
            outside the viewport on
            the right.
          */

          const startX =
            viewportWidth * 0.88;


          /*
            Final image moves completely
            across the project text and
            towards the left side.
          */

          const endX =
            Math.min(

              viewportWidth * 0.08 -
              trackWidth,

              -viewportWidth * 0.35

            );


          const horizontalTravel =
            Math.max(

              viewportWidth,

              startX -
              endX

            );


          /*
            Slightly faster than a strict
            1:1 vertical-to-horizontal
            scroll.

            0.82 gives it a cleaner and
            less sluggish feel.
          */

          const verticalTravel =
            Math.max(

              viewportHeight * 1.35,

              horizontalTravel * 0.82

            );


          scene.style.setProperty(

            '--scene-height',

            `${
              Math.round(
                viewportHeight +
                verticalTravel
              )
            }px`

          );


          return {

            track,

            startX,

            endX,

            top:
              scene
                .getBoundingClientRect()
                .top +
              window.scrollY,

            travel:
              verticalTravel

          };

        })
        .filter(Boolean);


    updateProjectScenes();
  };


  const requestProjectUpdate = () => {

    if (projectTicking) {
      return;
    }


    projectTicking = true;


    requestAnimationFrame(
      updateProjectScenes
    );
  };


  const requestProjectRemeasure = () => {

    clearTimeout(
      projectResizeTimer
    );


    projectResizeTimer =
      setTimeout(
        () => {

          requestAnimationFrame(
            measureProjectScenes
          );

        },
        100
      );
  };


  if (projectScenes.length) {

    window.addEventListener(
      'scroll',
      requestProjectUpdate,
      {
        passive: true
      }
    );


    window.addEventListener(
      'resize',
      requestProjectRemeasure,
      {
        passive: true
      }
    );


    /*
      Track widths may change after
      images are loaded or resized.
    */

    if ('ResizeObserver' in window) {

      const resizeObserver =
        new ResizeObserver(
          () => {

            if (
              desktopMotion.matches
            ) {

              requestProjectRemeasure();

            }

          }
        );


      projectScenes.forEach(
        (scene) => {

          const track =
            scene.querySelector(
              '.horizontal-scroll'
            );


          if (track) {

            resizeObserver.observe(
              track
            );

          }

        }
      );
    }


    /*
      When switching between desktop
      and mobile, reset all inline
      animation values.
    */

    const motionModeChanged =
      () => {

        requestProjectRemeasure();

      };


    if (
      desktopMotion.addEventListener
    ) {

      desktopMotion.addEventListener(
        'change',
        motionModeChanged
      );

    } else {

      desktopMotion.addListener(
        motionModeChanged
      );

    }


    /*
      Recalculate once all image
      dimensions are fully known.
    */

    window.addEventListener(
      'load',
      requestProjectRemeasure,
      {
        once: true
      }
    );


    measureProjectScenes();
  }


  /* =========================================================
     TOP NAV ACTIVE STATE
     PROJECTS / INFO / EMAIL
  ========================================================= */

  const topNavLinks =
    Array.from(
      document.querySelectorAll(
        '.nav-link'
      )
    );


  const workSection =
    document.querySelector(
      '#work'
    );


  const studioSection =
    document.querySelector(
      '#studio'
    );


  const contactSection =
    document.querySelector(
      '#about-contact'
    );


  const projectsLink =
    document.querySelector(
      '.nav-link[href="#work"]'
    );


  const infoLink =
    document.querySelector(
      '.nav-link[href="#studio"]'
    );


  const emailLink =
    document.querySelector(
      '.nav-link[href="#about-contact"]'
    );


  let navTicking = false;


  const setTopNavActive = () => {

    navTicking = false;


    if (!topNavLinks.length) {
      return;
    }


    const marker =

      window.scrollY +

      getHeaderHeight() +

      window.innerHeight *
      0.18;


    topNavLinks.forEach(
      (link) =>
        link.classList.remove(
          'active'
        )
    );


    /*
      CONTACT
    */

    if (
      contactSection &&
      marker >=
        contactSection.offsetTop -
        80
    ) {

      emailLink?.classList.add(
        'active'
      );

      return;

    }


    /*
      INFO
    */

    if (
      studioSection &&
      marker >=
        studioSection.offsetTop
    ) {

      infoLink?.classList.add(
        'active'
      );

      return;

    }


    /*
      PROJECTS
    */

    if (
      workSection &&
      marker >=
        workSection.offsetTop
    ) {

      projectsLink?.classList.add(
        'active'
      );

    }

  };


  const requestTopNavUpdate = () => {

    if (navTicking) {
      return;
    }


    navTicking = true;


    requestAnimationFrame(
      setTopNavActive
    );

  };


  window.addEventListener(
    'scroll',
    requestTopNavUpdate,
    {
      passive: true
    }
  );


  window.addEventListener(
    'resize',
    requestTopNavUpdate,
    {
      passive: true
    }
  );


  /*
    Immediately show clicked navigation
    state while smooth scrolling.
  */

  topNavLinks.forEach(
    (link) => {

      link.addEventListener(
        'click',
        () => {

          topNavLinks.forEach(
            (item) =>
              item.classList.remove(
                'active'
              )
          );


          link.classList.add(
            'active'
          );

        }
      );

    }
  );


  setTopNavActive();


  /* =========================================================
     ABOUT SIDE NAV
  ========================================================= */

  const aboutNavLinks =
    Array.from(
      document.querySelectorAll(
        '.about-nav-link'
      )
    );


  const aboutSections =
    aboutNavLinks
      .map(
        (link) => {

          const href =
            link.getAttribute(
              'href'
            );


          return href
            ? document.querySelector(
                href
              )
            : null;

        }
      )
      .filter(Boolean);


  const setAboutActive =
    (sectionId) => {

      aboutNavLinks.forEach(
        (link) => {

          link.classList.toggle(

            'active',

            link.getAttribute(
              'href'
            ) ===
              `#${sectionId}`

          );

        }
      );

    };


  /*
    IntersectionObserver is cleaner and
    more reliable than constantly
    calculating offsets on scroll.
  */

  if (
    aboutNavLinks.length &&
    aboutSections.length &&
    'IntersectionObserver' in window
  ) {

    const observer =
      new IntersectionObserver(

        (entries) => {

          const mostVisible =
            entries

              .filter(
                (entry) =>
                  entry.isIntersecting
              )

              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              )[0];


          if (mostVisible) {

            setAboutActive(
              mostVisible.target.id
            );

          }

        },

        {

          rootMargin:
            '-25% 0px -55% 0px',

          threshold: [
            0,
            0.1,
            0.25,
            0.5,
            0.75
          ]

        }

      );


    aboutSections.forEach(
      (section) =>
        observer.observe(section)
    );

  } else if (
    aboutNavLinks.length &&
    aboutSections.length
  ) {

    /*
      Fallback for older browsers.
    */

    const updateAboutFallback =
      () => {

        const marker =

          window.scrollY +

          getHeaderHeight() +

          100;


        let activeSection =
          aboutSections[0];


        aboutSections.forEach(
          (section) => {

            if (
              marker >=
              section.offsetTop
            ) {

              activeSection =
                section;

            }

          }
        );


        if (activeSection) {

          setAboutActive(
            activeSection.id
          );

        }

      };


    window.addEventListener(
      'scroll',
      updateAboutFallback,
      {
        passive: true
      }
    );


    updateAboutFallback();
  }


  aboutNavLinks.forEach(
    (link) => {

      link.addEventListener(
        'click',
        () => {

          const href =
            link.getAttribute(
              'href'
            );


          if (
            href?.startsWith('#')
          ) {

            setAboutActive(
              href.slice(1)
            );

          }

        }
      );

    }
  );


  /* =========================================================
     CUSTOM CURSOR
     DESKTOP / FINE POINTER ONLY
  ========================================================= */

  if (finePointer.matches) {

    const cursor =
      document.querySelector(
        '#cursor'
      );


    const cursor2 =
      document.querySelector(
        '#cursor2'
      );


    const cursor3 =
      document.querySelector(
        '#cursor3'
      );


    const wolfText =
      document.querySelector(
        '#wolfverelst'
      );


    let mouseX = -100;
    let mouseY = -100;

    let cursor2X = -100;
    let cursor2Y = -100;

    let cursor3X = -100;
    let cursor3Y = -100;

    let cursorFrame = null;


    /*
      cursor = immediate
      cursor2 = faster follower
      cursor3 = slower follower

      This keeps your custom cursor but
      makes it feel smoother.
    */

    const animateCursor = () => {

      if (cursor) {

        cursor.style.left =
          `${mouseX}px`;

        cursor.style.top =
          `${mouseY}px`;

      }


      if (cursor2) {

        cursor2X +=
          (
            mouseX -
            cursor2X
          ) *
          0.22;


        cursor2Y +=
          (
            mouseY -
            cursor2Y
          ) *
          0.22;


        cursor2.style.left =
          `${cursor2X}px`;

        cursor2.style.top =
          `${cursor2Y}px`;

      }


      if (cursor3) {

        cursor3X +=
          (
            mouseX -
            cursor3X
          ) *
          0.12;


        cursor3Y +=
          (
            mouseY -
            cursor3Y
          ) *
          0.12;


        cursor3.style.left =
          `${cursor3X}px`;

        cursor3.style.top =
          `${cursor3Y}px`;

      }


      cursorFrame =
        requestAnimationFrame(
          animateCursor
        );

    };


    window.addEventListener(

      'pointermove',

      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;


        if (!cursorFrame) {

          cursorFrame =
            requestAnimationFrame(
              animateCursor
            );

        }

      },

      {
        passive: true
      }

    );


    /*
      Wolf hover image
    */

    if (
      wolfText &&
      cursor2 &&
      cursor3
    ) {

      const addWolfHover =
        () => {

          document.body.classList.add(
            'cursor-wolfverelst'
          );

          cursor2.classList.add(
            'hover'
          );

          cursor3.classList.add(
            'hover'
          );

        };


      const removeWolfHover =
        () => {

          document.body.classList.remove(
            'cursor-wolfverelst'
          );

          cursor2.classList.remove(
            'hover'
          );

          cursor3.classList.remove(
            'hover'
          );

        };


      wolfText.addEventListener(
        'pointerenter',
        addWolfHover
      );


      wolfText.addEventListener(
        'pointerleave',
        removeWolfHover
      );

    }

  }

})();