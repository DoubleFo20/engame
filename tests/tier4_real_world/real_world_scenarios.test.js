// tests/tier4_real_world/real_world_scenarios.test.js
// Tier 4: Real-World Application Scenarios
// Complete end-to-end multi-step user journeys:
// Scenario 1: Student Study Flow
// Scenario 2: Admin Hero Management Flow
// Scenario 3: Offline Guest Flow

import { assert } from '../harness/runner.js';
import { VirtualBrowserEnvironment } from '../harness/env.js';
import { ReferenceVirtualBackend } from '../harness/oracle.js';
import { ContractValidator } from '../harness/contract.js';

export function registerTier4RealWorldTests(runner) {
  const env = new VirtualBrowserEnvironment({ hostname: 'doublefo20.github.io' });

  runner.suite('Tier 4: Real-World Application Scenarios', { tier: 4 });

  // =========================================================================
  // Scenario 1: End-to-End Student Study Flow
  // =========================================================================
  runner.test('Tier 4 - S01: Student Study Flow (Register -> Explore Roster -> Save 5 Hotspots -> Practice -> Level Up -> Reload)', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    // 1. Student Onboarding & Registration
    const regResult = backend.register('somchai_engame', 'mypassword', 'Somchai Dee', 'somchai@engame.edu');
    assert.exists(regResult.token, 'Must return authentication token');
    assert.equal(regResult.user.username, 'somchai_engame');
    assert.equal(regResult.user.xp, 0);

    // 2. Initial Dashboard State Check
    const userSession = backend.login('somchai_engame', 'mypassword');
    let progression = ContractValidator.calculateProgression(userSession.user.xp);
    assert.equal(progression.level, 1, 'Initial level must be 1');
    assert.equal(progression.title, 'Rookie', 'Initial title must be Rookie');

    // 3. Hero Exploration: Select Butterfly (ID 2, Assassin)
    const butterflyHotspots = [
      { id: 201, character_id: 2, x: 20, y: 40, word: 'Broadsword', mean: 'ดาบใหญ่', type: 'Weapon' },
      { id: 202, character_id: 2, x: 50, y: 23, word: 'Cape', mean: 'ผ้าคลุม', type: 'Attire' },
      { id: 203, character_id: 2, x: 40, y: 78, word: 'Boots', mean: 'รองเท้าบูท', type: 'Attire' },
      { id: 204, character_id: 2, x: 80, y: 20, word: 'Wing Ornament', mean: 'ปีกประดับหลัง', type: 'Accessory' },
      { id: 205, character_id: 2, x: 73, y: 45, word: 'Wrist Guard', mean: 'เกราะข้อมือ', type: 'Equipment' },
    ];

    // 4. Save 5 vocabulary hotspots to personal Vocab Vault
    for (const hs of butterflyHotspots) {
      backend.saveVocab(hs);
    }
    const savedVocab = backend.getVocab();
    assert.equal(savedVocab.length, 5, 'User must have exactly 5 saved vocabulary words');

    // 5. Practice Flashcards: Mark 2 words as mastered
    backend.toggleMastered(201); // Broadsword mastered
    backend.toggleMastered(202); // Cape mastered

    const currentVocab = backend.getVocab();
    const masteredCount = currentVocab.filter(v => v.mastered).length;
    assert.equal(masteredCount, 2, 'Two words must be marked as mastered');

    // 6. Complete Practice Session: Earn 120 XP (Crossing Level 1 -> Level 2)
    const xpProgress = backend.addXP(120);
    assert.equal(xpProgress.xp, 120);
    assert.equal(xpProgress.level, 2, 'User must level up to Level 2');
    assert.equal(xpProgress.currentLevelXP, 20);
    assert.equal(xpProgress.progressPercent, 20);
    assert.isTrue(xpProgress.leveledUp, 'Level-up event must be flagged');

    // 7. Session Reload Persistence Verification
    window.location.reload();

    const storedUser = JSON.parse(env.localStorage.getItem('engame_currentUser'));
    assert.equal(storedUser.username, 'somchai_engame');
    assert.equal(storedUser.xp, 120);

    const reloadedVocab = backend.getVocab();
    assert.equal(reloadedVocab.length, 5);
    const reloadedMastered = reloadedVocab.filter(v => v.mastered).length;
    assert.equal(reloadedMastered, 2, 'Mastered words count preserved across reload');

    env.restore();
  });

  // =========================================================================
  // Scenario 2: End-to-End Admin Hero Management Flow
  // =========================================================================
  runner.test('Tier 4 - S02: Admin Hero Management Flow (Login -> Audit Roster -> Add Custom Hotspot -> Update -> Unblock User -> Logout)', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init([
      { id: 1, username: 'admin', role: 'admin', name: 'Administrator', xp: 9999, is_blocked: 0 },
      { id: 2, username: 'suspended_user', role: 'student', name: 'Flagged User', xp: 50, is_blocked: 1 },
    ]);

    // 1. Admin Authentication
    const auth = backend.login('admin', 'admin123');
    assert.equal(auth.user.role, 'admin');

    // 2. Add New Custom Hotspot to Hero 1 (Violet)
    const newHotspot = backend.addHotspot(1, {
      id: 115,
      x: 65.5,
      y: 35.0,
      word: 'Pulse Cannon',
      mean: 'ปืนใหญ่พัลส์',
      type: 'Weapon',
    });
    assert.exists(newHotspot.id);
    assert.equal(newHotspot.character_id, 1);
    assert.equal(newHotspot.word, 'Pulse Cannon');

    // 3. Coordinate validation rejects out-of-range hotspot
    let rejected = false;
    try {
      backend.addHotspot(1, {
        id: 116,
        x: -15, // Out of bounds
        y: 20,
        word: 'Glitch Item',
        mean: 'ไอเทมบั๊ก',
        type: 'Equipment',
      });
    } catch {
      rejected = true;
    }
    assert.isTrue(rejected, 'Hotspot with invalid coordinates must be rejected');

    // 4. Admin audits and unblocks suspended user account
    const users = JSON.parse(env.localStorage.getItem('engame_users'));
    const targetUser = users.find(u => u.username === 'suspended_user');
    assert.equal(targetUser.is_blocked, 1, 'Target user is initially blocked');

    targetUser.is_blocked = 0; // Unblock
    env.localStorage.setItem('engame_users', JSON.stringify(users));

    // Verify unblocked user can now log in
    backend.logout();
    const unblockedLogin = backend.login('suspended_user', 'any_pass');
    assert.equal(unblockedLogin.user.username, 'suspended_user');

    // 5. Admin clean logout
    backend.logout();
    assert.equal(env.localStorage.getItem('engame_token'), null, 'Session token cleared after logout');

    env.restore();
  });

  // =========================================================================
  // Scenario 3: End-to-End Offline Guest Flow (GitHub Pages / Standalone Ready)
  // =========================================================================
  runner.test('Tier 4 - S03: Offline Guest Flow (Static Hosting -> Zero Network Dispatches -> Autonomous CRUD -> State Retained)', () => {
    env.install();
    env.network.mode = 'standalone';

    // 1. Initialize standalone environment (simulating GitHub Pages https://doublefo20.github.io/engame/)
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    // 2. Verify zero network requests are made
    assert.equal(env.network.getCallCount(), 0, 'Zero HTTP requests on standalone initialization');
    assert.equal(env.consoleErrors.length, 0, 'Zero console errors on standalone initialization');

    // 3. Guest registers an offline study account
    const reg = backend.register('offline_guest', 'guestpass', 'Guest Learner', 'guest@offline.local');
    assert.exists(reg.token);
    assert.equal(reg.user.username, 'offline_guest');

    // 4. Guest explores heroes and saves vocabulary offline
    const vocabItem = {
      id: 301,
      character_id: 3,
      x: 20,
      y: 50,
      word: 'Shield',
      mean: 'โล่',
      type: 'Defense',
    };
    backend.saveVocab(vocabItem);
    assert.equal(backend.getVocab().length, 1);

    // 5. Guest earns XP and levels up offline
    const prog = backend.addXP(100);
    assert.equal(prog.level, 2);

    // 6. Confirm network call count is STILL 0 after all operations
    assert.equal(env.network.getCallCount(), 0, 'Zero HTTP requests after full standalone lifecycle');
    assert.equal(env.alerts.length, 0, 'Zero alert dialogs triggered');

    // 7. Simulated browser reload preserves all offline progress
    window.location.reload();
    const userAfterReload = JSON.parse(env.localStorage.getItem('engame_currentUser'));
    assert.equal(userAfterReload.xp, 100);
    assert.equal(userAfterReload.username, 'offline_guest');

    const vocabAfterReload = backend.getVocab();
    assert.equal(vocabAfterReload.length, 1);
    assert.equal(vocabAfterReload[0].word, 'Shield');

    env.restore();
  });
}
