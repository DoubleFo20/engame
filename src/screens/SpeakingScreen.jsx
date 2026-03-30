// src/screens/SpeakingScreen.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { Mic, MicOff, Volume2, RotateCcw, Shuffle, Check, X, ChevronRight } from "lucide-react";
import Header from "@/components/ui/Header";

/**
 * Speak a word using Web Speech API
 */
function speakWord(word, onEnd = null) {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        if (onEnd) utterance.onend = onEnd;
        window.speechSynthesis.speak(utterance);
    }
}

/**
 * Shuffle array
 */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Simple similarity check (case-insensitive, trim)
 */
function checkPronunciation(spoken, expected) {
    const s = spoken.toLowerCase().trim();
    const e = expected.toLowerCase().trim();

    // Exact match
    if (s === e) return { score: 100, match: "perfect" };

    // Contains the word
    if (s.includes(e) || e.includes(s)) return { score: 80, match: "good" };

    // Levenshtein-like simple check
    const words = s.split(" ");
    for (const w of words) {
        if (w === e) return { score: 100, match: "perfect" };
        if (w.includes(e) || e.includes(w)) return { score: 70, match: "close" };
    }

    return { score: 0, match: "miss" };
}

export default function SpeakingScreen({
    selectedChar,
    setScreen,
    addXP,
}) {
    // Word management
    const [wordIndex, setWordIndex] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [shuffledWords, setShuffledWords] = useState([]);

    // Recording state
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState("");
    const [result, setResult] = useState(null); // { score, match }
    const [isSupported, setIsSupported] = useState(true);

    // Stats
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [earnedXP, setEarnedXP] = useState(0);
    const earnedXPRef = useRef(0);

    const recognitionRef = useRef(null);

    // Get words list
    const words = useMemo(() => {
        if (!selectedChar?.hotspots) return [];
        return isShuffled ? shuffledWords : selectedChar.hotspots;
    }, [selectedChar, isShuffled, shuffledWords]);

    const currentWord = words[wordIndex];
    const totalWords = words.length;

    // Check browser support for Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setIsSupported(false);
        }
    }, []);

    // Reset state when word changes
    useEffect(() => {
        setSpokenText("");
        setResult(null);
    }, [wordIndex]);

    // Initialize shuffled words
    useEffect(() => {
        if (isShuffled && selectedChar?.hotspots) {
            setShuffledWords(shuffleArray(selectedChar.hotspots));
            setWordIndex(0);
        }
    }, [isShuffled, selectedChar]);

    // Start listening
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 3;

        recognition.onstart = () => {
            setIsListening(true);
            setSpokenText("");
            setResult(null);
        };

        recognition.onresult = (event) => {
            const spoken = event.results[0][0].transcript;
            setSpokenText(spoken);

            // Check pronunciation
            const checkResult = checkPronunciation(spoken, currentWord.word);
            setResult(checkResult);

            // Award XP based on score
            if (checkResult.score >= 70) {
                const xpGain = Math.floor(checkResult.score / 5); // 14-20 XP
                earnedXPRef.current += xpGain;
                setEarnedXP(earnedXPRef.current);
                setTotalCorrect((c) => c + 1);
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
            if (event.error === "no-speech") {
                setSpokenText("(No speech detected)");
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    // Stop listening
    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    // Play word then listen
    const handleListenAndSpeak = () => {
        speakWord(currentWord.word, () => {
            // Start listening after TTS finishes
            setTimeout(startListening, 300);
        });
    };

    // Next word
    const handleNext = () => {
        if (wordIndex < totalWords - 1) {
            setWordIndex(wordIndex + 1);
        } else {
            handleBack();
        }
    };

    // Back - flush XP
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
    };

    // Restart
    const handleRestart = () => {
        setWordIndex(0);
        setTotalCorrect(0);
        earnedXPRef.current = 0;
        setEarnedXP(0);
    };

    // Get result color
    const getResultColor = () => {
        if (!result) return "";
        if (result.score >= 80) return "text-emerald-400";
        if (result.score >= 70) return "text-yellow-400";
        return "text-red-400";
    };

    // Empty state
    if (!selectedChar || !currentWord) {
        return (
            <div className="h-full flex flex-col bg-slate-950">
                <Header
                    title="Speaking"
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

    // Not supported
    if (!isSupported) {
        return (
            <div className="h-full flex flex-col bg-slate-950">
                <Header
                    title="Speaking"
                    subtitle="Not Supported"
                    showBack
                    onBack={() => setScreen("char-select")}
                />
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                    <MicOff size={48} className="text-red-400 mb-4" />
                    <h2 className="text-white font-bold mb-2">Browser Not Supported</h2>
                    <p className="text-slate-400 text-sm">
                        Speech recognition is not available in your browser.
                        Try using Chrome or Edge.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-950">
            {/* Header */}
            <Header
                title="Speaking"
                subtitle={`${selectedChar.name} · ${wordIndex + 1}/${totalWords}`}
                showBack
                onBack={handleBack}
            />

            {/* Stats Bar */}
            <div className="px-4 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                    <span className="text-slate-400">✓ {totalCorrect}/{totalWords}</span>
                    {earnedXP > 0 && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 font-bold">
                            +{earnedXP} XP
                        </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={toggleShuffle}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all ${isShuffled ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
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
                {/* Word Card */}
                <div className="w-full max-w-sm bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl text-center">
                    <span className="inline-block px-2 py-1 bg-red-600/30 border border-red-500/50 rounded-full text-[10px] font-bold text-red-300 uppercase tracking-wider mb-3">
                        {currentWord.type}
                    </span>

                    <h2 className="text-3xl font-black text-white mb-2">
                        {currentWord.word}
                    </h2>

                    <p className="text-slate-400 font-thai">
                        {currentWord.mean}
                    </p>

                    {/* Listen Button */}
                    <button
                        onClick={() => speakWord(currentWord.word)}
                        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-all mx-auto"
                    >
                        <Volume2 size={16} />
                        Listen
                    </button>
                </div>

                {/* Microphone Button */}
                <button
                    onClick={isListening ? stopListening : handleListenAndSpeak}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${isListening
                        ? "bg-red-500 animate-pulse scale-110"
                        : "bg-gradient-to-br from-red-500 to-pink-600 hover:scale-105"
                        }`}
                >
                    {isListening ? (
                        <MicOff size={40} className="text-white" />
                    ) : (
                        <Mic size={40} className="text-white" />
                    )}
                </button>

                <p className="text-slate-400 text-xs">
                    {isListening ? "Listening... Speak now!" : "Tap to listen & speak"}
                </p>

                {/* Spoken Text */}
                {spokenText && (
                    <div className="w-full max-w-sm text-center">
                        <p className="text-sm text-slate-300 mb-1">You said:</p>
                        <p className={`text-lg font-bold ${getResultColor()}`}>
                            "{spokenText}"
                        </p>
                    </div>
                )}

                {/* Result Feedback */}
                {result && (
                    <div className={`flex items-center gap-2 ${getResultColor()} animate-scale-in`}>
                        {result.score >= 70 ? <Check size={24} /> : <X size={24} />}
                        <span className="font-bold">
                            {result.match === "perfect" && "Perfect! 🎉"}
                            {result.match === "good" && "Good job! 👍"}
                            {result.match === "close" && "Almost there!"}
                            {result.match === "miss" && "Try again"}
                        </span>
                        {result.score >= 70 && (
                            <span className="text-sm">+{Math.floor(result.score / 5)} XP</span>
                        )}
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
                                ? "bg-red-500"
                                : idx < wordIndex
                                    ? "bg-red-500/50"
                                    : "bg-slate-700"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <button
                    onClick={handleNext}
                    className="w-full h-12 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2"
                >
                    {wordIndex < totalWords - 1 ? (
                        <>Next Word <ChevronRight size={18} /></>
                    ) : (
                        "Finish & Get XP"
                    )}
                </button>
            </div>
        </div>
    );
}
