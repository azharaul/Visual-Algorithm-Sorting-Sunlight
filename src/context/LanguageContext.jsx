import React, { createContext, useContext, useState } from 'react';

const translations = {
    en: {
        title: 'Visual Algorithm Sorting',
        header_subtitle: 'Sunlight Group - Selection Sort, Heap Sort, and Quick Sort',
        start: 'Start Sorting',
        reset: 'Reset Array',
        speed: 'Speed',

        visualization_mode: 'Visualization Mode',
        data_type: 'Data Type',
        numbers: 'Numbers',
        objects: 'Objects',
        bar_chart: 'Bar Chart',
        array_view: 'Array View',
        table_view: 'Table View',
        graph_bubble: 'Graph / Bubble',
        configuration: 'Configuration',
        custom_values: 'Custom Values',
        optional: 'Optional',
        elements: 'Elements',
        current_operation: 'Current Operation',
        by: 'By',
        switch_lang: 'Bahasa Indonesia',
        waiting: 'Waiting for data...',
        explanation: 'Explanation',
        code_implementation: 'Code Implementation',
        learn_more: 'Learn More',
        array_size: 'Array Size',
        algorithm: 'Algorithm',

        // Object Mode & Stats
        enable_object_mode: 'Enable Object Mode (JSON)',
        generate_template: 'Generate Template',
        object_students: 'Students (Grades)',
        object_products: 'Products (Price)',
        object_employees: 'Employees (Age)',

        // Statistics
        statistics: 'Statistics',
        comparisons: 'Comparisons',
        swaps: 'Swaps',
        result_preview: 'Result Preview',
        initial_data: 'Initial Data',

        // Landing Page
        landing_title: 'Sorting Algorithms Visualized',
        landing_subtitle: 'Experience the beauty of algorithms through interactive visualization',
        landing_desc: 'Explore Selection Sort, Quick Sort, and Heap Sort with our premium visualizer. Understand complex logic with ease.',
        get_started: 'Get Started',
        meet_team: 'Meet the Creator',
        id_1: '1402024013',
        id_2: '1402024006',
        team_role: 'Sunlight Team'
    },
    id: {
        title: 'Visualisasi Algoritma Sorting',
        header_subtitle: 'Kelompok Sunlight - Selection Sort, Heap Sort, dan Quick Sort',
        start: 'Mulai Sorting',
        reset: 'Reset Array',
        speed: 'Kecepatan',

        visualization_mode: 'Mode Visualisasi',
        data_type: 'Tipe Data',
        numbers: 'Angka',
        objects: 'Objek',
        bar_chart: 'Diagram Batang',
        array_view: 'Tampilan Array',
        table_view: 'Tampilan Tabel',
        graph_bubble: 'Grafik / Bubble',
        configuration: 'Konfigurasi',
        custom_values: 'Nilai Kustom',
        optional: 'Opsional',
        elements: 'Elemen',
        current_operation: 'Operasi Saat Ini',
        by: 'Oleh',
        switch_lang: 'English',
        waiting: 'Menunggu data...',
        explanation: 'Penjelasan',
        code_implementation: 'Implementasi Kode',
        learn_more: 'Pelajari Lebih Lanjut',
        array_size: 'Ukuran Array',
        algorithm: 'Algoritma',

        // Object Mode & Stats
        enable_object_mode: 'Aktifkan Mode Objek (JSON)',
        generate_template: 'Buat Template',
        object_students: 'Mahasiswa (Nilai)',
        object_products: 'Barang (Harga)',
        object_employees: 'Karyawan (Umur)',

        // Statistics
        statistics: 'Statistik',
        comparisons: 'Perbandingan',
        swaps: 'Pertukaran',
        result_preview: 'Pratinjau Hasil',
        initial_data: 'Data Awal',

        // Landing Page
        landing_title: 'Visualisasi Algoritma Sorting',
        landing_subtitle: 'Rasakan keindahan algoritma melalui visualisasi interaktif',
        landing_desc: 'Jelajahi Selection Sort, Quick Sort, dan Heap Sort dengan visualizer premium kami. Pahami logika kompleks dengan mudah.',
        get_started: 'Mulai Sekarang',
        meet_team: 'Temui Pembuat',
        id_1: '1402024013',
        id_2: '1402024006',
        team_role: 'Tim Sunlight'
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
