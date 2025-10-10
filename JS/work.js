// COMMERCIALS
const projects_commercials = [
  { id: "1", client: "WhenToCop?", project: "Le coup d'avance", duree: "01:07" },
  { id: "2", client: "Vervume", project: "Off the grid", duree: "00:55" },
  { id: "3", client: "Nike x FootLocker", project: "Something's cooking", duree: "01:00" },
  { id: "4", client: "La Vie", project: "Pimp My Veggie", duree: "01:43" },
  { id: "5", client: "Adidas", project: "Zinedine Zidane x Impulstar", duree: "00:54" },
  { id: "6", client: "Kobi Sports", project: "Raphaël Varane x Kobi", duree: "00:55" },
  { id: "7", client: "Nike TN", project: "WhenToCop? x Nike", duree: "01:02" },
  { id: "8", client: "The North Face", project: "The Duffel journey", duree: "00:48" },
  { id: "9", client: "NBA School", project: "Light-up your game", duree: "01:12" },
  { id: "10", client: "Asus", project: "La créativité sans limite", duree: "00:30" },
  { id: "11", client: "WhenToCop? - Nike x FootLocker", project: "Something's cooking", duree: "02:32" },
  { id: "12", client: "Akammak", project: "Collection AW 25", duree: "01:03" },
  { id: "13", client: "Koro", project: "Sugar break", duree: "00:40" },
  { id: "14", client: "Vibre", project: "Skincare for all", duree: "00:30" },
  { id: "15", client: "WhenToCop?", project: "Circare", duree: "00:38" },
  { id: "16", client: "SKWHEEL", project: "Redécouvrir la liberté", duree: "00:28" },
  { id: "17", client: "La Vie", project: "Cab Takeover", duree: "01:22" },
  { id: "18", client: "Range Rover", project: "The Range Rover house", duree: "02:35" }
];

// MUSIC VIDEO
const projects_musicvideo = [
  { id: "1", client: "PLK x FC Clamart", project: "Nouveau Maillot", duree: "00:54" },
  { id: "2", client: "Georgio x Adidas Arena", project: "2k25 reveal", duree: "01:04" },
  { id: "3", client: "Bekar ft. SDM", project: "Finalement", duree: "03:21" },
  { id: "4", client: "Bekar", project: "Vont-ils s'entendre ?", duree: "02:48" },
  { id: "5", client: "Nayana IZ", project: "Prana", duree: "??" }, // MANQUE
  { id: "6", client: "YOA", project: "La Favorite", duree: "01:17" },
  { id: "7", client: "Héléna", project: "Boule au ventre", duree: "01:12" },
  { id: "8", client: "Steve", project: "Le bleu du ciel", duree: "03:01" },
  { id: "9", client: "Sasha Nice", project: "Tu m'as soigné", duree: "01:48" },
  { id: "10", client: "Tsew The Kid", project: "S'en aller", duree: "02:37" },
  { id: "11", client: "Yoa", project: "Nulle", duree: "02:33" },
  { id: "12", client: "Ratus ft. Spri Noir", project: "", duree: "03:14" },
  { id: "13", client: "Sasha Nice", project: "Si je reste", duree: "02:49" },
  { id: "14", client: "Tsew The Kid", project: "Laisse faire", duree: "03:01" }
];


function initWorkPage(projects, mediaFolder) {
  const container = document.getElementById("cardContainer");

  const overlay = document.getElementById("videoOverlay");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayVideo = document.getElementById("overlayVideo");
  const overlayClose = document.getElementById("overlayClose");
  const playBtn = document.getElementById("playBtn");
  const timeCounter = document.getElementById("timeCounter");
  const volumeBtn = document.getElementById("volumeBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const fullscreenBtn = document.getElementById("fullscreenBtn");


  // Formatage du temps mm:ss
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }


  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");

  // Génération dynamique des cards
  projects.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="media-wrapper">
          <img src="${mediaFolder}/IMG/${item.id}.png" alt="${item.client} - ${item.project}">
          <video src="${mediaFolder}/VIDEOS/${item.id}.mp4" muted loop></video>
        </div>
        <div class="card-content">
          <p class="card-title">
            <span class="client">${item.client}</span> - 
            <span class="project">${item.project}</span>
          </p>
          <p class="card-duration">${item.duree}</p>
        </div>
      `;

    container.appendChild(card);

    // Hover vidéo
    const video = card.querySelector("video");
    const wrapper = card.querySelector(".media-wrapper");

    wrapper.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play();
    });

    wrapper.addEventListener("mouseleave", () => {
      video.pause();
    });
  });

  // Responsive grid
  function updateGrid() {
    const width = window.innerWidth;
    if (width >= 1024) {
      container.style.gridTemplateColumns = "repeat(3, 1fr)";
    } else if (width >= 768) {
      container.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else {
      container.style.gridTemplateColumns = "repeat(1, 1fr)";
    }
  }
  updateGrid();
  window.addEventListener("resize", updateGrid);

// Ouvrir overlay
container.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const client = card.querySelector(".client").innerText;
  const project = card.querySelector(".project").innerText;
  const videoSrc = card.querySelector("video").getAttribute("src");

  overlayTitle.innerHTML = `
      <span class="client">${client}</span> - 
      <span class="project">${project}</span>
    `;

  overlayVideo.src = videoSrc;

  overlay.style.display = "flex";
  overlayVideo.currentTime = 0;

  // Forcer le mute et mettre le bouton en mode off
  overlayVideo.muted = true;
  volumeBtn.src = "img/icones/volume-off.png";
  volumeSlider.value = 0;  

  overlayVideo.play();
  playBtn.textContent = "⏸";
});


  // Fermer overlay
  overlayClose.addEventListener("click", () => {
    overlayVideo.pause();
    overlay.style.display = "none";
  });

  // Fermer avec la touche "Échap"
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.style.display === "flex") {
      overlayVideo.pause();
      overlay.style.display = "none";
    }
  });

  // Fermer overlay quand on clique sur le fond noir (excepte vidéo, header et controls)
  overlay.addEventListener("click", (e) => {
    const isInVideo = overlayVideo.contains(e.target);
    const isInControls = document.querySelector(".overlay-controls").contains(e.target);
    const isInHeader = document.querySelector(".overlay-header").contains(e.target);

    if (!isInVideo && !isInControls && !isInHeader) {
      overlayVideo.pause();
      overlay.style.display = "none";
    }
  });




  // Play / Pause
  playBtn.addEventListener("click", () => {
    if (overlayVideo.paused) {
      overlayVideo.play();
      playBtn.textContent = "⏸";
    } else {
      overlayVideo.pause();
      playBtn.textContent = "▶";
    }
  });

  // Toggle Play/Pause en cliquant directement sur la vidéo
  overlayVideo.addEventListener("click", () => {
    if (overlayVideo.paused) {
      overlayVideo.play();
      playBtn.textContent = "⏸";
    } else {
      overlayVideo.pause();
      playBtn.textContent = "▶";
    }
  });

  // Toggle Play/Pause avec la barre espace
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && overlay.style.display === "flex") {
      e.preventDefault(); // empêche de scroller la page
      if (overlayVideo.paused) {
        overlayVideo.play();
        playBtn.textContent = "⏸";
      } else {
        overlayVideo.pause();
        playBtn.textContent = "▶";
      }
    }
  });


  // Quand la vidéo est terminée → bouton repasse en "play"
  overlayVideo.addEventListener("ended", () => {
    playBtn.textContent = "▶";
    // On remet aussi le compteur à 0 si tu veux
    timeCounter.textContent = `0:00 / ${formatTime(overlayVideo.duration)}`;
  });


  // Progress bar
  overlayVideo.addEventListener("timeupdate", () => {
    const percent = (overlayVideo.currentTime / overlayVideo.duration) * 100;
    progressBar.style.width = percent + "%";
    timeCounter.textContent = `${formatTime(overlayVideo.currentTime)} / ${formatTime(overlayVideo.duration)}`;
  });

  // Par défaut volume max
  overlayVideo.volume = 1.0;

  volumeSlider.addEventListener("input", () => {
    overlayVideo.volume = volumeSlider.value;
  
    // Si le volume est à 0 → on met mute
    if (overlayVideo.volume === 0) {
      overlayVideo.muted = true;
      volumeBtn.src = "img/icones/volume-off.png";
    } else {
      overlayVideo.muted = false;
      volumeBtn.src = "img/icones/volume-on.png";
    }
  });
  

  // Toggle mute au clic sur l’icône
  volumeBtn.addEventListener("click", () => {
    if (overlayVideo.muted) {
      overlayVideo.muted = false;
      volumeBtn.src = "img/icones/volume-on.png";
  
      // Si le slider était à 0, on le remet à un volume moyen (optionnel)
      if (volumeSlider.value == 0) volumeSlider.value = 0.5;
      overlayVideo.volume = volumeSlider.value;
  
    } else {
      overlayVideo.muted = true;
      volumeBtn.src = "img/icones/volume-off.png";
      volumeSlider.value = 0;
    }
  });
  




  progressContainer.addEventListener("click", (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    overlayVideo.currentTime = percent * overlayVideo.duration;
  });
}

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    // Demande le fullscreen sur la page entière
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Erreur fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});


