// src/data/characters.js
export const CHARACTERS = [
  { 
    id: 1, 
    name: 'Violet', 
    role: 'Carry', 
    img: '/characters/violet_full.png',
    color: 'purple',
    hotspots: [
      { id: 101, x: 80, y: 55, word: 'Pistol', mean: 'ปืนพก', type: 'Weapon' },
      { id: 102, x: 50, y: 28, word: 'Tactical Suit', mean: 'ชุดปฏิบัติการ', type: 'Attire' },
      { id: 103, x: 30, y: 45, word: 'Ammunition', mean: 'กระสุน', type: 'Equipment' },
      { id: 104, x: 15, y: 13.5, word: 'Shotgun', mean: 'ลูกซอง (โหมดกลิ้ง)', type: 'Weapon' },
      { id: 105, x: 50, y: 40, word: 'Belt', mean: 'เข็มขัดอุปกรณ์', type: 'Accessory' },
      { id: 106, x: 23, y: 90, word: 'Boots', mean: 'รองเท้าบูทสนาม', type: 'Attire' },
    ]
  },
  { 
    id: 2, 
    name: 'Butterfly', 
    role: 'Assassin', 
    img: '/characters/Butterfly_full.png',
    color: 'pink',
    hotspots: [
      { id: 201, x: 20, y: 40, word: 'Broadsword', mean: 'ดาบใหญ่', type: 'Weapon' },
      { id: 202, x: 50, y: 23, word: 'Cape', mean: 'ผ้าคลุม', type: 'Attire' },
      { id: 203, x: 40, y: 78, word: 'Boots', mean: 'รองเท้าบูท', type: 'Attire' },
      { id: 204, x: 80, y: 20, word: 'Wing Ornament', mean: 'ปีกประดับหลัง', type: 'Accessory' },
      { id: 205, x: 73, y: 45, word: 'Wrist Guard', mean: 'เกราะข้อมือ', type: 'Equipment' },
      { id: 206, x: 45, y: 35, word: 'Armor Plate', mean: 'ชิ้นเกราะหน้าอก', type: 'Defense' },
      { id: 207, x: 65, y: 70, word: 'Shin Guard', mean: 'สนับแข้ง', type: 'Armor' },
    ]
  },
  { 
    id: 3, 
    name: 'Thane', 
    role: 'Tank', 
    img: '/characters/Thane_full.png',
    color: 'blue',
    hotspots: [
      { id: 301, x: 20, y: 50, word: 'Shield', mean: 'โล่', type: 'Defense' },
      { id: 302, x: 85, y: 55, word: 'Excalibur', mean: 'ดาบศักดิ์สิทธิ์', type: 'Weapon' },
      { id: 303, x: 50, y: 30, word: 'Heavy Armor', mean: 'เกราะหนัก', type: 'Defense' },
      { id: 304, x: 76, y: 20, word: 'Shoulder Plate', mean: 'เกราะไหล่', type: 'Armor' },
      { id: 305, x: 85, y: 40, word: 'Gauntlet', mean: 'เกราะแขน', type: 'Armor' },
      { id: 306, x: 40, y: 70, word: 'Greaves', mean: 'เกราะขา', type: 'Armor' },
    ]
  },
  { 
    id: 4, 
    name: 'Keixi', 
    role: 'Mage', 
    img: '/characters/Krixi_full.png',
    color: 'blue',
    hotspots: [
    { id: 401, x: 20, y: 30, word: 'Wings', mean: 'ปีก', type: 'Equipment' },
    { id: 402, x: 50, y: 45, word: 'Leaf Dress', mean: 'ชุดเดรสใบไม้', type: 'Attire' },
    { id: 403, x: 70, y: 75, word: 'Fairy Shoes', mean: 'รองเท้านางฟ้า', type: 'Attire'},
    { id: 404, x: 47, y: 13, word: 'Hairband', mean: 'ที่คาดผม', type: 'Accessory' },
    { id: 405, x: 33, y: 68, word: 'Stockings', mean: 'ถุงน่อง', type: 'Attire' },
    ]
  },
  { 
    id: 5, 
    name: 'Alice', 
    role: 'Support', 
    img: '/characters/Alice_full.png',
    color: 'blue',
    hotspots: [
      { id: 501, x: 17, y: 35, word: 'Staff', mean: 'คทา/ไม้เท้าเวทมนตร์', type: 'Weapon' },
      { id: 502, x: 65, y: 80, word: 'Boots', mean: 'รองเท้าบูท', type: 'Equipment' },
      { id: 503, x: 50, y: 40, word: 'Robe', mean: 'ชุดคลุมเวทมนตร์', type: 'Attire' },
      { id: 504, x: 79, y: 25, word: 'Wings', mean: 'ปีก', type: 'Equipment' },
      { id: 505, x: 50, y: 73, word: 'Stockings', mean: 'ถุงน่อง', type: 'Attire' },
    ]
  },
  {
  id: 6,
  name: 'Yena',
  role: 'Assassin',
  img: '/characters/Yena_full.png',
  color: 'blue',
  hotspots: [
    { id: 601, x: 8, y: 22, word: 'Blade', mean: 'ดาบ', type: 'Weapon' },
    { id: 602, x: 46, y: 43,word: 'Battle Dress', mean: 'ชุดเดรสต่อสู้', type: 'Attire' },
    { id: 603, x: 27, y: 85, word: 'Boots', mean: 'รองเท้าบูท', type: 'Attire' },
    { id: 604, x: 62, y: 32, word: 'Shoulder Guard', mean: 'เกราะไหล่', type: 'Defense' },
    { id: 605, x: 45, y: 70, word: 'Leg Armor', mean: 'เกราะขา', type: 'Armor' },
    { id: 606, x: 75, y: 58, word: 'Dual Blade Aura', mean: 'พลังมีดคู่', type: 'Weapon' },
    ]
  },
];