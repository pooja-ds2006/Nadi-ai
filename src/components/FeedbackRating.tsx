import React, { useState } from "react";
import { Star, MessageSquareCode, Sparkles, CheckCircle } from "lucide-react";

interface FeedbackRatingProps {
  onFeedbackSubmit: (rating: number, message: string) => void;
  savedFeedback: { rating: number; message: string; submitted: boolean } | null;
}

export default function FeedbackRating({ onFeedbackSubmit, savedFeedback }: FeedbackRatingProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onFeedbackSubmit(rating, message);
  };

  return (
    <div className="border border-[#141414] bg-white p-5 rounded-none text-[#141414]">
      {savedFeedback?.submitted ? (
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center border border-[#141414] bg-[#E4E3E0] text-[#141414] rounded-none">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-tight text-[#141414]">
              Feedback Submitted. Dhanyavaad!
            </h4>
            <p className="text-[11px] text-[#141414]/70 mt-1 max-w-xs leading-relaxed mx-auto font-sans">
              We appreciate your wisdom. Your contribution has been saved to improve the Ayurvedic digital twin calibration logic.
            </p>
          </div>
          <div className="border border-[#141414] bg-[#E4E3E0]/20 p-3 max-w-sm w-full rounded-none">
            <div className="flex justify-center gap-1.5 mb-2 text-[#141414]">
              {Array.from({ length: savedFeedback.rating }).map((_, idx) => (
                <Star key={idx} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#141414] italic font-sans font-medium">
              "{savedFeedback.message}"
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#141414] pb-3">
            <div className="flex items-center gap-2">
              <MessageSquareCode className="h-5 w-5 text-[#141414]" />
              <h4 className="font-sans text-sm font-bold uppercase tracking-tight text-[#141414]">
                Feedback & Improvement System
              </h4>
            </div>
            <Sparkles className="h-4 w-4 text-[#141414]" />
          </div>

          <p className="text-xs text-[#141414]/80 leading-relaxed font-sans">
            Rate your health calibration insights. Help us improve the digital twin alignment engine!
          </p>

          {/* Interactive Star Rating */}
          <div className="flex items-center gap-2.5 border border-[#141414]/20 bg-[#E4E3E0]/15 p-3 rounded-none justify-center">
            <span className="text-xs font-bold font-mono uppercase text-[#141414]/80">Your Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                   key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 text-[#141414] transition-all hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`h-5 w-5 ${
                      (hoverRating !== null ? star <= hoverRating : star <= rating)
                        ? "fill-current text-[#141414]"
                        : "text-[#141414]/20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review text */}
          <div>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#141414] bg-white px-3.5 py-2.5 text-xs text-[#141414] placeholder-[#141414]/40 focus:outline-none focus:ring-0 rounded-none resize-none"
              placeholder="What did you think of your predicted Dosha? Suggest recipes, exercises, or visual insights to enrich the twin dashboard..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#141414] border border-[#141414] py-2.5 text-xs font-bold font-mono uppercase text-white hover:bg-[#2a2a2a] cursor-pointer rounded-none"
          >
            Submit Feedback Review
          </button>
        </form>
      )}
    </div>
  );
}
