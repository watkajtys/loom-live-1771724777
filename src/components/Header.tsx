import React from 'react';

export const Header = () => {
  return (
    <header className="h-16 border-b border-grid-border flex items-center justify-between px-6 bg-obsidian-light/50 backdrop-blur-sm z-50 fixed top-0 w-full">
        <div className="flex items-center gap-4">
            <div className="size-8 bg-amber-accent/10 border border-amber-accent flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-accent text-[20px]">graphic_eq</span>
            </div>
            <div className="flex flex-col">
                <h1 className="text-white font-bold tracking-tight text-lg leading-none">AuraSpace</h1>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Modular OS v3.0</span>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-obsidian-lighter border border-grid-border rounded-sm">
                <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-mono text-slate-400">SYS.ONLINE</span>
            </div>
            <div className="flex gap-2">
                <button className="size-9 hover:bg-white/5 border border-transparent hover:border-grid-border flex items-center justify-center transition-all text-slate-400 hover:text-white cursor-pointer rounded-sm">
                    <span className="material-symbols-outlined text-[20px]">account_circle</span>
                </button>
                <button className="size-9 hover:bg-white/5 border border-transparent hover:border-grid-border flex items-center justify-center transition-all text-slate-400 hover:text-white cursor-pointer rounded-sm">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                </button>
            </div>
        </div>
    </header>
  );
};