// tests/harness/contract.js
// Authoritative contracts and schema validators derived from ORIGINAL_REQUEST.md & PROJECT.md

export const STANDARD_ROV_ROLES = [
  'Carry',
  'Marksman',
  'Carry/Marksman',
  'Assassin',
  'Tank',
  'Warrior',
  'Mage',
  'Support',
];

export const VALID_HOTSPOT_CATEGORIES = [
  'Weapon',
  'Armor',
  'Attire',
  'Accessory',
  'Accessories',
  'Equipment',
  'Defense',
  'Magic',
  'Skill',
  'Magic/Skills',
];

export const DESIGN_TOKENS = {
  primaryColor: '#2563EB',
  surfaceColor: '#F8FAFC',
  mobileMaxWidth: 430,
  cardClasses: ['bg-white', 'rounded-2xl', 'shadow-sm'],
  statusColors: {
    success: 'emerald',
    warning: 'amber',
    alert: 'rose',
  },
  bottomNavTabs: ['home', 'heroes', 'practice', 'vocab', 'profile'],
};

export class ContractValidator {
  static validateCharacter(hero) {
    const errors = [];
    if (!hero || typeof hero !== 'object') {
      return { valid: false, errors: ['Hero must be a non-null object'] };
    }

    if (typeof hero.id !== 'number' || hero.id < 1 || hero.id > 111) {
      errors.push(`Hero id must be integer between 1 and 111, got ${hero.id}`);
    }

    if (!hero.name || typeof hero.name !== 'string' || hero.name.trim() === '') {
      errors.push(`Hero name must be a non-empty string, got ${hero.name}`);
    }

    if (!hero.role || !STANDARD_ROV_ROLES.some(r => hero.role.toLowerCase().includes(r.toLowerCase()))) {
      errors.push(`Hero role "${hero.role}" is not one of standardized roles (${STANDARD_ROV_ROLES.join(', ')})`);
    }

    if (!hero.img || !hero.img.startsWith('./characters/') || !hero.img.endsWith('.png')) {
      errors.push(`Hero img path "${hero.img}" does not follow ./characters/<Filename>.png format`);
    }

    if (!hero.color || typeof hero.color !== 'string') {
      errors.push(`Hero color theme must be defined, got ${hero.color}`);
    }

    if (!Array.isArray(hero.hotspots)) {
      errors.push(`Hero hotspots must be an array, got ${typeof hero.hotspots}`);
    } else {
      if (hero.hotspots.length < 4 || hero.hotspots.length > 6) {
        errors.push(`Hero ${hero.name} (id:${hero.id}) must have 4-6 hotspots, got ${hero.hotspots.length}`);
      }
      hero.hotspots.forEach((hs, idx) => {
        const hsResult = ContractValidator.validateHotspot(hs, hero.id, idx);
        if (!hsResult.valid) {
          errors.push(...hsResult.errors);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static validateHotspot(hs, charId = null, index = null) {
    const errors = [];
    if (!hs || typeof hs !== 'object') {
      return { valid: false, errors: ['Hotspot must be a non-null object'] };
    }

    if (charId !== null && typeof hs.id === 'number') {
      const expectedPrefix = charId * 100;
      if (hs.id < expectedPrefix || hs.id >= expectedPrefix + 100) {
        errors.push(`Hotspot id ${hs.id} does not match (charId * 100) convention for charId ${charId}`);
      }
    }

    if (typeof hs.x !== 'number' || hs.x < 0 || hs.x > 100) {
      errors.push(`Hotspot x coordinate must be between 0 and 100, got ${hs.x}`);
    }

    if (typeof hs.y !== 'number' || hs.y < 0 || hs.y > 100) {
      errors.push(`Hotspot y coordinate must be between 0 and 100, got ${hs.y}`);
    }

    if (!hs.word || typeof hs.word !== 'string' || hs.word.trim() === '') {
      errors.push(`Hotspot word must be a non-empty English string, got ${hs.word}`);
    }

    if (!hs.mean || typeof hs.mean !== 'string' || hs.mean.trim() === '') {
      errors.push(`Hotspot mean must be a non-empty Thai translation, got ${hs.mean}`);
    } else {
      // Check for at least one Thai unicode character (\u0E00 - \u0E7F)
      const hasThai = /[\u0E00-\u0E7F]/.test(hs.mean);
      if (!hasThai) {
        errors.push(`Hotspot mean "${hs.mean}" does not contain valid Thai characters`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static calculateProgression(xp) {
    const safeXp = Math.max(0, Number(xp) || 0);
    const level = Math.floor(safeXp / 100) + 1;
    const currentLevelXP = safeXp % 100;
    const progressPercent = currentLevelXP; // since level size is 100 XP
    const unlocked = {
      quiz: level >= 5,
      spelling: level >= 10,
      speaking: level >= 15,
      roleplay: level >= 20,
    };
    const title = level >= 20 ? 'Veteran' : 'Rookie';
    return {
      xp: safeXp,
      level,
      currentLevelXP,
      progressPercent,
      unlocked,
      title,
    };
  }
}
