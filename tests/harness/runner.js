// tests/harness/runner.js
// Standalone, zero-dependency test runner engine for ENGAME E2E tests

import { performance } from 'node:perf_hooks';

export class TestHarness {
  constructor(name = 'ENGAME E2E Test Suite') {
    this.name = name;
    this.suites = [];
    this.currentSuite = null;
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.options = {
      verbose: true,
      stopOnFail: false,
      filter: null,
      tier: null,
    };
  }

  suite(title, meta = {}) {
    const suiteObj = {
      title,
      tier: meta.tier || 1,
      feature: meta.feature || null,
      milestone: meta.milestone || null,
      tests: [],
      startTime: 0,
      endTime: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    };
    this.suites.push(suiteObj);
    this.currentSuite = suiteObj;
    return suiteObj;
  }

  test(title, fn, meta = {}) {
    if (!this.currentSuite) {
      this.suite('Default Suite');
    }
    const testCase = {
      title,
      fn,
      meta,
      status: 'pending',
      error: null,
      durationMs: 0,
    };
    this.currentSuite.tests.push(testCase);
  }

  skip(title, fn, reason = 'Skipped') {
    this.test(title, fn, { skip: true, skipReason: reason });
  }

  async run(options = {}) {
    Object.assign(this.options, options);
    this.startTime = performance.now();
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;

    console.log(`\n======================================================================`);
    console.log(`🚀 ${this.name}`);
    console.log(`   Running at: ${new Date().toISOString()}`);
    if (this.options.tier) console.log(`   Filter Tier: ${this.options.tier}`);
    if (this.options.filter) console.log(`   Filter Pattern: ${this.options.filter}`);
    console.log(`======================================================================\n`);

    for (const suite of this.suites) {
      // Check tier filter
      if (this.options.tier && String(suite.tier) !== String(this.options.tier)) {
        continue;
      }

      console.log(`\n📦 [Tier ${suite.tier}] ${suite.title}`);
      suite.startTime = performance.now();

      for (const t of suite.tests) {
        if (this.options.filter && !t.title.toLowerCase().includes(this.options.filter.toLowerCase())) {
          continue;
        }

        this.totalTests++;

        if (t.meta && t.meta.skip) {
          t.status = 'skipped';
          suite.skipped++;
          this.skippedTests++;
          console.log(`   ⚪ SKIP: ${t.title} (${t.meta.skipReason || 'Skipped'})`);
          continue;
        }

        const tStart = performance.now();
        try {
          // Execute test (supports async)
          await t.fn();
          t.durationMs = Math.round((performance.now() - tStart) * 100) / 100;
          t.status = 'passed';
          suite.passed++;
          this.passedTests++;
          console.log(`   ✅ PASS: ${t.title} (${t.durationMs}ms)`);
        } catch (err) {
          t.durationMs = Math.round((performance.now() - tStart) * 100) / 100;
          t.status = 'failed';
          t.error = err;
          suite.failed++;
          this.failedTests++;
          console.log(`   ❌ FAIL: ${t.title} (${t.durationMs}ms)`);
          console.log(`      Error: ${err.message}`);
          if (err.expected !== undefined && err.actual !== undefined) {
            console.log(`      Expected: ${JSON.stringify(err.expected)}`);
            console.log(`      Actual:   ${JSON.stringify(err.actual)}`);
          }
          if (this.options.stopOnFail) {
            break;
          }
        }
      }

      suite.endTime = performance.now();
    }

    this.endTime = performance.now();
    const duration = Math.round((this.endTime - this.startTime) * 100) / 100;

    console.log(`\n======================================================================`);
    console.log(`📊 EXECUTION SUMMARY`);
    console.log(`   Total Tests:  ${this.totalTests}`);
    console.log(`   Passed:       ${this.passedTests}`);
    console.log(`   Failed:       ${this.failedTests}`);
    console.log(`   Skipped:      ${this.skippedTests}`);
    console.log(`   Duration:     ${duration} ms`);
    console.log(`   Status:       ${this.failedTests === 0 ? '🎉 ALL TESTS PASSED' : '⚠️ SOME TESTS FAILED'}`);
    console.log(`======================================================================\n`);

    return {
      name: this.name,
      totalTests: this.totalTests,
      passedTests: this.passedTests,
      failedTests: this.failedTests,
      skippedTests: this.skippedTests,
      durationMs: duration,
      success: this.failedTests === 0,
      suites: this.suites,
    };
  }
}

// Fluent assertions helper
export class Assertions {
  static assert(condition, message = 'Assertion failed') {
    if (!condition) {
      const err = new Error(message);
      err.name = 'AssertionError';
      throw err;
    }
  }

  static equal(actual, expected, message) {
    if (actual !== expected) {
      const err = new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      err.name = 'AssertionError';
      err.actual = actual;
      err.expected = expected;
      throw err;
    }
  }

  static deepEqual(actual, expected, message) {
    const actStr = JSON.stringify(actual);
    const expStr = JSON.stringify(expected);
    if (actStr !== expStr) {
      const err = new Error(message || `Deep equal mismatch:\nExpected: ${expStr}\nActual:   ${actStr}`);
      err.name = 'AssertionError';
      err.actual = actual;
      err.expected = expected;
      throw err;
    }
  }

  static isTrue(val, message) {
    Assertions.equal(val, true, message || `Expected true, got ${val}`);
  }

  static isFalse(val, message) {
    Assertions.equal(val, false, message || `Expected false, got ${val}`);
  }

  static exists(val, message) {
    if (val === undefined || val === null) {
      throw new Error(message || `Expected value to exist, got ${val}`);
    }
  }

  static isNumber(val, message) {
    if (typeof val !== 'number' || Number.isNaN(val)) {
      throw new Error(message || `Expected valid number, got ${val}`);
    }
  }

  static isString(val, message) {
    if (typeof val !== 'string') {
      throw new Error(message || `Expected string, got ${typeof val}`);
    }
  }

  static isArray(val, message) {
    if (!Array.isArray(val)) {
      throw new Error(message || `Expected array, got ${typeof val}`);
    }
  }

  static inRange(val, min, max, message) {
    if (val < min || val > max) {
      throw new Error(message || `Expected ${val} to be between ${min} and ${max}`);
    }
  }

  static matches(str, regex, message) {
    if (!regex.test(str)) {
      throw new Error(message || `String "${str}" does not match regex ${regex}`);
    }
  }

  static async throws(asyncFn, expectedMessageSubstring = null, message = 'Expected function to throw') {
    let threw = false;
    let caughtErr = null;
    try {
      await asyncFn();
    } catch (e) {
      threw = true;
      caughtErr = e;
    }
    if (!threw) {
      throw new Error(message);
    }
    if (expectedMessageSubstring && !caughtErr.message.includes(expectedMessageSubstring)) {
      throw new Error(`Expected error message to contain "${expectedMessageSubstring}", got "${caughtErr.message}"`);
    }
  }

  static async doesNotThrow(asyncFn, message = 'Expected function not to throw') {
    try {
      await asyncFn();
    } catch (e) {
      throw new Error(`${message}: ${e.message}`);
    }
  }
}

export const assert = Assertions;
