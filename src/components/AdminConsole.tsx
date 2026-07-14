import React from "react";
import { UserProfile, DoshaBalance, PersonalizedRecommendations } from "../types";
import { Shield, Sparkles, Terminal, ToggleLeft, Activity, Users, Send } from "lucide-react";

interface AdminConsoleProps {
  user: UserProfile | null;
  balance: DoshaBalance | null;
  recommendations: PersonalizedRecommendations | null;
  onOverrideScores: (scores: { vata: number; pitta: number; kapha: number }) => void;
  onSimulateNotification: (message: string) => void;
}

export default function AdminConsole({
  user,
  balance,
  recommendations,
  onOverrideScores,
  onSimulateNotification,
}: AdminConsoleProps) {
  const handleQuickOverride = (vata: number, pitta: number, kapha: number) => {
    onOverrideScores({ vata, pitta, kapha });
  };

  const handleTestAlert = () => {
    onSimulateNotification("🔔 Admin Simulation: Dr. Vasant Lad recommends chamomile tea for Vata calming at sunset.");
  };

  return (
    <div className="border border-[#141414] bg-white p-6 text-[#141414] rounded-none shadow-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#141414] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-none bg-[#141414] text-white border border-[#141414]">
            <Shield className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-tight text-[#141414]">
              Simulation Developer Console
            </h4>
            <p className="text-[10px] text-[#141414]/60 font-mono uppercase tracking-wider">
              Module 12 & 13: Admin Content & Data Analytics Panel
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#141414] bg-[#E4E3E0] px-3 py-1 rounded-none border border-[#141414]">
          <Users className="h-3.5 w-3.5" />
          <span>254 Active Twins Connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Scores override console */}
        <div className="border border-[#141414] bg-white p-4 space-y-3 rounded-none">
          <span className="text-[10px] font-bold tracking-widest text-[#141414] uppercase flex items-center gap-1.5 font-mono">
            <ToggleLeft className="h-4 w-4" />
            Dosha Overrides (Calibrate Twin)
          </span>
          <p className="text-[11px] text-[#141414]/70 leading-relaxed font-sans">
            Manually force specific Dosha splits to instantly test dynamic UI, recipes, yoga recommendations, and the body model.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickOverride(80, 10, 10)}
              className="border border-[#141414] bg-white px-3 py-1.5 text-xs font-mono font-bold text-[#141414] hover:bg-[#E4E3E0] transition-colors rounded-none cursor-pointer"
            >
              Force Vata (80%)
            </button>
            <button
              onClick={() => handleQuickOverride(10, 80, 10)}
              className="border border-[#141414] bg-white px-3 py-1.5 text-xs font-mono font-bold text-[#141414] hover:bg-[#E4E3E0] transition-colors rounded-none cursor-pointer"
            >
              Force Pitta (80%)
            </button>
            <button
              onClick={() => handleQuickOverride(10, 10, 80)}
              className="border border-[#141414] bg-white px-3 py-1.5 text-xs font-mono font-bold text-[#141414] hover:bg-[#E4E3E0] transition-colors rounded-none cursor-pointer"
            >
              Force Kapha (80%)
            </button>
            <button
              onClick={() => handleQuickOverride(34, 33, 33)}
              className="border border-[#141414] bg-[#141414] text-white px-3 py-1.5 text-xs font-mono font-bold hover:bg-[#2a2a2a] transition-colors rounded-none cursor-pointer"
            >
              Force Tridoshic
            </button>
          </div>
        </div>

        {/* Content simulation & alerts */}
        <div className="border border-[#141414] bg-white p-4 space-y-3 flex flex-col justify-between rounded-none">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#141414] uppercase flex items-center gap-1.5 font-mono">
              <Activity className="h-4 w-4" />
              Event Notifications Simulator
            </span>
            <p className="text-[11px] text-[#141414]/70 leading-relaxed mt-1 font-sans">
              Trigger instant simulated alerts. This tests the real-time background notification framework (Module 11) using the 528Hz Solfeggio sound chime.
            </p>
          </div>
          <button
            onClick={handleTestAlert}
            className="w-full flex items-center justify-center gap-1.5 bg-[#141414] border border-[#141414] py-2 text-xs font-bold font-mono uppercase text-white hover:bg-[#2a2a2a] cursor-pointer rounded-none"
          >
            <Send className="h-3 w-3" />
            Fire Simulated Alert Chime
          </button>
        </div>
      </div>

      {/* Raw JSON inspection terminal */}
      <div className="border border-[#141414] bg-white p-4.5 rounded-none">
        <div className="flex items-center justify-between mb-3 border-b border-[#141414] pb-2">
          <span className="text-[10px] font-bold tracking-widest text-[#141414] uppercase flex items-center gap-1.5 font-mono">
            <Terminal className="h-4 w-4" />
            Raw Gemini API Response Payload
          </span>
          <span className="text-[9px] text-[#141414]/50 font-mono uppercase font-bold">
            MimeType: APPLICATION/JSON
          </span>
        </div>

        <div className="max-h-48 overflow-y-auto bg-[#E4E3E0]/15 border border-[#141414] p-3 text-[10px] font-mono text-[#141414] leading-relaxed rounded-none">
          {recommendations ? (
            <pre className="whitespace-pre">{JSON.stringify(recommendations, null, 2)}</pre>
          ) : (
            <div className="text-[#141414]/50 italic text-center py-4 font-mono">
              [Terminal Idle] Complete the Ayurvedic Questionnaire to fetch and dump structured JSON recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
