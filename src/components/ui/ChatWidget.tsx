"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquareText, X, Send, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string, time: string}[]>([
    { role: 'bot', text: 'Hello! Welcome to B & Y Technology. How can our team help you today?', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const newUserMsg = { role: 'user' as const, text: inputValue, time };
    const newMessages = [...messages, newUserMsg];
    
    setMessages(newMessages);
    setInputValue("");
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.body) throw new Error("No body");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      setMessages(prev => [...prev, { role: 'bot', text: '', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      
      let done = false;
      let accumulatedText = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          accumulatedText += decoder.decode(value, { stream: true });
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = { ...copy[copy.length - 1], text: accumulatedText };
            return copy;
          });
        }
      }
    } catch (_err) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "I'm having trouble connecting to our systems. Please try again later.", 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      }]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 md:left-6 md:right-auto z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-[72px] right-0 md:left-0 md:right-auto w-[350px] bg-white border border-gray-200 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-[#0a0a0a] px-5 py-4 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/20 to-transparent opacity-50"></div>
              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="/icon.png" alt="B&Y Bot" className="w-10 h-10 rounded-full object-cover shadow-sm bg-brand-accent p-1" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">B & Y Support</h3>
                    <p className="text-white/60 text-xs">We typically reply in a few minutes.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">

                  <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              <div className="text-center text-xs text-gray-400 my-2">Today</div>
              
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
                    {!isUser && (
                      <img src="/icon.png" alt="B&Y Bot" className="w-6 h-6 rounded-full object-cover flex-shrink-0 mr-2 mt-1 bg-brand-accent p-0.5" />
                    )}
                    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
                      <div 
                        className={`p-3 text-[13px] leading-relaxed shadow-sm ${
                          isUser 
                            ? 'bg-[#0a0a0a] text-white rounded-2xl rounded-tr-sm' 
                            : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1 pl-3 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all">
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Send a message..." 
                  className="flex-1 bg-transparent max-h-24 min-h-[40px] py-2.5 px-1 text-[13px] text-gray-800 focus:outline-none resize-none placeholder:text-gray-400"
                  rows={1}
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim()}
                  className={`p-2 m-0.5 rounded-lg flex items-center justify-center transition-colors ${
                    inputValue.trim() 
                      ? 'bg-brand-accent text-black hover:bg-[#92ce2f]' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400">Powered by B & Y AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
          isOpen ? 'bg-white border border-gray-200 text-gray-600 rotate-90 scale-95' : 'bg-[#0a0a0a] text-white hover:-translate-y-1 hover:shadow-2xl'
        }`}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageSquareText size={24} />
        )}
        
        {/* Notification badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">1</span>
          </span>
        )}
      </button>
    </div>
  );
}
