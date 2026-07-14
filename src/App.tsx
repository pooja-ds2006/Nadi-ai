import React, { useState, useEffect } from "react";
import {
  UserProfile,
  QuizAnswer,
  DoshaBalance,
  PersonalizedRecommendations,
  DigitalTwinStatus,
  ReminderSettings,
  ProgressDataPoint,
  ChatMessage,
  DoshaType,
} from "./types";
import { MOCK_PROGRESS_HISTORY, DIGITAL_TWIN_MAPPING, FALLBACK_RECOMMENDATIONS } from "./data";
import Header from "./components/Header";
import DigitalTwinModel from "./components/DigitalTwinModel";
import HealthProfileForm from "./components/HealthProfileForm";
import AyurvedicQuiz from "./components/AyurvedicQuiz";
import DashboardInsights from "./components/DashboardInsights";
import ChatbotPanel from "./components/ChatbotPanel";
import RemindersTracker from "./components/RemindersTracker";
import FeedbackRating from "./components/FeedbackRating";
import AdminConsole from "./components/AdminConsole";
import { ShieldAlert, Compass, Sparkles, Activity, FileText, Lock, Mail, Star, Heart } from "lucide-react";

export default function App() {
  // Navigation & session state
  const [session, setSession] = useState<{ email: string; name: string } | null>(null);
  const [activeScreen, setActiveScreen] = useState<"AUTH" | "CALIBRATION" | "QUIZ" | "DASHBOARD">("AUTH");
  
  // App core state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<DoshaBalance | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendations | null>(null);
  const [twinStatus, setTwinStatus] = useState<DigitalTwinStatus | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [reminders, setReminders] = useState<ReminderSettings>({
    water: true,
    sleep: false,
    exercise: false,
    meditation: true,
    waterInterval: 2,
    sleepTime: "22:00",
    exerciseTime: "07:00",
  });
  const [progressHistory, setProgressHistory] = useState<ProgressDataPoint[]>(MOCK_PROGRESS_HISTORY);
  const [feedback, setFeedback] = useState<{ rating: number; message: string; submitted: boolean } | null>(null);

  // UI States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [isAiDriven, setIsAiDriven] = useState(false);

  // Auth Form local states
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Local storage caching for a wonderful user experience
  useEffect(() => {
    const cachedSession = localStorage.getItem("ayur_session");
    if (cachedSession) {
      const parsed = JSON.parse(cachedSession);
      setSession(parsed);
      
      const cachedProfile = localStorage.getItem(`ayur_profile_${parsed.email}`);
      if (cachedProfile) {
        const parsedProfile = JSON.parse(cachedProfile);
        setUserProfile(parsedProfile);
        
        const cachedBalance = localStorage.getItem(`ayur_balance_${parsed.email}`);
        const cachedRecs = localStorage.getItem(`ayur_recs_${parsed.email}`);
        
        if (cachedBalance) {
          setBalance(JSON.parse(cachedBalance));
          setIsAiDriven(localStorage.getItem(`ayur_is_ai_${parsed.email}`) === "true");
          
          if (cachedRecs) {
            setRecommendations(JSON.parse(cachedRecs));
          }
          setActiveScreen("DASHBOARD");
        } else {
          setActiveScreen("CALIBRATION");
        }
      } else {
        setActiveScreen("CALIBRATION");
      }
    }
  }, []);

  // Auth Operations
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!authEmail.trim() || !authPassword.trim()) return;

    try {
      const endpoint = isRegisterMode ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegisterMode
        ? { email: authEmail, password: authPassword, name: authName }
        : { email: authEmail, password: authPassword };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      const activeUser = { email: data.user.email, name: data.user.name };
      setSession(activeUser);
      localStorage.setItem("ayur_session", JSON.stringify(activeUser));

      if (data.user.profile) {
        setUserProfile(data.user.profile);
        localStorage.setItem(`ayur_profile_${activeUser.email}`, JSON.stringify(data.user.profile));
        // Retrieve or calculate
        setActiveScreen("DASHBOARD");
      } else {
        setActiveScreen("CALIBRATION");
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleGuestLogin = () => {
    // Quick frictionless guest entry
    const guestUser = { email: "guest@example.com", name: "Tridoshic Seeker" };
    setSession(guestUser);
    localStorage.setItem("ayur_session", JSON.stringify(guestUser));
    
    const guestProfile: UserProfile = {
      name: "Tridoshic Seeker",
      age: 28,
      gender: "Female",
      height: 165,
      weight: 62,
      bmi: 22.8,
      sleepHours: 7.5,
      waterIntake: 2.5,
      activityLevel: "Moderately Active",
      stressLevel: "Moderate",
      medicalConditions: "None reported",
    };
    
    setUserProfile(guestProfile);
    localStorage.setItem(`ayur_profile_${guestUser.email}`, JSON.stringify(guestProfile));
    setActiveScreen("QUIZ");
  };

  const handleLogout = () => {
    localStorage.removeItem("ayur_session");
    setSession(null);
    setUserProfile(null);
    setBalance(null);
    setRecommendations(null);
    setTwinStatus(null);
    setChatHistory([]);
    setActiveScreen("AUTH");
    setIsAdminOpen(false);
  };

  // Calibration Profile submitted
  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    if (session) {
      localStorage.setItem(`ayur_profile_${session.email}`, JSON.stringify(profile));
      // Save profile updates on mock database
      fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.email, profile }),
      }).catch(err => console.log("Database write failed:", err));
    }
    setActiveScreen("QUIZ");
  };

  // Questionnaire completes
  const handleQuizComplete = async (answers: QuizAnswer[]) => {
    if (!userProfile) return;
    setQuizLoading(true);

    // Calculate score sum locally
    const scoreSum = { vata: 0, pitta: 0, kapha: 0 };
    const { AYURVEDIC_QUIZ_QUESTIONS } = await import("./data");

    answers.forEach((ans) => {
      const q = AYURVEDIC_QUIZ_QUESTIONS.find((question) => question.id === ans.questionId);
      if (q) {
        const selectedOpt = q.options[ans.selectedOptionIndex];
        scoreSum.vata += selectedOpt.vataScore;
        scoreSum.pitta += selectedOpt.pittaScore;
        scoreSum.kapha += selectedOpt.kaphaScore;
      }
    });

    try {
      const res = await fetch("/api/ayurveda/predict-dosha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: userProfile,
          answers,
          questionScoreSum: scoreSum,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setBalance(data.balance);
      setIsAiDriven(data.isAiDriven);

      if (data.isAiDriven && data.recommendations) {
        setRecommendations(data.recommendations);
        if (session) {
          localStorage.setItem(`ayur_recs_${session.email}`, JSON.stringify(data.recommendations));
        }
      } else {
        // Fallback standard guidelines
        const fallback = FALLBACK_RECOMMENDATIONS[data.balance.dominant as DoshaType];
        setRecommendations(fallback);
        if (session) {
          localStorage.setItem(`ayur_recs_${session.email}`, JSON.stringify(fallback));
        }
      }

      // Initialize Digital Twin model
      const twinMapped = DIGITAL_TWIN_MAPPING[data.balance.dominant as DoshaType];
      setTwinStatus(twinMapped);

      if (session) {
        localStorage.setItem(`ayur_balance_${session.email}`, JSON.stringify(data.balance));
        localStorage.setItem(`ayur_is_ai_${session.email}`, String(data.isAiDriven));
      }

      // Inject a dynamic progress data point matching current date
      const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const newPoint: ProgressDataPoint = {
        date: dateStr,
        vata: data.balance.vata,
        pitta: data.balance.pitta,
        kapha: data.balance.kapha,
        weight: userProfile.weight,
        sleepHours: userProfile.sleepHours,
        wellnessScore: twinMapped.wellnessScore,
      };
      setProgressHistory([...progressHistory, newPoint]);

      // Add a greeting chatbot message from the new coach constitution!
      const initialCoachMsg: ChatMessage = {
        id: "coach-init",
        sender: "ai",
        text: `Namaste ${userProfile.name}! I have calibrated your Ayurvedic Digital Twin.

Your dominant life force constitution is **${data.balance.dominant}** (Vata: ${data.balance.vata}%, Pitta: ${data.balance.pitta}%, Kapha: ${data.balance.kapha}%). 

I have tailored a custom Ayurvedic nutrition, exercise, and daily routine guideline matching your biometric specifications. Go ahead, explore your recommendations below or click different parts of your Twin body model to inspect your dynamic energetic balance!`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory([initialCoachMsg]);

      setActiveScreen("DASHBOARD");
    } catch (err) {
      console.error("Failed to calculate results:", err);
    } finally {
      setQuizLoading(false);
    }
  };

  // Chat Operations
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    setChatLoading(true);

    try {
      const res = await fetch("/api/ayurveda/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: updatedHistory.slice(-6), // Send last 6 messages as context
          profile: userProfile,
          balance,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setChatLoading(false);
    }
  };

  // Feedback submit
  const handleFeedbackSubmit = (rating: number, message: string) => {
    const fData = { rating, message, submitted: true };
    setFeedback(fData);
  };

  // Admin override scoring triggers
  const handleAdminOverride = (scores: { vata: number; pitta: number; kapha: number }) => {
    let dominant = DoshaType.VATA;
    if (scores.pitta > scores.vata && scores.pitta > scores.kapha) dominant = DoshaType.PITTA;
    if (scores.kapha > scores.vata && scores.kapha > scores.pitta) dominant = DoshaType.KAPHA;

    const overBalance: DoshaBalance = { ...scores, dominant };
    setBalance(overBalance);
    
    // Inject fallback matching forced dominant
    const overRec = FALLBACK_RECOMMENDATIONS[dominant];
    setRecommendations(overRec);

    // Calibrate twin
    const twinMapped = DIGITAL_TWIN_MAPPING[dominant];
    setTwinStatus(twinMapped);

    if (session) {
      localStorage.setItem(`ayur_balance_${session.email}`, JSON.stringify(overBalance));
      localStorage.setItem(`ayur_recs_${session.email}`, JSON.stringify(overRec));
    }
  };

  // Print Health Report triggers (Module 10)
  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-indigo-100 selection:bg-violet-600 selection:text-white">
      {/* Background ambient auric lights */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-violet-900/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-fuchsia-900/5 blur-[150px]" />
        <div className="absolute -right-40 -bottom-40 h-[450px] w-[450px] rounded-full bg-indigo-900/10 blur-[120px]" />
      </div>

      {/* Header displayed on active dashboards */}
      {session && (
        <Header
          user={userProfile}
          balance={balance}
          onLogout={handleLogout}
          onOpenProfile={() => setActiveScreen("CALIBRATION")}
          onOpenAdmin={() => setIsAdminOpen(!isAdminOpen)}
          isAdminOpen={isAdminOpen}
          onResetQuiz={() => setActiveScreen("QUIZ")}
        />
      )}

      {/* PRIMARY CONTROLLER ROUTER */}
      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {quizLoading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm space-y-4">
            <Compass className="h-12 w-12 text-violet-400 animate-spin" />
            <p className="text-sm font-bold text-violet-200">Decoding Tridoshic Energies...</p>
            <p className="text-xs text-indigo-300/60 max-w-xs text-center">
              Our Gemini server is compiling your biometrics and questionnaire to build your personalized Digital Twin.
            </p>
          </div>
        )}

        {/* 1. AUTH SCREEN */}
        {activeScreen === "AUTH" && (
          <div className="mx-auto mt-8 max-w-md">
            {/* Visual branding container */}
            <div className="mb-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 p-[2px] shadow-[0_0_25px_rgba(139,92,246,0.5)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                  <Heart className="h-7 w-7 text-fuchsia-400 animate-pulse" />
                </div>
              </div>
              <h2 className="mt-4 font-sans text-2xl font-extrabold tracking-tight text-white">
                AI Ayurvedic Digital Twin
              </h2>
              <p className="mt-1 text-xs text-indigo-300/60">
                Personalized Ayurveda. Smart Insights. Better Living.
              </p>
            </div>

            {/* Auth Form */}
            <div className="rounded-2xl border border-indigo-500/10 bg-indigo-950/20 p-6 shadow-2xl backdrop-blur-md">
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authError && (
                  <div className="rounded-lg border border-rose-500/20 bg-rose-950/30 p-3 text-xs font-bold text-rose-300 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full rounded-lg border border-indigo-500/15 bg-slate-950/40 px-4 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/50" />
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full rounded-lg border border-indigo-500/15 bg-slate-950/40 pl-10 pr-4 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1.5">
                    Security Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/50" />
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full rounded-lg border border-indigo-500/15 bg-slate-950/40 pl-10 pr-4 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/15 hover:from-violet-500 hover:to-indigo-500"
                >
                  {isRegisterMode ? "Create Seeker Account" : "Access Platform Portal"}
                </button>
              </form>

              {/* Toggle register mode */}
              <div className="mt-4 text-center text-xs">
                <button
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-violet-400 hover:text-violet-300 font-medium cursor-pointer"
                >
                  {isRegisterMode ? "Already registered? Login here" : "Create new account"}
                </button>
              </div>

              {/* Frictional bypass */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-indigo-500/10" />
                </div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider">
                  <span className="bg-slate-950/50 px-3 text-indigo-300/40">Or Bypass Session</span>
                </div>
              </div>

              <button
                onClick={handleGuestLogin}
                className="mt-4 w-full rounded-xl border border-indigo-500/20 bg-indigo-950/20 py-2 text-xs font-bold text-indigo-300 transition-colors hover:bg-indigo-950/40 cursor-pointer"
              >
                Quick Guest Entry & Speed-Calibration
              </button>
            </div>
          </div>
        )}

        {/* 2. CALIBRATION PROFILE SCREEN */}
        {activeScreen === "CALIBRATION" && (
          <HealthProfileForm initialData={userProfile} onSubmit={handleProfileSubmit} />
        )}

        {/* 3. QUESTIONNAIRE SCREEN */}
        {activeScreen === "QUIZ" && <AyurvedicQuiz onComplete={handleQuizComplete} />}

        {/* 4. DASHBOARD SCREEN STAGE */}
        {activeScreen === "DASHBOARD" && balance && (
          <div className="space-y-8 animate-fade-in print:block">
            {/* Visual Headline Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-indigo-500/10 pb-5">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-violet-400 uppercase">
                  Digital Twin Dashboard
                </span>
                <h2 className="font-sans text-xl font-extrabold text-white sm:text-2xl mt-0.5">
                  Welcome Back, <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{userProfile?.name}</span>
                </h2>
                <p className="text-xs text-indigo-200/50 mt-1">
                  Integrate biological metrics with ancient wisdom. Calibrated dominant force: <strong className="text-white">{balance.dominant}</strong>.
                </p>
              </div>

              {/* Wellness Score Pill */}
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-950/40 border border-indigo-500/10 p-3 flex items-center gap-2.5">
                  <div className="rounded bg-fuchsia-500/10 p-1.5 text-fuchsia-400">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-indigo-300/60 uppercase">Wellness Index</div>
                    <div className="text-xs font-extrabold text-white">
                      {twinStatus?.wellnessScore || 87}/100
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950/40 border border-indigo-500/10 p-3 flex items-center gap-2.5">
                  <div className="rounded bg-sky-500/10 p-1.5 text-sky-400">
                    <Compass className="h-4 w-4 animate-spin-slow" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-indigo-300/60 uppercase">BMI Weight</div>
                    <div className="text-xs font-extrabold text-white">
                      {userProfile?.bmi} ({userProfile?.weight}kg)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Override Console drawer toggled via header */}
            {isAdminOpen && (
              <AdminConsole
                user={userProfile}
                balance={balance}
                recommendations={recommendations}
                onOverrideScores={handleAdminOverride}
                onSimulateNotification={(msg) => alert(msg)}
              />
            )}

            {/* Main grid section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Body silhouette twin (span 7) */}
              <div className="lg:col-span-7 space-y-8">
                <DigitalTwinModel balance={balance} twinStatus={twinStatus} />
                <DashboardInsights
                  user={userProfile}
                  balance={balance}
                  recommendations={recommendations}
                  progressHistory={progressHistory}
                  isAiDriven={isAiDriven}
                  onDownloadReport={handleDownloadReport}
                />
              </div>

              {/* Right Column: AI Chat Coach & Checklist switches (span 5) */}
              <div className="lg:col-span-5 space-y-8">
                <ChatbotPanel
                  chatHistory={chatHistory}
                  user={userProfile}
                  balance={balance}
                  onSendMessage={handleSendMessage}
                  isLoading={chatLoading}
                  onClearChat={() => setChatHistory([])}
                />
                
                <RemindersTracker
                  reminders={reminders}
                  onUpdateReminders={(updated) => setReminders(updated)}
                />

                <FeedbackRating
                  onFeedbackSubmit={handleFeedbackSubmit}
                  savedFeedback={feedback}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
