import React, { useState, useEffect, useRef } from 'react';
import { Persona, ChatMessage } from '../types';
import { generateAIResponse } from '../services/geminiService';
import { Bot, X, Send, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [persona, setPersona] = useState<Persona>(Persona.WARLORD);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle initial prompt from checklist
  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSend(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialPrompt]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateAIResponse(text, persona);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-zinc-950 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">THE WAR ROOM AI</h3>
              <div className="flex gap-2 mt-1">
                {Object.keys(Persona).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPersona(p as Persona)}
                    className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase transition-colors ${
                      persona === p 
                        ? 'bg-red-600 text-white' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/50">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
              <Bot size={48} className="mb-4" />
              <p className="font-mono text-sm">SELECT A TASK TO DEPLOY AGENT</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-zinc-800 text-zinc-100 rounded-tr-none' 
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none relative group'
              }`}>
                {msg.role === 'model' && (
                  <button 
                    onClick={() => copyToClipboard(msg.text, idx)}
                    className="absolute top-2 right-2 p-1.5 bg-zinc-800 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-zinc-400" />}
                  </button>
                )}
                
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} className="text-zinc-300" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1 animate-pulse">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none p-4 flex items-center">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Command the War Room..."
              className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors font-mono text-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={isLoading || !input.trim()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistant;
