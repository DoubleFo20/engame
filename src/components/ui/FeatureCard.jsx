export default function FeatureCard({
  id,
  title,
  subtitle,
  icon: Icon,
  onClick,
  unlocked = {}, // กัน  underfined
}) {
  const REQUIRE_LEVEL = {
    quiz: 5,
    spelling: 10,
    speaking: 15,
    roleplay: 20,
  };

  const requiredLevel = REQUIRE_LEVEL[id];
  const isLocked = requiredLevel && !unlocked[id];

  return (
    <button
      onClick={!isLocked ? onClick : undefined}
      className={`relative rounded-xl p-4 text-left transition
        ${isLocked
          ? 'bg-slate-800 opacity-40 cursor-not-allowed'
          : 'bg-slate-900 hover:bg-slate-800 hover:scale-105'}
      `}
    >
      <Icon className="mb-2" />
      <div className="font-bold">{title}</div>
      <div className="text-xs text-slate-400">{subtitle}</div>

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center
                        bg-black/60 rounded-xl text-xs font-bold">
          🔒 Unlock at Lv.{requiredLevel}
        </div>
      )}
    </button>
  );
}
