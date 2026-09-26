// tests/harness/oracle.js
// Authoritative Reference Oracle for Virtual Backend & Persistence

import { ContractValidator } from './contract.js';

export class ReferenceVirtualBackend {
  constructor(storage) {
    this.storage = storage;
    this.STORAGE_KEYS = {
      USERS: 'engame_users',
      CURRENT_USER: 'engame_currentUser',
      TOKEN: 'engame_token',
      VOCAB: 'engame_vocab',
      PROGRESS: 'engame_progress',
      CHARACTERS: 'engame_characters',
      CUSTOM_HOTSPOTS: 'engame_custom_hotspots',
      ACTIVITY_LOGS: 'engame_activity_logs',
    };
  }

  init(seedUsers = [], seedCharacters = []) {
    if (seedUsers.length > 0) {
      this.storage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(seedUsers));
    } else if (!this.storage.getItem(this.STORAGE_KEYS.USERS)) {
      const defaultUsers = [
        { id: 1, username: 'admin', role: 'admin', name: 'Administrator', xp: 2500, is_blocked: 0 },
        { id: 2, username: 'demo', role: 'student', name: 'Demo Player', xp: 250, is_blocked: 0 },
      ];
      this.storage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    if (seedCharacters.length > 0) {
      this.storage.setItem(this.STORAGE_KEYS.CHARACTERS, JSON.stringify(seedCharacters));
    }

    if (!this.storage.getItem(this.STORAGE_KEYS.VOCAB)) {
      this.storage.setItem(this.STORAGE_KEYS.VOCAB, JSON.stringify([]));
    }
  }

  // --- Auth Operations ---
  login(username, password) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.USERS);
    const users = raw ? JSON.parse(raw) : [];
    const user = users.find(u => u.username === username);

    if (!user) {
      throw new Error('User not found');
    }
    if (user.is_blocked) {
      throw new Error('Account is blocked');
    }

    const token = `mock-token-${user.username}-${Date.now()}`;
    this.storage.setItem(this.STORAGE_KEYS.TOKEN, token);
    this.storage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { token, user };
  }

  register(username, password, name, email) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.USERS);
    const users = raw ? JSON.parse(raw) : [];

    if (users.some(u => u.username === username)) {
      throw new Error('Username already exists');
    }

    const newUser = {
      id: users.length + 1,
      username,
      name: name || username,
      email: email || `${username}@example.com`,
      role: 'student',
      xp: 0,
      is_blocked: 0,
      streak: 1,
      mastered_count: 0,
    };

    users.push(newUser);
    this.storage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));

    const token = `mock-token-${newUser.username}-${Date.now()}`;
    this.storage.setItem(this.STORAGE_KEYS.TOKEN, token);
    this.storage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return { token, user: newUser };
  }

  logout() {
    this.storage.removeItem(this.STORAGE_KEYS.TOKEN);
    this.storage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
    return { success: true };
  }

  forgotPassword(username, email, newPassword) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.USERS);
    const users = raw ? JSON.parse(raw) : [];
    const user = users.find(u => u.username === username);
    if (!user) {
      throw new Error('User not found');
    }
    user.updatedPasswordAt = Date.now();
    this.storage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
    return { message: 'Password updated successfully' };
  }

  // --- Progression ---
  addXP(amount) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.CURRENT_USER);
    if (!raw) throw new Error('Not authenticated');
    const user = JSON.parse(raw);

    const prevLevel = Math.floor((user.xp || 0) / 100) + 1;
    const newXP = Math.max(0, (user.xp || 0) + Number(amount));
    user.xp = newXP;

    const progression = ContractValidator.calculateProgression(newXP);
    const leveledUp = progression.level > prevLevel;

    // Update currentUser
    this.storage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

    // Update in users array
    const rawUsers = this.storage.getItem(this.STORAGE_KEYS.USERS);
    if (rawUsers) {
      const users = JSON.parse(rawUsers);
      const idx = users.findIndex(u => u.username === user.username);
      if (idx !== -1) {
        users[idx].xp = newXP;
        this.storage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
      }
    }

    return {
      xp: newXP,
      level: progression.level,
      currentLevelXP: progression.currentLevelXP,
      progressPercent: progression.progressPercent,
      leveledUp,
      title: progression.title,
      unlocked: progression.unlocked,
    };
  }

  // --- Vocab Vault ---
  saveVocab(hotspot) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.VOCAB);
    const vocabList = raw ? JSON.parse(raw) : [];

    const existingIndex = vocabList.findIndex(v => v.id === hotspot.id);
    if (existingIndex === -1) {
      vocabList.push({
        ...hotspot,
        savedAt: Date.now(),
        mastered: false,
      });
      this.storage.setItem(this.STORAGE_KEYS.VOCAB, JSON.stringify(vocabList));
    }
    return { message: 'Word saved to vocab', count: vocabList.length };
  }

  getVocab() {
    const raw = this.storage.getItem(this.STORAGE_KEYS.VOCAB);
    return raw ? JSON.parse(raw) : [];
  }

  toggleMastered(hotspotId) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.VOCAB);
    const vocabList = raw ? JSON.parse(raw) : [];
    const item = vocabList.find(v => v.id === hotspotId);
    if (!item) throw new Error('Vocab item not found');

    item.mastered = !item.mastered;
    this.storage.setItem(this.STORAGE_KEYS.VOCAB, JSON.stringify(vocabList));
    return item;
  }

  removeVocab(hotspotId) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.VOCAB);
    let vocabList = raw ? JSON.parse(raw) : [];
    vocabList = vocabList.filter(v => v.id !== hotspotId);
    this.storage.setItem(this.STORAGE_KEYS.VOCAB, JSON.stringify(vocabList));
    return { message: 'Word removed', count: vocabList.length };
  }

  // --- Admin Hotspots ---
  addHotspot(characterId, hotspotData) {
    const validation = ContractValidator.validateHotspot(hotspotData, characterId);
    if (!validation.valid) {
      throw new Error(`Invalid hotspot: ${validation.errors.join('; ')}`);
    }

    const raw = this.storage.getItem(this.STORAGE_KEYS.CUSTOM_HOTSPOTS);
    const customList = raw ? JSON.parse(raw) : [];

    const newHotspot = {
      ...hotspotData,
      character_id: characterId,
      id: hotspotData.id || (characterId * 100 + customList.length + 10),
      createdAt: Date.now(),
    };

    customList.push(newHotspot);
    this.storage.setItem(this.STORAGE_KEYS.CUSTOM_HOTSPOTS, JSON.stringify(customList));
    return newHotspot;
  }

  deleteHotspot(hotspotId) {
    const raw = this.storage.getItem(this.STORAGE_KEYS.CUSTOM_HOTSPOTS);
    let customList = raw ? JSON.parse(raw) : [];
    customList = customList.filter(h => h.id !== hotspotId);
    this.storage.setItem(this.STORAGE_KEYS.CUSTOM_HOTSPOTS, JSON.stringify(customList));
    return { message: 'Hotspot deleted' };
  }
}
