// scripts/roster_data.js - Master Hero Dataset (111 heroes)
import { rosterPart1 } from './roster_part1.js';
import { rosterPart2 } from './roster_part2.js';
import { rosterPart3 } from './roster_part3.js';

export const ALL_HEROES = [
  ...rosterPart1,
  ...rosterPart2,
  ...rosterPart3
];
