import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client
// User-Agent: 'aistudio-build' must be set in httpOptions headers
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("GoogleGenAI client initialized successfully on server.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined. Fallbacks will be active.");
}

// Simple in-memory user mock persistence
const usersDb: Record<string, any> = {
  "test@example.com": {
    email: "test@example.com",
    name: "Aarav Sharma",
    password: "password123",
    profile: {
      name: "Aarav Sharma",
      age: 29,
      gender: "Male",
      height: 178,
      weight: 74,
      bmi: 23.4,
      sleepHours: 7,
      waterIntake: 2.2,
      activityLevel: "Moderately Active",
      stressLevel: "Moderate",
      medicalConditions: "None",
    }
  }
};

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString(), geminiEnabled: !!ai });
});

// User Authentication: Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = usersDb[email.toLowerCase()];
  if (user && user.password === password) {
    return res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        profile: user.profile
      }
    });
  }

  return res.status(401).json({ error: "Invalid email or password" });
});

// User Authentication: Register
app.post("/api/auth/register", (req, res) => {
  const { email, name, password, profile } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: "Email, name, and password are required" });
  }

  const emailLower = email.toLowerCase();
  if (usersDb[emailLower]) {
    return res.status(400).json({ error: "User already exists with this email" });
  }

  usersDb[emailLower] = {
    email: emailLower,
    name,
    password,
    profile: profile || null
  };

  return res.json({
    success: true,
    user: {
      email: emailLower,
      name,
      profile: usersDb[emailLower].profile
    }
  });
});

// Update Profile
app.post("/api/auth/update-profile", (req, res) => {
  const { email, profile } = req.body;
  if (!email || !profile) {
    return res.status(400).json({ error: "Email and profile are required" });
  }

  const user = usersDb[email.toLowerCase()];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.profile = profile;
  user.name = profile.name;
  return res.json({
    success: true,
    user: {
      email: user.email,
      name: user.name,
      profile: user.profile
    }
  });
});

// Predict Dosha & Generate Recommendations via Gemini API
app.post("/api/ayurveda/predict-dosha", async (req, res) => {
  const { profile, answers, questionScoreSum } = req.body;
  // questionScoreSum will be an object { vata: number, pitta: number, kapha: number } calculated on client.
  
  if (!profile || !answers || !questionScoreSum) {
    return res.status(400).json({ error: "Profile, answers and question score sums are required." });
  }

  const { vata, pitta, kapha } = questionScoreSum;
  const total = vata + pitta + kapha || 1;
  const vataPct = Math.round((vata / total) * 100);
  const pittaPct = Math.round((pitta / total) * 100);
  const kaphaPct = 100 - (vataPct + pittaPct); // Ensure exactly 100%

  let dominant = "Vata";
  if (pittaPct > vataPct && pittaPct > kaphaPct) {
    dominant = "Pitta";
  } else if (kaphaPct > vataPct && kaphaPct > pittaPct) {
    dominant = "Kapha";
  }

  // Define fallback predictions if Gemini fails or is not setup
  const balance = { vata: vataPct, pitta: pittaPct, kapha: kaphaPct, dominant };

  if (!ai) {
    console.log("No Gemini API client initialized. Returning default recommendations.");
    return res.json({
      success: true,
      balance,
      isAiDriven: false,
      rawRecommendation: null
    });
  }

  try {
    // We can prompt Gemini to generate personalized Ayurvedic instructions and recommendations tailored specifically
    // to the user's BMI, sleep habits, stress, activity, and medical conditions in combination with their Dosha scores!
    const prompt = `
      You are an elite master Ayurvedic Physician and Health Intelligence AI.
      Analyze the following User Profile and Dosha Percentages:
      
      USER PROFILE:
      - Name: ${profile.name}
      - Age: ${profile.age}
      - Gender: ${profile.gender}
      - Height: ${profile.height} cm
      - Weight: ${profile.weight} kg
      - BMI: ${profile.bmi}
      - Daily Sleep: ${profile.sleepHours} hours
      - Daily Water: ${profile.waterIntake} Liters
      - Activity Level: ${profile.activityLevel}
      - Stress Level: ${profile.stressLevel}
      - Medical Conditions: ${profile.medicalConditions || "None reported"}
      
      DOSHA PROFILE:
      - Vata: ${vataPct}%
      - Pitta: ${pittaPct}%
      - Kapha: ${kaphaPct}%
      - Dominant Dosha: ${dominant}

      Based on this data, generate custom Ayurvedic insights and plans.
      You must return a JSON response matching this EXACT schema:
      {
        "diet": {
          "description": "General description of dietary modifications suitable for their dominant Dosha and current health attributes (e.g. BMI, water intake). Keep it professional, encouraging, and detailed.",
          "foodsToInclude": ["4 key foods to prioritize"],
          "foodsToAvoid": ["4 key foods to restrict"],
          "recipes": [
            {
              "name": "Creative Ayurvedic recipe name suitable for balancing their Dosha and current state",
              "ingredients": ["list of ingredients"],
              "instructions": "detailed step-by-step cooking steps"
            }
          ]
        },
        "yoga": {
          "description": "Ayurvedic recommendations for movement and breathing, considering their reported Activity Level (${profile.activityLevel}) and Stress Level (${profile.stressLevel}).",
          "poses": [
            {
              "name": "Yoga pose or Pranayama name",
              "duration": "E.g., 5-10 minutes",
              "benefits": "How it helps balance their dominant ${dominant} energy and their stress/activity level.",
              "illustrationStyle": "Description of the posture pose visual for a digital graphic."
            }
          ]
        },
        "lifestyle": {
          "description": "Custom routine adaptations focused on correcting deficiencies like sleep (${profile.sleepHours}h) and hydration (${profile.waterIntake}L).",
          "dailyRoutine": [
            { "time": "E.g., 06:00 AM", "activity": "Waking routine detail", "benefit": "Ayurvedic health benefit" },
            { "time": "E.g., 12:30 PM", "activity": "Noon routine detail", "benefit": "Ayurvedic health benefit" },
            { "time": "E.g., 09:30 PM", "activity": "Evening routine detail", "benefit": "Ayurvedic health benefit" }
          ]
        },
        "riskInsights": {
          "lifestyleAnalysis": "Critical analysis of how their stress level, sleep, activity, and weight/BMI interact with their dominant Dosha.",
          "healthRiskIndicators": ["At least 3 risk indicators based on Ayurvedic pathophysiology (e.g. dry joints for high-vata, acid reflux for high-pitta, fluid lethargy for high-kapha) combined with their reported profile."],
          "preventiveTips": ["At least 3 practical preventive habits or herbs (like Ashwagandha, Triphala, Shatavari) suitable for their profile."]
        }
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an expert Ayurvedic Doctor and Health Intelligence Platform. Analyze profiles and return detailed, tailored, and constructive wellness guides strictly in JSON. Never include markdown code fences in your JSON output.",
      },
    });

    const text = response.text || "";
    const cleanJsonText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedRecommendations = JSON.parse(cleanJsonText);

    return res.json({
      success: true,
      balance,
      isAiDriven: true,
      recommendations: parsedRecommendations
    });
  } catch (error) {
    console.error("Gemini API call failed for predict-dosha. Falling back:", error);
    return res.json({
      success: true,
      balance,
      isAiDriven: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Chatbot assistant route
app.post("/api/ayurveda/chat", async (req, res) => {
  const { message, history, profile, balance } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (!ai) {
    // Offline local simulation
    const replies = [
      "Ayurveda teaches us that balance is not a static state, but a dynamic dance with nature. How can I help you optimize your daily routine today?",
      "To balance Vata, embrace warmth, hydration, and grounding routines. For Pitta, prioritize cooling foods, sweet fruits, and soft meditation. For Kapha, ignite your fire with daily movement and stimulating spices.",
      "That is a great question. Drinking warm ginger water is excellent for igniting your digestive fire (Agni) and helping clear slow metabolic toxins (Ama) from your system.",
      "Connecting with your Ayurvedic Digital Twin allows you to visualize your energetic balance in real time. Try clicking on different bodily parts of your twin on the dashboard!"
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    return res.json({ reply: `[Local Ayurvedic Advisor] ${randomReply}` });
  }

  try {
    // Construct chat instruction using User Profile and Dosha Balance
    const systemIns = `
      You are the Intelligent Ayurvedic AI Assistant & Health Digital Twin Coach.
      You help the user understand their Ayurvedic Constitution and improve their wellbeing.
      
      User Information:
      - Name: ${profile?.name || "Guest User"}
      - Age: ${profile?.age || "N/A"}
      - Gender: ${profile?.gender || "N/A"}
      - BMI: ${profile?.bmi || "N/A"} (Weight: ${profile?.weight || "N/A"} kg, Height: ${profile?.height || "N/A"} cm)
      - Daily Sleep: ${profile?.sleepHours || "N/A"} hours
      - Daily Water: ${profile?.waterIntake || "N/A"} Liters
      - Stress Level: ${profile?.stressLevel || "N/A"}
      
      Current Dosha Balance:
      - Vata: ${balance?.vata || 33}%
      - Pitta: ${balance?.pitta || 33}%
      - Kapha: ${balance?.kapha || 34}%
      - Dominant: ${balance?.dominant || "Balanced"}

      Always remain exceptionally warm, compassionate, knowledgeable, and professional.
      Incorporate specific references to their profile data (like sleep, water intake, stress, or BMI) in your answers when relevant to give extremely personalized care!
      Refer to classical Ayurvedic concepts (like Agni, Ama, Dinacharya, Ojas, Prana, Gunas) but explain them in simple, scannable terms with bullet points.
      Do not prescribe drugs or replace medical diagnosis, keep the tone informative and wellness-oriented. Keep replies highly scannable and medium-length.
    `;

    // Map history to standard contents structure
    const chatContents = [];
    if (history && history.length > 0) {
      for (const msg of history) {
        chatContents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    // Add current message
    chatContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatContents,
      config: {
        systemInstruction: systemIns,
        temperature: 0.7,
      }
    });

    return res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API call failed for chat. Falling back:", error);
    return res.json({
      reply: "I am having trouble connecting to the cosmic intelligence server right now, but let's remember: to balance your mind, focus on gentle diaphragmatic breathing (Pranayama) and stay beautifully hydrated with warm herbal teas.",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});


// ----------------------------------------------------
// VITE OR STATIC ASSETS SERVING MIDDLEWARE
// ----------------------------------------------------
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware loaded.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static built assets from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Ayurvedic Digital Twin server listening on port ${PORT}`);
  });
}

initializeServer();
