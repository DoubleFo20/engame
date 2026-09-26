// tests/adversarial_m1_stress.js
// Adversarial Stress Harness for Milestone M1 (111 Hero Dataset & SQL Sync)
// Authored by Challenger 1 for Milestone M1

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHARACTERS } from '../src/data/characters.js';
import { STANDARD_ROV_ROLES, VALID_HOTSPOT_CATEGORIES, ContractValidator } from './harness/contract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../');

export function runM1AdversarialStressTest() {
  console.log('======================================================================');
  console.log('⚔️  CHALLENGER 1: ADVERSARIAL STRESS HARNESS — MILESTONE M1');
  console.log('======================================================================\n');

  const results = {
    totalAssertions: 0,
    passed: 0,
    failed: 0,
    errors: [],
  };

  function assert(condition, message) {
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
  // Stress Vector 1: Full Asset Parity & Filename Case Sensitivity
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 1: Asset Parity & Casing ---');
  const charactersDir = path.join(PROJECT_ROOT, 'public', 'characters');
  const pngAssets = fs.readdirSync(charactersDir).filter(f => f.toLowerCase().endsWith('.png'));
  assert(pngAssets.length === 111, `Expected 111 PNGs in public/characters/, found ${pngAssets.length}`);

  const assetSet = new Set(pngAssets);
  assert(CHARACTERS.length === 111, `Expected 111 heroes in CHARACTERS, found ${CHARACTERS.length}`);

  for (const hero of CHARACTERS) {
    const filename = hero.img.replace('./characters/', '');
    assert(assetSet.has(filename), `Asset "${filename}" for hero "${hero.name}" (ID ${hero.id}) missing from disk`);
  }

  // -------------------------------------------------------------------------
  // Stress Vector 2: Uniqueness of Hero Names and Identifiers
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 2: Uniqueness of Names & IDs ---');
  const seenIds = new Set();
  const seenNames = new Set();

  for (let i = 0; i < CHARACTERS.length; i++) {
    const hero = CHARACTERS[i];
    const expectedId = i + 1;
    assert(hero.id === expectedId, `Hero at index ${i} has ID ${hero.id}, expected sequential ID ${expectedId}`);
    assert(!seenIds.has(hero.id), `Duplicate hero ID detected: ${hero.id}`);
    seenIds.add(hero.id);

    assert(!seenNames.has(hero.name.toLowerCase()), `Duplicate hero name detected: "${hero.name}"`);
    seenNames.add(hero.name.toLowerCase());
  }

  // -------------------------------------------------------------------------
  // Stress Vector 3: Apostrophe & Special Character Escaping (JS & SQL)
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 3: Apostrophes & Special Characters ---');
  const apostropheHeroes = [
    { id: 18, name: "Azzen'Ka", asset: "Azzen'Ka_full.png" },
    { id: 25, name: "D'Arcy", asset: "D'Arcy_full.png" },
    { id: 29, name: "Eland'orr", asset: "Eland'orr_full.png" },
    { id: 45, name: "Kil'Groth", asset: "Kil'Groth_full.png" },
    { id: 87, name: "Tel'Annas", asset: "Tel'Annas_full.png" },
    { id: 103, name: "Y'bneth", asset: "Y'bneth_full.png" },
  ];

  const initSqlPath = path.join(PROJECT_ROOT, 'server', 'init.sql');
  const sqlContent = fs.readFileSync(initSqlPath, 'utf-8');

  for (const exp of apostropheHeroes) {
    const hero = CHARACTERS.find(h => h.id === exp.id);
    assert(hero !== undefined, `Apostrophe hero ID ${exp.id} missing in JS dataset`);
    if (hero) {
      assert(hero.name === exp.name, `Hero ${exp.id} name mismatch: expected "${exp.name}", got "${hero.name}"`);
      assert(hero.img === `./characters/${exp.asset}`, `Hero ${exp.id} img path mismatch`);
    }

    // Verify SQL escaping
    const sqlEscapedName = exp.name.replace(/'/g, "''");
    const sqlEscapedAsset = `./characters/${exp.asset.replace(/'/g, "''")}`;
    assert(sqlContent.includes(`'${sqlEscapedName}'`), `SQL missing escaped name for "${exp.name}"`);
    assert(sqlContent.includes(`'${sqlEscapedAsset}'`), `SQL missing escaped image path for "${exp.asset}"`);
  }

  // Verify non-comment lines in init.sql have even single-quote counts (no unescaped syntax errors)
  const sqlLines = sqlContent.split('\n');
  for (let lineNum = 1; lineNum <= sqlLines.length; lineNum++) {
    const line = sqlLines[lineNum - 1].trim();
    if (line.startsWith('--') || line === '') continue;
    const quoteCount = (line.match(/'/g) || []).length;
    assert(quoteCount % 2 === 0, `SQL syntax risk: line ${lineNum} has odd single quote count (${quoteCount}): ${line}`);
  }

  // -------------------------------------------------------------------------
  // Stress Vector 4: Coordinate Boundaries & Hotspot Schema Integrity
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 4: Coordinate Boundaries [0, 100] & Types ---');
  let totalHotspots = 0;
  const seenHotspotIds = new Set();

  for (const hero of CHARACTERS) {
    assert(hero.hotspots.length >= 4 && hero.hotspots.length <= 6,
      `Hero "${hero.name}" has ${hero.hotspots.length} hotspots (must be 4-6)`);

    hero.hotspots.forEach((hs, idx) => {
      totalHotspots++;
      assert(!seenHotspotIds.has(hs.id), `Duplicate hotspot ID ${hs.id} in hero "${hero.name}"`);
      seenHotspotIds.add(hs.id);

      assert(hs.character_id === hero.id,
        `Hotspot ${hs.id} character_id ${hs.character_id} != hero id ${hero.id}`);

      // Strict boundary check [0, 100]
      assert(typeof hs.x === 'number' && hs.x >= 0 && hs.x <= 100,
        `Hotspot ${hs.id} x coordinate ${hs.x} out of bounds [0, 100]`);
      assert(typeof hs.y === 'number' && hs.y >= 0 && hs.y <= 100,
        `Hotspot ${hs.id} y coordinate ${hs.y} out of bounds [0, 100]`);

      // Non-empty strings
      assert(typeof hs.word === 'string' && hs.word.trim().length > 0,
        `Hotspot ${hs.id} word cannot be blank`);
      assert(typeof hs.mean === 'string' && hs.mean.trim().length > 0,
        `Hotspot ${hs.id} mean cannot be blank`);

      // Thai script presence
      const hasThai = /[\u0E00-\u0E7F]/.test(hs.mean);
      assert(hasThai, `Hotspot ${hs.id} ("${hs.word}") mean "${hs.mean}" missing Thai script`);

      // Recognized category
      const isValidCat = VALID_HOTSPOT_CATEGORIES.some(c => hs.type.toLowerCase().includes(c.toLowerCase()));
      assert(isValidCat, `Hotspot ${hs.id} type "${hs.type}" is not recognized`);
    });
  }

  assert(totalHotspots >= 444, `Total hotspots ${totalHotspots} must be >= 444 (111 * 4)`);

  // -------------------------------------------------------------------------
  // Stress Vector 5: Role Filtering Compatibility
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 5: Role Filtering Compatibility ---');
  const targetFilterRoles = ['Tank', 'Fighter', 'Assassin', 'Mage', 'Carry', 'Support'];

  for (const filterRole of targetFilterRoles) {
    const matches = CHARACTERS.filter(c => c.role.toLowerCase().includes(filterRole.toLowerCase()));
    assert(matches.length > 0, `Role filter "${filterRole}" returned 0 heroes`);
  }

  // Also verify canonical ROV terminology
  const warriorMatches = CHARACTERS.filter(c => c.role.toLowerCase().includes('warrior'));
  assert(warriorMatches.length > 0, `Role filter "Warrior" returned 0 heroes`);
  const marksmanMatches = CHARACTERS.filter(c => c.role.toLowerCase().includes('marksman'));
  assert(marksmanMatches.length > 0, `Role filter "Marksman" returned 0 heroes`);

  // -------------------------------------------------------------------------
  // Stress Vector 6: SQL Seed Synchronization & Integrity
  // -------------------------------------------------------------------------
  console.log('--- Stress Vector 6: SQL Seed Synchronization ---');
  for (const hero of CHARACTERS) {
    assert(sqlContent.includes(`(${hero.id}, `), `SQL missing character record for ID ${hero.id}`);
    for (const hs of hero.hotspots) {
      assert(sqlContent.includes(`(${hs.id}, ${hs.character_id}, `),
        `SQL missing hotspot record for ID ${hs.id} (hero ${hero.id})`);
    }
  }

  assert(!sqlContent.includes('???'), 'SQL file must not contain ??? character corruption');
  assert(!sqlContent.includes('\uFFFD'), 'SQL file must not contain Unicode replacement character');

  console.log('\n======================================================================');
  console.log(`Total Assertions Evaluated: ${results.totalAssertions}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Status: ${results.failed === 0 ? '✅ ALL ADVERSARIAL STRESS TESTS PASSED' : '⚠️ TEST FAILURES DETECTED'}`);
  console.log('======================================================================\n');

  return results;
}

export function registerAdversarialM1Tests(runner) {
  runner.suite('Tier 5 (Adversarial): Milestone M1 Hardening & Boundary Stress', { tier: 5, milestone: 'M1' });

  runner.test('ADV-M1.1: 111 Character assets exact file presence and casing verification', () => {
    const charactersDir = path.join(PROJECT_ROOT, 'public', 'characters');
    const pngAssets = fs.readdirSync(charactersDir).filter(f => f.toLowerCase().endsWith('.png'));
    const assetSet = new Set(pngAssets);
    assert(pngAssets.length === 111, 'Must have exactly 111 PNGs');
    for (const hero of CHARACTERS) {
      const filename = hero.img.replace('./characters/', '');
      assert(assetSet.has(filename), `Missing asset: ${filename}`);
    }
  });

  runner.test('ADV-M1.2: Strict uniqueness of all 111 hero names and sequential IDs', () => {
    const seenNames = new Set();
    for (let i = 0; i < CHARACTERS.length; i++) {
      const h = CHARACTERS[i];
      assert(h.id === i + 1, `Hero ID ${h.id} not sequential`);
      assert(!seenNames.has(h.name.toLowerCase()), `Duplicate hero name: ${h.name}`);
      seenNames.add(h.name.toLowerCase());
    }
  });

  runner.test('ADV-M1.3: Apostrophe heroes escaping and SQL parity (Azzen\'Ka, D\'Arcy, Eland\'orr, Kil\'Groth, Tel\'Annas, Y\'bneth)', () => {
    const initSqlPath = path.join(PROJECT_ROOT, 'server', 'init.sql');
    const sqlContent = fs.readFileSync(initSqlPath, 'utf-8');
    const apostropheNames = ["Azzen'Ka", "D'Arcy", "Eland'orr", "Kil'Groth", "Tel'Annas", "Y'bneth"];
    for (const name of apostropheNames) {
      const hero = CHARACTERS.find(h => h.name === name);
      assert(hero !== undefined, `Hero ${name} missing in JS`);
      const escaped = name.replace(/'/g, "''");
      assert(sqlContent.includes(`'${escaped}'`), `Hero ${name} improperly escaped in SQL`);
    }
  });

  runner.test('ADV-M1.4: Strict boundary limits on all 569 hotspot coordinates ([0, 100])', () => {
    for (const h of CHARACTERS) {
      assert(h.hotspots.length >= 4 && h.hotspots.length <= 6, `Hero ${h.name} hotspots out of range`);
      for (const hs of h.hotspots) {
        assert(hs.x >= 0 && hs.x <= 100, `Hotspot ${hs.id} x out of range: ${hs.x}`);
        assert(hs.y >= 0 && hs.y <= 100, `Hotspot ${hs.id} y out of range: ${hs.y}`);
        assert(hs.word.trim().length > 0, `Hotspot ${hs.id} empty word`);
        assert(/[\u0E00-\u0E7F]/.test(hs.mean), `Hotspot ${hs.id} missing Thai script`);
      }
    }
  });

  runner.test('ADV-M1.5: Bidirectional role compatibility for ROV filters', () => {
    const roles = ['Tank', 'Fighter', 'Warrior', 'Assassin', 'Mage', 'Carry', 'Marksman', 'Support'];
    for (const r of roles) {
      const count = CHARACTERS.filter(c => c.role.toLowerCase().includes(r.toLowerCase())).length;
      assert(count > 0, `Filter ${r} matched 0 heroes`);
    }
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

if (process.argv[1] && process.argv[1].endsWith('adversarial_m1_stress.js')) {
  const res = runM1AdversarialStressTest();
  if (res.failed > 0) process.exit(1);
}
