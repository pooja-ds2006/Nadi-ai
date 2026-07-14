import { QuizQuestion, ProgressDataPoint, PersonalizedRecommendations, DigitalTwinStatus, DoshaType } from "./types";

export const AYURVEDIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    category: "Body Frame & Physical Build",
    questionText: "How would you describe your general physical build and bone structure?",
    options: [
      {
        text: "Lean, thin, tall or short, with prominent joints and difficulty gaining weight.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Medium, athletic, well-proportioned, easy to maintain or gain/lose muscle.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Large, broad-shouldered, sturdy, with a tendency to easily gain and hold weight.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q2",
    category: "Skin Texture & Appearance",
    questionText: "What is your skin's natural behavior and texture?",
    options: [
      {
        text: "Dry, rough, thin, cool to the touch, and prone to cracking or ashiness.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Warm, oily in zones, prone to redness, acne, freckles, or easily sunburnt.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Thick, smooth, soft, moist, slightly pale, and slow to age or wrinkle.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q3",
    category: "Appetite & Digestion",
    questionText: "How would you describe your appetite and digestive consistency?",
    options: [
      {
        text: "Irregular, unpredictable; sometimes very hungry, other times bloated or constipated.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Intense and strong; cannot skip meals without feeling irritable or acid-refluxed.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Steady but slow; moderate appetite, digests slowly, feels heavy after eating.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q4",
    category: "Sleep Quality & Patterns",
    questionText: "Which statement best describes your typical sleep cycle?",
    options: [
      {
        text: "Light, easily disrupted, wakes up often, experiences restless or vivid dreams.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Moderate, sound sleep; usually gets 6-7 hours and wakes up feeling alert and active.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Deep, heavy, long sleep; hard to wake up, loves to sleep-in and feels groggy.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q5",
    category: "Weather & Temp Preference",
    questionText: "What kind of weather or climate makes you feel most comfortable?",
    options: [
      {
        text: "Warm, humid weather; I absolutely dislike cold, dry, or windy conditions.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Cool, fresh weather; I sweat easily and strongly dislike extreme heat and sun.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Warm, dry weather; I am comfortable in most climates but feel congested in cold damp.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q6",
    category: "Activity Level & Energy",
    questionText: "How would you describe your physical speed and natural energy bursts?",
    options: [
      {
        text: "Fast-paced; highly active in spurts, fatigues easily, and moves or talks quickly.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Goal-oriented, intense, and competitive; works hard with focused stamina.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Steady, slow-moving, calm; possesses great endurance but has slow starting inertia.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q7",
    category: "Mind & Memory Style",
    questionText: "How do you learn new concepts and store memories?",
    options: [
      {
        text: "Learns very quickly but forgets quickly; mind is always busy with multiple thoughts.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Sharp, analytical, and logical; remembers details well, especially structured concepts.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Takes time to learn or grasp, but once understood, retains it forever in deep memory.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q8",
    category: "Stress & Emotional Nature",
    questionText: "Under high stress or pressure, how do you naturally react?",
    options: [
      {
        text: "Becomes anxious, worried, nervous, and tends to overthink or lose sleep.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Becomes irritable, angry, impatient, critical, or aggressive.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Remains calm, silent, slow to react, or avoids the issue through withdrawl.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q9",
    category: "Habitual Preferences",
    questionText: "How do you manage tasks, organization, and finances?",
    options: [
      {
        text: "Spontaneous; spends on impulse, starts many projects but struggles to finish them.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Systematic; plans spending carefully, organizes schedules, and finishes goals aggressively.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Hoarding or saving; dislikes letting go of things, saves money easily, is slow to act.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
  {
    id: "q10",
    category: "Physical Hair & Eyes",
    questionText: "How would you characterize your eyes and hair naturally?",
    options: [
      {
        text: "Dry, frizzy, brittle dark hair; small, dry, or unsteady eyes that blink frequently.",
        vataScore: 3,
        pittaScore: 0,
        kaphaScore: 0,
      },
      {
        text: "Straight, fine, light-colored or reddish hair; sharp, sensitive, medium-sized eyes.",
        vataScore: 0,
        pittaScore: 3,
        kaphaScore: 0,
      },
      {
        text: "Thick, wavy, glossy, abundant hair; large, moist, beautiful eyes with thick lashes.",
        vataScore: 0,
        pittaScore: 0,
        kaphaScore: 3,
      },
    ],
  },
];

export const MOCK_PROGRESS_HISTORY: ProgressDataPoint[] = [
  { date: "May 1", vata: 35, pitta: 45, kapha: 20, weight: 72.4, sleepHours: 6.5, wellnessScore: 78 },
  { date: "May 15", vata: 32, pitta: 43, kapha: 25, weight: 71.8, sleepHours: 7.0, wellnessScore: 82 },
  { date: "Jun 1", vata: 40, pitta: 38, kapha: 22, weight: 71.2, sleepHours: 6.8, wellnessScore: 80 },
  { date: "Jun 15", vata: 28, pitta: 42, kapha: 30, weight: 70.9, sleepHours: 7.2, wellnessScore: 85 },
  { date: "Jul 1", vata: 26, pitta: 44, kapha: 30, weight: 70.5, sleepHours: 7.5, wellnessScore: 87 },
];

export const FALLBACK_RECOMMENDATIONS: Record<DoshaType, PersonalizedRecommendations> = {
  [DoshaType.VATA]: {
    diet: {
      description: "Vata is balanced by warm, heavy, grounding, moist, sweet, sour, and salty foods. Restrict cold, dry, light, bitter, and astringent foods.",
      foodsToInclude: ["Warm cooked grains (oatmeal, rice)", "Ghee, avocado, sesame oil", "Sweet juicy fruits (bananas, mangoes)", "Spices: ginger, cinnamon, cardamom"],
      foodsToAvoid: ["Raw cold salads", "Dry crackers, popcorn", "Iced drinks, carbonated water", "Caffeine, dry beans"],
      recipes: [
        {
          name: "Golden Cardamom Rice Kheer",
          ingredients: ["1 cup Basmati rice", "4 cups whole almond milk", "2 tbsp Ghee", "4 pods crushed cardamom", "1 pinch saffron threads", "3 tbsp maple syrup or jaggery"],
          instructions: "Rinse rice. Heat ghee in a deep saucepan, add cardamom and sauté. Add rice and almond milk, bring to a gentle boil. Reduce heat to low and simmer for 35 mins, stirring occasionally until creamy. Stir in saffron and sweetener. Serve warm for optimal grounding.",
        },
        {
          name: "Nourishing Ginger Lentil Stew",
          ingredients: ["1 cup split mung dahl", "4 cups warm water", "1 tbsp fresh grated ginger", "1 tsp cumin seeds", "1/2 tsp turmeric powder", "1 cup chopped sweet potato"],
          instructions: "Heat a little oil or ghee in a pot, toast cumin seeds and ginger. Add sweet potato and dahl. Stir in water and turmeric. Cover and cook on low for 25-30 minutes until lentils are fully dissolved. Season with salt and cilantro.",
        }
      ],
    },
    yoga: {
      description: "A calming, slow, grounding practice focused on building stability, strength, and rhythmic breathing to reduce Vata's flighty nature.",
      poses: [
        { name: "Balasana (Child's Pose)", duration: "3-5 minutes", benefits: "Instantly grounds the nervous system and quietens a busy mind.", illustrationStyle: "Inward fold, forehead resting on the floor, heavy hips." },
        { name: "Vrikshasana (Tree Pose)", duration: "1-2 minutes per side", benefits: "Builds absolute physical and emotional balance, focusing the gaze.", illustrationStyle: "One-foot stand, hands joined in prayer at the chest, rooting downward." },
        { name: "Savasana (Corpse Pose with weight)", duration: "10 minutes", benefits: "Deep restoration; placing a warm weighted blanket on the belly helps pacify air.", illustrationStyle: "Lying flat, palms up, absolute surrender." }
      ],
    },
    lifestyle: {
      description: "Establish a strict daily routine (Dinacharya) to counteract Vata's inherent irregularity. Consistency is key.",
      dailyRoutine: [
        { time: "6:00 AM", activity: "Wake up, drink 2 cups of warm water with lemon to stimulate digestion.", benefit: "Hydrates and flushes night-time toxins." },
        { time: "7:00 AM", activity: "Abhyanga (Self-massage with warm sesame oil) followed by a warm bath.", benefit: "Soothes the nervous system and keeps skin supple." },
        { time: "12:00 PM", activity: "Have a warm, substantial lunch in a calm, distraction-free environment.", benefit: "Supports irregular digestive power (Agni)." },
        { time: "9:30 PM", activity: "Digital detox, warm milk with nutmeg, and soft meditation.", benefit: "Promotes deep, sound sleep." }
      ],
    },
    riskInsights: {
      lifestyleAnalysis: "Your fast-paced activity and irregular eating patterns put you at risk of nervous exhaustion, digestive bloating, and dry joints.",
      healthRiskIndicators: ["High anxiety and mental restlessness", "Insomnia or interrupted sleep", "Chronic digestive gas or constipation", "Frequent dry skin and cold extremities"],
      preventiveTips: ["Avoid multi-tasking; do one activity mindfully at a time.", "Stay away from cold breezes and dry cold raw foods.", "Use warm sesame oil ear drops and keep your feet cozy.", "Engage in warm, slow breathing (Nadi Shodhana)."]
    }
  },
  [DoshaType.PITTA]: {
    diet: {
      description: "Pitta is balanced by cool, refreshing, sweet, bitter, and astringent foods. Restrict spicy, sour, salty, oily, and fermented foods.",
      foodsToInclude: ["Cooling fruits (sweet grapes, melons, pears)", "Coriander, mint, fennel, coconut water", "Sweet cream, butter, sunflower seeds", "Leafy green vegetables, broccoli, cucumber"],
      foodsToAvoid: ["Chili peppers, hot sauce, garlic, raw onions", "Pickles, vinegar, fermented cheese", "Sour citrus fruits, tomatoes", "Fried foods, alcohol, excessive dark chocolate"],
      recipes: [
        {
          name: "Refreshing Coconut Mint Kitchari",
          ingredients: ["1/2 cup white basmati rice", "1/2 cup yellow mung dahl", "3 tbsp unsweetened shredded coconut", "1/2 cup fresh mint leaves", "1 tsp fennel seeds", "1 tsp coriander seeds", "3 cups water"],
          instructions: "Rinse dahl and rice. Blend coconut, mint and a little water into a paste. In a pot, warm coconut oil, lightly toast fennel and coriander seeds. Add rice, dahl, blended mint-coconut paste and water. Bring to a boil, then cook covered on low for 25 minutes. Garnish with lime.",
        },
        {
          name: "Sweet Pear & Fennel Slaw",
          ingredients: ["2 sweet ripe pears, thinly sliced", "1 fennel bulb, shaved", "2 tbsp pumpkin seeds toasted", "1 tbsp fresh mint", "1 tbsp maple-lime dressing"],
          instructions: "Combine sliced pears, shaved fennel, toasted pumpkin seeds, and fresh mint in a bowl. Drizzle with a gentle mixture of lime juice and maple syrup. Serves as a perfect cooling appetizer."
        }
      ],
    },
    yoga: {
      description: "A cooling, non-competitive, relaxed practice that avoids generating excess heat. Focus on lateral stretching and heart-opening poses.",
      poses: [
        { name: "Sheetali Pranayama (Cooling Breath)", duration: "5-10 rounds", benefits: "Instantly lowers internal temperature and calms anger or irritation.", illustrationStyle: "Seated upright, tongue curled like a straw, inhaling cool air." },
        { name: "Bhujangasana (Cobra Pose)", duration: "1-2 minutes", benefits: "Opens the solar plexus, releasing built-up tension and heat.", illustrationStyle: "Prone backbend, gentle elbow bend, chest lifting toward sky." },
        { name: "Chandra Namaskar (Moon Salutation)", duration: "3-5 slow rounds", benefits: "Cooling and fluid alternative to the heating Sun Salutation.", illustrationStyle: "Flowing lateral movements with grace and breath coordination." }
      ],
    },
    lifestyle: {
      description: "A lifestyle focused on moderate effort, cooling relaxation, and playful recreation without strict outcome orientation.",
      dailyRoutine: [
        { time: "6:30 AM", activity: "Wake up and drink room-temperature mint water or coconut water.", benefit: "Clears residual stomach heat and acid." },
        { time: "7:30 AM", activity: "Massage with cooling coconut oil or sandalwood oil.", benefit: "Protects sensitive skin from inflammation." },
        { time: "1:00 PM", activity: "Substantial lunch; enjoy sweet, bitter, and astringent greens.", benefit: "Satisfies high Pitta digestive fire (Agni)." },
        { time: "6:00 PM", activity: "Take a walk in nature near a body of water or under the evening moonlight.", benefit: "Incredibly soothing and pacifying for fiery emotions." }
      ],
    },
    riskInsights: {
      lifestyleAnalysis: "Your drive for perfection and love of spicy foods can overheat your blood, leading to skin inflammation, acid reflux, and burnout.",
      healthRiskIndicators: ["Skin rashes, hives, or inflammatory acne", "Acid reflux, heartburn, or ulcers", "Short temper, irritability, and critical outbursts", "Excessive sweating and body heat"],
      preventiveTips: ["Avoid working during traditional lunch hours; rest and eat.", "Minimize exposure to direct hot afternoon sun.", "Practice compassion over criticism for yourself and others.", "Avoid spicy condiments; use coriander and fennel spices instead."]
    }
  },
  [DoshaType.KAPHA]: {
    diet: {
      description: "Kapha is balanced by warm, light, dry, spicy, bitter, and astringent foods. Restrict heavy, cold, oily, sweet, sour, and salty foods.",
      foodsToInclude: ["Spicy ginger tea, black pepper, cayenne", "Light grains: quinoa, millet, buckwheat", "Plenty of leafy greens, cabbage, garlic", "Astringent fruits: apples, pomegranates, berries"],
      foodsToAvoid: ["Cold dairy products, cheese, yogurt, ice cream", "Processed sugar, heavy wheat, sweet pastries", "Oily deep-fried foods, heavy red meat", "Salt and high water-retention foods"],
      recipes: [
        {
          name: "Spiced Quinoa & Mustard Greens",
          ingredients: ["1 cup dry quinoa", "2 cups vegetable stock", "1 bunch mustard greens, chopped", "1 tsp mustard seeds", "1/2 tsp cayenne pepper", "1 pinch black pepper", "1 tbsp lemon juice"],
          instructions: "Rinse quinoa. Toast mustard seeds in a dry pan until they pop. Add quinoa, vegetable stock, cayenne, and black pepper. Bring to a boil, then simmer on low for 15 mins. Toss in chopped mustard greens for the last 5 mins to steam. Drizzle with lemon juice.",
        },
        {
          name: "Zesty Ginger Pomegranate Elixir",
          ingredients: ["1 cup fresh pomegranate juice", "1 tbsp fresh ginger juice", "1/2 tsp black pepper", "1 tsp raw honey (added only when cool)"],
          instructions: "Warm the pomegranate juice slightly (do not boil). Stir in the fresh ginger juice and a pinch of black pepper. Let cool to lukewarm, then stir in raw honey. Drink to fire up a sluggish metabolism."
        }
      ],
    },
    yoga: {
      description: "An active, heating, and invigorating practice to break up stagnation, increase circulation, and boost physical motivation.",
      poses: [
        { name: "Surya Namaskar (Sun Salutation)", duration: "8-12 rounds, moderate pace", benefits: "Ignites metabolic fire, increases heartbeat, and expels excess congestion.", illustrationStyle: "Dynamic flowing sequence of 12 postures, generating heat." },
        { name: "Virabhadrasana II (Warrior Pose II)", duration: "2 minutes per side", benefits: "Builds immense focus, inner strength, and expands chest capacity.", illustrationStyle: "Lunge stance, arms stretched wide, looking with focus over the fingers." },
        { name: "Dhanurasana (Bow Pose)", duration: "3-5 deep breaths", benefits: "Massages abdominal organs and stimulates sluggish thyroid glands.", illustrationStyle: "Prone pose, holding ankles, lifting thighs and chest off the ground." }
      ],
    },
    lifestyle: {
      description: "A stimulating lifestyle focused on activity, regular exercise, seeking new experiences, and waking up early.",
      dailyRoutine: [
        { time: "5:30 AM", activity: "Wake up early before sunrise (do not sleep-in). Drink hot ginger tea.", benefit: "Avoids morning stagnation and sluggishness." },
        { time: "6:30 AM", activity: "Dry dry-brushing massage (Garshana) followed by vigorous cardio.", benefit: "Stimulates lymphatic drainage and burns fat." },
        { time: "1:00 PM", activity: "Eat a light lunch of heated soup, grains, and spicy lentils.", benefit: "Boosts slow digestive system." },
        { time: "10:00 PM", activity: "Light evening walk and early to bed (avoid heavy sleeping).", benefit: "Prevents fat accumulation and lethargy." }
      ],
    },
    riskInsights: {
      lifestyleAnalysis: "Your sedentary habits and sweet-tooth can cause water retention, sluggish metabolism, breathing congestion, and emotional attachment.",
      healthRiskIndicators: ["Weight gain and stubborn fluid retention", "Frequent chest congestion, sinus issues, or allergies", "Lethargy, daytime drowsiness, and depression", "Possessiveness and resistance to change"],
      preventiveTips: ["Engage in daily high-intensity physical exercise.", "Avoid heavy midday naps; they instantly aggravate sluggishness.", "Introduce variety and spontaneous activities into your week.", "Use spices like ginger, cayenne, and black pepper in every meal."]
    }
  }
};

export const DIGITAL_TWIN_MAPPING: Record<DoshaType, DigitalTwinStatus> = {
  [DoshaType.VATA]: {
    head: "Highly active neural patterns. Prone to busy thinking, racing thoughts, insomnia, and nervous sensitivity. Light-weight crown chakra flow.",
    chest: "Rapid, superficial breathing. Strong respiratory responsiveness. Prone to dry throat and speech anxiety under stress.",
    gut: "Irregular digestive fires. Prone to sudden gas, bloating, and food sensitivity. Needs warm grounding nutrition.",
    joints: "Prone to coldness, dryness, and cracking sounds. Light bone structure. Requires lubrication via healthy fats.",
    skin: "Dry, cool, and thin skin. Sensitive to dry winter winds and air conditioning. Needs regular oil massage.",
    energyLevel: 65,
    wellnessScore: 78
  },
  [DoshaType.PITTA]: {
    head: "Sharp focus and analytical clarity. Strong vision. Can trigger red eyes, headaches from skipping meals, or irritable temper.",
    chest: "Steady, energetic heartbeat and powerful lung volume. Warm emotional nature prone to intense passionate states.",
    gut: "Hyper-acidic digestive fire (Agni). Prone to stomach acid, quick food digestion, and sharp hot hunger pains.",
    joints: "Flexible, medium joints. Generates physical heat and sweats easily during movement. Moderate endurance.",
    skin: "Warm, oily in T-zone, prone to inflammation, rashes, or freckles. Needs cooling protective oils.",
    energyLevel: 85,
    wellnessScore: 84
  },
  [DoshaType.KAPHA]: {
    head: "Calm, tranquil mind. Patient and emotionally stable. Tends to sluggishness, over-sleeping, and long attachment.",
    chest: "Heavy breathing capacity, prone to fluid congestion, chest phlegm, and morning allergies. Strong immunity.",
    gut: "Slow, heavy digestion. Experiences slow transit and needs warming spices to trigger metabolic fire.",
    joints: "Thick, strong, and well-lubricated joints with heavy bones. Exceptional endurance and muscular stability.",
    skin: "Thick, soft, smooth, moist skin. Prone to oiliness and slow to wrinkle or age.",
    energyLevel: 75,
    wellnessScore: 80
  }
};
