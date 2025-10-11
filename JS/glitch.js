// JS/glitch.js
const glitchImages = [
    "/glitch/glitch1.png",
    "/glitch/glitch2.png",
    "/glitch/glitch3.png",
    "/glitch/glitch4.png",
    "/glitch/glitch5.png",
    "/glitch/glitch6.png",
    "/glitch/glitch7.png",
    "/glitch/glitch8.png",
    "/glitch/glitch9.png",
    "/glitch/glitch10.png"
  ];
  
  const GLITCH_FRAME_DURATION = 100;
  const LOADER_FLASH_DURATION = 120;
  
  // show/hide loader glitch (full-screen)
  function playGlitch() {
    const glitch = document.getElementById("glitch");
    if (!glitch) return;
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
      glitch.style.backgroundImage = "none";
      glitch.style.backgroundColor = "white";
      glitch.style.opacity = "1";
  
      setTimeout(() => {
        glitch.style.opacity = "0";
        setTimeout(() => {
          glitch.style.display = "none";
          glitch.style.backgroundColor = "";
        }, 250);
      }, LOADER_FLASH_DURATION);
    }, totalTime);
  }
  
  // footer glitch looping (si tu utilises #glitch-footer)
  function startFooterGlitch(element) {
    if (!element) return;
    let i = 0;
    element.style.display = "block";
    element.style.opacity = "1";
    setInterval(() => {
      element.style.backgroundImage = `url(${glitchImages[i % glitchImages.length]})`;
      i++;
    }, GLITCH_FRAME_DURATION);
  }
  
  window.addEventListener("load", () => {
    const gf = document.getElementById("glitch-footer");
    if (gf) startFooterGlitch(gf);
  });
  