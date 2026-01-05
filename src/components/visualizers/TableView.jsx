import React from 'react';

export default function TableView({ normalizedArray, getItemProps }) {
    const ROW_HEIGHT = 64; // Approx height with padding/gap

    return (
        <div className="w-full h-full overflow-y-auto pt-4 relative z-10">
            <div className="relative w-full" style={{ height: `${normalizedArray.length * ROW_HEIGHT + 20}px` }}>
                {normalizedArray.length > 50 ? (
                    <div className="text-center text-white/50 pt-10">List too long to animate in table view</div>
                ) : normalizedArray.map((item, index) => {
                    const { colorClass } = getItemProps(index);
                    return (
                        <div
                            key={item.id}
                            className="absolute left-4 right-4 flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10 transition-all duration-300 ease-in-out"
                            style={{
                                transform: `translateY(${index * ROW_HEIGHT}px)`,
                                height: '56px' // Fixed height for consistency
                            }}
                        >
                            <span className="text-blue-300 font-mono w-8">#{index}</span>
                            <span className="text-white font-bold flex-1 text-center">
                                {item.value}
                                {(item.name || item.label) && <span className="text-xs text-white/50 block font-normal">{item.name || item.label}</span>}
                                {item && typeof item === 'object' && Object.entries(item).map(([key, val]) => {
                                    if (['id', 'value', 'name', 'label'].includes(key)) return null;
                                    return (
                                        <span key={key} className="text-[10px] text-blue-200/40 block font-normal">
                                            {key}: {val}
                                        </span>
                                    );
                                })}
                            </span>
                            <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
