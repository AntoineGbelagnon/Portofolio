// script.js
(function () {

  /* ===================== AOS ===================== */
  document.addEventListener("DOMContentLoaded", () => {
    if (window.AOS) {
      AOS.init({ duration: 800, once: true });
    }
  });

  /* ===================== MENU MOBILE ===================== */
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /* ===================== TYPEWRITER ===================== */
  const typewriterElement = document.getElementById("typewriter");

  if (typewriterElement) {
    const phrases = [
      "Junior Front-End Developer",
      "UI/UX Enthusiast",
      "Quick Learner",
      "Team Player"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typewriterElement.textContent =
        currentPhrase.substring(0, charIndex);

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1500);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }

    setTimeout(typeWriter, 1000);
  }

  /* ===================== PARTICLES.JS ===================== */
  window.addEventListener("load", () => {
    if (window.particlesJS) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 45, density: { enable: true, value_area: 800 } },
          color: { value: "#F0F4F8" },
          shape: { type: "circle" },
          opacity: { value: 0.8 },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 220,
            color: "#F0F4F8",
            opacity: 0.4,
            width: 1.8
          },
          move: { enable: true, speed: 2 }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
          },
          modes: {
            grab: { distance: 200, line_linked: { opacity: 1 } }
          }
        },
        retina_detect: true
      });
    }
  });

  /* ===================== SMOOTH SCROLL ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ===================== EMAILJS (SDK v4 OK) ===================== */
if (typeof emailjs === "undefined") {
    console.error("EmailJS non chargé");
    return;
  }
  emailjs.init("mBtMnqo6tGtm15pG7"); // clé publique

  const form = document.querySelector(".contact-form form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const from_name = document.getElementById("name").value.trim();
    const from_email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!from_name || !from_email || !message) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Formatage HTML du message
    const htmlMessage = `
      <p><strong>Nom :</strong> ${from_name}</p>
      <p><strong>Email :</strong> ${from_email}</p>
      <p><strong>Message :</strong> <em>${message}</em></p>
    `;

    const params = {
      from_name,
      from_email,
      subject: "Message Portfolio", // Sujet fixe
      message: htmlMessage,
      reply_to: from_email
    };

    emailjs.send("service_58x47pp", "template_ggbiifm", params)
      .then(() => {
        alert("✅ Message envoyé avec succès !");
        form.reset();
      })
      .catch(err => {
        console.error("Erreur EmailJS :", err);
        alert("❌ Une erreur est survenue lors de l’envoi.");
      });
  });

})();
