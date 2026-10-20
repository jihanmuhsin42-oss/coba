/* ============================================
   💗 main.js — logika halaman + transisi + audio lembut
   ============================================ */

/* ---------- Transisi antar halaman ---------- */
document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href$=".html"]');
  if (!link || link.target === "_blank" || e.metaKey || e.ctrlKey) return;
  e.preventDefault();
  document.body.classList.add("fade-out");
  setTimeout(() => (window.location.href = link.getAttribute("href")), 380);
});

/* ---------- Efek mesin ketik ---------- */
document.querySelectorAll("[data-type]").forEach((el) => {
  const text = el.getAttribute("data-type");
  const caret = document.createElement("span");
  caret.className = "caret";
  let i = 0;
  el.textContent = "";

  (function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      if (i <= text.length) el.appendChild(caret);
      setTimeout(type, 34);
    }
  })();
});

/* ---------- Halaman pertanyaan ---------- */
const blocks = Array.from(document.querySelectorAll(".q-block"));
if (blocks.length) {
  const nextBtn = document.getElementById("nextBtn");
  const note = document.getElementById("progressNote");

  blocks.forEach((block, bi) => {
    block.style.animationDelay = bi * 0.12 + "s";
    const opts = block.querySelectorAll(".opt");
    opts.forEach((o) => {
      o.addEventListener("click", () => {
        opts.forEach((x) => x.classList.remove("chosen"));
        o.classList.add("chosen");
        try {
          localStorage.setItem("bq_" + block.dataset.q, o.textContent);
        } catch (_) {}
        refresh();
      });
    });
  });

  function refresh() {
    const done = blocks.filter((b) => b.querySelector(".opt.chosen")).length;
    if (note) {
      note.textContent =
        done === blocks.length
          ? "Semua kelar! Kamu menjawabnya hebat banget 💕 Lanjut ya~"
          : "Sudah jawab " + done + " dari " + blocks.length + " pertanyaan 🌷";
    }
    if (nextBtn) nextBtn.disabled = done !== blocks.length;
  }

  // pulihkan jawaban sebelumnya
  blocks.forEach((block) => {
    let saved = null;
    try {
      saved = localStorage.getItem("bq_" + block.dataset.q);
    } catch (_) {}
    if (!saved) return;
    block.querySelectorAll(".opt").forEach((o) => {
      if (o.textContent.trim() === saved) o.classList.add("chosen");
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (nextBtn.disabled) return;
      document.body.classList.add("fade-out");
      setTimeout(() => (window.location.href = "janji.html"), 380);
    });
  }

  refresh();
}

/* ---------- Tombol "nggak": kabur dulu, lalu boleh dipencet ---------- */
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  const jokes = [
    "Upss ketabrak 😳",
    "Hahaha nggak kesampaian 😝",
    "Tombolnya lagi jalan lho 🌸",
    "Coba lagi dong ~ 💨",
    "Nggak kesampaian, deh 😂",
    "Ini semua salah kamu, lho ✨",
  ];
  const note = document.getElementById("joke");

  // berapa kali tombolnya boleh kabur (acak 1–3x, jadi tetap ada kesempatan dipencet)
  let dodgesLeft = 1 + Math.floor(Math.random() * 3);
  let moved = 0;
  let canClick = false;

  noBtn.addEventListener("mouseenter", onDodge);
  noBtn.addEventListener("click", onClick);
  noBtn.addEventListener("touchstart", onDodge, { passive: true });

  function onDodge() {
    if (!canClick && dodgesLeft > 0) dodge();
  }

  function onClick(e) {
    e.preventDefault();
    if (!canClick) {
      let showedJoke = false;
      // masih boleh kabur
      if (dodgesLeft > 0) {
        dodge();
        dodgesLeft--;
        if (note) note.textContent = jokes[Math.min(moved, jokes.length - 1)];
        moved++;
        showedJoke = true;
      }
      // jatah kabur habis -> tombol balik ke tempatnya & boleh dipencet
      stopDodging(showedJoke ? 1600 : 0);
      return;
    }
    // sekarang boleh dipencet -> ke halaman "belum"
    document.body.classList.add("fade-out");
    setTimeout(() => (window.location.href = "belum.html"), 380);
  }

  function stopDodging(delay = 0) {
    canClick = true;
    noBtn.removeEventListener("mouseenter", onDodge);
    noBtn.removeEventListener("touchstart", onDodge);
    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.classList.remove("btn-runaway");
    noBtn.style.transform = "scale(1.06)";
    setTimeout(() => (noBtn.style.transform = ""), 400);
    const msg = "Oke oke, kalau memang belum — nggak apa-apa 🌿 Pilihannya tetep di tangan kamu.";
    if (note) setTimeout(() => (note.textContent = msg), delay);
  }

  function dodge() {
    const pad = 18;
    const maxX = window.innerWidth - noBtn.offsetWidth - pad;
    const maxY = window.innerHeight - noBtn.offsetHeight - pad;
    const x = Math.max(pad, Math.random() * maxX);
    const y = Math.max(pad, Math.random() * maxY);
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.zIndex = "6";
    dodgesLeft--;
  }
}

/* ---------- Hitung mundur hati ---------- */
const counter = document.getElementById("heartCounter");
if (counter) {
  let n = 3;
  counter.textContent = "💗".repeat(n);
  setInterval(() => {
    n = (n + 1) % 4;
    counter.textContent = "💗".repeat(n + 1);
  }, 900);
}

/* ---------- Bunyi lembut (WebAudio, tanpa file) ---------- */
const soundBtn = document.getElementById("soundBtn");
if (soundBtn) {
  let ctxAudio = null;
  let on = false;

  function chime(freq, dur, delay) {
    const osc = ctxAudio.createOscillator();
    const gain = ctxAudio.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctxAudio.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.18, ctxAudio.currentTime + delay + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctxAudio.currentTime + delay + dur);
    osc.connect(gain).connect(ctxAudio.destination);
    osc.start(ctxAudio.currentTime + delay);
    osc.stop(ctxAudio.currentTime + delay + dur + 0.05);
  }

  soundBtn.addEventListener("click", () => {
    ctxAudio = ctxAudio || new (window.AudioContext || window.webkitAudioContext)();
    on = !on;
    soundBtn.textContent = on ? "🔊" : "🔇";
    if (on) [523.25, 659.25, 783.99].forEach((f, i) => chime(f, 0.5, i * 0.12));
  });

  document.addEventListener("click", () => {
    if (on && ctxAudio) chime(880, 0.25, 0);
  });
}