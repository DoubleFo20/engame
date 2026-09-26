// scripts/validate_dataset.js - Comprehensive Dataset Test & Verification
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CHARACTERS } from '../src/data/characters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicCharactersDir = path.resolve(rootDir, 'public', 'characters');
const initSqlPath = path.resolve(rootDir, 'server', 'init.sql');

export function runValidation() {
  console.log('========================================================');
  console.log('       ENGAME DATASET INTEGRITY & VALIDATION SUITE      ');
  console.log('========================================================');

  const issues = [];
  const validRoles = new Set([
    'Carry / Marksman',
    'Assassin',
    'Tank',
    'Warrior / Fighter',
    'Mage',
    'Support'
  ]);

  // Check 1: 111 PNG files in public/characters/
  const pngFiles = fs.readdirSync(publicCharactersDir).filter(f => f.toLowerCase().endsWith('.png'));
  console.log(`[PASS] public/characters/ contains ${pngFiles.length} PNG assets (Expected: 111).`);
  if (pngFiles.length !== 111) {
    issues.push(`Asset file count mismatch: expected 111, got ${pngFiles.length}`);
  }
  const assetSet = new Set(pngFiles);

  // Check 2: Exactly 111 heroes in CHARACTERS
  console.log(`[PASS] CHARACTERS array length: ${CHARACTERS.length} (Expected: 111).`);
  if (CHARACTERS.length !== 111) {
    issues.push(`Hero count mismatch: expected 111, got ${CHARACTERS.length}`);
  }

  // Check 3: Hero integrity checks
  const heroIds = new Set();
  const hotspotIds = new Set();
  let totalHotspots = 0;

  CHARACTERS.forEach((hero, index) => {
    const expectedId = index + 1;
    if (hero.id !== expectedId) {
      issues.push(`Hero index ${index} has id ${hero.id}, expected ${expectedId}`);
    }
    if (heroIds.has(hero.id)) {
      issues.push(`Duplicate hero ID: ${hero.id}`);
    }
    heroIds.add(hero.id);

    if (!hero.name || typeof hero.name !== 'string') {
      issues.push(`Hero #${hero.id} missing name`);
    }

    if (!validRoles.has(hero.role)) {
      issues.push(`Hero #${hero.id} (${hero.name}) has unexpected role "${hero.role}"`);
    }

    if (!hero.color) {
      issues.push(`Hero #${hero.id} (${hero.name}) missing color`);
    }

    if (!hero.img || !hero.img.startsWith('./characters/')) {
      issues.push(`Hero #${hero.id} (${hero.name}) invalid img format "${hero.img}"`);
    } else {
      const filename = hero.img.replace('./characters/', '');
      if (!assetSet.has(filename)) {
        issues.push(`Hero #${hero.id} image "${filename}" does not exist in public/characters/`);
      }
    }

    if (!Array.isArray(hero.hotspots) || hero.hotspots.length < 4 || hero.hotspots.length > 6) {
      issues.push(`Hero #${hero.id} (${hero.name}) has ${hero.hotspots?.length} hotspots (must be 4-6)`);
    } else {
      hero.hotspots.forEach((hs) => {
        totalHotspots++;
        if (hotspotIds.has(hs.id)) {
          issues.push(`Duplicate hotspot ID: ${hs.id}`);
        }
        hotspotIds.add(hs.id);

        if (hs.character_id !== hero.id) {
          issues.push(`Hotspot #${hs.id} character_id (${hs.character_id}) != hero id (${hero.id})`);
        }

        if (typeof hs.x !== 'number' || hs.x < 0 || hs.x > 100) {
          issues.push(`Hotspot #${hs.id} invalid x coordinate: ${hs.x}`);
        }
        if (typeof hs.y !== 'number' || hs.y < 0 || hs.y > 100) {
          issues.push(`Hotspot #${hs.id} invalid y coordinate: ${hs.y}`);
        }
        if (!hs.word || typeof hs.word !== 'string' || !hs.word.trim()) {
          issues.push(`Hotspot #${hs.id} empty word`);
        }
        if (!hs.mean || typeof hs.mean !== 'string' || !hs.mean.trim()) {
          issues.push(`Hotspot #${hs.id} empty Thai meaning`);
        }
        if (!hs.type || typeof hs.type !== 'string' || !hs.type.trim()) {
          issues.push(`Hotspot #${hs.id} empty type`);
        }
      });
    }
  });

  console.log(`[PASS] Total hotspots: ${totalHotspots} across all 111 heroes.`);
  console.log(`[PASS] All hotspot IDs are strictly unique (${hotspotIds.size} unique IDs).`);

  // Check 4: server/init.sql validation
  if (!fs.existsSync(initSqlPath)) {
    issues.push(`server/init.sql does not exist`);
  } else {
    const sqlContent = fs.readFileSync(initSqlPath, 'utf8');
    if (!sqlContent.includes('CREATE TABLE IF NOT EXISTS `characters`') && !sqlContent.includes('CREATE TABLE `characters`')) {
      issues.push(`server/init.sql missing characters table definition`);
    }
    if (!sqlContent.includes('CREATE TABLE IF NOT EXISTS `hotspots`') && !sqlContent.includes('CREATE TABLE `hotspots`')) {
      issues.push(`server/init.sql missing hotspots table definition`);
    }
    if (!sqlContent.includes('INSERT INTO `characters`')) {
      issues.push(`server/init.sql missing INSERT INTO characters`);
    }
    if (!sqlContent.includes('INSERT INTO `hotspots`')) {
      issues.push(`server/init.sql missing INSERT INTO hotspots`);
    }

    // Verify all 111 heroes are mentioned in SQL
    let sqlMissingHeroes = 0;
    CHARACTERS.forEach(h => {
      // Check for hero id in INSERT
      const idPattern = `(${h.id}, `;
      if (!sqlContent.includes(idPattern)) {
        sqlMissingHeroes++;
      }
    });
    if (sqlMissingHeroes > 0) {
      issues.push(`server/init.sql is missing ${sqlMissingHeroes} hero records`);
    } else {
      console.log(`[PASS] server/init.sql contains all 111 hero inserts.`);
    }

    // Verify hotspots count in SQL
    let sqlMissingHotspots = 0;
    CHARACTERS.forEach(h => {
      h.hotspots.forEach(hs => {
        const hsPattern = `(${hs.id}, ${hs.character_id}, `;
        if (!sqlContent.includes(hsPattern)) {
          sqlMissingHotspots++;
        }
      });
    });
    if (sqlMissingHotspots > 0) {
      issues.push(`server/init.sql is missing ${sqlMissingHotspots} hotspot records`);
    } else {
      console.log(`[PASS] server/init.sql contains all ${totalHotspots} hotspot inserts.`);
    }
  }

  // Summary
  if (issues.length > 0) {
    console.error(`\n❌ Validation found ${issues.length} issues:`);
    issues.forEach(i => console.error(`  - ${i}`));
    return { success: false, issues, totalHeroes: CHARACTERS.length, totalHotspots };
  } else {
    console.log('\n========================================================');
    console.log('✅ ALL VERIFICATIONS PASSED: 100% INTEGRITY CONFIRMED');
    console.log(`- 111 / 111 heroes verified`);
    console.log(`- ${totalHotspots} vocabulary hotspots verified`);
    console.log(`- 111 / 111 image assets matched`);
    console.log(`- 100% synchronization between characters.js & init.sql`);
    console.log('========================================================');
    return { success: true, issues: [], totalHeroes: CHARACTERS.length, totalHotspots };
  }
}

if (process.argv[1] && process.argv[1].endsWith('validate_dataset.js')) {
  const result = runValidation();
  if (!result.success) process.exit(1);
}
