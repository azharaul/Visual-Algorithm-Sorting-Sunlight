import { useState, useEffect, useRef } from 'react';

export default function Visualizer({ step, layout, speed = 1 }) {
    if (!step) return null;

    const { array, i = -1, j = -1, minIndex = -1, pivotIndex = -1, largest = -1 } = step;
    if (!array) {
        return <div className="text-white">Waiting for data...</div>;
    }
    const maxValue = Math.max(...array);
    const barHeight = 250;
    const graphHeight = 300;

    // ✅ ADAPTIVE SIZING
    const isLargeArray = array.length > 15;
    const itemSpacing = isLargeArray ? 60 : 100;
    const maxBubbleRadius = isLargeArray ? 20 : 35;
    const minBubbleRadius = isLargeArray ? 14 : 12;

    // ✅ PADDING LEBIH BESAR DI KANAN & KIRI
    // ✅ PADDING LEBIH BESAR DI KANAN & KIRI
    const graphWidth = Math.max(800, array.length * itemSpacing);
    const xStart = 150;
    const yStart = 380;
    const rightPadding = 100;

    // ✅ VIEWBOX LEBIH LEBAR + PADDING EKSTRA
    const svgViewBoxWidth = xStart + graphWidth + rightPadding + 50;
    const svgViewBoxHeight = 500;

    const duration = speed === 1 ? 600 : speed === 2 ? 400 : speed === 4 ? 250 : 150;

    const [displayData, setDisplayData] = useState({
        values: array,
        positions: array.map((_, idx) => ({
            x: xStart + (idx / (array.length - 1 || 1)) * graphWidth,
            y: yStart - (array[idx] / maxValue) * graphHeight,
            radius: Math.max(minBubbleRadius, (array[idx] / maxValue) * maxBubbleRadius)
        }))
    });

    const [arrayPositions, setArrayPositions] = useState(
        array.map((_, idx) => ({ index: idx, value: array[idx] }))
    );
    const [prevArrayPositions, setPrevArrayPositions] = useState(
        array.map((_, idx) => ({ index: idx, value: array[idx] }))
    );

    const rafRef = useRef(0);
    const prevArrayRef = useRef(array);
    const animationStartRef = useRef(0);
    const arrayAnimationStartRef = useRef(0);

    // GRAPH ANIMATION
    useEffect(() => {
        if (layout !== 'graph') return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        // Handle array size change - Reset immediately
        if (array.length !== displayData.values.length) {
            const finalPositions = array.map((val, idx) => ({
                x: xStart + (idx / (array.length - 1 || 1)) * graphWidth,
                y: yStart - (val / maxValue) * graphHeight,
                radius: Math.max(minBubbleRadius, (val / maxValue) * maxBubbleRadius)
            }));
            setDisplayData({ values: array, positions: finalPositions });
            prevArrayRef.current = array.slice();
            return;
        }

        animationStartRef.current = Date.now();

        const animate = () => {
            const elapsed = Date.now() - animationStartRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

            const newValues = array.map((targetVal, idx) => {
                const prevVal = prevArrayRef.current[idx] !== undefined ? prevArrayRef.current[idx] : targetVal;
                return prevVal + (targetVal - prevVal) * ease;
            });

            const newPositions = array.map((targetVal, idx) => {
                const prevPos = displayData.positions[idx];
                // Guard against undefined prevPos if logic slips through (though length check should catch it)
                if (!prevPos) return {
                    x: xStart + (idx / (array.length - 1 || 1)) * graphWidth,
                    y: yStart - (targetVal / maxValue) * graphHeight,
                    radius: Math.max(minBubbleRadius, (targetVal / maxValue) * maxBubbleRadius)
                };

                const targetY = yStart - (targetVal / maxValue) * graphHeight;
                const targetRadius = Math.max(minBubbleRadius, (targetVal / maxValue) * maxBubbleRadius);
                return {
                    x: xStart + (idx / (array.length - 1 || 1)) * graphWidth,
                    y: prevPos.y + (targetY - prevPos.y) * ease,
                    radius: prevPos.radius + (targetRadius - prevPos.radius) * ease
                };
            });

            setDisplayData({ values: newValues, positions: newPositions });

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                const finalPositions = array.map((val, idx) => ({
                    x: xStart + (idx / (array.length - 1 || 1)) * graphWidth,
                    y: yStart - (val / maxValue) * graphHeight,
                    radius: Math.max(minBubbleRadius, (val / maxValue) * maxBubbleRadius)
                }));
                setDisplayData({ values: array, positions: finalPositions });
                prevArrayRef.current = array.slice();
            }
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [array, layout, speed, duration, maxValue, graphWidth, xStart, yStart]);

    // ARRAY VIEW ANIMATION
    useEffect(() => {
        if (layout !== 'array') return;
        const newPositions = array.map((_, idx) => ({ index: idx, value: array[idx] }));
        setPrevArrayPositions(arrayPositions);
        setArrayPositions(newPositions);
        arrayAnimationStartRef.current = Date.now();
    }, [array, layout]);

    // Animated Array Card
    const AnimatedArrayCard = ({ itemData, visualIndex }) => {
        const [animProgress, setAnimProgress] = useState(0);

        useEffect(() => {
            if (layout !== 'array') return;
            arrayAnimationStartRef.current = Date.now();
            let rafId = 0;
            const animate = () => {
                const elapsed = Date.now() - arrayAnimationStartRef.current;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
                setAnimProgress(easeProgress);
                if (progress < 1) rafId = requestAnimationFrame(animate);
            };
            rafId = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(rafId);
        }, [itemData]);

        let border = "border-white/20 bg-white/5", textColor = "text-white", glow = "";
        const itemIndex = itemData.index;

        if (itemIndex === minIndex || itemIndex === largest) {
            border = "border-yellow-400 bg-yellow-500/20"; textColor = "text-yellow-300"; glow = "shadow-[0_0_15px_rgba(250,204,21,0.3)]";
        } else if (itemIndex === i) {
            border = "border-emerald-500 bg-emerald-500/20"; textColor = "text-emerald-300"; glow = "shadow-[0_0_15px_rgba(52,211,153,0.3)]";
        } else if (itemIndex === j || itemIndex === pivotIndex) {
            border = "border-rose-500 bg-rose-500/20"; textColor = "text-rose-300"; glow = "shadow-[0_0_15px_rgba(251,113,133,0.3)]";
        }

        return (
            <div className={`border-2 ${border} ${textColor} ${glow} px-3 md:px-5 py-2 md:py-4 rounded-xl text-base md:text-xl font-bold backdrop-blur-sm ease-in-out hover:scale-110 cursor-default text-sm md:text-base transition-all duration-${duration}`}
                style={{ transform: `scale(${0.95 + animProgress * 0.05})`, opacity: 0.7 + animProgress * 0.3 }}>
                {itemData.value}
            </div>
        );
    };

    const durationClass = `duration-${speed === 1 ? '300' : speed === 2 ? '200' : speed === 4 ? '150' : '100'}`;

    return (
        <div className="glass p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden w-full">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-500/5 pointer-events-none" />

            {/* BAR MODE */}
            {layout === "bar" ? (
                <div className="flex items-end gap-1 md:gap-2 justify-center h-48 md:h-64 lg:h-80 relative z-10 px-2 md:px-4 overflow-x-auto md:overflow-x-visible">
                    {array.map((value, index) => {
                        let color = "bg-gradient-to-t from-blue-500 to-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]";
                        let scale = "scale-100";
                        if (index === minIndex || index === largest) {
                            color = "bg-gradient-to-t from-yellow-500 to-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]"; scale = "scale-110";
                        } else if (index === i) {
                            color = "bg-gradient-to-t from-emerald-500 to-green-300 shadow-[0_0_20px_rgba(16,185,129,0.6)]";
                        } else if (index === j || index === pivotIndex) {
                            color = "bg-gradient-to-t from-rose-500 to-pink-300 shadow-[0_0_20px_rgba(244,63,94,0.6)]";
                        }
                        const proportionalHeight = (value / maxValue) * barHeight;
                        return (
                            <div key={index} className={`${color} ${scale} w-8 md:w-10 flex items-end justify-center text-white text-xs font-bold rounded-t-lg ${durationClass} ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:brightness-110 flex-shrink-0`}
                                style={{ height: `${proportionalHeight}px`, minHeight: '24px' }}>
                                <span className="mb-1 md:mb-2 drop-shadow-md text-xs">{value}</span>
                            </div>
                        );
                    })}
                </div>
            ) : layout === "graph" ? (
                <div className="overflow-x-auto w-full flex justify-center">
                    <svg
                        className="h-48 md:h-64 lg:h-80"
                        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ minWidth: '100%', width: array.length > 15 ? 'max-content' : '100%' }}
                    >
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>

                        {/* Grid */}
                        <g opacity="0.05">
                            {Array.from({ length: Math.ceil(graphWidth / 80) + 1 }).map((_, i) => (
                                <line key={`v-${i}`} x1={xStart + i * 80} y1={yStart - graphHeight} x2={xStart + i * 80} y2={yStart} stroke="white" strokeWidth="1" />
                            ))}
                            {Array.from({ length: 5 }).map((_, i) => (
                                <line key={`h-${i}`} x1={xStart} y1={yStart - i * (graphHeight / 4)} x2={xStart + graphWidth} y2={yStart - i * (graphHeight / 4)} stroke="white" strokeWidth="1" />
                            ))}
                        </g>

                        {/* Axes */}
                        <line x1={xStart} y1={yStart - graphHeight} x2={xStart} y2={yStart} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                        <line x1={xStart} y1={yStart} x2={xStart + graphWidth} y2={yStart} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

                        {/* Y-axis labels */}
                        {Array.from({ length: 5 }).map((_, i) => {
                            const value = maxValue * i / 4;
                            const yPos = yStart - i * (graphHeight / 4);
                            return (
                                <g key={`y-${i}`}>
                                    <line x1={xStart - 5} y1={yPos} x2={xStart} y2={yPos} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                                    <text x={xStart - 10} y={yPos} textAnchor="end" dy="0.3em" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">
                                        {Math.round(value)}
                                    </text>
                                </g>
                            );
                        })}

                        {/* X-axis labels - ADAPTIVE */}
                        {array.map((_, index) => {
                            const xPos = xStart + (index / (array.length - 1 || 1)) * graphWidth;
                            const shouldShowLabel = array.length <= 15 || index % Math.ceil(array.length / 15) === 0;
                            return (
                                <g key={`x-${index}`}>
                                    <line x1={xPos} y1={yStart} x2={xPos} y2={yStart + 5} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                                    {shouldShowLabel && (
                                        <text x={xPos} y={yStart + 20} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">
                                            {index}
                                        </text>
                                    )}
                                </g>
                            );
                        })}

                        {/* Bubbles */}
                        {displayData.values.map((value, index) => {
                            const { x, y, radius } = displayData.positions[index];
                            let fillColor = "#0ea5e9", glowColor = "#0ea5e9";
                            if (index === minIndex || index === largest) { fillColor = "#eab308"; glowColor = "#eab308"; }
                            else if (index === i) { fillColor = "#10b981"; glowColor = "#10b981"; }
                            else if (index === j || index === pivotIndex) { fillColor = "#f43f5e"; glowColor = "#f43f5e"; }

                            const elements = [];
                            if (index < displayData.values.length - 1) {
                                const nextPos = displayData.positions[index + 1];
                                elements.push(
                                    <line
                                        key={`line-${index}`}
                                        x1={x} y1={y}
                                        x2={nextPos.x} y2={nextPos.y}
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                    />
                                );
                            }

                            elements.push(
                                <g key={`bubble-${index}`} filter="url(#softGlow)">
                                    <circle cx={x} cy={y} r={radius + 8} fill={glowColor} opacity="0.15" />
                                    <circle cx={x} cy={y} r={radius} fill={fillColor} opacity="0.9" />
                                    <circle cx={x} cy={y} r={radius} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                                    <text x={x} y={y} textAnchor="middle" dy="0.3em" fill="white" fontSize={radius > 18 ? "16" : radius > 14 ? "12" : "10"} fontWeight="bold">
                                        {Math.round(value)}
                                    </text>
                                    {array.length <= 15 && (
                                        <text x={x} y={y + radius + 18} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontWeight="500">
                                            [{index}]
                                        </text>
                                    )}
                                </g>
                            );

                            return elements;
                        })}
                    </svg>
                </div>
            ) : (
                /* ARRAY MODE */
                <div className="flex gap-2 md:gap-4 justify-center mt-4 md:mt-6 flex-wrap relative z-10 px-2">
                    {arrayPositions.map((item, visIdx) => (
                        <AnimatedArrayCard key={`${item.index}-${visIdx}`} itemData={item} visualIndex={visIdx} />
                    ))}
                </div>
            )}
        </div>
    );
}
