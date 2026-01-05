import React from 'react';
import { useLanguage } from "../context/LanguageContext";

/**
 * Steps Log Component
 * Displays the current operation/step message during algorithm visualization
 */
export default function StepsLog({ message }) {
    const { t, language } = useLanguage();

    // Resolve message based on language if it's an object
    const resolveMessage = () => {
        if (!message) return t('waiting') || "Waiting...";
        if (typeof message === 'string') return message;
        if (typeof message === 'object') {
            return message[language] || message['en'] || message['id'] || JSON.stringify(message);
        }
        return String(message);
    };

    const finalMessage = resolveMessage();

    return (
        <div className="mt-4 sm:mt-6 md:mt-8 glass p-2.5 sm:p-3 md:p-4 rounded-xl border border-white/10 flex items-start sm:items-center gap-2.5 sm:gap-3 md:gap-4 animate-fade-in-up">
            {/* Icon */}
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-300 flex-shrink-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-blue-300 font-bold uppercase tracking-wider mb-0.5">
                    {t('current_operation')}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-white font-medium break-words leading-relaxed">
                    {finalMessage}
                </p>
            </div>
        </div>
    );
}
