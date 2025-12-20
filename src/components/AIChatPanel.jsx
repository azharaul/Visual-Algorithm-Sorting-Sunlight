import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * AI Chat Panel Component
 * Provides an interactive chat interface for AI-powered algorithm explanations
 */
export default function AIChatPanel({ displayedExplanation, onUserMessage, isWaiting }) {
    const { t } = useLanguage();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initial welcome message
    useEffect(() => {
        setMessages([
            {
                sender: 'ai',
                text: "👋 Halo! Saya SunBot, asisten belajar algoritma sorting kamu. Saya akan menjelaskan setiap langkah yang terjadi. Silakan bertanya jika ada yang membingungkan!"
            }
        ]);
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isWaiting]);

    // Watch for external auto-explanations
    useEffect(() => {
        if (displayedExplanation && displayedExplanation.trim()) {
            setMessages(prev => [...prev, { sender: 'ai', text: displayedExplanation }]);
        }
    }, [displayedExplanation]);

    // Handle sending messages
    const handleSend = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        // Add user message to chat
        setMessages(prev => [...prev, { sender: 'user', text: trimmedInput }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await onUserMessage(trimmedInput);
            if (response) {
                setMessages(prev => [...prev, { sender: 'ai', text: response }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: "⚠️ Maaf, terjadi kesalahan saat menghubungi SunBot. Silakan coba lagi."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="mt-4 sm:mt-6 md:mt-8 w-full max-w-full md:max-w-4xl glass rounded-xl border border-white/10 flex flex-col h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
            {/* Header */}
            <div className="p-2.5 sm:p-3 md:p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl md:text-2xl">🤖</span>
                    <div>
                        <h3 className="text-blue-100 font-bold text-xs sm:text-sm md:text-base">
                            SunBot AI Tutor
                        </h3>
                        <p className="text-blue-300/70 text-[10px] sm:text-xs hidden sm:block">
                            Asisten Pintar Algoritma Sorting
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isWaiting || isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
                    <span className="text-[10px] sm:text-xs text-blue-200/70">
                        {isWaiting || isLoading ? 'Mengetik...' : 'Online'}
                    </span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 md:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div
                            className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm md:text-base leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-sm'
                                    : 'bg-white/10 text-blue-100 border border-white/10 rounded-bl-sm'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {(isWaiting || isLoading) && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-white/10 text-blue-300 p-2.5 sm:p-3 rounded-xl rounded-bl-sm border border-white/10">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-2.5 sm:p-3 md:p-4 border-t border-white/10 bg-black/20">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tanya sesuatu tentang langkah ini..."
                        disabled={isLoading}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:py-2.5 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center gap-1.5"
                    >
                        <span className="hidden sm:inline">Kirim</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
                <p className="text-[10px] sm:text-xs text-blue-300/50 mt-1.5 sm:mt-2 text-center">
                    Tekan Enter untuk mengirim • SunBot akan menjawab dalam Bahasa Indonesia
                </p>
            </div>
        </div>
    );
}
