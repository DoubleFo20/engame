// src/api.js — Transparent Dual-Mode API Client for ENGAME
// In standalone/static hosting (GitHub Pages), routes directly to storageEngine with ZERO fetch calls.
// In development mode, attempts remote backend with seamless silent fallback to storageEngine.

import storageEngine from './services/storageEngine.js';

const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:5000/api';

// Token management
let token = typeof localStorage !== 'undefined' ? localStorage.getItem('engame_token') : null;

export function setToken(t) {
    token = t;
    if (typeof localStorage !== 'undefined') {
        if (t) localStorage.setItem('engame_token', t);
        else localStorage.removeItem('engame_token');
    }
}

export function getToken() {
    if (!token && typeof localStorage !== 'undefined') {
        token = localStorage.getItem('engame_token');
    }
    return token;
}

/**
 * Detects whether the application is running in standalone/static mode (e.g. GitHub Pages).
 * When true, ZERO window.fetch() calls are dispatched, eliminating red network errors.
 */
export function isStandaloneMode() {
    // Check explicit configuration flag
    if (import.meta.env?.VITE_STANDALONE === 'true') {
        return true;
    }

    if (typeof window !== 'undefined') {
        const host = window.location.hostname || '';
        const proto = window.location.protocol || '';

        // 1. GitHub Pages hosting (e.g. doublefo20.github.io)
        if (host.includes('github.io')) {
            return true;
        }

        // 2. HTTPS production hosting without explicit remote API (prevents Mixed Content errors)
        if (proto === 'https:' && (!import.meta.env?.VITE_API_BASE || import.meta.env.VITE_API_BASE.includes('localhost'))) {
            return true;
        }

        // 3. Any non-localhost domain without an explicit API base URL
        if (!import.meta.env?.VITE_API_BASE && host !== 'localhost' && host !== '127.0.0.1') {
            return true;
        }
    }

    return false;
}

/**
 * Universal request router:
 * Intercepts calls on static hosts to execute in virtual backend storageEngine,
 * or routes to fetch() on localhost with graceful fallback.
 */
async function request(path, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    let body = {};
    if (options.body) {
        try {
            body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
        } catch {
            body = options.body;
        }
    }

    // Mode 1: Autonomous Virtual Backend (Zero Network Requests)
    if (isStandaloneMode()) {
        try {
            return await storageEngine.handleRequest(method, path, body);
        } catch (err) {
            throw new Error(err.message || 'Operation failed');
        }
    }

    // Mode 2: Hybrid Development Mode (Fetch with Seamless Fallback)
    try {
        const headers = { 'Content-Type': 'application/json', ...options.headers };
        const activeToken = getToken();
        if (activeToken) headers['Authorization'] = `Bearer ${activeToken}`;

        const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
        const data = await res.json();

        // Auto-logout if user is blocked
        if (res.status === 403 && data.error && (data.error.includes('blocked') || data.error.includes('ระงับ'))) {
            setToken(null);
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('engame_currentUser');
                localStorage.removeItem('engame_user');
            }
            if (typeof alert === 'function') alert(data.error);
            if (typeof window !== 'undefined' && window.location?.reload) {
                window.location.reload();
            }
            return;
        }

        if (!res.ok) throw new Error(data.error || 'Request failed');
        return data;
    } catch (networkErr) {
        // Silent graceful fallback to virtual storageEngine when backend is offline
        console.warn(`[API] Remote backend offline (${networkErr.message}). Seamlessly falling back to Virtual Storage Engine.`);
        return await storageEngine.handleRequest(method, path, body);
    }
}

// ===== AUTH =====
export async function apiLogin(username, password) {
    const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
    setToken(data.token);
    const user = data.user || data;
    user.token = data.token;
    return user;
}

export async function apiRegister(username, password, name, email) {
    const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, name, email }),
    });
    setToken(data.token);
    const user = data.user || data;
    user.token = data.token;
    return user;
}

export function apiLogout() {
    setToken(null);
    storageEngine.logout();
}

export async function apiForgotPassword(username, email, newPassword) {
    return request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ username, email, newPassword }),
    });
}

export async function apiChangePassword(currentPassword, newPassword) {
    return request('/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
    });
}

// ===== CHARACTERS (public) =====
export async function apiGetCharacters() {
    return request('/characters');
}

// ===== CHARACTERS (admin) =====
export async function apiAddCharacter(data) {
    return request('/characters', { method: 'POST', body: JSON.stringify(data) });
}

export async function apiUpdateCharacter(id, data) {
    return request(`/characters/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function apiDeleteCharacter(id) {
    return request(`/characters/${id}`, { method: 'DELETE' });
}

// ===== HOTSPOTS (admin) =====
export async function apiAddHotspot(data) {
    return request('/characters/hotspots', { method: 'POST', body: JSON.stringify(data) });
}

export async function apiUpdateHotspot(id, data) {
    return request(`/characters/hotspots/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function apiDeleteHotspot(id) {
    return request(`/characters/hotspots/${id}`, { method: 'DELETE' });
}

// ===== USERS (admin) =====
export async function apiGetUsers() {
    return request('/users');
}

export async function apiUpdateUser(id, data) {
    return request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function apiDeleteUser(id) {
    return request(`/users/${id}`, { method: 'DELETE' });
}

export async function apiUnblockUser(id) {
    return request(`/users/${id}/unblock`, { method: 'PUT' });
}

// ===== VOCAB =====
export async function apiGetVocab() {
    return request('/vocab');
}

export async function apiSaveVocab(hotspot_id) {
    return request('/vocab', { method: 'POST', body: JSON.stringify({ hotspot_id }) });
}

export async function apiRemoveVocab(hotspotId) {
    return request(`/vocab/${hotspotId}`, { method: 'DELETE' });
}

// ===== PROGRESS =====
export async function apiAddXP(amount) {
    return request('/progress/xp', { method: 'PUT', body: JSON.stringify({ amount }) });
}

export async function apiGetProgress() {
    return request('/progress');
}

// ===== AI =====
export async function apiGenerateHotspots(characterId) {
    return request('/ai/generate-hotspots', {
        method: 'POST',
        body: JSON.stringify({ characterId }),
    });
}

// ===== ACTIVITY LOGS =====
export async function apiGetRecentLogs(limit = 50) {
    return request(`/activity/recent?limit=${limit}`);
}

export async function apiGetActivityStats() {
    return request('/activity/stats');
}

// ===== ADMIN: RESET PASSWORD =====
export async function apiResetPassword(userId, newPassword) {
    return request(`/auth/reset-password/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ newPassword }),
    });
}

export { storageEngine };
