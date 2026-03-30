import Header from '../components/ui/Header';

export default function ProgressScreen({
  level,
  xp,
  myVocab,
  onBack,
}) {
  return (
    <div className="h-full flex flex-col bg-slate-950 text-white">
      <Header
        title="Progress"
        subtitle="Your learning stats"
        showBack
        onBack={onBack}
      />

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {/* Level / XP */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-lg">
          <p className="text-xs text-slate-400 uppercase mb-1">Level & XP</p>
          <p className="text-3xl font-black">Lv. {level}</p>
          <p className="text-sm text-slate-300 mt-1">{xp} XP total</p>
          <p className="text-[11px] text-slate-500 mt-2">
            You gain XP from saving new words and doing activities.
          </p>
        </div>

        {/* My Vocab */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-lg">
          <p className="text-xs text-slate-400 uppercase mb-1">My Vocab</p>
          <p className="text-3xl font-black">
            {myVocab.length}{' '}
            <span className="text-base font-normal">words saved</span>
          </p>
        </div>

        {/* Daily Goal */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-lg">
          <p className="text-xs text-slate-400 uppercase mb-1">Daily Goal</p>
          <p className="text-sm text-slate-200">
            Save <span className="font-bold text-emerald-400">5 words</span> and
            finish <span className="font-bold text-emerald-400">1 quiz</span> per
            day.
          </p>
        </div>
      </div>
    </div>
  );
}
