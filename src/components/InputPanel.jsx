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
    const [isObjectMode, setIsObjectMode] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("students");

    const handleRun = () => {
        let array = [];

        // Parse custom values if provided
        if (values.trim() !== "") {
            if (isObjectMode) {
                try {
                    const parsed = JSON.parse(values);
                    if (Array.isArray(parsed)) {
                        array = parsed;
                    } else {
                        alert("Input must be a JSON array.");
                        return;
                    }
                } catch (error) {
                    console.error(error);
                    alert("Invalid JSON format.");
                    return;
                }
            } else {
                array = values
                    .split(",")
                    .map((v) => parseInt(v.trim()))
                    .filter((v) => !isNaN(v));
            }

            if (array.length > 50) {
                array = array.slice(0, 50);
                alert("Custom input limited to 50 elements for performance.");
            }
        }

        if (array.length === 0) {
            // If user entered garbage or nothing
            if (values.trim() !== "") {
                alert(isObjectMode ? "Invalid JSON array." : "Invalid input. Generating random array.");
            }
        }

        // Random generation if empty
        if (array.length === 0) {
            if (isObjectMode) {
                while (array.length < size) {
                    const val = Math.floor(Math.random() * 50) + 1;
                    array.push({ value: val, label: `Obj ${val}` });
                }
            } else {
                while (array.length < size) {
                    array.push(Math.floor(Math.random() * 50) + 1);
                }
            }
        }

        onRun(array, layout);
    };

    const handleReset = () => {
        setSize(8);
        setLayout("bar");
        setValues("");
        setIsObjectMode(false);
    };

    const generateTemplate = () => {
        let template = [];
        if (selectedTemplate === "students") {
            template = [
                { value: 85, label: "Aidan", info: "A" },
                { value: 60, label: "Azhar", info: "C" },
                { value: 92, label: "Toni", info: "A" },
                { value: 78, label: "Hendra", info: "B" },
                { value: 60, label: "Daus", info: "C" },
                { value: 45, label: "Habibie", info: "D" }
            ];
        } else if (selectedTemplate === "products") {
            template = [
                { value: 15000, label: "Susu", info: "Dairy" },
                { value: 2500, label: "Roti", info: "Bakery" },
                { value: 50000, label: "Keju", info: "Dairy" },
                { value: 12000, label: "Telur", info: "Pantry" },
                { value: 5000, label: "Air", info: "Drink" }
            ];
        } else if (selectedTemplate === "employees") {
            template = [
                { value: 35, label: "Ahmad", info: "Manager" },
                { value: 24, label: "Dina", info: "Staff" },
                { value: 42, label: "Eko", info: "Lead" },
                { value: 29, label: "Fani", info: "Staff" },
                { value: 55, label: "Gunawan", info: "Director" }
            ];
        }

        setValues(JSON.stringify(template, null, 2));
        setIsObjectMode(true);
    };

    return (
        <div className="glass p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 md:mb-8 w-full max-w-full md:max-w-3xl mx-auto border border-white/10 shadow-2xl shadow-blue-900/10">
            {/* Header */}
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 text-white text-glow flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </div>
                {t('configuration')}
            </h2>

            {/* Grid Layout for Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Array Size */}
                <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-blue-200 ml-1">
                        {t('array_size')}
                    </label>
                    <div className="relative group">
                        <select
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-slate-900/70"
                        >
                            {[5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
                                <option key={n} value={n} className="bg-slate-900 text-white">
                                    {n} {t('elements')}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400 group-hover:text-blue-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Visualization Mode */}
                <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-blue-200 ml-1">
                        {t('visualization_mode')}
                    </label>
                    <div className="relative group">
                        <select
                            value={layout}
                            onChange={(e) => setLayout(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-slate-900/70"
                        >
                            <option value="bar" className="bg-slate-900 text-white">{t('bar_chart')}</option>
                            <option value="array" className="bg-slate-900 text-white">{t('array_view')}</option>
                            <option value="table" className="bg-slate-900 text-white">{t('table_view')}</option>
                            <option value="graph" className="bg-slate-900 text-white">{t('graph_bubble')}</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400 group-hover:text-blue-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Type Toggle */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center gap-3 bg-slate-900/50 p-1.5 rounded-xl border border-white/5 w-full md:w-auto">
                    <span className="text-xs font-medium text-blue-200 px-2">{t('data_type')}:</span>

                    {/* Animated Sliding Toggle */}
                    <div className="relative flex items-center bg-slate-800/50 rounded-lg p-1 border border-white/10 w-48 h-10 cursor-pointer">
                        {/* Slider Background */}
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-600 to-blue-500 rounded-md shadow-lg shadow-blue-500/20 transition-all duration-300 ease-in-out ${isObjectMode ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                                }`}
                        ></div>

                        <button
                            onClick={() => setIsObjectMode(false)}
                            className={`flex-1 relative z-10 h-full text-xs font-bold text-center transition-colors duration-300 flex items-center justify-center gap-2 ${!isObjectMode ? "text-white" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <span>#</span> {t('numbers')}
                        </button>
                        <button
                            onClick={() => setIsObjectMode(true)}
                            className={`flex-1 relative z-10 h-full text-xs font-bold text-center transition-colors duration-300 flex items-center justify-center gap-2 ${isObjectMode ? "text-white" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <span>{"{}"}</span> {t('objects')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Values Input */}
            <div className="mb-6 space-y-2">
                <div className="flex justify-between items-end">
                    <label className="text-xs sm:text-sm font-medium text-blue-200 ml-1">
                        {t('custom_values')}{" "}
                        <span className="text-white/30 text-xs font-normal">({t('optional')})</span>
                    </label>

                    {isObjectMode && (
                        <div className="flex gap-2 items-center">
                            <select
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="bg-slate-900/50 border border-white/10 text-white text-xs rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="students">{t('object_students')}</option>
                                <option value="products">{t('object_products')}</option>
                                <option value="employees">{t('object_employees')}</option>
                            </select>
                            <button
                                onClick={generateTemplate}
                                className="text-[10px] sm:text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all hover:text-blue-200"
                            >
                                {t('generate_template')}
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative">
                    {isObjectMode ? (
                        <textarea
                            placeholder='[ { "value": 85, "label": "Aidan" }, ... ]'
                            value={values}
                            onChange={(e) => setValues(e.target.value)}
                            className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono text-xs sm:text-sm resize-none leading-relaxed"
                            spellCheck="false"
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder="e.g., 5, 3, 8, 1, 9"
                            value={values}
                            onChange={(e) => setValues(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg sm:rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono text-xs sm:text-sm"
                        />
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 w-full">
                <button
                    onClick={handleRun}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
                >
                    <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {t('start')}
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-transparent border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('reset')}
                </button>
            </div>
        </div>
    );
}
