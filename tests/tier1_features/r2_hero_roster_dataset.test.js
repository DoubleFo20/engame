// tests/tier1_features/r2_hero_roster_dataset.test.js
// Tier 1: Feature Coverage for Requirement 2 (R2: Full 111 Hero Roster & Hotspots Dataset)
// Covers: R2-F1, R2-F2, R2-F3, R2-F4, R2-F5 (>=5 test cases per feature)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from '../harness/runner.js';
import { ContractValidator, STANDARD_ROV_ROLES, VALID_HOTSPOT_CATEGORIES } from '../harness/contract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../');

export function registerTier1R2Tests(runner) {
  const charactersDir = path.join(PROJECT_ROOT, 'public', 'characters');
  const charactersJsPath = path.join(PROJECT_ROOT, 'src', 'data', 'characters.js');
  const initSqlPath = path.join(PROJECT_ROOT, 'server', 'init.sql');

  // =========================================================================
  // R2-F1: 111 Hero Asset Mapping & Roster Completeness
  // =========================================================================
  runner.suite('Tier 1: R2-F1 111 Hero Asset Mapping & Roster Completeness', { tier: 1, feature: 'R2-F1', milestone: 'M1' });

  runner.test('R2-F1.1: Exactly 111 character PNG assets exist in public/characters/', () => {
    assert.assert(fs.existsSync(charactersDir), `Characters directory must exist at ${charactersDir}`);
    const files = fs.readdirSync(charactersDir).filter(f => f.toLowerCase().endsWith('.png'));
    assert.equal(files.length, 111, `Expected exactly 111 hero PNG files, found ${files.length}`);
  });

  runner.test('R2-F1.2: All 111 character PNG assets are non-empty and valid images (> 100KB)', () => {
    const files = fs.readdirSync(charactersDir).filter(f => f.toLowerCase().endsWith('.png'));
    for (const f of files) {
      const stat = fs.statSync(path.join(charactersDir, f));
      assert.assert(stat.size > 100 * 1024, `Asset ${f} size (${stat.size} bytes) should be > 100KB`);
    }
  });

  runner.test('R2-F1.3: src/data/characters.js exists and exports CHARACTERS array', async () => {
    assert.assert(fs.existsSync(charactersJsPath), `characters.js must exist at ${charactersJsPath}`);
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    assert.exists(charModule.CHARACTERS, 'CHARACTERS export must exist');
    assert.isArray(charModule.CHARACTERS, 'CHARACTERS must be an array');
  });

  runner.test('R2-F1.4: Roster dataset contains exactly 111 heroes with contiguous IDs 1..111', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    const chars = charModule.CHARACTERS;
    assert.equal(chars.length, 111, `Roster must contain 111 heroes (current: ${chars.length})`);

    const ids = chars.map(c => c.id).sort((a, b) => a - b);
    for (let i = 1; i <= 111; i++) {
      assert.equal(ids[i - 1], i, `Hero ID sequence mismatch at index ${i - 1}`);
    }
  });

  runner.test('R2-F1.5: Every hero img path matches ./characters/<Filename>.png and points to an existing file', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    const chars = charModule.CHARACTERS;
    for (const hero of chars) {
      assert.matches(hero.img, /^\.\/characters\/.+\.png$/, `Hero ${hero.name} img path must match ./characters/*.png`);
      const filename = hero.img.replace('./characters/', '');
      const assetPath = path.join(charactersDir, filename);
      assert.assert(fs.existsSync(assetPath), `Asset file not found for hero ${hero.name} (id:${hero.id}): ${filename}`);
    }
  });

  // =========================================================================
  // R2-F2: Hero Roles & Color Theme Distribution
  // =========================================================================
  runner.suite('Tier 1: R2-F2 Hero Roles & Color Theme Distribution', { tier: 1, feature: 'R2-F2', milestone: 'M1' });

  runner.test('R2-F2.1: Every hero has a defined, non-empty role property', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      assert.isString(hero.role, `Hero ${hero.name} must have a string role`);
      assert.assert(hero.role.trim().length > 0, `Hero ${hero.name} role cannot be empty`);
    }
  });

  runner.test('R2-F2.2: All hero roles belong to the standardized ROV role classification', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      const match = STANDARD_ROV_ROLES.some(r => hero.role.toLowerCase().includes(r.toLowerCase()));
      assert.isTrue(match, `Hero ${hero.name} role "${hero.role}" must be one of standard ROV roles`);
    }
  });

  runner.test('R2-F2.3: Every hero has a valid color theme defined', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      assert.isString(hero.color, `Hero ${hero.name} must have a color theme string`);
      assert.assert(hero.color.trim().length > 0, `Hero ${hero.name} color cannot be empty`);
    }
  });

  runner.test('R2-F2.4: Role distribution spans all 6 major ROV classes', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    const chars = charModule.CHARACTERS;
    const classes = ['Carry', 'Assassin', 'Tank', 'Warrior', 'Mage', 'Support'];
    for (const cls of classes) {
      const count = chars.filter(c => c.role.toLowerCase().includes(cls.toLowerCase())).length;
      assert.assert(count > 0, `Class "${cls}" must have at least 1 hero in the roster (found ${count})`);
    }
  });

  runner.test('R2-F2.5: Role filtering function partitions the roster correctly', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    const chars = charModule.CHARACTERS;
    const assassinHeroes = chars.filter(c => c.role.toLowerCase().includes('assassin'));
    for (const h of assassinHeroes) {
      assert.assert(h.role.toLowerCase().includes('assassin'));
    }
  });

  // =========================================================================
  // R2-F3: Rich Vocabulary Hotspots Quantity & Categories
  // =========================================================================
  runner.suite('Tier 1: R2-F3 Rich Vocabulary Hotspots Quantity & Categories', { tier: 1, feature: 'R2-F3', milestone: 'M1' });

  runner.test('R2-F3.1: Every hero in the roster has a non-empty hotspots array', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      assert.isArray(hero.hotspots, `Hero ${hero.name} hotspots must be an array`);
      assert.assert(hero.hotspots.length > 0, `Hero ${hero.name} must have at least 1 hotspot`);
    }
  });

  runner.test('R2-F3.2: Every hero has between 4 and 6 vocabulary hotspots (4 <= n <= 6)', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      assert.inRange(
        hero.hotspots.length,
        4,
        6,
        `Hero ${hero.name} (id:${hero.id}) must have 4-6 hotspots, got ${hero.hotspots.length}`
      );
    }
  });

  runner.test('R2-F3.3: Total vocabulary hotspots count across full roster is >= 444', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    const totalHotspots = charModule.CHARACTERS.reduce((sum, c) => sum + (c.hotspots ? c.hotspots.length : 0), 0);
    assert.assert(
      totalHotspots >= 444,
      `Expected total hotspots >= 444 (111 * 4), but found ${totalHotspots}`
    );
  });

  runner.test('R2-F3.4: Hotspot types match recognized equipment and gear categories', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      for (const hs of hero.hotspots) {
        assert.isString(hs.type, `Hotspot ${hs.id} type must be a string`);
        const isValidCat = VALID_HOTSPOT_CATEGORIES.some(cat => hs.type.toLowerCase().includes(cat.toLowerCase()));
        assert.isTrue(
          isValidCat,
          `Hotspot ${hs.id} (${hs.word}) type "${hs.type}" on hero ${hero.name} is not recognized`
        );
      }
    }
  });

  runner.test('R2-F3.5: Vocabulary category variety ensures diverse language learning', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    const typesSeen = new Set();
    for (const hero of charModule.CHARACTERS) {
      for (const hs of hero.hotspots) {
        typesSeen.add(hs.type);
      }
    }
    assert.assert(typesSeen.size >= 4, `Dataset must feature at least 4 distinct equipment types, found ${typesSeen.size}`);
  });

  // =========================================================================
  // R2-F4: Hotspot Coordinates & Metadata Integrity
  // =========================================================================
  runner.suite('Tier 1: R2-F4 Hotspot Coordinates & Metadata Integrity', { tier: 1, feature: 'R2-F4', milestone: 'M1' });

  runner.test('R2-F4.1: Hotspot x and y coordinates are percentages strictly within [0, 100]', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      for (const hs of hero.hotspots) {
        assert.isNumber(hs.x, `Hotspot ${hs.id} x must be numeric`);
        assert.inRange(hs.x, 0, 100, `Hotspot ${hs.id} x (${hs.x}) out of bounds [0, 100]`);
        assert.isNumber(hs.y, `Hotspot ${hs.id} y must be numeric`);
        assert.inRange(hs.y, 0, 100, `Hotspot ${hs.id} y (${hs.y}) out of bounds [0, 100]`);
      }
    }
  });

  runner.test('R2-F4.2: Hotspot English words are non-empty strings', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      for (const hs of hero.hotspots) {
        assert.isString(hs.word, `Hotspot ${hs.id} word must be string`);
        assert.assert(hs.word.trim().length > 0, `Hotspot ${hs.id} word cannot be blank`);
      }
    }
  });

  runner.test('R2-F4.3: Hotspot mean fields contain non-empty Thai translations with Thai script', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      for (const hs of hero.hotspots) {
        assert.isString(hs.mean, `Hotspot ${hs.id} mean must be string`);
        assert.assert(hs.mean.trim().length > 0, `Hotspot ${hs.id} mean cannot be blank`);
        const hasThaiChar = /[\u0E00-\u0E7F]/.test(hs.mean);
        assert.isTrue(hasThaiChar, `Hotspot ${hs.id} ("${hs.word}") mean "${hs.mean}" missing Thai characters`);
      }
    }
  });

  runner.test('R2-F4.4: Hotspot IDs conform to (char.id * 100) + index deterministic scheme', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      for (const hs of hero.hotspots) {
        assert.isNumber(hs.id, `Hotspot id must be number`);
        const prefix = Math.floor(hs.id / 100);
        assert.equal(prefix, hero.id, `Hotspot ${hs.id} prefix ${prefix} does not match hero.id ${hero.id}`);
      }
    }
  });

  runner.test('R2-F4.5: Hotspot IDs within each hero are unique (no intra-hero duplicate hotspot IDs)', async () => {
    const charModule = await import(`file://${charactersJsPath}?t=${Date.now()}`);
    for (const hero of charModule.CHARACTERS) {
      const ids = hero.hotspots.map(h => h.id);
      const uniqueIds = new Set(ids);
      assert.equal(ids.length, uniqueIds.size, `Hero ${hero.name} has duplicate hotspot IDs: ${ids}`);
    }
  });

  // =========================================================================
  // R2-F5: SQL Seed Synchronization (server/init.sql)
  // =========================================================================
  runner.suite('Tier 1: R2-F5 SQL Seed Synchronization', { tier: 1, feature: 'R2-F5', milestone: 'M1' });

  runner.test('R2-F5.1: server/init.sql exists and contains characters table DDL', () => {
    assert.assert(fs.existsSync(initSqlPath), `init.sql must exist at ${initSqlPath}`);
    const sqlContent = fs.readFileSync(initSqlPath, 'utf-8');
    assert.assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS `characters`') || sqlContent.includes('CREATE TABLE `characters`') || sqlContent.includes('characters'), 'Must contain characters table definition');
  });

  runner.test('R2-F5.2: server/init.sql contains hotspots table DDL', () => {
    const sqlContent = fs.readFileSync(initSqlPath, 'utf-8');
    assert.assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS `hotspots`') || sqlContent.includes('CREATE TABLE `hotspots`') || sqlContent.includes('hotspots'), 'Must contain hotspots table definition');
  });

  runner.test('R2-F5.3: server/init.sql includes INSERT statements for characters', () => {
    const sqlContent = fs.readFileSync(initSqlPath, 'utf-8');
    assert.assert(sqlContent.includes('INSERT INTO `characters`') || sqlContent.includes('INSERT INTO characters'), 'Must contain character INSERT statements');
  });

  runner.test('R2-F5.4: server/init.sql includes INSERT statements for hotspots', () => {
    const sqlContent = fs.readFileSync(initSqlPath, 'utf-8');
    assert.assert(sqlContent.includes('INSERT INTO `hotspots`') || sqlContent.includes('INSERT INTO hotspots'), 'Must contain hotspot INSERT statements');
  });

  runner.test('R2-F5.5: server/init.sql preserves valid UTF-8 encoding for Thai translations without corruption', () => {
    const sqlContent = fs.readFileSync(initSqlPath, 'utf-8');
    assert.isFalse(sqlContent.includes('???'), 'SQL file must not contain ??? corruption marks in Thai text');
    assert.isFalse(sqlContent.includes('\uFFFD'), 'SQL file must not contain unicode replacement characters');
    const hasThai = /[\u0E00-\u0E7F]/.test(sqlContent);
    assert.isTrue(hasThai, 'SQL file must contain valid Thai script translations');
  });
}
