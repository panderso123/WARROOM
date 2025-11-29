export interface Task {
  id: string;
  text: string;
  completed: boolean;
  aiPrompt?: string; // If the task can be accelerated by AI
}

export interface DayPlan {
  id: number;
  title: string;
  focus: string;
  tasks: Task[];
}

export enum Persona {
  WARLORD = 'WARLORD', // The composite ruthless executor (Tate/Jobs/Bezos/Martell)
  JOBS = 'JOBS', // Visionary, perfectionist
  BEZOS = 'BEZOS', // Customer obsession, scale
  TATE = 'TATE', // Ruthless, speed, accountability
  MARTELL = 'MARTELL' // Systems, delegation
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
