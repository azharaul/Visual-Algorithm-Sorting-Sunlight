export default function Visualizer({ step, layout }) {
    if (!step) return null;

    const { array, i, j, minIndex, pivotIndex, largest } = step;

    return (
        <div className="glass p-8 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Background Mesh (Subtle) */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-500/5 pointer-events-none" />

            {/* BAR MODE */}
            {layout === "bar" ? (
                <div className="flex items-end gap-2 justify-center h-80 relative z-10 px-4">
                    {array.map((value, index) => {
                        let color = "bg-gradient-to-t from-blue-500 to-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]";
                        let scale = "scale-100";

                        if (index === minIndex || index === largest) {
                             color = "bg-gradient-to-t from-yellow-500 to-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]";
                             scale = "scale-110";
                        }
                        else if (index === i) {
                             color = "bg-gradient-to-t from-emerald-500 to-green-300 shadow-[0_0_20px_rgba(16,185,129,0.6)]";
                        }
                        else if (index === j || index === pivotIndex) {
                             color = "bg-gradient-to-t from-rose-500 to-pink-300 shadow-[0_0_20px_rgba(244,63,94,0.6)]";
                        }

                        return (
                            <div
                                key={index}
                                className={`${color} ${scale} w-10 flex items-end justify-center text-white text-xs font-bold rounded-t-lg transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:brightness-110`}
                                style={{ height: `${value * 8}px`, minHeight: '30px' }}
                            >
                                <span className="mb-2 drop-shadow-md">{value}</span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* ARRAY MODE */
                <div className="flex gap-4 justify-center mt-6 flex-wrap relative z-10">
                    {array.map((value, index) => {
                        let border = "border-white/20 bg-white/5";
                        let textColor = "text-white";
                        let glow = "";

                        if (index === minIndex || index === largest) {
                            border = "border-yellow-400 bg-yellow-500/20";
                            textColor = "text-yellow-300";
                            glow = "shadow-[0_0_15px_rgba(250,204,21,0.3)]";
                        } else if (index === i) {
                            border = "border-emerald-500 bg-emerald-500/20";
                            textColor = "text-emerald-300";
                            glow = "shadow-[0_0_15px_rgba(52,211,153,0.3)]";
                        } else if (index === j || index === pivotIndex) {
                            border = "border-rose-500 bg-rose-500/20";
                            textColor = "text-rose-300";
                            glow = "shadow-[0_0_15px_rgba(251,113,133,0.3)]";
                        }

                        return (
                            <div
                                key={index}
                                className={`border-2 ${border} ${textColor} ${glow} px-5 py-4 rounded-xl text-xl font-bold backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 cursor-default`}
                            >
                                {value}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
