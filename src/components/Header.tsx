import React from "react";
import { Sparkles, LogOut, User, Activity, Flame, ShieldAlert, BookOpen } from "lucide-react";
import { UserProfile, DoshaBalance } from "../types";

interface HeaderProps {
  user: UserProfile | null;
  balance: DoshaBalance | null;
  onLogout: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
  onResetQuiz: () => void;
}

export default function Header({
  user,
  balance,
  onLogout,
  onOpenProfile,
  onOpenAdmin,
  isAdminOpen,
  onResetQuiz
}: HeaderProps) {
  return (
    <header className="relative z-10 border-b border-[#141414] bg-white/80 backdrop-blur-md px-6 py-4 text-[#141414]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        {/* Title Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center border border-[#141414] bg-[#141414] text-white">
            <Sparkles className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans text-lg font-black uppercase tracking-tight text-[#141414]">
                AI Ayurvedic <span className="font-serif italic font-normal lowercase">Digital Twin</span>
              </h1>
              <span className="font-mono text-[10px] bg-[#141414] px-1.5 py-0.5 text-white">
                v1.2
              </span>
            </div>
            <p className="text-[11px] text-[#141414]/60 font-mono tracking-wider uppercase">
              Health Intelligence & Personalized Wellness
            </p>
          </div>
        </div>

        {/* Dosha Pills Row */}
        <div className="flex flex-wrap justify-center gap-2">
          <div className="group relative flex items-center gap-1.5 border border-[#141414] bg-white px-3.5 py-1.5 text-xs font-bold font-mono text-[#141414] hover:bg-[#E4E3E0] transition-colors cursor-help">
            <span className="h-2.5 w-2.5 bg-sky-400 border border-[#141414]"></span>
            <span>VATA</span>
            {balance && (
              <span className="ml-1 bg-sky-100 border border-sky-400/30 px-1 py-0.5 text-[10px] font-bold text-[#141414]">
                {balance.vata}%
              </span>
            )}
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-52 -translate-x-1/2 bg-[#141414] p-3 text-left text-[11px] text-white opacity-0 border border-[#141414] shadow-lg transition-opacity duration-200 group-hover:opacity-100 z-50 rounded-none leading-relaxed font-sans">
              <strong className="text-sky-300 font-mono block mb-1">VATA (Air & Ether)</strong>
              Responsible for movement, nerve impulses, and breathing. Balanced by warmth and routine.
            </div>
          </div>

          <div className="group relative flex items-center gap-1.5 border border-[#141414] bg-white px-3.5 py-1.5 text-xs font-bold font-mono text-[#141414] hover:bg-[#E4E3E0] transition-colors cursor-help">
            <span className="h-2.5 w-2.5 bg-amber-500 border border-[#141414]"></span>
            <span>PITTA</span>
            {balance && (
              <span className="ml-1 bg-amber-50 border border-amber-400/30 px-1 py-0.5 text-[10px] font-bold text-[#141414]">
                {balance.pitta}%
              </span>
            )}
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-52 -translate-x-1/2 bg-[#141414] p-3 text-left text-[11px] text-white opacity-0 border border-[#141414] shadow-lg transition-opacity duration-200 group-hover:opacity-100 z-50 rounded-none leading-relaxed font-sans">
              <strong className="text-amber-300 font-mono block mb-1">PITTA (Fire & Water)</strong>
              Controls digestion, metabolism, and thermal regulation. Balanced by coolness and patience.
            </div>
          </div>

          <div className="group relative flex items-center gap-1.5 border border-[#141414] bg-white px-3.5 py-1.5 text-xs font-bold font-mono text-[#141414] hover:bg-[#E4E3E0] transition-colors cursor-help">
            <span className="h-2.5 w-2.5 bg-emerald-500 border border-[#141414]"></span>
            <span>KAPHA</span>
            {balance && (
              <span className="ml-1 bg-emerald-50 border border-emerald-400/30 px-1 py-0.5 text-[10px] font-bold text-[#141414]">
                {balance.kapha}%
              </span>
            )}
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-52 -translate-x-1/2 bg-[#141414] p-3 text-left text-[11px] text-white opacity-0 border border-[#141414] shadow-lg transition-opacity duration-200 group-hover:opacity-100 z-50 rounded-none leading-relaxed font-sans">
              <strong className="text-emerald-300 font-mono block mb-1">KAPHA (Earth & Water)</strong>
              Provides structure, joint lubrication, and cellular immunity. Balanced by stimulation and warmth.
            </div>
          </div>
        </div>

        {/* User Account controls */}
        {user ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 border border-[#141414] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#141414] transition-all hover:bg-[#D1D0CC]"
              title="Edit Profile Parameters"
            >
              <User className="h-3.5 w-3.5 text-[#141414]" />
              <span className="hidden sm:inline">{user.name}</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                isAdminOpen
                  ? "bg-[#141414] border-[#141414] text-white"
                  : "border-[#141414] bg-white text-[#141414] hover:bg-[#D1D0CC]"
              }`}
              title="Developer Configuration Panel"
            >
              <Activity className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Developer Console</span>
            </button>

            {balance && (
              <button
                onClick={onResetQuiz}
                className="flex items-center gap-1.5 border border-[#141414] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#141414] transition-all hover:bg-[#D1D0CC]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Retake Quiz</span>
              </button>
            )}

            <button
              onClick={onLogout}
              className="border border-[#141414] bg-white p-1.5 text-[#141414] transition-all hover:bg-[#D1D0CC]"
              title="Sign Out Session"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="text-[10px] text-[#141414]/60 font-mono tracking-widest uppercase">
            SECURED_SYSTEM_CORE
          </div>
        )}
      </div>
    </header>
  );
}
