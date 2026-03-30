// src/screens/RoleplayScreen.jsx
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Send, Volume2, MessageCircle, User } from "lucide-react";
import Header from "@/components/ui/Header";

/**
 * Speak text using Web Speech API
 */
function speakText(text) {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

/**
 * Generate dialogue scenarios based on character vocabulary
 * Uses randomized template pools so every playthrough feels different
 */
function generateDialogues(character) {
    if (!character?.hotspots || character.hotspots.length === 0) {
        return [];
    }

    // Shuffle and pick words so different words appear each time
    const shuffled = [...character.hotspots].sort(() => Math.random() - 0.5);
    const w = shuffled; // shorthand
    const charName = character.name;
    const charRole = character.role;

    // Helper: pick random item from array
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // ===== SCENARIO 1: GREETING (always first) =====
    const greetings = [
        {
            npcMessage: `Hey there! I'm ${charName}, the ${charRole}. Are you new around here?`,
            npcMessageTH: `เฮ้! ฉัน${charName} ตำแหน่ง${charRole} คุณเพิ่งมาใหม่เหรอ?`,
            options: [
                { text: "Yes, I just arrived!", textTH: "ใช่! ฉันเพิ่งมาถึง!", correct: true, xp: 15 },
                { text: "No, I've been here before.", textTH: "เปล่า ฉันเคยมาแล้ว", correct: true, xp: 10 },
                { text: "Who are you?", textTH: "คุณเป็นใคร?", correct: false, xp: 5 },
            ],
            correctResponse: "Welcome! Let me show you around!",
            correctResponseTH: "ยินดีต้อนรับ! มาเที่ยวชมกันเลย!",
        },
        {
            npcMessage: `Hello! I'm ${charName}. I've been waiting for a teammate. Want to join me?`,
            npcMessageTH: `สวัสดี! ฉันคือ${charName} ฉันรอเพื่อนร่วมทีมอยู่ มาร่วมทีมกันไหม?`,
            options: [
                { text: "Sure, let's team up!", textTH: "ได้เลย มารวมทีมกัน!", correct: true, xp: 15 },
                { text: "What's the mission?", textTH: "ภารกิจคืออะไร?", correct: true, xp: 10 },
                { text: "Maybe later.", textTH: "ไว้ทีหลังนะ", correct: false, xp: 5 },
            ],
            correctResponse: "Awesome! Together we'll be unstoppable!",
            correctResponseTH: "เยี่ยม! รวมกันแล้วเราจะเก่งมาก!",
        },
        {
            npcMessage: `Greetings, warrior! I'm ${charName}. Do you have experience in battle?`,
            npcMessageTH: `สวัสดีนักรบ! ฉัน${charName} คุณมีประสบการณ์ในการต่อสู้ไหม?`,
            options: [
                { text: "Yes, I've fought many battles!", textTH: "ใช่! ฉันรบมาหลายครั้งแล้ว!", correct: true, xp: 15 },
                { text: "I'm still learning.", textTH: "ฉันยังเรียนรู้อยู่", correct: true, xp: 10 },
                { text: "Not really...", textTH: "ไม่ค่อยมี...", correct: false, xp: 5 },
            ],
            correctResponse: "Great! Every battle makes us stronger!",
            correctResponseTH: "ดีมาก! ทุกการต่อสู้ทำให้เราแข็งแกร่งขึ้น!",
        },
    ];

    // ===== SCENARIO 2: VOCABULARY IDENTIFY =====
    const identifyTemplates = [
        {
            npcMessage: `Look at my ${w[0]?.word}! Do you know what it's used for?`,
            npcMessageTH: `ดู${w[0]?.word}ของฉันสิ! คุณรู้ไหมว่ามันใช้ทำอะไร?`,
            options: [
                { text: `It's a ${w[0]?.type}, right? It means "${w[0]?.mean}"!`, textTH: `มันเป็น ${w[0]?.type} ใช่ไหม? แปลว่า "${w[0]?.mean}"!`, correct: true, xp: 20 },
                { text: "I've never seen one before.", textTH: "ฉันไม่เคยเห็นมาก่อน", correct: false, xp: 5 },
                { text: "Can I try it?", textTH: "ฉันลองได้ไหม?", correct: true, xp: 10 },
            ],
            correctResponse: "You really know your equipment!",
            correctResponseTH: "คุณรู้จักอุปกรณ์ดีมากเลย!",
        },
        {
            npcMessage: `Can you name the item I'm wearing? Here's a hint: it's a type of ${w[0]?.type}.`,
            npcMessageTH: `ทายได้ไหมว่าฉันใส่อะไรอยู่? ใบ้ให้: มันเป็นประเภท ${w[0]?.type}`,
            options: [
                { text: `Is it a ${w[0]?.word}? That means "${w[0]?.mean}"!`, textTH: `${w[0]?.word} ใช่ไหม? แปลว่า "${w[0]?.mean}"!`, correct: true, xp: 20 },
                { text: "I have no idea.", textTH: "ฉันไม่รู้เลย", correct: false, xp: 0 },
                { text: "Give me another hint!", textTH: "ขอใบ้อีกที!", correct: false, xp: 5 },
            ],
            correctResponse: "Exactly right! You're so smart!",
            correctResponseTH: "ถูกต้อง! คุณฉลาดมาก!",
        },
        {
            npcMessage: `In English, we call this a "${w[0]?.word}". Do you know what that means?`,
            npcMessageTH: `ภาษาอังกฤษเรียกสิ่งนี้ว่า "${w[0]?.word}" รู้ไหมว่าแปลว่าอะไร?`,
            options: [
                { text: `Yes! It means "${w[0]?.mean}"!`, textTH: `รู้! แปลว่า "${w[0]?.mean}"!`, correct: true, xp: 20 },
                { text: "Can you teach me?", textTH: "สอนหน่อยได้ไหม?", correct: true, xp: 10 },
                { text: "I forgot...", textTH: "ฉันลืมไป...", correct: false, xp: 0 },
            ],
            correctResponse: "Perfect! Your English is getting better!",
            correctResponseTH: "สมบูรณ์แบบ! ภาษาอังกฤษคุณดีขึ้นเรื่อยๆ!",
        },
    ];

    // ===== SCENARIO 3: QUEST / REQUEST =====
    const w1 = w[1] || w[0];
    const questTemplates = [
        {
            npcMessage: `My ${w1.word} is broken. I need to find a replacement. Will you help?`,
            npcMessageTH: `${w1.word}ของฉันพัง ต้องหาอันใหม่ ช่วยฉันได้ไหม?`,
            options: [
                { text: "Of course! Where should we look?", textTH: "ได้สิ! ไปหาที่ไหนดี?", correct: true, xp: 15 },
                { text: `What exactly is a ${w1.word}?`, textTH: `${w1.word}คืออะไรกันแน่?`, correct: true, xp: 10 },
                { text: "Sorry, I can't help right now.", textTH: "ขอโทษ ตอนนี้ช่วยไม่ได้", correct: false, xp: 5 },
            ],
            correctResponse: "You're so kind! Let's search together!",
            correctResponseTH: "คุณใจดีมาก! ไปหาด้วยกันเลย!",
        },
        {
            npcMessage: `I'm shopping for new gear. Do you think I should buy a ${w1.word}?`,
            npcMessageTH: `ฉันกำลังซื้ออุปกรณ์ใหม่ คิดว่าควรซื้อ ${w1.word} ไหม?`,
            options: [
                { text: `Yes! A ${w1.word} would be perfect for a ${charRole}!`, textTH: `ใช่! ${w1.word} เหมาะกับ${charRole}มาก!`, correct: true, xp: 15 },
                { text: "What does it do?", textTH: "มันทำอะไรได้?", correct: true, xp: 10 },
                { text: "I don't know much about gear.", textTH: "ฉันไม่ค่อยรู้เรื่องอุปกรณ์", correct: false, xp: 5 },
            ],
            correctResponse: "Great advice! I'll get one right away!",
            correctResponseTH: "คำแนะนำดีมาก! ฉันจะไปซื้อเลย!",
        },
        {
            npcMessage: `There's a treasure chest ahead! I think it contains a ${w1.word}. Should we open it?`,
            npcMessageTH: `มีหีบสมบัติข้างหน้า! ฉันคิดว่ามี ${w1.word} อยู่ข้างใน เปิดดูไหม?`,
            options: [
                { text: "Yes, let's open it!", textTH: "เปิดเลย!", correct: true, xp: 15 },
                { text: "Wait, it might be a trap!", textTH: "เดี๋ยว มันอาจเป็นกับดัก!", correct: true, xp: 10 },
                { text: "I'm scared...", textTH: "ฉันกลัว...", correct: false, xp: 5 },
            ],
            correctResponse: "Brave choice! Let's see what's inside!",
            correctResponseTH: "กล้าหาญมาก! มาดูกันว่ามีอะไรข้างใน!",
        },
    ];

    // ===== SCENARIO 4: COMPARE / DISCUSS =====
    const w2 = w[2] || w[0];
    const w3 = w[Math.min(3, w.length - 1)] || w[0];
    const compareTemplates = [
        {
            npcMessage: `Which do you prefer: a ${w2.word} or a ${w3.word}?`,
            npcMessageTH: `คุณชอบอันไหนมากกว่า: ${w2.word} หรือ ${w3.word}?`,
            options: [
                { text: `I prefer the ${w2.word}! It's a great ${w2.type}.`, textTH: `ฉันชอบ ${w2.word}! มันเป็น ${w2.type} ที่ดี`, correct: true, xp: 15 },
                { text: `The ${w3.word} looks cooler!`, textTH: `${w3.word} ดูเท่กว่า!`, correct: true, xp: 15 },
                { text: "I can't choose.", textTH: "เลือกไม่ได้เลย", correct: false, xp: 5 },
            ],
            correctResponse: "Good choice! Every piece of equipment has its strengths!",
            correctResponseTH: "เลือกได้ดี! อุปกรณ์ทุกชิ้นมีจุดเด่นของมัน!",
        },
        {
            npcMessage: `As a ${charRole}, my ${w2.word} is very important. What's the most important thing for you?`,
            npcMessageTH: `ในฐานะ${charRole} ${w2.word}สำคัญมากสำหรับฉัน แล้วอะไรสำคัญที่สุดสำหรับคุณ?`,
            options: [
                { text: "A good strategy is most important!", textTH: "กลยุทธ์ที่ดีสำคัญที่สุด!", correct: true, xp: 15 },
                { text: "Having the right equipment!", textTH: "มีอุปกรณ์ที่เหมาะสม!", correct: true, xp: 15 },
                { text: "I don't think about it.", textTH: "ฉันไม่ค่อยคิดเรื่องนี้", correct: false, xp: 5 },
            ],
            correctResponse: "Wise answer! That's the mindset of a true warrior!",
            correctResponseTH: "คำตอบฉลาดมาก! นั่นคือความคิดของนักรบตัวจริง!",
        },
        {
            npcMessage: `I just upgraded my ${w2.word}. It cost a lot of gold! Do you save your gold or spend it?`,
            npcMessageTH: `ฉันเพิ่งอัปเกรด${w2.word} แพงมาก! คุณเก็บทองหรือใช้ทอง?`,
            options: [
                { text: "I save it for important items.", textTH: "ฉันเก็บไว้ซื้อของสำคัญ", correct: true, xp: 15 },
                { text: "I spend it right away!", textTH: "ฉันใช้เลย!", correct: true, xp: 10 },
                { text: "I never have enough gold.", textTH: "ฉันไม่เคยมีทองพอ", correct: false, xp: 5 },
            ],
            correctResponse: "That's a smart approach to managing resources!",
            correctResponseTH: "นั่นเป็นวิธีจัดการทรัพยากรที่ฉลาดมาก!",
        },
    ];

    // ===== SCENARIO 5: FAREWELL =====
    const farewells = [
        {
            npcMessage: "That was a great battle! We won! How do you feel?",
            npcMessageTH: "สู้ได้ดีมาก! เราชนะแล้ว! คุณรู้สึกอย่างไร?",
            options: [
                { text: "Amazing! We make a great team!", textTH: "สุดยอด! เราเป็นทีมที่ดีมาก!", correct: true, xp: 20 },
                { text: "Good game! Let's battle again!", textTH: "เล่นได้ดี! มาสู้กันอีกนะ!", correct: true, xp: 15 },
                { text: "I'm tired, but happy!", textTH: "เหนื่อย แต่มีความสุข!", correct: true, xp: 15 },
            ],
            correctResponse: "Until we meet again, my friend! Stay strong!",
            correctResponseTH: "ไว้เจอกันใหม่นะเพื่อน! เข้มแข็งไว้!",
        },
        {
            npcMessage: "The enemy has retreated. We did it! Will you fight alongside me again?",
            npcMessageTH: "ศัตรูถอยแล้ว! เราทำได้! จะกลับมาสู้ด้วยกันอีกไหม?",
            options: [
                { text: "Anytime! You can count on me!", textTH: "เมื่อไหร่ก็ได้! วางใจฉันได้!", correct: true, xp: 20 },
                { text: "Of course! Friends forever!", textTH: "แน่นอน! เพื่อนตลอดไป!", correct: true, xp: 15 },
                { text: "That was fun! See you soon!", textTH: "สนุกมาก! แล้วเจอกัน!", correct: true, xp: 15 },
            ],
            correctResponse: "You're the best teammate ever! See you on the battlefield!",
            correctResponseTH: "คุณเป็นเพื่อนร่วมทีมที่ดีที่สุด! เจอกันในสนามรบ!",
        },
        {
            npcMessage: "Victory! You've learned a lot of new words today. Are you proud of yourself?",
            npcMessageTH: "ชัยชนะ! วันนี้คุณเรียนรู้คำศัพท์ใหม่เยอะมาก ภูมิใจในตัวเองไหม?",
            options: [
                { text: "Yes! I learned so much!", textTH: "ใช่! ฉันได้เรียนรู้เยอะมาก!", correct: true, xp: 20 },
                { text: "Thank you for teaching me!", textTH: "ขอบคุณที่สอนฉัน!", correct: true, xp: 15 },
                { text: "Let's learn even more next time!", textTH: "คราวหน้าเรียนรู้เพิ่มอีกนะ!", correct: true, xp: 15 },
            ],
            correctResponse: "Keep practicing! You'll be fluent in no time!",
            correctResponseTH: "ฝึกต่อไป! อีกไม่นานคุณจะเก่งมาก!",
        },
    ];

    // Pick one random template from each scenario pool
    const dialogues = [
        { id: 1, ...pick(greetings) },
        { id: 2, ...pick(identifyTemplates) },
        { id: 3, ...pick(questTemplates) },
        { id: 4, ...pick(compareTemplates) },
        { id: 5, ...pick(farewells) },
    ];

    return dialogues;
}

export default function RoleplayScreen({
    selectedChar,
    setScreen,
    addXP,
}) {
    const [dialogues, setDialogues] = useState([]);
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [messages, setMessages] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [totalXP, setTotalXP] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const messagesEndRef = useRef(null);
    const totalXPRef = useRef(0);
    const hasInitializedRef = useRef(false);

    // Initialize dialogues (only once)
    useEffect(() => {
        if (selectedChar && !hasInitializedRef.current) {
            hasInitializedRef.current = true;
            const generatedDialogues = generateDialogues(selectedChar);
            setDialogues(generatedDialogues);

            // Start first dialogue after short delay
            if (generatedDialogues.length > 0) {
                setTimeout(() => {
                    addNPCMessage(generatedDialogues[0]);
                }, 500);
            }
        }
    }, [selectedChar]);

    // Scroll to bottom when messages change (with delay to prevent locking)
    useEffect(() => {
        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    // Add NPC message to chat
    const addNPCMessage = (dialogue) => {
        setMessages((prev) => [
            ...prev,
            {
                type: "npc",
                text: dialogue.npcMessage,
                textTH: dialogue.npcMessageTH,
                avatar: selectedChar?.img,
            },
        ]);

        // Show options after a delay
        setTimeout(() => {
            setShowOptions(true);
        }, 800);
    };

    // Handle option selection
    const handleOptionSelect = (option, dialogueIndex) => {
        setSelectedOption(option);
        setShowOptions(false);

        // Add user message
        setMessages((prev) => [
            ...prev,
            {
                type: "user",
                text: option.text,
                textTH: option.textTH,
            },
        ]);

        // Award XP
        if (option.xp > 0) {
            totalXPRef.current += option.xp;
            setTotalXP(totalXPRef.current);
        }

        // Add NPC response after delay
        setTimeout(() => {
            const currentDialogue = dialogues[dialogueIndex];

            setMessages((prev) => [
                ...prev,
                {
                    type: "npc",
                    text: option.correct
                        ? currentDialogue.correctResponse
                        : "Hmm, okay... Let's continue!",
                    textTH: option.correct
                        ? currentDialogue.correctResponseTH
                        : "อืม... โอเค... ไปต่อกันเลย!",
                    avatar: selectedChar?.img,
                },
            ]);

            // Move to next dialogue or complete
            setTimeout(() => {
                if (dialogueIndex < dialogues.length - 1) {
                    const nextIndex = dialogueIndex + 1;
                    setCurrentDialogueIndex(nextIndex);
                    addNPCMessage(dialogues[nextIndex]);
                } else {
                    // Conversation complete
                    setIsComplete(true);
                    setMessages((prev) => [
                        ...prev,
                        {
                            type: "system",
                            text: `🎉 Conversation Complete! You earned ${totalXPRef.current} XP!`,
                        },
                    ]);
                }
                setSelectedOption(null);
            }, 1000);
        }, 600);
    };

    // Handle back
    const handleBack = () => {
        if (totalXPRef.current > 0 && addXP) {
            addXP(totalXPRef.current);
        }
        setScreen("char-select");
    };

    // Empty state
    if (!selectedChar || dialogues.length === 0) {
        return (
            <div className="h-full flex flex-col bg-slate-950">
                <Header
                    title="Role-play"
                    subtitle="No dialogues available"
                    showBack
                    onBack={() => setScreen("char-select")}
                />
                <div className="flex-1 flex items-center justify-center text-slate-400">
                    This hero has no vocabulary for role-play.
                </div>
            </div>
        );
    }

    const currentDialogue = dialogues[currentDialogueIndex];

    return (
        <div className="h-full flex flex-col bg-slate-950">
            {/* Header */}
            <Header
                title="Role-play"
                subtitle={`Chat with ${selectedChar.name}`}
                showBack
                onBack={handleBack}
            />

            {/* XP Counter */}
            <div className="px-4 py-2 flex items-center justify-between text-xs border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <MessageCircle size={14} className="text-blue-400" />
                    <span className="text-slate-400">
                        {currentDialogueIndex + 1}/{dialogues.length}
                    </span>
                </div>
                {totalXP > 0 && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 font-bold">
                        +{totalXP} XP
                    </span>
                )}
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        {msg.type === "npc" && (
                            <div className="flex gap-3 items-start mb-2">
                                {/* Avatar */}
                                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-blue-400 shadow-lg">
                                        {msg.avatar ? (
                                            <img src={msg.avatar} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User size={24} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-medium">{selectedChar?.name}</span>
                                </div>
                                {/* Message Bubble */}
                                <div className="max-w-[70%] flex-1">
                                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-lg border border-slate-700">
                                        <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                                        {msg.textTH && (
                                            <p className="text-slate-400 text-xs mt-2 font-thai border-t border-slate-700 pt-2">{msg.textTH}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => speakText(msg.text)}
                                        className="mt-2 text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 ml-2"
                                    >
                                        <Volume2 size={12} /> ฟังเสียง
                                    </button>
                                </div>
                            </div>
                        )}

                        {msg.type === "user" && (
                            <div className="flex flex-col items-end">
                                <div className="max-w-[75%] bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg">
                                    <p className="text-white text-sm">{msg.text}</p>
                                    {msg.textTH && (
                                        <p className="text-blue-200 text-xs mt-2 border-t border-blue-500/50 pt-2">{msg.textTH}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => speakText(msg.text)}
                                    className="mt-2 mr-2 text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1"
                                >
                                    <Volume2 size={12} /> ฟังเสียง
                                </button>
                            </div>
                        )}

                        {msg.type === "system" && (
                            <div className="flex justify-center">
                                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-full px-4 py-2">
                                    <p className="text-emerald-400 text-sm font-bold text-center">{msg.text}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Options / Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/80">
                {showOptions && currentDialogue && (
                    <div className="space-y-2">
                        <p className="text-xs text-slate-400 mb-2">Choose your response:</p>
                        {currentDialogue.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(option, currentDialogueIndex)}
                                className="w-full text-left px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 text-white text-sm transition-all"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                )}

                {!showOptions && !isComplete && (
                    <div className="flex items-center justify-center py-4">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}

                {isComplete && (
                    <button
                        onClick={handleBack}
                        className="w-full h-12 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                    >
                        Finish & Collect {totalXP} XP
                    </button>
                )}
            </div>
        </div>
    );
}
