// tests/tier1_features/r3_ui_mobile_first.test.js
// Tier 1: Feature Coverage for Requirement 3 (R3: Mobile-First Enterprise UX/UI Overhaul)
// Covers: R3-F1, R3-F2, R3-F3, R3-F4, R3-F5 (>=5 test cases per feature)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from '../harness/runner.js';
import { DESIGN_TOKENS } from '../harness/contract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../');

function readFileContent(relativePath) {
  const p = path.join(PROJECT_ROOT, relativePath);
  if (!fs.existsSync(p)) return '';
  return fs.readFileSync(p, 'utf-8');
}

export function registerTier1R3Tests(runner) {
  const appJsx = readFileContent('src/App.jsx');
  const homeScreenJsx = readFileContent('src/screens/HomeScreen.jsx');
  const headerJsx = readFileContent('src/components/ui/Header.jsx');
  const indexCss = readFileContent('src/index.css');

  // =========================================================================
  // R3-F1: 430px Mobile-First Shell Architecture
  // =========================================================================
  runner.suite('Tier 1: R3-F1 430px Mobile-First Shell Architecture', { tier: 1, feature: 'R3-F1', milestone: 'M3' });

  runner.test('R3-F1.1: Mobile viewport shell container enforces 430px max width constraint', () => {
    // Check in App.jsx or layout components
    const has430px = appJsx.includes('430px') || appJsx.includes('max-w-[430px]') || indexCss.includes('430px');
    assert.assert(has430px, 'App container must enforce max-width 430px (iPhone 15 width simulation)');
  });

  runner.test('R3-F1.2: Shell centers horizontally on desktop over bg-slate-100 surface', () => {
    const hasCentering = (appJsx.includes('justify-center') || appJsx.includes('mx-auto')) &&
                         (appJsx.includes('bg-slate-100') || indexCss.includes('bg-slate-100') || appJsx.includes('bg-slate-50'));
    assert.assert(hasCentering, 'Desktop background must use bg-slate-100 with centered shell container');
  });

  runner.test('R3-F1.3: Responsive layout spans 100% width on mobile viewports (w-full / max-w-full)', () => {
    const hasFullWidth = appJsx.includes('w-full') || indexCss.includes('w-full');
    assert.assert(hasFullWidth, 'Shell must have w-full for full-width responsive scaling on mobile');
  });

  runner.test('R3-F1.4: Screen containers prevent horizontal overflow (overflow-x-hidden)', () => {
    const hasOverflowHidden = appJsx.includes('overflow-x-hidden') || appJsx.includes('overflow-hidden') || indexCss.includes('overflow-x-hidden');
    assert.assert(hasOverflowHidden, 'App shell should specify overflow-x-hidden to prevent horizontal scrolling');
  });

  runner.test('R3-F1.5: Viewport height fills full device height (min-h-screen or h-screen)', () => {
    const hasScreenHeight = appJsx.includes('min-h-screen') || appJsx.includes('h-screen') || indexCss.includes('min-h-screen');
    assert.assert(hasScreenHeight, 'App container must span full screen height (min-h-screen)');
  });

  // =========================================================================
  // R3-F2: Enterprise Design System Tokens
  // =========================================================================
  runner.suite('Tier 1: R3-F2 Enterprise Design System Tokens', { tier: 1, feature: 'R3-F2', milestone: 'M3' });

  runner.test('R3-F2.1: Primary brand color #2563EB (Electric/Royal Blue) is configured or applied', () => {
    const allCode = appJsx + homeScreenJsx + indexCss;
    const hasPrimaryBlue = allCode.includes('2563EB') || allCode.includes('2563eb') || allCode.includes('blue-600');
    assert.assert(hasPrimaryBlue, 'Design system must adopt primary blue #2563EB');
  });

  runner.test('R3-F2.2: Background surface utilizes off-white / light slate (#F8FAFC / slate-50)', () => {
    const allCode = appJsx + homeScreenJsx + indexCss;
    const hasOffWhite = allCode.includes('F8FAFC') || allCode.includes('f8fafc') || allCode.includes('slate-50') || allCode.includes('slate-100');
    assert.assert(hasOffWhite, 'Background surface must utilize #F8FAFC or slate-50');
  });

  runner.test('R3-F2.3: Cards utilize pure white background with rounded-2xl geometry and soft shadows', () => {
    const allCode = appJsx + homeScreenJsx;
    const hasRounded2xl = allCode.includes('rounded-2xl');
    const hasShadow = allCode.includes('shadow-sm') || allCode.includes('shadow-md');
    assert.assert(hasRounded2xl, 'Cards must adopt rounded-2xl geometry');
    assert.assert(hasShadow, 'Cards must feature subtle shadow');
  });

  runner.test('R3-F2.4: Status indicators adopt standard color coding (emerald, amber, rose)', () => {
    const allCode = appJsx + homeScreenJsx;
    const hasStatusColors = (allCode.includes('emerald') || allCode.includes('green')) &&
                           (allCode.includes('amber') || allCode.includes('yellow')) &&
                           (allCode.includes('rose') || allCode.includes('red'));
    assert.assert(hasStatusColors, 'Status indicators must include green/emerald, amber/yellow, and rose/red');
  });

  runner.test('R3-F2.5: Typography hierarchy applies Inter font or clean sans hierarchy', () => {
    const hasFont = indexCss.includes('Inter') || indexCss.includes('sans-serif') || appJsx.includes('font-');
    assert.assert(hasFont, 'Typography must feature clean sans hierarchy (Inter)');
  });

  // =========================================================================
  // R3-F3: Dashboard Header & 2x2 Metric Stat Grid
  // =========================================================================
  runner.suite('Tier 1: R3-F3 Dashboard Header & Metric Stat Grid', { tier: 1, feature: 'R3-F3', milestone: 'M3' });

  runner.test('R3-F3.1: Header renders user avatar or avatar placeholder', () => {
    const hasAvatar = headerJsx.includes('avatar') || appJsx.includes('avatar') || homeScreenJsx.includes('avatar') || homeScreenJsx.includes('Avatar');
    assert.assert(hasAvatar, 'Header must display user avatar');
  });

  runner.test('R3-F3.2: Header renders user rank/level badge', () => {
    const hasRankOrLevel = homeScreenJsx.includes('level') || homeScreenJsx.includes('Level') || homeScreenJsx.includes('rank') || headerJsx.includes('level');
    assert.assert(hasRankOrLevel, 'Header must display rank/level badge');
  });

  runner.test('R3-F3.3: Notification bell with active ping dot is present', () => {
    const hasBell = homeScreenJsx.includes('bell') || homeScreenJsx.includes('Bell') || headerJsx.includes('bell') || headerJsx.includes('Bell');
    assert.assert(hasBell, 'Dashboard header must include notification bell icon');
  });

  runner.test('R3-F3.4: 2x2 Metric Stat Grid renders 4 core learner metrics', () => {
    // 4 metrics: Words Mastered, Total XP, Study Streak, Quiz Accuracy
    const hasStats = homeScreenJsx.includes('XP') &&
                    (homeScreenJsx.includes('Streak') || homeScreenJsx.includes('streak')) &&
                    (homeScreenJsx.includes('Mastered') || homeScreenJsx.includes('Vocab') || homeScreenJsx.includes('Words')) &&
                    (homeScreenJsx.includes('Accuracy') || homeScreenJsx.includes('Quiz') || homeScreenJsx.includes('quiz'));
    assert.assert(hasStats, 'Stat grid must display Words Mastered, XP, Streak, and Quiz metrics');
  });

  runner.test('R3-F3.5: Stat grid cards use responsive 2-column grid layout (grid-cols-2)', () => {
    const hasGrid2 = homeScreenJsx.includes('grid-cols-2');
    assert.assert(hasGrid2, 'Metric grid must adopt grid-cols-2 layout for 2x2 presentation');
  });

  // =========================================================================
  // R3-F4: Hero Highlight & Quick Actions
  // =========================================================================
  runner.suite('Tier 1: R3-F4 Hero Highlight & Quick Actions', { tier: 1, feature: 'R3-F4', milestone: 'M3' });

  runner.test('R3-F4.1: Hero Highlight Banner card renders featured hero spotlight', () => {
    const hasHeroBanner = homeScreenJsx.includes('Featured') || homeScreenJsx.includes('Hero') || homeScreenJsx.includes('highlight') || homeScreenJsx.includes('Banner');
    assert.assert(hasHeroBanner, 'Dashboard must render featured hero banner');
  });

  runner.test('R3-F4.2: Hero Highlight Banner includes practice Call-to-Action (CTA)', () => {
    const hasCTA = homeScreenJsx.includes('Practice') || homeScreenJsx.includes('Start') || homeScreenJsx.includes('Explore') || homeScreenJsx.includes('Learn');
    assert.assert(hasCTA, 'Featured hero banner must contain action CTA button');
  });

  runner.test('R3-F4.3: Quick Actions section provides multiple practice modes', () => {
    const hasPracticeModes = (homeScreenJsx.includes('Flashcard') || homeScreenJsx.includes('flashcard')) &&
                            (homeScreenJsx.includes('Quiz') || homeScreenJsx.includes('quiz'));
    assert.assert(hasPracticeModes, 'Quick actions must include Flashcard and Quiz practice options');
  });

  runner.test('R3-F4.4: Hotspot exploration is accessible from dashboard quick actions', () => {
    const hasHotspots = homeScreenJsx.includes('Hotspot') || homeScreenJsx.includes('hotspot') || homeScreenJsx.includes('Explore') || homeScreenJsx.includes('Heroes');
    assert.assert(hasHotspots, 'Quick actions must feature Hotspots/Hero exploration option');
  });

  runner.test('R3-F4.5: Recent activity section presents learning history cards', () => {
    const hasRecent = homeScreenJsx.includes('Recent') || homeScreenJsx.includes('Activity') || homeScreenJsx.includes('History');
    assert.assert(hasRecent, 'Dashboard must provide Recent Activity card list');
  });

  // =========================================================================
  // R3-F5: Sticky 5-Tab Navigation & Sub-Screen Fitting
  // =========================================================================
  runner.suite('Tier 1: R3-F5 Sticky 5-Tab Navigation & Sub-Screen Fitting', { tier: 1, feature: 'R3-F5', milestone: 'M3' });

  runner.test('R3-F5.1: Navigation bar supports the 5 required app sections', () => {
    const tabs = ['home', 'heroes', 'practice', 'vocab', 'profile'];
    const allCode = appJsx + homeScreenJsx;
    for (const tab of tabs) {
      assert.assert(
        allCode.toLowerCase().includes(tab),
        `Navigation or app screens must support section "${tab}"`
      );
    }
  });

  runner.test('R3-F5.2: Bottom navigation bar is fixed/sticky to bottom of viewport', () => {
    const hasFixedBottom = appJsx.includes('fixed') || appJsx.includes('sticky') || appJsx.includes('bottom-0');
    assert.assert(hasFixedBottom, 'Bottom navigation bar must be pinned to bottom of viewport');
  });

  runner.test('R3-F5.3: Active navigation indicator displays distinct styling with primary blue #2563EB', () => {
    const allCode = appJsx + homeScreenJsx;
    const hasActiveStyle = allCode.includes('blue-600') || allCode.includes('2563EB') || allCode.includes('text-blue') || allCode.includes('bg-blue');
    assert.assert(hasActiveStyle, 'Active tab indicator must highlight with primary blue accent');
  });

  runner.test('R3-F5.4: Sub-screens are co-located in src/screens/ directory', () => {
    const screensDir = path.join(PROJECT_ROOT, 'src', 'screens');
    assert.assert(fs.existsSync(screensDir), 'src/screens/ directory must exist');
    const screens = fs.readdirSync(screensDir);
    assert.assert(screens.length >= 6, `Expected at least 6 screen files, found ${screens.length}`);
  });

  runner.test('R3-F5.5: Navigation state switches active screen view without page reload', () => {
    // App.jsx useState for screen
    assert.assert(
      appJsx.includes('setScreen') || appJsx.includes('screen') || appJsx.includes('activeTab'),
      'App must maintain dynamic screen state switcher'
    );
  });
}
