import React from 'react';
import { useTimer } from '../context/TimerContext';

export const Timer = () => {
    const { timeLeft, isActive, startTimer, pauseTimer, resetTimer, sessionCount, efficiency } = useTimer();

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex-[0.4] min-h-[300px] p-6 flex flex-col relative group">
            <div className="absolute top-4 right-4 opacity-50">
                <span className="material-symbols-outlined text-grid-border">schedule</span>
            </div>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-6">Focus Timer</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-7xl font-bold text-white font-mono tracking-tighter mb-2">
                    {formatTime(timeLeft)}
                </div>
                <div className="text-amber-accent/80 text-sm uppercase tracking-[0.2em] mb-8">
                    {isActive ? 'Focus Active' : 'Focus Cycle'}
                </div>
                <div className="flex items-center gap-4 w-full px-8">
                    <button 
                        onClick={resetTimer}
                        className="flex-1 h-12 border border-grid-border hover:border-amber-accent hover:bg-amber-accent/5 text-slate-400 hover:text-white transition-all flex items-center justify-center uppercase text-xs font-bold tracking-wider cursor-pointer"
                    >
                        Reset
                    </button>
                    <button 
                        onClick={isActive ? pauseTimer : startTimer}
                        className="flex-1 h-12 bg-amber-accent text-obsidian hover:bg-amber-400 transition-all flex items-center justify-center uppercase text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                    >
                        {isActive ? 'Pause' : 'Start'}
                    </button>
                </div>
            </div>
            <div className="mt-auto pt-4 border-t border-dashed border-grid-border flex justify-between text-xs text-slate-500 font-mono">
                <span>SESSION: {sessionCount}/8</span>
                <span>EFFICIENCY: {efficiency}%</span>
            </div>
        </div>
    );
};