const fireworks = document.getElementById("fireworks");
const petals = document.getElementById("petals");
const beginButton = document.getElementById("beginButton");
const shareButton = document.getElementById("shareButton");
const soundToggle = document.getElementById("soundToggle");
const soundLabel = document.getElementById("soundLabel");

function burst(x = Math.random() * 100, y = 18 + Math.random() * 48) {
  const count = 22;
  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = x + "%";
    spark.style.top = y + "%";
    const angle = (Math.PI * 2 * i) / count;
    const distance = 45 + Math.random() * 70;
    spark.style.setProperty("--x", Math.cos(angle) * distance + "px");
    spark.style.setProperty("--y", Math.sin(angle) * distance + "px");
    fireworks.appendChild(spark);
    setTimeout(() => spark.remove(), 1600);
  }
}
function makePetal() {
  const p = document.createElement("span");
  p.className = "petal";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = (7 + Math.random() * 7) + "s";
  p.style.opacity = .35 + Math.random() * .5;
  petals.appendChild(p);
  setTimeout(() => p.remove(), 14500);
}
setInterval(() => burst(), 1700);
setInterval(makePetal, 650);

beginButton.addEventListener("click", () => {
  document.getElementById("wishes").scrollIntoView({behavior:"smooth"});
  for (let i = 0; i < 5; i++) setTimeout(() => burst(15 + Math.random() * 70, 15 + Math.random() * 35), i * 260);
});

// A gentle original tone pattern generated in the browser. Audio starts only after the visitor taps Sound.
let audioContext = null;
let musicTimer = null;
let noteIndex = 0;
const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 783.99, 698.46];
function playNote() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = notes[noteIndex++ % notes.length];
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.8);
  osc.connect(gain).connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + 0.85);
}
async function toggleSound() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") await audioContext.resume();
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
    soundLabel.textContent = "Sound off";
    soundToggle.setAttribute("aria-pressed", "false");
  } else {
    playNote();
    musicTimer = setInterval(playNote, 620);
    soundLabel.textContent = "Sound on";
    soundToggle.setAttribute("aria-pressed", "true");
  }
}
soundToggle.addEventListener("click", toggleSound);

shareButton.addEventListener("click", async () => {
  const shareData = {title:"Happy Deepawali!", text:"A little festival of lights, made with love. Happy Deepawali!" , url:location.href};
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(location.href);
      shareButton.innerHTML = "Link copied! <span>✓</span>";
    } else {
      window.prompt("Copy your greeting link:", location.href);
    }
  } catch (error) {
    if (error.name !== "AbortError") window.prompt("Copy your greeting link:", location.href);
  }
});
