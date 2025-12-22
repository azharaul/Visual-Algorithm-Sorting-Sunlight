import React, { useState, useEffect, useRef } from 'react';

export default function SunlightGame({ onClose }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [rays, setRays] = useState([]); // Now contains type: 'sun' | 'meteor' | 'health'
    const [gameState, setGameState] = useState('playing'); // playing, finished, leaderboard
    const [leaderboard, setLeaderboard] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const canvasRef = useRef(null);
    const basketRef = useRef({ x: 50, width: 15 });

    // Constants
    const RAY_SPEED = 0.6;
    const METEOR_SPEED = 0.8;

    // Load Leaderboard on mount
    useEffect(() => {
        const saved = localStorage.getItem('sunlight_leaderboard');
        if (saved) {
            setLeaderboard(JSON.parse(saved));
        }
    }, []);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'playing') return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    setGameState('finished');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const gameLoop = setInterval(() => {
            setRays((currentRays) => {
                const newRays = currentRays
                    .map(ray => ({
                        ...ray,
                        y: ray.y + (ray.type === 'meteor' ? METEOR_SPEED : RAY_SPEED) + (ray.speed || 0)
                    }))
                    .filter(ray => {
                        // Check collision
                        const caught = ray.y > 90 && ray.y < 95 &&
                            Math.abs(ray.x - basketRef.current.x) < (basketRef.current.width / 2 + 2);

                        if (caught && !ray.caught) {
                            if (ray.type === 'sun') setScore(s => s + 10);
                            if (ray.type === 'meteor') setScore(s => Math.max(0, s - 50)); // Penalty
                            if (ray.type === 'special') setScore(s => s + 50);
                            return false; // Remove
                        }
                        return ray.y < 105; // Remove if off screen
                    });

                // Spawn logic
                if (Math.random() < 0.08) {
                    const rand = Math.random();
                    let type = 'sun';
                    if (rand > 0.7) type = 'meteor'; // 30% chance of meteor
                    if (rand > 0.95) type = 'special'; // 5% chance of special

                    newRays.push({
                        id: Date.now() + Math.random(),
                        x: Math.random() * 90 + 5,
                        y: -5,
                        type,
                        speed: Math.random() * 0.3
                    });
                }
                return newRays;
            });
        }, 16);

        return () => {
            clearInterval(interval);
            clearInterval(gameLoop);
        };
    }, [gameState]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        basketRef.current.x = Math.max(7.5, Math.min(92.5, x));
        const basketElem = document.getElementById('basket');
        if (basketElem) basketElem.style.left = `${basketRef.current.x}%`;
    };

    const saveScore = () => {
        if (!playerName.trim()) return;
        const newLeaderboard = [...leaderboard, { name: playerName, score, date: new Date().toLocaleDateString() }]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5); // Keep top 5

        setLeaderboard(newLeaderboard);
        localStorage.setItem('sunlight_leaderboard', JSON.stringify(newLeaderboard));
        setGameState('leaderboard');
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in-up font-display">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {gameState === 'playing' ? (
                <>
                    <div className="mb-4 flex gap-8 text-2xl font-bold font-mono">
                        <div className="text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]">Score: {score}</div>
                        <div className={`${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-blue-300'}`}>Time: {timeLeft}s</div>
                    </div>

                    <div
                        className="relative w-full max-w-2xl h-[60vh] bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden cursor-none shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        onMouseMove={handleMouseMove}
                    >
                        {/* Rays */}
                        {rays.map(ray => (
                            <div
                                key={ray.id}
                                className={`absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center
                                    ${ray.type === 'sun' ? 'w-6 h-6 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]' :
                                        ray.type === 'meteor' ? 'w-8 h-8 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-spin' :
                                            'w-8 h-8 bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-pulse'}`}
                                style={{ left: `${ray.x}%`, top: `${ray.y}%` }}
                            >
                                {ray.type === 'meteor' && '☄️'}
                                {ray.type === 'special' && '💎'}
                            </div>
                        ))}

                        {/* Basket */}
                        <div
                            id="basket"
                            className="absolute bottom-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                            style={{
                                width: `${basketRef.current.width}%`,
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}
                        >
                            <div className="absolute inset-0 bg-white/30 rounded-full blur-[1px]"></div>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-500 text-sm">Avoid Meteors (☄️) • Catch Suns (🟡) • Grab Gems (💎)</p>
                </>
            ) : gameState === 'finished' ? (
                <div className="text-center animate-bounce-subtle p-8 bg-slate-800/50 rounded-2xl border border-white/10">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">Time's Up!</h2>
                    <p className="text-6xl font-bold text-white mb-8 drop-shadow-lg">{score}</p>

                    <div className="flex flex-col gap-4 w-64 mx-auto mb-6">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            maxLength={10}
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-center text-white focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <button
                            onClick={saveScore}
                            disabled={!playerName.trim()}
                            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                        >
                            Save Score
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center w-full max-w-md animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mb-8">🏆 Leaderboard</h2>

                    <div className="bg-slate-800/60 rounded-2xl border border-white/10 overflow-hidden mb-8">
                        {leaderboard.length === 0 ? (
                            <div className="p-8 text-slate-400">No scores yet. Be the first!</div>
                        ) : (
                            leaderboard.map((entry, i) => (
                                <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <span className={`font-mono font-bold text-xl w-6 ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-slate-600'}`}>
                                            #{i + 1}
                                        </span>
                                        <span className="font-bold text-white">{entry.name}</span>
                                    </div>
                                    <span className="font-mono text-yellow-500 font-bold">{entry.score}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => {
                                setScore(0);
                                setTimeLeft(30);
                                setRays([]);
                                setGameState('playing');
                            }}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all border border-white/10 hover:scale-105"
                        >
                            Play Again
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
