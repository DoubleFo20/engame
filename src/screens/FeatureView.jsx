// src/screens/FeatureView.jsx
import React, { useState, useEffect } from "react";
import { Volume2, Plus, X, Settings, HelpCircle } from "lucide-react";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import FlashcardsScreen from "@/screens/FlashcardsScreen";
import SpellingScreen from "@/screens/SpellingScreen";
import SpeakingScreen from "@/screens/SpeakingScreen";
import RoleplayScreen from "@/screens/RoleplayScreen";
import QuizView from "@/screens/QuizScreen";
import MyVocabView from "@/screens/MyVocabView";
import ProgressScreen from "@/screens/ProgressScreen";
import { speakWord } from "@/utils/speech";

export default function FeatureView({
  activeFeature,
  selectedChar,
  setScreen,
  addToVocab,
  removeFromVocab,
  myVocab,
  addXP,
  earnedXP,
  setEarnedXP,
  flashcardIndex,
  setFlashcardIndex,
  level,
  xp,
}) {
  // ✅ All hooks declared at top level (React Rules of Hooks)
  const [activeSpot, setActiveSpot] = useState(null);
  const [flashcardFlip, setFlashcardFlip] = useState(false);

  // Reset state when switching features
  useEffect(() => {
    setActiveSpot(null);
    setFlashcardIndex(0); // Fix: Reset the actual global flashcard index
    setFlashcardFlip(false);
  }, [activeFeature]);

  // Hotspots
  if (activeFeature === "hotspots") {
    return (
      <div className="h-full flex flex-col relative">
        <Header
          title={selectedChar.name}
          subtitle={
            <span>
              Hotspots
              {earnedXP > 0 && (
                <span className="text-emerald-400 ml-2">+{earnedXP} XP</span>
              )}
            </span>
          }
          showBack
          onBack={() => setScreen("char-select")}
        />
        <div className="flex-1 relative bg-slate-900 flex items-center justify-center overflow-hidden">
          <img
            src={selectedChar.img}
            className="w-full h-full object-cover opacity-60"
          />
          {selectedChar.hotspots.map((hs) => (
            <button
              key={hs.id}
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              onClick={() => setActiveSpot(hs)}
              className="absolute w-8 h-8 -ml-4 -mt-4 bg-blue-500/80 border-2 border-white rounded-full animate-pulse flex items-center justify-center shadow-[0_0_15px_blue]"
            >
              <Plus className="text-white" size={14} />
            </button>
          ))}
        </div>
        {activeSpot && (
          <div className="bg-slate-800 p-6 rounded-t-3xl animate-fade-in border-t border-slate-700 z-40 absolute bottom-0 w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] bg-blue-900 text-blue-300 px-2 py-1 rounded uppercase">
                  {activeSpot.type}
                </span>
                <h2 className="text-3xl font-black text-white mt-1">
                  {activeSpot.word}
                </h2>
                <p className="text-slate-400 font-thai">{activeSpot.mean}</p>
              </div>
              <button
                onClick={() => setActiveSpot(null)}
                className="p-2 bg-slate-700 rounded-full text-white"
              >
                <X />
              </button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                icon={Volume2}
                onClick={() => speakWord(activeSpot.word)}
              >
                Listen
              </Button>
              <Button
                variant="success"
                className="flex-1"
                icon={Plus}
                onClick={async () => {
                  if (await addToVocab(activeSpot)) {
                    setEarnedXP(prev => prev + 20);
                  } else {
                    alert("Already saved");
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Flashcards - ใช้ FlashcardsScreen component
  if (activeFeature === "flashcards") {
    return (
      <FlashcardsScreen
        key={`flashcards-${selectedChar?.id || 'default'}`}
        selectedChar={selectedChar}
        setScreen={setScreen}
        addToVocab={addToVocab}
        myVocab={myVocab}
        addXP={addXP}
        earnedXP={earnedXP}
        setEarnedXP={setEarnedXP}
        cardIndex={flashcardIndex}
        setCardIndex={setFlashcardIndex}
      />
    );
  }

  // Quiz
  if (activeFeature === "quiz") {
    return (
      <QuizView
        selectedChar={selectedChar}
        onBack={() => setScreen("char-select")}
        addXP={addXP}
      />
    );
  }

  // Spelling
  if (activeFeature === "spelling") {
    return (
      <SpellingScreen
        selectedChar={selectedChar}
        setScreen={setScreen}
        addXP={addXP}
      />
    );
  }

  // Speaking
  if (activeFeature === "speaking") {
    return (
      <SpeakingScreen
        selectedChar={selectedChar}
        setScreen={setScreen}
        addXP={addXP}
      />
    );
  }

  // Role-play
  if (activeFeature === "roleplay") {
    return (
      <RoleplayScreen
        selectedChar={selectedChar}
        setScreen={setScreen}
        addXP={addXP}
      />
    );
  }

  // My Vocab
  if (activeFeature === "my-vocab") {
    return (
      <MyVocabView
        myVocab={myVocab}
        removeFromVocab={removeFromVocab}
        onBack={() => setScreen("rov-hub")}
      />
    );
  }

  // Progress
  if (activeFeature === "progress") {
    return (
      <ProgressScreen
        level={level}
        xp={xp}
        myVocab={myVocab}
        onBack={() => setScreen("rov-hub")}
      />
    );
  }

  // Default Placeholder
  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-950 text-center p-6">
      <Header
        title={activeFeature}
        subtitle="Coming Soon"
        showBack
        onBack={() =>
          selectedChar ? setScreen("char-select") : setScreen("rov-hub")
        }
      />
      <Settings size={64} className="text-slate-600 mb-4" />
      <h2 className="text-xl font-bold text-white">Mode: {activeFeature}</h2>
      <p className="text-slate-400 mb-6">Under Construction</p>
    </div>
  );
}
