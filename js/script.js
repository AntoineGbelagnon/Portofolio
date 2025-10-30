// script.js
(function () {
  // AOS
  document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
      AOS.init({ duration: 800, once: true });
    }
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Typewriter effect (vérifie l'élément)
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      "Junior Front end Developer",
      "UI/UX Enthusiast",
      "Quick Learner",
      "Team Player"
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex] || '';
      if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex = Math.min(currentPhrase.length, charIndex + 1);
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500);
      } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
      }
    }

    setTimeout(typeWriter, 1000);
  }

  // particles.js init (corrigé)
  window.addEventListener('load', () => {
    if (window.particlesJS) {
      particlesJS("particles-js", {
        "particles": {
          "number": { "value": 45, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#F0F4F8" },
          "shape": { "type": "circle" },
          "opacity": { "value": 0.8, "random": false },
          "size": { "value": 3, "random": true },
          "line_linked": { "enable": true, "distance": 220, "color": "#F0F4F8", "opacity": 0.4, "width": 1.8 },
          "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
          "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8 }, "repulse": { "distance": 200 } }
        },
        "retina_detect": true
      });
    }
  });

  // Smooth scrolling for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href') || '';
      if (href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --- Handler: envoyer le message vers WhatsApp (ouvre la conversation du visiteur vers ton numéro) ---
  // IMPORTANT : remplace PHONE_NUMBER ci‑dessous par ton numéro (ex: 33612345678)
  const WHATSAPP_NUMBER = 'PHONE_NUMBER';

  // sélection du formulaire (la div dans ton HTML s'appelle .contact-form)
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm && WHATSAPP_NUMBER && WHATSAPP_NUMBER !== 'PHONE_NUMBER') {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // lecture des champs (assure-toi que les ids existent dans le HTML)
      const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
      const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
      const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
      const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

      // construction du texte
      const text = `Nouveau message depuis ton site portfolio.%0A%0ANom: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AObjet: ${encodeURIComponent(subject)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

      // choix du schéma selon device
      const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
      const waLink = isMobile
        ? `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${text}`
        : `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

      // ouvre la conversation dans un nouvel onglet (l'utilisateur doit confirmer l'envoi)
      window.open(waLink, '_blank');

      // optionnel : feedback visuel sur le site (ex: reset du formulaire ou message)
      contactForm.reset();
    });
  } else {
    // si numéro non défini, log pour développement
    if (!contactForm) console.warn('Contact form non trouvé (.contact-form form).');
    if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === 'PHONE_NUMBER') console.warn('22892508173');
  }

  // --- Handler: envoyer un e-mail via EmailJS (remplace SERVICE_ID / TEMPLATE_ID / USER_ID) ---
  // Crée un compte https://www.emailjs.com/ et récupère : service ID, template ID et user ID
  // Template variables attendues : from_name, from_email, to_email, subject, message, reply_to
  const EMAILJS_SERVICE = 'SERVICE_ID';
  const EMAILJS_TEMPLATE = 'TEMPLATE_ID';
  const EMAILJS_USER = 'USER_ID'; // initialize emailjs

  // initialise EmailJS si la lib est chargée
  if (window.emailjs) {
    try { emailjs.init(EMAILJS_USER); } catch (err) { /* ignore si déjà initialisé */ }
  }

  const contactForm2 = document.querySelector('.contact-form form');
  if (contactForm2) {
    contactForm2.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const subject = (document.getElementById('subject') || {}).value || '';
      const message = (document.getElementById('message') || {}).value || '';

      // validation simple
      if (!email || !name || !message) {
        alert('Merci de renseigner au minimum votre nom, email et message.');
        return;
      }

      // paramètres pour le template EmailJS
      const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'gbelagnonmawoukoantoine@gmail.com', // <- remplace par TON mail destinataire
        subject: subject,
        message: message,
        reply_to: email // important : met le mail du visiteur en reply-to
      };

      if (!window.emailjs) {
        console.warn('EmailJS non chargé. Ajoute <script src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script> dans index.html');
        alert('Impossible d\'envoyer le message (service non disponible).');
        return;
      }

      emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams)
        .then(() => {
          alert('Message envoyé — tu le recevras par e‑mail.');
          contactForm2.reset();
        }, (err) => {
          console.error('Erreur EmailJS:', err);
          alert('Échec de l\'envoi. Vérifie la configuration EmailJS dans le script.');
        });
    });
  }
})();
