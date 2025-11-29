import React from 'react';
import { Target, Shield, Zap, Layout, Users, Send, PlayCircle, BarChart3 } from 'lucide-react';
import { DayPlan } from '../types';

interface SidebarProps {
  days: DayPlan[];
  activeDay: number;
  setActiveDay: (id: number) => void;
  progress: number;
}

const Sidebar: React.FC<SidebarProps> = ({ days, activeDay, setActiveDay, progress }) => {
  const getIcon = (id: number) => {
    switch (id) {
      case 1: return <Layout size={18} />;
      case 2: return <Target size={18} />;
      case 3: return <Send size={18} />;
      case 4: return <Zap size={18} />;
      case 5: return <Shield size={18} />;
      case 6: return <Users size={18} />;
      case 7: return <PlayCircle size={18} />;
      default: return <BarChart3 size={18} />;
    }
  };

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen flex flex-col hidden md:flex">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
          <span className="text-red-600">WAR</span> ROOM
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-mono">EXECUTION DASHBOARD</p>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono uppercase">
          <span>Campaign Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-red-600 h-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-all duration-200 border-l-2
              ${activeDay === day.id 
                ? 'bg-zinc-900/50 border-red-600 text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
              }`}
          >
            <div className={`${activeDay === day.id ? 'text-red-500' : 'text-zinc-600'}`}>
              {getIcon(day.id)}
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wide opacity-70">Day {day.id}</div>
              <div className="font-bold text-sm truncate">{day.focus}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-6 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold text-zinc-300">SYSTEM ONLINE</span>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono">
            OPERATIONAL STATUS: GO<br/>
            TARGET: TOTAL DOMINATION
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
