import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const AIExplanationCard = ({ displayedExplanation, speed }) => {
    const { t } = useLanguage();

    if (speed !== 'AI') return null;

    return (
        <div className="mt-4 p-4 border border-blue-500/30 rounded-xl bg-blue-900/10 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <h3 className="text-blue-300 font-bold mb-2 flex items-center gap-2">
                <span className="animate-pulse">🤖</span> {t('ai_explanation')}
            </h3>
            <p className="text-white/90 text-sm md:text-base leading-relaxed font-mono">
                {displayedExplanation || t('waiting_ai')}
            </p>
        </div>
    );
};

export default AIExplanationCard;
