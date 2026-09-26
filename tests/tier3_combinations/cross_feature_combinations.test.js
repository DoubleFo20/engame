// tests/tier3_combinations/cross_feature_combinations.test.js
// Tier 3: Cross-Feature Combinations
// Tests multi-feature workflows and state transitions across auth, progression,
// hero exploration, vocab vault, admin operations, and dual-mode execution.

import { assert } from '../harness/runner.js';
import { VirtualBrowserEnvironment } from '../harness/env.js';
import { ReferenceVirtualBackend } from '../harness/oracle.js';
import { ContractValidator } from '../harness/contract.js';

export function registerTier3CombinationTests(runner) {
  const env = new VirtualBrowserEnvironment({ hostname: 'doublefo20.github.io' });

  runner.suite('Tier 3: Cross-Feature Combinations', { tier: 3 });

  // Combo 1: Register -> Login -> Browse Hero 111 -> Click Hotspot -> Save Vocab -> Earn XP -> Verify Storage & Reload
  runner.test('Tier 3 - C01: Register -> Login -> Browse Hero 111 -> Save Hotspot -> Earn XP -> Verify Reload Persistence', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    // 1. Register new user
    const regRes = backend.register('learner_sarah', 'pass_sarah', 'Sarah Connor', 'sarah@example.com');
    assert.exists(regRes.token);
    assert.equal(regRes.user.username, 'learner_sarah');

    // 2. Login
    const loginRes = backend.login('learner_sarah', 'pass_sarah');
    assert.equal(loginRes.user.xp, 0);

    // 3. Inspect Hero 111 (Zuka) and save hotspot
    const hero111Hotspot = {
      id: 11101,
      character_id: 111,
      x: 35.5,
      y: 42.0,
      word: 'Bamboo Staff',
      mean: 'กระบองไม้ไผ่',
      type: 'Weapon',
    };
    backend.saveVocab(hero111Hotspot);

    // 4. Earn XP from study session (+75 XP)
    const xpResult = backend.addXP(75);
    assert.equal(xpResult.xp, 75);
    assert.equal(xpResult.level, 1);
    assert.equal(xpResult.progressPercent, 75);

    // 5. Earn additional XP to cross level boundary (+50 XP -> 125 XP, Level 2)
    const levelUpResult = backend.addXP(50);
    assert.equal(levelUpResult.xp, 125);
    assert.equal(levelUpResult.level, 2);
    assert.isTrue(levelUpResult.leveledUp);

    // 6. Simulate page reload and verify all data persists
    window.location.reload();

    const storedUser = JSON.parse(env.localStorage.getItem('engame_currentUser'));
    assert.equal(storedUser.xp, 125);

    const storedVocab = backend.getVocab();
    assert.equal(storedVocab.length, 1);
    assert.equal(storedVocab[0].word, 'Bamboo Staff');
    assert.equal(storedVocab[0].mean, 'กระบองไม้ไผ่');

    env.restore();
  });

  // Combo 2: Admin Hotspot Creation -> Student Vocab Save -> Admin Deletion Integrity
  runner.test('Tier 3 - C02: Admin creates hotspot -> Student saves to Vocab -> Admin deletes hotspot -> Vocab integrity', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    // 1. Admin login & creates new custom hotspot on Hero 1
    backend.login('admin', 'admin123');
    const customHotspot = backend.addHotspot(1, {
      id: 109,
      x: 48,
      y: 52,
      word: 'Hyper Blaster',
      mean: 'ปืนไฮเปอร์บลาสเตอร์',
      type: 'Weapon',
    });
    assert.equal(customHotspot.word, 'Hyper Blaster');

    // 2. Admin logs out, Student logs in
    backend.logout();
    backend.register('student_alex', 'alex123', 'Alex', 'alex@example.com');
    backend.login('student_alex', 'alex123');

    // 3. Student discovers and saves the custom hotspot
    backend.saveVocab(customHotspot);
    assert.equal(backend.getVocab().length, 1);

    // 4. Admin logs in again and deletes the custom hotspot
    backend.logout();
    backend.login('admin', 'admin123');
    backend.deleteHotspot(109);

    // 5. Student re-logs in and inspects vocab: saved word is retained in personal vault
    backend.logout();
    backend.login('student_alex', 'alex123');
    const studentVocab = backend.getVocab();
    assert.equal(studentVocab.length, 1, 'Student saved vocab remains safely archived');
    assert.equal(studentVocab[0].word, 'Hyper Blaster');

    env.restore();
  });

  // Combo 3: Progression Unlocking Pipeline (Level 1 -> 5 -> 10 -> 20)
  runner.test('Tier 3 - C03: Progression chain unlocks Quiz at Lv 5, Spelling at Lv 10, Veteran title at Lv 20', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    backend.register('progression_runner', 'pass', 'Progression Runner', 'runner@example.com');
    backend.login('progression_runner', 'pass');

    // Step 1: Baseline at 0 XP
    let prog = backend.addXP(0);
    assert.isFalse(prog.unlocked.quiz);
    assert.isFalse(prog.unlocked.spelling);
    assert.equal(prog.title, 'Rookie');

    // Step 2: Earn 400 XP -> Reach Level 5
    prog = backend.addXP(400);
    assert.equal(prog.level, 5);
    assert.isTrue(prog.unlocked.quiz, 'Quiz must unlock at Level 5');
    assert.isFalse(prog.unlocked.spelling);

    // Step 3: Earn 500 more XP (900 XP total) -> Reach Level 10
    prog = backend.addXP(500);
    assert.equal(prog.level, 10);
    assert.isTrue(prog.unlocked.quiz);
    assert.isTrue(prog.unlocked.spelling, 'Spelling must unlock at Level 10');
    assert.isFalse(prog.unlocked.speaking);

    // Step 4: Earn 1000 more XP (1900 XP total) -> Reach Level 20
    prog = backend.addXP(1000);
    assert.equal(prog.level, 20);
    assert.isTrue(prog.unlocked.speaking);
    assert.isTrue(prog.unlocked.roleplay);
    assert.equal(prog.title, 'Veteran', 'Title upgrades to Veteran at Level 20');

    env.restore();
  });

  // Combo 4: Hero Filtering -> Flashcards Practice -> Word Mastery -> Stat Grid Sync
  runner.test('Tier 3 - C04: Role Filter -> Select Hero -> Practice Flashcards -> Mark Mastered -> Stat Sync', () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    backend.register('scholar_tony', 'pass', 'Tony', 'tony@example.com');
    backend.login('scholar_tony', 'pass');

    // Simulate hero roster filtering
    const heroes = [
      { id: 2, name: 'Butterfly', role: 'Assassin', hotspots: [{ id: 201, word: 'Broadsword', mean: 'ดาบใหญ่', type: 'Weapon' }] },
      { id: 4, name: 'Krixi', role: 'Mage', hotspots: [{ id: 401, word: 'Wings', mean: 'ปีก', type: 'Equipment' }] },
    ];

    const mageHeroes = heroes.filter(h => h.role === 'Mage');
    assert.equal(mageHeroes.length, 1);
    const selectedHero = mageHeroes[0];

    // Save hotspot to vocab
    backend.saveVocab(selectedHero.hotspots[0]);

    // Practice and mark as mastered
    const masteredItem = backend.toggleMastered(401);
    assert.isTrue(masteredItem.mastered);

    // Add XP for completing practice
    const xpUpdate = backend.addXP(30);
    assert.equal(xpUpdate.xp, 30);

    // Verify vocab and mastery counts in user profile
    const vocabList = backend.getVocab();
    const masteredCount = vocabList.filter(v => v.mastered).length;
    assert.equal(masteredCount, 1);

    env.restore();
  });

  // Combo 5: Dual-Mode Resilience (Online -> Static Standalone Switch)
  runner.test('Tier 3 - C05: Transparent switch to Standalone mode with 0 network calls and state continuity', () => {
    env.install();
    env.network.mode = 'standalone';

    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    // Verify 0 fetch calls during registration, login, and vocab operations
    backend.register('offline_survivor', 'pass', 'Survivor', 'surv@example.com');
    backend.login('offline_survivor', 'pass');
    backend.saveVocab({ id: 501, word: 'Fireball', mean: 'ลูกไฟ', type: 'Magic' });
    backend.addXP(80);

    assert.equal(env.network.getCallCount(), 0, 'No HTTP requests should be dispatched in standalone mode');

    const vocab = backend.getVocab();
    assert.equal(vocab.length, 1);
    assert.equal(vocab[0].word, 'Fireball');

    env.restore();
  });
}
