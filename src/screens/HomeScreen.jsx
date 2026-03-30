// src/screens/HomeScreen.jsx
import React, { useState } from "react";
import { Swords, LogOut, Settings, BookOpen, KeyRound, X, Loader2 } from "lucide-react";
import { GAMES } from "@/data/games";
import { apiChangePassword } from "../api";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  icon: Icon,
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    ghost: "bg-transparent hover:bg-slate-800",
  };
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Header = ({ title, subtitle }) => (
  <header className="p-6 pb-4">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
  </header>
);

export default function HomeScreen({
  currentUser,
  onSelectGame,
  onLogout,
  onNavigateAdmin,
  onShowTutorial,
}) {
  const [showChangePw, setShowChangePw] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) return alert("รหัสผ่านใหม่ไม่ตรงกัน");
    if (pwForm.newPw.length < 3) return alert("Password ต้องมีอย่างน้อย 3 ตัวอักษร");
    setSaving(true);
    try {
      const result = await apiChangePassword(pwForm.current, pwForm.newPw);
      alert("✅ " + result.message);
      setShowChangePw(false);
      setPwForm({ current: "", newPw: "", confirm: "" });
    } catch (err) {
      alert("❌ " + (err.message || "เกิดข้อผิดพลาด"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <Header
        title="Dashboard"
        subtitle={`Welcome, ${currentUser.name} · ${currentUser.xp} XP`}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-wider">
          Select Training Game
        </h3>

        <div className="grid gap-4">
          {GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGame(g.id)}
              disabled={!g.active}
              className={`h-40 relative rounded-3xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02] shadow-2xl border ${g.active
                ? "border-yellow-600/30"
                : "opacity-50 grayscale border-slate-700"
                }`}
            >
              {/* พื้นหลังไล่สีของเกม */}
              <div className={`absolute inset-0 bg-gradient-to-r ${g.color}`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

              {/* โลโก้เกม (เช่น ROV) */}
              {g.logo && (
                <img
                  src={g.logo}
                  alt={`${g.name} logo`}
                  className="absolute top-4 left-4 h-8 w-auto drop-shadow-lg"
                />
              )}

              {/* ชื่อเกม + subtitle */}
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-3xl font-black text-white italic tracking-tighter">
                  {g.name}
                </h3>
                <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest">
                  {g.subtitle}
                </p>
              </div>

              {/* ไอคอนดาบด้านขวา */}
              <Swords className="absolute top-6 right-6 text-white/20 w-20 h-20 -rotate-12 group-hover:text-white/40 transition-colors" />
            </button>
          ))}
        </div>

        {currentUser.role === "admin" && (
          <Button
            variant="danger"
            className="mt-8 w-full"
            icon={Settings}
            onClick={onNavigateAdmin}
          >
            Admin Tools
          </Button>
        )}

        {/* Change Password Modal */}
        {showChangePw && (
          <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-yellow-500/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-yellow-400 flex items-center gap-1">
                <KeyRound size={14} /> เปลี่ยนรหัสผ่าน
              </h3>
              <button onClick={() => setShowChangePw(false)} className="text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">รหัสผ่านปัจจุบัน</label>
                <input
                  type="password"
                  value={pwForm.current}
                  onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                  placeholder="กรอกรหัสผ่านเดิม"
                  required
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">รหัสผ่านใหม่</label>
                <input
                  type="password"
                  value={pwForm.newPw}
                  onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                  placeholder="ตั้งรหัสผ่านใหม่"
                  required
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">ยืนยันรหัสผ่านใหม่</label>
                <input
                  type="password"
                  value={pwForm.confirm}
                  onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                  placeholder="กรอกอีกครั้ง"
                  required
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
              >
                {saving ? <><Loader2 size={12} className="animate-spin" /> กำลังบันทึก...</> : "💾 บันทึกรหัสผ่านใหม่"}
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={onShowTutorial}
            className="text-xs text-blue-400 hover:underline flex items-center gap-1"
          >
            <BookOpen size={14} /> วิธีเล่น
          </button>
          <button
            onClick={() => setShowChangePw(!showChangePw)}
            className="text-xs text-yellow-400 hover:underline flex items-center gap-1"
          >
            <KeyRound size={14} /> เปลี่ยนรหัสผ่าน
          </button>
          <button
            onClick={onLogout}
            className="text-xs text-red-400 hover:underline flex items-center gap-1"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
