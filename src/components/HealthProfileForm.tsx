import React, { useState, useEffect } from "react";
import { UserProfile } from "../types";
import { Activity, ShieldAlert, Sparkles, Scale, Heart, Compass } from "lucide-react";

interface HealthProfileFormProps {
  initialData: UserProfile | null;
  onSubmit: (profile: UserProfile) => void;
}

export default function HealthProfileForm({ initialData, onSubmit }: HealthProfileFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState<number>(initialData?.age || 28);
  const [gender, setGender] = useState(initialData?.gender || "Female");
  const [height, setHeight] = useState<number>(initialData?.height || 165);
  const [weight, setWeight] = useState<number>(initialData?.weight || 62);
  const [sleepHours, setSleepHours] = useState<number>(initialData?.sleepHours || 7);
  const [waterIntake, setWaterIntake] = useState<number>(initialData?.waterIntake || 2);
  const [activityLevel, setActivityLevel] = useState<UserProfile["activityLevel"]>(initialData?.activityLevel || "Moderately Active");
  const [stressLevel, setStressLevel] = useState<UserProfile["stressLevel"]>(initialData?.stressLevel || "Moderate");
  const [medicalConditions, setMedicalConditions] = useState(initialData?.medicalConditions || "");
  
  const [bmi, setBmi] = useState<number>(0);
  const [bmiCategory, setBmiCategory] = useState({ label: "Normal", color: "text-emerald-400" });

  // Instant BMI Calculation
  useEffect(() => {
    if (height > 0 && weight > 0) {
      const computedBmi = parseFloat((weight / ((height / 100) * (height / 100))).toFixed(1));
      setBmi(computedBmi);

      if (computedBmi < 18.5) {
        setBmiCategory({ label: "Underweight (Vata tendency)", color: "text-sky-400" });
      } else if (computedBmi >= 18.5 && computedBmi < 24.9) {
        setBmiCategory({ label: "Healthy (Balanced)", color: "text-emerald-400" });
      } else if (computedBmi >= 25 && computedBmi < 29.9) {
        setBmiCategory({ label: "Overweight (Kapha tendency)", color: "text-amber-400" });
      } else {
        setBmiCategory({ label: "Obese (High Kapha)", color: "text-rose-400" });
      }
    }
  }, [height, weight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name,
      age,
      gender,
      height,
      weight,
      bmi,
      sleepHours,
      waterIntake,
      activityLevel,
      stressLevel,
      medicalConditions,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl border border-[#141414] bg-white p-6 text-[#141414]">
      {/* Decorative Top Sparkle */}
      <div className="mb-6 flex items-center justify-between border-b border-[#141414] pb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#141414]" />
          <h2 className="font-sans text-base font-bold uppercase tracking-tight text-[#141414]">
            Calibration: <span className="font-serif italic font-normal lowercase">Biometric Health Profile</span>
          </h2>
        </div>
        <Sparkles className="h-4.5 w-4.5 text-amber-500" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] placeholder-[#141414]/30 focus:bg-[#E4E3E0] focus:outline-none transition-colors"
            placeholder="E.g., Aarav Sharma"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Age
          </label>
          <input
            type="number"
            min="1"
            max="120"
            required
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] focus:bg-[#E4E3E0] focus:outline-none transition-colors"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] focus:bg-[#E4E3E0] focus:outline-none transition-colors"
          >
            <option value="Female" className="bg-white">Female</option>
            <option value="Male" className="bg-white">Male</option>
            <option value="Non-binary" className="bg-white">Non-binary</option>
            <option value="Prefer not to say" className="bg-white">Prefer not to say</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Height (cm)
          </label>
          <input
            type="number"
            min="100"
            max="250"
            required
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] focus:bg-[#E4E3E0] focus:outline-none transition-colors"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Weight (kg)
          </label>
          <input
            type="number"
            min="30"
            max="300"
            required
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] focus:bg-[#E4E3E0] focus:outline-none transition-colors"
          />
        </div>

        {/* Real-Time BMI Indicator Badge */}
        <div className="sm:col-span-2 flex items-center justify-between border border-[#141414] bg-[#E4E3E0]/30 p-3.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#141414]">
            <Scale className="h-4 w-4 text-[#141414]" />
            <span className="font-mono">CALIBRATED BMI INDEX:</span>
            <span className="font-mono font-bold text-white text-xs bg-[#141414] px-2 py-0.5 border border-[#141414]">
              {bmi || "N/A"}
            </span>
          </div>
          <span className={`text-xs font-bold font-mono uppercase ${bmiCategory.color}`}>
            {bmiCategory.label}
          </span>
        </div>

        {/* Daily Sleep Hours */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Nightly Sleep (hours)
          </label>
          <input
            type="range"
            min="4"
            max="12"
            step="1"
            value={sleepHours}
            onChange={(e) => setSleepHours(parseInt(e.target.value))}
            className="w-full accent-[#141414] h-1 bg-[#D1D0CC] cursor-pointer appearance-none"
          />
          <div className="mt-1 flex justify-between text-[11px] font-mono text-[#141414]">
            <span>{sleepHours} Hours</span>
            <span className="text-[10px] text-[#141414]/60 font-mono">Optimum: 7-8h</span>
          </div>
        </div>

        {/* Daily Water Intake */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Daily Hydration (Liters)
          </label>
          <input
            type="range"
            min="1"
            max="6"
            step="0.5"
            value={waterIntake}
            onChange={(e) => setWaterIntake(parseFloat(e.target.value))}
            className="w-full accent-[#141414] h-1 bg-[#D1D0CC] cursor-pointer appearance-none"
          />
          <div className="mt-1 flex justify-between text-[11px] font-mono text-[#141414]">
            <span>{waterIntake} Liters</span>
            <span className="text-[10px] text-[#141414]/60 font-mono">Optimum: 2-3L</span>
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Physical Activity Level
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as UserProfile["activityLevel"])}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] focus:bg-[#E4E3E0] focus:outline-none transition-colors"
          >
            <option value="Sedentary" className="bg-white">Sedentary (No regular exercise)</option>
            <option value="Lightly Active" className="bg-white">Lightly Active (Light walks, yoga)</option>
            <option value="Moderately Active" className="bg-white">Moderately Active (Moderate workouts 3-5d)</option>
            <option value="Very Active" className="bg-white">Very Active (Heavy sports, hard labor)</option>
          </select>
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Average Mental Stress
          </label>
          <select
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value as UserProfile["stressLevel"])}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] focus:bg-[#E4E3E0] focus:outline-none transition-colors"
          >
            <option value="Low" className="bg-white">Low (Calm, balanced mind)</option>
            <option value="Moderate" className="bg-white">Moderate (Standard work stress)</option>
            <option value="High" className="bg-white">High (Frequent anxiety, busy mind)</option>
          </select>
        </div>

        {/* Medical History / Details */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-[#141414] uppercase tracking-wider mb-1.5 font-mono">
            Medical History or Chronic Conditions
          </label>
          <textarea
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            className="w-full rounded-none border border-[#141414] bg-white px-4 py-2 text-sm text-[#141414] placeholder-[#141414]/30 focus:bg-[#E4E3E0] focus:outline-none transition-colors h-18 resize-none"
            placeholder="List any conditions, allergies, or chronic concerns (e.g. Acid reflux, hypertension, mild lower-back pain, none)."
          />
        </div>
      </div>

      {/* Primary Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full flex items-center justify-center gap-2 rounded-none bg-[#141414] py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#2a2a2a] active:bg-[#141414] transition-colors cursor-pointer"
      >
        <Compass className="h-4 w-4 text-white" />
        Initialize Personal Health Profile
      </button>
    </form>
  );
}
