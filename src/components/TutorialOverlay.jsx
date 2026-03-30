// src/components/TutorialOverlay.jsx — Onboarding Tutorial for New Players
import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Gamepad2, Target, BookOpen, Trophy, Sparkles } from "lucide-react";

const SLIDES = [
    {
        icon: Gamepad2,
        title: "ยินดีต้อนรับสู่ ENGAME! 🎮",
        subtitle: "เรียนภาษาอังกฤษผ่านเกมที่คุณรัก",
        description: "ENGAME ช่วยให้คุณเรียนรู้คำศัพท์ภาษาอังกฤษจากเกม ROV, MLBB และ Free Fire อย่างสนุกสนาน!",
        color: "from-blue-600 to-cyan-500",
        bgEmoji: "🎮",
    },
    {
        icon: Target,
        title: "เลือกเกม & ตัวละคร",
        subtitle: "Step 1: เริ่มจากเกมที่ชอบ",
        description: "กดเลือกเกมที่คุณเล่น เช่น ROV จากนั้นเลือกตัวละคร (Hero) ที่อยากเรียนคำศัพท์ คุณสามารถกรองตามตำแหน่งได้!",
        color: "from-purple-600 to-pink-500",
        bgEmoji: "🎯",
    },
    {
        icon: BookOpen,
        title: "กดจุด Hotspot เรียนคำศัพท์",
        subtitle: "Step 2: เรียนรู้จากภาพ",
        description: "แต่ละตัวละครจะมีจุดสีส้มบนตัว กดจุดเพื่อเรียนรู้คำศัพท์ภาษาอังกฤษ เช่น Sword = ดาบ, Helmet = หมวก",
        color: "from-orange-500 to-yellow-500",
        bgEmoji: "📖",
    },
    {
        icon: Trophy,
        title: "สะสม XP & อัพเลเวล!",
        subtitle: "Step 3: ยิ่งเรียนยิ่งเก่ง",
        description: "ทุกครั้งที่เรียนคำศัพท์ใหม่ คุณจะได้ XP สะสมเพื่ออัพเลเวล และปลดล็อคฟีเจอร์ใหม่ๆ!",
        color: "from-emerald-500 to-teal-500",
        bgEmoji: "🏆",
    },
    {
        icon: Sparkles,
        title: "พร้อมเริ่มเรียนแล้ว!",
        subtitle: "มาเริ่มกันเลย!",
        description: "เลือกเกมที่ชอบ เลือกตัวละคร แล้วเริ่มเรียนคำศัพท์ได้เลย ขอให้สนุกกับการเรียนรู้ผ่านเกมนะ! 💪",
        color: "from-blue-500 to-purple-600",
        bgEmoji: "✨",
    },
];

export default function TutorialOverlay({ onComplete }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slide = SLIDES[currentSlide];
    const Icon = slide.icon;
    const isLast = currentSlide === SLIDES.length - 1;

    const handleNext = () => {
        if (isLast) {
            onComplete();
        } else {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
    };

    const handleSkip = () => {
        onComplete();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm mx-4">
                {/* Skip button */}
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleSkip}
                        className="text-xs text-slate-500 hover:text-white transition-colors px-3 py-1"
                    >
                        ข้าม →
                    </button>
                </div>

                {/* Card */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                    {/* Gradient header */}
                    <div className={`bg-gradient-to-br ${slide.color} p-8 text-center relative overflow-hidden`}>
                        {/* Background emoji */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[120px] select-none">
                            {slide.bgEmoji}
                        </div>
                        {/* Icon */}
                        <div className="relative z-10 inline-flex p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-3">
                            <Icon size={40} className="text-white" />
                        </div>
                        <h2 className="text-xl font-black text-white relative z-10">{slide.title}</h2>
                        <p className="text-sm text-white/80 mt-1 relative z-10">{slide.subtitle}</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <p className="text-sm text-slate-300 leading-relaxed text-center">
                            {slide.description}
                        </p>
                    </div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 pb-4">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide
                                        ? `bg-gradient-to-r ${slide.color} scale-125`
                                        : "bg-slate-700 hover:bg-slate-600"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3 p-4 pt-0">
                        {currentSlide > 0 && (
                            <button
                                onClick={handlePrev}
                                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1 border border-slate-700"
                            >
                                <ChevronLeft size={16} /> ย้อนกลับ
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className={`flex-1 py-3 bg-gradient-to-r ${slide.color} hover:opacity-90 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1 shadow-lg`}
                        >
                            {isLast ? (
                                <>🎮 เริ่มเล่นเลย!</>
                            ) : (
                                <>ถัดไป <ChevronRight size={16} /></>
                            )}
                        </button>
                    </div>
                </div>

                {/* Slide counter */}
                <p className="text-center text-[10px] text-slate-600 mt-3">
                    {currentSlide + 1} / {SLIDES.length}
                </p>
            </div>
        </div>
    );
}
