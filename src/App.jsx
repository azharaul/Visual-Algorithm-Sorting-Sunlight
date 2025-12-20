import { useState, useEffect } from "react";
import { generateSelectionSortSteps } from "./algorithms/selectionSortSteps";
import { generateQuickSortSteps } from "./algorithms/quickSortSteps";
import { generateHeapSortSteps } from "./algorithms/heapSortSteps";
import InputPanel from "./components/InputPanel";
import Visualizer from "./components/Visualizer";
import StepsLog from "./components/StepsLog";

function App() {
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [layout, setLayout] = useState("bar");
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500); // milliseconds
    const [algorithm, setAlgorithm] = useState("selection");

    const handleRun = (array, selectedLayout) => {
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
    };

    useEffect(() => {
        let interval;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => {
                setCurrentStep((prev) => prev + 1);
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, steps.length, speed]);

    const step = steps[currentStep];

    return (
        <div className="min-h-screen p-8 flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-purple-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Sorting Visualizer
            </h1>

            <div className="w-full max-w-5xl">
                <div className="mb-8 flex justify-center items-center gap-4">
                    <label className="text-lg font-medium text-blue-200">
                        Algorithm:
                    </label>
                    <div className="relative z-20">
                         <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-6 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all cursor-pointer hover:bg-white/20 appearance-none min-w-[200px]"
                        >
                            <option value="selection" className="bg-slate-800">Selection Sort</option>
                            <option value="quick" className="bg-slate-800">Quick Sort</option>
                            <option value="heap" className="bg-slate-800">Heap Sort</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <InputPanel onRun={handleRun} />

                <Visualizer step={step} layout={layout} />

                {step && <StepsLog message={step.message} />}

                {steps.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-full flex items-center gap-6 z-50 animate-fade-in-up">
                        <div className="flex items-center gap-2">
                             <button
                                onClick={() => {
                                    setCurrentStep(0);
                                    setIsPlaying(false);
                                }}
                                className="p-2 text-blue-300 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                                title="Restart"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                                title="Previous"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                            >
                                {isPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pl-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>

                             <button
                                onClick={() =>
                                    setCurrentStep((s) => {
                                        const newStep = Math.min(
                                            s + 1,
                                            steps.length - 1
                                        );
                                        setIsPlaying(false);
                                        return newStep;
                                    })
                                }
                                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                                title="Next"
                            >
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <button
                                onClick={() => {
                                    setCurrentStep(steps.length - 1);
                                    setIsPlaying(false);
                                }}
                                className="p-2 text-blue-300 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                                title="End"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-[1px] h-8 bg-white/20"></div>

                        <div className="flex items-center gap-2">
                             <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Speed</span>
                             <div className="flex bg-white/10 rounded-lg p-1">
                                {[1000, 500, 200, 50].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSpeed(s)}
                                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${speed === s ? 'bg-white text-blue-900 shadow-md' : 'text-blue-300 hover:text-white'}`}
                                    >
                                        {s === 1000 ? '1x' : s === 500 ? '2x' : s === 200 ? '4x' : 'MAX'}
                                    </button>
                                ))}
                             </div>
                        </div>

                        <div className="w-[1px] h-8 bg-white/20"></div>

                        <span className="text-sm font-mono text-blue-200 min-w-[80px] text-center">
                             {currentStep + 1} / <span className="text-white">{steps.length}</span>
                        </span>
                    </div>
                )}
            </div>
            
            {/* Steps Padding for fixed bottom bar */}
            <div className="h-32"></div>
        </div>
    );
}

export default App;
