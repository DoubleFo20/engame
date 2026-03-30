// src/screens/AdminScreen.jsx
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ChevronLeft, Users, BarChart3, BookOpen, Trash2, Plus,
  Edit3, Save, Search, X, UserCog, ImagePlus, Eye, Move, Sparkles, Loader2,
  Activity, KeyRound, Clock, Shield,
} from "lucide-react";
import {
  apiAddCharacter, apiUpdateCharacter, apiDeleteCharacter,
  apiAddHotspot, apiUpdateHotspot, apiDeleteHotspot,
  apiDeleteUser, apiUpdateUser as apiUpdateUserFn, apiGenerateHotspots,
  apiUnblockUser, apiGetRecentLogs, apiGetActivityStats, apiResetPassword,
} from "../api";

// ===== Tab 1: User Management =====
function UsersTab({ users, onDeleteUser, onUpdateUser, onReloadUsers }) {
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resetPwUser, setResetPwUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  const filtered = users.filter(
    (u) =>
      (u.name || u.username).toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  const getLevel = (xp) => Math.floor((xp || 0) / 100) + 1;

  const handleSaveUser = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      await apiUpdateUserFn(editingUser.id, {
        name: editingUser.name,
        xp: editingUser.xp,
        role: editingUser.role,
      });
      onUpdateUser(editingUser);
      setEditingUser(null);
      if (onReloadUsers) await onReloadUsers();
    } catch (err) {
      alert('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!confirm(`Block user "${user.name || user.username}"? (ผู้ใช้จะเข้าสู่ระบบไม่ได้ แต่ข้อมูลยังอยู่ในฐานข้อมูล)`)) return;
    try {
      await apiDeleteUser(user.id);
      if (onReloadUsers) await onReloadUsers();
    } catch (err) {
      alert('Failed to block: ' + err.message);
    }
  };

  const handleUnblockUser = async (user) => {
    if (!confirm(`Unblock user "${user.name || user.username}"? (ผู้ใช้จะเข้าสู่ระบบได้อีกครั้ง)`)) return;
    try {
      await apiUnblockUser(user.id);
      if (onReloadUsers) await onReloadUsers();
    } catch (err) {
      alert('Failed to unblock: ' + err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!resetPwUser || !newPassword) return;
    if (newPassword.length < 3) { alert('Password must be at least 3 characters'); return; }
    setResetting(true);
    try {
      await apiResetPassword(resetPwUser.id, newPassword);
      alert(`✅ Password reset for "${resetPwUser.username}"`);
      setResetPwUser(null);
      setNewPassword("");
    } catch (err) {
      alert('Failed: ' + err.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-800 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-white">{users.length}</p>
          <p className="text-[10px] text-slate-400">Total Users</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-emerald-400">
            {users.filter((u) => !u.is_blocked).length}
          </p>
          <p className="text-[10px] text-slate-400">Active</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-red-400">
            {users.filter((u) => u.is_blocked).length}
          </p>
          <p className="text-[10px] text-slate-400">Blocked</p>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="bg-slate-800 rounded-xl p-4 border border-blue-500/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-blue-400 flex items-center gap-1">
              <UserCog size={13} /> Edit: @{editingUser.username}
            </p>
            <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">Display Name</label>
              <input
                type="text"
                value={editingUser.name || ""}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">XP</label>
              <input
                type="number"
                min="0"
                value={editingUser.xp || 0}
                onChange={(e) => setEditingUser({ ...editingUser, xp: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">Role</label>
              <select
                value={editingUser.role || "guest"}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="guest">Guest (Player)</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveUser}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
            >
              <Save size={12} /> Save Changes
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* User list */}
      <div className="flex flex-col gap-2">
        {filtered.map((user) => (
          <div
            key={user.username}
            className={`bg-slate-800 rounded-xl p-3 flex items-center justify-between border ${user.is_blocked ? 'border-red-500/40 opacity-60' : 'border-slate-700'}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm truncate ${user.is_blocked ? 'text-slate-400 line-through' : 'text-white'}`}>
                  {user.name || user.username}
                </span>
                {user.role === "admin" && (
                  <span className="text-[9px] bg-blue-600 px-1.5 py-0.5 rounded font-bold">
                    ADMIN
                  </span>
                )}
                {user.is_blocked ? (
                  <span className="text-[9px] bg-red-600 px-1.5 py-0.5 rounded font-bold">
                    BLOCKED
                  </span>
                ) : null}
              </div>
              <p className="text-[10px] text-slate-400">@{user.username}</p>
              <div className="flex gap-3 mt-1">
                <span className="text-[10px] text-yellow-400">
                  Lv.{getLevel(user.xp)}
                </span>
                <span className="text-[10px] text-slate-400">
                  {user.xp || 0} XP
                </span>
                <span className="text-[10px] text-slate-500">
                  {user.rank || "Unranked"}
                </span>
              </div>
            </div>

            <div className="flex gap-1">
              {/* Edit button */}
              <button
                onClick={() => setEditingUser({ ...user })}
                className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                title="Edit user"
              >
                <Edit3 size={14} />
              </button>
              {/* Reset Password button */}
              {user.role !== "admin" && (
                <button
                  onClick={() => { setResetPwUser(user); setNewPassword(""); }}
                  className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
                  title="Reset password"
                >
                  <KeyRound size={14} />
                </button>
              )}
              {/* Block/Unblock button — admin cannot be blocked */}
              {user.role !== "admin" && (
                user.is_blocked ? (
                  <button
                    onClick={() => handleUnblockUser(user)}
                    className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                    title="Unblock user"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Block user"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </button>
                )
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">No users found</p>
        )}
      </div>

      {/* Reset Password Modal */}
      {resetPwUser && (
        <div className="bg-slate-800 rounded-xl p-4 border border-yellow-500/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-yellow-400 flex items-center gap-1">
              <KeyRound size={13} /> Reset Password: @{resetPwUser.username}
            </p>
            <button onClick={() => setResetPwUser(null)} className="text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 mb-1 block">New Password</label>
            <input
              type="text"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleResetPassword}
              disabled={resetting || !newPassword}
              className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
            >
              {resetting ? <Loader2 size={12} className="animate-spin" /> : <KeyRound size={12} />}
              {resetting ? 'Resetting...' : 'Reset Password'}
            </button>
            <button
              onClick={() => setResetPwUser(null)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Tab 2: Statistics =====
function StatsTab({ users, characters }) {
  const players = users.filter((u) => u.role !== "admin");
  const totalXP = players.reduce((sum, u) => sum + (u.xp || 0), 0);
  const avgXP = players.length > 0 ? Math.round(totalXP / players.length) : 0;
  const maxXP = players.length > 0 ? Math.max(...players.map((u) => u.xp || 0)) : 0;
  const topPlayer = players.find((u) => (u.xp || 0) === maxXP);
  const getLevel = (xp) => Math.floor((xp || 0) / 100) + 1;
  const totalWords = characters.reduce((sum, c) => sum + (c.hotspots?.length || 0), 0);

  return (
    <div className="flex flex-col gap-3">
      {/* Overview cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-700/30 rounded-xl p-4">
          <p className="text-2xl font-black text-white">{players.length}</p>
          <p className="text-xs text-blue-300">Total Players</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-700/30 rounded-xl p-4">
          <p className="text-2xl font-black text-white">{totalXP}</p>
          <p className="text-xs text-emerald-300">Total XP Earned</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-700/30 rounded-xl p-4">
          <p className="text-2xl font-black text-white">{avgXP}</p>
          <p className="text-xs text-purple-300">Average XP</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 rounded-xl p-4">
          <p className="text-2xl font-black text-white">{totalWords}</p>
          <p className="text-xs text-yellow-300">Total Vocab Words</p>
        </div>
      </div>

      {/* Top Player */}
      {topPlayer && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-bold mb-2">🏆 Top Player</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-white">{topPlayer.name || topPlayer.username}</p>
              <p className="text-xs text-slate-400">@{topPlayer.username}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-yellow-400">Lv.{getLevel(topPlayer.xp)}</p>
              <p className="text-xs text-slate-400">{topPlayer.xp} XP</p>
            </div>
          </div>
        </div>
      )}

      {/* Player Ranking */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <p className="text-xs text-slate-400 uppercase font-bold mb-3">📊 Player Ranking</p>
        <div className="flex flex-col gap-2">
          {[...players]
            .sort((a, b) => (b.xp || 0) - (a.xp || 0))
            .map((player, i) => (
              <div key={player.username} className="flex items-center gap-3">
                <span className={`text-sm font-bold w-6 text-center ${i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-amber-600" : "text-slate-500"
                  }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{player.name || player.username}</p>
                </div>
                <span className="text-xs text-slate-400">Lv.{getLevel(player.xp)}</span>
                <span className="text-xs text-yellow-400 w-16 text-right">{player.xp || 0} XP</span>
              </div>
            ))}
          {players.length === 0 && (
            <p className="text-center text-slate-500 text-sm">No players yet</p>
          )}
        </div>
      </div>

      {/* Characters word count */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <p className="text-xs text-slate-400 uppercase font-bold mb-3">📚 Words per Character</p>
        <div className="flex flex-col gap-2">
          {characters.map((c) => (
            <div key={c.id} className="flex items-center justify-between">
              <span className="text-sm text-white">{c.name} ({c.role})</span>
              <span className="text-xs text-slate-400">{c.hotspots?.length || 0} words</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== Hotspot Preview Popup =====
function HotspotPreviewPopup({ character, hotspot, allHotspots, onChangePosition, onClose, onSave, saving }) {
  const imgRef = useRef(null);
  const [editData, setEditData] = useState({ ...hotspot });
  const [isDragging, setIsDragging] = useState(false);

  const handleImageClick = useCallback((e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.max(0, Math.min(100, Math.round(x * 100) / 100));
    const clampedY = Math.max(0, Math.min(100, Math.round(y * 100) / 100));
    setEditData((prev) => ({ ...prev, x: clampedX, y: clampedY }));
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.max(0, Math.min(100, Math.round(x * 100) / 100));
    const clampedY = Math.max(0, Math.min(100, Math.round(y * 100) / 100));
    setEditData((prev) => ({ ...prev, x: clampedX, y: clampedY }));
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="bg-slate-900 w-full max-w-lg mx-4 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-blue-400" />
            <span className="text-sm font-bold text-white">{hotspot.id ? 'Edit Hotspot' : 'Preview Hotspot'}</span>
            <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-400">{character.name}</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Image Preview — phone-shaped container matching game view aspect ratio */}
        <div className="bg-slate-950 p-3 flex justify-center select-none">
          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-xl border border-slate-700"
            style={{ width: '260px', height: '440px' }}
            onClick={handleImageClick}
          >
            <img
              src={character.img}
              alt={character.name}
              className="w-full h-full object-cover opacity-70 pointer-events-none"
              draggable={false}
            />
            {/* Other hotspots (dimmed) */}
            {allHotspots.filter((h) => h.id !== editData.id).map((h) => (
              <div
                key={h.id}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="absolute w-6 h-6 -ml-3 -mt-3 bg-blue-500/60 border-2 border-white/40 rounded-full flex items-center justify-center pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.4)]"
              >
                <div className="w-2 h-2 bg-white/60 rounded-full" />
              </div>
            ))}
            {/* Editing hotspot (highlighted) */}
            <div
              style={{ left: `${editData.x}%`, top: `${editData.y}%` }}
              className="absolute w-9 h-9 -ml-[18px] -mt-[18px] cursor-grab active:cursor-grabbing transition-all duration-100"
              onPointerDown={(e) => { e.preventDefault(); setIsDragging(true); }}
            >
              <div className="w-full h-full bg-yellow-400/90 border-2 border-white rounded-full animate-pulse flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.7)]">
                <Move className="text-white" size={14} />
              </div>
              {/* Label */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap bg-slate-900/90 border border-yellow-500/50 px-2 py-0.5 rounded text-[9px] text-yellow-300 font-bold shadow-lg">
                {editData.word || 'New'}
              </div>
            </div>
            {/* Position indicator */}
            <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-700 px-2 py-1 rounded-lg text-[10px] text-slate-300 font-mono">
              X: {editData.x} / Y: {editData.y}
            </div>
            {/* Instruction hint */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-slate-700 px-2 py-1 rounded-lg text-[10px] text-slate-400 flex items-center gap-1 whitespace-nowrap">
              <Move size={10} /> คลิกหรือลากเพื่อย้ายตำแหน่ง
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="p-4 flex flex-col gap-2 overflow-y-auto border-t border-slate-800">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="text-[10px] text-slate-400 mb-1 block">Word (คำศัพท์)</label>
              <input
                type="text"
                value={editData.word}
                onChange={(e) => setEditData({ ...editData, word: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="English word"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">Type</label>
              <input
                type="text"
                list="hotspot-types"
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="e.g. Weapon"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 mb-1 block">Meaning (ความหมาย)</label>
            <input
              type="text"
              value={editData.mean}
              onChange={(e) => setEditData({ ...editData, mean: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              placeholder="Thai meaning"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">X Position (0-100)</label>
              <input
                type="number" min="0" max="100" step="0.5"
                value={editData.x}
                onChange={(e) => setEditData({ ...editData, x: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 mb-1 block">Y Position (0-100)</label>
              <input
                type="number" min="0" max="100" step="0.5"
                value={editData.y}
                onChange={(e) => setEditData({ ...editData, y: Number(e.target.value) })}
                className="w-full px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => onSave(editData)}
              disabled={saving || !editData.word?.trim() || !editData.mean?.trim()}
              className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <Save size={12} /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Tab 3: Content Management =====
function ContentTab({ characters, onUpdateCharacters, onReloadCharacters }) {
  const [selectedCharId, setSelectedCharId] = useState(null);
  const [editingWord, setEditingWord] = useState(null);
  const [showAddWord, setShowAddWord] = useState(false);
  const [showAddChar, setShowAddChar] = useState(false);
  const [newWord, setNewWord] = useState({ word: "", mean: "", type: "", x: "50", y: "50" });
  const [newChar, setNewChar] = useState({ name: "", role: "", img: "" });
  const [editingChar, setEditingChar] = useState(null);
  const [saving, setSaving] = useState(false);
  const [previewPopup, setPreviewPopup] = useState(null); // { mode: 'edit'|'add'|'preview', hotspot, character }
  const [addWordPreview, setAddWordPreview] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  const selectedChar = characters.find((c) => c.id === selectedCharId);

  const handleAddWord = async () => {
    if (!newWord.word.trim() || !newWord.mean.trim() || !newWord.type.trim()) {
      alert("Please fill in all fields");
      return;
    }
    setSaving(true);
    try {
      await apiAddHotspot({
        character_id: selectedCharId,
        x: Math.max(0, Math.min(100, Number(newWord.x) || 50)),
        y: Math.max(0, Math.min(100, Number(newWord.y) || 50)),
        word: newWord.word.trim(),
        mean: newWord.mean.trim(),
        type: newWord.type.trim(),
      });
      await onReloadCharacters();
      setNewWord({ word: "", mean: "", type: "", x: "50", y: "50" });
      setShowAddWord(false);
    } catch (err) {
      alert('Failed to add word: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // AI Auto-generate hotspots
  const handleAiGenerate = async () => {
    if (!selectedCharId) return;
    if (selectedChar?.hotspots?.length > 0) {
      if (!confirm(`"${selectedChar.name}" already has ${selectedChar.hotspots.length} words. AI will ADD more hotspots. Continue?`)) return;
    }
    setAiGenerating(true);
    try {
      const result = await apiGenerateHotspots(selectedCharId);
      await onReloadCharacters();
      alert(`✅ AI generated ${result.hotspots?.length || 0} hotspots!\nUse the edit button to fine-tune positions.`);
    } catch (err) {
      alert('❌ AI generation failed: ' + err.message);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleDeleteWord = async (wordId) => {
    try {
      await apiDeleteHotspot(wordId);
      await onReloadCharacters();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleSaveEdit = async (editData) => {
    const data = editData || editingWord;
    if (!data || !data.word?.trim() || !data.mean?.trim()) return;
    setSaving(true);
    try {
      await apiUpdateHotspot(data.id, {
        word: data.word.trim(),
        mean: data.mean.trim(),
        type: (data.type || '').trim(),
        x: Math.max(0, Math.min(100, Number(data.x) || 50)),
        y: Math.max(0, Math.min(100, Number(data.y) || 50)),
      });
      await onReloadCharacters();
      setEditingWord(null);
      setPreviewPopup(null);
    } catch (err) {
      alert('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFromPopup = async (editData) => {
    if (previewPopup?.mode === 'add') {
      // Adding new word via popup
      if (!editData.word?.trim() || !editData.mean?.trim() || !editData.type?.trim()) {
        alert('Please fill in all fields');
        return;
      }
      setSaving(true);
      try {
        await apiAddHotspot({
          character_id: selectedCharId,
          x: Math.max(0, Math.min(100, Number(editData.x) || 50)),
          y: Math.max(0, Math.min(100, Number(editData.y) || 50)),
          word: editData.word.trim(),
          mean: editData.mean.trim(),
          type: editData.type.trim(),
        });
        await onReloadCharacters();
        setNewWord({ word: "", mean: "", type: "", x: "50", y: "50" });
        setShowAddWord(false);
        setPreviewPopup(null);
      } catch (err) {
        alert('Failed to add word: ' + err.message);
      } finally {
        setSaving(false);
      }
    } else {
      // Editing existing word via popup
      await handleSaveEdit(editData);
    }
  };

  const handleAddCharacter = async () => {
    if (!newChar.name.trim() || !newChar.role.trim()) {
      alert("Please fill in Name and Role");
      return;
    }
    setSaving(true);
    try {
      await apiAddCharacter({
        name: newChar.name.trim(),
        role: newChar.role.trim(),
        img: newChar.img.trim() || "/characters/default.png",
      });
      await onReloadCharacters();
      setNewChar({ name: "", role: "", img: "" });
      setShowAddChar(false);
    } catch (err) {
      alert('Failed to add character: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCharacter = async (charId) => {
    try {
      await apiDeleteCharacter(charId);
      await onReloadCharacters();
      if (selectedCharId === charId) setSelectedCharId(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleEditCharacter = async () => {
    if (!editingChar || !editingChar.name.trim() || !editingChar.role.trim()) {
      alert("Name and Role are required");
      return;
    }
    setSaving(true);
    try {
      await apiUpdateCharacter(editingChar.id, {
        name: editingChar.name.trim(),
        role: editingChar.role.trim(),
        img: editingChar.img.trim() || "/characters/default.png",
        color: editingChar.color || "blue",
      });
      await onReloadCharacters();
      setEditingChar(null);
    } catch (err) {
      alert('Failed to update: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Character list view
  if (!selectedChar) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400 uppercase font-bold">Characters</p>
          <button
            onClick={() => setShowAddChar(!showAddChar)}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-bold"
          >
            <ImagePlus size={13} /> Add Character
          </button>
        </div>

        {/* Add Character Form */}
        {showAddChar && (
          <div className="bg-slate-800 rounded-xl p-3 border border-emerald-600/50 flex flex-col gap-2">
            <p className="text-xs font-bold text-emerald-400">New Character</p>
            <input
              type="text"
              placeholder="Name (e.g. Violet)"
              value={newChar.name}
              onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Role (e.g. Marksman)"
              value={newChar.role}
              onChange={(e) => setNewChar({ ...newChar, role: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Image path (e.g. /characters/name.png)"
              value={newChar.img}
              onChange={(e) => setNewChar({ ...newChar, img: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCharacter}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
              >
                <Save size={12} /> Save
              </button>
              <button
                onClick={() => { setShowAddChar(false); setNewChar({ name: "", role: "", img: "" }); }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Character list */}
        {characters.map((c) => (
          <div key={c.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            {/* Edit Character Form */}
            {editingChar?.id === c.id ? (
              <div className="p-3 flex flex-col gap-2 border border-blue-500/50 rounded-xl bg-slate-800">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-blue-400 flex items-center gap-1">
                    <Edit3 size={12} /> Edit Character
                  </p>
                  <button onClick={() => setEditingChar(null)} className="text-slate-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
                {/* Image Preview */}
                <div className="flex items-center gap-3">
                  <img
                    src={editingChar.img || "/characters/default.png"}
                    alt="preview"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-700 border border-slate-600"
                  />
                  <p className="text-[10px] text-slate-400">Preview</p>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  value={editingChar.name}
                  onChange={(e) => setEditingChar({ ...editingChar, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Marksman, Assassin)"
                  value={editingChar.role}
                  onChange={(e) => setEditingChar({ ...editingChar, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Image path (e.g. /characters/Violet_full.png)"
                  value={editingChar.img}
                  onChange={(e) => setEditingChar({ ...editingChar, img: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEditCharacter}
                    disabled={saving}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <Save size={12} /> {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setEditingChar(null)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setSelectedCharId(c.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.img} alt={c.name} className="w-12 h-12 rounded-lg object-cover bg-slate-700" />
                    <div>
                      <p className="font-bold text-white text-sm">{c.name}</p>
                      <p className="text-[10px] text-slate-400">{c.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-400">{c.hotspots?.length || 0}</p>
                    <p className="text-[10px] text-slate-400">words</p>
                  </div>
                </button>
                <div className="px-4 pb-3 flex justify-end gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingChar({ id: c.id, name: c.name, role: c.role, img: c.img, color: c.color });
                    }}
                    className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <Edit3 size={11} /> Edit Character
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete character "${c.name}" and all its words?`)) {
                        handleDeleteCharacter(c.id);
                      }
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 size={11} /> Delete Character
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Word management for selected character
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { setSelectedCharId(null); setShowAddWord(false); setEditingWord(null); }}
          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <div className="text-right">
          <p className="text-sm font-bold text-white">{selectedChar.name}</p>
          <p className="text-[10px] text-slate-400">{selectedChar.hotspots.length} words</p>
        </div>
      </div>

      {/* Add Word + AI Generate */}
      {!showAddWord ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddWord(true)}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={16} /> Add New Word
            </button>
            <button
              onClick={() => setPreviewPopup({ mode: 'add', hotspot: { id: null, word: '', mean: '', type: '', x: 50, y: 50 } })}
              className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1 transition-colors"
              title="Add with visual preview"
            >
              <Eye size={16} />
            </button>
          </div>
          <button
            onClick={handleAiGenerate}
            disabled={aiGenerating}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
          >
            {aiGenerating ? (
              <><Loader2 size={16} className="animate-spin" /> AI กำลังวิเคราะห์รูป...</>
            ) : (
              <><Sparkles size={16} /> 🤖 AI Auto Generate Hotspots</>
            )}
          </button>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl p-3 border border-emerald-600/50 flex flex-col gap-2">
          <p className="text-xs font-bold text-emerald-400">Add New Word</p>
          <input
            type="text"
            placeholder="English word"
            value={newWord.word}
            onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <input
            type="text"
            placeholder="Thai meaning (ความหมาย)"
            value={newWord.mean}
            onChange={(e) => setNewWord({ ...newWord, mean: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <input
            type="text"
            list="hotspot-types"
            placeholder="Type (e.g. Weapon, Attire)"
            value={newWord.type}
            onChange={(e) => setNewWord({ ...newWord, type: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 mb-1 block">X position (0-100)</label>
              <input
                type="number"
                min="0" max="100"
                value={newWord.x}
                onChange={(e) => setNewWord({ ...newWord, x: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 mb-1 block">Y position (0-100)</label>
              <input
                type="number"
                min="0" max="100"
                value={newWord.y}
                onChange={(e) => setNewWord({ ...newWord, y: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-sm text-white border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddWord}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
            >
              <Save size={12} /> Save
            </button>
            <button
              onClick={() => { setShowAddWord(false); setNewWord({ word: "", mean: "", type: "", x: "50", y: "50" }); }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hotspot Preview Popup */}
      {previewPopup && selectedChar && (
        <HotspotPreviewPopup
          character={selectedChar}
          hotspot={previewPopup.hotspot}
          allHotspots={selectedChar.hotspots}
          onClose={() => setPreviewPopup(null)}
          onSave={handleSaveFromPopup}
          saving={saving}
        />
      )}

      {/* Word list */}
      <div className="flex flex-col gap-2">
        {selectedChar.hotspots.map((h) => (
          <div key={h.id} className="bg-slate-800 rounded-xl p-3 border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{h.word}</span>
                  <span className="text-[9px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-400">{h.type}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{h.mean}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-mono">x:{h.x} y:{h.y}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setPreviewPopup({ mode: 'edit', hotspot: { ...h } })}
                  className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                  title="Edit with preview"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => { if (confirm(`Delete "${h.word}"?`)) handleDeleteWord(h.id); }}
                  className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {selectedChar.hotspots.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">No words yet. Add some!</p>
        )}
      </div>
    </div>
  );
}

// ===== Tab 4: Activity Logs =====
function ActivityLogsTab() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const [logsData, statsData] = await Promise.all([
        apiGetRecentLogs(50),
        apiGetActivityStats(),
      ]);
      setLogs(logsData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action) => {
    const map = {
      login: { label: 'Login', color: 'bg-emerald-600' },
      register: { label: 'Register', color: 'bg-blue-600' },
      admin_edit_user: { label: 'Edit User', color: 'bg-cyan-600' },
      admin_block_user: { label: 'Block', color: 'bg-red-600' },
      admin_unblock_user: { label: 'Unblock', color: 'bg-emerald-600' },
      admin_reset_password: { label: 'Reset PW', color: 'bg-yellow-600' },
    };
    return map[action] || { label: action, color: 'bg-slate-600' };
  };

  const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-emerald-400">{stats.todayActiveUsers}</p>
            <p className="text-[10px] text-slate-400">Active Today</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-blue-400">{stats.todayLogins}</p>
            <p className="text-[10px] text-slate-400">Logins Today</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-purple-400">{stats.weekLogins}</p>
            <p className="text-[10px] text-slate-400">Logins (7d)</p>
          </div>
        </div>
      )}

      {/* Refresh */}
      <button
        onClick={loadLogs}
        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border border-slate-700"
      >
        <Activity size={12} /> Refresh Logs
      </button>

      {/* Log list */}
      <div className="flex flex-col gap-2">
        {logs.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">No activity logs yet</p>
        )}
        {logs.map((log) => {
          const badge = getActionBadge(log.action);
          return (
            <div
              key={log.id}
              className="bg-slate-800 rounded-xl p-3 border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] ${badge.color} px-1.5 py-0.5 rounded font-bold text-white`}>
                    {badge.label}
                  </span>
                  <span className="text-xs text-white font-bold">
                    {log.user_name || log.username}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Clock size={10} />
                  {timeAgo(log.created_at)}
                </span>
              </div>
              {log.details && (
                <p className="text-[10px] text-slate-400 mt-1">{log.details}</p>
              )}
              <p className="text-[9px] text-slate-600 mt-0.5">IP: {log.ip_address}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== Main Admin Screen =====
const TABS = [
  { id: "users", label: "Users", icon: Users },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "content", label: "Content", icon: BookOpen },
  { id: "logs", label: "Logs", icon: Activity },
];

export default function AdminScreen({ users, characters, onBack, onDeleteUser, onUpdateUser, onUpdateCharacters, onReloadCharacters, onReloadUsers }) {
  const [activeTab, setActiveTab] = useState("users");

  // Reload users from DB when entering admin panel
  React.useEffect(() => {
    if (onReloadUsers) onReloadUsers();
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-950 animate-fade-in">
      <datalist id="hotspot-types">
        <option value="Weapon" />
        <option value="Armor" />
        <option value="Attire" />
        <option value="Equipment" />
        <option value="Head" />
        <option value="Hair" />
        <option value="Accessory" />
        <option value="Defense" />
        <option value="Magic" />
        <option value="Effect" />
        <option value="Character" />
        {/* <option value="Skills" /> */}
        <option value="Role" />
      </datalist>

      {/* Header */}
      <header className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
            <p className="text-[10px] text-slate-400">Manage your app</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/50">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs font-bold transition-all border-b-2 ${isActive ? "text-blue-400 border-blue-400" : "text-slate-500 border-transparent hover:text-slate-300"
                }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "users" && (
          <UsersTab users={users} onDeleteUser={onDeleteUser} onUpdateUser={onUpdateUser} onReloadUsers={onReloadUsers} />
        )}
        {activeTab === "stats" && <StatsTab users={users} characters={characters} />}
        {activeTab === "content" && (
          <ContentTab characters={characters} onUpdateCharacters={onUpdateCharacters} onReloadCharacters={onReloadCharacters} />
        )}
        {activeTab === "logs" && <ActivityLogsTab />}
      </div>
    </div>
  );
}
