import React from 'react';
import { algorithmData } from '../data/algorithmData';

/**
 * Algorithm Sidebar Component
 * Fixed sidebar on the right with algorithm buttons
 */
export default function AlgorithmSidebar({ onSelectAlgorithm }) {
    const algorithms = ['selection', 'quick', 'heap'];

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 sm:gap-3 p-1.5 sm:p-2">
            {algorithms.map((algoKey) => {
                const algo = algorithmData[algoKey];
                return (
                    <button
                        key={algoKey}
                        onClick={() => onSelectAlgorithm(algoKey)}
                        className={`group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-l-xl bg-gradient-to-r ${algo.color} shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-x-1 transition-all duration-300`}
                        title={algo.name}
                    >
                        {/* Icon */}
                        <span className="text-lg sm:text-xl md:text-2xl">{algo.icon}</span>

                        {/* Tooltip */}
                        <div className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs sm:text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl">
                            {algo.name}
                            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                        </div>

                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-l-xl bg-gradient-to-r ${algo.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300 -z-10`}></div>
                    </button>
                );
            })}

            {/* Info Badge */}
            <div className="mt-2 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-l-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
