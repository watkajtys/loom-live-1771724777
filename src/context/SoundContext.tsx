import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

// Define the shape of a sound node
export interface SoundNode {
  id: string;
  label: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  volume: number; // 0-1
  color: string; // Tailwind color class suffix (e.g. "blue-500")
  src: string; // Audio source URL
}

// Define the context state
interface SoundContextType {
  nodes: SoundNode[];
  isPlaying: boolean;
  togglePlay: () => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  masterVolume: number;
  setMasterVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const calculateVolume = (x: number, y: number) => {
  // Center is (50, 50)
  const dx = x - 50;
  const dy = y - 50;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Max distance from center to corner is roughly 70.7
  // Let's say volume is 1 at center and 0 at distance 50 (radius of "hearing")
  const maxDist = 50;
  // Volume drops off linearly
  const volume = Math.max(0, 1 - (distance / maxDist));
  // Optional: add some curve, e.g., square it for more rapid dropoff
  return volume;
};

// Initial nodes
const initialNodesData = [
  {
    id: 'rain',
    label: 'Rain',
    x: 35,
    y: 30,
    color: 'blue-500',
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-1605.mp3'
  },
  {
    id: 'forest',
    label: 'Forest',
    x: 65,
    y: 60,
    color: 'emerald-500',
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3'
  },
  {
    id: 'cafe',
    label: 'Cafe',
    x: 60,
    y: 25,
    color: 'amber-500',
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-restaurant-crowd-talk-ambience-44.mp3'
  },
  {
    id: 'static',
    label: 'Static',
    x: 40,
    y: 70,
    color: 'slate-400',
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-white-noise-1208.mp3'
  }
];

// Calculate initial volumes
const initialNodes: SoundNode[] = initialNodesData.map(node => ({
  ...node,
  volume: calculateVolume(node.x, node.y)
}));

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<SoundNode[]>(initialNodes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.75);
  const audioElementsRef = useRef<{ [id: string]: HTMLAudioElement }>({});

  // Initialize audio elements
  useEffect(() => {
    // Only initialize if empty
    if (Object.keys(audioElementsRef.current).length === 0) {
        nodes.forEach(node => {
          const audio = new Audio(node.src);
          audio.loop = true;
          // Initial volume
          audio.volume = Math.max(0, Math.min(1, node.volume * masterVolume));
          audioElementsRef.current[node.id] = audio;
        });
    }

    return () => {
       // Cleanup on unmount only if we wanted to destroy context entirely
       // but typically providers are at root.
    };
  }, []); 

  // Handle play/pause
  useEffect(() => {
    Object.values(audioElementsRef.current).forEach(audio => {
      if (isPlaying) {
        // Play needs user interaction first usually, but we'll assume the toggle button provides that
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio play failed (likely autoplay policy):", error);
                // We might want to revert isPlaying state if playback fails
            });
        }
      } else {
        audio.pause();
      }
    });
  }, [isPlaying]);

  // Handle volume updates
  useEffect(() => {
    nodes.forEach(node => {
      const audio = audioElementsRef.current[node.id];
      if (audio) {
        // Ensure volume is valid 0-1
        const newVol = Math.max(0, Math.min(1, node.volume * masterVolume));
        if (isFinite(newVol)) {
            audio.volume = newVol;
        }
      }
    });
  }, [nodes, masterVolume]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const updateNodePosition = (id: string, x: number, y: number) => {
    setNodes(prevNodes => prevNodes.map(node => {
      if (node.id === id) {
        const newVolume = calculateVolume(x, y);
        return { ...node, x, y, volume: newVolume };
      }
      return node;
    }));
  };

  return (
    <SoundContext.Provider value={{ nodes, isPlaying, togglePlay, updateNodePosition, masterVolume, setMasterVolume }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};