// src/screens/SpellingScreen.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, Volume2, Zap, RotateCcw, Shuffle, Check, X } from "lucide-react";
import Header from "@/components/ui/Header";

/**
 * Speak a word using Web Speech API
 */
function speakWord(word) {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }
}

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function SpellingScreen({
    selectedChar,
    setScreen,
    addXP,
}) {
    // Word management
    const [wordIndex, setWordIndex] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [shuffledWords, setShuffledWords] = useState([]);

    // Input & game state
    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState(null); // 'correct' | 'wrong' | null
    const [showHint, setShowHint] = useState(false);
    const [streak, setStreak] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [earnedXP, setEarnedXP] = useState(0);

    const inputRef = useRef(null);
    const earnedXPRef = useRef(0);

    // Get words list
    const words = useMemo(() => {
        if (!selectedChar?.hotspots) return [];
        return isShuffled ? shuffledWords : selectedChar.hotspots;
    }, [selectedChar, isShuffled, shuffledWords]);

    const currentWord = words[wordIndex];
    const totalWords = words.length;
    const correctAnswer = currentWord?.word?.trim().toLowerCase() || "";

    // Focus input on mount and word change
    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [wordIndex]);

    // Reset state when word changes
    useEffect(() => {
        setUserInput("");
        setResult(null);
        setShowHint(false);
    }, [wordIndex]);

    // Initialize shuffled words
    useEffect(() => {
        if (isShuffled && selectedChar?.hotspots) {
            setShuffledWords(shuffleArray(selectedChar.hotspots));
            setWordIndex(0);
        }
    }, [isShuffled, selectedChar]);

    // Handle input change with real-time validation color
    const handleInputChange = (e) => {
        if (result) return; // Prevent input after answer

        const value = e.target.value;
        setUserInput(value);
    };

    // Check answer
    const handleSubmit = (e) => {
        e.preventDefault();
        if (result || !userInput.trim()) return;

        const userAnswer = userInput.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            setResult("correct");
            setStreak((s) => s + 1);
            setTotalCorrect((c) => c + 1);

            // XP: Base 15 + streak bonus (max 10)
            const xpGain = 15 + Math.min(streak * 2, 10);
            earnedXPRef.current += xpGain;
            setEarnedXP(earnedXPRef.current);

            speakWord(currentWord.word);
        } else {
            setResult("wrong");
            setStreak(0);
        }
    };

    // Next word
    const handleNext = () => {
        if (wordIndex < totalWords - 1) {
            setWordIndex(wordIndex + 1);
        } else {
            // Completed all words - flush XP and go back
            handleBack();
        }
    };

    // Show hint (first few letters)
    const handleShowHint = () => {
        setShowHint(true);
    };

    // Back button - flush XP
    const handleBack = () => {
        if (earnedXPRef.current > 0 && addXP) {
            addXP(earnedXPRef.current);
        }
        setScreen("char-select");
    };

    // Toggle shuffle
    const toggleShuffle = () => {
        setIsShuffled(!isShuffled);
        setWordIndex(0);
        setStreak(0);
    };

    // Restart
    const handleRestart = () => {
        setWordIndex(0);
        setStreak(0);
        setTotalCorrect(0);
        earnedXPRef.current = 0;
        setEarnedXP(0);
    };

    // Get input styling based on current state
    const getInputStyle = () => {
        if (result === "correct") {
            return "border-emerald-500 bg-emerald-500/10 text-emerald-400";
        }
        if (result === "wrong") {
            return "border-red-500 bg-red-500/10 text-red-400";
        }

        // Real-time validation - check if current input matches start of answer
        const inputLower = userInput.toLowerCase();
        if (userInput.length > 0) {
            if (correctAnswer.startsWith(inputLower)) {
                return "border-blue-500 bg-slate-800 text-white";
            } else {
                return "border-orange-500 bg-slate-800 text-orange-400";
            }
        }

        return "border-slate-600 bg-slate-800 text-white";
    };

    // Empty state
    if (!selectedChar || !currentWord) {
        return (
            <div className="h-full flex flex-col bg-slate-950">
                <Header
                    title="Spelling"
                    subtitle="No words available"
                    showBack
                    onBack={() => setScreen("char-select")}
                />
                <div className="flex-1 flex items-center justify-center text-slate-400">
                    This hero has no vocabulary yet.
                </div>
            </div>
        );
    }

    // Generate hint (show first 2 letters + remaining as underscores)
    const hintText = showHint
        ? correctAnswer.slice(0, 2) + "_".repeat(Math.max(0, correctAnswer.length - 2))
        : "";

    return (
        <div className="h-full flex flex-col bg-slate-950">
            {/* Header */}
            <Header
                title="Spelling"
                subtitle={`${selectedChar.name} · ${wordIndex + 1}/${totalWords}`}
                showBack
                onBack={handleBack}
            />

            {/* Stats Bar */}
            <div className="px-4 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                    <span className="text-slate-400">
                        ✓ {totalCorrect}/{totalWords}
                    </span>
                    {streak > 1 && (
                        <span className="text-orange-400 flex items-center gap-1">
                            <Zap size={12} /> {streak} streak
                        </span>
                    )}
                    {earnedXP > 0 && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 font-bold">
                            +{earnedXP} XP
                        </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={toggleShuffle}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all ${isShuffled
                            ? "bg-purple-600 text-white"
                            : "bg-slate-800 text-slate-400"
                            }`}
                    >
                        <Shuffle size={12} />
                    </button>
                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800 text-slate-400"
                    >
                        <RotateCcw size={12} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
                {/* Question Card */}
                <div className="w-full max-w-sm bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
                    {/* Type badge */}
                    <span className="inline-block px-2 py-1 bg-pink-600/30 border border-pink-500/50 rounded-full text-[10px] font-bold text-pink-300 uppercase tracking-wider mb-3">
                        {currentWord.type}
                    </span>

                    {/* Thai meaning */}
                    <h2 className="text-2xl font-bold text-white mb-2 font-thai">
                        {currentWord.mean}
                    </h2>

                    {/* Hint */}
                    {showHint && (
                        <p className="text-sm text-slate-400 mt-2">
                            Hint: <span className="text-blue-400 font-mono tracking-widest">{hintText}</span>
                        </p>
                    )}

                    {/* Audio button */}
                    <button
                        onClick={() => speakWord(currentWord.word)}
                        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-all"
                    >
                        <Volume2 size={16} />
                        Listen
                    </button>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        disabled={!!result}
                        placeholder="Type the English word..."
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className={`w-full px-4 py-4 rounded-xl text-center text-xl font-bold border-2 outline-none transition-all placeholder:text-slate-500 ${getInputStyle()}`}
                    />

                    {/* Letter count hint */}
                    <p className="text-center text-xs text-slate-500 mt-2">
                        {correctAnswer.length} letters
                    </p>
                </form>

                {/* Result Display */}
                {result === "correct" && (
                    <div className="flex items-center gap-2 text-emerald-400 animate-scale-in">
                        <Check size={24} />
                        <span className="font-bold">Correct! +{15 + Math.min((streak - 1) * 2, 10)} XP</span>
                    </div>
                )}

                {result === "wrong" && (
                    <div className="text-center animate-scale-in">
                        <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
                            <X size={24} />
                            <span className="font-bold">Incorrect</span>
                        </div>
                        <p className="text-slate-300">
                            Answer: <span className="text-emerald-400 font-bold">{currentWord.word}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-2">
                <div className="flex gap-1">
                    {words.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 flex-1 rounded-full transition-all ${idx === wordIndex
                                ? "bg-pink-500"
                                : idx < wordIndex
                                    ? "bg-pink-500/50"
                                    : "bg-slate-700"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                {!result ? (
                    <div className="flex gap-3">
                        <button
                            onClick={handleShowHint}
                            disabled={showHint}
                            className="flex-1 h-12 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-50 transition-all"
                        >
                            💡 Hint
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!userInput.trim()}
                            className="flex-[2] h-12 rounded-xl font-bold text-sm bg-pink-600 hover:bg-pink-500 text-white disabled:opacity-50 transition-all"
                        >
                            Check Answer
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleNext}
                        className="w-full h-12 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all"
                    >
                        {wordIndex < totalWords - 1 ? "Next Word" : "Finish & Get XP"}
                    </button>
                )}
            </div>
        </div>
    );
}
