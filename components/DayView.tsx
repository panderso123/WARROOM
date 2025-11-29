import React from 'react';
import { DayPlan, Task } from '../types';
import { CheckCircle2, Circle, Bot, ArrowRight } from 'lucide-react';

interface DayViewProps {
  day: DayPlan;
  toggleTask: (dayId: number, taskId: string) => void;
  triggerAI: (prompt: string) => void;
}

const DayView: React.FC<DayViewProps> = ({ day, toggleTask, triggerAI }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-black p-8 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none select-none">
        <h1 className="text-9xl font-black text-zinc-800 tracking-tighter">0{day.id}</h1>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <header className="mb-12">
          <div className="inline-block bg-red-950/30 text-red-500 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-red-900/50 uppercase tracking-widest font-mono">
            Active Mission
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">{day.title}</h2>
          <p className="text-zinc-400 text-lg">Focus: <span className="text-zinc-200 font-semibold">{day.focus}</span></p>
        </header>

        <div className="space-y-4">
          {day.tasks.map((task) => (
            <div 
              key={task.id} 
              className={`group p-5 rounded-xl border transition-all duration-300 ${
                task.completed 
                  ? 'bg-zinc-900/30 border-zinc-800 opacity-60' 
                  : 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-start gap-4">
                <button 
                  onClick={() => toggleTask(day.id, task.id)}
                  className={`mt-1 transition-colors ${task.completed ? 'text-green-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                
                <div className="flex-1">
                  <p className={`text-lg font-medium transition-all ${
                    task.completed ? 'text-zinc-500 line-through decoration-zinc-700' : 'text-zinc-100'
                  }`}>
                    {task.text}
                  </p>
                  
                  {task.aiPrompt && !task.completed && (
                    <div className="mt-4">
                      <button 
                        onClick={() => triggerAI(task.aiPrompt!)}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide bg-blue-600/10 text-blue-400 border border-blue-500/30 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-all group-ai"
                      >
                        <Bot size={14} />
                        <span>Deploy Agent</span>
                        <ArrowRight size={12} className="opacity-0 -ml-2 group-ai-hover:opacity-100 group-ai-hover:ml-0 transition-all" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-zinc-900/30 rounded-lg border border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm italic font-mono">
            "We don't get what we wish for. We get what we work for."
          </p>
        </div>
      </div>
    </div>
  );
};

export default DayView;
