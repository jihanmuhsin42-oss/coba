# 🌸 Website "Bunga" — buat Bunga

Websites kecil 5 halaman yang themes-nya bunga, animasinya lembut, dan ujungnya
nawapake ke Instagram **@muh_sin.26**.

## Cara buka

Double-click `index.html`, atau buka di browser (Chrome/Edge).

Kalau mau lewat server lokal (opsional):

```
cd D:\MUHSIN\love
python -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Halaman

| File | Isi |
|------|-----|
| `index.html` | **Basabasi** — perkenalan & sapaan (punya section "lihat bunga dulu") |
| `pertanyaan.html` | **Tanya-tanya singkat** — 4 pertanyaan pilihan jawaban, tersimpan otomatis |
| `janji.html` | **Pertanyaan utama** — "Bunga… kamu suka aku nggak?" (tombol "nggak" kabur sendiri) |
| `ya.html` | **Jawaban iya** — konfetti bunga + surat kecil + tombol chat Instagram |
| `belum.html` | **Jawaban belum** — tetap ramah + tombol chat Instagram |

## Struktur

```
love/
├── index.html
├── pertanyaan.html
├── janji.html
├── ya.html
├── belum.html
└── assets/
    ├── css/style.css     # tema, bunga CSS, animasi
    └── js/
        ├── bunga.js      # kelopak jatuh (canvas), hati melayang, bunga, confetti
        └── main.js       # transisi halaman, ketik teks, logika pertanyaan, audio lembut
```

## Yang bisa diubah

- Nama/handle Instagram: cari `instagram.com/muh_sin.26` (ada di `ya.html` & `belum.html`).
- Warna: bagian `:root` di `assets/css/style.css`.
- Teks pertanyaan: `pertanyaan.html` (`data-q="..."` adalah kunci penyimpanan jawaban).
- Jumlah/kecepatan kelopak: `assets/js/bunga.js` bagian `const count = ...`.
- Bunyi lembut (tombol 🔇 kanan bawah): nada dibuat langsung di browser, tanpa file lagu.