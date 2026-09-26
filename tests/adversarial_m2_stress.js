// tests/adversarial_m2_stress.js
// Adversarial Stress Harness for Milestone M2 (Virtual Storage Engine & Offline Persistence)
// Authored by Challenger 1 for Milestone M2

import { assert } from './harness/runner.js';
import { VirtualBrowserEnvironment, MockLocalStorage } from './harness/env.js';
import { StorageEngine, calculateProgression, calculateRank, validateHotspot } from '../src/services/storageEngine.js';
import * as api from '../src/api.js';
import { STORAGE_KEYS, CURRENT_SEEDED_VERSION } from '../src/services/mockDataSeeder.js';
import { CHARACTERS } from '../src/data/characters.js';

export async function runM2AdversarialStressTest() {
  console.log('======================================================================');
  console.log('⚔️  CHALLENGER 1: ADVERSARIAL STRESS HARNESS — MILESTONE M2');
  console.log('======================================================================\n');

  const results = {
    totalAssertions: 0,
    passed: 0,
    failed: 0,
    errors: [],
  };

  function check(condition, message) {
    results.totalAssertions++;
    if (condition) {
      results.passed++;
    } else {
      results.failed++;
      results.errors.push(message);
      console.error(`  ❌ FAIL: ${message}`);
    }
  }

  // -------------------------------------------------------------------------
  // Stress Vector 1: QuotaExceededError Recovery Under Storage Pressure
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 1: QuotaExceededError Recovery Under Storage Pressure ---');
  {
    // Custom storage with mock quota failure
    let throwQuotaOnNextSet = false;
    let quotaHitCount = 0;
    const quotaMockStorage = {
      _store: new Map(),
      getItem(k) { return this._store.get(String(k)) || null; },
      setItem(k, v) {
        if (throwQuotaOnNextSet) {
          quotaHitCount++;
          const err = new Error('QuotaExceededError: The quota has been exceeded.');
          err.name = 'QuotaExceededError';
          err.code = 22;
          throw err;
        }
        this._store.set(String(k), String(v));
      },
      removeItem(k) { this._store.delete(String(k)); },
      clear() { this._store.clear(); },
    };

    const engine = new StorageEngine(quotaMockStorage);
    engine.init();

    // 1.1: Prunes activity logs when quota is exceeded and logs > 10
    const dummyLogs = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      action: 'test_action',
      details: `Log entry ${i + 1}`,
      created_at: new Date().toISOString(),
    }));
    quotaMockStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(dummyLogs));

    // Force QuotaExceededError on next write
    throwQuotaOnNextSet = true;
    const ok = engine.safeSet('engame_temp_stress_key', { data: 'important_data' });
    // First attempt threw quota, engine caught it, pruned logs, but since our mock kept throwing, it returns false
    check(quotaHitCount >= 1, 'QuotaExceededError was triggered and caught by safeSet');
    check(typeof ok === 'boolean', 'safeSet returned a boolean without throwing an unhandled exception');

    // Test with conditional quota: throws only once, then allows write after pruning
    quotaHitCount = 0;
    let hasPruned = false;
    const adaptiveQuotaStorage = {
      _store: new Map(),
      getItem(k) { return this._store.get(String(k)) || null; },
      setItem(k, v) {
        if (!hasPruned && k === 'engame_critical_key') {
          quotaHitCount++;
          const err = new Error('QuotaExceededError: DOM Exception 22');
          err.name = 'QuotaExceededError';
          err.code = 22;
          throw err;
        }
        if (k === STORAGE_KEYS.ACTIVITY_LOGS) {
          hasPruned = true;
        }
        this._store.set(String(k), String(v));
      },
      removeItem(k) { this._store.delete(String(k)); },
      clear() { this._store.clear(); },
    };

    const adaptiveEngine = new StorageEngine(adaptiveQuotaStorage);
    adaptiveEngine.init();
    adaptiveQuotaStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(dummyLogs));

    const recovered = adaptiveEngine.safeSet('engame_critical_key', { status: 'rescued' });
    check(recovered === true, 'safeSet successfully pruned logs and retried the critical write');
    check(hasPruned === true, 'Activity logs pruning was triggered');

    const remainingLogs = adaptiveEngine.safeGet(STORAGE_KEYS.ACTIVITY_LOGS, []);
    check(remainingLogs.length <= 10, `Activity logs pruned down to ${remainingLogs.length} (must be <= 10)`);
  }

  // -------------------------------------------------------------------------
  // Stress Vector 2: Corrupted JSON Handling Across Storage Keys
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 2: Corrupted JSON Handling in localStorage ---');
  {
    const corruptStorage = new MockLocalStorage();
    const engine = new StorageEngine(corruptStorage);

    // Corrupt engame_currentUser
    corruptStorage.setItem(STORAGE_KEYS.CURRENT_USER, '{invalid_json_missing_bracket: true');
    const userRes = engine.getCurrentUser();
    check(userRes === null, 'Corrupted currentUser safely returns null');
    check(corruptStorage.getItem(STORAGE_KEYS.CURRENT_USER) === null, 'Corrupted currentUser key was cleaned up');

    // Corrupt engame_vocab
    corruptStorage.setItem(STORAGE_KEYS.VOCAB, '<<<NOT_JSON>>>');
    const vocabRes = engine.getVocab();
    check(Array.isArray(vocabRes), 'Corrupted vocab safely falls back to array');
    check(corruptStorage.getItem(STORAGE_KEYS.VOCAB) === null, 'Corrupted vocab key was cleaned up');

    // Corrupt engame_users and verify auto-healing on next init
    corruptStorage.setItem(STORAGE_KEYS.USERS, '{{corrupted_users_db');
    const usersBefore = engine.safeGet(STORAGE_KEYS.USERS, []);
    check(usersBefore.length === 0, 'SafeGet returned fallback empty array for corrupted users');
    check(corruptStorage.getItem(STORAGE_KEYS.USERS) === null, 'Corrupted users key purged');

    // Now call init() to test self-healing
    engine.init();
    const healedUsers = engine.getUsers();
    check(Array.isArray(healedUsers) && healedUsers.length >= 2, 'Self-healing restored default user accounts');
    check(healedUsers.some(u => u.username === 'admin'), 'Restored users contain admin');
    check(healedUsers.some(u => u.username === 'demo'), 'Restored users contain demo');

    // Corrupt engame_characters
    corruptStorage.setItem(STORAGE_KEYS.CHARACTERS, 'undefined');
    const chars = engine.getCharacters();
    check(Array.isArray(chars) && chars.length === 111, 'Corrupted characters safely falls back to CHARACTERS (111 heroes)');
  }

  // -------------------------------------------------------------------------
  // Stress Vector 3: Blocked User Enforcement & Session Invalidation
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 3: Blocked User Enforcement ---');
  {
    const storage = new MockLocalStorage();
    const engine = new StorageEngine(storage);
    engine.init();

    // Register a student account
    const registered = engine.register('bad_actor', 'pass123', 'Bad Actor', 'bad@example.com');
    check(registered.token !== undefined, 'User registered and has token');
    check(storage.getItem(STORAGE_KEYS.TOKEN) === registered.token, 'Token persisted in storage');

    // Block the user
    const blockRes = engine.blockUser(registered.user.id);
    check(blockRes.message.includes('blocked'), 'User blocked message returned');

    // Verify session was revoked immediately because current user was blocked
    check(storage.getItem(STORAGE_KEYS.TOKEN) === null, 'Active token cleared on blocking current user');
    check(storage.getItem(STORAGE_KEYS.CURRENT_USER) === null, 'Current user cleared on blocking');

    // Attempting login as blocked user must throw
    let loginThrew = false;
    let loginErrorMessage = '';
    try {
      engine.login('bad_actor', 'pass123');
    } catch (e) {
      loginThrew = true;
      loginErrorMessage = e.message;
    }
    check(loginThrew === true, 'Login as blocked user threw an error');
    check(loginErrorMessage.toLowerCase().includes('blocked'), `Error message mentions "blocked", got: "${loginErrorMessage}"`);
    check(storage.getItem(STORAGE_KEYS.TOKEN) === null, 'No token granted to blocked user');

    // Attempting forgotPassword as blocked user must throw
    let forgotThrew = false;
    try {
      engine.forgotPassword('bad_actor', 'bad@example.com', 'newpass123');
    } catch (e) {
      forgotThrew = true;
    }
    check(forgotThrew === true, 'forgotPassword for blocked user threw an error');

    // Admin cannot be blocked
    let adminBlockThrew = false;
    const adminUser = engine.getUsers().find(u => u.username === 'admin');
    try {
      engine.blockUser(adminUser.id);
    } catch (e) {
      adminBlockThrew = true;
    }
    check(adminBlockThrew === true, 'Attempting to block admin user throws error');

    // Unblock the user
    const unblockRes = engine.unblockUser(registered.user.id);
    check(unblockRes.message.includes('unblocked'), 'User unblocked message returned');

    // Now login should succeed
    const unblockedLogin = engine.login('bad_actor', 'pass123');
    check(unblockedLogin.token !== undefined, 'Login succeeds after unblocking');
  }

  // -------------------------------------------------------------------------
  // Stress Vector 4: Zero Network Fetch Calls on Static Hosting Simulation
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 4: Zero Network Fetch Calls on Static Hosting ---');
  {
    const env = new VirtualBrowserEnvironment({ hostname: 'doublefo20.github.io' });
    env.install();

    check(api.isStandaloneMode() === true, 'isStandaloneMode() correctly identifies doublefo20.github.io');

    // Execute full life-cycle operations via api.*
    const p1 = async () => {
      // 1. Login
      const user = await api.apiLogin('admin', '123');
      check(user.username === 'admin', 'apiLogin returns admin user');

      // 2. Characters
      const chars = await api.apiGetCharacters();
      check(chars.length === 111, 'apiGetCharacters returns 111 heroes');

      // 3. Vocab
      const vocab = await api.apiGetVocab();
      check(Array.isArray(vocab), 'apiGetVocab returns array');

      // 4. Save vocab
      const saveRes = await api.apiSaveVocab(101);
      check(saveRes.count !== undefined, 'apiSaveVocab returns count');

      // 5. Add XP
      const xpRes = await api.apiAddXP(50);
      check(xpRes.xp !== undefined, 'apiAddXP returns xp');

      // 6. Progress
      const prog = await api.apiGetProgress();
      check(prog.level !== undefined, 'apiGetProgress returns level');

      // 7. Hotspot management
      const newHs = await api.apiAddHotspot({
        character_id: 1,
        x: 50,
        y: 50,
        word: 'Tactical Holster',
        mean: 'ซองปืนยุทธวิธี',
        type: 'Equipment',
      });
      check(newHs.word === 'Tactical Holster', 'apiAddHotspot creates custom hotspot');

      await api.apiUpdateHotspot(newHs.id, { word: 'Elite Holster' });
      await api.apiDeleteHotspot(newHs.id);

      // 8. AI fallback hotspots
      const aiHs = await api.apiGenerateHotspots(1);
      check(aiHs.length >= 4, 'apiGenerateHotspots returns procedural offline hotspots');

      // 9. Activity stats
      const stats = await api.apiGetActivityStats();
      check(stats.todayActiveUsers !== undefined, 'apiGetActivityStats returns stats');

      // 10. Logout
      api.apiLogout();
      check(env.localStorage.getItem('engame_token') === null, 'apiLogout removes token');
    };

    // Run async life-cycle
    try {
      await p1();
      check(env.network.getCallCount() === 0, `Exactly 0 fetch calls were emitted (got ${env.network.getCallCount()})`);
      check(env.alerts.length === 0, `0 alert dialogs triggered (got ${env.alerts.length})`);
    } catch (err) {
      check(false, `Unexpected error during static hosting simulation: ${err.message}`);
    } finally {
      env.restore();
    }
  }

  // -------------------------------------------------------------------------
  // Stress Vector 5: Concurrency, Boundary Formulas & De-duplication
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 5: Boundary Formulas, Concurrency & Idempotency ---');
  {
    const storage = new MockLocalStorage();
    const engine = new StorageEngine(storage);
    engine.init();
    engine.login('player', '123');

    // 5.1: 50 sequential XP increments
    let expectedXP = 0;
    for (let i = 0; i < 50; i++) {
      const step = 20;
      expectedXP += step;
      const res = engine.addXP(step);
      check(res.xp === expectedXP, `Step ${i + 1}: expected XP ${expectedXP}, got ${res.xp}`);
      const expectedLevel = Math.floor(expectedXP / 100) + 1;
      check(res.level === expectedLevel, `Step ${i + 1}: expected Level ${expectedLevel}, got ${res.level}`);
    }

    // 5.2: Vocab idempotency: save same hotspot 10 times
    const initialVocabCount = engine.getVocab().length;
    for (let i = 0; i < 10; i++) {
      engine.saveVocab({ id: 999, character_id: 1, word: 'Laser', mean: 'ลำแสงเลเซอร์', type: 'Weapon' });
    }
    const finalVocabCount = engine.getVocab().length;
    check(finalVocabCount === initialVocabCount + 1, `Vocab count increased by exactly 1 (expected ${initialVocabCount + 1}, got ${finalVocabCount})`);

    // 5.3: Hotspot coordinate and Thai validation
    const invalidHsNegative = validateHotspot({ x: -1, y: 50, word: 'Bow', mean: 'ธนู', type: 'Weapon' });
    check(invalidHsNegative.valid === false, 'Negative x coordinate rejected');

    const invalidHsOver = validateHotspot({ x: 50, y: 100.5, word: 'Bow', mean: 'ธนู', type: 'Weapon' });
    check(invalidHsOver.valid === false, 'y > 100 rejected');

    const invalidHsNoThai = validateHotspot({ x: 50, y: 50, word: 'Bow', mean: 'Bow and arrow only', type: 'Weapon' });
    check(invalidHsNoThai.valid === false, 'Non-Thai mean rejected');

    const validHs = validateHotspot({ x: 50, y: 50, word: 'Bow', mean: 'คันธนูโบราณ', type: 'Weapon' });
    check(validHs.valid === true, 'Valid hotspot accepted');
  }

  console.log('\n======================================================================');
  console.log(`Total Assertions Evaluated: ${results.totalAssertions}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Status: ${results.failed === 0 ? '✅ ALL ADVERSARIAL M2 TESTS PASSED' : '⚠️ TEST FAILURES DETECTED'}`);
  console.log('======================================================================\n');

  return results;
}

export function registerAdversarialM2Tests(runner) {
  runner.suite('Tier 5 (Adversarial): Milestone M2 Storage Engine Hardening', { tier: 5, milestone: 'M2' });

  runner.test('ADV-M2.1: Storage quota exhaustion (QuotaExceededError) triggers log pruning without unhandled crash', () => {
    let quotaHitCount = 0;
    const dummyLogs = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      action: 'action',
      details: `Log ${i}`,
      created_at: new Date().toISOString(),
    }));

    let pruned = false;
    const quotaStorage = {
      _store: new Map(),
      getItem(k) { return this._store.get(String(k)) || null; },
      setItem(k, v) {
        if (!pruned && k === 'critical_state') {
          quotaHitCount++;
          const err = new Error('QuotaExceededError: Storage quota exceeded');
          err.name = 'QuotaExceededError';
          err.code = 22;
          throw err;
        }
        if (k === STORAGE_KEYS.ACTIVITY_LOGS) {
          pruned = true;
        }
        this._store.set(String(k), String(v));
      },
      removeItem(k) { this._store.delete(String(k)); },
      clear() { this._store.clear(); },
    };

    const engine = new StorageEngine(quotaStorage);
    engine.init();
    quotaStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(dummyLogs));

    const ok = engine.safeSet('critical_state', { key: 'rescued' });
    assert.isTrue(ok, 'safeSet should succeed after pruning activity logs');
    assert.isTrue(pruned, 'Activity logs should have been pruned');
  });

  runner.test('ADV-M2.2: Corrupted JSON strings in storage keys are self-healed and do not crash host', () => {
    const memStorage = new MockLocalStorage();
    const engine = new StorageEngine(memStorage);

    memStorage.setItem(STORAGE_KEYS.CURRENT_USER, '{corrupted_json');
    assert.equal(engine.getCurrentUser(), null, 'Corrupted currentUser returns null');
    assert.equal(memStorage.getItem(STORAGE_KEYS.CURRENT_USER), null, 'Corrupted key removed');

    memStorage.setItem(STORAGE_KEYS.USERS, '[[not valid json]');
    engine.init();
    const users = engine.getUsers();
    assert.isArray(users, 'Users restored as array');
    assert.assert(users.length >= 2, 'Default accounts re-seeded');
  });

  runner.test('ADV-M2.3: Blocked accounts are rejected and active sessions are revoked immediately', async () => {
    const storage = new MockLocalStorage();
    const engine = new StorageEngine(storage);
    engine.init();

    const reg = engine.register('victim_user', 'pass', 'Victim', 'v@test.com');
    assert.exists(storage.getItem(STORAGE_KEYS.TOKEN));

    engine.blockUser(reg.user.id);
    assert.equal(storage.getItem(STORAGE_KEYS.TOKEN), null, 'Session revoked upon block');

    await assert.throws(
      async () => {
        engine.login('victim_user', 'pass');
      },
      'blocked',
      'Should reject login for blocked account'
    );
  });

  runner.test('ADV-M2.4: Zero fetch calls emitted across full API lifecycle in standalone mode', async () => {
    const env = new VirtualBrowserEnvironment({ hostname: 'doublefo20.github.io' });
    env.install();

    assert.isTrue(api.isStandaloneMode(), 'Must detect standalone mode on github.io');

    await api.apiLogin('admin', '123');
    await api.apiGetCharacters();
    await api.apiGetVocab();
    await api.apiSaveVocab(101);
    await api.apiAddXP(50);
    await api.apiGetProgress();
    api.apiLogout();

    assert.equal(env.network.getCallCount(), 0, 'Zero network fetch calls must be emitted');
    assert.equal(env.alerts.length, 0, 'Zero alert dialogs triggered');
    env.restore();
  });

  runner.test('ADV-M2.5: Vocab saving is idempotent and coordinate boundaries [0, 100] are strictly enforced', () => {
    const storage = new MockLocalStorage();
    const engine = new StorageEngine(storage);
    engine.init();
    engine.login('player', '123');

    const countBefore = engine.getVocab().length;
    for (let i = 0; i < 5; i++) {
      engine.saveVocab({ id: 888, character_id: 1, word: 'Grip', mean: 'ด้ามจับ', type: 'Equipment' });
    }
    assert.equal(engine.getVocab().length, countBefore + 1, 'Vocab must not contain duplicates for same hotspot ID');

    const invalid = validateHotspot({ x: 105, y: 50, word: 'Grip', mean: 'ด้ามจับ', type: 'Equipment' });
    assert.isFalse(invalid.valid, 'Hotspot with x > 100 must be rejected');
  });
}

if (process.argv[1] && process.argv[1].endsWith('adversarial_m2_stress.js')) {
  runM2AdversarialStressTest().then(res => {
    if (res.failed > 0) process.exit(1);
  });
}
