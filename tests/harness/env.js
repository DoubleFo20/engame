// tests/harness/env.js
// Browser environment simulator: LocalStorage, window.location, and network fetch spy

export class MockLocalStorage {
  constructor(options = {}) {
    this.store = new Map();
    this.quotaBytes = options.quotaBytes || Infinity;
    this.currentBytes = 0;
  }

  getItem(key) {
    return this.store.has(String(key)) ? this.store.get(String(key)) : null;
  }

  setItem(key, value) {
    const k = String(key);
    const v = String(value);
    const itemBytes = (k.length + v.length) * 2; // UTF-16 approximation
    if (this.currentBytes + itemBytes > this.quotaBytes) {
      const err = new Error('QuotaExceededError: The quota has been exceeded.');
      err.name = 'QuotaExceededError';
      err.code = 22;
      throw err;
    }
    const prev = this.store.get(k);
    if (prev) {
      this.currentBytes -= (k.length + prev.length) * 2;
    }
    this.store.set(k, v);
    this.currentBytes += itemBytes;
  }

  removeItem(key) {
    const k = String(key);
    const prev = this.store.get(k);
    if (prev) {
      this.currentBytes -= (k.length + prev.length) * 2;
      this.store.delete(k);
    }
  }

  clear() {
    this.store.clear();
    this.currentBytes = 0;
  }

  get length() {
    return this.store.size;
  }

  key(index) {
    const keys = Array.from(this.store.keys());
    return keys[index] || null;
  }

  // Debug & inspection helpers
  dump() {
    const obj = {};
    for (const [k, v] of this.store.entries()) {
      obj[k] = v;
    }
    return obj;
  }

  load(obj) {
    this.clear();
    for (const [k, v] of Object.entries(obj)) {
      this.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
    }
  }
}

export class NetworkInterceptor {
  constructor() {
    this.calls = [];
    this.isOnline = true;
    this.mode = 'standalone'; // 'standalone' | 'backend'
    this.mockRoutes = new Map();
  }

  reset() {
    this.calls = [];
  }

  record(url, options = {}) {
    this.calls.push({
      url: String(url),
      method: (options.method || 'GET').toUpperCase(),
      headers: options.headers || {},
      body: options.body || null,
      timestamp: Date.now(),
    });
  }

  getCallCount() {
    return this.calls.length;
  }

  getDispatchedUrls() {
    return this.calls.map(c => c.url);
  }

  setRouteHandler(pathRegex, handler) {
    this.mockRoutes.set(pathRegex, handler);
  }

  async fetch(url, options = {}) {
    this.record(url, options);

    if (this.mode === 'standalone') {
      // In standalone mode, direct fetch should not be called, or if called, returns simulated failure
      // to verify if app gracefully survives without backend
    }

    for (const [regex, handler] of this.mockRoutes.entries()) {
      if (regex.test(url)) {
        return handler(url, options);
      }
    }

    // Default mock response
    return {
      ok: true,
      status: 200,
      json: async () => ({ status: 'success' }),
      text: async () => JSON.stringify({ status: 'success' }),
    };
  }
}

export class VirtualBrowserEnvironment {
  constructor(options = {}) {
    this.localStorage = new MockLocalStorage({ quotaBytes: options.storageQuota });
    this.network = new NetworkInterceptor();
    this.alerts = [];
    this.reloads = 0;
    this.consoleErrors = [];
    this.consoleWarns = [];
    this.hostname = options.hostname || 'doublefo20.github.io';
    this.href = options.href || `https://${this.hostname}/engame/`;
    this._originalGlobals = {};
  }

  install() {
    this._originalGlobals = {
      localStorage: globalThis.localStorage,
      window: globalThis.window,
      fetch: globalThis.fetch,
      consoleError: console.error,
      consoleWarn: console.warn,
    };

    const self = this;

    globalThis.localStorage = this.localStorage;
    globalThis.window = {
      location: {
        hostname: this.hostname,
        href: this.href,
        reload: () => {
          self.reloads++;
        },
      },
      alert: (msg) => {
        self.alerts.push(String(msg));
      },
      localStorage: this.localStorage,
    };

    globalThis.fetch = (url, opts) => this.network.fetch(url, opts);

    console.error = (...args) => {
      this.consoleErrors.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      // do not suppress entirely if desired, but capture
    };

    console.warn = (...args) => {
      this.consoleWarns.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    };
  }

  restore() {
    if (this._originalGlobals.localStorage !== undefined) {
      globalThis.localStorage = this._originalGlobals.localStorage;
    }
    if (this._originalGlobals.window !== undefined) {
      globalThis.window = this._originalGlobals.window;
    }
    if (this._originalGlobals.fetch !== undefined) {
      globalThis.fetch = this._originalGlobals.fetch;
    }
    if (this._originalGlobals.consoleError) {
      console.error = this._originalGlobals.consoleError;
    }
    if (this._originalGlobals.consoleWarn) {
      console.warn = this._originalGlobals.consoleWarn;
    }
    this.reset();
  }

  reset() {
    this.localStorage.clear();
    this.network.reset();
    this.alerts = [];
    this.reloads = 0;
    this.consoleErrors = [];
    this.consoleWarns = [];
  }
}
