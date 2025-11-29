import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DayView from './components/DayView';
import AIAssistant from './components/AIAssistant';
import { SEVEN_DAY_PLAN } from './constants';
import { DayPlan } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [days, setDays] = useState<DayPlan[]>(SEVEN_DAY_PLAN);
  const [activeDayId, setActiveDayId] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  
  // AI Modal State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  
  // Mobile Sidebar State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load from local storage on mount (simple persistence)
  useEffect(() => {
    const saved = localStorage.getItem('warRoomPlan');
    if (saved) {
      try {
        setDays(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  // Calculate progress and save whenever days change
  useEffect(() => {
    const totalTasks = days.reduce((acc, day) => acc + day.tasks.length, 0);
    const completedTasks = days.reduce((acc, day) => acc + day.tasks.filter(t => t.completed).length, 0);
    setProgress(totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0);
    
    localStorage.setItem('warRoomPlan', JSON.stringify(days));
  }, [days]);

  const toggleTask = (dayId: number, taskId: string) => {
    setDays(prevDays => prevDays.map(day => {
      if (day.id !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      };
    }));
  };

  const handleTriggerAI = (prompt: string) => {
    setAiPrompt(prompt);
    setIsAIModalOpen(true);
  };

  const handleCloseAI = () => {
    setIsAIModalOpen(false);
    setAiPrompt('');
  };

  const activeDay = days.find(d => d.id === activeDayId) || days[0];

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-40 bg-zinc-900 p-2 rounded border border-zinc-700"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div className="w-64 bg-zinc-950 h-full shadow-2xl">
             <Sidebar 
                days={days} 
                activeDay={activeDayId} 
                setActiveDay={(id) => { setActiveDayId(id); setIsMobileSidebarOpen(false); }} 
                progress={progress} 
              />
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}></div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar 
          days={days} 
          activeDay={activeDayId} 
          setActiveDay={setActiveDayId} 
          progress={progress} 
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 h-full relative flex flex-col">
        <DayView 
          day={activeDay} 
          toggleTask={toggleTask} 
          triggerAI={handleTriggerAI} 
        />
      </main>

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={isAIModalOpen} 
        onClose={handleCloseAI} 
        initialPrompt={aiPrompt}
      />
    </div>
  );
};

export default App;
