// src/data/users.js
// Authoritative initial demo user accounts for ENGAME

export const INITIAL_USERS = [
  {
    id: 1,
    username: "player",
    password: "123",
    name: "Player 1",
    email: "player@engame.io",
    xp: 0,
    rank: "Silver II",
    role: "guest",
    is_blocked: 0,
  },
  {
    id: 2,
    username: "admin",
    password: "123",
    name: "Admin GM",
    email: "admin@engame.io",
    xp: 99999,
    rank: "Conqueror",
    role: "admin",
    is_blocked: 0,
  },
  {
    id: 3,
    username: "demo",
    password: "123",
    name: "Demo Player",
    email: "demo@example.com",
    xp: 250,
    rank: "Gold I",
    role: "student",
    is_blocked: 0,
  },
];