/* =========================================================
   DAILYJOURNAL — SCRIPT.JS
   ========================================================= */


/* =========================
   MOBILE MENU
   ========================= */

const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");

if (menuBtn && links) {

  menuBtn.addEventListener("click", () => {

    links.classList.toggle("open");

    const isOpen = links.classList.contains("open");

    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    menuBtn.textContent = isOpen ? "✕" : "☰";

  });

}


/* =========================
   CLOSE MOBILE MENU
   ========================= */

document
  .querySelectorAll(".links a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      links?.classList.remove("open");

      if (menuBtn) {
        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
          "aria-label",
          "Open menu"
        );
      }

    });

  });


/* =========================
   SMOOTH SCROLL
   ========================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


/* =========================
   START JOURNAL BUTTON
   ========================= */

const startBtn =
  document.getElementById("startBtn");

const toast =
  document.getElementById("toast");


if (startBtn && toast) {

  startBtn.addEventListener("click", () => {

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 2600);

  });

}


/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */

const navbar =
  document.querySelector(".nav");


window.addEventListener("scroll", () => {

  if (!navbar) return;

  if (window.scrollY > 30) {

    navbar.style.boxShadow =
      "0 10px 35px rgba(16, 29, 59, 0.08)";

  } else {

    navbar.style.boxShadow = "none";

  }

});


/* =========================
   FEATURE CARD REVEAL
   ========================= */

const revealItems =
  document.querySelectorAll(
    ".feature-card, .about-grid, .preview-copy, .browser, .start-card"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealItems.forEach((item) => {

  item.classList.add("reveal");

  revealObserver.observe(item);

});


/* =========================
   CURRENT YEAR
   ========================= */

const yearElement =
  document.querySelector("footer small");

if (yearElement) {

  yearElement.textContent =
    `© ${new Date().getFullYear()} dailyjournal. All rights reserved.`;

}


/* =========================
   IMAGE FALLBACK
   ========================= */

document
  .querySelectorAll("img")
  .forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.style.display = "none";

      }
    );

  });



/* DailyJournal Auto Scroll
   - Starts after 2 seconds of no user activity.
   - Scrolls slowly downward.
   - When the bottom is reached, quickly returns to the top.
   - Then resumes slow scrolling after the inactivity delay.
*/
(() => {
  const AUTO_SCROLL_DELAY = 2000;
  const AUTO_SCROLL_STEP = 1.15;
  const AUTO_SCROLL_INTERVAL = 16;
  const RETURN_TO_TOP_DURATION = 420;

  let idleTimer = null;
  let scrollTimer = null;
  let returning = false;
  let lastActivity = 0;

  const isAtBottom = () =>
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4;

  const stopAutoScroll = () => {
    if (scrollTimer !== null) {
      clearInterval(scrollTimer);
      scrollTimer = null;
    }
    returning = false;
  };

  const startAutoScroll = () => {
    stopAutoScroll();

    if (document.documentElement.scrollHeight <= window.innerHeight + 4) return;

    scrollTimer = window.setInterval(() => {
      if (returning) return;

      if (isAtBottom()) {
        returning = true;
        const start = window.scrollY;
        const startTime = performance.now();

        const animateTop = (now) => {
          const progress = Math.min(1, (now - startTime) / RETURN_TO_TOP_DURATION);
          const eased = 1 - Math.pow(1 - progress, 3);
          window.scrollTo(0, Math.round(start * (1 - eased)));

          if (progress < 1) {
            requestAnimationFrame(animateTop);
          } else {
            window.scrollTo(0, 0);
            returning = false;
          }
        };

        requestAnimationFrame(animateTop);
        return;
      }

      window.scrollBy(0, AUTO_SCROLL_STEP);
    }, AUTO_SCROLL_INTERVAL);
  };

  const resetIdleTimer = () => {
    const now = Date.now();

    // Ignore the scroll events generated by this script itself.
    if (now - lastActivity < 50) return;
    lastActivity = now;

    stopAutoScroll();
    clearTimeout(idleTimer);
    idleTimer = window.setTimeout(startAutoScroll, AUTO_SCROLL_DELAY);
  };

  ["mousemove", "mousedown", "keydown", "touchstart", "touchmove", "wheel", "pointerdown"].forEach((eventName) => {
    window.addEventListener(eventName, resetIdleTimer, { passive: true });
  });

  // A manually initiated scroll should pause auto-scroll and restart the 2-second timer.
  window.addEventListener("scroll", () => {
    if (!returning) resetIdleTimer();
  }, { passive: true });

  window.addEventListener("resize", resetIdleTimer, { passive: true });

  resetIdleTimer();
})();
