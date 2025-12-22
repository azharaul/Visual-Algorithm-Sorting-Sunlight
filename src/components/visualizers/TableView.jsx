import React from 'react';

export default function TableView({ normalizedArray, getItemProps }) {
    return (
        <div className="w-full h-full overflow-y-auto pt-4 relative z-10">
            <div className="flex flex-col gap-2 p-4">
                {normalizedArray.length > 50 ? (
                    <div className="text-center text-white/50">List too long to animate in table view</div>
                ) : normalizedArray.map((item, index) => {
                    const { colorClass } = getItemProps(index);
                    return (
                        <div key={item.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10 animate-fade-in">
                            <span className="text-blue-300 font-mono w-8">#{index}</span>
                            <span className="text-white font-bold flex-1 text-center">{item.value}</span>
                            <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
