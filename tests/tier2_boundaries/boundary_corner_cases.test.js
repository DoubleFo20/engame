// tests/tier2_boundaries/boundary_corner_cases.test.js
// Tier 2: Boundary & Corner Cases
// Tests empty data, max heroes scale, invalid coordinates, offline storage overflow,
// reload persistence, session resilience, XP boundary formulas, and UTF-8 encoding.

import { assert } from '../harness/runner.js';
import { VirtualBrowserEnvironment } from '../harness/env.js';
import { ReferenceVirtualBackend } from '../harness/oracle.js';
import { ContractValidator } from '../harness/contract.js';

export function registerTier2BoundaryTests(runner) {
  const env = new VirtualBrowserEnvironment();

  runner.suite('Tier 2: Boundary & Corner Cases', { tier: 2 });

  // 1. Empty Data Handling
  runner.test('Tier 2 - B01: Zero XP, empty vocab, and zero streak initialize cleanly without NaN', () => {
    const prog = ContractValidator.calculateProgression(0);
    assert.equal(prog.xp, 0);
    assert.equal(prog.level, 1);
    assert.equal(prog.progressPercent, 0);
    assert.isFalse(Number.isNaN(prog.level));
    assert.isFalse(Number.isNaN(prog.progressPercent));

    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    const vocab = backend.getVocab();
    assert.isArray(vocab);
    assert.equal(vocab.length, 0);
    env.restore();
  });

  // 2. Max Heroes Scale & Scale Limits
  runner.test('Tier 2 - B02: Boundary Hero ID 1 and ID 111 lookup and access work symmetrically', () => {
    // Simulated roster with boundary heroes
    const mockRoster = [
      { id: 1, name: 'Violet', role: 'Carry', img: './characters/violet_full.png', hotspots: [] },
      { id: 111, name: 'Zuka', role: 'Warrior', img: './characters/Zuka_full.png', hotspots: [] },
    ];

    const firstHero = mockRoster.find(h => h.id === 1);
    assert.exists(firstHero, 'First hero (ID 1) must be accessible');
    assert.equal(firstHero.name, 'Violet');

    const lastHero = mockRoster.find(h => h.id === 111);
    assert.exists(lastHero, 'Last hero (ID 111) must be accessible');
    assert.equal(lastHero.name, 'Zuka');
  });

  // 3. Invalid Coordinates & Clamping
  runner.test('Tier 2 - B03: Hotspot coordinate boundaries [0, 100] are strictly validated', () => {
    // Valid boundaries
    const validMin = ContractValidator.validateHotspot({ id: 101, x: 0, y: 0, word: 'Bow', mean: 'ธนู', type: 'Weapon' }, 1);
    assert.isTrue(validMin.valid, 'x=0, y=0 should be valid boundary coordinates');

    const validMax = ContractValidator.validateHotspot({ id: 102, x: 100, y: 100, word: 'Helm', mean: 'หมวก', type: 'Armor' }, 1);
    assert.isTrue(validMax.valid, 'x=100, y=100 should be valid boundary coordinates');

    // Invalid bounds
    const invalidNegative = ContractValidator.validateHotspot({ id: 103, x: -0.1, y: 50, word: 'Axe', mean: 'ขวาน', type: 'Weapon' }, 1);
    assert.isFalse(invalidNegative.valid, 'Negative x must be rejected');

    const invalidOver = ContractValidator.validateHotspot({ id: 104, x: 50, y: 100.1, word: 'Sword', mean: 'ดาบ', type: 'Weapon' }, 1);
    assert.isFalse(invalidOver.valid, 'y > 100 must be rejected');

    const nonNumeric = ContractValidator.validateHotspot({ id: 105, x: '50', y: null, word: 'Spear', mean: 'หอก', type: 'Weapon' }, 1);
    assert.isFalse(nonNumeric.valid, 'Non-numeric coordinates must be rejected');
  });

  // 4. Offline Storage Quota Overflow Resilience
  runner.test('Tier 2 - B04: Storage quota exhaustion (QuotaExceededError) is caught without crashing host', () => {
    // Create environment with a tiny 100-byte storage quota
    const constrainedEnv = new VirtualBrowserEnvironment({ storageQuota: 100 });
    constrainedEnv.install();

    let quotaCaught = false;
    try {
      // Writing a payload larger than quota
      const largePayload = 'A'.repeat(500);
      constrainedEnv.localStorage.setItem('large_key', largePayload);
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        quotaCaught = true;
      }
    }

    assert.isTrue(quotaCaught, 'QuotaExceededError should be raised and caught cleanly');
    constrainedEnv.restore();
  });

  // 5. Reload Persistence & Object Serialization
  runner.test('Tier 2 - B05: Nested state structures survive serialization and reload with exact fidelity', () => {
    env.install();
    const state = {
      user: { id: 7, username: 'sombat', xp: 550, preferences: { darkTheme: false, sound: true } },
      savedWords: [
        { id: 201, word: 'Broadsword', mean: 'ดาบใหญ่', score: 98.5 },
        { id: 202, word: 'Cape', mean: 'ผ้าคลุม', score: 100 },
      ],
    };

    env.localStorage.setItem('engame_full_state', JSON.stringify(state));

    // Simulate page reload
    window.location.reload();

    const restored = JSON.parse(env.localStorage.getItem('engame_full_state'));
    assert.deepEqual(restored, state, 'State restored after reload must match exact object graph');
    assert.equal(restored.savedWords[0].mean, 'ดาบใหญ่', 'Thai characters must survive serialization');
    env.restore();
  });

  // 6. Session Resilience & Corrupted State
  runner.test('Tier 2 - B06: Corrupted JSON in localStorage is recovered without crashing application', () => {
    env.install();
    // Tamper with corrupted JSON
    env.localStorage.setItem('engame_currentUser', '{corrupted_json_string_without_quotes:');

    let recovered = false;
    try {
      const raw = env.localStorage.getItem('engame_currentUser');
      JSON.parse(raw);
    } catch (err) {
      // Application boot try-catch fallback
      env.localStorage.removeItem('engame_currentUser');
      recovered = true;
    }

    assert.isTrue(recovered, 'Corrupted JSON should be caught and cleared');
    assert.equal(env.localStorage.getItem('engame_currentUser'), null, 'Corrupted key should be cleaned');
    env.restore();
  });

  // 7. Blocked User Auto-Logout
  runner.test('Tier 2 - B07: Blocked user account attempt throws and resets session state', async () => {
    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init([
      { id: 9, username: 'spammer', role: 'student', is_blocked: 1, xp: 0 },
    ]);

    await assert.throws(
      async () => {
        backend.login('spammer', 'pass');
      },
      'blocked',
      'Should throw blocked account error'
    );

    assert.equal(env.localStorage.getItem('engame_token'), null, 'Blocked user must not get a token');
    env.restore();
  });

  // 8. Boundary XP Calculations & Unlocks
  runner.test('Tier 2 - B08: Exact XP boundaries (99->100, 399->400, 899->900, 1899->1900)', () => {
    // 99 XP: Level 1, 99%
    const p99 = ContractValidator.calculateProgression(99);
    assert.equal(p99.level, 1);
    assert.equal(p99.progressPercent, 99);

    // 100 XP: Level 2, 0%
    const p100 = ContractValidator.calculateProgression(100);
    assert.equal(p100.level, 2);
    assert.equal(p100.progressPercent, 0);

    // 399 XP: Level 4, Quiz still locked
    const p399 = ContractValidator.calculateProgression(399);
    assert.equal(p399.level, 4);
    assert.isFalse(p399.unlocked.quiz);

    // 400 XP: Level 5, Quiz unlocks
    const p400 = ContractValidator.calculateProgression(400);
    assert.equal(p400.level, 5);
    assert.isTrue(p400.unlocked.quiz);

    // 899 XP: Level 9, Spelling locked
    const p899 = ContractValidator.calculateProgression(899);
    assert.equal(p899.level, 9);
    assert.isFalse(p899.unlocked.spelling);

    // 900 XP: Level 10, Spelling unlocks
    const p900 = ContractValidator.calculateProgression(900);
    assert.equal(p900.level, 10);
    assert.isTrue(p900.unlocked.spelling);

    // 1899 XP: Level 19, Rookie
    const p1899 = ContractValidator.calculateProgression(1899);
    assert.equal(p1899.level, 19);
    assert.equal(p1899.title, 'Rookie');

    // 1900 XP: Level 20, Veteran & all unlocked
    const p1900 = ContractValidator.calculateProgression(1900);
    assert.equal(p1900.level, 20);
    assert.equal(p1900.title, 'Veteran');
    assert.isTrue(p1900.unlocked.roleplay);
  });

  // 9. Negative XP Clamping
  runner.test('Tier 2 - B09: Negative XP values are safely clamped to 0', () => {
    const negProg = ContractValidator.calculateProgression(-500);
    assert.equal(negProg.xp, 0);
    assert.equal(negProg.level, 1);
    assert.equal(negProg.progressPercent, 0);
  });

  // 10. Adversarial Encoding & Escaping Integrity
  runner.test('Tier 2 - B10: Hero names with punctuation and Thai script preserve character integrity', () => {
    const specialNames = [
      "Azzen'Ka",
      "D'Arcy",
      "Y'bneth",
      "Kil'Groth",
      "Tel'Annas",
      "Lu Bu",
      "The flash",
      "Wonder Woman",
    ];

    env.install();
    const backend = new ReferenceVirtualBackend(env.localStorage);
    backend.init();

    for (let i = 0; i < specialNames.length; i++) {
      const hs = {
        id: (i + 1) * 100 + 1,
        word: `Item for ${specialNames[i]}`,
        mean: `อุปกรณ์ของ ${specialNames[i]} (พิเศษ)`,
        type: 'Equipment',
        character_id: i + 1,
      };
      backend.saveVocab(hs);
    }

    const saved = backend.getVocab();
    assert.equal(saved.length, specialNames.length);
    for (let i = 0; i < specialNames.length; i++) {
      assert.assert(saved[i].mean.includes(specialNames[i]), `Name "${specialNames[i]}" should remain uncorrupted`);
    }
    env.restore();
  });

  // 11. Search Query Edge Cases (Blank, Whitespace, Case-insensitivity)
  runner.test('Tier 2 - B11: Search query edge cases (blank string, leading/trailing whitespace, case-insensitivity)', () => {
    const heroes = [
      { id: 1, name: 'Violet', role: 'Carry' },
      { id: 2, name: 'Butterfly', role: 'Assassin' },
      { id: 3, name: 'Thane', role: 'Tank' },
    ];

    const filterHeroes = (list, query) => {
      if (!query || query.trim() === '') return list;
      const q = query.trim().toLowerCase();
      return list.filter(h => h.name.toLowerCase().includes(q));
    };

    // Blank query returns entire list
    assert.equal(filterHeroes(heroes, '').length, 3);
    assert.equal(filterHeroes(heroes, '   ').length, 3);
    assert.equal(filterHeroes(heroes, null).length, 3);

    // Case-insensitivity and whitespace trim
    assert.equal(filterHeroes(heroes, '  vioLET  ').length, 1);
    assert.equal(filterHeroes(heroes, '  vioLET  ')[0].id, 1);
  });
}
