import React, { useState } from "react";
import {
  PersonalizedRecommendations,
  DoshaBalance,
  UserProfile,
  ProgressDataPoint,
  DoshaType,
} from "../types";
import { FALLBACK_RECOMMENDATIONS, MOCK_PROGRESS_HISTORY } from "../data";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  Apple,
  Dumbbell,
  Compass,
  Download,
  AlertTriangle,
  Flame,
  Droplet,
  Sparkles,
  BookOpen,
  TrendingUp,
  Activity,
  Heart,
  Calendar,
} from "lucide-react";

interface DashboardInsightsProps {
  user: UserProfile | null;
  balance: DoshaBalance | null;
  recommendations: PersonalizedRecommendations | null;
  progressHistory: ProgressDataPoint[];
  isAiDriven: boolean;
  onDownloadReport: () => void;
}

export default function DashboardInsights({
  user,
  balance,
  recommendations,
  progressHistory,
  isAiDriven,
  onDownloadReport,
}: DashboardInsightsProps) {
  const [activeTab, setActiveTab] = useState<"plans" | "risks" | "trends">("plans");
  const [activeSubTab, setActiveSubTab] = useState<"diet" | "yoga" | "lifestyle">("diet");
  const [activeRecipeIdx, setActiveRecipeIdx] = useState<number>(0);

  const activeDosha = balance?.dominant || DoshaType.VATA;
  const currentPlan: PersonalizedRecommendations =
    recommendations || FALLBACK_RECOMMENDATIONS[activeDosha];

  // Colors based on Dosha balance
  const vataColor = "#38bdf8"; // Sky-400
  const pittaColor = "#f59e0b"; // Amber-500
  const kaphaColor = "#10b981"; // Emerald-500

  return (
    <div className="space-y-6 text-[#141414]">
      {/* Visual Analytics Hub Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#141414] pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("plans")}
            className={`px-4 py-2 text-xs font-bold font-mono uppercase transition-all cursor-pointer rounded-none border ${
              activeTab === "plans"
                ? "bg-[#141414] text-white border-[#141414]"
                : "border-[#141414]/20 bg-white text-[#141414] hover:bg-[#E4E3E0]"
            }`}
          >
            🌱 Recommendations
          </button>
          <button
            onClick={() => setActiveTab("risks")}
            className={`px-4 py-2 text-xs font-bold font-mono uppercase transition-all cursor-pointer rounded-none border ${
              activeTab === "risks"
                ? "bg-[#141414] text-white border-[#141414]"
                : "border-[#141414]/20 bg-white text-[#141414] hover:bg-[#E4E3E0]"
            }`}
          >
            ⚠️ Risk & Prevention
          </button>
          <button
            onClick={() => setActiveTab("trends")}
            className={`px-4 py-2 text-xs font-bold font-mono uppercase transition-all cursor-pointer rounded-none border ${
              activeTab === "trends"
                ? "bg-[#141414] text-white border-[#141414]"
                : "border-[#141414]/20 bg-white text-[#141414] hover:bg-[#E4E3E0]"
            }`}
          >
            📊 History Trends
          </button>
        </div>

        {/* Report Download & AI Status Button */}
        <div className="flex items-center gap-3">
          <div className="border border-[#141414] bg-[#E4E3E0] px-2.5 py-1 text-[10px] font-bold uppercase font-mono text-[#141414]">
            {isAiDriven ? "✨ Gemini Calibrated" : "📦 Standard Plan"}
          </div>

          <button
            onClick={onDownloadReport}
            className="flex items-center gap-1.5 border border-[#141414] bg-[#141414] px-4 py-1.5 text-xs font-bold font-mono uppercase text-white hover:bg-[#2a2a2a] cursor-pointer rounded-none"
          >
            <Download className="h-3.5 w-3.5 text-white" />
            Export PDF Report
          </button>
        </div>
      </div>

      {/* TAB CONTENTS */}

      {/* 1. RECOMMENDATIONS TAB */}
      {activeTab === "plans" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Sub Navigation */}
          <div className="space-y-2 lg:col-span-3">
            <button
              onClick={() => setActiveSubTab("diet")}
              className={`w-full flex items-center gap-3 border p-3.5 text-left transition-all cursor-pointer rounded-none ${
                activeSubTab === "diet"
                  ? "border-[#141414] bg-[#141414] text-white"
                  : "border-[#141414]/20 bg-white text-[#141414] hover:bg-[#E4E3E0]"
              }`}
            >
              <div className={`p-1.5 rounded-none ${activeSubTab === "diet" ? "bg-white text-[#141414]" : "bg-[#141414] text-white"}`}>
                <Apple className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase font-mono">Ayurvedic Diet</div>
                <div className={`text-[10px] ${activeSubTab === "diet" ? "text-white/70" : "text-[#141414]/60"}`}>Balancing recipes</div>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab("yoga")}
              className={`w-full flex items-center gap-3 border p-3.5 text-left transition-all cursor-pointer rounded-none ${
                activeSubTab === "yoga"
                  ? "border-[#141414] bg-[#141414] text-white"
                  : "border-[#141414]/20 bg-white text-[#141414] hover:bg-[#E4E3E0]"
              }`}
            >
              <div className={`p-1.5 rounded-none ${activeSubTab === "yoga" ? "bg-white text-[#141414]" : "bg-[#141414] text-white"}`}>
                <Dumbbell className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase font-mono">Yoga & Pranayama</div>
                <div className={`text-[10px] ${activeSubTab === "yoga" ? "text-white/70" : "text-[#141414]/60"}`}>Calming body poses</div>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab("lifestyle")}
              className={`w-full flex items-center gap-3 border p-3.5 text-left transition-all cursor-pointer rounded-none ${
                activeSubTab === "lifestyle"
                  ? "border-[#141414] bg-[#141414] text-white"
                  : "border-[#141414]/20 bg-white text-[#141414] hover:bg-[#E4E3E0]"
              }`}
            >
              <div className={`p-1.5 rounded-none ${activeSubTab === "lifestyle" ? "bg-white text-[#141414]" : "bg-[#141414] text-white"}`}>
                <Compass className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase font-mono">Dinacharya Routine</div>
                <div className={`text-[10px] ${activeSubTab === "lifestyle" ? "text-white/70" : "text-[#141414]/60"}`}>Daily schedule</div>
              </div>
            </button>
          </div>

          {/* Sub Tab Contents */}
          <div className="lg:col-span-9 border border-[#141414] bg-white p-5">
            {/* A. DIET SUB TAB */}
            {activeSubTab === "diet" && (
              <div className="space-y-5 text-[#141414]">
                <div>
                  <h4 className="font-sans text-base font-bold uppercase tracking-tight text-[#141414] flex items-center gap-2">
                    <Apple className="h-5 w-5 text-[#141414]" />
                    Ayurvedic Diet Plan
                  </h4>
                  <p className="mt-1 text-xs text-[#141414]/80 leading-relaxed font-sans">
                    {currentPlan.diet.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border border-[#141414] bg-[#E4E3E0]/20 p-4">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-[#141414] uppercase block border-b border-[#141414] pb-1.5 mb-2.5">
                      🟢 Foods to Prioritize
                    </span>
                    <ul className="space-y-1.5">
                      {currentPlan.diet.foodsToInclude.map((food, idx) => (
                        <li key={idx} className="text-xs text-[#141414] flex items-start gap-1.5 font-sans font-medium">
                          <span className="text-[#141414] mt-0.5">•</span>
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-[#141414] bg-[#E4E3E0]/20 p-4">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-[#141414] uppercase block border-b border-[#141414] pb-1.5 mb-2.5">
                      🛑 Foods to Avoid / Restrict
                    </span>
                    <ul className="space-y-1.5">
                      {currentPlan.diet.foodsToAvoid.map((food, idx) => (
                        <li key={idx} className="text-xs text-[#141414] flex items-start gap-1.5 font-sans font-medium">
                          <span className="text-[#141414] mt-0.5">•</span>
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recipes Sub-Panel */}
                {currentPlan.diet.recipes && currentPlan.diet.recipes.length > 0 && (
                  <div className="border border-[#141414] bg-white p-4.5 mt-4">
                    <h5 className="text-xs font-bold text-[#141414] font-mono uppercase flex items-center gap-1.5 mb-3">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      Dynamic Balancing Recipes
                    </h5>

                    {/* Recipe Tabs */}
                    <div className="flex gap-2 border-b border-[#141414]/20 pb-2 mb-3">
                      {currentPlan.diet.recipes.map((rec, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => setActiveRecipeIdx(rIdx)}
                          className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer rounded-none border ${
                            activeRecipeIdx === rIdx
                              ? "bg-[#141414] text-white border-[#141414]"
                              : "text-[#141414] hover:bg-[#E4E3E0] border-[#141414]/20"
                          }`}
                        >
                          {rec.name}
                        </button>
                      ))}
                    </div>

                    {/* Selected Recipe display */}
                    <div className="space-y-3.5">
                      <h6 className="text-sm font-bold font-serif italic text-[#141414]">
                        {currentPlan.diet.recipes[activeRecipeIdx]?.name}
                      </h6>
                      <div>
                        <span className="text-[10px] font-bold font-mono text-[#141414] block uppercase mb-1">
                          Ingredients:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentPlan.diet.recipes[activeRecipeIdx]?.ingredients.map((ing, iIdx) => (
                            <span
                              key={iIdx}
                              className="border border-[#141414] bg-[#E4E3E0]/30 px-2.5 py-0.5 text-[10px] text-[#141414] font-mono"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold font-mono text-[#141414] block uppercase mb-1">
                          Cooking Directions:
                        </span>
                        <p className="text-xs text-[#141414]/80 leading-relaxed bg-[#E4E3E0]/20 p-2.5 border border-[#141414]">
                          {currentPlan.diet.recipes[activeRecipeIdx]?.instructions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* B. YOGA SUB TAB */}
            {activeSubTab === "yoga" && (
              <div className="space-y-4 text-[#141414]">
                <div>
                  <h4 className="font-sans text-base font-bold uppercase tracking-tight text-[#141414] flex items-center gap-1.5">
                    <Dumbbell className="h-5 w-5 text-[#141414]" />
                    Asana & Pranayama Poses
                  </h4>
                  <p className="mt-1 text-xs text-[#141414]/80 leading-relaxed font-sans">
                    {currentPlan.yoga.description}
                  </p>
                </div>

                {/* Yoga cards grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {currentPlan.yoga.poses.map((pose, idx) => (
                    <div
                      key={idx}
                      className="border border-[#141414] bg-white p-4 flex flex-col justify-between rounded-none"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2 border-b border-[#141414]/10 pb-1">
                          <span className="text-xs font-bold text-[#141414] uppercase truncate font-mono">{pose.name}</span>
                          <span className="border border-[#141414] bg-[#E4E3E0] px-1.5 py-0.5 text-[9px] font-mono font-bold text-[#141414] shrink-0">
                            {pose.duration}
                          </span>
                        </div>
                        <p className="text-xs text-[#141414]/80 leading-relaxed mb-3">
                          {pose.benefits}
                        </p>
                      </div>

                      <div className="bg-[#E4E3E0]/30 p-2 border border-[#141414]/10 text-[10px] font-sans italic text-[#141414]/70">
                        {pose.illustrationStyle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* C. LIFESTYLE SUB TAB */}
            {activeSubTab === "lifestyle" && (
              <div className="space-y-4 text-[#141414]">
                <div>
                  <h4 className="font-sans text-base font-bold uppercase tracking-tight text-[#141414] flex items-center gap-1.5">
                    <Compass className="h-5 w-5 text-[#141414]" />
                    Dinacharya (Ayurvedic Daily Routine)
                  </h4>
                  <p className="mt-1 text-xs text-[#141414]/80 leading-relaxed font-sans">
                    {currentPlan.lifestyle.description}
                  </p>
                </div>

                {/* Dinacharya Timeline */}
                <div className="relative border-l-2 border-[#141414] pl-4 ml-2.5 mt-6 space-y-5">
                  {currentPlan.lifestyle.dailyRoutine.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[23px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white border border-[#141414]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#141414]"></span>
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white bg-[#141414] px-1.5 py-0.5">
                            {item.time}
                          </span>
                          <span className="text-xs font-bold text-[#141414] uppercase font-mono tracking-wide">{item.activity}</span>
                        </div>
                        <p className="mt-1 text-xs text-[#141414]/70 leading-relaxed pl-1">
                          {item.benefit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. RISK & PREVENTION TAB */}
      {activeTab === "risks" && (
        <div className="border border-[#141414] bg-white p-5 space-y-6 text-[#141414]">
          <div className="flex items-start gap-3 border-b border-[#141414]/10 pb-4">
            <div className="rounded-none bg-[#141414] p-2 text-white">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-sans text-base font-bold uppercase tracking-tight">
                Lifestyle Pathophysiology Analysis
              </h4>
              <p className="mt-1 text-xs text-[#141414]/80 leading-relaxed">
                {currentPlan.riskInsights.lifestyleAnalysis}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Risk Indicators */}
            <div className="border border-[#141414] bg-[#E4E3E0]/20 p-5 space-y-3">
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#141414] uppercase flex items-center gap-1 border-b border-[#141414] pb-1.5 mb-2">
                ⚠️ Health Risk Indicators (Dosha Excess)
              </span>
              <ul className="space-y-2">
                {currentPlan.riskInsights.healthRiskIndicators.map((risk, idx) => (
                  <li key={idx} className="text-xs text-[#141414] flex items-start gap-2 font-sans font-medium">
                    <span className="text-red-600 font-bold mt-0.5 shrink-0">▲</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Preventive Tips / Herbs */}
            <div className="border border-[#141414] bg-[#E4E3E0]/20 p-5 space-y-3">
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#141414] uppercase flex items-center gap-1 border-b border-[#141414] pb-1.5 mb-2">
                🌿 Preventive Herbs & Habits (Swastha)
              </span>
              <ul className="space-y-2">
                {currentPlan.riskInsights.preventiveTips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-[#141414] flex items-start gap-2 font-sans font-medium">
                    <span className="text-emerald-700 font-bold mt-0.5 shrink-0">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. HEALTH HISTORY TRENDS TAB (Recharts!) */}
      {activeTab === "trends" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Chart 1: Dosha Variations Area Chart */}
          <div className="border border-[#141414] bg-white p-5">
            <h4 className="font-sans text-xs font-bold tracking-wider text-[#141414] uppercase flex items-center gap-2 mb-4 font-mono">
              <TrendingUp className="h-4 w-4 text-[#141414]" />
              Dosha Fluctuation Trend (Tridoshic Map)
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={progressHistory}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <XAxis dataKey="date" stroke="#141414" fontSize={10} tickLine={false} />
                  <YAxis stroke="#141414" fontSize={10} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#141414",
                      borderRadius: "0px",
                      color: "#141414",
                      fontSize: "11px",
                      fontFamily: "monospace"
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", marginTop: "10px", fontFamily: "monospace" }} />
                  <Area
                    type="monotone"
                    name="Vata"
                    dataKey="vata"
                    stroke="#141414"
                    fillOpacity={0.15}
                    fill="#141414"
                  />
                  <Area
                    type="monotone"
                    name="Pitta"
                    dataKey="pitta"
                    stroke="#555555"
                    fillOpacity={0.1}
                    fill="#555555"
                  />
                  <Area
                    type="monotone"
                    name="Kapha"
                    dataKey="kapha"
                    stroke="#999999"
                    fillOpacity={0.05}
                    fill="#999999"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Wellness Score & Sleep Trend Line Chart */}
          <div className="border border-[#141414] bg-white p-5">
            <h4 className="font-sans text-xs font-bold tracking-wider text-[#141414] uppercase flex items-center gap-2 mb-4 font-mono">
              <Activity className="h-4 w-4 text-[#141414]" />
              Biometric Sleep & Wellness Index
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={progressHistory}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#141414" opacity={0.1} />
                  <XAxis dataKey="date" stroke="#141414" fontSize={10} tickLine={false} />
                  <YAxis stroke="#141414" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#141414",
                      borderRadius: "0px",
                      color: "#141414",
                      fontSize: "11px",
                      fontFamily: "monospace"
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", marginTop: "10px", fontFamily: "monospace" }} />
                  <Line
                    type="monotone"
                    name="Wellness Index"
                    dataKey="wellnessScore"
                    stroke="#141414"
                    strokeWidth={2.5}
                    dot={{ fill: "#141414", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    name="Sleep hours (h)"
                    dataKey="sleepHours"
                    stroke="#888888"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={{ fill: "#888888", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
