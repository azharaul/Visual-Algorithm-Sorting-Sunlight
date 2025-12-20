export default function StepsLog({ message }) {
    return (
        <div className="mt-8 glass p-4 rounded-xl border border-white/10 flex items-center gap-4 animate-fade-in-up">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="flex-1">
                <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-0.5">Current Operation</p>
                <p className="text-lg text-white font-medium">{message}</p>
            </div>
        </div>
    );
}
