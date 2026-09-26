import { Eye, Layers, HelpCircle, Mic, SpellCheck, MessageSquare, ChevronRight, Zap } from "lucide-react";

export default function PracticeHub({ onSelectMode }) {
  const modes = [
    {
      id: "hotspots",
      title: "Hotspot Discovery",
      subtitle: "Explore interactive body & weapon vocabulary on hero models",
      icon: Eye,
      tag: "Visual",
      xp: "+20 XP",
      color: "text-blue-600 bg-blue-50 border-blue-200/80",
    },
    {
      id: "flashcards",
      title: "Vocabulary Flashcards",
      subtitle: "Spaced repetition cards with native audio pronunciations",
      icon: Layers,
      tag: "Memory",
      xp: "+15 XP",
      color: "text-purple-600 bg-purple-50 border-purple-200/80",
    },
    {
      id: "quiz",
      title: "Quiz Arena",
      subtitle: "4-Choice multiple-choice challenge to test your knowledge",
      icon: HelpCircle,
      tag: "Battle",
      xp: "+30 XP",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
    },
    {
      id: "speaking",
      title: "Speaking Coach",
      subtitle: "Voice recognition AI scoring your English pronunciation",
      icon: Mic,
      tag: "Voice",
      xp: "+25 XP",
      color: "text-amber-600 bg-amber-50 border-amber-200/80",
    },
    {
      id: "spelling",
      title: "Spelling Bee",
      subtitle: "Spell character item and equipment names letter by letter",
      icon: SpellCheck,
      tag: "Writing",
      xp: "+20 XP",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200/80",
    },
    {
      id: "roleplay",
      title: "Battlefield Roleplay",
      subtitle: "Chat with ROV characters and solve in-game English scenarios",
      icon: MessageSquare,
      tag: "Dialogue",
      xp: "+40 XP",
      color: "text-rose-600 bg-rose-50 border-rose-200/80",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-hidden">
      <header className="px-5 pt-4 pb-3 bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20">
        <h1 className="text-lg font-black text-slate-900 tracking-tight">Practice Arena</h1>
        <p className="text-xs text-slate-400 font-medium">Select a training mode to level up your English</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide pb-24">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className="w-full bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl p-4 text-left shadow-xs hover:shadow-sm transition-all group flex items-start justify-between active:scale-[0.99]"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${m.color} group-hover:scale-105 transition-transform`}>
                  <Icon size={22} />
                </div>
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wide">
                      {m.tag}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                      <Zap size={10} /> {m.xp}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed line-clamp-2">
                    {m.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center flex-shrink-0 mt-2 transition-colors">
                <ChevronRight size={16} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
