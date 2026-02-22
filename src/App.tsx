import React from 'react';
import { SoundProvider } from './context/SoundContext';
import { TimerProvider } from './context/TimerContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Mixer } from './components/Mixer';
import { ControlBar } from './components/ControlBar';

function App() {
  return (
    <SoundProvider>
      <TimerProvider>
        <div className="bg-obsidian text-slate-300 font-display min-h-screen overflow-hidden flex flex-col topo-bg">
          <Header />
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-[360px_1fr] h-screen pt-16 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-grid-border">
            <Sidebar />
            <div className="relative h-full overflow-hidden">
                <Mixer />
                <ControlBar />
            </div>
          </main>
        </div>
      </TimerProvider>
    </SoundProvider>
  );
}

export default App;