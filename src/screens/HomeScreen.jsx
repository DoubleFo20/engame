import { useState } from "react";
import {
  Bell,
  Sparkles,
  BookOpen,
  Zap,
  Flame,
  Target,
  ChevronRight,
  Eye,
  Layers,
  HelpCircle,
  Mic,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { CHARACTERS } from "@/data/characters";

export default function HomeScreen({
  currentUser,
  myVocab = [],
  onNavigateTab,
  onStartPractice,
  onSelectHero,
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Daily featured hero from 111 heroes roster
  const featuredHero = CHARACTERS.find((c) => c.name === "Krixi") || CHARACTERS[3] || CHARACTERS[0];
  const userXP = currentUser?.xp ?? 0;
  const userRank = currentUser?.rank || "Silver II";
  const vocabCount = myVocab.length;
  const masteredCount = myVocab.filter((v) => v.mastered).length;

  // 2x2 Metric Grid Data
  const stats = [
    {
      id: "mastered",
      label: "Words Mastered",
      value: masteredCount > 0 ? masteredCount : Math.min(vocabCount, 12),
      subtext: `${vocabCount} in vault`,
      icon: BookOpen,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "xp",
      label: "Total XP",
      value: userXP.toLocaleString(),
      subtext: `Rank ${userRank}`,
      icon: Zap,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "streak",
      label: "Study Streak",
      value: "5 Days",
      subtext: "Top 10% active",
      icon: Flame,
      iconColor: "text-amber-500 bg-amber-50",
    },
    {
      id: "accuracy",
      label: "Quiz Accuracy",
      value: "94%",
      subtext: "Last 20 quizzes",
      icon: Target,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
  ];

  // Quick Actions (Game Modes)
  const quickActions = [
    {
      id: "hotspots",
      title: "Word Hunt",
      subtitle: "Visual Hotspots",
      icon: Eye,
      gradient: "from-blue-600 to-indigo-600",
      bgSoft: "bg-blue-50 text-blue-600",
    },
    {
      id: "flashcards",
      title: "Flashcards",
      subtitle: "Smart Review",
      icon: Layers,
      gradient: "from-purple-600 to-pink-600",
      bgSoft: "bg-purple-50 text-purple-600",
    },
    {
      id: "quiz",
      title: "Quiz Arena",
      subtitle: "4-Choice Battle",
      icon: HelpCircle,
      gradient: "from-emerald-600 to-teal-600",
      bgSoft: "bg-emerald-50 text-emerald-600",
    },
    {
      id: "speaking",
      title: "Speaking Lab",
      subtitle: "Voice Coach",
      icon: Mic,
      gradient: "from-amber-500 to-orange-600",
      bgSoft: "bg-amber-50 text-amber-600",
    },
  ];

  // Recent Activity sample
  const recentActivities = [
    {
      id: 1,
      title: "Broadsword",
      subtitle: "Butterfly · Weapon",
      timestamp: "10 mins ago",
      status: "Mastered",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      icon: CheckCircle2,
    },
    {
      id: 2,
      title: "Tactical Suit",
      subtitle: "Violet · Attire",
      timestamp: "1 hour ago",
      status: "Review",
      statusColor: "text-amber-700 bg-amber-50 border-amber-200",
      icon: Clock,
    },
    {
      id: 3,
      title: "Wings of Grace",
      subtitle: "Krixi · Equipment",
      timestamp: "Yesterday",
      status: "Learned",
      statusColor: "text-blue-700 bg-blue-50 border-blue-200",
      icon: Sparkles,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-y-auto pb-6 scrollbar-hide">
      {/* ===== 1. iOS Status Bar & Header ===== */}
      <header className="px-5 pt-4 pb-3 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 shadow-xs">
        <div className="flex items-center justify-between">
          {/* User profile avatar & info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-blue-600 text-sm overflow-hidden">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "H"}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-slate-900 text-sm leading-tight">
                  {currentUser?.name || currentUser?.username || "ROV Challenger"}
                </h2>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                  {userRank}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Ready for your daily quest</p>
            </div>
          </div>

          {/* Notification bell with active ping dot */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 flex items-center justify-center text-slate-600 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {/* Notification Dropdown Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-scale-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-xs text-slate-800">Notifications</h4>
                  <span className="text-[10px] text-blue-600 font-semibold">1 New</span>
                </div>
                <div className="py-2.5 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">111 Heroes Ready!</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Explore vocabulary across all ROV champions in the new Heroes tab.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Screen Body */}
      <div className="px-5 pt-4 space-y-4">
        {/* ===== 2. Hero Highlight Banner ===== */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-4.5 shadow-md shadow-blue-500/10 border border-blue-500/30">
          {/* Subtle background glow effect */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-[62%]">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wide uppercase text-blue-100 mb-1.5">
                <Sparkles size={10} /> Hero of the Day
              </div>
              <h3 className="font-extrabold text-lg text-white leading-snug">
                {featuredHero.name}
              </h3>
              <p className="text-xs text-blue-100/90 mt-1 line-clamp-2">
                Master 5 magical equipment & ability vocabulary words today!
              </p>
              <button
                onClick={() => {
                  if (onSelectHero) onSelectHero(featuredHero);
                  if (onStartPractice) onStartPractice("hotspots");
                }}
                className="mt-3 px-3.5 py-1.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>Train Now</span>
                <ArrowUpRight size={13} />
              </button>
            </div>

            {/* Featured Hero Portrait */}
            <div className="w-24 h-28 relative flex-shrink-0">
              <img
                src={featuredHero.img}
                alt={featuredHero.name}
                className="w-full h-full object-cover rounded-xl shadow-lg border border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-300"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                {featuredHero.role}
              </span>
            </div>
          </div>
        </section>

        {/* ===== 3. Stat Grid (2x2) ===== */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Training Metrics
            </h3>
            <span className="text-[11px] text-blue-600 font-semibold cursor-pointer" onClick={() => onNavigateTab("profile")}>
              View Details
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-3.5 flex flex-col justify-between hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500 leading-none">
                      {stat.label}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.iconColor}`}>
                      <Icon size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-800 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {stat.subtext}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== 4. Quick Actions (Training Modes) ===== */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Practice
            </h3>
            <span className="text-[11px] text-blue-600 font-semibold cursor-pointer" onClick={() => onNavigateTab("practice")}>
              All 6 Modes
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onStartPractice(action.id)}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3 text-left hover:border-blue-300 hover:shadow-xs transition-all group active:scale-[0.98]"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${action.bgSoft} group-hover:scale-105 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                      {action.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                      {action.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ===== 5. Recent Activity / List Cards ===== */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recent Activity
            </h3>
            <span
              onClick={() => onNavigateTab("vocab")}
              className="text-[11px] text-blue-600 font-semibold cursor-pointer flex items-center gap-0.5"
            >
              Vocab Vault <ChevronRight size={12} />
            </span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs divide-y divide-slate-100 overflow-hidden">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium truncate">
                        {act.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${act.statusColor}`}>
                      {act.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
