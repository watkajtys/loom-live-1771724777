import React from 'react';

export const TaskList = () => {
    return (
        <div className="flex-[0.6] p-0 flex flex-col overflow-hidden bg-obsidian">
            <div className="p-6 border-b border-grid-border flex items-center justify-between bg-obsidian-light/50">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Active Tasks</h3>
                <button className="text-amber-accent hover:text-amber-300 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                <div className="p-4 border-l-2 border-amber-accent bg-obsidian-light/30 hover:bg-obsidian-light/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-white text-sm font-medium">Finalize spatial audio logic</span>
                        <span className="text-[10px] text-amber-accent font-mono border border-amber-accent/30 px-1.5 py-0.5">DEV</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">Implement 3D panning for cafe ambience node based on radial distance.</p>
                </div>
                <div className="p-4 border-l-2 border-grid-border hover:border-slate-500 bg-obsidian-lighter/10 hover:bg-obsidian-light/30 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-300 text-sm">Update user documentation</span>
                        <span className="text-[10px] text-slate-600 font-mono border border-slate-700 px-1.5 py-0.5">DOCS</span>
                    </div>
                </div>
                <div className="p-4 border-l-2 border-grid-border hover:border-slate-500 bg-obsidian-lighter/10 hover:bg-obsidian-light/30 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-300 text-sm">Review Q3 design mockups</span>
                        <span className="text-[10px] text-slate-600 font-mono border border-slate-700 px-1.5 py-0.5">DSGN</span>
                    </div>
                </div>
                <div className="p-4 border-l-2 border-transparent opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-400 text-sm line-through">Email client timeline</span>
                        <span className="material-symbols-outlined text-green-500 text-[14px]">check</span>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-grid-border bg-obsidian-light">
                <input 
                    className="w-full bg-obsidian border border-grid-border text-sm text-white px-3 py-2 focus:ring-1 focus:ring-amber-accent focus:border-amber-accent placeholder-slate-600 outline-none" 
                    placeholder="Add new task..." 
                    type="text"
                />
            </div>
        </div>
    );
};