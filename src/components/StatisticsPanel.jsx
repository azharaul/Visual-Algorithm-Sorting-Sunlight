import React from 'react';
import { useLanguage } from "../context/LanguageContext";

export default function StatisticsPanel({ stats, originalData, finalData }) {
    const { t } = useLanguage();
    if (!stats) return null;

    const { comparisons, swaps } = stats;

    // Helper to render a data item
    const renderItem = (item, idx) => (
        <div
            key={idx}
            className="bg-black/30 min-w-[32px] h-8 px-2 flex items-center justify-center rounded text-xs font-mono text-white border border-white/10"
            title={typeof item === 'object' ? JSON.stringify(item) : item}
        >
            {typeof item === 'object' ? item.value : item}
        </div>
    );

    return (
        <div className="w-full max-w-5xl px-4 mt-8 animate-fade-in-up">
            <div className="glass p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {t('statistics')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-blue-300 text-sm uppercase tracking-wider font-semibold">{t('comparisons')}</span>
                            <div className="text-3xl font-mono text-white mt-1">{comparisons}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-purple-300 text-sm uppercase tracking-wider font-semibold">{t('swaps')}</span>
                            <div className="text-3xl font-mono text-white mt-1">{swaps}</div>
                        </div>
                    </div>

                    {/* Data Summaries */}
                    <div className="space-y-4">
                        {/* Initial Data */}
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 overflow-hidden">
                            <span className="text-slate-300 text-xs uppercase tracking-wider font-semibold block mb-2">{t('initial_data')}</span>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {originalData && originalData.slice(0, 10).map((item, idx) => renderItem(item, idx))}
                                {originalData && originalData.length > 10 && (
                                    <div className="flex items-center text-white/50 text-xs">+{originalData.length - 10} more</div>
                                )}
                            </div>
                        </div>

                        {/* Result Preview */}
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 overflow-hidden">
                            <span className="text-green-300 text-xs uppercase tracking-wider font-semibold block mb-2">{t('result_preview')}</span>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {finalData && finalData.slice(0, 10).map((item, idx) => renderItem(item, idx))}
                                {finalData && finalData.length > 10 && (
                                    <div className="flex items-center text-white/50 text-xs">+{finalData.length - 10} more</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
