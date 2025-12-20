import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AIChatPanel({ displayedExplanation, onUserMessage, isWaiting }) {
    const { t } = useLanguage();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial Message
    useEffect(() => {
        setMessages([
            {
                sender: 'ai',
                text: "Halo! Saya SunBot. Saya akan menjelaskan langkah-langkah algoritma ini. Silakan tanya jika bingung!"
            }
        ]);
    }, []);

    // Watch for external explanations (Auto-Mode)
    useEffect(() => {
        if (displayedExplanation) {
            setMessages(prev => [...prev, { sender: 'ai', text: displayedExplanation }]);
        }
    }, [displayedExplanation]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add User Message
        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput("");

        // Propagate to parent to fetch AI response, expecting a Promise return
        setIsLoading(true);
        onUserMessage(userMsg).then((response) => {
            if (response) {
                setMessages(prev => [...prev, { sender: 'ai', text: response }]);
            }
        }).catch(err => {
            setMessages(prev => [...prev, { sender: 'ai', text: "Maaf, terjadi kesalahan saat menghubungi SunBot." }]);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="mt-6 md:mt-8 w-full max-w-full md:max-w-4xl glass rounded-xl border border-white/10 flex flex-col h-[400px] md:h-[500px] overflow-hidden">
            {/* Header */}
            <div className="p-3 md:p-4 border-b border-white/10 bg-blue-600/20 flex items-center gap-2">
                <span className="text-xl md:text-2xl animate-pulse">🤖</span>
                <h3 className="text-blue-100 font-bold text-sm md:text-base">SunBot AI Tutor</h3>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] p-3 rounded-xl text-sm md:text-base ${msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white/10 text-blue-100 border border-white/10 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {isWaiting && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 text-blue-300 p-3 rounded-xl rounded-tl-none text-xs md:text-sm animate-pulse italic">
                            Sedang mengetik penjelasan...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 border-t border-white/10 bg-black/20 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tanya sesuatu tentang langkah ini..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:bg-white/10 transition-colors"
                />
                <button
                    onClick={handleSend}
                    disabled={isWaiting}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50 text-sm md:text-base"
                >
                    Kirim
                </button>
            </div>
        </div>
    );
}
