import React, { createContext, useContext, useState } from 'react';

const translations = {
    en: {
        title: 'Visual Algorithm Sorting',
        header_subtitle: 'Sunlight Group - Selection Sort, Heap Sort, and Quick Sort',
        start: 'Start Sorting',
        reset: 'Reset Array',
        speed: 'Speed',
        speed_ai: 'AI Explanation',
        algorithm: 'Algorithm',
        array_size: 'Array Size',
        current_step: 'Current Step',
        ai_explanation: 'AI Explanation',
        waiting_ai: 'Waiting for AI...',
        visualization_mode: 'Visualization Mode',
        bar_chart: 'Bar Chart',
        array_view: 'Array View',
        graph_bubble: 'Graph / Bubble',
        configuration: 'Configuration',
        custom_values: 'Custom Values',
        optional: 'Optional',
        elements: 'Elements',
        current_operation: 'Current Operation',
        by: 'By',
        switch_lang: 'Bahasa Indonesia'
    },
    id: {
        title: 'Visualisasi Algoritma Sorting',
        header_subtitle: 'Kelompok Sunlight - Selection Sort, Heap Sort, dan Quick Sort',
        start: 'Mulai Sorting',
        reset: 'Reset Array',
        speed: 'Kecepatan',
        speed_ai: 'Penjelasan AI',
        algorithm: 'Algoritma',
        array_size: 'Ukuran Array',
        current_step: 'Langkah Saat Ini',
        ai_explanation: 'Penjelasan AI',
        waiting_ai: 'Menunggu penjelasan AI...',
        visualization_mode: 'Mode Visualisasi',
        bar_chart: 'Diagram Batang',
        array_view: 'Tampilan Array',
        graph_bubble: 'Grafik / Bubble',
        configuration: 'Konfigurasi',
        custom_values: 'Nilai Kustom',
        optional: 'Opsional',
        elements: 'Elemen',
        current_operation: 'Operasi Saat Ini',
        by: 'Oleh',
        switch_lang: 'English'
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
