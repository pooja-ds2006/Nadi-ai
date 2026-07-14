import React, { useState } from "react";
import { ReminderSettings } from "../types";
import { Bell, BellOff, Volume2, GlassWater, Moon, Flame, Sparkles, CheckSquare, Square } from "lucide-react";

interface RemindersTrackerProps {
  reminders: ReminderSettings;
  onUpdateReminders: (updated: ReminderSettings) => void;
}

export default function RemindersTracker({ reminders, onUpdateReminders }: RemindersTrackerProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  // Simple daily progress tracker list inside reminders module
  const [dailyHabits, setDailyHabits] = useState([
    { id: "h1", name: "Drink Warm Water (Agni Ignition)", completed: false },
    { id: "h2", name: "Perform 10-Min Pranayama breathing", completed: false },
    { id: "h3", name: "Avoid Eating Post 7:30 PM", completed: false },
    { id: "h4", name: "Complete Dinacharya dry brushing", completed: false },
  ]);

  const handleToggle = (key: keyof ReminderSettings) => {
    const updated = { ...reminders, [key]: !reminders[key] };
    onUpdateReminders(updated);
    
    if (updated[key]) {
      // Simulate launching a reminder notification popup!
      triggerSimulationAlert(key);
    }
  };

  const triggerSimulationAlert = (key: string) => {
    let message = "Time to stay balanced!";
    if (key === "water") message = "💧 Hydration Alert: Sip warm water to aid your Agni digestive path!";
    if (key === "sleep") message = "💤 Bedtime Alert: Transition away from screens. Time for your warm nutmeg sleep milk!";
    if (key === "exercise") message = "🔥 Movement Alert: Time for your custom Yoga postures/stretches!";
    if (key === "meditation") message = "🧘 Meditation Alert: Take 5 deep alternate nostril breaths (Nadi Shodhana).";

    setActiveAlert(message);
    if (soundEnabled) {
      // Small simulated synth note via web audio context
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(528, ctx.currentTime); // Solfeggio frequency 528Hz (transformation & DNA repair!)
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.stop(ctx.currentTime + 0.6);
      } catch (e) {
        console.log("Audio play suppressed by browser policy.");
      }
    }

    setTimeout(() => {
      setActiveAlert(null);
    }, 5000);
  };

  const toggleHabit = (id: string) => {
    setDailyHabits(
      dailyHabits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  return (
    <div className="border border-[#141414] bg-white p-5 space-y-6 text-[#141414] rounded-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#141414] pb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#141414]" />
          <h4 className="font-sans text-sm font-bold uppercase tracking-tight text-[#141414]">
            Reminders & Daily Habits Checklist
          </h4>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex h-7 w-7 items-center justify-center rounded-none border transition-all ${
            soundEnabled
              ? "border-[#141414] bg-[#141414] text-white"
              : "border-[#141414]/20 bg-white text-[#141414]/50"
          }`}
          title={soundEnabled ? "Solfeggio Sound Chime Enabled (528Hz)" : "Sound Silenced"}
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      {/* Dynamic Simulated Notification Popup */}
      {activeAlert && (
        <div className="border border-[#141414] bg-[#E4E3E0]/80 p-3.5 flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#141414]"></span>
          <p className="text-xs font-bold font-mono text-[#141414]">{activeAlert}</p>
        </div>
      )}

      {/* Reminders Switches list */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {/* Water */}
        <div className="flex items-center justify-between border border-[#141414]/20 bg-[#E4E3E0]/10 p-3.5 rounded-none">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#141414] text-white p-1.5 rounded-none">
              <GlassWater className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase font-mono text-[#141414]">Warm Water Alerts</div>
              <div className="text-[10px] text-[#141414]/60">Interval: Every {reminders.waterInterval} hours</div>
            </div>
          </div>
          <button
            onClick={() => handleToggle("water")}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-none border transition-colors duration-200 focus:outline-none ${
              reminders.water ? "bg-[#141414] border-[#141414]" : "bg-white border-[#141414]/30"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-none transition duration-200 ease-in-out ${
                reminders.water ? "translate-x-[20px] bg-white mt-0.5" : "translate-x-[4px] bg-[#141414] mt-0.5"
              }`}
            />
          </button>
        </div>

        {/* Sleep */}
        <div className="flex items-center justify-between border border-[#141414]/20 bg-[#E4E3E0]/10 p-3.5 rounded-none">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#141414] text-white p-1.5 rounded-none">
              <Moon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase font-mono text-[#141414]">Bedtime Wind-Down</div>
              <div className="text-[10px] text-[#141414]/60">Schedule: {reminders.sleepTime}</div>
            </div>
          </div>
          <button
            onClick={() => handleToggle("sleep")}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-none border transition-colors duration-200 focus:outline-none ${
              reminders.sleep ? "bg-[#141414] border-[#141414]" : "bg-white border-[#141414]/30"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-none transition duration-200 ease-in-out ${
                reminders.sleep ? "translate-x-[20px] bg-white mt-0.5" : "translate-x-[4px] bg-[#141414] mt-0.5"
              }`}
            />
          </button>
        </div>

        {/* Exercise */}
        <div className="flex items-center justify-between border border-[#141414]/20 bg-[#E4E3E0]/10 p-3.5 rounded-none">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#141414] text-white p-1.5 rounded-none">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase font-mono text-[#141414]">Yoga Practice</div>
              <div className="text-[10px] text-[#141414]/60">Schedule: {reminders.exerciseTime}</div>
            </div>
          </div>
          <button
            onClick={() => handleToggle("exercise")}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-none border transition-colors duration-200 focus:outline-none ${
              reminders.exercise ? "bg-[#141414] border-[#141414]" : "bg-white border-[#141414]/30"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-none transition duration-200 ease-in-out ${
                reminders.exercise ? "translate-x-[20px] bg-white mt-0.5" : "translate-x-[4px] bg-[#141414] mt-0.5"
              }`}
            />
          </button>
        </div>

        {/* Meditation */}
        <div className="flex items-center justify-between border border-[#141414]/20 bg-[#E4E3E0]/10 p-3.5 rounded-none">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#141414] text-white p-1.5 rounded-none">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase font-mono text-[#141414]">Mindful Breathing</div>
              <div className="text-[10px] text-[#141414]/60">Daily Zen Alerts</div>
            </div>
          </div>
          <button
            onClick={() => handleToggle("meditation")}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-none border transition-colors duration-200 focus:outline-none ${
              reminders.meditation ? "bg-[#141414] border-[#141414]" : "bg-white border-[#141414]/30"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-none transition duration-200 ease-in-out ${
                reminders.meditation ? "translate-x-[20px] bg-white mt-0.5" : "translate-x-[4px] bg-[#141414] mt-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Daily Habits Check-Offs */}
      <div className="mt-4 border border-[#141414] bg-white p-4">
        <h5 className="text-xs font-bold text-[#141414] uppercase font-mono mb-3 flex items-center gap-1.5">
          <CheckSquare className="h-4 w-4 text-[#141414]" />
          Today's Dinacharya Checklist
        </h5>
        <div className="space-y-2">
          {dailyHabits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className="w-full flex items-center gap-3 border border-[#141414]/10 bg-[#E4E3E0]/10 p-2.5 text-left text-xs font-sans text-[#141414] hover:bg-[#E4E3E0]/30 cursor-pointer transition-colors rounded-none"
            >
              {habit.completed ? (
                <CheckSquare className="h-4.5 w-4.5 text-[#141414] shrink-0" />
              ) : (
                <Square className="h-4.5 w-4.5 text-[#141414]/30 shrink-0" />
              )}
              <span className={habit.completed ? "line-through text-[#141414]/40" : "font-medium"}>
                {habit.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
