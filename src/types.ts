export enum DoshaType {
  VATA = "Vata",
  PITTA = "Pitta",
  KAPHA = "Kapha",
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  bmi: number;
  sleepHours: number;
  waterIntake: number; // in liters
  activityLevel: "Sedentary" | "Lightly Active" | "Moderately Active" | "Very Active";
  stressLevel: "Low" | "Moderate" | "High";
  medicalConditions: string;
}

export interface QuizQuestion {
  id: string;
  category: string; // "Physical", "Physiological", "Mental", etc.
  questionText: string;
  options: {
    text: string;
    vataScore: number;
    pittaScore: number;
    kaphaScore: number;
  }[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionIndex: number;
}

export interface DoshaBalance {
  vata: number; // percentage
  pitta: number; // percentage
  kapha: number; // percentage
  dominant: DoshaType;
}

export interface PersonalizedRecommendations {
  diet: {
    description: string;
    foodsToInclude: string[];
    foodsToAvoid: string[];
    recipes: { name: string; ingredients: string[]; instructions: string }[];
  };
  yoga: {
    description: string;
    poses: { name: string; duration: string; benefits: string; illustrationStyle: string }[];
  };
  lifestyle: {
    description: string;
    dailyRoutine: { time: string; activity: string; benefit: string }[];
  };
  riskInsights: {
    lifestyleAnalysis: string;
    healthRiskIndicators: string[];
    preventiveTips: string[];
  };
}

export interface DigitalTwinStatus {
  head: string; // Mind, sleep state
  chest: string; // Breathing, emotional balance
  gut: string; // Digestion, pitta center
  joints: string; // Structure, vata/kapha balance
  skin: string; // Temperature, skin health
  energyLevel: number; // 0 to 100
  wellnessScore: number; // 0 to 100
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface ReminderSettings {
  water: boolean;
  sleep: boolean;
  exercise: boolean;
  meditation: boolean;
  waterInterval: number; // hours
  sleepTime: string;
  exerciseTime: string;
}

export interface ProgressDataPoint {
  date: string;
  vata: number;
  pitta: number;
  kapha: number;
  weight: number;
  sleepHours: number;
  wellnessScore: number;
}

export interface AppState {
  user: UserProfile | null;
  quizAnswers: QuizAnswer[];
  doshaBalance: DoshaBalance | null;
  recommendations: PersonalizedRecommendations | null;
  digitalTwin: DigitalTwinStatus | null;
  chatHistory: ChatMessage[];
  reminders: ReminderSettings;
  progressHistory: ProgressDataPoint[];
  feedback: { rating: number; message: string; submitted: boolean } | null;
}
