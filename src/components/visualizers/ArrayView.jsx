import React, { useState, useEffect } from 'react';

// Animated Array Card Sub-Component (contained within ArrayView for now or separate file)
const AnimatedArrayCard = ({ item, index, widthPercentage, transitionStyle, transitionDuration, getItemProps }) => {
    const { colorClass, scaleClass, zIndex } = getItemProps(index);
    const [animProgress, setAnimProgress] = useState(0);

    // Optional: Keep the internal pulsing effect if desired, or simplified
    useEffect(() => {
        let start = Date.now();
        let rafId;
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / transitionDuration, 1);
            // Simple ease
            const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            setAnimProgress(ease);
            if(progress < 1) rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [item.value, transitionDuration]); // Trigger on value change (swap)

    return (
        <div
            className={`absolute top-0 transition-all ease-in-out`}
            style={{
                left: `${index * widthPercentage}%`,
                width: `${widthPercentage}%`,
                height: '100%',
                ...transitionStyle,
                zIndex
            }}
        >
            <div className="w-full h-full p-1 md:p-2 flex items-center justify-center">
                <div className={`
                    w-full aspect-square max-w-[60px] max-h-[60px] 
                    rounded-xl ${colorClass} ${scaleClass}
                    flex items-center justify-center shadow-lg border border-white/20
                `}
                style={{ transform: `scale(${0.95 + animProgress * 0.05})` }}
                >
                    <span className="text-white font-bold text-sm md:text-xl">{item.value}</span>
                </div>
            </div>
            <div className="text-center mt-2 text-xs text-blue-200/50 font-mono">
                {index}
            </div>
        </div>
    );
};

export default function ArrayView({ normalizedArray, transitionStyle, transitionDuration, getItemProps }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-32">
                {normalizedArray.map((item, index) => {
                    const widthPercentage = 100 / normalizedArray.length;
                    return (
                        <AnimatedArrayCard
                            key={item.id}
                            item={item}
                            index={index}
                            widthPercentage={widthPercentage}
                            transitionStyle={transitionStyle}
                            transitionDuration={transitionDuration}
                            getItemProps={getItemProps}
                        />
                    );
                })}
            </div>
        </div>
    );
}
