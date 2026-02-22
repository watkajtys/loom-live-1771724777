import React from 'react';
import { useSound } from '../context/SoundContext';

export const ControlBar = () => {
    const { isPlaying, togglePlay, masterVolume, setMasterVolume } = useSound();

    return (
        <div className="absolute bottom-0 w-full bg-obsidian-light/90 border-t border-grid-border h-20 px-8 flex items-center justify-between z-20 backdrop-blur-md">
            <div className="flex items-center gap-6">
                <button className="size-10 rounded-sm hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">skip_previous</span>
                </button>
                <button 
                    onClick={togglePlay}
                    className="size-12 bg-amber-accent text-obsidian flex items-center justify-center hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)] cursor-pointer rounded-sm"
                >
                    <span className="material-symbols-outlined text-[28px] fill-current">
                        {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                </button>
                <button className="size-10 rounded-sm hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">skip_next</span>
                </button>
            </div>
            
            <div className="flex items-center gap-4 w-64 bg-obsidian px-4 py-3 border border-grid-border">
                <button 
                    onClick={() => setMasterVolume(masterVolume === 0 ? 0.75 : 0)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {masterVolume === 0 ? 'volume_off' : 'volume_up'}
                    </span>
                </button>
                
                <div className="flex-1 relative h-2 bg-slate-800 group">
                    <div 
                        className="absolute top-0 left-0 h-full bg-amber-accent pointer-events-none transition-[width] duration-150" 
                        style={{ width: `${masterVolume * 100}%` }}
                    ></div>
                    <input 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="1"
                        value={masterVolume * 100}
                        onChange={(e) => setMasterVolume(Number(e.target.value) / 100)}
                    />
                </div>
                
                <span className="text-xs font-mono text-amber-accent w-8 text-right select-none">
                    {Math.round(masterVolume * 100)}%
                </span>
            </div>
        </div>
    );
};