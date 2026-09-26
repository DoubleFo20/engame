import { Home, Shield, Swords, BookMarked, User } from "lucide-react";

export default function BottomNavBar({ activeTab, onSelectTab, vocabCount = 0 }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "heroes", label: "Heroes", icon: Shield },
    { id: "practice", label: "Practice", icon: Swords },
    { id: "vocab", label: "My Vocab", icon: BookMarked, badge: vocabCount },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1.5 rounded-xl transition-all relative ${
              isActive
                ? "text-blue-600 font-semibold"
                : "text-slate-400 hover:text-slate-600 font-medium"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all relative ${
                isActive ? "bg-blue-50 text-blue-600 scale-105" : ""
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              {Boolean(tab.badge && tab.badge > 0) && (
                <span className="absolute -top-1 -right-1.5 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-sm">
                  {tab.badge > 99 ? "99+" : tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
