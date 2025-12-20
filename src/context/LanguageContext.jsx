import React, { createContext, useContext, useState } from 'react';

const translations = {
    en: {
        title: 'Visual Algorithm Sorting',
        header_subtitle: 'Sunlight Group - Selection Sort, Heap Sort, and Quick Sort',
        start: 'Start Sorting',
        reset: 'Reset Array',
        speed: 'Speed',

        visualization_mode: 'Visualization Mode',
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
        learn_more: 'Learn More'
    },
    id: {
        title: 'Visualisasi Algoritma Sorting',
        header_subtitle: 'Kelompok Sunlight - Selection Sort, Heap Sort, dan Quick Sort',
        start: 'Mulai Sorting',
        reset: 'Reset Array',
        speed: 'Kecepatan',

        visualization_mode: 'Mode Visualisasi',
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
        learn_more: 'Pelajari Lebih Lanjut'
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
