import React from 'react';
import { Timer } from './Timer';
import { TaskList } from './TaskList';

export const Sidebar = () => {
  return (
    <aside className="flex flex-col h-full bg-obsidian-light divide-y divide-grid-border overflow-hidden border-r border-grid-border z-30 relative w-full lg:w-[360px]">
        <Timer />
        <TaskList />
    </aside>
  );
};