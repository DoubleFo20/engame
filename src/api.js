// src/api.js — API client for Engame Backend
const API_BASE = 'http://localhost:5000/api';

// Token management
let token = localStorage.getItem('engame_token') || null;

export function setToken(t) {
    token = t;
    if (t) localStorage.setItem('engame_token', t);
    else localStorage.removeItem('engame_token');
}

export function getToken() {
    return token;
}

// Fetch wrapper
async function request(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await res.json();

    // Auto-logout if user is blocked
    if (res.status === 403 && data.error && data.error.includes('blocked')) {
        setToken(null);
        localStorage.removeItem('engame_user');
        alert(data.error);
        window.location.reload();
        return;
    }

    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
}

// ===== AUTH =====
export async function apiLogin(username, password) {
    const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
    setToken(data.token);
    return data.user;
}

export async function apiRegister(username, password, name, email) {
    const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, name, email }),
    });
    setToken(data.token);
    return data.user;
}

export function apiLogout() {
    setToken(null);
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
