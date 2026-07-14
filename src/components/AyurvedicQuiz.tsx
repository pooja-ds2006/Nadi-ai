import React, { useState } from "react";
import { QuizQuestion, QuizAnswer } from "../types";
import { AYURVEDIC_QUIZ_QUESTIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles, ChevronRight, ChevronLeft, RefreshCw, Compass } from "lucide-react";

interface AyurvedicQuizProps {
  onComplete: (answers: QuizAnswer[]) => void;
}

export default function AyurvedicQuiz({ onComplete }: AyurvedicQuizProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const currentQuestion = AYURVEDIC_QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    const existingIndex = updatedAnswers.findIndex((ans) => ans.questionId === currentQuestion.id);

    if (existingIndex > -1) {
      updatedAnswers[existingIndex] = {
        questionId: currentQuestion.id,
        selectedOptionIndex: optionIndex,
      };
    } else {
      updatedAnswers.push({
        questionId: currentQuestion.id,
        selectedOptionIndex: optionIndex,
      });
    }

    setAnswers(updatedAnswers);

    // Auto-advance to next question after a brief delay
    if (currentIndex < AYURVEDIC_QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 350);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < AYURVEDIC_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentAnswer = answers.find((ans) => ans.questionId === currentQuestion.id);

  const isQuizComplete = answers.length === AYURVEDIC_QUIZ_QUESTIONS.length;

  const handleSubmit = () => {
    if (isQuizComplete) {
      onComplete(answers);
    }
  };

  // Preset Auto-fill for quick evaluation testing
  const handleAutoFill = (type: "Vata" | "Pitta" | "Kapha" | "Balanced") => {
    const autoAnswers: QuizAnswer[] = AYURVEDIC_QUIZ_QUESTIONS.map((q, idx) => {
      let selectedOptionIndex = 0; // Default to option 1 (Vata)
      if (type === "Pitta") selectedOptionIndex = 1;
      if (type === "Kapha") selectedOptionIndex = 2;
      if (type === "Balanced") {
        selectedOptionIndex = idx % 3;
      }
      return {
        questionId: q.id,
        selectedOptionIndex,
      };
    });
    setAnswers(autoAnswers);
    setCurrentIndex(AYURVEDIC_QUIZ_QUESTIONS.length - 1);
  };

  return (
    <div className="mx-auto max-w-2xl border border-[#141414] bg-white p-6 text-[#141414]">
      {/* Quiz Progress Header */}
      <div className="mb-6 flex items-center justify-between border-b border-[#141414] pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#141414]" />
          <h2 className="font-sans text-base font-bold uppercase tracking-tight text-[#141414]">
            Ayurvedic Questionnaire
          </h2>
        </div>
        <span className="text-xs font-mono text-white bg-[#141414] px-2.5 py-1 border border-[#141414]">
          Question {currentIndex + 1} of {AYURVEDIC_QUIZ_QUESTIONS.length}
        </span>
      </div>

      {/* Progress Bar indicator */}
      <div className="mb-8 h-2 w-full bg-[#E4E3E0] border border-[#141414]">
        <div
          className="h-full bg-[#141414] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / AYURVEDIC_QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card Stage with Framer Motion slide effects */}
      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#141414]/60 font-mono">
                {currentQuestion.category}
              </span>
              <h3 className="mt-1 font-serif text-lg font-normal text-[#141414] leading-snug italic">
                {currentQuestion.questionText}
              </h3>
            </div>

            {/* Options list */}
            <div className="mt-4 flex flex-col gap-3">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = currentAnswer?.selectedOptionIndex === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left border p-4 text-sm font-sans leading-relaxed transition-all duration-150 cursor-pointer rounded-none ${
                      isSelected
                        ? "border-[#141414] bg-[#141414] text-white"
                        : "border-[#141414] bg-white text-[#141414] hover:bg-[#E4E3E0]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                        isSelected ? "border-white bg-[#141414] text-white" : "border-[#141414] text-[#141414]"
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span className="font-sans font-medium">{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Wizards Navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-[#141414] pt-5">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 border border-[#141414] bg-white px-4 py-2 text-xs font-bold font-mono uppercase text-[#141414] hover:bg-[#E4E3E0] disabled:opacity-30 disabled:pointer-events-none cursor-pointer rounded-none"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {currentIndex === AYURVEDIC_QUIZ_QUESTIONS.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!isQuizComplete}
            className="flex items-center gap-1.5 bg-[#141414] px-5 py-2 text-xs font-bold font-mono uppercase text-white hover:bg-[#2a2a2a] disabled:opacity-40 disabled:pointer-events-none cursor-pointer rounded-none border border-[#141414]"
          >
            Calculate Dosha Balance
            <Compass className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 border border-[#141414] bg-white px-4 py-2 text-xs font-bold font-mono uppercase text-[#141414] hover:bg-[#E4E3E0] cursor-pointer rounded-none"
          >
            Skip
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Developer Presets Shortcuts Section */}
      <div className="mt-8 border border-[#141414] bg-[#E4E3E0]/30 p-4 text-center rounded-none">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#141414] mb-2 font-mono uppercase">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Speed-Calibration Presets:</span>
        </div>
        <p className="text-[11px] text-[#141414]/70 mb-3 font-sans">
          Shortcut-fill questions to quickly inspect specific Dosha twin states.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => handleAutoFill("Vata")}
            className="border border-[#141414] bg-white px-2.5 py-1 text-[10px] text-[#141414] font-mono uppercase hover:bg-[#E4E3E0] cursor-pointer rounded-none"
          >
            Vata Preset
          </button>
          <button
            onClick={() => handleAutoFill("Pitta")}
            className="border border-[#141414] bg-white px-2.5 py-1 text-[10px] text-[#141414] font-mono uppercase hover:bg-[#E4E3E0] cursor-pointer rounded-none"
          >
            Pitta Preset
          </button>
          <button
            onClick={() => handleAutoFill("Kapha")}
            className="border border-[#141414] bg-white px-2.5 py-1 text-[10px] text-[#141414] font-mono uppercase hover:bg-[#E4E3E0] cursor-pointer rounded-none"
          >
            Kapha Preset
          </button>
          <button
            onClick={() => handleAutoFill("Balanced")}
            className="border border-[#141414] bg-white px-2.5 py-1 text-[10px] text-[#141414] font-mono uppercase hover:bg-[#E4E3E0] cursor-pointer rounded-none"
          >
            Tridoshic Balanced
          </button>
        </div>
      </div>
    </div>
  );
}
