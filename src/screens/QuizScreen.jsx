// src/screens/QuizScreen.jsx
import React, { useState, useRef, useEffect } from "react";

export default function QuizView({ selectedChar, onBack, addXP }) {
    // words = hotspot ทั้งหมดของ hero ที่เลือก
    const words = selectedChar?.hotspots || [];

    // index ของคำที่กำลังถามอยู่ตอนนี้
    const [questionIndex, setQuestionIndex] = useState(0);
    // ตัวเลือก 4 ข้อของคำถามปัจจุบัน
    const [choices, setChoices] = useState([]);
    // คำตอบที่ผู้เล่นเลือก
    const [selectedChoice, setSelectedChoice] = useState(null);
    // สถานะผลลัพธ์ "correct" / "wrong" / null
    const [result, setResult] = useState(null);

    // ✅ สะสม XP ไว้ใน ref (ไม่ trigger re-render ของ parent)
    const earnedXPRef = useRef(0);
    const [earnedXP, setEarnedXP] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // ✅ Flush XP กลับ parent ตอนออกจาก Quiz
    const handleExit = () => {
        if (earnedXPRef.current > 0 && addXP) {
            addXP(earnedXPRef.current);
        }
        onBack();
    };

    // เตรียมคำถามทุกครั้งที่เปลี่ยน questionIndex หรือ hero
    useEffect(() => {
        if (words.length === 0) return;

        const correct = words[questionIndex];

        // ดึงคำอื่นมาเป็นตัวหลอก (wrong choices)
        const otherWords = words.filter((w, i) => i !== questionIndex);
        const shuffled = [...otherWords].sort(() => Math.random() - 0.5);

        const optionList = [
            correct,
            ...shuffled.slice(0, Math.max(0, 3 - 0)), // เอามาให้ครบ 4 ตัวเลือก
        ]
            .slice(0, 4) // กันพลาดเกิน 4
            .sort(() => Math.random() - 0.5); // สลับตำแหน่ง

        setChoices(optionList);
        setSelectedChoice(null);
        setResult(null);
    }, [questionIndex, selectedChar]);

    if (words.length === 0) {
        return (
            <div className="h-full flex flex-col bg-slate-950">
                <header className="p-4">
                    <button
                        onClick={handleExit}
                        className="p-2 bg-slate-800 rounded-full text-white mb-4"
                    >
                        ← Back
                    </button>
                    <p className="text-slate-300 text-sm">This hero has no words yet.</p>
                </header>
            </div>
        );
    }

    const current = words[questionIndex];

    const handleSelect = (choice) => {
        setSelectedChoice(choice);
        if (choice.id === current.id) {
            setResult("correct");
            // ✅ สะสมไว้ก่อน ไม่เรียก addXP ตรงนี้ (กัน parent re-render ทำ Quiz remount)
            earnedXPRef.current += 25;
            setEarnedXP(earnedXPRef.current);
        } else {
            setResult("wrong");
        }
    };

    const handleNext = () => {
        if (questionIndex + 1 >= words.length) {
            // ครบทุกคำแล้ว → แสดงสรุป + flush XP
            if (earnedXPRef.current > 0 && addXP) {
                addXP(earnedXPRef.current);
            }
            setIsComplete(true);
        } else {
            setQuestionIndex(questionIndex + 1);
        }
    };

    // ✅ Summary Screen เมื่อทำครบทุกข้อ
    if (isComplete) {
        return (
            <div className="h-full flex flex-col bg-slate-950 items-center justify-center text-center px-6 gap-4">
                <div className="text-5xl">🏆</div>
                <h2 className="text-2xl font-black text-white">Quiz Complete!</h2>
                <p className="text-slate-400">Hero: {selectedChar.name}</p>
                <p className="text-lg text-emerald-400 font-bold">+{earnedXP} XP earned</p>
                <p className="text-sm text-slate-500">{words.length} questions answered</p>
                <button
                    onClick={onBack}
                    className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl text-sm"
                >
                    Back to Hero Select
                </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-950">
            {/* ส่วนหัว */}
            <header className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <button
                    onClick={handleExit}
                    className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700"
                >
                    ←
                </button>
                <div className="text-right">
                    <p className="text-xs text-slate-400">Quiz · {selectedChar.name}</p>
                    <p className="text-[10px] text-slate-500">
                        Question {questionIndex + 1} / {words.length}
                        {earnedXP > 0 && (
                            <span className="ml-2 text-emerald-400">+{earnedXP} XP</span>
                        )}
                    </p>
                </div>
            </header>

            {/* เนื้อหา */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
                <div className="text-center">
                    <p className="text-xs uppercase text-blue-300 tracking-wide mb-2">
                        What is the meaning of
                    </p>
                    <h2 className="text-3xl font-black text-white">{current.word}</h2>
                </div>

                <div className="w-full max-w-xs grid gap-3">
                    {choices.map((choice) => {
                        const isSelected = selectedChoice?.id === choice.id;
                        const isCorrect = choice.id === current.id;

                        let buttonStyle =
                            "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all";

                        if (!selectedChoice) {
                            // ยังไม่เลือกคำตอบ
                            buttonStyle +=
                                " bg-slate-800 border-slate-700 text-slate-100 hover:border-blue-500";
                        } else if (isSelected && isCorrect) {
                            buttonStyle +=
                                " bg-emerald-600 border-emerald-400 text-white shadow-lg";
                        } else if (isSelected && !isCorrect) {
                            buttonStyle += " bg-red-600 border-red-400 text-white";
                        } else if (!isSelected && isCorrect && result === "wrong") {
                            // เฉลยให้เห็นข้อที่ถูกเมื่อผู้เล่นตอบผิด
                            buttonStyle +=
                                " bg-slate-800 border-emerald-400 text-emerald-300";
                        } else {
                            buttonStyle += " bg-slate-800 border-slate-700 text-slate-300";
                        }

                        return (
                            <button
                                key={choice.id}
                                onClick={() => !selectedChoice && handleSelect(choice)}
                                className={buttonStyle}
                            >
                                <span className="block text-[11px] text-blue-300 uppercase">
                                    {choice.type}
                                </span>
                                <span className="block font-semibold">{choice.mean}</span>
                            </button>
                        );
                    })}
                </div>

                {/* ข้อความบอกผล */}
                {result && (
                    <p
                        className={`text-sm ${result === "correct" ? "text-emerald-400" : "text-red-400"
                            }`}
                    >
                        {result === "correct" ? "Correct! 🎉" : "Try again…"}
                    </p>
                )}
            </div>

            {/* ปุ่ม Next */}
            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm"
                >
                    Next Question
                </button>
            </div>
        </div>
    );
}
