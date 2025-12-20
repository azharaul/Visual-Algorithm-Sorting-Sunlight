# Visual-Algorithm-Sorting-Sunlight

> Visualisasi interaktif tiga algoritma sorting klasik: **Selection Sort**, **Heap Sort**, dan **Quick Sort**.

![Project banner](./assets/banner.png)

---

## Ringkasan

Proyek ini adalah aplikasi web berbasis React + Vite yang menampilkan visualisasi langkah-demi-langkah dari beberapa algoritma pengurutan (sorting). Tujuan: membantu mahasiswa dan pengembang memahami bagaimana algoritma bekerja melalui animasi, kontrol interaktif, dan kode yang rapi.

**Fitur utama**:

* Visualisasi Selection Sort, Heap Sort, dan Quick Sort.
* Kontrol kecepatan (slow / normal / fast) dan mode step-by-step.
* Input data: random generator, custom input (array angka), dan load dari file.
* Statistik performa: jumlah komparasi, swap, dan kompleksitas waktu (teoretis).
* Responsif — bisa dijalankan di desktop maupun perangkat mobile.

---

## Teknologi

* **Frontend**: React, Vite
* **Styling**: Tailwind CSS (opsional — bisa diganti dengan CSS/SCSS)
* **State management**: React hooks / Context API
* **Build & Dev**: Node.js, npm / Yarn / pnpm

> Catatan: Jika repo ini juga berisi helper script Python untuk menghasilkan dataset (mis. `.venv`), lihat bagian *Opsional: Backend / Tools Python* di bawah.

---

## Prasyarat

* Node.js LTS (contoh: 18.x / 20.x) — minimal 16+
* npm (disertakan dengan Node) atau yarn / pnpm
* Git (untuk clone dan kontribusi)

---

## Memulai (Local Development)

Ikuti langkah berikut dari root project:

1. Clone repository

```bash
git clone https://github.com/<username>/Visual-Algorithm-Sorting-Sunlight.git
cd Visual-Algorithm-Sorting-Sunlight
```

2. Install dependency

```bash
# dengan npm
npm install

# atau dengan yarn
# yarn

# atau dengan pnpm
# pnpm install
```

3. Jalankan server development

```bash
npm run dev
```

Buka browser di `http://localhost:5173` (Vite default) — URL akan muncul di terminal.

---

## Script Penting (package.json)

Pastikan `package.json` memiliki script seperti berikut:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write ."
  }
}
```

* `npm run dev` — development dengan HMR
* `npm run build` — menghasilkan bundle untuk produksi
* `npm run preview` — menjalankan build secara lokal untuk cek hasil produksi

---

## Struktur Direktori (Disarankan)

```
Visual-Algorithm-Sorting-Sunlight/
├── public/                # aset statis (favicon, images)
├── src/
│   ├── components/        # komponen React (Visualizer, Controls, Panel)
│   ├── algorithms/        # implementasi algoritma (selection.js, heap.js, quick.js)
│   ├── hooks/             # custom hooks (useAnimation, useTimer)
│   ├── styles/            # Tailwind config / custom css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── README.md
└── assets/                # gambar / mockups
```

---

## Implementasi Algoritma

Tempatkan logika algoritma di `src/algorithms/` dan rancang agar fungsi-fungsi tersebut tidak melakukan manipulasi DOM langsung — cukup kembalikan *sequence of operations* (mis. array langkah: `[{type: 'compare', a: i, b: j}, {type: 'swap', a: i, b: j}]`). Visualizer yang berada di `components` akan menginterpretasikan langkah-langkah itu menjadi animasi.

Contoh export sederhana:

```js
// src/algorithms/selection.js
export function selectionSortSteps(arr) {
  const a = arr.slice();
  const steps = [];
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ type: 'compare', i: minIdx, j });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ type: 'swap', i, j: minIdx });
    }
  }
  return { sorted: a, steps };
}
```

---

## Styling & UI

* Gunakan Tailwind untuk utility-first styling; jika memakai Tailwind, pastikan `tailwind.config.js` dan `postcss.config.js` terkonfigurasi untuk Vite.
* Sediakan tema gelap/terang (optional).
* Animasi: gunakan CSS transitions atau `requestAnimationFrame` untuk kontrol halus.

---

## Opsional: Backend / Tools Python

Jika ada skrip Python (mis. untuk menghasilkan data besar, preprocessing, atau eksperimen), sertakan `requirements.txt` di root dan tambahkan petunjuk berikut:

```bash
# buat virtualenv
python -m venv .venv
# aktifkan (Windows PowerShell)
.\.venv\Scripts\Activate
# atau (Linux / Mac)
source .venv/bin/activate
pip install -r requirements.txt
```

Untuk mengabaikan virtualenv dari Git, pastikan `.gitignore` berisi:

```
.venv/
venv/
```

---

## Menulis README/demo GIF/Video

Sangat direkomendasikan menambahkan GIF singkat (rekaman layar) yang menampilkan: memilih algoritma, menjalankan animasi, dan mengubah kecepatan. Letakkan di `assets/` lalu refer ke README.

---

## Kontribusi

1. Fork repo
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah visualizer heap sort"`
4. Push: `git push origin feat/nama-fitur`
5. Buat Pull Request dan jelaskan perubahan

Harap ikuti gaya kode dan jalankan `npm run lint` sebelum submit.

---

## Troubleshooting

* **Port sudah dipakai**: kalau `vite` gagal karena port, jalankan dengan `npm run dev -- --port 5174` atau hapus proses yang memakai port.
* **Tailwind error (postcss)**: pastikan install `tailwindcss` dan `@tailwindcss/postcss` serta konfigurasi `postcss.config.js` sesuai.

---

## Lisensi

Lisensi default: `MIT`. Sesuaikan jika organisasi kampus mengharuskan lisensi lain.

---

## Credits

* Template: Vite + React
* Penyusun: Tim Kelompok SDDP - Sunlight

---