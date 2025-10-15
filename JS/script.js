// --- PROJECTS DATA ---
const projects = [
  { id: "1", client: "WhenToCop?", project: "Ils ont toujours un coup d'avance" },
  { id: "2", client: "Georgio", project: "Son retour sur scène" },
  { id: "3", client: "Adidas", project: "Zidane à Impulstar" },
  { id: "4", client: "Vibre", project: "WIP" },
  { id: "5", client: "PLK x FC Clamart", project: "Nouveau Maillot" }
];

const wrapper = document.querySelector(".slides-wrapper");

// --- GENERATE SLIDES ---
if (wrapper) {
  projects.forEach(p => {
    const slide = document.createElement("div");
    slide.className = "slide card";

    slide.innerHTML = `
      <div class="card-media">
        <img class="card-thumbnail" src="HOMEPAGE/IMG/${p.id}.png" alt="${p.client}">
        <video class="card-video" preload="none" muted>
          <source src="HOMEPAGE/VIDEOS/${p.id}.mp4" type="video/mp4">
        </video>
        <div class="video-overlay"></div>
      </div>
      <div class="content">
        <div class="title-row">
          <h2>${p.client}</h2>
          <h3>${p.project}</h3>
        </div>
      </div>
    `;

    const contactSlide = wrapper.querySelector(".slide6");
    wrapper.insertBefore(slide, contactSlide);
  });
}

// 🔥 seulement maintenant on récupère tous les slides
const slides = document.querySelectorAll(".slide");

const glitch = document.getElementById("glitch");
const logo = document.getElementById("logo");
const glitchFooter = document.getElementById("glitch-footer");
const dots = document.querySelectorAll(".slide-indicator .dot");
let currentSlide = 0;
let isScrolling = false;


// FOOTER / BOUCLE GLITCH CONTINUE
function startFooterGlitch(element) {
  if (!element) return; // sécurité pages sans footer glitch
  let i = 0;

  element.style.display = "block";
  element.style.opacity = "1";
  element.style.backgroundColor = "";

  setInterval(() => {
    element.style.backgroundImage = `url(${glitchImages[i % glitchImages.length]})`;
    i++;
  }, GLITCH_FRAME_DURATION);
}

window.addEventListener("load", () => {
  startFooterGlitch(glitchFooter);
});



// --- SLIDES ---
if (wrapper && slides.length > 0) {

  function showSlide(index) {
    if (index < 0) return;

    currentSlide = index;

    if (index === slides.length - 1) {
      const offset = window.innerHeight * (slides.length - 2) + slides[slides.length - 1].offsetHeight;
      wrapper.style.transform = `translateY(-${offset}px)`;
    } else {
      wrapper.style.transform = `translateY(-${currentSlide * 100}vh)`;
    }
  }

  // --- DOTS ---
  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    if (currentSlide < dots.length) {
      dots[currentSlide].classList.add("active");
    }
  }

  // --- TITLES (à côté des dots) ---
  const indicator = document.querySelector(".slide-indicator");
  if (indicator) {
    const titlesContainer = document.createElement("div");
    titlesContainer.className = "slide-titles";
    indicator.appendChild(titlesContainer);

    slides.forEach((slide, i) => {
      if (slide.classList.contains("slide6") || i === slides.length - 1) return;

      const h2 = slide.querySelector(".content h2, .slide-title");
      const span = document.createElement("span");
      span.innerText = h2 ? h2.innerText : `Slide ${i + 1}`;
      titlesContainer.appendChild(span);
    });

    const titleSpans = titlesContainer.querySelectorAll("span");

    dots.forEach((dot, i) => {
      dot.addEventListener("mouseenter", () => {
        titleSpans.forEach(span => span.classList.remove("active"));
        titleSpans[i].classList.add("active");
      });
      dot.addEventListener("mouseleave", () => {
        titleSpans.forEach(span => span.classList.remove("active"));
      });

      dot.addEventListener("click", () => {
        if (!slides[i].classList.contains("slide6") && i < slides.length - 1) {
          showSlide(i);
        }
      });
    });
  }

  // --- SPLIT TEXT (h2 + h3) ---
  function splitTextByWord(element) {
    const text = element.innerText;
    element.innerHTML = "";
    text.split(" ").forEach((word, i, arr) => {
      const span = document.createElement("span");
      span.innerText = word;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(30px)";
      span.style.transition = "all 0.5s ease";
      span.style.transitionDelay = `${i * 0.10}s`; // un peu plus lent
      element.appendChild(span);

      // remettre l’espace entre les mots sauf après le dernier
      if (i < arr.length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  }

  function animateTitle(el) {
    const spans = el.querySelectorAll("span");
    spans.forEach(span => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    });
  }

  function resetTitle(el) {
    const spans = el.querySelectorAll("span");
    spans.forEach(span => {
      span.style.opacity = "0";
      span.style.transform = "translateY(30px)";
    });
  }

  // Split tous les h2 + h3
  document.querySelectorAll(".content h2, .content h3").forEach(el => splitTextByWord(el));


  // --- VIDEO SMOOTH FADE-IN ---
  slides.forEach(slide => {
    const video = slide.querySelector(".card-video");
    if (!video) return;

    const thumb = slide.querySelector(".card-thumbnail");
    video.style.opacity = 0;
    thumb.style.opacity = 1;
  });

  function playVideoWithThumbnail(slide) {
    const video = slide.querySelector(".card-video");
    const thumb = slide.querySelector(".card-thumbnail");

    // Tout reset avant la nouvelle vidéo
    document.querySelectorAll(".card-video").forEach(v => {
      v.pause();
      v.style.opacity = 0;
      v.style.transform = "scale(1.1)"; // zoom-out pour disparition
      v.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    document.querySelectorAll(".card-thumbnail").forEach(t => {
      t.style.opacity = 1;
      t.style.transition = "opacity 0.5s ease";
    });

    if (video) {
      // Attendre que la slide se stick
      setTimeout(() => {
        // Lancer la vidéo
        video.play().catch(err => console.log("Autoplay bloqué :", err));

        // Appliquer le zoom-in + fade-in
        video.style.transition = "opacity 1s ease, transform 1s ease";
        video.style.opacity = 1;
        video.style.transform = "scale(1)"; // zoom-in à 100%

        if (thumb) {
          thumb.style.opacity = 0;
        }
      }, 2000); // 2s d'attente avant apparition
    }
  }



  // --- PATCH SHOW SLIDE pour titre + vidéo ---
  showSlide = (function (original) {
    return function (index) {
      original(index);
      updateDots();

      // reset tous les titres
      document.querySelectorAll(".content h2, .content h3").forEach(el => resetTitle(el));

      // anime les titres de la slide active
      const activeSlide = slides[index];
      const titlesToAnimate = activeSlide.querySelectorAll(".content h2, .content h3");
      titlesToAnimate.forEach((el, i) => {
        setTimeout(() => animateTitle(el), 200 + i * 150);
      });

      // lance la vidéo smooth
      playVideoWithThumbnail(activeSlide);

      // MENU & LOGO clair/sombre
      const header = document.querySelector("header");
      const logo = document.getElementById("logo");
      const isDarkSlide =
        activeSlide.classList.contains("slide6") ||
        activeSlide.classList.contains("footer-glitch");

      if (isDarkSlide) {
        header.classList.add("menu-dark");
      } else {
        header.classList.remove("menu-dark");
      }

      const newLogo = isDarkSlide ? "img/LOGO_noir.png" : "img/LOGO_blanc2.png";
      if (!logo.src.includes(newLogo)) {
        logo.style.opacity = "0";
        setTimeout(() => {
          logo.src = newLogo;
          logo.style.opacity = "1";
        }, 600);
      } else {
        logo.src = newLogo;
      }
    };
  })(showSlide);

  // --- SCROLL ---
  function scrollHandler(event) {
    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0 && currentSlide < slides.length - 1) {
      showSlide(currentSlide + 1);
    } else if (event.deltaY < 0 && currentSlide > 0) {
      showSlide(currentSlide - 1);
    } else {
      document.body.style.overflowY = "auto";
      window.removeEventListener("wheel", scrollHandler);
    }

    setTimeout(() => { isScrolling = false; }, 1200);
  }
  window.addEventListener("wheel", scrollHandler, { passive: false });

  // --- LOGO CLICK pour reset glitch ---
  if (logo) {
    logo.addEventListener("click", () => {
      playGlitch();
      setTimeout(() => {
        showSlide(0);
        document.body.style.overflowY = "hidden";
        window.addEventListener("wheel", scrollHandler, { passive: false });
      }, 600);
    });
  }

  // --- SCROLL CONTACT ---
  const scrollContact = document.querySelector(".scroll-contact");
  if (scrollContact) {
    scrollContact.addEventListener("click", e => {
      e.preventDefault();
      const contactIndex = [...slides].findIndex(slide => slide.classList.contains("slide6"));
      if (contactIndex !== -1) showSlide(contactIndex);
    });
  }

  // --- DROPDOWN ---
  const dropdown = document.querySelector(".dropdown > a");
  const dropdownParent = document.querySelector(".dropdown");
  if (dropdown && dropdownParent) {
    dropdown.addEventListener("click", e => {
      e.preventDefault();
      dropdownParent.classList.toggle("open");
    });
    document.addEventListener("click", e => {
      if (!dropdownParent.contains(e.target)) dropdownParent.classList.remove("open");
    });
  }

  window.addEventListener("load", () => {
    // Vérifier si on arrive avec #contact
    if (window.location.hash === "#contact") {
      const contactIndex = [...slides].findIndex(slide => slide.classList.contains("slide6"));
      if (contactIndex !== -1) {
        // Timeout pour s'assurer que wrapper et slides sont prêts
        setTimeout(() => {
          showSlide(contactIndex); // affiche directement la slide 6
        }, 100);
      }
    }
  });

  // --- INIT ---
  showSlide(0);
  updateDots();
}


// === MENTIONS LÉGALES POPUP ===
document.addEventListener("DOMContentLoaded", () => {
  const mentionsBtn = document.querySelector(".mentions");
  const mentionsPopup = document.getElementById("mentionsPopup");
  const closeMentions = document.querySelector(".close-mentions");

  if (mentionsBtn && mentionsPopup && closeMentions) {
    mentionsBtn.style.cursor = "pointer";
    mentionsBtn.addEventListener("click", () => {
      mentionsPopup.style.display = "block";
      document.body.style.overflow = "hidden"; // bloque le scroll
    });

    closeMentions.addEventListener("click", () => {
      mentionsPopup.style.display = "none";
      document.body.style.overflow = "";
    });

    // Fermeture si clic en dehors du contenu
    mentionsPopup.addEventListener("click", (e) => {
      if (e.target === mentionsPopup) {
        mentionsPopup.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Fermeture avec la touche Échap
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        mentionsPopup.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
});

function initVideoOverlay() {
  const videoOverlay = document.getElementById("videoOverlay");
  const overlayVideo = document.getElementById("overlayVideo");
  const overlayClient = document.getElementById("overlayClient");
  const overlayProject = document.getElementById("overlayProject");
  const overlayClose = document.getElementById("overlayClose");

  const playBtn = document.getElementById("playBtn");
  const timeCounter = document.getElementById("timeCounter");
  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");
  const volumeBtn = document.getElementById("volumeBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  function togglePlayPause() {
    if (overlayVideo.paused) {
      overlayVideo.play().catch(err => console.log("Lecture auto bloquée :", err));
    } else {
      overlayVideo.pause();
    }
  }

  // --- OUVRIR LE POPUP ---
  const cards = document.querySelectorAll(".slide.card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const sourceEl = card.querySelector(".card-video source");
      const videoSrc = sourceEl ? sourceEl.src : (card.querySelector(".card-video video")?.src || "");
      const client = card.querySelector("h2")?.innerText || "";
      const project = card.querySelector("h3")?.innerText || "";

      overlayVideo.src = videoSrc;
      overlayClient.innerText = client;
      overlayProject.innerText = project;
      videoOverlay.style.display = "flex";

      // --- Volume à 0 et mute par défaut ---
      overlayVideo.volume = 0;
      overlayVideo.muted = true;
      volumeSlider.value = 0;
      volumeBtn.src = "img/icones/volume-off.png";

      overlayVideo.play().catch(err => console.log("Lecture auto bloquée :", err));
      playBtn.innerText = "⏸";
    });
  });

  // --- FERMER LE POPUP ---
  function closeOverlay() {
    overlayVideo.pause();
    overlayVideo.removeAttribute("src");
    overlayVideo.load();
    videoOverlay.style.display = "none";
  }

  overlayClose.addEventListener("click", closeOverlay);

  // ✅ clic sur fond noir : ferme seulement si on clique sur le fond lui-même
  videoOverlay.addEventListener("click", (e) => {
    // Si la cible directe du clic est le conteneur principal (= fond noir)
    if (e.target === videoOverlay) {
      closeOverlay();
    }
  });


  // --- Clic sur la vidéo : play/pause ---
  overlayVideo.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePlayPause();
  });

  // --- Clavier ---
  document.addEventListener("keydown", (e) => {
    if (videoOverlay.style.display === "flex") {
      if (e.key === "Escape" || e.key === "Esc") closeOverlay();
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
    }
  });

  // --- Bouton play ---
  playBtn.addEventListener("click", togglePlayPause);
  overlayVideo.addEventListener("play", () => playBtn.innerText = "⏸");
  overlayVideo.addEventListener("pause", () => playBtn.innerText = "▶");

  // --- Temps & barre de progression ---
  function formatTime(sec) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  overlayVideo.addEventListener("timeupdate", () => {
    const cur = overlayVideo.currentTime;
    const dur = overlayVideo.duration || 0;
    timeCounter.innerText = `${formatTime(cur)} / ${formatTime(dur)}`;
    progressBar.style.width = dur ? `${(cur / dur) * 100}%` : "0";
  });

  progressContainer.addEventListener("click", e => {
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (overlayVideo.duration) overlayVideo.currentTime = percent * overlayVideo.duration;
  });

  // --- Volume ---
  volumeBtn.addEventListener("click", () => {
    overlayVideo.muted = !overlayVideo.muted;
    volumeBtn.src = overlayVideo.muted ? "img/icones/volume-off.png" : "img/icones/volume-on.png";
    if (!overlayVideo.muted && overlayVideo.volume === 0) {
      overlayVideo.volume = 0.5;
      volumeSlider.value = 0.5;
    }
  });

  volumeSlider.addEventListener("input", () => {
    const v = Number(volumeSlider.value);
    overlayVideo.volume = v;
    overlayVideo.muted = v === 0;
    volumeBtn.src = overlayVideo.muted ? "img/icones/volume-off.png" : "img/icones/volume-on.png";
  });

  // --- Fullscreen ---
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      videoOverlay.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  });
}

window.addEventListener("load", initVideoOverlay);

