# Foncy Funtastic — Website Kelas (tema 8-bit)

Template website statis (HTML/CSS/JS murni, tanpa perlu install apa pun)
dengan tema pixel/8-bit terinspirasi warna langit biru, rumput hijau, TV
retro, bintang emas, dan peti kayu.

## Struktur folder

```
kelas-website/
├── index.html                  <- halaman utama
└── assets/
    ├── css/style.css           <- semua warna & gaya (edit di sini)
    ├── js/script.js            <- daftar foto galeri & foto TV
    └── img/
        ├── gallery/             <- taruh foto galeri di sini
        │   └── BACA-INI.txt
        └── hero/                 <- taruh foto/gif untuk layar TV
            └── BACA-INI.txt
```

## Cara menjalankan

Buka file `index.html` langsung di browser (double-click), atau jalankan
local server sederhana kalau mau (opsional):

```
cd kelas-website
python3 -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Cara upload foto

1. **Foto galeri**: copy foto ke `assets/img/gallery/`, lalu daftarkan
   nama filenya di `assets/js/script.js` pada variabel `GALLERY_PHOTOS`.
2. **Foto di layar TV (hero)**: copy foto ke `assets/img/hero/`, lalu
   daftarkan di variabel `HERO_PHOTOS` pada file yang sama.

Selama kedua daftar itu masih kosong, halaman akan otomatis menampilkan
kotak placeholder ("belum diupload" / "NO SIGNAL") — jadi website tetap
bisa dibuka dan terlihat rapi meski belum ada foto sama sekali.

## Cara ganti warna / font

Semua warna terpusat di bagian paling atas `assets/css/style.css`, di
dalam blok `:root { ... }`. Tinggal ganti kode hex-nya.

## Cara ganti teks

Semua teks contoh ditandai dengan `[EDIT DI SINI]` langsung di dalam
`index.html` — cari lewat Ctrl+F / Cmd+F untuk menemukan semuanya.
