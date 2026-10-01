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
