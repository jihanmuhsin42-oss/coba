/* ============================================
   🌸 Bunga.js — dekorasi: kelopak jatuh, hati, bunga CSS
   ============================================ */

/* ---------- Kanvas kelopak jatuh ---------- */
(function () {
  const canvas = document.getElementById("petal-canvas");
  if (!canvas) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");

  const COLORS = ["#ff9ec3", "#ffc2d8", "#ffd6e6", "#e7b8ff", "#fff0f5", "#ffe08a"];
  const petals = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makePetal(initial) {
    return {
      x: Math.random() * window.innerWidth,
      y: initial ? Math.random() * window.innerHeight : -30,
      r: 5 + Math.random() * 8,
      vy: 0.5 + Math.random() * 1.1,
      vx: -0.35 + Math.random() * 0.7,
      sway: 0.4 + Math.random() * 1.2,
      swaySpeed: 0.008 + Math.random() * 0.016,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.035,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      alpha: 0.45 + Math.random() * 0.45,
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    // bentuk kelopak: setengah oval melengkung
    ctx.moveTo(0, -p.r);
    ctx.bezierCurveTo(p.r * 0.95, -p.r * 0.6, p.r * 0.8, p.r * 0.85, 0, p.r);
    ctx.bezierCurveTo(-p.r * 0.8, p.r * 0.85, -p.r * 0.95, -p.r * 0.6, 0, -p.r);
    ctx.fill();
    // garis tengah
    ctx.globalAlpha = p.alpha * 0.35;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -p.r * 0.7);
    ctx.lineTo(0, p.r * 0.7);
    ctx.stroke();
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of petals) {
      p.phase += p.swaySpeed;
      p.x += p.vx + Math.sin(p.phase) * p.sway;
      p.y += p.vy;
      p.rot += p.vrot;

      if (p.y > window.innerHeight + 40 || p.x < -60 || p.x > window.innerWidth + 60) {
        Object.assign(p, makePetal(false));
      }
      drawPetal(p);
    }
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);

  const count = window.innerWidth < 700 ? 26 : 45;
  for (let i = 0; i < count; i++) petals.push(makePetal(true));

  if (!reduce) tick();
  else petals.forEach(drawPetal);
})();

/* ---------- Hati melayang (halaman tertentu) ---------- */
(function () {
  const hearts = document.querySelectorAll("[data-hearts]");
  if (!hearts.length) return;
  const icons = ["🌸", "💗", "🌷", "💕", "🌺", "🌼", "💖"];
  const total = 14;

  for (const host of hearts) {
    for (let i = 0; i < total; i++) {
      const s = document.createElement("span");
      s.className = "heart";
      s.textContent = icons[(Math.random() * icons.length) | 0];
      s.style.left = Math.random() * 96 + 2 + "vw";
      s.style.fontSize = 16 + Math.random() * 22 + "px";
      s.style.animationDuration = 9 + Math.random() * 10 + "s";
      s.style.animationDelay = -Math.random() * 16 + "s";
      host.appendChild(s);
    }
  }
})();

/* ---------- Bangun bunga dari JS ---------- */
window.bunga = function (host) {
  const count = 7;
  host.classList.add("flower");
  if (!host.dataset.size) host.style.setProperty("--fsize", "92px");
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.setProperty("--rot", (360 / count) * i + "deg");
    p.style.setProperty("--pd", i * 0.06 + "s");
    host.appendChild(p);
  }
  const core = document.createElement("span");
  core.className = "core";
  host.appendChild(core);
};

/* otomatis rapikan semua elemen .flower yang kosong */
document.querySelectorAll("[data-flower]").forEach((el) => {
  if (!el.querySelector(".petal")) window.bunga(el);
});

/* ---------- Confetti bunga (halaman "ya") ---------- */
(function () {
  const host = document.getElementById("confetti");
  if (!host) return;
  const bits = ["🌸", "💖", "🌷", "🌼", "🌺", "💕", "✨", "🎉"];
  for (let i = 0; i < 46; i++) {
    const s = document.createElement("span");
    s.textContent = bits[(Math.random() * bits.length) | 0];
    s.style.position = "fixed";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = -20 - Math.random() * 40 + "px";
    s.style.fontSize = 14 + Math.random() * 20 + "px";
    s.style.zIndex = "4";
    s.style.pointerEvents = "none";
    s.style.animation = `confettiFall ${4.5 + Math.random() * 4}s linear forwards`;
    s.style.animationDelay = -Math.random() * 6 + "s";
    host.appendChild(s);
  }
})();

const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confettiFall {
    0%   { transform: translateY(-10vh) rotate(0deg) scale(0.6); opacity: 0; }
    12%  { opacity: 1; }
    100% { transform: translateY(112vh) rotate(420deg) scale(1.1); opacity: 0; }
  }`;
document.head.appendChild(confettiStyle);