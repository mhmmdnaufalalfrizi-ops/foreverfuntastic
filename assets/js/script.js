/* ====================================================================
   FONCY FUNTASTIC — script.js
   ====================================================================
   CARA UPLOAD / MENAMBAH FOTO
   --------------------------------------------------------------------
   1. Taruh file foto kamu ke dalam folder:
        assets/img/gallery/   -> untuk foto-foto di section Galeri
        assets/img/hero/      -> untuk foto/gif yang tampil di layar TV

   2. Tulis nama filenya di daftar GALLERY_PHOTOS dan HERO_PHOTOS
      di bawah ini. Contoh:

        const GALLERY_PHOTOS = [
          { file: "foto1.jpg", caption: "Belajar bareng" },
          { file: "foto2.jpg", caption: "Acara kelas" },
        ];

   3. Simpan file ini, lalu refresh halaman index.html di browser.
      Kalau daftarnya masih kosong seperti sekarang, akan otomatis
      muncul kotak placeholder "belum ada foto" — jadi aman dijalankan
      dari awal.
   ==================================================================== */

// ---------- ISI FOTO GALERI DI SINI ----------
const GALLERY_PHOTOS = [
  // { file: "contoh1.jpg", caption: "Ganti dengan captionmu" },
  // { file: "contoh2.jpg", caption: "Ganti dengan captionmu" },
];
const GALLERY_PATH = "assets/img/gallery/";

// Berapa banyak kotak placeholder yang ditampilkan kalau galeri masih kosong
const PLACEHOLDER_COUNT = 6;

// ---------- ISI FOTO / GIF UNTUK LAYAR TV DI SINI ----------
const HERO_PHOTOS = [
  // "contoh-tv.jpg",
];
const HERO_PATH = "assets/img/hero/";

// Ganti angka ini untuk atur kecepatan slideshow di layar TV (milidetik)
const HERO_SLIDE_INTERVAL = 3500;

/* ==================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderHeroScreen();
  setupLightbox();
  setupBurgerMenu();
});

/* -------------------- GALERI -------------------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  if (GALLERY_PHOTOS.length === 0) {
    // Belum ada foto -> tampilkan kotak placeholder
    for (let i = 0; i < PLACEHOLDER_COUNT; i++) {
      const box = document.createElement("div");
      box.className = "gallery-item placeholder";
      box.innerHTML = `
        <div class="cam">📷</div>
        <span class="label">Foto ${i + 1}<br>belum diupload</span>
      `;
      grid.appendChild(box);
    }
    return;
  }

  GALLERY_PHOTOS.forEach((photo) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    const img = document.createElement("img");
    img.src = GALLERY_PATH + photo.file;
    img.alt = photo.caption || photo.file;
    img.loading = "lazy";
    item.appendChild(img);
    item.addEventListener("click", () => openLightbox(img.src, img.alt));
    grid.appendChild(item);
  });
}

/* -------------------- LAYAR TV (HERO) -------------------- */
function renderHeroScreen() {
  const screen = document.getElementById("heroScreen");
  const placeholder = document.getElementById("heroPlaceholder");
  if (!screen) return;

  if (HERO_PHOTOS.length === 0) {
    // Tetap tampilkan animasi "NO SIGNAL" bawaan
    return;
  }

  // Ada foto -> ganti placeholder dengan slideshow sederhana
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

/* -------------------- LIGHTBOX -------------------- */
function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox) return;

  closeBtn.addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });

  window.openLightboxImg = lightboxImg; // dipakai oleh openLightbox()
}

function openLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("open");
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
