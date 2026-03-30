import { ChevronLeft, Star } from "lucide-react";

export default function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  level,
  xp,
  progressPercent,
}) {
  return (
    <header className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>

      {level != null && (
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          <Star size={14} />
          <span>Lv.{level}</span>
          <span className="text-slate-400 text-xs">{xp} XP</span>

          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
