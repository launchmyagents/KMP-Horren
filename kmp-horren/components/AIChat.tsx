import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    {role: 'model', text: 'Goedendag! Ik ben de KMP productadviseur. Waarmee kan ik u helpen?'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Format history for Gemini
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const response = await chatWithAI(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white shadow-2xl w-80 sm:w-96 mb-4 border border-slate-200 flex flex-col h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-200 font-sans rounded-2xl overflow-hidden">
          <div className="bg-kmp-blue p-4 flex justify-between items-center text-white border-b-4 border-kmp-orange">
            <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-md">
                    <Sparkles size={18} className="text-kmp-orange" />
                </div>
                <div>
                    <h3 className="font-bold uppercase tracking-wide text-sm">KMP Adviseur</h3>
                    <p className="text-[10px] text-slate-300 opacity-80">AI-Powered Support</p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 transition-colors rounded-md">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm rounded-xl ${
                  msg.role === 'user' 
                    ? 'bg-kmp-orange text-white rounded-br-none' 
                    : 'bg-white text-kmp-blue border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 shadow-sm border border-slate-100 rounded-xl rounded-bl-none">
                  <Loader2 size={16} className="animate-spin text-kmp-orange" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Typ je vraag..."
              className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange transition-all placeholder:text-slate-400 text-kmp-blue rounded-md"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-kmp-blue text-white w-10 h-10 flex items-center justify-center hover:bg-kmp-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-300 rounded-md"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3"
      >
        <span className={`bg-kmp-blue text-white text-xs font-bold px-3 py-1.5 shadow-lg transition-opacity duration-300 rounded-md ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Hulp nodig?
        </span>
        <div className="bg-kmp-orange hover:bg-[#d03d22] text-white p-4 shadow-lg transition-transform hover:scale-105 border-4 border-white rounded-full">
            {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" />}
        </div>
      </button>
    </div>
  );
};