#!/usr/bin/env node
// tests/run_e2e.js
// Master E2E Test Suite Runner for ENGAME
// Executable via: node tests/run_e2e.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TestHarness } from './harness/runner.js';
import { registerTier1R1Tests } from './tier1_features/r1_storage_auth_progress.test.js';
import { registerTier1R2Tests } from './tier1_features/r2_hero_roster_dataset.test.js';
import { registerTier1R3Tests } from './tier1_features/r3_ui_mobile_first.test.js';
import { registerTier2BoundaryTests } from './tier2_boundaries/boundary_corner_cases.test.js';
import { registerTier3CombinationTests } from './tier3_combinations/cross_feature_combinations.test.js';
import { registerTier4RealWorldTests } from './tier4_real_world/real_world_scenarios.test.js';
import { registerAdversarialM1Tests } from './adversarial_m1_stress.js';
import { registerAdversarialM2Tests } from './adversarial_m2_stress.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../');

// Parse CLI flags
const args = process.argv.slice(2);
const options = {
  tier: null,
  milestone: null,
  filter: null,
  stopOnFail: args.includes('--stop-on-fail'),
  jsonOnly: args.includes('--json'),
  writeReport: true,
};

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    options.tier = arg.split('=')[1];
  } else if (arg.startsWith('--milestone=')) {
    options.milestone = arg.split('=')[1].toUpperCase();
  } else if (arg.startsWith('--filter=')) {
    options.filter = arg.split('=')[1];
  }
}

async function main() {
  const runner = new TestHarness('ENGAME Opaque-Box E2E Test Suite');

  // Register Tier 1: Feature Coverage (R1, R2, R3)
  registerTier1R1Tests(runner);
  registerTier1R2Tests(runner);
  registerTier1R3Tests(runner);

  // Register Tier 2: Boundary & Corner Cases
  registerTier2BoundaryTests(runner);

  // Register Tier 3: Cross-Feature Combinations
  registerTier3CombinationTests(runner);

  // Register Tier 4: Real-World Application Scenarios
  registerTier4RealWorldTests(runner);

  // Register Tier 5: Adversarial Hardening (M1, M2)
  registerAdversarialM1Tests(runner);
  registerAdversarialM2Tests(runner);

  // If milestone filter is specified, filter suites
  if (options.milestone) {
    runner.suites = runner.suites.filter(s => s.milestone && s.milestone.toUpperCase() === options.milestone);
  }

  // Execute test harness
  const results = await runner.run(options);

  // Generate Reports
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // JSON Report
  const jsonReportPath = path.join(reportsDir, 'e2e-report.json');
  const reportPayload = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: results.totalTests,
      passed: results.passedTests,
      failed: results.failedTests,
      skipped: results.skippedTests,
      durationMs: results.durationMs,
      success: results.success,
    },
    tierBreakdown: {},
    milestoneBreakdown: {},
    suites: results.suites.map(s => ({
      title: s.title,
      tier: s.tier,
      milestone: s.milestone,
      passed: s.passed,
      failed: s.failed,
      tests: s.tests.map(t => ({
        title: t.title,
        status: t.status,
        durationMs: t.durationMs,
        error: t.error ? t.error.message : null,
      })),
    })),
  };

  // Compute breakdown
  for (const s of results.suites) {
    const tKey = `Tier ${s.tier}`;
    reportPayload.tierBreakdown[tKey] = reportPayload.tierBreakdown[tKey] || { total: 0, passed: 0, failed: 0 };
    reportPayload.tierBreakdown[tKey].total += s.tests.length;
    reportPayload.tierBreakdown[tKey].passed += s.passed;
    reportPayload.tierBreakdown[tKey].failed += s.failed;

    if (s.milestone) {
      reportPayload.milestoneBreakdown[s.milestone] = reportPayload.milestoneBreakdown[s.milestone] || { total: 0, passed: 0, failed: 0 };
      reportPayload.milestoneBreakdown[s.milestone].total += s.tests.length;
      reportPayload.milestoneBreakdown[s.milestone].passed += s.passed;
      reportPayload.milestoneBreakdown[s.milestone].failed += s.failed;
    }
  }

  fs.writeFileSync(jsonReportPath, JSON.stringify(reportPayload, null, 2), 'utf-8');

  // Markdown Report
  const mdReportPath = path.join(reportsDir, 'e2e-report.md');
  let mdContent = `# ENGAME E2E Test Suite Execution Report\n\n`;
  mdContent += `**Executed at**: ${reportPayload.timestamp}  \n`;
  mdContent += `**Total Duration**: ${results.durationMs} ms  \n`;
  mdContent += `**Status**: ${results.success ? '✅ PASSED' : '⚠️ FAILED'}  \n\n`;

  mdContent += `## Summary Metrics\n\n`;
  mdContent += `| Metric | Count |\n`;
  mdContent += `|---|---|\n`;
  mdContent += `| Total Tests | ${results.totalTests} |\n`;
  mdContent += `| Passed | ${results.passedTests} |\n`;
  mdContent += `| Failed | ${results.failedTests} |\n`;
  mdContent += `| Skipped | ${results.skippedTests} |\n`;
  mdContent += `| Success Rate | ${Math.round((results.passedTests / (results.totalTests || 1)) * 100)}% |\n\n`;

  mdContent += `## Tier Breakdown\n\n`;
  mdContent += `| Tier | Total | Passed | Failed |\n`;
  mdContent += `|---|---|---|---|\n`;
  for (const [tier, data] of Object.entries(reportPayload.tierBreakdown)) {
    mdContent += `| ${tier} | ${data.total} | ${data.passed} | ${data.failed} |\n`;
  }
  mdContent += `\n`;

  if (Object.keys(reportPayload.milestoneBreakdown).length > 0) {
    mdContent += `## Milestone Attribution\n\n`;
    mdContent += `| Milestone | Total | Passed | Failed |\n`;
    mdContent += `|---|---|---|---|\n`;
    for (const [m, data] of Object.entries(reportPayload.milestoneBreakdown)) {
      mdContent += `| ${m} | ${data.total} | ${data.passed} | ${data.failed} |\n`;
    }
    mdContent += `\n`;
  }

  if (results.failedTests > 0) {
    mdContent += `## Failed Test Detail & Escalations\n\n`;
    for (const s of results.suites) {
      for (const t of s.tests) {
        if (t.status === 'failed') {
          mdContent += `- **[Tier ${s.tier}] ${s.title}** -> \`${t.title}\`\n`;
          mdContent += `  - Error: \`${t.error?.message}\`\n`;
          if (s.milestone) {
            mdContent += `  - Milestone Assignment: **${s.milestone}**\n`;
          }
        }
      }
    }
    mdContent += `\n`;
  }

  fs.writeFileSync(mdReportPath, mdContent, 'utf-8');
  console.log(`📄 Reports saved:`);
  console.log(`   - JSON: ${jsonReportPath}`);
  console.log(`   - Markdown: ${mdReportPath}\n`);

  process.exitCode = results.success ? 0 : 1;
}

main().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
