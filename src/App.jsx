import React, { useState, useEffect } from "react";
import FeatureCard from "@/components/ui/FeatureCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Header from "@/components/ui/Header";
import LoginScreen from "@/screens/LoginScreen";
import HomeScreen from "@/screens/HomeScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import FeatureView from "@/screens/FeatureView";
import AdminScreen from "@/screens/AdminScreen";
import TutorialOverlay from "@/components/TutorialOverlay";
import usePlayerProgress from "@/hooks/userplayerProgress";

// === Data imports (fallbacks) ===
import { ROV_FEATURES } from "@/data/features";
import { CHARACTERS as INITIAL_CHARACTERS } from "@/data/characters";
import { INITIAL_USERS } from "@/data/users";

import {
  apiLogin,
  apiRegister,
  apiLogout,
  apiGetCharacters,
  apiGetUsers,
  apiGetVocab,
  apiSaveVocab,
  apiRemoveVocab,
  apiAddXP,
  setToken,
  getToken,
} from "@/api";

function App() {
  const [screen, setScreen] = useState("login");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(null);

  // ===== XP / Level / Unlock — via custom hook =====
  const { xp, level, progressPercent, unlocked, title, showLevelUp, addXP } =
    usePlayerProgress(currentUser, setCurrentUser, setUsers);

  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedChar, setSelectedChar] = useState(null);
  const [myVocab, setMyVocab] = useState([]);
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [earnedXP, setEarnedXP] = useState(0);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [roleFilter, setRoleFilter] = useState("All");
  const [showTutorial, setShowTutorial] = useState(false);
  const [visibleCharsCount, setVisibleCharsCount] = useState(20);

  // ✅ Sync selectedChar เมื่อ characters state เปลี่ยน (เช่น Admin แก้ไขคำศัพท์)
  useEffect(() => {
    if (selectedChar) {
      const updated = characters.find((c) => c.id === selectedChar.id);
      if (updated) setSelectedChar(updated);
    }
  }, [characters]);

  // 🔐 Auto-login: โหลด user จาก localStorage + token
  useEffect(() => {
    const savedUser = localStorage.getItem("engame_currentUser");
    const savedToken = localStorage.getItem("engame_token");
    if (savedUser && savedToken) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setToken(savedToken);
        setScreen("home");
      } catch (e) {
        console.error("Invalid localStorage data", e);
        localStorage.removeItem("engame_currentUser");
        localStorage.removeItem("engame_token");
      }
    }
  }, []);

  // 💾 sync currentUser → localStorage ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("engame_currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // 📦 โหลด characters จาก API เมื่อเปิด app
  const reloadCharacters = async () => {
    try {
      const chars = await apiGetCharacters();
      setCharacters(chars);
    } catch (err) {
      console.warn("API offline, using local data:", err.message);
    }
  };

  // 👥 โหลด users จาก API (admin)
  const reloadUsers = async () => {
    if (!getToken()) return;
    try {
      const dbUsers = await apiGetUsers();
      setUsers(dbUsers);
    } catch (err) {
      console.warn("Could not load users from API:", err.message);
    }
  };

  useEffect(() => {
    reloadCharacters();
  }, []);

  // 📚 โหลด vocab เมื่อ login สำเร็จ
  useEffect(() => {
    if (currentUser && getToken()) {
      apiGetVocab()
        .then((vocab) => setMyVocab(vocab))
        .catch((err) => console.warn("Could not load vocab:", err.message));
    }
  }, [currentUser]);

  const handleLogin = async (username, password) => {
    try {
      const user = await apiLogin(username, password);
      setCurrentUser(user);
      setScreen("home");
      // Load all users from DB for admin panel
      reloadUsers();
    } catch (err) {
      alert(err.message || "Invalid username or password");
    }
  };

  // ===== REGISTER — เรียก API =====
  const handleRegister = async (userData) => {
    try {
      const user = await apiRegister(userData.username, userData.password, userData.name, userData.email);
      setCurrentUser(user);
      setScreen("home");
      // Show tutorial for new users
      setShowTutorial(true);
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  const navigateToFeature = (id) => {
    setActiveFeature(id);
    setEarnedXP(0);
    if (id === "flashcards") setFlashcardIndex(0);
    ["hotspots", "flashcards", "quiz", "speaking", "spelling", "roleplay"].includes(id)
      ? setScreen("char-select")
      : setScreen("feature-view");
  };

  // ===== VOCAB — เรียก API =====
  const addToVocab = async (word) => {
    if (!myVocab.find((w) => w.id === word.id)) {
      setMyVocab([...myVocab, word]);
      addXP(20);

      // Save to backend
      if (getToken()) {
        try {
          await apiSaveVocab(word.id);
          await apiAddXP(20);
        } catch (err) {
          console.warn("Could not save to backend:", err.message);
        }
      }
      return true;
    }
    return false;
  };

  const removeFromVocab = async (id) => {
    setMyVocab((prev) => prev.filter((w) => w.id !== id));
    if (getToken()) {
      try {
        await apiRemoveVocab(id);
      } catch (err) {
        console.warn("Could not remove from backend:", err.message);
      }
    }
  };

  // ===== ADD XP — sync กับ API =====
  const addXPWithSync = async (amount) => {
    addXP(amount);
    if (getToken()) {
      try {
        const updated = await apiAddXP(amount);
        // Sync XP จาก server เพื่อความถูกต้อง
        setCurrentUser((prev) => (prev ? { ...prev, xp: updated.xp } : prev));
      } catch (err) {
        console.warn("Could not sync XP:", err.message);
      }
    }
  };

  // --- Main Render ---
  const render = () => {
    if (screen === "login") return <LoginScreen onLogin={handleLogin} onNavigateRegister={() => setScreen("register")} />;
    if (screen === "register") return <RegisterScreen onRegister={handleRegister} onNavigateLogin={() => setScreen("login")} />;
    if (screen === "home") return (
      <HomeScreen
        currentUser={currentUser}
        onSelectGame={(gameId) => gameId === "rov" ? setScreen("rov-hub") : alert("Coming Soon!")}
        onNavigateAdmin={() => setScreen("admin")}
        onShowTutorial={() => setShowTutorial(true)}
        onLogout={() => {
          apiLogout();
          localStorage.removeItem("engame_currentUser");
          setMyVocab([]);
          setCurrentUser(null);
          setScreen("login");
        }}
      />
    );
    if (screen === "rov-hub")
      return (
        <div className="h-full flex flex-col animate-fade-in bg-slate-950">
          <Header
            title="ROV Features"
            subtitle="Select mode"
            level={level}
            xp={xp}
            progressPercent={progressPercent}
            showBack
            onBack={() => setScreen("home")}
          />
          <div className="p-4 grid grid-cols-2 gap-3 overflow-y-auto pb-20">
            {ROV_FEATURES.map((f) => (
              <FeatureCard
                key={f.id}
                id={f.id}
                title={f.title}
                subtitle={f.subtitle}
                icon={f.icon}
                unlocked={unlocked}
                onClick={() => navigateToFeature(f.id)}
              />
            ))}
          </div>
        </div>
      );
    if (screen === "char-select")
      return (
        <div className="h-full flex flex-col animate-fade-in bg-slate-950">
          <Header
            title="Select Hero"
            subtitle={`Mode: ${activeFeature}`}
            showBack
            onBack={() => { setScreen("rov-hub"); setRoleFilter("All"); setVisibleCharsCount(20); }}
          />
          {/* Role Filter Bar */}
          {(() => {
            const mainRoles = ["All", "Tank", "Fighter", "Assassin", "Mage", "Carry", "Support"];
            const filteredChars = roleFilter === "All"
              ? characters
              : characters.filter(c => c.role?.toLowerCase().includes(roleFilter.toLowerCase()));

            return (
              <>
                <div className="px-4 pt-3 pb-1">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {mainRoles.map(role => {
                      const count = role === "All"
                        ? characters.length
                        : characters.filter(c => c.role?.toLowerCase().includes(role.toLowerCase())).length;

                      return (
                        <button
                          key={role}
                          onClick={() => { setRoleFilter(role); setVisibleCharsCount(20); }}
                          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${roleFilter === role
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
                            }`}
                        >
                          {role}
                          {role !== "All" && (
                            <span className={`ml-1.5 text-[10px] ${roleFilter === role ? 'text-white/80' : 'text-slate-500'}`}>
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {filteredChars.length} {roleFilter === "All" ? "heroes" : roleFilter + " heroes"}
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto pb-4">
                  <div className="p-4 pt-2 grid grid-cols-2 gap-4">
                    {filteredChars.slice(0, visibleCharsCount).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedChar(c);
                          setFlashcardIndex(0); // Fix: Reset index when switching character
                          setScreen("feature-view");
                        }}
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all group"
                      >
                        <img
                          src={c.img}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                          alt={c.name}
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3">
                          <p className="text-[10px] font-bold text-blue-400 uppercase">
                            {c.role}
                          </p>
                          <h3 className="text-white font-bold">{c.name}</h3>
                        </div>
                      </button>
                    ))}
                  </div>
                  {visibleCharsCount < filteredChars.length && (
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => setVisibleCharsCount((prev) => prev + 20)}
                        className="w-full py-4 bg-slate-800 rounded-xl text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 shadow-lg flex items-center justify-center gap-2"
                      >
                        ↓↓ โหลดฮีโร่เพิ่มเติม ↓↓
                      </button>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      );
    if (screen === "admin") return (
      <AdminScreen
        users={users}
        characters={characters}
        onBack={() => setScreen("home")}
        onDeleteUser={(username) => { setUsers((prev) => prev.filter((u) => u.username !== username)); }}
        onUpdateUser={(updatedUser) => {
          setUsers((prev) => prev.map((u) => u.username === updatedUser.username ? updatedUser : u));
          if (currentUser?.username === updatedUser.username) setCurrentUser(updatedUser);
        }}
        onUpdateCharacters={(updated) => setCharacters(updated)}
        onReloadCharacters={reloadCharacters}
        onReloadUsers={reloadUsers}
      />
    );
    if (screen === "feature-view") return (
      <FeatureView
        activeFeature={activeFeature}
        selectedChar={selectedChar}
        setScreen={setScreen}
        addToVocab={addToVocab}
        removeFromVocab={removeFromVocab}
        myVocab={myVocab}
        addXP={addXPWithSync}
        earnedXP={earnedXP}
        setEarnedXP={setEarnedXP}
        flashcardIndex={flashcardIndex}
        setFlashcardIndex={setFlashcardIndex}
        level={level}
        xp={xp}
      />
    );
    return <div>Error</div>;
  };

  return (
    <>
      {/* ✅ Overlay Level Up */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className="bg-gradient-to-br from-purple-600 to-indigo-600
                       px-10 py-6 rounded-2xl text-white
                       text-center animate-scale-in shadow-2xl"
          >
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-xl font-bold">LEVEL UP!</div>
            <div className="text-3xl font-extrabold mt-1">Lv.{level}</div>
          </div>
        </div>
      )}

      {/* ✅ Main App Container */}
      <div className="min-h-screen bg-black text-slate-100 font-sans flex justify-center items-center">
        <div
          className="w-full max-w-md bg-slate-950 h-screen sm:h-[850px]
                        sm:rounded-[2.5rem] sm:border-[8px] sm:border-slate-800
                        shadow-2xl relative flex flex-col overflow-hidden ring-8 ring-black"
        >
          {/* Background glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
          </div>

          {/* App Content */}
          <div className="relative z-10 flex-1 h-full">{render()}</div>

          {/* Tutorial Overlay */}
          {showTutorial && (
            <TutorialOverlay
              onComplete={() => setShowTutorial(false)}
            />
          )}
        </div>

        {/* Animations */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
          }
          .animate-scale-in {
            animation: scale-in 0.35s ease-out forwards;
          }
          @keyframes scale-in {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
        </style>
      </div>
    </>
  );
}

export default App;
