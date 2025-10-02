// --- PROJECTS DATA ---
const projects = [
  { id: "1", client: "WhenToCop?", project: "Ils ont toujours un coup d'avance"},
  { id: "2", client: "Georgio", project: "Son retour sur scène"},
  { id: "3", client: "Adidas", project: "Zidane à Impulstar"},
  { id: "4", client: "Vibre", project: "WIP"},
  { id: "5", client: "PLK x FC Clamart", project: "Nouveau Maillot"}
];

const wrapper = document.querySelector(".slides-wrapper");

// --- GENERATE SLIDES ---
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

// 🔥 seulement maintenant on récupère tous les slides
const slides = document.querySelectorAll(".slide");



const glitch = document.getElementById("glitch");
const logo = document.getElementById("logo");
const glitchFooter = document.getElementById("glitch-footer");
const dots = document.querySelectorAll(".slide-indicator .dot");
let currentSlide = 0;
let isScrolling = false;

// Liste des images glitch disponibles
const glitchImages = [
  "glitch/glitch1.png",
  "glitch/glitch2.png",
  "glitch/glitch3.png",
  "glitch/glitch4.png",
  "glitch/glitch5.png",
  "glitch/glitch6.png",
  "glitch/glitch7.png",
  "glitch/glitch8.png",
  "glitch/glitch9.png",
  "glitch/glitch10.png"
];


// paramètres glitch
const GLITCH_FRAME_DURATION = 100; // ms par image
const LOADER_FLASH_DURATION = 120; // ms du "flash" final loader
const FOOTER_FRAMES_PER_PLAY = 6;  // nb d'images montrées à chaque appel footer
const FOOTER_PAUSE = 400;          // pause entre deux plays footer (ms)

let glitchFooterIndex = 0;

// LOADER (affiche puis flash)
function playGlitch() {
  glitch.style.display = "block";
  glitch.style.opacity = "1";
  glitch.style.backgroundColor = "";

  glitchImages.forEach((img, idx) => {
    setTimeout(() => {
      glitch.style.backgroundImage = `url(${img})`;
    }, idx * GLITCH_FRAME_DURATION);
  });

  const totalTime = glitchImages.length * GLITCH_FRAME_DURATION;

  setTimeout(() => {
    // flash blanc rapide
    glitch.style.backgroundImage = "none";
    glitch.style.backgroundColor = "white";
    glitch.style.opacity = "1";

    setTimeout(() => {
      // fade out puis hide
      glitch.style.opacity = "0";
      setTimeout(() => {
        glitch.style.display = "none";
        glitch.style.backgroundColor = "";
      }, 250);
    }, LOADER_FLASH_DURATION);
  }, totalTime);
}

// FOOTER / BOUCLE GLITCH CONTINUE
function startFooterGlitch(element) {
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

// --- SPLIT TEXT (h2 + h3) ---
function splitText(element) {
  const text = element.innerText;
  element.innerHTML = "";
  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(30px)";
    span.style.transition = "all 0.5s ease";
    span.style.transitionDelay = `${i * 0.05}s`;
    element.appendChild(span);
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
document.querySelectorAll(".content h2, .content h3").forEach(el => splitText(el));


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
logo.addEventListener("click", () => {
  playGlitch();
  setTimeout(() => {
    showSlide(0);
    document.body.style.overflowY = "hidden";
    window.addEventListener("wheel", scrollHandler, { passive: false });
  }, 600);
});

// --- SCROLL CONTACT ---
document.querySelector(".scroll-contact").addEventListener("click", e => {
  e.preventDefault();
  const contactIndex = [...slides].findIndex(slide => slide.classList.contains("slide6"));
  if (contactIndex !== -1) showSlide(contactIndex);
});

// --- DROPDOWN ---
const dropdown = document.querySelector(".dropdown > a");
const dropdownParent = document.querySelector(".dropdown");
dropdown.addEventListener("click", e => {
  e.preventDefault();
  dropdownParent.classList.toggle("open");
});
document.addEventListener("click", e => {
  if (!dropdownParent.contains(e.target)) dropdownParent.classList.remove("open");
});

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
