/* ====================================================================
   FONCY FUNTASTIC — script.js
   File ini dipakai bersama di SEMUA halaman (index.html, tentang.html,
   galeri.html, pencapaian.html, playlist.html, kontak.html).
   Setiap fungsi render mengecek dulu apakah elemennya ada di halaman
   itu, jadi aman dipakai di mana saja.
   ====================================================================
   CARA UPLOAD / MENAMBAH FOTO
   --------------------------------------------------------------------
   1. Taruh file foto ke folder:
        assets/img/gallery/   -> untuk foto di halaman Galeri
        assets/img/hero/      -> untuk foto/gif di layar TV (Beranda)

   2. Daftarkan nama filenya di GALLERY_PHOTOS / HERO_PHOTOS di bawah.

   CARA ISI PLAYLIST SPOTIFY
   --------------------------------------------------------------------
   1. Buka playlist Spotify kamu -> tombol titik tiga (...) -> Share ->
      Embed playlist -> copy link yang ada di dalam atribut src="...".
   2. Tempel link itu ke SPOTIFY_EMBED_URL di bawah.
   3. Edit daftar PLAYLIST_MEMBERS (nama & judul lagu tiap anggota).
   ==================================================================== */

// ---------- FOTO GALERI ----------
const GALLERY_PHOTOS = [
  // { file: "contoh1.jpg", caption: "Ganti dengan captionmu" },
  // { file: "contoh2.jpg", caption: "Ganti dengan captionmu" },
];
const GALLERY_PATH = "assets/img/gallery/";
const PLACEHOLDER_COUNT = 6; // jumlah kotak placeholder kalau galeri masih kosong

// ---------- FOTO LAYAR TV (BERANDA) ----------
const HERO_PHOTOS = [
  // "contoh-tv.jpg",
];
const HERO_PATH = "assets/img/hero/";
const HERO_SLIDE_INTERVAL = 3500; // kecepatan slideshow TV (ms)

// ---------- PLAYLIST SPOTIFY ----------
// Tempel link embed playlist Spotify kamu di sini (kosongkan "" kalau belum ada)
const SPOTIFY_EMBED_URL = "";

// Daftar 44 anggota kelas + lagu pilihan mereka. Edit nama & judul lagunya.
const PLAYLIST_MEMBERS = Array.from({ length: 44 }, (_, i) => ({
  name: `Nama ${i + 1}`,
  song: "[EDIT DI SINI] Judul Lagu - Artis",
}));

/* ==================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  setupBurgerMenu();
  renderGallery();
  renderHeroScreen();
  renderPlaylist();
  setupLightbox();
  setupRevealOnScroll();
  SoundFX.attachTo(document);
});

/* -------------------- NAV AKTIF (multi-halaman) -------------------- */
function highlightActiveNav() {
  const links = document.querySelectorAll(".nav-links a[data-page]");
  if (!links.length) return;
  let current = location.pathname.split("/").pop();
  if (current === "") current = "index.html";
  links.forEach((a) => {
    const target = a.getAttribute("data-page") + ".html";
    if (target === current) a.classList.add("active");
  });
}

/* -------------------- MENU MOBILE -------------------- */
function setupBurgerMenu() {
  const burger = document.getElementById("burgerBtn");
  const links = document.querySelector(".nav-links");
  if (!burger || !links) return;
  burger.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

/* -------------------- GALERI -------------------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  if (GALLERY_PHOTOS.length === 0) {
    for (let i = 0; i < PLACEHOLDER_COUNT; i++) {
      const box = document.createElement("div");
      box.className = "gallery-item placeholder reveal";
      box.style.transitionDelay = `${i * 0.05}s`;
      box.innerHTML = `
        <div class="cam">📷</div>
        <span class="label">Foto ${i + 1}<br>belum diupload</span>
      `;
      grid.appendChild(box);
    }
    return;
  }

  GALLERY_PHOTOS.forEach((photo, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item reveal";
    item.style.transitionDelay = `${i * 0.05}s`;
    const img = document.createElement("img");
    img.src = GALLERY_PATH + photo.file;
    img.alt = photo.caption || photo.file;
    img.loading = "lazy";
    item.appendChild(img);
    item.addEventListener("click", () => {
      SoundFX.click();
      openLightbox(img.src, img.alt);
    });
    grid.appendChild(item);
  });
}

/* -------------------- LAYAR TV (HERO) -------------------- */
function renderHeroScreen() {
  const screen = document.getElementById("heroScreen");
  const placeholder = document.getElementById("heroPlaceholder");
  if (!screen) return;
  if (HERO_PHOTOS.length === 0) return; // biarkan animasi NO SIGNAL bawaan

  if (placeholder) placeholder.remove();
  const img = document.createElement("img");
  img.src = HERO_PATH + HERO_PHOTOS[0];
  img.alt = "Foto kelas";
  screen.appendChild(img);

  if (HERO_PHOTOS.length > 1) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % HERO_PHOTOS.length;
      img.src = HERO_PATH + HERO_PHOTOS[index];
    }, HERO_SLIDE_INTERVAL);
  }
}

/* -------------------- PLAYLIST -------------------- */
function renderPlaylist() {
  const embedWrap = document.getElementById("spotifyEmbed");
  if (embedWrap) {
    if (SPOTIFY_EMBED_URL) {
      embedWrap.innerHTML = `
        <iframe src="${SPOTIFY_EMBED_URL}" height="352" frameborder="0"
          allowfullscreen loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
        </iframe>`;
    } else {
      embedWrap.innerHTML = `
        <div class="spotify-placeholder">
          <div class="note-icon">🎵</div>
          <p>Playlist Spotify belum dipasang.</p>
          <p>Tempel link embed di <code>SPOTIFY_EMBED_URL</code><br>
             pada file assets/js/script.js</p>
        </div>`;
    }
  }

  const grid = document.getElementById("memberGrid");
  if (!grid) return;
  PLAYLIST_MEMBERS.forEach((m, i) => {
    const card = document.createElement("div");
    card.className = "member-card reveal";
    card.style.transitionDelay = `${(i % 12) * 0.04}s`;
    card.innerHTML = `
      <div class="num">#${String(i + 1).padStart(2, "0")}</div>
      <p class="name">${m.name}</p>
      <p class="song">${m.song}</p>
    `;
    grid.appendChild(card);
  });
}

/* -------------------- LIGHTBOX -------------------- */
function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox) return;
  closeBtn.addEventListener("click", () => {
    SoundFX.click();
    lightbox.classList.remove("open");
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });
}
function openLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("open");
}

/* -------------------- REVEAL ON SCROLL -------------------- */
function setupRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
}

/* ====================================================================
   SOUND FX — bunyi klik/hover ala 8-bit dibuat langsung lewat kode
   (Web Audio API), jadi tidak perlu upload file suara sama sekali.
   Klik tombol 🔊 di navbar untuk mematikan/menghidupkan suara.
   ==================================================================== */
const SoundFX = (() => {
  let ctx = null;
  let enabled = localStorage.getItem("foncySoundEnabled") !== "off";

  function getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function beep(freq, duration, type = "square", volume = 0.06) {
    if (!enabled) return;
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function click() { beep(660, 0.09, "square", 0.07); }
  function hover() { beep(880, 0.045, "square", 0.035); }
  function toggleOn() { beep(523, 0.07, "square", 0.07); setTimeout(() => beep(784, 0.09, "square", 0.07), 70); }
  function toggleOff() { beep(392, 0.09, "square", 0.06); }

  function updateToggleButton() {
    const btn = document.getElementById("soundToggle");
    if (btn) btn.textContent = enabled ? "🔊" : "🔇";
  }

  function attachTo(root) {
    updateToggleButton();

    const toggleBtn = root.getElementById ? root.getElementById("soundToggle") : null;
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        enabled = !enabled;
        localStorage.setItem("foncySoundEnabled", enabled ? "on" : "off");
        updateToggleButton();
        getCtx(); // pastikan context sudah ada (butuh gesture user)
        enabled ? toggleOn() : toggleOff();
      });
    }

    const clickSelector = ".btn, .nav-links a, .gallery-item:not(.placeholder), .achievement-card, .info-card, .member-card, .burger";
    root.querySelectorAll(clickSelector).forEach((el) => {
      el.addEventListener("click", click);
      el.addEventListener("mouseenter", hover);
    });
  }

  return { click, hover, attachTo };
})();
