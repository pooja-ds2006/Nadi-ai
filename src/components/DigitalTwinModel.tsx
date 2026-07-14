import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Zap, Brain, ShieldAlert, Waves, ThermometerSun } from "lucide-react";
import { DoshaBalance, DigitalTwinStatus, DoshaType } from "../types";
import { DIGITAL_TWIN_MAPPING } from "../data";

interface DigitalTwinModelProps {
  balance: DoshaBalance | null;
  twinStatus: DigitalTwinStatus | null;
}

interface BodySystem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  hoverGlow: string;
  x: string; // positioning percentage on SVG
  y: string;
  description: string;
  chakra: string;
}

export default function DigitalTwinModel({ balance, twinStatus }: DigitalTwinModelProps) {
  const [selectedSystem, setSelectedSystem] = useState<string | null>("head");

  // Determine dynamic description based on actual status or fallback mapping
  const activeDosha = balance?.dominant || DoshaType.VATA;
  const statusSource = twinStatus || DIGITAL_TWIN_MAPPING[activeDosha];

  const systems: BodySystem[] = [
    {
      id: "head",
      name: "Cognitive Center (Mind / Sahasrara)",
      icon: <Brain className="h-4 w-4 text-white" />,
      color: "bg-[#141414]",
      hoverGlow: "shadow-[#141414]/20",
      x: "50%",
      y: "11%",
      chakra: "Crown Chakra",
      description: statusSource.head,
    },
    {
      id: "chest",
      name: "Pranic Center (Heart & Lungs / Anahata)",
      icon: <Heart className="h-4 w-4 text-white" />,
      color: "bg-[#141414]",
      hoverGlow: "shadow-[#141414]/20",
      x: "50%",
      y: "32%",
      chakra: "Heart Chakra",
      description: statusSource.chest,
    },
    {
      id: "gut",
      name: "Metabolic Fire Center (Agni - Gut / Manipura)",
      icon: <Zap className="h-4 w-4 text-white" />,
      color: "bg-[#141414]",
      hoverGlow: "shadow-[#141414]/20",
      x: "50%",
      y: "46%",
      chakra: "Solar Plexus",
      description: statusSource.gut,
    },
    {
      id: "joints",
      name: "Structural Integrity (Joints & Bones / Muladhara)",
      icon: <Waves className="h-4 w-4 text-white" />,
      color: "bg-[#141414]",
      hoverGlow: "shadow-[#141414]/20",
      x: "53%",
      y: "75%",
      chakra: "Root Connection",
      description: statusSource.joints,
    },
    {
      id: "skin",
      name: "Tejas Aura (Skin & Heat Regulation)",
      icon: <ThermometerSun className="h-4 w-4 text-white" />,
      color: "bg-[#141414]",
      hoverGlow: "shadow-[#141414]/20",
      x: "31%",
      y: "38%",
      chakra: "Peripheral Energy Layer",
      description: statusSource.skin,
    },
  ];

  const activeSystem = systems.find((s) => s.id === selectedSystem) || systems[0];

  return (
    <div className="relative overflow-hidden border border-[#141414] bg-white p-6 text-[#141414]">
      {/* Visual Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#141414] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#141414] uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-amber-500" />
            Bio-Energetic Digital Twin
          </h3>
          <p className="text-xs text-[#141414]/60 font-mono">
            Interactive mapping of human biological centers and organ states.
          </p>
        </div>
        <div className="font-mono text-xs font-bold bg-[#141414] text-white px-3 py-1 border border-[#141414]">
          SYSTEM INTEGRITY: {statusSource.wellnessScore}%
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Silhouette Vector Stage */}
        <div className="relative flex justify-center bg-[#E4E3E0]/30 border border-[#141414] py-8 lg:col-span-6">
          {/* Subtle Rotating Energy Ring Background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="h-72 w-72 border border-[#141414]/10 border-dashed animate-[spin_40s_linear_infinite]"></div>
            <div className="absolute h-48 w-48 border border-[#141414]/5 border-double animate-[spin_20s_linear_infinite_reverse]"></div>
          </div>

          <div className="relative h-[360px] w-[260px]">
            {/* SVG Silhouette of Human in Meditative State */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 200 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Minimal Stylized Bodily Form */}
              <path
                d="M100 25C108.284 25 115 18.2843 115 10C115 1.71573 108.284 -5 100 -5C91.7157 -5 85 1.71573 85 10C85 18.2843 91.7157 25 100 25Z"
                fill="rgba(20, 20, 20, 0.05)"
                stroke="#141414"
                strokeWidth="1.5"
              />
              <path
                d="M100 25C80 25 70 35 60 55C50 75 40 100 40 115C40 120 45 125 50 120C55 115 65 95 65 95C65 95 60 140 60 165C60 190 70 230 70 270C70 275 75 285 80 285C85 285 90 280 90 260C90 240 95 210 95 190H105C105 210 110 240 110 260C110 280 115 285 120 285C125 285 130 275 130 270C130 230 140 190 140 165C140 140 135 95 135 95C135 95 145 115 150 120C155 125 160 120 160 115C160 100 150 75 140 55C130 35 120 25 100 25Z"
                fill="rgba(20, 20, 20, 0.03)"
                stroke="#141414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lotus Base */}
              <path
                d="M60 275C50 278 40 285 45 292C55 298 75 295 100 295C125 295 145 298 155 292C160 285 150 278 140 275"
                stroke="#141414"
                strokeWidth="1.5"
                fill="rgba(20, 20, 20, 0.08)"
              />
            </svg>

            {/* Hotspots */}
            {systems.map((sys) => {
              const isSelected = selectedSystem === sys.id;
              return (
                <button
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys.id)}
                  style={{ left: sys.x, top: sys.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex h-7 w-7 items-center justify-center cursor-pointer"
                >
                  {/* Outer Glow */}
                  <span
                    className={`absolute inline-flex h-full w-full bg-[#141414] opacity-25`}
                  ></span>

                  {/* Node Button Circle */}
                  <div
                    className={`relative flex h-5.5 w-5.5 items-center justify-center text-white text-[9px] font-bold border border-white transition-all duration-200 ${
                      sys.color
                    } ${
                      isSelected
                        ? "scale-125 ring-2 ring-[#141414] shadow-[0_0_8px_rgba(20,20,20,0.5)]"
                        : "opacity-80 scale-100 hover:scale-110 hover:opacity-100"
                    }`}
                  >
                    {sys.icon}
                  </div>

                  {/* Hotspot Label on Hover */}
                  <span className="absolute left-full ml-2 hidden bg-[#141414] text-white border border-[#141414] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap group-hover:block pointer-events-none z-30">
                    {sys.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected System Inspection Detail Panel */}
        <div className="flex flex-col justify-between lg:col-span-6 bg-[#D1D0CC]/20 border border-[#141414] p-5">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-[#141414] pb-3">
              <span className="text-[10px] font-bold tracking-widest text-[#141414] uppercase font-mono">
                {activeSystem.chakra}
              </span>
              <span className="text-[10px] text-[#141414]/60 font-mono">
                LOC: {activeSystem.id.toUpperCase()}
              </span>
            </div>

            <h4 className="font-serif italic text-lg font-bold text-[#141414] flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 bg-[#141414] border border-[#141414]" />
              {activeSystem.name}
            </h4>

            {/* Interpretation Box */}
            <div className="mt-4 border border-[#141414] bg-white p-4">
              <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-[#141414] uppercase tracking-wider font-mono">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                State Telemetry Interpretation:
              </div>
              <p className="font-sans text-xs leading-relaxed text-[#141414]/90 whitespace-pre-line">
                {activeSystem.description || "Initialize diagnostic calibration in the questionnaire."}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-[#141414] pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <span className="text-[#141414]/60 font-mono text-[10px]">
                [SELECT HOTSPOT NODE ON BLUEPRINT]
              </span>
              <div className="flex gap-1 text-[9px] font-mono font-bold text-[#141414]">
                <span className="px-1.5 py-0.5 border border-[#141414] bg-sky-100">
                  VATA
                </span>
                <span className="px-1.5 py-0.5 border border-[#141414] bg-amber-100">
                  PITTA
                </span>
                <span className="px-1.5 py-0.5 border border-[#141414] bg-emerald-100">
                  KAPHA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
