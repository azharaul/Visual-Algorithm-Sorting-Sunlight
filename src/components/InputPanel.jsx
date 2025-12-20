import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function InputPanel({ onRun }) {
    const { t } = useLanguage();
    const [size, setSize] = useState(8);
    const [layout, setLayout] = useState("bar");
    const [values, setValues] = useState("");

    const handleRun = () => {
        let array = [];

        if (values.trim() !== "") {
            // input manual
            array = values
                .split(",")
                .map((v) => parseInt(v.trim()))
                .filter((v) => !isNaN(v))
                .slice(0, size);
        }

        // generate random jika kosong / kurang
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
        <div className="glass p-6 md:p-8 rounded-2xl mb-6 md:mb-8 w-full max-w-full md:max-w-2xl mx-auto border border-white/10">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-white text-glow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                {t('configuration')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-6">
                {/* ARRAY SIZE */}
                <div>
                    <label className="block text-xs md:text-sm font-medium mb-2 text-blue-200">
                        {t('array_size')}
                    </label>
                    <div className="relative">
                        <select
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all appearance-none cursor-pointer hover:bg-white/10"
                        >
                            {[8, 9, 10, 11, 12, 15, 20].map((n) => (
                                <option key={n} value={n} className="bg-slate-800 text-white">
                                    {n} {t('elements')}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ARRAY LAYOUT */}
                <div>
                    <label className="block text-xs md:text-sm font-medium mb-2 text-blue-200">
                        {t('visualization_mode')}
                    </label>
                    <div className="relative">
                        <select
                            value={layout}
                            onChange={(e) => setLayout(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all appearance-none cursor-pointer hover:bg-white/10"
                        >
                            <option value="bar" className="bg-slate-800 text-white">{t('bar_chart')}</option>
                            <option value="array" className="bg-slate-800 text-white">{t('array_view')}</option>
                            <option value="graph" className="bg-slate-800 text-white">{t('graph_bubble')}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* ARRAY VALUES */}
            <div className="mb-6 md:mb-8">
                <label className="block text-xs md:text-sm font-medium mb-2 text-blue-200">
                    {t('custom_values')} <span className="text-white/40 text-xs ml-1">({t('optional')})</span>
                </label>
                <input
                    type="text"
                    placeholder="e.g., 5, 3, 8, 1, 9"
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all font-mono text-xs md:text-sm"
                />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                    onClick={handleRun}
                    className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm md:text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                >
                    {t('start')}
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 text-blue-200 hover:text-white rounded-xl font-medium text-sm md:text-base hover:bg-white/10 transition-all active:scale-95"
                >
                    {t('reset')}
                </button>
            </div>
        </div>
    );
}
