import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, UserProfile, DoshaBalance } from "../types";
import { Send, Sparkles, MessageSquare, Compass, ShieldAlert, BookOpen, RefreshCw } from "lucide-react";

interface ChatbotPanelProps {
  chatHistory: ChatMessage[];
  user: UserProfile | null;
  balance: DoshaBalance | null;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onClearChat: () => void;
}

export default function ChatbotPanel({
  chatHistory,
  user,
  balance,
  onSendMessage,
  isLoading,
  onClearChat,
}: ChatbotPanelProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggestions for the user to trigger instantly
  const suggestions = [
    { label: "🔥 Balance Agni (Digestion)", prompt: "How do I fire up and balance my metabolic Agni digestion?" },
    { label: "🌀 Yoga for my Dosha", prompt: "Which yoga poses or pranayama would you recommend for my dominant Dosha balance?" },
    { label: "💤 Deepen Sleep Quality", prompt: "I feel stressed and want to deepen my sleep. What is the ideal Ayurvedic bedtime routine?" },
    { label: "🍵 Herbal Infusions", prompt: "What classical Ayurvedic herbs or teas are best suited for my health status?" },
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    onSendMessage(inputText);
    setInputText("");
  };

  const handleSuggestionClick = (prompt: string) => {
    if (isLoading) return;
    onSendMessage(prompt);
  };

  // Scroll to bottom when chat history changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  return (
    <div className="flex flex-col h-[520px] rounded-2xl border border-indigo-500/10 bg-indigo-950/25 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-indigo-500/10 bg-indigo-950/40 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/20 shadow-inner">
            <MessageSquare className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold text-white flex items-center gap-1.5">
              Ayurvedic AI Digital Assistant
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </h4>
            <p className="text-[10px] text-indigo-300/60 font-sans tracking-wide">
              Powered by Gemini 3.5-Flash
            </p>
          </div>
        </div>
        <button
          onClick={onClearChat}
          className="text-[10px] font-bold text-indigo-400 hover:text-indigo-200 transition-colors border border-indigo-500/10 bg-indigo-950/30 px-2.5 py-1 rounded"
        >
          Clear Logs
        </button>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">
              <Compass className="h-6 w-6 animate-spin-slow" />
              <span className="absolute -inset-1 rounded-full border border-indigo-500/10 animate-ping opacity-50"></span>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-200">
                Namaste, {user?.name || "Seeker"}
              </p>
              <p className="text-[11px] text-indigo-300/50 mt-1 max-w-xs leading-relaxed">
                Ask me anything about daily routines, customized nutritional balances, herbal remedies, and how to stay fit under stress.
              </p>
            </div>
          </div>
        ) : (
          chatHistory.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isUser
                      ? "bg-violet-600 text-white rounded-tr-none shadow-lg shadow-violet-600/10"
                      : "bg-slate-950/60 border border-indigo-500/10 text-indigo-100 rounded-tl-none font-sans"
                  }`}
                >
                  {/* Message Sender Icon Tag */}
                  <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold text-indigo-300/60">
                    {isUser ? "YOU" : "✨ AYURVEDA AI"}
                  </div>

                  {/* Message body with neat formatted points */}
                  <div className="whitespace-pre-line prose prose-invert prose-xs">
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-slate-950/60 border border-indigo-500/10 px-4 py-3 text-xs text-indigo-300 rounded-tl-none">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[10px] font-mono text-indigo-400/60">AI is formulating balancing recipes...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips Panel */}
      <div className="px-5 pb-2 border-t border-indigo-500/5 bg-indigo-950/10 pt-2.5">
        <div className="flex flex-wrap gap-1.5 overflow-x-auto scrollbar-none max-h-18">
          {suggestions.map((sug, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleSuggestionClick(sug.prompt)}
              className="rounded bg-indigo-950/40 border border-indigo-500/10 px-2.5 py-1 text-[10px] text-indigo-300 hover:bg-violet-950/40 hover:border-violet-500/30 transition-all cursor-pointer whitespace-nowrap"
            >
              {sug.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Message Form */}
      <form onSubmit={handleSend} className="flex gap-2 p-3 bg-slate-950 border-t border-indigo-500/10">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about diet, yoga, herbs, Dinacharya daily schedule..."
          className="flex-1 rounded-xl border border-indigo-500/15 bg-indigo-950/20 px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40 transition-all shadow-md shadow-violet-600/10 cursor-pointer shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
