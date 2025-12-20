# 🌟 Visual Algorithm Sorting - Sunlight

Aplikasi visualisasi algoritma sorting interaktif dengan dukungan AI Tutor.

## ✨ Fitur

- **3 Algoritma Sorting**: Selection Sort, Quick Sort, Heap Sort
- **3 Mode Visualisasi**: Bar Chart, Array View, Graph Bubble
- **AI Tutor (SunBot)**: Penjelasan real-time dalam Bahasa Indonesia
- **Multibahasa**: Dukungan Bahasa Indonesia & English
- **Responsif**: Optimal di semua ukuran layar

## 🚀 Quick Start

### Frontend (React + Vite)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend (Python Flask)

```bash
# Masuk ke folder server
cd server

# Buat virtual environment
python -m venv .venv

# Aktifkan virtual environment
# Windows:
.\.venv\Scripts\Activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy dan konfigurasi environment
cp .env.example .env
# Edit .env dengan token Character.AI kamu

# Jalankan server
python app.py
```

## ⚙️ Konfigurasi

### Frontend (.env)

```env
VITE_API_URL=https://your-api-domain.com
```

### Backend (server/.env)

```env
CAI_TOKEN=your_character_ai_token
CAI_CHAR_ID=your_character_id
FLASK_PORT=5001
FLASK_DEBUG=true
```

## 🔐 Mendapatkan Token Character.AI

1. Buka [Character.AI](https://character.ai)
2. Login ke akun kamu
3. Buka Developer Tools (F12)
4. Pergi ke tab Application > Cookies
5. Cari cookie bernama `web-next-auth` - itu adalah token kamu
6. Untuk Character ID, buka chat dengan karakter dan lihat URL-nya

## 🌐 Deployment

### Frontend
Upload folder `dist/` (hasil `npm run build`) ke hosting statis seperti:
- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages

### Backend
Deploy folder `server/` ke:
- Railway
- Render
- Heroku
- VPS dengan Cloudflare Tunnel

## 📁 Struktur Project

```
├── src/
│   ├── algorithms/          # Implementasi sorting
│   ├── components/          # React components
│   ├── context/             # React context (i18n)
│   ├── App.jsx              # Main app
│   └── main.jsx             # Entry point
├── server/
│   ├── app.py               # Flask server
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables
│   └── .env.example         # Template
├── .env                     # Frontend env
├── .env.example             # Frontend env template
└── .gitignore               # Git ignore rules
```

## 👥 Tim Sunlight

Dibuat dengan ❤️ oleh Tim Sunlight untuk pembelajaran algoritma sorting.

## 📄 License

MIT License