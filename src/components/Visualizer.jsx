import { useMemo } from 'react';
import BarView from './visualizers/BarView';
import GraphView from './visualizers/GraphView';
import ArrayView from './visualizers/ArrayView';
import TableView from './visualizers/TableView';

export default function Visualizer({ step, layout, speed = 1 }) {
    if (!step) return null;

    const { array, i = -1, j = -1, minIndex = -1, pivotIndex = -1, largest = -1 } = step;

    if (!array || array.length === 0) {
        return <div className="text-white">Waiting for data...</div>;
    }

    // Adapt to data format (handle both objects {value, id} and legacy numbers)
    const normalizedArray = useMemo(() => {
        return array.map((item, idx) => {
            if (typeof item === 'object' && item !== null) {
                return item;
            }
            // Fallback for plain numbers: no animation (jump) because ID changes with index
            return { value: item, id: `legacy-${idx}` };
        });
    }, [array]);

    const maxValue = Math.max(...normalizedArray.map(item => item.value));
    const barHeight = 250;
    const graphHeight = 300;

    // ✅ ADAPTIVE SIZING
    const isLargeArray = normalizedArray.length > 15;
    const itemSpacing = isLargeArray ? 60 : 100;
    const maxBubbleRadius = isLargeArray ? 20 : 35;
    const minBubbleRadius = isLargeArray ? 14 : 12;

    // ✅ PADDING & DIMENSIONS
    const graphWidth = Math.max(800, normalizedArray.length * itemSpacing);
    const xStart = 150;
    const yStart = 380;
    const rightPadding = 100;
    const svgViewBoxWidth = xStart + graphWidth + rightPadding + 50;
    const svgViewBoxHeight = 500;

    // Transition Speed Logic
    // Allow slightly faster transition than the interval to prevent lag
    const transitionDuration = Math.max(50, speed * 0.9);
    
    // CSS Transition String
    const transitionStyle = {
        transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)` // Smooth ease-in-out
    };

    // Helper to determine color state based on INDEX
    const getItemProps = (index) => {
        let colorClass = "from-blue-500 to-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-gradient-to-t";
        let fillColor = "#0ea5e9";
        let glowColor = "#0ea5e9";
        let scaleClass = "scale-100";
        let zIndex = 10;

        // Priority coloring
        if (index === minIndex || index === largest) {
            colorClass = "from-yellow-500 to-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)] bg-gradient-to-t";
            fillColor = "#eab308"; glowColor = "#eab308";
            scaleClass = "scale-110";
            zIndex = 20;
        } else if (index === i) {
            colorClass = "from-emerald-500 to-green-300 shadow-[0_0_20px_rgba(16,185,129,0.6)] bg-gradient-to-t";
            fillColor = "#10b981"; glowColor = "#10b981";
            zIndex = 15;
        } else if (index === j) {
            colorClass = "from-rose-500 to-pink-300 shadow-[0_0_20px_rgba(244,63,94,0.6)] bg-gradient-to-t";
            fillColor = "#f43f5e"; glowColor = "#f43f5e";
            zIndex = 15;
        } else if (index === pivotIndex) {
            colorClass = "from-purple-500 to-indigo-300 shadow-[0_0_20px_rgba(168,85,247,0.6)] bg-gradient-to-t";
            fillColor = "#a855f7"; glowColor = "#a855f7";
            zIndex = 25;
        }

        return { colorClass, fillColor, glowColor, scaleClass, zIndex };
    };

    const durationClass = `duration-${speed === 1 ? '300' : speed === 2 ? '200' : speed === 4 ? '150' : '100'}`;

    return (
        <div className="glass p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden w-full h-[450px] md:h-[550px] flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-500/5 pointer-events-none" />

            {/* Render proper view based on layout */}
            {layout === "bar" && (
                <BarView 
                    normalizedArray={normalizedArray}
                    maxValue={maxValue}
                    barHeight={barHeight}
                    transitionStyle={transitionStyle}
                    transitionDuration={transitionDuration}
                    getItemProps={getItemProps}
                    durationClass={durationClass}
                />
            )}

            {layout === "graph" && (
                <GraphView 
                    normalizedArray={normalizedArray}
                    maxValue={maxValue}
                    graphHeight={graphHeight}
                    graphWidth={graphWidth}
                    xStart={xStart}
                    yStart={yStart}
                    minBubbleRadius={minBubbleRadius}
                    maxBubbleRadius={maxBubbleRadius}
                    svgViewBoxWidth={svgViewBoxWidth}
                    svgViewBoxHeight={svgViewBoxHeight}
                    itemSpacing={itemSpacing}
                    transitionStyle={transitionStyle}
                    getItemProps={getItemProps}
                />
            )}
            
            {layout === "array" && (
                <ArrayView 
                    normalizedArray={normalizedArray}
                    transitionStyle={transitionStyle}
                    transitionDuration={transitionDuration}
                    getItemProps={getItemProps}
                />
            )}

            {layout === "table" && (
                <TableView 
                    normalizedArray={normalizedArray}
                    getItemProps={getItemProps}
                />
            )}

        </div>
    );
}
