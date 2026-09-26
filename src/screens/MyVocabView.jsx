import { useState } from "react";
import { BookOpen, Volume2, Trash2, X, Sparkles } from "lucide-react";

export default function MyVocabView({ myVocab = [], removeFromVocab }) {
  const [activeWord, setActiveWord] = useState(null);
  const hasWords = myVocab.length > 0;

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-hidden relative">
      {/* Header */}
      <header className="px-5 pt-4 pb-3 bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">Vocab Vault</h1>
          <p className="text-xs text-slate-400 font-medium">Your personal collection of mastered ROV words</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
          {myVocab.length} Saved
        </span>
      </header>

      {/* Empty State */}
      {!hasWords && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-16">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
            <BookOpen size={28} />
          </div>
          <h2 className="text-slate-800 font-bold text-base mb-1">
            No words saved yet
          </h2>
          <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
            Discover hotspots on heroes or play practice games to bookmark new English words here.
          </p>
        </div>
      )}

      {/* Cards Grid */}
      {hasWords && (
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 pb-28 scrollbar-hide">
          {myVocab.map((w) => (
            <button
              key={w.id || w.hotspot_id}
              onClick={() => setActiveWord(w)}
              className="bg-white border border-slate-200/80 rounded-2xl p-3.5 text-left shadow-xs hover:border-blue-400 hover:shadow-sm transition-all group flex flex-col justify-between active:scale-[0.98]"
            >
              <div>
                <span className="inline-block text-[9px] font-bold uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md mb-1.5">
                  {w.type || "Word"}
                </span>
                <h3 className="text-slate-800 font-bold text-sm group-hover:text-blue-600 transition-colors">
                  {w.word}
                </h3>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2 font-medium">
                  {w.mean}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <Sparkles size={11} /> Saved
                </span>
                <span className="group-hover:text-blue-600 font-bold">Details →</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Word Detail Drawer */}
      {activeWord && (
        <div className="absolute inset-x-0 bottom-0 z-50 bg-white border-t border-slate-200/90 p-5 rounded-t-3xl shadow-2xl animate-scale-in">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase mb-1">
                {activeWord.type || "Vocabulary"}
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {activeWord.word}
              </h2>
              <p className="text-slate-600 font-medium text-sm mt-1">{activeWord.mean}</p>
            </div>
            <button
              onClick={() => setActiveWord(null)}
              className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex gap-2.5 mt-4">
            <button
              onClick={() => {
                if ("speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                  const utterance = new SpeechSynthesisUtterance(activeWord.word);
                  utterance.lang = "en-US";
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
              className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Volume2 size={16} />
              <span>Pronounce</span>
            </button>

            <button
              onClick={() => {
                if (removeFromVocab) removeFromVocab(activeWord.id || activeWord.hotspot_id);
                setActiveWord(null);
              }}
              className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 size={16} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
