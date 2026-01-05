import React from 'react';

export default function GraphView({ normalizedArray, maxValue, graphHeight, graphWidth, xStart, yStart, minBubbleRadius, maxBubbleRadius, svgViewBoxWidth, svgViewBoxHeight, transitionStyle, getItemProps }) {
    return (
        <div className="overflow-x-auto w-full flex justify-center h-full">
            <svg
                className="h-full"
                viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ minWidth: '100%', width: normalizedArray.length > 15 ? 'max-content' : '100%' }}
            >
                <defs>
                    <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Static Grid & Axis */}
                <g opacity="0.05">
                    {Array.from({ length: Math.ceil(graphWidth / 80) + 1 }).map((_, i) => (
                        <line key={`v-${i}`} x1={xStart + i * 80} y1={yStart - graphHeight} x2={xStart + i * 80} y2={yStart} stroke="white" strokeWidth="1" />
                    ))}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <line key={`h-${i}`} x1={xStart} y1={yStart - i * (graphHeight / 4)} x2={xStart + graphWidth} y2={yStart - i * (graphHeight / 4)} stroke="white" strokeWidth="1" />
                    ))}
                </g>

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

                {/* X-axis labels (Static positions) */}
                {normalizedArray.map((_, index) => {
                    const xPos = xStart + (index / (normalizedArray.length - 1 || 1)) * graphWidth;
                    const shouldShowLabel = normalizedArray.length <= 15 || index % Math.ceil(normalizedArray.length / 15) === 0;
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

                {/* Connecting Lines */}
                <path
                    d={normalizedArray.map((item, index) => {
                        const x = xStart + (index / (normalizedArray.length - 1 || 1)) * graphWidth;
                        const y = yStart - (item.value / maxValue) * graphHeight;
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'd 0.3s ease' }}
                />

                {/* Animated Bubbles */}
                {normalizedArray.map((item, index) => {
                    const { fillColor, glowColor } = getItemProps(index);

                    // Calculate Target Position
                    const x = xStart + (index / (normalizedArray.length - 1 || 1)) * graphWidth;
                    const y = yStart - (item.value / maxValue) * graphHeight;
                    const radius = Math.max(minBubbleRadius, (item.value / maxValue) * maxBubbleRadius);

                    return (
                        <g
                            key={item.id}
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                                ...transitionStyle,
                            }}
                        >
                            {/* Line to bottom - Opacity transition */}
                            <line
                                x1={0} y1={0}
                                x2={0} y2={yStart - y} // Distance to bottom
                                stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4"
                            />

                            <g filter="url(#softGlow)">
                                <circle cx={0} cy={0} r={radius + 8} fill={glowColor} opacity="0.15" />
                                <circle cx={0} cy={0} r={radius} fill={fillColor} opacity="0.9" />
                                <circle cx={0} cy={0} r={radius} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                                <text x={0} y={0} textAnchor="middle" dy="0.3em" fill="white" fontSize={radius > 18 ? "16" : radius > 14 ? "12" : "10"} fontWeight="bold">
                                    {Math.round(item.value)}
                                </text>
                            </g>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
