import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "./context/LanguageContext";
import AIChatPanel from "./components/AIChatPanel";
import { generateSelectionSortSteps } from "./algorithms/selectionSortSteps";
import { generateQuickSortSteps } from "./algorithms/quickSortSteps";
import { generateHeapSortSteps } from "./algorithms/heapSortSteps";
import InputPanel from "./components/InputPanel";
import Visualizer from "./components/Visualizer";
import StepsLog from "./components/StepsLog";
import AlgorithmSidebar from "./components/AlgorithmSidebar";
import AlgorithmInfoPanel from "./components/AlgorithmInfoPanel";

// ============================================
// Configuration
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://chat.breakdownaz.my.id";

function App() {
    // ============================================
    // State Management
    // ============================================
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [layout, setLayout] = useState("bar");
    const [isPlaying, setIsPlaying] = useState(false);
    const { t, toggleLanguage, language } = useLanguage();
    const [speed, setSpeed] = useState(500);
    const [algorithm, setAlgorithm] = useState("selection");
    const [aiExplanation, setAiExplanation] = useState("");
    const [isWaitingForAI, setIsWaitingForAI] = useState(false);
    const [infoPanelOpen, setInfoPanelOpen] = useState(false);
    const [selectedInfoAlgo, setSelectedInfoAlgo] = useState("selection");

    // ============================================
    // AI Integration
    // ============================================
    const fetchAIExplanation = useCallback(async (stepData) => {
        setIsWaitingForAI(true);
        setAiExplanation("");

        try {
            const res = await fetch(`${API_BASE_URL}/explain_step`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    algorithm: algorithm,
                    step: stepData
                })
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            setAiExplanation(data.explanation || data.error || "No response");
        } catch (err) {
            console.error("AI Explanation Error:", err);
            setAiExplanation("⚠️ Gagal terhubung ke AI. Pastikan server berjalan.");
        } finally {
            setIsWaitingForAI(false);
        }
    }, [algorithm]);

    const handleUserChat = useCallback(async (message) => {
        try {
            const res = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    algorithm: algorithm,
                    step: steps[currentStep] || {},
                    message: message
                })
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            return data.response || data.error || "No response";
        } catch (err) {
            console.error("Chat Error:", err);
            return "⚠️ Gagal menghubungi AI. Coba lagi nanti.";
        }
    }, [algorithm, steps, currentStep]);

    // ============================================
    // Algorithm Execution
    // ============================================
    const handleRun = (array, selectedLayout) => {
        try {
            setLayout(selectedLayout);
            let generatedSteps;

            switch (algorithm) {
                case "selection":
                    generatedSteps = generateSelectionSortSteps(array);
                    break;
                case "quick":
                    generatedSteps = generateQuickSortSteps(array);
                    break;
                case "heap":
                    generatedSteps = generateHeapSortSteps(array);
                    break;
                default:
                    generatedSteps = generateSelectionSortSteps(array);
            }

            setSteps(generatedSteps);
            setCurrentStep(0);
            setIsPlaying(false);
            setAiExplanation("");
        } catch (error) {
            console.error("Error generating steps:", error);
            alert("Error generating steps. Please check the algorithm implementation.");
        }
    };

    // ============================================
    // Playback Control Effect
    // ============================================
    useEffect(() => {
        let interval;

        if (isPlaying && currentStep < steps.length - 1) {
            if (speed === 'AI') {
                // AI Mode: Fetch explanation then wait
                if (!isWaitingForAI && steps[currentStep] && !aiExplanation) {
                    fetchAIExplanation(steps[currentStep]);
                } else if (!isWaitingForAI && aiExplanation) {
                    interval = setTimeout(() => {
                        setAiExplanation("");
                        setCurrentStep((prev) => prev + 1);
                    }, 4000);
                }
            } else {
                // Normal Speed Mode
                interval = setInterval(() => {
                    setCurrentStep((prev) => prev + 1);
                }, speed);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
                clearTimeout(interval);
            }
        };
    }, [isPlaying, currentStep, steps, speed, isWaitingForAI, aiExplanation, fetchAIExplanation]);

    const step = steps[currentStep];

    // ============================================
    // Render
    // ============================================
    return (
        <div className="min-h-screen pt-6 sm:pt-8 md:pt-12 pb-32 sm:pb-36 md:pb-40 px-3 sm:px-4 md:px-8 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-5xl mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-purple-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-relaxed py-1">
                    {t('title')}
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-relaxed">
                    <span className="text-white">{t('by')}</span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-300 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">
                        Sunlight
                    </span>
                </h2>
            </header>

            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-8 md:right-8 bg-white/10 hover:bg-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm text-blue-200 font-bold backdrop-blur-sm border border-white/10 transition-all z-50"
            >
                🌐 {t('switch_lang')}
            </button>

            {/* Main Content */}
            <main className="w-full max-w-5xl px-1 sm:px-2 md:px-0">
                {/* Algorithm Selector */}
                <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                    <label className="text-sm sm:text-base md:text-lg font-medium text-blue-200">
                        {t('algorithm')}:
                    </label>
                    <div className="relative z-20 w-full sm:w-auto">
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="w-full sm:w-auto bg-white/10 border border-white/20 rounded-xl px-4 sm:px-5 md:px-6 py-2 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all cursor-pointer hover:bg-white/20 appearance-none min-w-[180px] sm:min-w-[200px]"
                        >
                            <option value="selection" className="bg-slate-800">Selection Sort</option>
                            <option value="quick" className="bg-slate-800">Quick Sort</option>
                            <option value="heap" className="bg-slate-800">Heap Sort</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Input Panel */}
                <InputPanel onRun={handleRun} />

                {/* Visualizer */}
                <Visualizer step={step} layout={layout} />

                {/* Steps Log */}
                {step && <StepsLog message={step.message} />}

                {/* AI Chat Panel */}
                {speed === 'AI' && (
                    <AIChatPanel
                        displayedExplanation={aiExplanation}
                        isWaiting={isWaitingForAI}
                        onUserMessage={async (msg) => {
                            setIsPlaying(false);
                            return await handleUserChat(msg);
                        }}
                    />
                )}

                {/* Playback Controls */}
                {steps.length > 0 && (
                    <div className="fixed bottom-3 sm:bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 glass px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 rounded-2xl sm:rounded-full flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-6 z-50 animate-fade-in-up mx-2 sm:mx-4 w-[calc(100%-1rem)] sm:w-auto max-w-full">
                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                onClick={() => {
                                    setCurrentStep(0);
                                    setIsPlaying(false);
                                }}
                                className="p-1.5 sm:p-2 text-blue-300 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                                title="Restart"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>

                            <button
                                onClick={() =>
                                    setCurrentStep((s) => {
                                        const newStep = Math.max(s - 1, 0);
                                        setIsPlaying(false);
                                        return newStep;
                                    })
                                }
                                className="p-1.5 sm:p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                                title="Previous"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white text-blue-600 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                            >
                                {isPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>

                            <button
                                onClick={() =>
                                    setCurrentStep((s) => {
                                        const newStep = Math.min(s + 1, steps.length - 1);
                                        setIsPlaying(false);
                                        return newStep;
                                    })
                                }
                                className="p-1.5 sm:p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                                title="Next"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <button
                                onClick={() => {
                                    setCurrentStep(steps.length - 1);
                                    setIsPlaying(false);
                                }}
                                className="p-1.5 sm:p-2 text-blue-300 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                                title="End"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-[1px] h-6 md:h-8 bg-white/20"></div>

                        {/* Speed Controls */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-[10px] sm:text-xs font-bold text-blue-300 uppercase tracking-widest hidden md:inline">
                                {t('speed')}
                            </span>
                            <div className="flex bg-white/10 rounded-lg p-0.5 sm:p-1">
                                {[1000, 500, 200, 50].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSpeed(s)}
                                        className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold transition-all ${speed === s
                                            ? 'bg-white text-blue-900 shadow-md'
                                            : 'text-blue-300 hover:text-white'
                                            }`}
                                    >
                                        {s === 1000 ? '1x' : s === 500 ? '2x' : s === 200 ? '4x' : 'MAX'}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setSpeed('AI')}
                                    className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold transition-all ${speed === 'AI'
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                                        : 'text-blue-300 hover:text-white'
                                        }`}
                                >
                                    AI
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-[1px] h-6 md:h-8 bg-white/20"></div>

                        {/* Step Counter */}
                        <span className="text-[10px] sm:text-xs md:text-sm font-mono text-blue-200 min-w-[50px] sm:min-w-[60px] md:min-w-[80px] text-center">
                            {currentStep + 1} / <span className="text-white">{steps.length}</span>
                        </span>
                    </div>
                )}
            </main>

            {/* Spacer for fixed bottom bar */}
            <div className="h-24 sm:h-32 md:h-40"></div>

            {/* Algorithm Info Sidebar */}
            <AlgorithmSidebar
                onSelectAlgorithm={(algoKey) => {
                    setSelectedInfoAlgo(algoKey);
                    setInfoPanelOpen(true);
                }}
            />

            {/* Algorithm Info Panel */}
            <AlgorithmInfoPanel
                isOpen={infoPanelOpen}
                onClose={() => setInfoPanelOpen(false)}
                selectedAlgorithm={selectedInfoAlgo}
            />
        </div>
    );
}

export default App;
