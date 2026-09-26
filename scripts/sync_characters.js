// scripts/sync_characters.js - Automated Dataset Generator & Validator
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_HEROES } from './roster_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicCharactersDir = path.resolve(rootDir, 'public', 'characters');
const charactersJsPath = path.resolve(rootDir, 'src', 'data', 'characters.js');
const initSqlPath = path.resolve(rootDir, 'server', 'init.sql');

function validateDataset(heroes) {
  console.log(`\n=== 🔍 Starting 111-Hero Dataset Validation ===`);
  const errors = [];
  const warnings = [];

  // 1. Hero count check
  if (heroes.length !== 111) {
    errors.push(`Expected 111 heroes, found ${heroes.length}`);
  }

  // 2. Asset files check
  const existingFiles = new Set(
    fs.readdirSync(publicCharactersDir).filter(f => f.toLowerCase().endsWith('.png'))
  );
  console.log(`Discovered ${existingFiles.size} PNG files in ${publicCharactersDir}`);

  const validRoles = new Set([
    'Carry / Marksman',
    'Assassin',
    'Tank',
    'Warrior / Fighter',
    'Mage',
    'Support'
  ]);

  const heroIds = new Set();
  const hotspotIds = new Set();
  let totalHotspots = 0;

  heroes.forEach((hero, index) => {
    const expectedId = index + 1;
    if (hero.id !== expectedId) {
      errors.push(`Hero #${index + 1} (${hero.name}) has ID ${hero.id}, expected ${expectedId}`);
    }
    if (heroIds.has(hero.id)) {
      errors.push(`Duplicate hero ID: ${hero.id} (${hero.name})`);
    }
    heroIds.add(hero.id);

    if (!hero.name || typeof hero.name !== 'string') {
      errors.push(`Hero #${hero.id} has invalid name: ${hero.name}`);
    }

    if (!validRoles.has(hero.role)) {
      warnings.push(`Hero #${hero.id} (${hero.name}) has non-standard role: "${hero.role}"`);
    }

    if (!hero.color) {
      errors.push(`Hero #${hero.id} (${hero.name}) is missing color theme`);
    }

    if (!hero.img || !hero.img.startsWith('./characters/')) {
      errors.push(`Hero #${hero.id} (${hero.name}) has invalid image path format: "${hero.img}" (must start with './characters/')`);
    } else {
      const filename = hero.img.replace('./characters/', '');
      if (!existingFiles.has(filename)) {
        errors.push(`Hero #${hero.id} (${hero.name}) references non-existent image: "${filename}"`);
      }
    }

    // Hotspot validations
    if (!hero.hotspots || !Array.isArray(hero.hotspots)) {
      errors.push(`Hero #${hero.id} (${hero.name}) has missing or invalid hotspots array`);
      return;
    }

    if (hero.hotspots.length < 4 || hero.hotspots.length > 6) {
      errors.push(`Hero #${hero.id} (${hero.name}) has ${hero.hotspots.length} hotspots (must be between 4 and 6)`);
    }

    hero.hotspots.forEach((hs, hsIndex) => {
      totalHotspots++;
      if (hotspotIds.has(hs.id)) {
        errors.push(`Duplicate hotspot ID: ${hs.id} in hero #${hero.id} (${hero.name})`);
      }
      hotspotIds.add(hs.id);

      if (hs.character_id !== hero.id) {
        errors.push(`Hotspot #${hs.id} character_id (${hs.character_id}) does not match hero.id (${hero.id})`);
      }

      if (typeof hs.x !== 'number' || hs.x < 0 || hs.x > 100) {
        errors.push(`Hero #${hero.id} hotspot #${hs.id} has invalid x coordinate: ${hs.x}`);
      }

      if (typeof hs.y !== 'number' || hs.y < 0 || hs.y > 100) {
        errors.push(`Hero #${hero.id} hotspot #${hs.id} has invalid y coordinate: ${hs.y}`);
      }

      if (!hs.word || typeof hs.word !== 'string' || !hs.word.trim()) {
        errors.push(`Hero #${hero.id} hotspot #${hs.id} has empty word`);
      }

      if (!hs.mean || typeof hs.mean !== 'string' || !hs.mean.trim()) {
        errors.push(`Hero #${hero.id} hotspot #${hs.id} has empty Thai meaning`);
      }

      if (!hs.type || typeof hs.type !== 'string' || !hs.type.trim()) {
        errors.push(`Hero #${hero.id} hotspot #${hs.id} has empty type`);
      }
    });
  });

  console.log(`Total Heroes: ${heroes.length}`);
  console.log(`Total Hotspots: ${totalHotspots} (Avg ${(totalHotspots / heroes.length).toFixed(1)} per hero)`);

  if (warnings.length > 0) {
    console.warn(`⚠️ Warnings (${warnings.length}):`);
    warnings.slice(0, 10).forEach(w => console.warn(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.error(`❌ Validation Failed with ${errors.length} errors:`);
    errors.slice(0, 20).forEach(e => console.error(`  - ${e}`));
    throw new Error(`Dataset validation failed with ${errors.length} errors.`);
  }

  console.log(`✅ All validation checks passed successfully!`);
}

function escapeSql(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "''");
}

function generateCharactersJsContent(heroes) {
  const jsonStr = JSON.stringify(heroes, null, 2);
  return `// src/data/characters.js - Complete 111 ROV Heroes & Vocabulary Hotspots
// Authoritative dataset matching all 111 PNG assets in public/characters/

export const CHARACTERS = ${jsonStr};
`;
}

function generateInitSqlContent(heroes) {
  const charRows = heroes.map(h => {
    return `(${h.id}, '${escapeSql(h.name)}', '${escapeSql(h.role)}', '${escapeSql(h.img)}', '${escapeSql(h.color)}')`;
  }).join(',\n');

  const allHotspots = [];
  heroes.forEach(h => {
    h.hotspots.forEach(hs => {
      allHotspots.push(
        `(${hs.id}, ${hs.character_id}, ${hs.x.toFixed(2)}, ${hs.y.toFixed(2)}, '${escapeSql(hs.word)}', '${escapeSql(hs.mean)}', '${escapeSql(hs.type)}')`
      );
    });
  });
  const hsRows = allHotspots.join(',\n');

  return `-- =============================================
-- Engame Database - Full Schema + Seed Data (111 Heroes)
-- Authoritative UTF-8 Schema with Complete 111 Heroes & Hotspots
-- =============================================

CREATE DATABASE IF NOT EXISTS \`engame\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`engame\`;

-- ===== USERS =====
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(255) DEFAULT NULL,
  \`xp\` INT NOT NULL DEFAULT 0,
  \`rank\` VARCHAR(50) DEFAULT 'Bronze III',
  \`role\` ENUM('guest','admin') NOT NULL DEFAULT 'guest',
  \`is_blocked\` TINYINT(1) NOT NULL DEFAULT 0,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== CHARACTERS =====
CREATE TABLE IF NOT EXISTS \`characters\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(50) NOT NULL,
  \`role\` VARCHAR(50) NOT NULL,
  \`img\` VARCHAR(255) NOT NULL,
  \`color\` VARCHAR(20) DEFAULT 'blue'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== HOTSPOTS (vocab words on characters) =====
CREATE TABLE IF NOT EXISTS \`hotspots\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`character_id\` INT NOT NULL,
  \`x\` DECIMAL(5,2) NOT NULL,
  \`y\` DECIMAL(5,2) NOT NULL,
  \`word\` VARCHAR(100) NOT NULL,
  \`mean\` VARCHAR(100) NOT NULL,
  \`type\` VARCHAR(50) NOT NULL,
  FOREIGN KEY (\`character_id\`) REFERENCES \`characters\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== USER_VOCAB (saved words per user) =====
CREATE TABLE IF NOT EXISTS \`user_vocab\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`hotspot_id\` INT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`hotspot_id\`) REFERENCES \`hotspots\`(\`id\`) ON DELETE CASCADE,
  UNIQUE KEY \`unique_user_hotspot\` (\`user_id\`, \`hotspot_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== ACTIVITY_LOGS =====
CREATE TABLE IF NOT EXISTS \`activity_logs\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`action\` VARCHAR(50) NOT NULL COMMENT 'login, logout, view_character, play_game, etc.',
  \`details\` VARCHAR(255) DEFAULT NULL,
  \`ip_address\` VARCHAR(45) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- SEED DATA
-- =============================================

-- Clear existing data if resetting
DELETE FROM \`hotspots\`;
DELETE FROM \`characters\`;
DELETE FROM \`users\`;

-- Users (password = bcrypt hash of "123")
INSERT INTO \`users\` (\`username\`, \`password\`, \`name\`, \`email\`, \`xp\`, \`rank\`, \`role\`, \`is_blocked\`) VALUES
('player', '$2a$10$xVqYLGEMC6oNExkQPL.dEurZIxnSfS3MkOYBwcFhR7ND1hVr4XZ4y', 'Player 1', 'player@engame.local', 0, 'Silver II', 'guest', 0),
('admin', '$2a$10$xVqYLGEMC6oNExkQPL.dEurZIxnSfS3MkOYBwcFhR7ND1hVr4XZ4y', 'Admin GM', 'admin@engame.local', 99999, 'Conqueror', 'admin', 0);

-- Characters (111 ROV Heroes)
INSERT INTO \`characters\` (\`id\`, \`name\`, \`role\`, \`img\`, \`color\`) VALUES
${charRows};

-- Hotspots (${allHotspots.length} Vocabulary Words)
INSERT INTO \`hotspots\` (\`id\`, \`character_id\`, \`x\`, \`y\`, \`word\`, \`mean\`, \`type\`) VALUES
${hsRows};
`;
}

export function syncCharacters() {
  validateDataset(ALL_HEROES);

  console.log(`\nWriting ${charactersJsPath}...`);
  const jsContent = generateCharactersJsContent(ALL_HEROES);
  fs.writeFileSync(charactersJsPath, jsContent, 'utf8');
  console.log(`✅ Successfully updated ${charactersJsPath} (${(Buffer.byteLength(jsContent, 'utf8') / 1024).toFixed(1)} KB)`);

  console.log(`\nWriting ${initSqlPath}...`);
  const sqlContent = generateInitSqlContent(ALL_HEROES);
  fs.writeFileSync(initSqlPath, sqlContent, 'utf8');
  console.log(`✅ Successfully updated ${initSqlPath} (${(Buffer.byteLength(sqlContent, 'utf8') / 1024).toFixed(1)} KB)`);

  return {
    heroCount: ALL_HEROES.length,
    hotspotCount: ALL_HEROES.reduce((sum, h) => sum + h.hotspots.length, 0),
  };
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('sync_characters.js')) {
  try {
    const res = syncCharacters();
    console.log(`\n🎉 Synchronization Complete! 111 Heroes and ${res.hotspotCount} Hotspots synchronized.`);
  } catch (err) {
    console.error(`💥 Synchronization Error:`, err);
    process.exit(1);
  }
}
