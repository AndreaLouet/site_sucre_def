// COMMERCIALS
const projects_commercials = [
  { id: "1", client: "The North Face", project: "Duffel Bag", duree: "00:48" }, /*OK*/
  { id: "2", client: "Vervume", project: "La rencontre", duree: "??" },
  { id: "3", client: "Nike x FootLocker", project: "Something's cooking", duree: "01:00" }, /*OK*/
  { id: "4", client: "WTC x Nike", project: "5 TN", duree: "01:02" }, /*OK*/
  { id: "5", client: "Adidas", project: "Zidane à Impulstar", duree: "00:54" }, /*OK*/
  { id: "6", client: "Kobi Sports", project: "Raphaël Varane", duree: "00:55" }, /*OK*/
  { id: "7", client: "NBA School", project: "Light-up your game", duree: "01:12" }, /*OK*/
  { id: "8", client: "WTC?", project: "Ils ont toujours un coup d'avance", duree: "01:07" }, /*OK*/
  { id: "9", client: "LA VIE", project: "Pimp My Veggie", duree: "01:43" }, /*OK*/
  { id: "10", client: "SKWHEEL", project: "Le vrai hors piste", duree: "00:28" }, /*OK*/
  { id: "11", client: "Vibre", project: "", duree: "00:30" }, /*OK*/
  { id: "12", client: "Range Rover", project: "Event Influence", duree: "02:35" }, /*OK*/
  { id: "13", client: "Akammak", project: "Le dépassement", duree: "??" },
  { id: "14", client: "Asus", project: "Pro Art 16", duree: "00:30" }, /*OK*/
  { id: "15", client: "WhenToCop?", project: "Timestamp", duree: "00:38" }, /*OK*/
  { id: "16", client: "Koro", project: "Un break sucré", duree: "00:37" }, /*OK*/
  { id: "17", client: "La Vie", project: "Cab London", duree: "01:22" } /*OK*/
];

// MUSIC VIDEO
const projects_musicvideo = [
  { id: "1", client: "PLK x FC Clamart", project: "Nouveau Maillot", duree: "00:54" }, /*OK*/
  { id: "2", client: "Georgio", project: "Son retour sur scène", duree: "01:04" }, /*OK*/
  { id: "3", client: "Bekar ft. SDM", project: "Finalement", duree: "03:21" }, /*OK*/
  { id: "4", client: "Bekar", project: "Vont-ils s'entendre ?", duree: "02:48" }, /*OK*/
  { id: "5", client: "Nayana IZ", project: "", duree: "??" },
  { id: "6", client: "YOA", project: "La Favorite", duree: "01:17" }, /*OK*/
  { id: "7", client: "Héléna", project: "Boule au ventre", duree: "01:12" }, /*OK*/
  { id: "8", client: "Steve", project: "Le bleu du ciel", duree: "03:01" }, /*OK*/
  { id: "9", client: "Sasha Nice", project: "Tu m'as soigné", duree: "01:48" }, /*OK*/
  { id: "10", client: "Tsew The Kid", project: "S'en aller", duree: "02:37" }, /*OK*/
  { id: "11", client: "Yoa", project: "Nulle", duree: "02:33" }, /*OK*/
  { id: "12", client: "Ratus ft. Spri Noir", project: "", duree: "03:14" }, /*OK*/
  { id: "13", client: "Sasha Nice", project: "Si je reste", duree: "02:49" }, /*OK*/
  { id: "14", client: "Tsew The Kid", project: "Laisse faire", duree: "03:01" } /*OK*/
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
    if (overlayVideo.volume === 0) {
      volumeBtn.textContent = "🔇";
    } else {
      volumeBtn.textContent = "🔊";
    }
  });

  // Toggle mute au clic sur l’icône
  volumeBtn.addEventListener("click", () => {
    if (overlayVideo.muted) {
      overlayVideo.muted = false;
      volumeBtn.textContent = "🔊";
      volumeSlider.value = overlayVideo.volume;
    } else {
      overlayVideo.muted = true;
      volumeBtn.textContent = "🔇";
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


