# Foncy Funtastic — Website Kelas (tema 8-bit, multi-halaman)

Template website statis (HTML/CSS/JS murni, tanpa perlu install apa pun)
dengan tema pixel/8-bit: langit biru, rumput hijau, TV retro, bintang emas,
peti kayu. Sekarang terdiri dari beberapa halaman terpisah (bukan satu
halaman scroll), lengkap dengan animasi dan sound effect 8-bit.

## Struktur folder

```
kelas-website/
├── index.html          <- Beranda
├── tentang.html        <- Tentang
├── galeri.html         <- Galeri foto
├── pencapaian.html     <- Pencapaian
├── playlist.html       <- Playlist Spotify (44 anggota)
├── kontak.html         <- Kontak
└── assets/
    ├── css/style.css    <- semua warna, gaya & animasi (edit di sini)
    ├── js/script.js     <- konfigurasi foto, playlist, sound effect
    └── img/
        ├── gallery/      <- taruh foto galeri di sini
        └── hero/         <- taruh foto/gif untuk layar TV di Beranda
```

## Cara menjalankan

Buka `index.html` langsung di browser (double-click), atau jalankan
local server (opsional):

```
cd kelas-website
python3 -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Cara upload foto

1. **Foto galeri**: copy ke `assets/img/gallery/`, daftarkan nama filenya
   di `assets/js/script.js` pada `GALLERY_PHOTOS`.
2. **Foto layar TV (Beranda)**: copy ke `assets/img/hero/`, daftarkan di
   `HERO_PHOTOS` pada file yang sama.

Selama kedua daftar itu kosong, halaman otomatis menampilkan placeholder
("belum diupload" / "NO SIGNAL").

## Cara isi Playlist Spotify (44 orang)

1. Buka playlist di Spotify → tombol titik tiga (•••) → Share →
   Embed playlist → salin link di dalam atribut `src="..."`.
2. Tempel link itu ke `SPOTIFY_EMBED_URL` di `assets/js/script.js`.
3. Edit array `PLAYLIST_MEMBERS` — ganti nama & judul lagu tiap
   anggota (defaultnya sudah tersedia 44 slot kosong yang bisa
   langsung diisi satu per satu).

## Sound effect 8-bit

Semua bunyi klik/hover dibuat langsung lewat kode (Web Audio API,
nada kotak/"square wave" khas chiptune) — **tidak perlu upload file
audio apa pun**, jadi tidak ada masalah hak cipta. Pengunjung bisa
mematikan suara lewat tombol 🔊 di pojok kanan navbar; pilihannya
disimpan otomatis di browser mereka.

## Animasi

Hampir semua elemen sudah bergerak halus: awan melayang, bintang
berkedip, TV mengambang, tombol memantul saat hover, kartu-kartu
muncul dengan efek "reveal" saat discroll, dan lainnya. Kalau ingin
mengurangi/menambah animasi, cari bagian `@keyframes` dan
`animation:` di `assets/css/style.css`.

## Cara ganti warna / font

Semua warna terpusat di bagian atas `assets/css/style.css`, dalam
blok `:root { ... }`.

## Cara ganti teks

Semua teks contoh ditandai `[EDIT DI SINI]` di dalam file HTML — cari
lewat Ctrl+F / Cmd+F untuk menemukan semuanya di tiap halaman.

## Cara tambah/hapus halaman (tab) baru

Copy salah satu file halaman (misalnya `tentang.html`), ganti isinya,
lalu tambahkan link ke halaman baru itu pada bagian `<nav class="nav-links">`
di SEMUA file HTML (supaya muncul konsisten di semua tab navigasi).
