# Foncy Funtastic — Website Kelas (tema 8-bit, v3)

Template statis (HTML/CSS/JS murni). Tab situs: **Home, Tentang, Media,
Struktur, Anggota, Gallery, Prestasi** (+ Kontak lewat footer).

## Struktur folder

```
kelas-website/
├── index.html          <- Home
├── tentang.html        <- Tentang (+ banner statistik siswa)
├── media.html          <- Media (playlist Spotify 44 orang)
├── struktur.html       <- Struktur organisasi kelas (mentahan)
├── anggota.html        <- Anggota kelas (44 orang, 3 kolom + paginasi)
├── galeri.html          <- Gallery foto (3 kolom + paginasi)
├── prestasi.html        <- Prestasi
├── kontak.html          <- Kontak
└── assets/
    ├── css/style.css
    ├── js/script.js     <- SEMUA konfigurasi ada di sini (lihat di bawah)
    └── img/
        ├── gallery/       <- foto galeri
        ├── hero/          <- foto/gif layar TV di Home
        ├── members/       <- foto anggota kelas
        └── class-photo.jpg <- foto latar banner statistik (taruh sendiri)
```

## Cara menjalankan

Buka `index.html` di browser, atau jalankan server lokal:
```
cd kelas-website && python3 -m http.server 8000
```

## Statistik siswa (44 Students / 32 Girls / 12 Boys)

Ada di halaman **Tentang**, dalam kotak persegi panjang dengan foto
latar. Cara pakai:
1. Taruh foto bareng sekelas di `assets/img/class-photo.jpg`.
2. Edit angka 44/32/12 langsung di `tentang.html` (cari `.stats-row`).

## Gallery & Anggota Kelas (3 kolom, diperbesar, dengan paginasi)

Keduanya pakai layout yang sama:
- **Layar besar (PC/tablet, lebar ≥1000px):** 3 kartu berdampingan.
- **HP (Android/iOS, layar sempit):** otomatis tersusun 1 kolom ke bawah.
- Karena isinya banyak (44 anggota, atau puluhan foto), ditampilkan
  per halaman (bukan sekaligus ke bawah) — ada tombol nomor halaman
  plus panah ‹ › di bagian bawah untuk pindah halaman.

**Foto galeri**: copy ke `assets/img/gallery/`, daftarkan di
`GALLERY_PHOTOS` (assets/js/script.js).

**Anggota kelas**: copy foto ke `assets/img/members/`, lalu edit array
`MEMBERS` di `assets/js/script.js` — isi `name`, `ig` (username
Instagram), dan `photo` (nama file) untuk tiap orang. Kalau foto belum
ada, biarkan `photo: ""` — otomatis muncul avatar placeholder.

## Struktur Kelas

Halaman `struktur.html` berisi bagan organisasi kosong (Wali Kelas →
Ketua/Wakil → Sekretaris/Bendahara → Seksi-seksi). Tinggal ganti teks
`[EDIT DI SINI]` di tiap kotak dengan nama asli. Mau tambah/kurangi
jabatan, tinggal copy atau hapus blok `.org-box` di HTML.

## Playlist Spotify (halaman Media)

1. Spotify → buka playlist → (•••) → Share → Embed playlist → salin
   link di dalam `src="..."`.
2. Tempel ke `SPOTIFY_EMBED_URL` di `assets/js/script.js`.

## Navigasi Sebelumnya / Selanjutnya

Di bagian bawah tiap halaman (sebelum footer) ada tombol "← Sebelumnya"
dan "Selanjutnya →" yang otomatis mengarah ke tab berikutnya/sebelumnya
sesuai urutan: Home → Tentang → Media → Struktur → Anggota → Gallery →
Prestasi → Kontak. Urutan ini diatur di `PAGE_ORDER` pada
`assets/js/script.js`, kalau mau diubah urutannya tinggal edit array itu.

## Sound effect 8-bit

Bunyi klik/hover dibuat langsung lewat kode (Web Audio API, nada
square-wave khas chiptune) — tidak perlu upload file audio. Tombol 🔊
di navbar untuk mematikan/menghidupkan suara (tersimpan di browser).

## Animasi

Hampir semua elemen bergerak: awan melayang, bintang berkedip, TV
mengambang, kartu terangkat saat hover, dan elemen muncul dengan efek
"reveal" saat discroll. Cari `@keyframes` / `animation:` di
`assets/css/style.css` untuk menambah/mengurangi.

## Ganti warna, font, dan teks

- Warna & font: `assets/css/style.css`, bagian `:root { ... }`.
- Teks: cari `[EDIT DI SINI]` di tiap file HTML.

## Tambah/hapus tab baru

Copy salah satu file halaman, ganti isinya, lalu tambahkan link baru
ke `<nav class="nav-links">` di **SEMUA** file HTML supaya tab tampil
konsisten di semua halaman. Jangan lupa tambahkan juga ke `PAGE_ORDER`
di `assets/js/script.js` supaya ikut masuk urutan Sebelumnya/Selanjutnya.
