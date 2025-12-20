import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Input Panel Component
 * Provides configuration options for the sorting visualization
 */
export default function InputPanel({ onRun }) {
    const { t } = useLanguage();
    const [size, setSize] = useState(8);
    const [layout, setLayout] = useState("bar");
    const [values, setValues] = useState("");

    const handleRun = () => {
        let array = [];

        // Parse custom values if provided
        if (values.trim() !== "") {
            array = values
                .split(",")
                .map((v) => parseInt(v.trim()))
                .filter((v) => !isNaN(v))
                .slice(0, size);
        }

        // Generate random values if needed
        while (array.length < size) {
            array.push(Math.floor(Math.random() * 20) + 1);
        }

        onRun(array, layout);
    };

    const handleReset = () => {
        setSize(8);
        setLayout("bar");
        setValues("");
    };

    return (
        <div className="glass p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 md:mb-8 w-full max-w-full md:max-w-2xl mx-auto border border-white/10">
            {/* Header */}
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 text-white text-glow flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                    />
                </svg>
                {t('configuration')}
            </h2>

            {/* Grid Layout for Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-5 md:mb-6">
                {/* Array Size */}
                <div>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium mb-1.5 sm:mb-2 text-blue-200">
                        {t('array_size')}
                    </label>
                    <div className="relative">
                        <select
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all appearance-none cursor-pointer hover:bg-white/10"
                        >
                            {[5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
                                <option key={n} value={n} className="bg-slate-800 text-white">
                                    {n} {t('elements')}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Visualization Mode */}
                <div>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium mb-1.5 sm:mb-2 text-blue-200">
                        {t('visualization_mode')}
                    </label>
                    <div className="relative">
                        <select
                            value={layout}
                            onChange={(e) => setLayout(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all appearance-none cursor-pointer hover:bg-white/10"
                        >
                            <option value="bar" className="bg-slate-800 text-white">{t('bar_chart')}</option>
                            <option value="array" className="bg-slate-800 text-white">{t('array_view')}</option>
                            <option value="graph" className="bg-slate-800 text-white">{t('graph_bubble')}</option>
                        </select>
                        <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Values Input */}
            <div className="mb-4 sm:mb-5 md:mb-6">
                <label className="block text-[10px] sm:text-xs md:text-sm font-medium mb-1.5 sm:mb-2 text-blue-200">
                    {t('custom_values')}{" "}
                    <span className="text-white/40 text-[10px] sm:text-xs ml-1">({t('optional')})</span>
                </label>
                <input
                    type="text"
                    placeholder="e.g., 5, 3, 8, 1, 9"
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all font-mono text-xs sm:text-sm"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                    onClick={handleRun}
                    className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    {t('start')}
                </button>
                <button
                    onClick={handleReset}
                    className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/10 text-blue-200 hover:text-white rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('reset')}
                </button>
            </div>
        </div>
    );
}
