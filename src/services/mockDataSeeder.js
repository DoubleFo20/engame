// src/services/mockDataSeeder.js
// Initial Mock Data Seeder for ENGAME Virtual Backend & Offline Persistence
// Provides full 111 ROV Heroes, 569 vocabulary hotspots, and default user accounts.

import { CHARACTERS } from '../data/characters.js';
import { INITIAL_USERS } from '../data/users.js';

export const CURRENT_SEEDED_VERSION = '2.0';

export const STORAGE_KEYS = {
  USERS: 'engame_users',
  CURRENT_USER: 'engame_currentUser',
  TOKEN: 'engame_token',
  VOCAB: 'engame_vocab',
  PROGRESS: 'engame_progress',
  CHARACTERS: 'engame_characters',
  CUSTOM_HOTSPOTS: 'engame_custom_hotspots',
  ACTIVITY_LOGS: 'engame_activity_logs',
  SEEDED_VERSION: 'engame_seeded_version',
};

/**
 * Generates sample initial saved vocabulary so "My Vocab" is immediately interactive.
 */
export function generateInitialVocab() {
  return [
    {
      id: 101,
      vocab_id: 1,
      character_id: 1,
      x: 80,
      y: 55,
      word: 'Pistol',
      mean: 'ปืนพกคู่กาย',
      type: 'Weapon',
      mastered: false,
      savedAt: Date.now() - 3600000 * 5,
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      user_id: 1,
    },
    {
      id: 201,
      vocab_id: 2,
      character_id: 2,
      x: 20,
      y: 40,
      word: 'Broadsword',
      mean: 'ดาบใหญ่ใบกว้าง',
      type: 'Weapon',
      mastered: true,
      savedAt: Date.now() - 3600000 * 3,
      created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
      user_id: 1,
    },
    {
      id: 301,
      vocab_id: 3,
      character_id: 3,
      x: 20,
      y: 50,
      word: 'Shield',
      mean: 'โล่เกราะเหล็กกล้า',
      type: 'Armor',
      mastered: false,
      savedAt: Date.now() - 3600000 * 1,
      created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
      user_id: 1,
    },
  ];
}

/**
 * Generates initial system activity logs for administrative dashboard visibility.
 */
export function generateInitialActivityLogs() {
  const now = Date.now();
  return [
    {
      id: now - 3600000 * 24,
      user_id: 2,
      username: 'admin',
      user_name: 'Admin GM',
      action: 'login',
      details: 'User "admin" logged in',
      ip_address: '127.0.0.1 (local)',
      created_at: new Date(now - 3600000 * 24).toISOString(),
    },
    {
      id: now - 3600000 * 12,
      user_id: 1,
      username: 'player',
      user_name: 'Player 1',
      action: 'login',
      details: 'User "player" logged in',
      ip_address: '127.0.0.1 (local)',
      created_at: new Date(now - 3600000 * 12).toISOString(),
    },
    {
      id: now - 3600000 * 2,
      user_id: 1,
      username: 'player',
      user_name: 'Player 1',
      action: 'practice_complete',
      details: 'Completed Quiz mode (+50 XP)',
      ip_address: '127.0.0.1 (local)',
      created_at: new Date(now - 3600000 * 2).toISOString(),
    },
  ];
}

/**
 * Seeds initial mock data into provided storage if not already seeded or if forced.
 * @param {Storage} storage - localStorage or custom storage interface
 * @param {boolean} force - whether to overwrite existing data
 * @returns {boolean} whether seeding took place
 */
export function seedMockData(storage, force = false) {
  if (!storage) return false;

  let usersNeedSeed = false;
  try {
    const raw = storage.getItem(STORAGE_KEYS.USERS);
    if (!raw) usersNeedSeed = true;
    else {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) usersNeedSeed = true;
    }
  } catch {
    usersNeedSeed = true;
  }

  let charsNeedSeed = false;
  try {
    const raw = storage.getItem(STORAGE_KEYS.CHARACTERS);
    if (!raw) charsNeedSeed = true;
    else {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) charsNeedSeed = true;
    }
  } catch {
    charsNeedSeed = true;
  }

  const currentVer = storage.getItem(STORAGE_KEYS.SEEDED_VERSION);
  const needsSeed = force || currentVer !== CURRENT_SEEDED_VERSION || usersNeedSeed || charsNeedSeed;

  if (!needsSeed) {
    return false;
  }

  try {
    // 1. Seed Users (INITIAL_USERS)
    if (usersNeedSeed || force) {
      storage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }

    // 2. Seed Characters (Full 111 ROV Heroes & Hotspots)
    if (charsNeedSeed || force) {
      storage.setItem(STORAGE_KEYS.CHARACTERS, JSON.stringify(CHARACTERS));
    }

    // 3. Seed Custom Hotspots
    if (!storage.getItem(STORAGE_KEYS.CUSTOM_HOTSPOTS) || force) {
      storage.setItem(STORAGE_KEYS.CUSTOM_HOTSPOTS, JSON.stringify([]));
    }

    // 4. Seed Vocab
    if (!storage.getItem(STORAGE_KEYS.VOCAB) || force) {
      storage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(generateInitialVocab()));
    }

    // 5. Seed Activity Logs
    if (!storage.getItem(STORAGE_KEYS.ACTIVITY_LOGS) || force) {
      storage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(generateInitialActivityLogs()));
    }

    // 6. Record Version
    storage.setItem(STORAGE_KEYS.SEEDED_VERSION, CURRENT_SEEDED_VERSION);
    return true;
  } catch (err) {
    console.error('[mockDataSeeder] Error seeding initial data:', err);
    return false;
  }
}

/**
 * Fully resets storage to clean default demo state.
 * @param {Storage} storage
 */
export function resetToDefaultData(storage) {
  if (!storage) return;
  seedMockData(storage, true);
}
