// src/screens/FlashcardsScreen.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2, Plus, Check, Shuffle, RotateCcw } from "lucide-react";
import Header from "@/components/ui/Header";

/**
 * Speak a word using Web Speech API
 */
function speakWord(word) {
  if ("speechSynthesis" in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser doesn't support text-to-speech.");
  }
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FlashcardsScreen({
  selectedChar,
  setScreen,
  addToVocab,
  myVocab = [],
  addXP,
  earnedXP = 0,
  setEarnedXP = () => { },
  cardIndex = 0,
  setCardIndex = () => { },
}) {
  // Flip state
  const [isFlipped, setIsFlipped] = useState(false);

  // Shuffle mode
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  // Animation states
  const [justSaved, setJustSaved] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);

  // Get cards (original or shuffled)
  const cards = useMemo(() => {
    if (!selectedChar?.hotspots) return [];
    return isShuffled ? shuffledCards : selectedChar.hotspots;
  }, [selectedChar, isShuffled, shuffledCards]);

  const currentCard = cards[cardIndex];
  const totalCards = cards.length;

  // Check if current card is already saved
  const isAlreadySaved = currentCard && myVocab.some((w) => w.id === currentCard.id);

  // Reset flip when changing cards
  useEffect(() => {
    setIsFlipped(false);
    setJustSaved(false);
  }, [cardIndex]);

  // Initialize shuffled cards when entering shuffle mode
  useEffect(() => {
    if (isShuffled && selectedChar?.hotspots) {
      setShuffledCards(shuffleArray(selectedChar.hotspots));
      setCardIndex(0);
    }
  }, [isShuffled, selectedChar]);

  // Handle navigation
  const goNext = () => {
    if (cardIndex < totalCards - 1) {
      setSlideDirection("left");
      setTimeout(() => {
        setCardIndex(cardIndex + 1);
        setSlideDirection(null);
      }, 150);
    }
  };

  const goPrev = () => {
    if (cardIndex > 0) {
      setSlideDirection("right");
      setTimeout(() => {
        setCardIndex(cardIndex - 1);
        setSlideDirection(null);
      }, 150);
    }
  };

  // Handle save to vocab
  const handleSave = async () => {
    if (currentCard && addToVocab) {
      const saved = await addToVocab(currentCard);
      if (saved) {
        setJustSaved(true);
        setEarnedXP(prev => prev + 20);
      }
    }
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    setCardIndex(0);
  };

  // Reset to beginning
  const resetCards = () => {
    setCardIndex(0);
    setIsFlipped(false);
  };

  // Handle back
  const handleBack = () => {
    setScreen("char-select");
  };

  // Empty state
  if (!selectedChar || !currentCard) {
    return (
      <div className="h-full flex flex-col bg-slate-950">
        <Header
          title="Flashcards"
          subtitle="No cards available"
          showBack
          onBack={handleBack}
        />
        <div className="flex-1 flex items-center justify-center text-slate-400">
          This hero has no vocabulary yet.
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header */}
      <Header
        title="Flashcards"
        subtitle={
          <span>
            {selectedChar.name} · Card {cardIndex + 1} of {totalCards}
            {earnedXP > 0 && (
              <span className="text-emerald-400 ml-2">+{earnedXP} XP</span>
            )}
          </span>
        }
        showBack
        onBack={handleBack}
      />

      {/* Controls Bar */}
      <div className="px-4 py-2 flex justify-center gap-2">
        <button
          onClick={toggleShuffle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isShuffled
            ? "bg-purple-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
        >
          <Shuffle size={14} />
          {isShuffled ? "Shuffled" : "Shuffle"}
        </button>
        <button
          onClick={resetCards}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex items-center justify-center px-6 perspective-1000">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`
            w-full max-w-xs aspect-[3/4] relative cursor-pointer
            flip-card transform-style-3d
            ${isFlipped ? "rotate-y-180" : ""}
            ${slideDirection === "left" ? "translate-x-[-20px] opacity-0" : ""}
            ${slideDirection === "right" ? "translate-x-[20px] opacity-0" : ""}
            transition-all duration-300
          `}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900" />

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
              {/* Type badge */}
              <span className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-[10px] font-bold text-purple-300 uppercase tracking-wider mb-4">
                {currentCard.type}
              </span>

              {/* Word */}
              <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
                {currentCard.word}
              </h2>

              {/* Audio button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(currentCard.word);
                }}
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              >
                <Volume2 className="text-white" size={24} />
              </button>

              {/* Hint */}
              <p className="absolute bottom-6 text-purple-300/60 text-xs animate-pulse">
                Tap card to flip
              </p>
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-900" />

            {/* Decorative */}
            <div className="absolute top-8 right-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl" />
            <div className="absolute bottom-4 left-8 w-16 h-16 bg-teal-500/10 rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
              {/* English word (smaller) */}
              <p className="text-sm text-emerald-300 uppercase tracking-wider mb-2">
                {currentCard.word}
              </p>

              {/* Thai meaning (large) */}
              <h2 className="text-3xl font-bold text-white mb-6 font-thai">
                {currentCard.mean}
              </h2>

              {/* Type badge */}
              <span className="px-3 py-1 bg-emerald-600/30 border border-emerald-500/50 rounded-full text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                {currentCard.type}
              </span>

              {/* Hint */}
              <p className="absolute bottom-6 text-emerald-300/60 text-xs">
                Tap to flip back
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-2">
        <div className="flex gap-1">
          {cards.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all ${idx === cardIndex
                ? "bg-purple-500"
                : idx < cardIndex
                  ? "bg-purple-500/50"
                  : "bg-slate-700"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex gap-3">
          {/* Prev Button */}
          <button
            onClick={goPrev}
            disabled={cardIndex === 0}
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isAlreadySaved || justSaved}
            className={`flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isAlreadySaved || justSaved
              ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50"
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
          >
            {isAlreadySaved || justSaved ? (
              <>
                <Check size={18} />
                Saved!
              </>
            ) : (
              <>
                <Plus size={18} />
                Save to Vocab
              </>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={goNext}
            disabled={cardIndex === totalCards - 1}
            className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
