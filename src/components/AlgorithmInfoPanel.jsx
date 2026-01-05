import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { algorithmData, languageInfo } from '../data/algorithmData';
import SyntaxHighlighter from './SyntaxHighlighter';

/**
 * Algorithm Info Panel Component
 * Sliding panel showing detailed algorithm explanations and code implementations
 */
export default function AlgorithmInfoPanel({ isOpen, onClose, selectedAlgorithm }) {
    const { language } = useLanguage();
    const [activeCodeLang, setActiveCodeLang] = useState('python');
    const [copied, setCopied] = useState(false);

    const algo = algorithmData[selectedAlgorithm];
    if (!algo) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(algo.code[activeCodeLang]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[480px] md:w-[560px] lg:w-[640px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 z-50 shadow-2xl transform transition-transform duration-500 ease-out overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className={`p-4 sm:p-5 md:p-6 bg-gradient-to-r ${algo.color} relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={onClose}
                            className="absolute top-0 right-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-3xl sm:text-4xl md:text-5xl">{algo.icon}</span>
                            <div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                    {algo.name}
                                </h2>
                                <p className="text-white/80 text-xs sm:text-sm mt-1">
                                    {language === 'id' ? 'Algoritma Pengurutan' : 'Sorting Algorithm'}
                                </p>
                            </div>
                        </div>

                        {/* Complexity Badges */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm text-white">
                                <span className="opacity-70">Best:</span> {algo.complexity.time.best}
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm text-white">
                                <span className="opacity-70">Avg:</span> {algo.complexity.time.average}
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm text-white">
                                <span className="opacity-70">Worst:</span> {algo.complexity.time.worst}
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm text-white">
                                <span className="opacity-70">Space:</span> {algo.complexity.space}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="h-[calc(100%-180px)] sm:h-[calc(100%-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* Description Section */}
                    <div className="p-4 sm:p-5 md:p-6 border-b border-white/10">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {language === 'id' ? 'Penjelasan' : 'Explanation'}
                        </h3>
                        <div className="prose prose-invert prose-sm max-w-none">
                            <div className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                                {algo.description[language].split('\n').map((line, i) => {
                                    // Handle headers
                                    if (line.startsWith('###')) {
                                        return (
                                            <h4 key={i} className="text-white font-semibold mt-4 mb-2 text-sm sm:text-base">
                                                {line.replace('###', '').trim()}
                                            </h4>
                                        );
                                    }
                                    // Handle bold
                                    if (line.includes('**')) {
                                        const parts = line.split(/\*\*(.*?)\*\*/);
                                        return (
                                            <p key={i} className="mb-2">
                                                {parts.map((part, j) =>
                                                    j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part
                                                )}
                                            </p>
                                        );
                                    }
                                    // Handle list items
                                    if (line.match(/^[0-9]+\./)) {
                                        return (
                                            <p key={i} className="mb-1.5 ml-4">
                                                {line}
                                            </p>
                                        );
                                    }
                                    if (line.startsWith('- 🟢') || line.startsWith('- 🔴')) {
                                        return (
                                            <p key={i} className="mb-1.5 ml-2">
                                                {line.replace('- ', '')}
                                            </p>
                                        );
                                    }
                                    return line ? <p key={i} className="mb-2">{line}</p> : null;
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Code Implementation Section */}
                    <div className="p-4 sm:p-5 md:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            {language === 'id' ? 'Implementasi Kode' : 'Code Implementation'}
                        </h3>

                        {/* Language Tabs */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                            {Object.keys(algo.code).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setActiveCodeLang(lang)}
                                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeCodeLang === lang
                                        ? `${languageInfo[lang].color} text-white shadow-lg`
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {languageInfo[lang].name}
                                </button>
                            ))}
                        </div>

                        {/* Code Block */}
                        <div className="relative">
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-gray-400 hover:text-white"
                                title="Copy code"
                            >
                                {copied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </button>
                            <pre className="bg-black/40 rounded-xl p-4 overflow-x-auto">
                                <SyntaxHighlighter
                                    code={algo.code[activeCodeLang]}
                                    language={activeCodeLang}
                                />
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
