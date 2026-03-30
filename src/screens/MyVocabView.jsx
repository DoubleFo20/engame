// src/screens/MyVocabView.jsx
import React, { useState } from "react";
import { BookOpen, Volume2, Trash2, X } from "lucide-react";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

export default function MyVocabView({ myVocab, removeFromVocab, onBack }) {
  const [activeWord, setActiveWord] = useState(null);
  const hasWords = myVocab.length > 0;

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <Header
        title="My Vocab"
        subtitle="Your saved words"
        showBack
        onBack={onBack}
      />

      {/* ถ้าไม่มีคำศัพท์เลย แสดงหน้าว่างสวย ๆ */}
      {!hasWords && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
            <BookOpen className="text-slate-300" size={32} />
          </div>
          <h2 className="text-white font-bold text-lg mb-2">
            No words saved yet
          </h2>
          <p className="text-slate-400 text-sm">
            Tap hotspots or other activities to save vocabulary into your
            collection.
          </p>
        </div>
      )}

      {/* ถ้ามีคำศัพท์ แสดงเป็นการ์ดแบบ Grid */}
      {hasWords && (
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 pb-24">
          {myVocab.map((w) => (
            <button
              key={w.id}
              onClick={() => setActiveWord(w)}
              className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 text-left shadow-lg hover:border-blue-500 transition-all group"
            >
              <p className="text-[10px] text-blue-300 uppercase mb-1">
                {w.type}
              </p>
              <h3 className="text-white font-bold text-sm group-hover:text-blue-300">
                {w.word}
              </h3>
              <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                {w.mean}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* แถบรายละเอียดด้านล่าง เมื่อเลือกการ์ด */}
      {activeWord && (
        <div className="bg-slate-900 border-t border-slate-700 p-5 rounded-t-3xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[10px] text-blue-300 uppercase mb-1">
                {activeWord.type}
              </p>
              <h2 className="text-2xl font-black text-white">
                {activeWord.word}
              </h2>
              <p className="text-slate-300 mt-1">{activeWord.mean}</p>
            </div>
            <button
              onClick={() => setActiveWord(null)}
              className="p-2 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              icon={Volume2}
              onClick={() => {
                if ("speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                  const utterance = new SpeechSynthesisUtterance(activeWord.word);
                  utterance.lang = "en-US";
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
            >
              Listen
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              icon={Trash2}
              onClick={() => {
                removeFromVocab(activeWord.id);
                setActiveWord(null);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
