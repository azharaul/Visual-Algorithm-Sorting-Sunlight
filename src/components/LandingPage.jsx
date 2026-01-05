import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SunlightGame from './SunlightGame';

export default function LandingPage({ onStart }) {
    const { t, toggleLanguage } = useLanguage();
    const [showGame, setShowGame] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const handleStart = () => {
        setIsExiting(true);
        // Wait for animation to finish before unmounting
        setTimeout(() => {
            onStart();
        }, 800);
    };

    return (
        <div className={`relative min-h-screen w-full overflow-hidden bg-slate-900 text-white flex flex-col items-center justify-center selection:bg-blue-500 selection:text-white transition-all duration-800 ${isExiting ? 'opacity-0 scale-105 filter blur-lg' : 'opacity-100 scale-100'}`}>

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-teal-500/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                className="fixed top-6 right-6 z-50 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
                🌐 {t('switch_lang')}
            </button>

            {/* Main Content */}
            <main className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center text-center">

                {/* Hero Title */}
                <div className="mb-6 animate-fade-in-down">
                    <button
                        onClick={() => setShowGame(true)}
                        className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold tracking-widest uppercase mb-4 hover:bg-blue-500/30 hover:scale-105 transition-all cursor-pointer select-none"
                    >
                        {t('team_role')} ✨
                    </button>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-2 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-purple-500 drop-shadow-[0_0_35px_rgba(255,200,0,0.3)] leading-tight">
                        Sunlight
                    </h1>
                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-400 mb-6">
                        {t('landing_title')}
                    </h2>
                </div>

                {/* Description */}
                <p className="max-w-2xl text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed animate-fade-in-up delay-100">
                    {t('landing_desc')}
                </p>

                {/* CTA Button */}
                <button
                    onClick={handleStart}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] hover:scale-105 transition-all duration-300 animate-bounce-subtle"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {t('get_started')}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-16"></div>

                {/* Team Section */}
                <div className="w-full max-w-4xl animate-fade-in-up delay-200">
                    <h3 className="text-2xl font-bold mb-8 text-slate-200 flex items-center justify-center gap-3">
                        <span className="w-8 h-[2px] bg-blue-500"></span>
                        {t('meet_team')}
                        <span className="w-8 h-[2px] bg-blue-500"></span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Member 1 */}
                        <div className="group bg-slate-800/40 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-slate-800/60 transition-all hover:-translate-y-1 hover:border-blue-500/30">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-lg group-hover:border-blue-400 transition-colors">
                                    <img src="/images/azhar.png" alt="Azhar Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Azhar Aulia Priatna</h4>
                                    <p className="text-sm text-slate-400 font-mono">{t('id_1')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div className="group bg-slate-800/40 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-slate-800/60 transition-all hover:-translate-y-1 hover:border-purple-500/30">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg group-hover:border-purple-400 transition-colors">
                                    <img src="/images/aidan.png" alt="Aidan Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">Aidan Pitra Habibie</h4>
                                    <p className="text-sm text-slate-400 font-mono">{t('id_2')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-6 text-slate-500 text-sm">
                © 2025 Sunlight Team. All rights reserved.
            </footer>

            {/* Easter Egg Game */}
            {showGame && <SunlightGame onClose={() => setShowGame(false)} />}
        </div>
    );
}

// Existing CSS animations in index.css should support this, or we rely on Tailwind classes
