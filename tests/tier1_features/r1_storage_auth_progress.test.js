// tests/tier1_features/r1_storage_auth_progress.test.js
// Tier 1: Feature Coverage for Requirement 1 (R1)
// Covers: R1-F1, R1-F2, R1-F3, R1-F4, R1-F5, R1-F6 (>=5 test cases per feature)

import { assert } from '../harness/runner.js';
import { VirtualBrowserEnvironment } from '../harness/env.js';
import { ReferenceVirtualBackend } from '../harness/oracle.js';
import { ContractValidator } from '../harness/contract.js';

export function registerTier1R1Tests(runner) {
  const env = new VirtualBrowserEnvironment({ hostname: 'doublefo20.github.io' });

  // =========================================================================
  // R1-F1: Standalone Client-Side Storage Engine
  // =========================================================================
  runner.suite('Tier 1: R1-F1 Virtual Backend Storage Engine', { tier: 1, feature: 'R1-F1', milestone: 'M2' });

  runner.test('R1-F1.1: Storage engine initializes isolated namespace keys', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    assert.exists(env.localStorage.getItem('engame_users'), 'Users table key should exist');
    assert.exists(env.localStorage.getItem('engame_vocab'), 'Vocab table key should exist');
    env.restore();
  });

  runner.test('R1-F1.2: Pre-seeds default administrator and demo student accounts on first launch', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const users = JSON.parse(env.localStorage.getItem('engame_users'));
    assert.isArray(users, 'Pre-seeded users must be an array');
    assert.assert(users.length >= 2, 'Must contain at least admin and demo accounts');

    const admin = users.find(u => u.role === 'admin' || u.username === 'admin');
    assert.exists(admin, 'Admin account must exist in pre-seeded data');
    const demo = users.find(u => u.role === 'student' || u.username === 'demo');
    assert.exists(demo, 'Demo student account must exist in pre-seeded data');
    env.restore();
  });

  runner.test('R1-F1.3: Supports autonomous JSON serialization and retrieval', () => {
    env.install();
    const testData = { id: 99, key: 'engame_test', count: 42, active: true };
    env.localStorage.setItem('engame_custom_test', JSON.stringify(testData));

    const retrieved = JSON.parse(env.localStorage.getItem('engame_custom_test'));
    assert.deepEqual(retrieved, testData, 'Data retrieved from storage must match written object');
    env.restore();
  });

  runner.test('R1-F1.4: Handles non-existent keys by returning null safely without exception', () => {
    env.install();
    const val = env.localStorage.getItem('engame_non_existent_key_123');
    assert.equal(val, null, 'Non-existent storage key must return null');
    env.restore();
  });

  runner.test('R1-F1.5: Deleting keys removes them completely from the storage map', () => {
    env.install();
    env.localStorage.setItem('engame_temp_token', 'temp-secret-token');
    assert.equal(env.localStorage.getItem('engame_temp_token'), 'temp-secret-token');

    env.localStorage.removeItem('engame_temp_token');
    assert.equal(env.localStorage.getItem('engame_temp_token'), null, 'Removed key must no longer exist');
    env.restore();
  });

  // =========================================================================
  // R1-F2: Authentication Lifecycle (Login, Register, Logout, Reset, Auto-Login)
  // =========================================================================
  runner.suite('Tier 1: R1-F2 User Authentication Lifecycle', { tier: 1, feature: 'R1-F2', milestone: 'M2' });

  runner.test('R1-F2.1: Register creates a new student user and persists credentials', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const result = backend.register('student_karen', 'pass1234', 'Karen Gillan', 'karen@example.com');
    assert.exists(result.token, 'Registration must return a session token');
    assert.equal(result.user.username, 'student_karen');
    assert.equal(result.user.role, 'student');

    const users = JSON.parse(env.localStorage.getItem('engame_users'));
    const saved = users.find(u => u.username === 'student_karen');
    assert.exists(saved, 'Newly registered user must be found in storage');
    env.restore();
  });

  runner.test('R1-F2.2: Register rejects duplicate usernames with error', async () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    backend.register('unique_player', 'pass123', 'Player 1', 'p1@example.com');

    await assert.throws(
      async () => {
        backend.register('unique_player', 'another_pass', 'Player Duplicate', 'p2@example.com');
      },
      'already exists',
      'Should reject duplicate username'
    );
    env.restore();
  });

  runner.test('R1-F2.3: Login validates username and issues active session token', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const auth = backend.login('admin', 'admin123');
    assert.exists(auth.token, 'Login must yield auth token');
    assert.equal(auth.user.username, 'admin');
    assert.equal(env.localStorage.getItem('engame_token'), auth.token, 'Token must be in localStorage');
    env.restore();
  });

  runner.test('R1-F2.4: Login rejects nonexistent users with explicit error', async () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    await assert.throws(
      async () => {
        backend.login('ghost_user_404', 'wrong_pass');
      },
      'not found',
      'Non-existent user login must throw error'
    );
    env.restore();
  });

  runner.test('R1-F2.5: Forgot password updates password timestamp and returns success', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const res = backend.forgotPassword('demo', 'demo@example.com', 'new_secret_pwd_99');
    assert.exists(res.message, 'Forgot password must return confirmation message');
    env.restore();
  });

  runner.test('R1-F2.6: Logout revokes session token and clears current user from storage', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    backend.login('admin', 'admin123');
    assert.exists(env.localStorage.getItem('engame_token'));

    backend.logout();
    assert.equal(env.localStorage.getItem('engame_token'), null, 'Token must be cleared upon logout');
    assert.equal(env.localStorage.getItem('engame_currentUser'), null, 'Current user must be cleared');
    env.restore();
  });

  // =========================================================================
  // R1-F3: Player Progression & Level Formula
  // =========================================================================
  runner.suite('Tier 1: R1-F3 Player Progression & Level Formula', { tier: 1, feature: 'R1-F3', milestone: 'M2' });

  runner.test('R1-F3.1: Initial user starts at 0 XP and Level 1', () => {
    const prog = ContractValidator.calculateProgression(0);
    assert.equal(prog.xp, 0);
    assert.equal(prog.level, 1);
    assert.equal(prog.currentLevelXP, 0);
    assert.equal(prog.progressPercent, 0);
    assert.equal(prog.title, 'Rookie');
  });

  runner.test('R1-F3.2: Level conforms strictly to Math.floor(xp / 100) + 1 across intervals', () => {
    const testCases = [
      { xp: 0, expectedLvl: 1 },
      { xp: 50, expectedLvl: 1 },
      { xp: 99, expectedLvl: 1 },
      { xp: 100, expectedLvl: 2 },
      { xp: 150, expectedLvl: 2 },
      { xp: 400, expectedLvl: 5 },
      { xp: 999, expectedLvl: 10 },
      { xp: 1900, expectedLvl: 20 },
      { xp: 2500, expectedLvl: 26 },
    ];

    for (const tc of testCases) {
      const prog = ContractValidator.calculateProgression(tc.xp);
      assert.equal(prog.level, tc.expectedLvl, `XP ${tc.xp} should yield level ${tc.expectedLvl}`);
    }
  });

  runner.test('R1-F3.3: Mode unlock thresholds (Quiz Lv5, Spelling Lv10, Speaking Lv15, Roleplay Lv20)', () => {
    // Level 1: All locked
    const l1 = ContractValidator.calculateProgression(50);
    assert.isFalse(l1.unlocked.quiz, 'Quiz must be locked at Lv 1');
    assert.isFalse(l1.unlocked.spelling, 'Spelling must be locked at Lv 1');

    // Level 5 (400 XP): Quiz unlocked
    const l5 = ContractValidator.calculateProgression(400);
    assert.isTrue(l5.unlocked.quiz, 'Quiz must be unlocked at Lv 5');
    assert.isFalse(l5.unlocked.spelling, 'Spelling must be locked at Lv 5');

    // Level 10 (900 XP): Quiz & Spelling unlocked
    const l10 = ContractValidator.calculateProgression(900);
    assert.isTrue(l10.unlocked.quiz);
    assert.isTrue(l10.unlocked.spelling, 'Spelling must be unlocked at Lv 10');
    assert.isFalse(l10.unlocked.speaking, 'Speaking must be locked at Lv 10');

    // Level 15 (1400 XP): Speaking unlocked
    const l15 = ContractValidator.calculateProgression(1400);
    assert.isTrue(l15.unlocked.speaking, 'Speaking must be unlocked at Lv 15');
    assert.isFalse(l15.unlocked.roleplay, 'Roleplay must be locked at Lv 15');

    // Level 20 (1900 XP): All unlocked
    const l20 = ContractValidator.calculateProgression(1900);
    assert.isTrue(l20.unlocked.quiz);
    assert.isTrue(l20.unlocked.spelling);
    assert.isTrue(l20.unlocked.speaking);
    assert.isTrue(l20.unlocked.roleplay, 'Roleplay must be unlocked at Lv 20');
  });

  runner.test('R1-F3.4: Rank title upgrades to Veteran at Level 20', () => {
    const rookie = ContractValidator.calculateProgression(1899);
    assert.equal(rookie.title, 'Rookie', 'Level 19 must have Rookie title');

    const veteran = ContractValidator.calculateProgression(1900);
    assert.equal(veteran.title, 'Veteran', 'Level 20 must have Veteran title');
  });

  runner.test('R1-F3.5: addXP increments total XP and triggers level-up detection in storage backend', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    backend.register('gamer_1', 'pass', 'Gamer One', 'g1@example.com');
    const update1 = backend.addXP(60);
    assert.equal(update1.xp, 60);
    assert.equal(update1.level, 1);
    assert.isFalse(update1.leveledUp);

    const update2 = backend.addXP(50); // total 110 XP -> Level 2
    assert.equal(update2.xp, 110);
    assert.equal(update2.level, 2);
    assert.isTrue(update2.leveledUp, 'Crossing level threshold must flag leveledUp');
    env.restore();
  });

  // =========================================================================
  // R1-F4: Vocab Vault Collection & Mastery
  // =========================================================================
  runner.suite('Tier 1: R1-F4 Vocab Vault & Mastery', { tier: 1, feature: 'R1-F4', milestone: 'M2' });

  runner.test('R1-F4.1: Saving a hotspot word stores it in the user collection', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const sampleHotspot = { id: 101, word: 'Pistol', mean: 'ปืนพก', type: 'Weapon', character_id: 1 };
    const res = backend.saveVocab(sampleHotspot);
    assert.equal(res.count, 1);

    const vocab = backend.getVocab();
    assert.equal(vocab.length, 1);
    assert.equal(vocab[0].word, 'Pistol');
    assert.isFalse(vocab[0].mastered);
    env.restore();
  });

  runner.test('R1-F4.2: Toggling word mastery updates status', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const hs = { id: 201, word: 'Broadsword', mean: 'ดาบใหญ่', type: 'Weapon', character_id: 2 };
    backend.saveVocab(hs);

    const updated = backend.toggleMastered(201);
    assert.isTrue(updated.mastered, 'Word should now be marked as mastered');

    const toggledBack = backend.toggleMastered(201);
    assert.isFalse(toggledBack.mastered, 'Toggling again should unmark mastered');
    env.restore();
  });

  runner.test('R1-F4.3: Removing a word deletes it from Vocab Vault', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    backend.saveVocab({ id: 301, word: 'Shield', mean: 'โล่', type: 'Defense', character_id: 3 });
    backend.saveVocab({ id: 302, word: 'Excalibur', mean: 'ดาบศักดิ์สิทธิ์', type: 'Weapon', character_id: 3 });
    assert.equal(backend.getVocab().length, 2);

    backend.removeVocab(301);
    const remaining = backend.getVocab();
    assert.equal(remaining.length, 1);
    assert.equal(remaining[0].id, 302);
    env.restore();
  });

  runner.test('R1-F4.4: Prevents duplicate entries when saving identical hotspot multiple times', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const hs = { id: 401, word: 'Wings', mean: 'ปีก', type: 'Equipment', character_id: 4 };
    backend.saveVocab(hs);
    backend.saveVocab(hs); // Duplicate call

    assert.equal(backend.getVocab().length, 1, 'Vocab collection must not duplicate word with same hotspot id');
    env.restore();
  });

  runner.test('R1-F4.5: Saved vocab preserves full Thai meaning and word classification', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const hs = { id: 102, word: 'Tactical Suit', mean: 'ชุดปฏิบัติการ', type: 'Attire', character_id: 1 };
    backend.saveVocab(hs);

    const item = backend.getVocab()[0];
    assert.equal(item.mean, 'ชุดปฏิบัติการ');
    assert.equal(item.type, 'Attire');
    assert.exists(item.savedAt);
    env.restore();
  });

  // =========================================================================
  // R1-F5: Admin Custom Hotspots Management
  // =========================================================================
  runner.suite('Tier 1: R1-F5 Admin Hotspots Management', { tier: 1, feature: 'R1-F5', milestone: 'M2' });

  runner.test('R1-F5.1: Admin can add custom hotspot with valid coordinates and Thai mean', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const newHs = backend.addHotspot(1, {
      id: 110,
      x: 45.5,
      y: 60.0,
      word: 'Laser Scope',
      mean: 'กล้องเลเซอร์',
      type: 'Weapon',
    });

    assert.exists(newHs.id);
    assert.equal(newHs.character_id, 1);
    assert.equal(newHs.word, 'Laser Scope');
    env.restore();
  });

  runner.test('R1-F5.2: Reject hotspot addition with out-of-bounds coordinates (x > 100 or y < 0)', async () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    await assert.throws(
      async () => {
        backend.addHotspot(1, {
          x: 125, // Invalid x
          y: 50,
          word: 'Glitch Gun',
          mean: 'ปืนบั๊ก',
          type: 'Weapon',
        });
      },
      'coordinate must be between 0 and 100',
      'Should reject hotspot with x > 100'
    );
    env.restore();
  });

  runner.test('R1-F5.3: Reject hotspot addition without Thai translation', async () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    await assert.throws(
      async () => {
        backend.addHotspot(2, {
          x: 50,
          y: 50,
          word: 'Iron Dagger',
          mean: 'English only meaning', // No Thai characters
          type: 'Weapon',
        });
      },
      'valid Thai characters',
      'Should reject non-Thai meaning'
    );
    env.restore();
  });

  runner.test('R1-F5.4: Delete custom hotspot removes item by ID', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const hs = backend.addHotspot(1, {
      id: 112,
      x: 30,
      y: 40,
      word: 'Scope Lens',
      mean: 'เลนส์ส่อง',
      type: 'Accessory',
    });

    backend.deleteHotspot(hs.id);
    const customList = JSON.parse(env.localStorage.getItem('engame_custom_hotspots') || '[]');
    assert.isFalse(customList.some(h => h.id === hs.id), 'Deleted hotspot must be removed from storage');
    env.restore();
  });

  runner.test('R1-F5.5: Hotspot ID follows (characterId * 100) convention', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const hs = backend.addHotspot(3, {
      x: 70,
      y: 80,
      word: 'Steel Boots',
      mean: 'รองเท้าเหล็ก',
      type: 'Armor',
    });

    assert.equal(Math.floor(hs.id / 100), 3, 'Hotspot prefix must equal character ID (3)');
    env.restore();
  });

  // =========================================================================
  // R1-F6: Standalone & Zero-Network Transparency (GitHub Pages Ready)
  // =========================================================================
  runner.suite('Tier 1: R1-F6 Standalone & Zero-Network Transparency', { tier: 1, feature: 'R1-F6', milestone: 'M2' });

  runner.test('R1-F6.1: Detects GitHub Pages hostname environment (doublefo20.github.io)', () => {
    env.install();
    const isGithubPages = window.location.hostname.includes('github.io');
    assert.isTrue(isGithubPages, 'Must identify github.io host');
    env.restore();
  });

  runner.test('R1-F6.2: In standalone mode, zero network fetch requests are dispatched', async () => {
    env.install();
    env.network.mode = 'standalone';

    // Simulate calling operations via virtual backend
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();
    backend.login('admin', 'admin123');
    backend.addXP(100);

    assert.equal(env.network.getCallCount(), 0, 'Zero network fetch requests should be dispatched');
    env.restore();
  });

  runner.test('R1-F6.3: Operations complete without throwing window.alert dialogs or unhandled errors', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    backend.register('offline_user', 'pass', 'Offline User', 'off@example.com');
    assert.equal(env.alerts.length, 0, 'No alert popups should trigger during normal standalone flow');
    env.restore();
  });

  runner.test('R1-F6.4: Zero console errors logged during standalone initialization and data operations', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    assert.equal(env.consoleErrors.length, 0, 'Console errors count must be 0');
    env.restore();
  });

  runner.test('R1-F6.5: Refreshing session re-reads persisted state seamlessly', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();
    backend.login('admin', 'admin123');

    // Simulate page reload
    window.location.reload();
    assert.equal(env.reloads, 1, 'Reload spy recorded');

    // Verify token & currentUser persist in storage
    const token = env.localStorage.getItem('engame_token');
    const user = JSON.parse(env.localStorage.getItem('engame_currentUser'));
    assert.exists(token);
    assert.equal(user.username, 'admin');
    env.restore();
  });
}
