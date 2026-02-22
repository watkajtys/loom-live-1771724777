import React, { useRef, useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';
import { SoundNode } from './SoundNode';

export const Mixer = () => {
    const { nodes, updateNodePosition } = useSound();
    const mixerRef = useRef<HTMLDivElement>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);

    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setDraggingId(id);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (draggingId && mixerRef.current) {
            const rect = mixerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Clamp to 0-100
            const clampedX = Math.max(0, Math.min(100, x));
            const clampedY = Math.max(0, Math.min(100, y));

            updateNodePosition(draggingId, clampedX, clampedY);
        }
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    useEffect(() => {
        if (draggingId) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingId]);

    return (
        <section className="relative bg-obsidian flex flex-col h-full overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-10">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Soundscape Mixer</h2>
                    <div className="flex items-center gap-2 text-amber-accent/80">
                        <span className="material-symbols-outlined text-[16px]">waves</span>
                        <span className="text-xs uppercase tracking-wider font-mono">Audio Engine: Active</span>
                    </div>
                </div>
                <div className="pointer-events-auto bg-obsidian-light border border-grid-border flex items-center gap-4 px-4 py-2 hover:border-slate-500 transition-colors cursor-pointer">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Preset</span>
                        <span className="text-white text-sm font-medium">Deep Flow</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                </div>
            </div>

            {/* Main Interaction Area */}
            <div ref={mixerRef} className="absolute inset-0 z-0 overflow-hidden cursor-crosshair">
                {/* Grid Background */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(#1f1f23 1px, transparent 1px), 
                                      linear-gradient(90deg, #1f1f23 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }}></div>

                {/* Central Listener Visualization */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                     {/* Dashed outer boundary */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] border border-dashed border-grid-border rounded-full opacity-30"></div>
                    {/* Inner boundary */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] border border-grid-border rounded-full opacity-50"></div>
                    {/* Core boundary */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[200px] border border-amber-accent/20 rounded-full"></div>
                    
                    {/* Headphone Icon */}
                    <div className="relative z-10 size-16 bg-obsidian border-2 border-amber-accent flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-full">
                        <span className="material-symbols-outlined text-white text-3xl">headphones</span>
                    </div>

                    {/* Radar Sweep Animation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full overflow-hidden opacity-10 pointer-events-none">
                         <div className="w-1/2 h-1/2 bg-gradient-to-br from-transparent to-amber-accent absolute top-0 left-0 origin-bottom-right animate-[spin_4s_linear_infinite]"></div>
                    </div>
                </div>

                {/* Nodes */}
                {nodes.map(node => (
                    <SoundNode 
                        key={node.id} 
                        node={node} 
                        onMouseDown={handleMouseDown} 
                    />
                ))}
            </div>
        </section>
    );
};