# 🌟 Sorting Visualizer - Sunlight

An interactive and beautiful sorting algorithm visualizer built with React. Explore how different algorithms work through various visualization modes and real-time step monitoring.

## ✨ Features

- **3 Powerful Algorithms**: 
  - **Selection Sort**: Simple and intuitive.
  - **Quick Sort**: Highly efficient divide-and-conquer.
  - **Heap Sort**: Robust comparison-based sorting using heaps.
  
- **4 Interactive Visualization Modes**:
  - 📊 **Bar Chart**: Classic positional height visualization.
  - 🧩 **Array View**: Card-based positional tracking.
  - 📉 **Graph Bubble**: Modern SVG-based bubble charts with smooth animations.
  - 📋 **Table View**: Detailed step-by-step list of indices and values.

- **Dynamic Controls**:
  - ⏩ **Speed Adjustment**: Control animation speed from 0.5x to MAX.
  - ⏯️ **Playback Control**: Step forward, step backward, or play/pause.
  - 🌐 **Multilingual Support**: Switch seamlessly between **English** and **Bahasa Indonesia**.
  - 📝 **Steps Log**: Real-time descriptions of every swap and comparison.

- **Responsive Design**: Premium dark-mode UI that works perfectly on desktops, tablets, and mobile devices.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/azharaul/Visual-Algorithm-Sorting-Sunlight.git
   cd sorting-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
├── src/
│   ├── algorithms/          # Sorting algorithm implementations & step generators
│   ├── components/          # Reusable UI components
│   │   └── visualizers/     # Modular view components (Bar, Graph, Array, Table)
│   ├── context/             # Multi-language (i18n) context
│   ├── App.jsx              # Main application logic
│   └── main.jsx             # Entry point
├── public/                 # Static assets
└── index.html              # HTML template
```

## 👥 Sunlight Team

Crafted with ❤️ by **Sunlight Team** for algorithm education and interactive learning:

- **Azhar Aulia Priatna** (NIM: 1402024013)
- **Aidan Pitra Habibie** (NIM: 1402024006)

---
© 2025 Sunlight Team. Licensed under the MIT License.