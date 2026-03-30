// src/data/features.js
import {
  Target,
  BookOpen,
  Trophy,
  Mic,
  MessageCircle,
  Layers,
  BarChart3,
  Keyboard,
} from "lucide-react";

/* =========================
   ROV FEATURES
========================= */
export const ROV_FEATURES = [
  {
    id: "hotspots",
    title: "Hotspots",
    subtitle: "Explore Characters",
    icon: Target,
  },
  {
    id: "flashcards",
    title: "Flashcards",
    subtitle: "Review Words",
    icon: BookOpen,
    // Lv.1 - พื้นฐาน ปลดล็อคตั้งแต่ต้น
  },
  {
    id: "quiz",
    title: "Quiz",
    subtitle: "Multiple Choice",
    icon: Trophy,
    unlockAt: 5,
  },
  {
    id: "spelling",
    title: "Spelling",
    subtitle: "Type to Fight",
    icon: Keyboard,
    unlockAt: 10,
  },
  {
    id: "speaking",
    title: "Speaking",
    subtitle: "Listen & Repeat",
    icon: Mic,
    unlockAt: 15,
  },
  {
    id: "roleplay",
    title: "Role-play",
    subtitle: "Game Chat",
    icon: MessageCircle,
    unlockAt: 20,
  },
  { id: "my-vocab", title: "My Vocab", subtitle: "Collection", icon: Layers },
  { id: "progress", title: "Progress", subtitle: "Stats", icon: BarChart3 },
];

/* =========================
   LEVEL REWARDS
========================= */
export const LEVEL_REWARDS = [
  { level: 5, type: "unlock", target: "quiz", label: "Quiz Unlocked" },
  { level: 10, type: "unlock", target: "spelling", label: "Spelling Unlocked" },
  { level: 15, type: "unlock", target: "speaking", label: "Speaking Mode Unlocked" },
  { level: 20, type: "unlock", target: "roleplay", label: "Role-play Unlocked" },
  { level: 25, type: "title", target: "Veteran", label: "New Title: Veteran" },
];

// GAMES ย้ายไปที่ @/data/games.js แล้ว
