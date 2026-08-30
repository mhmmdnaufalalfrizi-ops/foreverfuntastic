/* ====================================================================
   FONCY FUNTASTIC — script.js (v3)
   Dipakai bersama di SEMUA halaman. Tiap fungsi render mengecek dulu
   apakah elemennya ada di halaman itu, jadi aman dipakai di mana saja.
   ====================================================================
   CARA UPLOAD FOTO
   --------------------------------------------------------------------
   - Galeri      : taruh di assets/img/gallery/, daftarkan di GALLERY_PHOTOS
   - Layar TV    : taruh di assets/img/hero/,    daftarkan di HERO_PHOTOS
   - Foto anggota: taruh di assets/img/members/, isi field "photo" di
                   MEMBERS sesuai nama filenya (boleh dikosongkan kalau
                   belum ada, nanti muncul avatar placeholder 👤)
   - Foto latar statistik siswa: assets/img/class-photo.jpg (satu file,
     ganti langsung filenya, ukuran disarankan lebar/landscape)

   CARA ISI PLAYLIST SPOTIFY (halaman Media)
   --------------------------------------------------------------------
   1. Buka playlist Spotify -> (...) -> Share -> Embed playlist -> copy
      link di dalam atribut src="...".
   2. Tempel ke SPOTIFY_EMBED_URL di bawah.
   ==================================================================== */

// ---------- FOTO GALERI ----------
const GALLERY_PHOTOS = [
  // { file: "contoh1.jpg", caption: "Ganti dengan captionmu" },
];
const GALLERY_PATH = "assets/img/gallery/";
const GALLERY_PLACEHOLDER_COUNT = 18; // jumlah kotak placeholder kalau galeri masih kosong
const GALLERY_PER_PAGE = 9; // 3 kolom x 3 baris per halaman

// ---------- FOTO LAYAR TV (BERANDA) ----------
const HERO_PHOTOS = [
   "fototv-1.jpg",
   "fototv-2.jpg",
   "fototv-3.jpg",
   "fototv-4.jpg",
];
const HERO_PATH = "assets/img/hero/";
const HERO_SLIDE_INTERVAL = 3500;

// ---------- PLAYLIST SPOTIFY ----------
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/3kk7EAkPWybxG5kU7ad5Fs"; // tempel link embed di sini

// ---------- INSTAGRAM & TIKTOK (halaman Media) ----------
// Kosongkan "" kalau belum mau menampilkan postingan tertentu — nanti
// otomatis muncul kotak placeholder. Link tombol Follow diedit langsung
// di media.html (cari href="#" pada .social-follow-row).
const INSTAGRAM_EMBED_URL = ""; // contoh: "https://www.instagram.com/p/XXXXXXXXXXX/"
const TIKTOK_EMBED_URL = "https://www.tiktok.com/@foreverexp1_"; // contoh: "https://www.tiktok.com/@username/video/1234567890123456789"

// ---------- ANGGOTA KELAS (44 orang) ----------
// Edit name / ig / photo satu-satu. photo dikosongkan "" kalau belum ada.
const MEMBERS_PATH = "assets/img/members/";
const MEMBERS = Array.from({ length: 44 }, (_, i) => ({
  name: `Nama ${i + 1}`,
  ig: "@username",
  photo: "", // contoh: "anggota01.jpg"
}));
const MEMBERS_PER_PAGE = 9; // 3 kolom x 3 baris per halaman

// ---------- URUTAN HALAMAN (untuk tombol Sebelumnya / Selanjutnya) ----------
const PAGE_ORDER = [
  { file: "index.html", label: "Home" },
  { file: "tentang.html", label: "Tentang" },
  { file: "media.html", label: "Media" },
  { file: "struktur.html", label: "Struktur" },
  { file: "anggota.html", label: "Anggota" },
  { file: "galeri.html", label: "Gallery" },
  { file: "prestasi.html", label: "Prestasi" },
  { file: "kontak.html", label: "Kontak" },
];

/* ==================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  setupBurgerMenu();
  renderHeroScreen();
  renderGalleryPaginated();
  renderMembersPaginated();
  renderMedia();
  renderSocialEmbeds();
  renderPagePrevNext();
  setupLightbox();
  setupRevealOnScroll();
  SoundFX.attachTo(document);
});

/* -------------------- NAV AKTIF -------------------- */
function currentFileName() {
  let f = location.pathname.split("/").pop();
  return f === "" ? "index.html" : f;
}
function highlightActiveNav() {
  const links = document.querySelectorAll(".nav-links a[data-page]");
  if (!links.length) return;
  const current = currentFileName();
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

/* -------------------- PREV / NEXT ANTAR HALAMAN -------------------- */
function renderPagePrevNext() {
  const container = document.getElementById("pagePrevNext");
  if (!container) return;
  const current = currentFileName();
  const idx = PAGE_ORDER.findIndex((p) => p.file === current);
  if (idx === -1) return;

  const prev = idx > 0 ? PAGE_ORDER[idx - 1] : null;
  const next = idx < PAGE_ORDER.length - 1 ? PAGE_ORDER[idx + 1] : null;

  container.innerHTML = `
    ${prev ? `<a href="${prev.file}" class="page-nav-btn prev pixel-corners reveal">
        <span class="pn-label">&larr; Sebelumnya</span>
        <span class="pn-target">${prev.label}</span>
      </a>` : `<span></span>`}
    ${next ? `<a href="${next.file}" class="page-nav-btn next pixel-corners reveal">
        <span class="pn-label">Selanjutnya &rarr;</span>
        <span class="pn-target">${next.label}</span>
      </a>` : `<span></span>`}
  `;
}

/* -------------------- LAYAR TV (HERO) -------------------- */
function renderHeroScreen() {
  const screen = document.getElementById("heroScreen");
  const placeholder = document.getElementById("heroPlaceholder");
  if (!screen) return;
  if (HERO_PHOTOS.length === 0) return;

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

/* -------------------- MEDIA (PLAYLIST) -------------------- */
function renderMedia() {
  const embedWrap = document.getElementById("spotifyEmbed");
  if (!embedWrap) return;
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

/* -------------------- INSTAGRAM & TIKTOK -------------------- */
function loadScriptOnce(src, onload) {
  if (document.querySelector(`script[src="${src}"]`)) {
    if (onload) onload();
    return;
  }
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (onload) s.onload = onload;
  document.body.appendChild(s);
}

function renderSocialEmbeds() {
  const igWrap = document.getElementById("instagramEmbed");
  if (igWrap) {
    if (INSTAGRAM_EMBED_URL) {
      igWrap.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${INSTAGRAM_EMBED_URL}" data-instgrm-version="14" style="margin:0;width:100%;"></blockquote>`;
      loadScriptOnce("https://www.instagram.com/embed.js", () => {
        if (window.instgrm) window.instgrm.Embeds.process();
      });
    } else {
      igWrap.innerHTML = `
        <div class="social-placeholder">
          <div class="note-icon">📸</div>
          <p>Postingan Instagram belum dipasang.</p>
          <p>Tempel link post/reel di <code>INSTAGRAM_EMBED_URL</code><br>
             pada assets/js/script.js</p>
        </div>`;
    }
  }

  const ttWrap = document.getElementById("tiktokEmbed");
  if (ttWrap) {
    if (TIKTOK_EMBED_URL) {
      ttWrap.innerHTML = `<blockquote class="tiktok-embed" cite="${TIKTOK_EMBED_URL}" style="max-width:100%;min-width:280px;"><section></section></blockquote>`;
      loadScriptOnce("https://www.tiktok.com/embed.js");
    } else {
      ttWrap.innerHTML = `
        <div class="social-placeholder">
          <div class="note-icon">🎬</div>
          <p>Video TikTok belum dipasang.</p>
          <p>Tempel link video di <code>TIKTOK_EMBED_URL</code><br>
             pada assets/js/script.js</p>
        </div>`;
    }
  }
}

/* ====================================================================
   PAGINASI GENERIK — dipakai untuk Galeri & Anggota supaya tidak
   perlu scroll panjang walau isinya banyak (44 anggota / banyak foto).
   Tampilan per halaman: 3 kolom (PC/tablet lebar) otomatis jadi 1
   kolom ke bawah di HP (diatur lewat CSS grid, bukan JS).
   ==================================================================== */
function setupPagination({ items, gridEl, paginationEl, perPage, renderItem }) {
  if (!gridEl) return;
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  let currentPage = 1;

  function renderPage(page) {
    currentPage = page;
    gridEl.innerHTML = "";
    const start = (page - 1) * perPage;
    items.slice(start, start + perPage).forEach((item, i) => {
      const el = renderItem(item, start + i);
      el.classList.add("reveal");
      gridEl.appendChild(el);
    });
    renderControls();
    setupRevealOnScroll();
    SoundFX.attachTo(gridEl);
    if (paginationEl) SoundFX.attachTo(paginationEl);
  }

  function renderControls() {
    if (!paginationEl) return;
    paginationEl.innerHTML = "";
    if (totalPages <= 1) return;

    paginationEl.appendChild(makeBtn("‹", currentPage > 1 ? currentPage - 1 : null, false));
    for (let p = 1; p <= totalPages; p++) {
      paginationEl.appendChild(makeBtn(String(p), p, p === currentPage));
    }
    paginationEl.appendChild(makeBtn("›", currentPage < totalPages ? currentPage + 1 : null, false));
  }

  function makeBtn(label, targetPage, isActive) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "page-btn" + (isActive ? " active" : "");
    b.textContent = label;
    b.disabled = targetPage === null;
    b.addEventListener("click", () => {
      if (targetPage === null) return;
      renderPage(targetPage);
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return b;
  }

  renderPage(1);
}

/* -------------------- GALERI (dipaginasi) -------------------- */
function renderGalleryPaginated() {
  const gridEl = document.getElementById("galleryGrid");
  const paginationEl = document.getElementById("galleryPagination");
  if (!gridEl) return;

  if (GALLERY_PHOTOS.length === 0) {
    const placeholders = Array.from({ length: GALLERY_PLACEHOLDER_COUNT }, (_, i) => i + 1);
    setupPagination({
      items: placeholders,
      gridEl, paginationEl, perPage: GALLERY_PER_PAGE,
      renderItem: (num) => {
        const box = document.createElement("div");
        box.className = "gallery-item placeholder";
        box.innerHTML = `<div class="cam">📷</div><span class="label">Foto ${num}<br>belum diupload</span>`;
        return box;
      },
    });
    return;
  }

  setupPagination({
    items: GALLERY_PHOTOS,
    gridEl, paginationEl, perPage: GALLERY_PER_PAGE,
    renderItem: (photo) => {
      const item = document.createElement("div");
      item.className = "gallery-item";
      const img = document.createElement("img");
      img.src = GALLERY_PATH + photo.file;
      img.alt = photo.caption || photo.file;
      img.loading = "lazy";
      item.appendChild(img);
      item.addEventListener("click", () => {
        SoundFX.click();
        openLightbox(img.src, img.alt);
      });
      return item;
    },
  });
}

/* -------------------- ANGGOTA KELAS (dipaginasi) -------------------- */
function renderMembersPaginated() {
  const gridEl = document.getElementById("memberGrid");
  const paginationEl = document.getElementById("memberPagination");
  if (!gridEl) return;

  setupPagination({
    items: MEMBERS,
    gridEl, paginationEl, perPage: MEMBERS_PER_PAGE,
    renderItem: (m, i) => {
      const card = document.createElement("div");
      card.className = "member-card";
      const photoInner = m.photo
        ? `<img src="${MEMBERS_PATH}${m.photo}" alt="${m.name}">`
        : `👤`;
      card.innerHTML = `
        <div class="member-photo">${photoInner}</div>
        <p class="member-name">#${i + 1} ${m.name}</p>
        <a class="member-ig" href="https://instagram.com/${m.ig.replace("@", "")}" target="_blank" rel="noopener">${m.ig}</a>
      `;
      return card;
    },
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
  const targets = document.querySelectorAll(".reveal:not(.in-view)");
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
    { threshold: 0.12 }
  );
  targets.forEach((el) => observer.observe(el));
}

/* ====================================================================
   SOUND FX — bunyi klik/hover ala 8-bit dibuat langsung lewat kode
   (Web Audio API), tidak perlu upload file suara sama sekali.
   Tombol 🔊 di navbar untuk mematikan/menghidupkan suara.
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
    if (toggleBtn && !toggleBtn.dataset.bound) {
      toggleBtn.dataset.bound = "1";
      toggleBtn.addEventListener("click", () => {
        enabled = !enabled;
        localStorage.setItem("foncySoundEnabled", enabled ? "on" : "off");
        updateToggleButton();
        getCtx();
        enabled ? toggleOn() : toggleOff();
      });
    }

    const clickSelector = ".btn, .nav-links a, .gallery-item:not(.placeholder), .achievement-card, .info-card, .member-card, .page-btn, .page-nav-btn, .org-box, .burger";
    root.querySelectorAll(clickSelector).forEach((el) => {
      if (el.dataset.soundBound) return;
      el.dataset.soundBound = "1";
      el.addEventListener("click", click);
      el.addEventListener("mouseenter", hover);
    });
  }

  return { click, hover, attachTo };
})();
