import { useState } from "react";
import {
  Shield,
  KeyRound,
  LogOut,
  Trophy,
  BookOpen,
  Award,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { apiChangePassword } from "../api";

export default function ProfileScreen({
  currentUser,
  level = 1,
  xp = 0,
  progressPercent = 0,
  myVocabCount = 0,
  onLogout,
  onNavigateAdmin,
  onShowTutorial,
}) {
  const [showChangePw, setShowChangePw] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const isAdmin = currentUser?.role === "admin";
  const userRank = currentUser?.rank || "Silver II";

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) {
      alert("Passwords do not match");
      return;
    }
    if (pwForm.newPw.length < 3) {
      alert("New password must be at least 3 characters");
      return;
    }

    setSaving(true);
    try {
      const res = await apiChangePassword(pwForm.current, pwForm.newPw);
      setMessage({ type: "success", text: res.message || "Password changed successfully" });
      setPwForm({ current: "", newPw: "", confirm: "" });
      setTimeout(() => setShowChangePw(false), 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to change password" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-y-auto pb-24 scrollbar-hide">
      {/* Header Profile Card */}
      <header className="px-5 pt-6 pb-6 bg-white border-b border-slate-200/60 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-md mb-3">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-blue-600 text-2xl font-black">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "P"}
            </div>
          </div>

          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {currentUser?.name || currentUser?.username || "Player"}
          </h2>
          <p className="text-xs text-slate-400 font-medium">@{currentUser?.username || "player"}</p>

          <div className="flex items-center gap-2 mt-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center gap-1">
              <Trophy size={13} /> {userRank}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-1">
              <Award size={13} /> Level {level}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
              <BookOpen size={13} /> {myVocabCount} Words
            </span>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-5 max-w-xs mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1.5">
            <span>Level {level} Progress</span>
            <span className="text-blue-600 font-extrabold">{progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
            Total {xp.toLocaleString()} XP earned
          </p>
        </div>
      </header>

      {/* Account & Settings Options */}
      <div className="p-5 space-y-3">
        {/* Admin Panel button if role === admin */}
        {isAdmin && (
          <button
            onClick={onNavigateAdmin}
            className="w-full bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <Shield size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm">Admin Control Panel</h4>
                <p className="text-xs text-slate-300">Manage users, content & analytics</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        )}

        {/* Change Password Button */}
        <button
          onClick={() => setShowChangePw(!showChangePw)}
          className="w-full bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <KeyRound size={18} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm text-slate-800">Change Password</h4>
              <p className="text-xs text-slate-400">Update your account credentials</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>

        {/* Change Password Form Drawer */}
        {showChangePw && (
          <form
            onSubmit={handleChangePassword}
            className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm animate-scale-in"
          >
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1">
              New Password Setup
            </h4>
            {message && (
              <div
                className={`p-2.5 rounded-xl text-xs font-semibold ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {message.text}
              </div>
            )}
            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">Current Password</label>
              <input
                type="password"
                required
                value={pwForm.current}
                onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                placeholder="••••••"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">New Password</label>
              <input
                type="password"
                required
                value={pwForm.newPw}
                onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                placeholder="At least 3 characters"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={pwForm.confirm}
                onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                placeholder="Confirm password"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Password"}
            </button>
          </form>
        )}

        {/* Tutorial */}
        <button
          onClick={onShowTutorial}
          className="w-full bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <HelpCircle size={18} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm text-slate-800">How to Play</h4>
              <p className="text-xs text-slate-400">View game mechanics tutorial</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full bg-rose-50 hover:bg-rose-100/80 text-rose-700 border border-rose-200/80 rounded-2xl p-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-colors mt-6 shadow-xs"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
