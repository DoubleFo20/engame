// src/hooks/userplayerProgress.js
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for XP / Level / Unlock logic
 * @param {object} currentUser
 * @param {function} setCurrentUser
 * @param {function} setUsers - sync users array so XP persists after logout
 */
export default function usePlayerProgress(currentUser, setCurrentUser, setUsers) {
  const xp = currentUser?.xp ?? 0;
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXP = xp % 100;
  const progressPercent = (currentLevelXP / 100) * 100;

  const [unlocked, setUnlocked] = useState({
    quiz: false,
    spelling: false,
    speaking: false,
    roleplay: false,
  });

  const [title, setTitle] = useState("Rookie");
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevelRef = useRef(0);

  // Update unlock status and title whenever level changes
  useEffect(() => {
    setUnlocked({
      quiz: level >= 5,
      spelling: level >= 10,
      speaking: level >= 15,
      roleplay: level >= 20,
    });

    if (level >= 20) setTitle("Veteran");
    else setTitle("Rookie");

    // Show level-up popup only when level actually increases (not on login)
    if (currentUser && prevLevelRef.current !== level && prevLevelRef.current !== 0) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2500);
    }
    prevLevelRef.current = currentUser ? level : 0;
  }, [level, currentUser]);

  const addXP = (amount) => {
    if (!currentUser) return;
    setCurrentUser((prev) => {
      const updated = { ...prev, xp: prev.xp + amount };
      // Sync users array so XP isn't lost on logout
      if (setUsers) {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.username === prev.username ? updated : u))
        );
      }
      return updated;
    });
  };

  return {
    xp,
    level,
    currentLevelXP,
    progressPercent,
    unlocked,
    title,
    showLevelUp,
    addXP,
  };
}
