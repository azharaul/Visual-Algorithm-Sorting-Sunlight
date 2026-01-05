import React from 'react';

export default function BarView({ normalizedArray, maxValue, transitionStyle, getItemProps }) {
    return (
        <div className="relative w-full h-full flex items-end px-4 pb-8">
            {normalizedArray.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">No data</div>
            ) : (
                normalizedArray.map((item, index) => {
                    const { colorClass, scaleClass, zIndex } = getItemProps(index);
                    const heightPercentage = Math.max((item.value / maxValue) * 100, 5); // Min 5% height
                    const widthPercentage = 100 / normalizedArray.length;

                    return (
                        <div
                            key={item.id}
                            className={`absolute bottom-0 flex flex-col justify-end items-center`}
                            style={{
                                left: `${index * widthPercentage}%`,
                                width: `${widthPercentage}%`,
                                height: `${heightPercentage}%`,
                                ...transitionStyle,
                                padding: '0 2px',
                                zIndex: zIndex
                            }}
                        >
                            <div
                                className={`w-full h-full rounded-t-lg ${colorClass} ${scaleClass} transition-colors duration-200`}
                            />
                            {normalizedArray.length < 25 && (
                                <span className="absolute -top-6 text-xs text-white/80 font-mono font-bold">
                                    {item.value}
                                </span>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}
