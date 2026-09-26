// src/data/characters.js - Complete 111 ROV Heroes & Vocabulary Hotspots Dataset
// Authoritative dataset matching all 111 PNG assets in public/characters/

export const CHARACTERS = [
  // --- Part 1: Heroes 1 to 37 ---
  {
    id: 1,
    name: 'Violet',
    role: 'Carry / Marksman',
    color: 'purple',
    img: './characters/violet_full.png',
    hotspots: [
      { id: 101, character_id: 1, x: 80, y: 55, word: 'Pistol', mean: 'ปืนพกคู่กาย', type: 'Weapon' },
      { id: 102, character_id: 1, x: 50, y: 28, word: 'Tactical Suit', mean: 'ชุดเกราะยุทธวิธี', type: 'Attire' },
      { id: 103, character_id: 1, x: 30, y: 45, word: 'Ammunition', mean: 'ซองกระสุนปืน', type: 'Accessories' },
      { id: 104, character_id: 1, x: 15, y: 15, word: 'Shotgun', mean: 'ปืนลูกซองประจัญบาน', type: 'Weapon' },
      { id: 105, character_id: 1, x: 50, y: 40, word: 'Utility Belt', mean: 'เข็มขัดอุปกรณ์สนาม', type: 'Accessories' },
      { id: 106, character_id: 1, x: 25, y: 90, word: 'Combat Boots', mean: 'รองเท้าบูททหาร', type: 'Attire' },
    ]
  },
  {
    id: 2,
    name: 'Butterfly',
    role: 'Assassin',
    color: 'pink',
    img: './characters/Butterfly_full.png',
    hotspots: [
      { id: 201, character_id: 2, x: 20, y: 40, word: 'Broadsword', mean: 'ดาบใหญ่ใบกว้าง', type: 'Weapon' },
      { id: 202, character_id: 2, x: 50, y: 23, word: 'Cape', mean: 'ผ้าคลุมหลัง', type: 'Attire' },
      { id: 203, character_id: 2, x: 40, y: 78, word: 'Boots', mean: 'รองเท้าบูทหนัง', type: 'Attire' },
      { id: 204, character_id: 2, x: 80, y: 20, word: 'Wing Ornament', mean: 'ปีกประดับหลัง', type: 'Accessories' },
      { id: 205, character_id: 2, x: 73, y: 45, word: 'Wrist Guard', mean: 'ปลอกแขนป้องกัน', type: 'Armor' },
      { id: 206, character_id: 2, x: 45, y: 35, word: 'Armor Plate', mean: 'แผ่นเกราะหน้าอก', type: 'Armor' },
    ]
  },
  {
    id: 3,
    name: 'Thane',
    role: 'Tank',
    color: 'blue',
    img: './characters/Thane_full.png',
    hotspots: [
      { id: 301, character_id: 3, x: 20, y: 50, word: 'Shield', mean: 'โล่เกราะเหล็กกล้า', type: 'Armor' },
      { id: 302, character_id: 3, x: 85, y: 55, word: 'Excalibur', mean: 'ดาบศักดิ์สิทธิ์', type: 'Weapon' },
      { id: 303, character_id: 3, x: 50, y: 30, word: 'Heavy Armor', mean: 'เกราะหนักอัศวิน', type: 'Armor' },
      { id: 304, character_id: 3, x: 76, y: 20, word: 'Shoulder Plate', mean: 'เกราะไหล่เหล็ก', type: 'Armor' },
      { id: 305, character_id: 3, x: 85, y: 40, word: 'Gauntlet', mean: 'ถุงมือเกราะเหล็ก', type: 'Armor' },
      { id: 306, character_id: 3, x: 40, y: 70, word: 'Greaves', mean: 'สนับแข้งกษัตริย์', type: 'Armor' },
    ]
  },
  {
    id: 4,
    name: 'Krixi',
    role: 'Mage',
    color: 'emerald',
    img: './characters/Krixi_full.png',
    hotspots: [
      { id: 401, character_id: 4, x: 20, y: 30, word: 'Fairy Wings', mean: 'ปีกภูตพฤกษา', type: 'Accessories' },
      { id: 402, character_id: 4, x: 50, y: 45, word: 'Leaf Dress', mean: 'ชุดเดรสกลีบใบไม้', type: 'Attire' },
      { id: 403, character_id: 4, x: 70, y: 75, word: 'Fairy Shoes', mean: 'รองเท้านางฟ้า', type: 'Attire' },
      { id: 404, character_id: 4, x: 47, y: 13, word: 'Hairband', mean: 'ที่คาดผมดอกไม้', type: 'Accessories' },
      { id: 405, character_id: 4, x: 33, y: 68, word: 'Stockings', mean: 'ถุงน่องใยบัว', type: 'Attire' },
      { id: 406, character_id: 4, x: 78, y: 32, word: 'Moonfall Ray', mean: 'ลำแสงจันทราตก', type: 'Magic/Skills' },
    ]
  },
  {
    id: 5,
    name: 'Alice',
    role: 'Support',
    color: 'amber',
    img: './characters/Alice_full.png',
    hotspots: [
      { id: 501, character_id: 5, x: 17, y: 35, word: 'Magic Staff', mean: 'ไม้เท้ามนตรา', type: 'Weapon' },
      { id: 502, character_id: 5, x: 65, y: 80, word: 'Fairy Boots', mean: 'รองเท้าบูทเวทมนตร์', type: 'Attire' },
      { id: 503, character_id: 5, x: 50, y: 40, word: 'Magic Robe', mean: 'เสื้อคลุมเวทมนตร์', type: 'Attire' },
      { id: 504, character_id: 5, x: 79, y: 25, word: 'Star Wings', mean: 'ปีกแห่งดวงดาว', type: 'Accessories' },
      { id: 505, character_id: 5, x: 50, y: 73, word: 'Stockings', mean: 'ถุงน่องลายดาว', type: 'Attire' },
      { id: 506, character_id: 5, x: 30, y: 60, word: 'Chrono Shield', mean: 'โล่กาลเวลา', type: 'Magic/Skills' },
    ]
  },
  {
    id: 6,
    name: 'Yena',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Yena_full.png',
    hotspots: [
      { id: 601, character_id: 6, x: 8, y: 22, word: 'Crescent Blade', mean: 'ดาบโค้งจันทร์เสี้ยว', type: 'Weapon' },
      { id: 602, character_id: 6, x: 46, y: 43, word: 'Battle Dress', mean: 'ชุดเกราะระบำรบ', type: 'Attire' },
      { id: 603, character_id: 6, x: 27, y: 85, word: 'Combat Boots', mean: 'รองเท้าบูทต่อสู้', type: 'Attire' },
      { id: 604, character_id: 6, x: 62, y: 32, word: 'Shoulder Guard', mean: 'เกราะป้องกันไหล่', type: 'Armor' },
      { id: 605, character_id: 6, x: 45, y: 70, word: 'Leg Armor', mean: 'เกราะสนับขา', type: 'Armor' },
      { id: 606, character_id: 6, x: 75, y: 58, word: 'Dual Blade Aura', mean: 'ออร่าระบำดาบคู่', type: 'Magic/Skills' },
    ]
  },
  {
    id: 7,
    name: 'Airi',
    role: 'Assassin',
    color: 'blue',
    img: './characters/Airi_full.png',
    hotspots: [
      { id: 701, character_id: 7, x: 22, y: 45, word: 'Dual Katanas', mean: 'ดาบคู่คาตานะ', type: 'Weapon' },
      { id: 702, character_id: 7, x: 50, y: 20, word: 'Ninja Mask', mean: 'หน้ากากนินจา', type: 'Attire' },
      { id: 703, character_id: 7, x: 52, y: 42, word: 'Kimono Tunic', mean: 'ชุดกิโมโนต่อสู้', type: 'Attire' },
      { id: 704, character_id: 7, x: 38, y: 82, word: 'Shin Guards', mean: 'สนับแข้งนินจา', type: 'Armor' },
      { id: 705, character_id: 7, x: 78, y: 35, word: 'Shadow Shuriken', mean: 'ดาวกระจายเงา', type: 'Weapon' },
      { id: 706, character_id: 7, x: 80, y: 65, word: 'Dragon Spirit', mean: 'จิตวิญญาณมังกร', type: 'Magic/Skills' },
    ]
  },
  {
    id: 8,
    name: 'Aleister',
    role: 'Mage',
    color: 'indigo',
    img: './characters/Aleister_full.png',
    hotspots: [
      { id: 801, character_id: 8, x: 25, y: 48, word: 'Magic Grimoire', mean: 'ตำรามนตราทมิฬ', type: 'Weapon' },
      { id: 802, character_id: 8, x: 50, y: 42, word: 'Sorcerer Robe', mean: 'ชุดคลุมจอมเวท', type: 'Attire' },
      { id: 803, character_id: 8, x: 75, y: 32, word: 'Lightning Sigil', mean: 'สัญลักษณ์สายฟ้า', type: 'Magic/Skills' },
      { id: 804, character_id: 8, x: 50, y: 16, word: 'Mystic Diadem', mean: 'รัดเกล้ามนตรา', type: 'Accessories' },
      { id: 805, character_id: 8, x: 65, y: 26, word: 'Shoulder Mantle', mean: 'ผ้าคลุมไหล่เวทมนตร์', type: 'Attire' },
    ]
  },
  {
    id: 9,
    name: 'Allain',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Allain_full.png',
    hotspots: [
      { id: 901, character_id: 9, x: 22, y: 48, word: 'Twin Swords', mean: 'ดาบคู่แสงและความมืด', type: 'Weapon' },
      { id: 902, character_id: 9, x: 50, y: 38, word: 'Battle Coat', mean: 'เสื้อโค้ตนักรบ', type: 'Attire' },
      { id: 903, character_id: 9, x: 75, y: 42, word: 'Leather Gloves', mean: 'ถุงมือหนังกระชับดาบ', type: 'Accessories' },
      { id: 904, character_id: 9, x: 48, y: 72, word: 'Combat Boots', mean: 'รองเท้าบูทประจัญบาน', type: 'Attire' },
      { id: 905, character_id: 9, x: 80, y: 25, word: 'Meteor Strike', mean: 'การจู่โจมดาวตก', type: 'Magic/Skills' },
    ]
  },
  {
    id: 10,
    name: 'Amily',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Amily_full.png',
    hotspots: [
      { id: 1001, character_id: 10, x: 42, y: 82, word: 'Bladed Greaves', mean: 'ใบมีดติดสนับแข้ง', type: 'Weapon' },
      { id: 1002, character_id: 10, x: 50, y: 35, word: 'Leather Jacket', mean: 'แจ็กเก็ตหนังนักฆ่า', type: 'Attire' },
      { id: 1003, character_id: 10, x: 28, y: 48, word: 'Combat Dagger', mean: 'มีดสั้นต่อสู้ประชิด', type: 'Weapon' },
      { id: 1004, character_id: 10, x: 55, y: 62, word: 'Leg Armor', mean: 'เกราะแผ่นป้องกันขา', type: 'Armor' },
      { id: 1005, character_id: 10, x: 78, y: 40, word: 'Enrage Aura', mean: 'ออร่าความโกรธแค้น', type: 'Magic/Skills' },
    ]
  },
  {
    id: 11,
    name: 'Annette',
    role: 'Support',
    color: 'cyan',
    img: './characters/Annette_full.png',
    hotspots: [
      { id: 1101, character_id: 11, x: 25, y: 42, word: 'Wind Wand', mean: 'คทาสายลมหมุน', type: 'Weapon' },
      { id: 1102, character_id: 11, x: 50, y: 15, word: 'Witch Hat', mean: 'หมวกแม่มดฝึกหัด', type: 'Accessories' },
      { id: 1103, character_id: 11, x: 50, y: 45, word: 'Academy Uniform', mean: 'เครื่องแบบสถาบันเวท', type: 'Attire' },
      { id: 1104, character_id: 11, x: 78, y: 55, word: 'Wind Barrier', mean: 'ม่านลมพายุคุ้มกัน', type: 'Magic/Skills' },
      { id: 1105, character_id: 11, x: 48, y: 85, word: 'Ribbon Shoes', mean: 'รองเท้าผูกโบว์', type: 'Attire' },
    ]
  },
  {
    id: 12,
    name: 'Aoi',
    role: 'Assassin',
    color: 'purple',
    img: './characters/Aoi_full.png',
    hotspots: [
      { id: 1201, character_id: 12, x: 25, y: 45, word: 'Dragon Claws', mean: 'กรงเล็บมังกรสังหาร', type: 'Weapon' },
      { id: 1202, character_id: 12, x: 60, y: 28, word: 'Dragon Scarf', mean: 'ผ้าพันคอมังกรเขี้ยว', type: 'Accessories' },
      { id: 1203, character_id: 12, x: 50, y: 45, word: 'Shinobi Outfit', mean: 'ชุดนินจาสาวคล่องแคล่ว', type: 'Attire' },
      { id: 1204, character_id: 12, x: 82, y: 35, word: 'Grappling Cable', mean: 'สายสลิงโหนเวหา', type: 'Weapon' },
      { id: 1205, character_id: 12, x: 75, y: 70, word: 'Dragon Slash', mean: 'การเหินฟันมังกร', type: 'Magic/Skills' },
    ]
  },
  {
    id: 13,
    name: 'Arduin',
    role: 'Tank',
    color: 'slate',
    img: './characters/Arduin_full.png',
    hotspots: [
      { id: 1301, character_id: 13, x: 22, y: 45, word: 'Frost Axe', mean: 'ขวานยักษ์เยือกแข็ง', type: 'Weapon' },
      { id: 1302, character_id: 13, x: 50, y: 16, word: 'Horned Helmet', mean: 'หมวกเกราะเหล็กมีเขา', type: 'Armor' },
      { id: 1303, character_id: 13, x: 50, y: 40, word: 'Plate Armor', mean: 'ชุดเกราะเหล็กแผ่นหนา', type: 'Armor' },
      { id: 1304, character_id: 13, x: 75, y: 30, word: 'Iron Pauldron', mean: 'เกราะไหล่เหล็กหนาม', type: 'Armor' },
      { id: 1305, character_id: 13, x: 52, y: 80, word: 'Frost Aura', mean: 'ออร่าความเย็นเยือกแข็ง', type: 'Magic/Skills' },
    ]
  },
  {
    id: 14,
    name: 'Arum',
    role: 'Tank',
    color: 'emerald',
    img: './characters/Arum_full.png',
    hotspots: [
      { id: 1401, character_id: 14, x: 22, y: 35, word: 'Beast Spirits', mean: 'วิญญาณสิงโตอสูร', type: 'Magic/Skills' },
      { id: 1402, character_id: 14, x: 50, y: 48, word: 'Priestess Robe', mean: 'ชุดคลุมนักบวชหญิง', type: 'Attire' },
      { id: 1403, character_id: 14, x: 50, y: 15, word: 'Horn Headdress', mean: 'รัดเกล้าเขาสัตว์ป่า', type: 'Accessories' },
      { id: 1404, character_id: 14, x: 78, y: 50, word: 'Soul Chains', mean: 'โซ่พันธนาการวิญญาณ', type: 'Magic/Skills' },
      { id: 1405, character_id: 14, x: 35, y: 45, word: 'Tribal Bangles', mean: 'กำไลข้อมือชนเผ่า', type: 'Accessories' },
    ]
  },
  {
    id: 15,
    name: 'Astrid',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Astrid_full.png',
    hotspots: [
      { id: 1501, character_id: 15, x: 20, y: 45, word: 'Greatsword', mean: 'ดาบยักษ์ประจำตระกูล', type: 'Weapon' },
      { id: 1502, character_id: 15, x: 50, y: 35, word: 'Steel Cuirass', mean: 'เกราะอกเหล็กกล้า', type: 'Armor' },
      { id: 1503, character_id: 15, x: 75, y: 35, word: 'Royal Cape', mean: 'ผ้าคลุมขุนนางราชสำนัก', type: 'Attire' },
      { id: 1504, character_id: 15, x: 32, y: 50, word: 'Plated Gauntlet', mean: 'ถุงมือเกราะอัศวิน', type: 'Armor' },
      { id: 1505, character_id: 15, x: 65, y: 65, word: 'Fearless Slash', mean: 'เพลงดาบไร้ความกลัว', type: 'Magic/Skills' },
    ]
  },
  {
    id: 16,
    name: 'Ata',
    role: 'Tank',
    color: 'amber',
    img: './characters/Ata_full.png',
    hotspots: [
      { id: 1601, character_id: 16, x: 25, y: 42, word: 'Heavy Anchor', mean: 'สมอเรือเหล็กยักษ์', type: 'Weapon' },
      { id: 1602, character_id: 16, x: 50, y: 18, word: 'Sailor Bandana', mean: 'ผ้าโพกศีรษะลูกเรือ', type: 'Accessories' },
      { id: 1603, character_id: 16, x: 50, y: 68, word: 'Pirate Trousers', mean: 'กางเกงกะลาสีลายทาง', type: 'Attire' },
      { id: 1604, character_id: 16, x: 78, y: 50, word: 'Ghost Ship Barricade', mean: 'บาเรียเรือผีสิง', type: 'Magic/Skills' },
      { id: 1605, character_id: 16, x: 42, y: 40, word: 'Leather Harness', mean: 'สายสะพายไหล่หนัง', type: 'Accessories' },
    ]
  },
  {
    id: 17,
    name: 'Aya',
    role: 'Support',
    color: 'amber',
    img: './characters/Aya_full.png',
    hotspots: [
      { id: 1701, character_id: 17, x: 35, y: 45, word: 'Magic Microphone', mean: 'ไมโครโฟนเวทมนตร์', type: 'Weapon' },
      { id: 1702, character_id: 17, x: 50, y: 15, word: 'Squirrel Ears', mean: 'หูกระรอกน้อยน่ารัก', type: 'Accessories' },
      { id: 1703, character_id: 17, x: 50, y: 50, word: 'Idyllic Dress', mean: 'ชุดเดรสไอดอลแสนหวาน', type: 'Attire' },
      { id: 1704, character_id: 17, x: 72, y: 40, word: 'Soundwave Shield', mean: 'โล่คลื่นเสียงคุ้มกัน', type: 'Magic/Skills' },
      { id: 1705, character_id: 17, x: 50, y: 82, word: 'Leaf Boots', mean: 'รองเท้าใบไม้ภูต', type: 'Attire' },
    ]
  },
  {
    id: 18,
    name: 'Azzen\'Ka',
    role: 'Mage',
    color: 'amber',
    img: './characters/Azzen\'Ka_full.png',
    hotspots: [
      { id: 1801, character_id: 18, x: 25, y: 45, word: 'Sand Scepter', mean: 'คทาทรายทะเลทราย', type: 'Weapon' },
      { id: 1802, character_id: 18, x: 50, y: 38, word: 'Desert Shroud', mean: 'ผ้าคลุมทรายบรรพกาล', type: 'Attire' },
      { id: 1803, character_id: 18, x: 50, y: 16, word: 'Golden Mask', mean: 'หน้ากากทองคำฟาโรห์', type: 'Accessories' },
      { id: 1804, character_id: 18, x: 78, y: 60, word: 'Sandstorm Vortex', mean: 'พายุทรายดูดกลืน', type: 'Magic/Skills' },
      { id: 1805, character_id: 18, x: 45, y: 70, word: 'Cursed Wrappings', mean: 'ผ้าพันแผลต้องสาป', type: 'Attire' },
    ]
  },
  {
    id: 19,
    name: 'Baldum',
    role: 'Tank',
    color: 'emerald',
    img: './characters/Baldum_full.png',
    hotspots: [
      { id: 1901, character_id: 19, x: 25, y: 45, word: 'Monolithic Totem', mean: 'เสาหินโทเท็มยักษ์', type: 'Weapon' },
      { id: 1902, character_id: 19, x: 50, y: 35, word: 'Stone Carapace', mean: 'กระดองหินแกรนิตหนา', type: 'Armor' },
      { id: 1903, character_id: 19, x: 50, y: 60, word: 'Centaur Hooves', mean: 'กีบเท้าเซนทอร์หิน', type: 'Attire' },
      { id: 1904, character_id: 19, x: 75, y: 70, word: 'Seismic Stomp', mean: 'การกระทืบดินถล่ม', type: 'Magic/Skills' },
      { id: 1905, character_id: 19, x: 50, y: 16, word: 'Earth Horns', mean: 'เขาหินศิลาผา', type: 'Armor' },
    ]
  },
  {
    id: 20,
    name: 'Bright',
    role: 'Warrior / Fighter',
    color: 'amber',
    img: './characters/Bright_full.png',
    hotspots: [
      { id: 2001, character_id: 20, x: 25, y: 42, word: 'Spear of Light', mean: 'หอกประกายแสงศักดิ์สิทธิ์', type: 'Weapon' },
      { id: 2002, character_id: 20, x: 75, y: 45, word: 'Holy Blade', mean: 'ดาบสั้นแห่งความยุติธรรม', type: 'Weapon' },
      { id: 2003, character_id: 20, x: 50, y: 38, word: 'Light Vestment', mean: 'เสื้อคลุมผู้แทนพระเจ้า', type: 'Attire' },
      { id: 2004, character_id: 20, x: 50, y: 14, word: 'Radiant Halo', mean: 'รัศมีวงแหวนสวรรค์', type: 'Magic/Skills' },
      { id: 2005, character_id: 20, x: 48, y: 82, word: 'Plated Vambraces', mean: 'ปลอกแขนเกราะเหล็ก', type: 'Armor' },
    ]
  },
  {
    id: 21,
    name: 'Capheny',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Capheny_full.png',
    hotspots: [
      { id: 2101, character_id: 21, x: 75, y: 50, word: 'Pulse Cannon', mean: 'ปืนใหญ่พลังงานพัลส์', type: 'Weapon' },
      { id: 2102, character_id: 21, x: 25, y: 40, word: 'Battery Backpack', mean: 'แบตเตอรี่สะพายหลัง', type: 'Armor' },
      { id: 2103, character_id: 21, x: 50, y: 35, word: 'Military Uniform', mean: 'เครื่องแบบทหารบกสาว', type: 'Attire' },
      { id: 2104, character_id: 21, x: 50, y: 15, word: 'Beret', mean: 'หมวกเบเร่ต์ทหารเกียรติยศ', type: 'Accessories' },
      { id: 2105, character_id: 21, x: 82, y: 30, word: 'Laser Scope', mean: 'กล้องเล็งลำแสงเลเซอร์', type: 'Accessories' },
      { id: 2106, character_id: 21, x: 48, y: 85, word: 'Polished Boots', mean: 'รองเท้าบูทขัดมัน', type: 'Attire' },
    ]
  },
  {
    id: 22,
    name: 'Celica',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Celica_full.png',
    hotspots: [
      { id: 2201, character_id: 22, x: 78, y: 55, word: 'Siege Cannon', mean: 'ปืนใหญ่ตั้งป้อมยิงไกล', type: 'Weapon' },
      { id: 2202, character_id: 22, x: 50, y: 18, word: 'Mechanic Goggles', mean: 'แว่นตานิรภัยช่างกล', type: 'Accessories' },
      { id: 2203, character_id: 22, x: 50, y: 42, word: 'Tool Belt', mean: 'เข็มขัดกระเป๋าช่าง', type: 'Accessories' },
      { id: 2204, character_id: 22, x: 40, y: 52, word: 'Reinforced Overalls', mean: 'ชุดเอี๊ยมเสริมเกราะ', type: 'Attire' },
      { id: 2205, character_id: 22, x: 22, y: 35, word: 'Blast Plate', mean: 'แผ่นเกราะกันสะเก็ดระเบิด', type: 'Armor' },
    ]
  },
  {
    id: 23,
    name: 'Chaugnar',
    role: 'Tank',
    color: 'blue',
    img: './characters/Chaugnar_full.png',
    hotspots: [
      { id: 2301, character_id: 23, x: 50, y: 30, word: 'Chaos Trunk', mean: 'งวงแห่งความโกลาหล', type: 'Weapon' },
      { id: 2302, character_id: 23, x: 35, y: 25, word: 'Mystic Tusks', mean: 'งาช้างเวทมนตร์โบราณ', type: 'Accessories' },
      { id: 2303, character_id: 23, x: 50, y: 50, word: 'Nether Armor', mean: 'เกราะเนื้อหนังมิติมายา', type: 'Armor' },
      { id: 2304, character_id: 23, x: 75, y: 60, word: 'Cleansing Wave', mean: 'คลื่นคลายสถานะผิดปกติ', type: 'Magic/Skills' },
      { id: 2305, character_id: 23, x: 65, y: 38, word: 'Ancient Sigil', mean: 'อักขระเวทสลักบนผิว', type: 'Accessories' },
    ]
  },
  {
    id: 24,
    name: 'Cresht',
    role: 'Tank',
    color: 'cyan',
    img: './characters/Cresht_full.png',
    hotspots: [
      { id: 2401, character_id: 24, x: 22, y: 42, word: 'Coral Trident', mean: 'ตรีศูลปะการังสมุทร', type: 'Weapon' },
      { id: 2402, character_id: 24, x: 72, y: 28, word: 'Shell Pauldron', mean: 'เกราะไหล่เปลือกหอยยักษ์', type: 'Armor' },
      { id: 2403, character_id: 24, x: 50, y: 18, word: 'Abyssal Helm', mean: 'หมวกเกราะใต้สมุทรลึก', type: 'Armor' },
      { id: 2404, character_id: 24, x: 80, y: 60, word: 'Tidal Metamorphosis', mean: 'การแปลงร่างสัตว์ยักษ์สมุทร', type: 'Magic/Skills' },
      { id: 2405, character_id: 24, x: 30, y: 55, word: 'Fin Guards', mean: 'ครีบเกราะป้องกันข้อมือ', type: 'Accessories' },
    ]
  },
  {
    id: 25,
    name: 'D\'Arcy',
    role: 'Mage',
    color: 'indigo',
    img: './characters/D\'Arcy_full.png',
    hotspots: [
      { id: 2501, character_id: 25, x: 75, y: 45, word: 'Dimensional Cube', mean: 'ลูกบาศก์พลังมิติสวรรค์', type: 'Weapon' },
      { id: 2502, character_id: 25, x: 50, y: 38, word: 'Spatial Mantle', mean: 'ผ้าคลุมมิติเวลา', type: 'Attire' },
      { id: 2503, character_id: 25, x: 50, y: 16, word: 'Void Band', mean: 'แถบคาดศีรษะมิติดำมืด', type: 'Accessories' },
      { id: 2504, character_id: 25, x: 25, y: 35, word: 'Astral Rift', mean: 'รอยแยกมิติจักรวาล', type: 'Magic/Skills' },
      { id: 2505, character_id: 25, x: 50, y: 72, word: 'Silk Trousers', mean: 'กางเกงผ้าไหมเวทมนตร์', type: 'Attire' },
    ]
  },
  {
    id: 26,
    name: 'Dextra',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Dextra_full.png',
    hotspots: [
      { id: 2601, character_id: 26, x: 25, y: 48, word: 'Chainsaw Blade', mean: 'ดาบเลื่อยยนต์กระหายเลือด', type: 'Weapon' },
      { id: 2602, character_id: 26, x: 50, y: 40, word: 'Crimson Bodysuit', mean: 'ชุดแนบเนื้อสีแดงเพลิง', type: 'Attire' },
      { id: 2603, character_id: 26, x: 72, y: 45, word: 'Armored Vambrace', mean: 'สนับแขนเหล็กกล้า', type: 'Armor' },
      { id: 2604, character_id: 26, x: 78, y: 25, word: 'Blood Vampire Seal', mean: 'ผนึกสูบเลือดฟื้นฟูชีพ', type: 'Magic/Skills' },
      { id: 2605, character_id: 26, x: 48, y: 85, word: 'Spiked Stilettos', mean: 'รองเท้าส้นสูงปลายหนาม', type: 'Attire' },
    ]
  },
  {
    id: 27,
    name: 'Diao Chan',
    role: 'Mage',
    color: 'cyan',
    img: './characters/Diao chan_full.png',
    hotspots: [
      { id: 2701, character_id: 27, x: 25, y: 45, word: 'Frost Staff', mean: 'คทาดอกบัวน้ำแข็งหิมะ', type: 'Weapon' },
      { id: 2702, character_id: 27, x: 50, y: 42, word: 'Silk Hanfu', mean: 'ชุดฮั่นฝูผ้าไหมพลิ้วไหว', type: 'Attire' },
      { id: 2703, character_id: 27, x: 50, y: 15, word: 'Lotus Tiara', mean: 'รัดเกล้าดอกบัวคริสตัล', type: 'Accessories' },
      { id: 2704, character_id: 27, x: 75, y: 55, word: 'Blizzard Ring', mean: 'วงแหวนพายุหิมะเยือกแข็ง', type: 'Magic/Skills' },
      { id: 2705, character_id: 27, x: 68, y: 32, word: 'Feather Fan', mean: 'พัดขนนกยูงโบราณ', type: 'Accessories' },
    ]
  },
  {
    id: 28,
    name: 'Dirak',
    role: 'Mage',
    color: 'blue',
    img: './characters/Dirak_full.png',
    hotspots: [
      { id: 2801, character_id: 28, x: 25, y: 45, word: 'Energy Scepter', mean: 'คทาแกนพลังงานจักรวาล', type: 'Weapon' },
      { id: 2802, character_id: 28, x: 50, y: 40, word: 'Archmage Robes', mean: 'เสื้อคลุมจอมเวทสูงสุด', type: 'Attire' },
      { id: 2803, character_id: 28, x: 78, y: 50, word: 'Genesis Barrier', mean: 'กำแพงโล่กำเนิดมิติ', type: 'Magic/Skills' },
      { id: 2804, character_id: 28, x: 50, y: 16, word: 'Laser Crown', mean: 'มงกุฎแสงลำแสงสวรรค์', type: 'Accessories' },
      { id: 2805, character_id: 28, x: 70, y: 28, word: 'Magic Sigil', mean: 'สัญลักษณ์วงแหวนเวท', type: 'Magic/Skills' },
    ]
  },
  {
    id: 29,
    name: 'Eland\'orr',
    role: 'Carry / Marksman',
    color: 'emerald',
    img: './characters/Eland\'orr_full.png',
    hotspots: [
      { id: 2901, character_id: 29, x: 25, y: 45, word: 'Soul Lantern', mean: 'โคมไฟผีเสื้อวิญญาณ', type: 'Weapon' },
      { id: 2902, character_id: 29, x: 75, y: 45, word: 'Elven Bow', mean: 'คันธนูเอลฟ์ผู้พิทักษ์', type: 'Weapon' },
      { id: 2903, character_id: 29, x: 50, y: 40, word: 'Forest Tunic', mean: 'เสื้อทูนิคพงไพรอันงดงาม', type: 'Attire' },
      { id: 2904, character_id: 29, x: 78, y: 25, word: 'Butterfly Swarm', mean: 'ฝูงผีเสื้อเต้นระบำ', type: 'Magic/Skills' },
      { id: 2905, character_id: 29, x: 68, y: 52, word: 'Leather Quiver', mean: 'ซองใส่ลูกศรหนัง', type: 'Accessories' },
    ]
  },
  {
    id: 30,
    name: 'Elsu',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Elsu_full.png',
    hotspots: [
      { id: 3001, character_id: 30, x: 78, y: 48, word: 'Sniper Rifle', mean: 'ปืนซุ่มยิงไรเฟิลพิฆาต', type: 'Weapon' },
      { id: 3002, character_id: 30, x: 22, y: 45, word: 'Recon Sentinel', mean: 'อุปกรณ์เซนเซอร์สอดแนม', type: 'Accessories' },
      { id: 3003, character_id: 30, x: 45, y: 30, word: 'Camouflage Cloak', mean: 'ผ้าคลุมพรางตานักล่า', type: 'Attire' },
      { id: 3004, character_id: 30, x: 50, y: 42, word: 'Tactical Vest', mean: 'เสื้อกั๊กเกราะยุทธการ', type: 'Armor' },
      { id: 3005, character_id: 30, x: 38, y: 55, word: 'Combat Arm Guard', mean: 'เกราะป้องกันต้นแขน', type: 'Armor' },
    ]
  },
  {
    id: 31,
    name: 'Enzo',
    role: 'Assassin',
    color: 'purple',
    img: './characters/Enzo_full.png',
    hotspots: [
      { id: 3101, character_id: 31, x: 25, y: 48, word: 'Chain Hook', mean: 'โซ่ตะขอเกี่ยวพิพากษา', type: 'Weapon' },
      { id: 3102, character_id: 31, x: 50, y: 38, word: 'Inquisitor Coat', mean: 'เสื้อโค้ตผู้สอบสวนศาล', type: 'Attire' },
      { id: 3103, character_id: 31, x: 72, y: 42, word: 'Executioner Gloves', mean: 'ถุงมือเพชฌฆาตสีขาว', type: 'Accessories' },
      { id: 3104, character_id: 31, x: 78, y: 65, word: 'Judgment Seal', mean: 'ตราประทับพิพากษาโทษ', type: 'Magic/Skills' },
      { id: 3105, character_id: 31, x: 48, y: 82, word: 'Leather Straps', mean: 'สายรัดหนังพกอาวุธ', type: 'Accessories' },
    ]
  },
  {
    id: 32,
    name: 'Errol',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Errol_full.png',
    hotspots: [
      { id: 3201, character_id: 32, x: 25, y: 45, word: 'Demon Arm', mean: 'แขนปีศาจกลายพันธุ์', type: 'Weapon' },
      { id: 3202, character_id: 32, x: 78, y: 45, word: 'Blood Scythe', mean: 'เคียวโลหิตกระหายเลือด', type: 'Weapon' },
      { id: 3203, character_id: 32, x: 50, y: 38, word: 'Ragged Trenchcoat', mean: 'เสื้อเทรนช์โค้ตขาดวิ่น', type: 'Attire' },
      { id: 3204, character_id: 32, x: 50, y: 18, word: 'Demonic Eye', mean: 'เนตรปีศาจสีแดงก่ำ', type: 'Accessories' },
      { id: 3205, character_id: 32, x: 70, y: 70, word: 'Dark Resonance', mean: 'คลื่นสั่นพ้องแห่งความมืด', type: 'Magic/Skills' },
    ]
  },
  {
    id: 33,
    name: 'Fennik',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Fennik_full.png',
    hotspots: [
      { id: 3301, character_id: 33, x: 25, y: 42, word: 'Giant Slingshot', mean: 'หนังสติ๊กยักษ์สายฟ้า', type: 'Weapon' },
      { id: 3302, character_id: 33, x: 50, y: 16, word: 'Fox Goggles', mean: 'แว่นตานิรภัยจิ้งจอก', type: 'Accessories' },
      { id: 3303, character_id: 33, x: 50, y: 32, word: 'Scarf of Swiftness', mean: 'ผ้าพันคอแห่งความเร็ว', type: 'Attire' },
      { id: 3304, character_id: 33, x: 48, y: 50, word: 'Explorer Vest', mean: 'เสื้อกั๊กนักสำรวจตัวจิ๋ว', type: 'Attire' },
      { id: 3305, character_id: 33, x: 75, y: 35, word: 'Lightning Thief Aura', mean: 'ออร่าขโมยสายฟ้าฟาด', type: 'Magic/Skills' },
    ]
  },
  {
    id: 34,
    name: 'Florentino',
    role: 'Warrior / Fighter',
    color: 'purple',
    img: './characters/Florentino_full.png',
    hotspots: [
      { id: 3401, character_id: 34, x: 25, y: 45, word: 'Fencing Rapier', mean: 'ดาบเรียวฟันดาบสากล', type: 'Weapon' },
      { id: 3402, character_id: 34, x: 72, y: 38, word: 'Red Rose', mean: 'ดอกกุหลาบแดงแห่งการดวล', type: 'Accessories' },
      { id: 3403, character_id: 34, x: 50, y: 35, word: 'Aristocrat Tunic', mean: 'เสื้อทูนิคขุนนางชั้นสูง', type: 'Attire' },
      { id: 3404, character_id: 34, x: 40, y: 25, word: 'Duelist Cape', mean: 'ผ้าคลุมสั้นนักดาบเอก', type: 'Attire' },
      { id: 3405, character_id: 34, x: 50, y: 78, word: 'Riding Boots', mean: 'รองเท้าบูทหนังขี่ม้า', type: 'Attire' },
    ]
  },
  {
    id: 35,
    name: 'Gildur',
    role: 'Tank',
    color: 'amber',
    img: './characters/Gildur_full.png',
    hotspots: [
      { id: 3501, character_id: 35, x: 25, y: 45, word: 'Golden Gauntlet', mean: 'สนับมือทองคำบริสุทธิ์', type: 'Weapon' },
      { id: 3502, character_id: 35, x: 50, y: 15, word: 'Golden Crown', mean: 'มงกุฎราชาทองคำแท้', type: 'Accessories' },
      { id: 3503, character_id: 35, x: 50, y: 35, word: 'Gilded Cuirass', mean: 'เกราะอกเคลือบทองคำ', type: 'Armor' },
      { id: 3504, character_id: 35, x: 75, y: 45, word: 'Midas Touch', mean: 'สัมผัสทองคำสะกดวิญญาณ', type: 'Magic/Skills' },
      { id: 3505, character_id: 35, x: 48, y: 80, word: 'Chariot Spikes', mean: 'หนามเกราะรถศึกทองคำ', type: 'Armor' },
    ]
  },
  {
    id: 36,
    name: 'Grakk',
    role: 'Tank',
    color: 'slate',
    img: './characters/Grakk_full.png',
    hotspots: [
      { id: 3601, character_id: 36, x: 25, y: 45, word: 'Soul Hook', mean: 'ตะขอโซ่ดึงวิญญาณ', type: 'Weapon' },
      { id: 3602, character_id: 36, x: 75, y: 45, word: 'Heavy Cleaver', mean: 'มีดปังตอยักษ์สับเนื้อ', type: 'Weapon' },
      { id: 3603, character_id: 36, x: 50, y: 50, word: 'Gluttony Maw', mean: 'ปากท้องปีศาจสูบวิญญาณ', type: 'Attire' },
      { id: 3604, character_id: 36, x: 50, y: 22, word: 'Spiked Iron Collar', mean: 'ปลอกคอเหล็กหนามยักษ์', type: 'Armor' },
      { id: 3605, character_id: 36, x: 78, y: 65, word: 'World Devourer Aura', mean: 'พลังกลืนกินสรรพสิ่ง', type: 'Magic/Skills' },
    ]
  },
  {
    id: 37,
    name: 'Hayate',
    role: 'Carry / Marksman',
    color: 'purple',
    img: './characters/Hayate_full.png',
    hotspots: [
      { id: 3701, character_id: 37, x: 25, y: 45, word: 'Shuriken Darts', mean: 'ดาวกระจายคุไนสายมืด', type: 'Weapon' },
      { id: 3702, character_id: 37, x: 50, y: 22, word: 'Dragon Veil', mean: 'ผ้าคลุมหน้าลายนินจามังกร', type: 'Attire' },
      { id: 3703, character_id: 37, x: 50, y: 40, word: 'Shinobi Tunic', mean: 'ชุดเสื้อนินจาเงาเพลิง', type: 'Attire' },
      { id: 3704, character_id: 37, x: 75, y: 48, word: 'Shadow Kunai', mean: 'มีดสั้นคุไนอาบเงา', type: 'Weapon' },
      { id: 3705, character_id: 37, x: 75, y: 25, word: 'Phantom Dash Trail', mean: 'เงาวาร์ปพริบตาสังหาร', type: 'Magic/Skills' },
    ]
  },

  // --- Part 2: Heroes 38 to 75 ---
  {
    id: 38,
    name: 'Iggy',
    role: 'Mage',
    color: 'red',
    img: './characters/Iggy_full.png',
    hotspots: [
      { id: 3801, character_id: 38, x: 25, y: 45, word: 'Flame Orb', mean: 'ลูกแก้วเพลิงปะทุ', type: 'Weapon' },
      { id: 3802, character_id: 38, x: 50, y: 38, word: 'Aristocrat Coat', mean: 'เสื้อโค้ตขุนนางเพลิง', type: 'Attire' },
      { id: 3803, character_id: 38, x: 50, y: 16, word: 'Ember Cat Ears', mean: 'หูแมวเพลิงเปลวไฟ', type: 'Accessories' },
      { id: 3804, character_id: 38, x: 75, y: 35, word: 'Magma Burst', mean: 'ระเบิดแมกมาเพลิงพิโรธ', type: 'Magic/Skills' },
      { id: 3805, character_id: 38, x: 72, y: 45, word: 'Fireproof Gloves', mean: 'ถุงมือกันความร้อนสูง', type: 'Accessories' },
    ]
  },
  {
    id: 39,
    name: 'Ignis',
    role: 'Mage',
    color: 'red',
    img: './characters/Ignis_full.png',
    hotspots: [
      { id: 3901, character_id: 39, x: 25, y: 45, word: 'Flame Staff', mean: 'ไม้เท้าเพลิงศักดิ์สิทธิ์', type: 'Weapon' },
      { id: 3902, character_id: 39, x: 50, y: 42, word: 'Wizard Robe', mean: 'เสื้อคลุมนักบวชไฟโบราณ', type: 'Attire' },
      { id: 3903, character_id: 39, x: 72, y: 48, word: 'Holy Scriptures', mean: 'พระคัมภีร์เพลิงศักดิ์สิทธิ์', type: 'Accessories' },
      { id: 3904, character_id: 39, x: 50, y: 22, word: 'White Beard', mean: 'หนวดเคราสีขาวยาว', type: 'Accessories' },
      { id: 3905, character_id: 39, x: 78, y: 28, word: 'Sacred Flame Seal', mean: 'มนต์ตราผนึกเพลิงสวรรค์', type: 'Magic/Skills' },
    ]
  },
  {
    id: 40,
    name: 'Ilumia',
    role: 'Mage',
    color: 'amber',
    img: './characters/Illumia_full.png',
    hotspots: [
      { id: 4001, character_id: 40, x: 25, y: 45, word: 'Divine Scepter', mean: 'คทาแสงเทพสวรรค์', type: 'Weapon' },
      { id: 4002, character_id: 40, x: 50, y: 16, word: 'Goddess Blindfold', mean: 'ผ้าปิดตาเทพธิดา', type: 'Accessories' },
      { id: 4003, character_id: 40, x: 50, y: 45, word: 'Celestial Gown', mean: 'ชุดราตรีแห่งสรวงสวรรค์', type: 'Attire' },
      { id: 4004, character_id: 40, x: 78, y: 25, word: 'Light of Judgment', mean: 'ลำแสงพิพากษาทั่วหล้า', type: 'Magic/Skills' },
      { id: 4005, character_id: 40, x: 65, y: 28, word: 'Golden Pauldron', mean: 'เกราะไหล่ทองคำแห่งแสง', type: 'Armor' },
    ]
  },
  {
    id: 41,
    name: 'Ishar',
    role: 'Mage',
    color: 'pink',
    img: './characters/Ishar_full.png',
    hotspots: [
      { id: 4101, character_id: 41, x: 25, y: 45, word: 'Magic Wand', mean: 'ไม้กายสิทธิ์ดวงดาว', type: 'Weapon' },
      { id: 4102, character_id: 41, x: 75, y: 65, word: 'Furball Companion', mean: 'สัตว์เลี้ยงขนปุยเฟอร์บอล', type: 'Magic/Skills' },
      { id: 4103, character_id: 41, x: 50, y: 15, word: 'School Beret', mean: 'หมวกเบเร่ต์นักเรียนเวท', type: 'Accessories' },
      { id: 4104, character_id: 41, x: 50, y: 45, word: 'Plaid Dress', mean: 'ชุดกระโปรงลายสก็อต', type: 'Attire' },
      { id: 4105, character_id: 41, x: 72, y: 35, word: 'Mana Barrier', mean: 'โล่บาเรียพลังเวทมนตร์', type: 'Magic/Skills' },
    ]
  },
  {
    id: 42,
    name: 'Jinna',
    role: 'Mage',
    color: 'amber',
    img: './characters/Jinna_full.png',
    hotspots: [
      { id: 4201, character_id: 42, x: 25, y: 45, word: 'Prayer Beads', mean: 'ลูกประคำพลังจิตวิญญาณ', type: 'Weapon' },
      { id: 4202, character_id: 42, x: 50, y: 40, word: 'Monk Robes', mean: 'จีวรพระสงฆ์สายรบ', type: 'Attire' },
      { id: 4203, character_id: 42, x: 75, y: 40, word: 'Nirvana Aura', mean: 'ออร่าตรัสรู้ธรรมบรรลุ', type: 'Magic/Skills' },
      { id: 4204, character_id: 42, x: 50, y: 22, word: 'Golden Talisman', mean: 'ผ้ายันต์มงคลทองคำ', type: 'Accessories' },
      { id: 4205, character_id: 42, x: 72, y: 55, word: 'Armored Bracers', mean: 'ปลอกแขนสนับสมาธิ', type: 'Armor' },
    ]
  },
  {
    id: 43,
    name: 'Kahlii',
    role: 'Mage',
    color: 'purple',
    img: './characters/Kahlii_full.png',
    hotspots: [
      { id: 4301, character_id: 43, x: 25, y: 45, word: 'Ghost Blades', mean: 'มีดบินวิญญาณมารผยอง', type: 'Weapon' },
      { id: 4302, character_id: 43, x: 75, y: 40, word: 'Silhouette Arms', mean: 'เงาร่างแขนกลหลายกร', type: 'Magic/Skills' },
      { id: 4303, character_id: 43, x: 50, y: 45, word: 'Goddess Shroud', mean: 'ส่าหรีเทวีแห่งความตาย', type: 'Attire' },
      { id: 4304, character_id: 43, x: 50, y: 15, word: 'Skull Crown', mean: 'มงกุฎหัวกะโหลกทมิฬ', type: 'Accessories' },
      { id: 4305, character_id: 43, x: 78, y: 25, word: 'Spiritual Missiles', mean: 'กระสุนวิญญาณสาดส่อง', type: 'Magic/Skills' },
    ]
  },
  {
    id: 44,
    name: 'Keera',
    role: 'Assassin',
    color: 'purple',
    img: './characters/Keera_full.png',
    hotspots: [
      { id: 4401, character_id: 44, x: 25, y: 48, word: 'Shadow Scissors', mean: 'กรรไกรเงายักษ์ตัดวิญญาณ', type: 'Weapon' },
      { id: 4402, character_id: 44, x: 50, y: 45, word: 'Lolita Dress', mean: 'ชุดโลลิต้าโกธิคสีดำ', type: 'Attire' },
      { id: 4403, character_id: 44, x: 50, y: 15, word: 'Triangle Witch Hat', mean: 'หมวกทรงแหลมมนตรา', type: 'Accessories' },
      { id: 4404, character_id: 44, x: 75, y: 35, word: 'Shadow Portal', mean: 'ประตูมิติดำดิ่งกำแพง', type: 'Magic/Skills' },
      { id: 4405, character_id: 44, x: 50, y: 25, word: 'Ribbon Choker', mean: 'ปลอกคอริบบิ้นกำมะหยี่', type: 'Accessories' },
    ]
  },
  {
    id: 45,
    name: 'Kil\'Groth',
    role: 'Warrior / Fighter',
    color: 'cyan',
    img: './characters/Kil\'Groth_full.png',
    hotspots: [
      { id: 4501, character_id: 45, x: 25, y: 45, word: 'Sea Beast Blade', mean: 'ดาบกระดูกอสูรทะเลลึก', type: 'Weapon' },
      { id: 4502, character_id: 45, x: 50, y: 38, word: 'Abyssal Scales', mean: 'เกล็ดเกราะปลาใต้สมุทร', type: 'Armor' },
      { id: 4503, character_id: 45, x: 72, y: 30, word: 'Fin Dorsal', mean: 'ครีบหลังสัตว์ทะเลยักษ์', type: 'Accessories' },
      { id: 4504, character_id: 45, x: 78, y: 55, word: 'Frenzy Wave', mean: 'คลื่นคลั่งไร้การควบคุม', type: 'Magic/Skills' },
      { id: 4505, character_id: 45, x: 35, y: 60, word: 'Spiked Bracers', mean: 'สนับแขนหนามปะการัง', type: 'Armor' },
    ]
  },
  {
    id: 46,
    name: 'Kriknak',
    role: 'Assassin',
    color: 'purple',
    img: './characters/Kriknak_full.png',
    hotspots: [
      { id: 4601, character_id: 46, x: 25, y: 45, word: 'Insectoid Scythes', mean: 'เคียวกรงเล็บแมลงมรณะ', type: 'Weapon' },
      { id: 4602, character_id: 46, x: 50, y: 38, word: 'Chitin Exoskeleton', mean: 'เปลือกเกราะไคตินแข็งแกร่ง', type: 'Armor' },
      { id: 4603, character_id: 46, x: 50, y: 16, word: 'Beetle Horns', mean: 'เขาด้วงยักษ์พิฆาต', type: 'Armor' },
      { id: 4604, character_id: 46, x: 75, y: 25, word: 'Insect Wings', mean: 'ปีกแมลงบินโฉบเฉี่ยว', type: 'Accessories' },
      { id: 4605, character_id: 46, x: 78, y: 65, word: 'Venom Stinger', mean: 'เหล็กในพิษร้ายสังหาร', type: 'Magic/Skills' },
    ]
  },
  {
    id: 47,
    name: 'Krizzix',
    role: 'Support',
    color: 'emerald',
    img: './characters/Krizzix_full.png',
    hotspots: [
      { id: 4701, character_id: 47, x: 25, y: 45, word: 'Camouflage Staff', mean: 'ไม้เท้าอำพรางตัวพงไพร', type: 'Weapon' },
      { id: 4702, character_id: 47, x: 50, y: 38, word: 'Chameleon Scales', mean: 'เกล็ดกิ้งก่าเปลี่ยนสี', type: 'Armor' },
      { id: 4703, character_id: 47, x: 50, y: 16, word: 'Tribal Headdress', mean: 'ขนนกประดับศีรษะชนเผ่า', type: 'Accessories' },
      { id: 4704, character_id: 47, x: 75, y: 40, word: 'Invisibility Cloak', mean: 'ม่านพลังล่องหนหมู่', type: 'Magic/Skills' },
      { id: 4705, character_id: 47, x: 78, y: 65, word: 'Gravitational Pull', mean: 'แรงดึงดูดรวมศูนย์กลาง', type: 'Magic/Skills' },
    ]
  },
  {
    id: 48,
    name: 'Lauriel',
    role: 'Mage',
    color: 'blue',
    img: './characters/Lauriel_full.png',
    hotspots: [
      { id: 4801, character_id: 48, x: 20, y: 30, word: 'Angelic Wings', mean: 'ปีกเทวทูตหกปีกบริสุทธิ์', type: 'Accessories' },
      { id: 4802, character_id: 48, x: 50, y: 42, word: 'Holy Robes', mean: 'เสื้อคลุมนักบวชหญิงสวรรค์', type: 'Attire' },
      { id: 4803, character_id: 48, x: 50, y: 14, word: 'Golden Halo', mean: 'วงแหวนทองคำแห่งทวยเทพ', type: 'Accessories' },
      { id: 4804, character_id: 48, x: 75, y: 60, word: 'Divine Circle', mean: 'วงแหวนเวทชำระล้างบาป', type: 'Magic/Skills' },
      { id: 4805, character_id: 48, x: 78, y: 35, word: 'Sacred Orbs', mean: 'ลูกแก้วประกายแสงเทวา', type: 'Weapon' },
    ]
  },
  {
    id: 49,
    name: 'Laville',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Laville_full.png',
    hotspots: [
      { id: 4901, character_id: 49, x: 25, y: 48, word: 'Dual Blasters', mean: 'ปืนคู่ประกายแสงความเร็วสูง', type: 'Weapon' },
      { id: 4902, character_id: 49, x: 50, y: 38, word: 'Lightguard Coat', mean: 'เสื้อโค้ตผู้พิทักษ์วิหาร', type: 'Attire' },
      { id: 4903, character_id: 49, x: 50, y: 16, word: 'Visor Headset', mean: 'แว่นสายตากึ่งหูฟังเล็งเป้า', type: 'Accessories' },
      { id: 4904, character_id: 49, x: 78, y: 35, word: 'Shield Generator', mean: 'เครื่องสร้างโล่แสงคุ้มกัน', type: 'Magic/Skills' },
      { id: 4905, character_id: 49, x: 50, y: 55, word: 'Holster Belt', mean: 'ซองปืนเข็มขัดยุทธวิธี', type: 'Accessories' },
    ]
  },
  {
    id: 50,
    name: 'Liliana',
    role: 'Mage',
    color: 'pink',
    img: './characters/Liliana_full.png',
    hotspots: [
      { id: 5001, character_id: 50, x: 22, y: 60, word: 'Nine Tails', mean: 'เก้าหางจิ้งจอกสวรรค์', type: 'Magic/Skills' },
      { id: 5002, character_id: 50, x: 75, y: 45, word: 'Divination Wand', mean: 'คทาทำนายชะตาลายคราม', type: 'Weapon' },
      { id: 5003, character_id: 50, x: 50, y: 42, word: 'Priestess Kimono', mean: 'ชุดกิโมโนมิโกะจิ้งจอก', type: 'Attire' },
      { id: 5004, character_id: 50, x: 50, y: 16, word: 'Fox Ears', mean: 'หูจิ้งจอกสวรรค์สีขาว', type: 'Accessories' },
      { id: 5005, character_id: 50, x: 72, y: 25, word: 'Reiki Orb', mean: 'ลูกแก้วพลังเรกิบำเพ็ญ', type: 'Magic/Skills' },
    ]
  },
  {
    id: 51,
    name: 'Lindis',
    role: 'Carry / Marksman',
    color: 'indigo',
    img: './characters/Lindis_full.png',
    hotspots: [
      { id: 5101, character_id: 51, x: 25, y: 45, word: 'Lunar Bow', mean: 'คันธนูจันทราสีเงินยวง', type: 'Weapon' },
      { id: 5102, character_id: 51, x: 50, y: 40, word: 'Moonlight Shroud', mean: 'ผ้าคลุมอาบแสงจันทร์', type: 'Attire' },
      { id: 5103, character_id: 51, x: 50, y: 16, word: 'Silver Headdress', mean: 'รัดเกล้าเงินแห่งดวงจันทร์', type: 'Accessories' },
      { id: 5104, character_id: 51, x: 75, y: 65, word: 'Spirit Trap', mean: 'กับดักวิญญาณดวงจันทร์', type: 'Weapon' },
      { id: 5105, character_id: 51, x: 70, y: 45, word: 'Quiver of Moonbeams', mean: 'ซองลูกศรแสงจันทร์เพ็ญ', type: 'Accessories' },
    ]
  },
  {
    id: 52,
    name: 'Lorion',
    role: 'Mage',
    color: 'purple',
    img: './characters/Lorion_full.png',
    hotspots: [
      { id: 5201, character_id: 52, x: 25, y: 45, word: 'Dark Lightning Orb', mean: 'ลูกแก้วสายฟ้าทมิฬ', type: 'Weapon' },
      { id: 5202, character_id: 52, x: 50, y: 38, word: 'Sorcerer Mantle', mean: 'ผ้าคลุมจอมเวทแห่งเงา', type: 'Attire' },
      { id: 5203, character_id: 52, x: 75, y: 35, word: 'Floating Rune Ring', mean: 'วงแหวนอักขระลอยฟ้า', type: 'Magic/Skills' },
      { id: 5204, character_id: 52, x: 50, y: 15, word: 'Void Crown', mean: 'มงกุฎความว่างเปล่า', type: 'Accessories' },
      { id: 5205, character_id: 52, x: 78, y: 65, word: 'Electric Surge', mean: 'พลังประจุไฟฟ้าช็อตกระแทก', type: 'Magic/Skills' },
    ]
  },
  {
    id: 53,
    name: 'Lu Bu',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Lu Bu_full.png',
    hotspots: [
      { id: 5301, character_id: 53, x: 25, y: 45, word: 'Sky Piercer Halberd', mean: 'ทวนกรีดฟ้าสะท้านภพ', type: 'Weapon' },
      { id: 5302, character_id: 53, x: 72, y: 28, word: 'Dragon Pauldrons', mean: 'เกราะไหล่ลายมังกรผงาด', type: 'Armor' },
      { id: 5303, character_id: 53, x: 50, y: 14, word: 'Pheasant Plume Crown', mean: 'มงกุฎขนหางไก่ฟ้าศึก', type: 'Accessories' },
      { id: 5304, character_id: 53, x: 78, y: 55, word: 'Blood Rage Aura', mean: 'ออร่าโทสะโลหิตคลั่ง', type: 'Magic/Skills' },
      { id: 5305, character_id: 53, x: 50, y: 65, word: 'Battle Skirt', mean: 'เกราะกระโปรงศึกโบราณ', type: 'Armor' },
    ]
  },
  {
    id: 54,
    name: 'Lumburr',
    role: 'Tank',
    color: 'emerald',
    img: './characters/Lumburr_full.png',
    hotspots: [
      { id: 5401, character_id: 54, x: 25, y: 45, word: 'Stone Fists', mean: 'กำปั้นหินผาทรงพลัง', type: 'Weapon' },
      { id: 5402, character_id: 54, x: 50, y: 35, word: 'Granite Chestplate', mean: 'เกราะอกศิลาแกรนิตยักษ์', type: 'Armor' },
      { id: 5403, character_id: 54, x: 75, y: 30, word: 'Earth Crags', mean: 'สันหินงอกแนวป้องกันหลัง', type: 'Armor' },
      { id: 5404, character_id: 54, x: 75, y: 65, word: 'Earth Splitter', mean: 'เพลงหมัดแยกแผ่นดินไหว', type: 'Magic/Skills' },
      { id: 5405, character_id: 54, x: 50, y: 22, word: 'Moss Beard', mean: 'เคราตะไคร่น้ำบรรพกาล', type: 'Accessories' },
    ]
  },
  {
    id: 55,
    name: 'Maloch',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Maloch_full.png',
    hotspots: [
      { id: 5501, character_id: 55, x: 22, y: 45, word: 'Cleaver of Damnation', mean: 'ดาบยักษ์พิพากษานรก', type: 'Weapon' },
      { id: 5502, character_id: 55, x: 78, y: 25, word: 'Hellfire Wings', mean: 'ปีกค้างคาวเพลิงนรกานต์', type: 'Accessories' },
      { id: 5503, character_id: 55, x: 50, y: 15, word: 'Demon Horns', mean: 'เขาจอมมารปีศาจนรก', type: 'Accessories' },
      { id: 5504, character_id: 55, x: 50, y: 40, word: 'Nether Plate Armor', mean: 'ชุดเกราะเหล็กอเวจี', type: 'Armor' },
      { id: 5505, character_id: 55, x: 75, y: 65, word: 'Shockwave Slam', mean: 'ท่ากระโดดฟันสะเทือนโลกันตร์', type: 'Magic/Skills' },
    ]
  },
  {
    id: 56,
    name: 'Marja',
    role: 'Mage',
    color: 'purple',
    img: './characters/Marja_full.png',
    hotspots: [
      { id: 5601, character_id: 56, x: 25, y: 45, word: 'Worm Spirits', mean: 'หนอนแมลงวิญญาณกาฝาก', type: 'Magic/Skills' },
      { id: 5602, character_id: 56, x: 50, y: 42, word: 'Cursed Gown', mean: 'ชุดราตรีแม่มดต้องคำสาป', type: 'Attire' },
      { id: 5603, character_id: 56, x: 50, y: 16, word: 'Abyssal Crown', mean: 'รัดเกล้าแห่งห้วงลึกทมิฬ', type: 'Accessories' },
      { id: 5604, character_id: 56, x: 75, y: 35, word: 'Ghostform Veil', mean: 'ร่างวิญญาณเงาอมตะ', type: 'Magic/Skills' },
      { id: 5605, character_id: 56, x: 72, y: 55, word: 'Claw Rings', mean: 'แหวนกรงเล็บแหลมคม', type: 'Weapon' },
    ]
  },
  {
    id: 57,
    name: 'Max',
    role: 'Tank',
    color: 'amber',
    img: './characters/Max_full.png',
    hotspots: [
      { id: 5701, character_id: 57, x: 25, y: 45, word: 'Robotic Arms', mean: 'แขนกลอัจฉริยะประดิษฐ์', type: 'Weapon' },
      { id: 5702, character_id: 57, x: 75, y: 35, word: 'Jet Backpack', mean: 'เจ็ทแพ็คขับเคลื่อนไอพ่น', type: 'Armor' },
      { id: 5703, character_id: 57, x: 50, y: 16, word: 'Inventor Goggles', mean: 'แว่นตากันลมสิ่งประดิษฐ์', type: 'Accessories' },
      { id: 5704, character_id: 57, x: 50, y: 45, word: 'Insulated Jumpsuit', mean: 'ชุดหมีฉนวนกันกระแสไฟ', type: 'Attire' },
      { id: 5705, character_id: 57, x: 78, y: 60, word: 'Tracking Radar', mean: 'เรดาร์ติดตามเป้าหมายทั่วแมพ', type: 'Magic/Skills' },
    ]
  },
  {
    id: 58,
    name: 'Mganga',
    role: 'Mage',
    color: 'emerald',
    img: './characters/Mganga_full.png',
    hotspots: [
      { id: 5801, character_id: 58, x: 25, y: 45, word: 'Voodoo Staff', mean: 'ไม้เท้าวูดูหัวกะโหลก', type: 'Weapon' },
      { id: 5802, character_id: 58, x: 72, y: 48, word: 'Poison Flask', mean: 'ขวดแก้วบรรจุยาพิษเขียว', type: 'Weapon' },
      { id: 5803, character_id: 58, x: 50, y: 18, word: 'Jester Hood', mean: 'หมวกฮู้ดตัวตลกพิษ', type: 'Attire' },
      { id: 5804, character_id: 58, x: 50, y: 45, word: 'Toxic Robes', mean: 'เสื้อคลุมนักเล่นแร่แปรธาตุ', type: 'Attire' },
      { id: 5805, character_id: 58, x: 75, y: 25, word: 'Toxic Detonation', mean: 'ระเบิดพิษกัดกร่อนหมู่', type: 'Magic/Skills' },
    ]
  },
  {
    id: 59,
    name: 'Mina',
    role: 'Tank',
    color: 'purple',
    img: './characters/Mina_full.png',
    hotspots: [
      { id: 5901, character_id: 59, x: 25, y: 42, word: 'Death Scythe', mean: 'เคียวมัจจุราชกระชากชีพ', type: 'Weapon' },
      { id: 5902, character_id: 59, x: 50, y: 15, word: 'Spiked Crown', mean: 'มงกุฎหนามราชินีแห่งความมืด', type: 'Accessories' },
      { id: 5903, character_id: 59, x: 50, y: 38, word: 'Corset Armor', mean: 'คอร์เซ็ตเกราะเหล็กสีม่วง', type: 'Armor' },
      { id: 5904, character_id: 59, x: 78, y: 50, word: 'Taunt Aura', mean: 'ออร่ายั่วยุบังคับโจมตี', type: 'Magic/Skills' },
      { id: 5905, character_id: 59, x: 48, y: 80, word: 'Armored Greaves', mean: 'สนับแข้งเกราะหนามแหลม', type: 'Armor' },
    ]
  },
  {
    id: 60,
    name: 'Moren',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Moren_full.png',
    hotspots: [
      { id: 6001, character_id: 60, x: 75, y: 48, word: 'Heavy Shotgun', mean: 'ปืนลูกซองลำกล้องยักษ์', type: 'Weapon' },
      { id: 6002, character_id: 60, x: 50, y: 42, word: 'Blacksmith Apron', mean: 'ผ้ากันเปื้อนช่างตีเหล็ก', type: 'Attire' },
      { id: 6003, character_id: 60, x: 50, y: 16, word: 'Welding Goggles', mean: 'แว่นตาเชื่อมโลหะหนา', type: 'Accessories' },
      { id: 6004, character_id: 60, x: 25, y: 45, word: 'Magnetic Grenade', mean: 'ระเบิดแม่เหล็กดูดศัตรู', type: 'Weapon' },
      { id: 6005, character_id: 60, x: 35, y: 55, word: 'Iron Bracers', mean: 'ปลอกแขนเหล็กกล้ากันกระสุน', type: 'Armor' },
    ]
  },
  {
    id: 61,
    name: 'Mortos',
    role: 'Warrior / Fighter',
    color: 'blue',
    img: './characters/Mortos_full.png',
    hotspots: [
      { id: 6101, character_id: 61, x: 25, y: 45, word: 'Holy Blade', mean: 'ดาบศักดิ์สิทธิ์กำราบมาร', type: 'Weapon' },
      { id: 6102, character_id: 61, x: 75, y: 45, word: 'Lion Crest Shield', mean: 'โล่ตราสิงห์ราชัน', type: 'Armor' },
      { id: 6103, character_id: 61, x: 50, y: 38, word: 'Knight Plate Armor', mean: 'เกราะเหล็กแผ่นอัศวินศักดิ์สิทธิ์', type: 'Armor' },
      { id: 6104, character_id: 61, x: 50, y: 16, word: 'Crowned Visor', mean: 'หมวกเกราะเหล็กยอดมงกุฎ', type: 'Armor' },
      { id: 6105, character_id: 61, x: 75, y: 70, word: 'Sword Vortex', mean: 'พายุดาบศักดิ์สิทธิ์หมุนวน', type: 'Magic/Skills' },
    ]
  },
  {
    id: 62,
    name: 'Murad',
    role: 'Assassin',
    color: 'amber',
    img: './characters/Murad_full.png',
    hotspots: [
      { id: 6201, character_id: 62, x: 25, y: 45, word: 'Blade of Time', mean: 'ดาบโค้งกาลเวลาทะเลทราย', type: 'Weapon' },
      { id: 6202, character_id: 62, x: 72, y: 48, word: 'Sand Hourglass', mean: 'นาฬิกาทรายกุมเวลา', type: 'Accessories' },
      { id: 6203, character_id: 62, x: 50, y: 16, word: 'Desert Turban', mean: 'ผ้าโพกหัวชนเผ่าเร่ร่อน', type: 'Attire' },
      { id: 6204, character_id: 62, x: 50, y: 40, word: 'Nomad Tunic', mean: 'ชุดทูนิคทะเลทรายพริ้วไหว', type: 'Attire' },
      { id: 6205, character_id: 62, x: 78, y: 28, word: 'Temporal Rift', mean: 'รอยแยกมิติกาลเวลาไร้รอยแผล', type: 'Magic/Skills' },
    ]
  },
  {
    id: 63,
    name: 'Nakroth',
    role: 'Assassin',
    color: 'purple',
    img: './characters/Nakroth_full.png',
    hotspots: [
      { id: 6301, character_id: 63, x: 25, y: 45, word: 'Crescent Blades', mean: 'มีดดาบคู่จันทร์เสี้ยวประหาร', type: 'Weapon' },
      { id: 6302, character_id: 63, x: 50, y: 16, word: 'Judgment Helm', mean: 'หมวกเกราะผู้พิพากษานรก', type: 'Armor' },
      { id: 6303, character_id: 63, x: 50, y: 38, word: 'Nether Armor', mean: 'ชุดเกราะนักรบใต้พิภพ', type: 'Armor' },
      { id: 6304, character_id: 63, x: 78, y: 45, word: 'Spectral Dash', mean: 'การพุ่งทะลวงความเร็วแสง', type: 'Magic/Skills' },
      { id: 6305, character_id: 63, x: 50, y: 65, word: 'Chain Faulds', mean: 'เกราะโซ่ห้อยสะโพก', type: 'Armor' },
    ]
  },
  {
    id: 64,
    name: 'Natalya',
    role: 'Mage',
    color: 'emerald',
    img: './characters/Natalya_full.png',
    hotspots: [
      { id: 6401, character_id: 64, x: 25, y: 45, word: 'Toxic Familiars', mean: 'ภูตวิญญาณพิษเขียวมรกต', type: 'Weapon' },
      { id: 6402, character_id: 64, x: 78, y: 35, word: 'Poison Beam', mean: 'ลำแสงพิษมรณะสังหาร', type: 'Magic/Skills' },
      { id: 6403, character_id: 64, x: 50, y: 40, word: 'Sorceress Corset', mean: 'คอร์เซ็ตผ้าไหมแม่มดร้าย', type: 'Attire' },
      { id: 6404, character_id: 64, x: 50, y: 16, word: 'Horned Veil', mean: 'ผ้าคลุมผมประดับเขาสัตว์', type: 'Accessories' },
      { id: 6405, character_id: 64, x: 72, y: 55, word: 'Venom Gloves', mean: 'ถุงมือยาวอาบมนตร์พิษ', type: 'Accessories' },
    ]
  },
  {
    id: 65,
    name: 'Omega',
    role: 'Tank',
    color: 'slate',
    img: './characters/Omega_full.png',
    hotspots: [
      { id: 6501, character_id: 65, x: 25, y: 45, word: 'Mecha Arms', mean: 'แขนกลหุ่นรบทำลายล้าง', type: 'Weapon' },
      { id: 6502, character_id: 65, x: 75, y: 45, word: 'Core Shield', mean: 'โล่บาเรียเตาปฏิกรณ์', type: 'Armor' },
      { id: 6503, character_id: 65, x: 50, y: 16, word: 'Optic Sensor', mean: 'เลนส์เซนเซอร์ตาหุ่นยนต์', type: 'Accessories' },
      { id: 6504, character_id: 65, x: 50, y: 40, word: 'Titanium Chassis', mean: 'โครงเกราะไททาเนียมหนา', type: 'Armor' },
      { id: 6505, character_id: 65, x: 75, y: 70, word: 'Overdrive Spin', mean: 'ท่าหมุนควงสว่านโอเวอร์ไดรฟ์', type: 'Magic/Skills' },
    ]
  },
  {
    id: 66,
    name: 'Omen',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Omen_full.png',
    hotspots: [
      { id: 6601, character_id: 66, x: 25, y: 45, word: 'Bloodthirsty Scythe', mean: 'ดาบกระบี่กระหายเลือด', type: 'Weapon' },
      { id: 6602, character_id: 66, x: 75, y: 65, word: 'Cage of Death', mean: 'กรงขังมรณะดึงตรึงชีพ', type: 'Magic/Skills' },
      { id: 6603, character_id: 66, x: 50, y: 40, word: 'Bandaged Wrappings', mean: 'แถบผ้าพันแผลเปื้อนโลหิต', type: 'Attire' },
      { id: 6604, character_id: 66, x: 50, y: 22, word: 'Iron Collar', mean: 'ปลอกคอเหล็กทาสสงคราม', type: 'Accessories' },
      { id: 6605, character_id: 66, x: 78, y: 30, word: 'Thirst Aura', mean: 'ออร่าบ้าคลั่งความกระหายเลือด', type: 'Magic/Skills' },
    ]
  },
  {
    id: 67,
    name: 'Ormarr',
    role: 'Tank',
    color: 'amber',
    img: './characters/Ormarr_full.png',
    hotspots: [
      { id: 6701, character_id: 67, x: 25, y: 45, word: 'War Hammer', mean: 'ค้อนศึกยักษ์ไวกิ้ง', type: 'Weapon' },
      { id: 6702, character_id: 67, x: 75, y: 45, word: 'Viking Sword', mean: 'ดาบสั้นนักรบคนเถื่อน', type: 'Weapon' },
      { id: 6703, character_id: 67, x: 50, y: 16, word: 'Horned Viking Helm', mean: 'หมวกเหล็กไวกิ้งมีเขา', type: 'Armor' },
      { id: 6704, character_id: 67, x: 70, y: 28, word: 'Fur Pauldron', mean: 'เกราะไหล่หนังขนสัตว์หนา', type: 'Attire' },
      { id: 6705, character_id: 67, x: 50, y: 65, word: 'Berserker Spin', mean: 'หมุนควงสว่านคลั่งสะบั้น', type: 'Magic/Skills' },
    ]
  },
  {
    id: 68,
    name: 'Paine',
    role: 'Assassin',
    color: 'purple',
    img: './characters/Paine_full.png',
    hotspots: [
      { id: 6801, character_id: 68, x: 25, y: 45, word: 'Conductor Baton', mean: 'ไม้บาตองวาทยกรปีศาจ', type: 'Weapon' },
      { id: 6802, character_id: 68, x: 50, y: 40, word: 'Orchestral Cape', mean: 'เสื้อสูทคลุมคอนเสิร์ตมรณะ', type: 'Attire' },
      { id: 6803, character_id: 68, x: 78, y: 25, word: 'Requiem Wings', mean: 'ปีกวิญญาณบทเพลงส่งวิญญาณ', type: 'Accessories' },
      { id: 6804, character_id: 68, x: 75, y: 55, word: 'Sonic Wave', mean: 'คลื่นเสียงโซนิควูบดับ', type: 'Magic/Skills' },
      { id: 6805, character_id: 68, x: 48, y: 85, word: 'Dress Shoes', mean: 'รองเท้าคัทชูหนังเงาวับ', type: 'Attire' },
    ]
  },
  {
    id: 69,
    name: 'Preyta',
    role: 'Mage',
    color: 'emerald',
    img: './characters/Preyta_full.png',
    hotspots: [
      { id: 6901, character_id: 69, x: 25, y: 45, word: 'Plague Staff', mean: 'คทากาฬโรคระบาด', type: 'Weapon' },
      { id: 6902, character_id: 69, x: 50, y: 65, word: 'Wyvern Mount', mean: 'มังกรไวเวิร์นพาหนะโรคระบาด', type: 'Magic/Skills' },
      { id: 6903, character_id: 69, x: 50, y: 18, word: 'Bone Mask', mean: 'หน้ากากกระดูกหัวกะโหลกสัตว์', type: 'Accessories' },
      { id: 6904, character_id: 69, x: 50, y: 38, word: 'Tattered Cloak', mean: 'ผ้าคลุมขาดวิ่นหมองหม่น', type: 'Attire' },
      { id: 6905, character_id: 69, x: 78, y: 35, word: 'Poison Bomb', mean: 'ระเบิดพิษก๊าซระบาด', type: 'Magic/Skills' },
    ]
  },
  {
    id: 70,
    name: 'Qi',
    role: 'Warrior / Fighter',
    color: 'amber',
    img: './characters/Qi_full.png',
    hotspots: [
      { id: 7001, character_id: 70, x: 25, y: 45, word: 'Martial Gauntlets', mean: 'สนับมือหมัดกังฟูมังกร', type: 'Weapon' },
      { id: 7002, character_id: 70, x: 50, y: 42, word: 'Kung Fu Gi', mean: 'ชุดฝึกยุทธ์กังฟูผ้าฝ้าย', type: 'Attire' },
      { id: 7003, character_id: 70, x: 72, y: 35, word: 'Steamed Bun', mean: 'ซาลาเปาเพิ่มพลังลมปราณ', type: 'Accessories' },
      { id: 7004, character_id: 70, x: 75, y: 65, word: 'Dragon Force Palm', mean: 'ฝ่ามือมังกรกระแทกกำแพง', type: 'Magic/Skills' },
      { id: 7005, character_id: 70, x: 50, y: 16, word: 'Martial Headband', mean: 'ผ้าคาดหน้าผากจอมยุทธ์', type: 'Accessories' },
    ]
  },
  {
    id: 71,
    name: 'Quillen',
    role: 'Assassin',
    color: 'purple',
    img: './characters/Quillen_full.png',
    hotspots: [
      { id: 7101, character_id: 71, x: 25, y: 48, word: 'Dual Daggers', mean: 'มีดสั้นคู่ลอบแทงข้างหลัง', type: 'Weapon' },
      { id: 7102, character_id: 71, x: 50, y: 38, word: 'Stealth Cloak', mean: 'ผ้าคลุมล่องหนพรางเงา', type: 'Attire' },
      { id: 7103, character_id: 71, x: 50, y: 22, word: 'Purifier Crest', mean: 'ตราสัญลักษณ์กลุ่มผู้ชำระล้าง', type: 'Accessories' },
      { id: 7104, character_id: 71, x: 68, y: 52, word: 'Leather Holster', mean: 'ซองหนังใส่มีดสั้นข้างเอว', type: 'Accessories' },
      { id: 7105, character_id: 71, x: 78, y: 35, word: 'Shadow Step', mean: 'ก้าวพริบตาลอบสังหาร', type: 'Magic/Skills' },
    ]
  },
  {
    id: 72,
    name: 'Raz',
    role: 'Mage',
    color: 'red',
    img: './characters/Raz_full.png',
    hotspots: [
      { id: 7201, character_id: 72, x: 25, y: 45, word: 'Flaming Boxing Gloves', mean: 'นวมมวยไทยเพลิงลุกโชน', type: 'Weapon' },
      { id: 7202, character_id: 72, x: 50, y: 60, word: 'Muay Thai Shorts', mean: 'กางเกงมวยไทยศึกประจัญ', type: 'Attire' },
      { id: 7203, character_id: 72, x: 50, y: 15, word: 'Mongkhon Headband', mean: 'มงคลสวมศีรษะนักมวย', type: 'Accessories' },
      { id: 7204, character_id: 72, x: 78, y: 40, word: 'Fireball Punch', mean: 'หมัดพลังหมัดเพลิงทำลายล้าง', type: 'Magic/Skills' },
      { id: 7205, character_id: 72, x: 35, y: 55, word: 'Bandaged Wraps', mean: 'ผ้าพันข้อมือและข้อเท้า', type: 'Armor' },
    ]
  },
  {
    id: 73,
    name: 'Riktor',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Riktor_full.png',
    hotspots: [
      { id: 7301, character_id: 73, x: 25, y: 45, word: 'Adaptor Sword', mean: 'ดาบแปรสภาพธาตุสามสัณฐาน', type: 'Weapon' },
      { id: 7302, character_id: 73, x: 50, y: 40, word: 'Hunter Coat', mean: 'เสื้อโค้ตยาวนักล่าปีศาจ', type: 'Attire' },
      { id: 7303, character_id: 73, x: 70, y: 50, word: 'Rune Scabbard', mean: 'ฝักดาบสลักอักขระเวท', type: 'Accessories' },
      { id: 7304, character_id: 73, x: 50, y: 25, word: 'Hunter Medallion', mean: 'เหรียญตราสมาคมนักล่า', type: 'Accessories' },
      { id: 7305, character_id: 73, x: 78, y: 35, word: 'Elemental Aura', mean: 'ออร่าประสานธาตุหญ้า/น้ำ/บก', type: 'Magic/Skills' },
    ]
  },
  {
    id: 74,
    name: 'Rouie',
    role: 'Support',
    color: 'cyan',
    img: './characters/Rouie_full.png',
    hotspots: [
      { id: 7401, character_id: 74, x: 25, y: 45, word: 'Cosmic Staff', mean: 'คทาดาราจักรเชื่อมมิติ', type: 'Weapon' },
      { id: 7402, character_id: 74, x: 75, y: 65, word: 'Teleportation Circle', mean: 'วงแหวนวาปวาร์ปกลับบ้าน', type: 'Magic/Skills' },
      { id: 7403, character_id: 74, x: 50, y: 40, word: 'Constellation Veil', mean: 'ผ้าคลุมลายกลุ่มดาวฤกษ์', type: 'Attire' },
      { id: 7404, character_id: 74, x: 50, y: 15, word: 'Astral Halo', mean: 'รัศมีดวงดาวบนศีรษะ', type: 'Accessories' },
      { id: 7405, character_id: 74, x: 75, y: 35, word: 'Starlight Orbs', mean: 'ลูกแก้วแสงดาวนำทาง', type: 'Accessories' },
    ]
  },
  {
    id: 75,
    name: 'Rourke',
    role: 'Warrior / Fighter',
    color: 'amber',
    img: './characters/Rourke_full.png',
    hotspots: [
      { id: 7501, character_id: 75, x: 25, y: 48, word: 'Crossbow Gun', mean: 'หน้าไม้กลยิงกระจายกระสุน', type: 'Weapon' },
      { id: 7502, character_id: 75, x: 72, y: 42, word: 'Mechanical Arm', mean: 'แขนกลเหล็กกล้าทรงพลัง', type: 'Armor' },
      { id: 7503, character_id: 75, x: 50, y: 38, word: 'Leather Vest', mean: 'เสื้อกั๊กหนังนายพราน', type: 'Attire' },
      { id: 7504, character_id: 75, x: 78, y: 60, word: 'Iron Will Shield', mean: 'โล่บาเรียเกราะพลังใจเหล็ก', type: 'Magic/Skills' },
      { id: 7505, character_id: 75, x: 50, y: 16, word: 'Commander Cap', mean: 'หมวกแก๊ปผู้การกองกำลัง', type: 'Accessories' },
    ]
  },

  // --- Part 3: Heroes 76 to 111 ---
  {
    id: 76,
    name: 'Roxie',
    role: 'Tank',
    color: 'amber',
    img: './characters/Roxie_full.png',
    hotspots: [
      { id: 7601, character_id: 76, x: 25, y: 45, word: 'Fire Pickaxe', mean: 'อีเต้อขุดเหมืองเพลิง', type: 'Weapon' },
      { id: 7602, character_id: 76, x: 75, y: 35, word: 'Agnie Spirit', mean: 'วิญญาณเพลิงน้อยแอกนี่', type: 'Magic/Skills' },
      { id: 7603, character_id: 76, x: 50, y: 45, word: 'Miner Overalls', mean: 'ชุดเอี๊ยมยีนส์คนงานเหมือง', type: 'Attire' },
      { id: 7604, character_id: 76, x: 50, y: 82, word: 'Roller Skates', mean: 'รองเท้าโรลเลอร์สเก็ตเพลิง', type: 'Attire' },
      { id: 7605, character_id: 76, x: 78, y: 60, word: 'Flaming Lasso', mean: 'บ่วงบาศเพลิงกระชากตัว', type: 'Magic/Skills' },
    ]
  },
  {
    id: 77,
    name: 'Ryoma',
    role: 'Warrior / Fighter',
    color: 'indigo',
    img: './characters/Ryoma_full.png',
    hotspots: [
      { id: 7701, character_id: 77, x: 25, y: 45, word: 'Naginata Spear', mean: 'หอกยาวนางินาตะซามูไร', type: 'Weapon' },
      { id: 7702, character_id: 77, x: 50, y: 16, word: 'Straw Hat', mean: 'หมวกฟางพเนจรโบราณ', type: 'Accessories' },
      { id: 7703, character_id: 77, x: 50, y: 40, word: 'Ronin Haori', mean: 'เสื้อคลุมฮาโอริซามูไรไร้นาย', type: 'Attire' },
      { id: 7704, character_id: 77, x: 78, y: 45, word: 'Shadowless Flurry', mean: 'เพลงหอกกระหน่ำแทงไร้เงา', type: 'Magic/Skills' },
      { id: 7705, character_id: 77, x: 48, y: 82, word: 'Bamboo Sandals', mean: 'รองเท้าสานไม้ไผ่โบราณ', type: 'Attire' },
    ]
  },
  {
    id: 78,
    name: 'Sephera',
    role: 'Support',
    color: 'cyan',
    img: './characters/Sephera_full.png',
    hotspots: [
      { id: 7801, character_id: 78, x: 25, y: 45, word: 'Water Harp', mean: 'พิณวารีแห่งสายน้ำศักดิ์สิทธิ์', type: 'Weapon' },
      { id: 7802, character_id: 78, x: 50, y: 42, word: 'Mermaid Veil', mean: 'ส่าหรีนางเงือกพลิ้วไหว', type: 'Attire' },
      { id: 7803, character_id: 78, x: 50, y: 16, word: 'Aquatic Diadem', mean: 'รัดเกล้าไข่มุกสมุทร', type: 'Accessories' },
      { id: 7804, character_id: 78, x: 78, y: 55, word: 'Healing Rapids', mean: 'ลำธารกระแสน้ำรักษาชีพ', type: 'Magic/Skills' },
      { id: 7805, character_id: 78, x: 50, y: 65, word: 'Silk Dress', mean: 'ชุดกระโปรงผ้าไหมเกล็ดปลา', type: 'Attire' },
    ]
  },
  {
    id: 79,
    name: 'Sinestrea',
    role: 'Assassin',
    color: 'red',
    img: './characters/Sinestrea_full.png',
    hotspots: [
      { id: 7901, character_id: 79, x: 25, y: 48, word: 'Blood Blades', mean: 'ใบมีดโลหิตแฝดสยบมาร', type: 'Weapon' },
      { id: 7902, character_id: 79, x: 50, y: 40, word: 'Slumber Pyjamas', mean: 'ชุดนอนสายเดี่ยวสีชาด', type: 'Attire' },
      { id: 7903, character_id: 79, x: 78, y: 35, word: 'Blood Hibernation', mean: 'พิธีกรรมนิทราโลหิตฟื้นกาย', type: 'Magic/Skills' },
      { id: 7904, character_id: 79, x: 50, y: 16, word: 'Hair Ribbon', mean: 'ริบบิ้นผูกผมสีแดงสด', type: 'Accessories' },
      { id: 7905, character_id: 79, x: 48, y: 85, word: 'Barefoot Anklet', mean: 'กำไลข้อเท้าเงินโบราณ', type: 'Accessories' },
    ]
  },
  {
    id: 80,
    name: 'Skud',
    role: 'Tank',
    color: 'amber',
    img: './characters/Skud_full.png',
    hotspots: [
      { id: 8001, character_id: 80, x: 25, y: 45, word: 'Hydraulic Fists', mean: 'หมัดเหล็กไฮดรอลิกไอน้ำ', type: 'Weapon' },
      { id: 8002, character_id: 80, x: 75, y: 35, word: 'Steam Boiler', mean: 'หม้อต้มไอน้ำพลังงานสูง', type: 'Armor' },
      { id: 8003, character_id: 80, x: 50, y: 40, word: 'Mechanical Plate', mean: 'เกราะแผ่นกลไกฟันเฟือง', type: 'Armor' },
      { id: 8004, character_id: 80, x: 78, y: 60, word: 'Release Valve', mean: 'วาล์วระบายแรงดันไอน้ำ', type: 'Magic/Skills' },
      { id: 8005, character_id: 80, x: 48, y: 82, word: 'Tread Greaves', mean: 'สนับแข้งเกราะตีนตะขาบ', type: 'Armor' },
    ]
  },
  {
    id: 81,
    name: 'Slimz',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Slimz_full.png',
    hotspots: [
      { id: 8101, character_id: 81, x: 25, y: 45, word: 'Flying Spear', mean: 'หอกบินอาบยาชาทะลวงร่าง', type: 'Weapon' },
      { id: 8102, character_id: 81, x: 75, y: 40, word: 'Merchant Backpack', mean: 'เป้สัมภาระพ่อค้าเร่', type: 'Accessories' },
      { id: 8103, character_id: 81, x: 50, y: 16, word: 'Miner Goggles', mean: 'แว่นตานิรภัยคนขุดเหมือง', type: 'Accessories' },
      { id: 8104, character_id: 81, x: 50, y: 12, word: 'Rabbit Ears', mean: 'หูกระต่ายสัญชาตญาณไว', type: 'Accessories' },
      { id: 8105, character_id: 81, x: 50, y: 70, word: 'Swift Hop', mean: 'การกระโดดคล่องแคล่วว่องไว', type: 'Magic/Skills' },
    ]
  },
  {
    id: 82,
    name: 'Superman',
    role: 'Warrior / Fighter',
    color: 'blue',
    img: './characters/Super man_full.png',
    hotspots: [
      { id: 8201, character_id: 82, x: 25, y: 30, word: 'Red Cape', mean: 'ผ้าคลุมแดงโบกสะบัด', type: 'Attire' },
      { id: 8202, character_id: 82, x: 50, y: 35, word: 'House of El Shield', mean: 'ตราสัญลักษณ์ตระกูลเอลตัว S', type: 'Attire' },
      { id: 8203, character_id: 82, x: 50, y: 16, word: 'Heat Vision', mean: 'ลำแสงความร้อนจากดวงตา', type: 'Magic/Skills' },
      { id: 8204, character_id: 82, x: 50, y: 50, word: 'Kryptonian Bodysuit', mean: 'ชุดบอดี้สูทชาวคริปตัน', type: 'Attire' },
      { id: 8205, character_id: 82, x: 75, y: 25, word: 'Freeze Breath', mean: 'ลมหายใจเยือกแข็งแช่แข็ง', type: 'Magic/Skills' },
      { id: 8206, character_id: 82, x: 48, y: 85, word: 'Combat Boots', mean: 'รองเท้าบูทสีแดงบินทะยาน', type: 'Attire' },
    ]
  },
  {
    id: 83,
    name: 'Taara',
    role: 'Tank',
    color: 'red',
    img: './characters/Taara_full.png',
    hotspots: [
      { id: 8301, character_id: 83, x: 25, y: 45, word: 'War Hammer', mean: 'ค้อนศึกเหล็กกล้ายักษ์', type: 'Weapon' },
      { id: 8302, character_id: 83, x: 50, y: 35, word: 'Steel Cuirass', mean: 'เกราะอกเหล็กกล้านักรบสาว', type: 'Armor' },
      { id: 8303, character_id: 83, x: 75, y: 45, word: 'Berserker Regeneration', mean: 'พลังฟื้นฟูชีพคลั่งศึก', type: 'Magic/Skills' },
      { id: 8304, character_id: 83, x: 72, y: 26, word: 'Spiked Pauldron', mean: 'เกราะไหล่เหล็กปลายหนาม', type: 'Armor' },
      { id: 8305, character_id: 83, x: 48, y: 80, word: 'Armored Greaves', mean: 'สนับแข้งเหล็กป้องกันแรงกระแทก', type: 'Armor' },
    ]
  },
  {
    id: 84,
    name: 'Tachi',
    role: 'Warrior / Fighter',
    color: 'indigo',
    img: './characters/Tachi_full.png',
    hotspots: [
      { id: 8401, character_id: 84, x: 25, y: 45, word: 'Cliff Blade', mean: 'ดาบผ่าศิลาฟันสะบั้น', type: 'Weapon' },
      { id: 8402, character_id: 84, x: 50, y: 40, word: 'Ronin Robes', mean: 'เสื้อคลุมนักดาบพเนจร', type: 'Attire' },
      { id: 8403, character_id: 84, x: 78, y: 35, word: 'Seal Breaking Mark', mean: 'ตราปลดผนึกดาบสี่ทิศ', type: 'Magic/Skills' },
      { id: 8404, character_id: 84, x: 70, y: 50, word: 'Armored Vambraces', mean: 'สนับแขนเหล็กกล้าซามูไร', type: 'Armor' },
      { id: 8405, character_id: 84, x: 40, y: 25, word: 'Straw Cloak', mean: 'เสื้อคลุมฟางกันพายุฝน', type: 'Attire' },
    ]
  },
  {
    id: 85,
    name: 'TeeMee',
    role: 'Support',
    color: 'amber',
    img: './characters/Teemee_full.png',
    hotspots: [
      { id: 8501, character_id: 85, x: 25, y: 45, word: 'Poot Spear', mean: 'หอกจิ๋วคู่ใจนักรบคู่หู', type: 'Weapon' },
      { id: 8502, character_id: 85, x: 50, y: 40, word: 'Golden Armor Suit', mean: 'ชุดเกราะทองคำตัวยักษ์', type: 'Armor' },
      { id: 8503, character_id: 85, x: 75, y: 65, word: 'Holy Grail', mean: 'จอกศักดิ์สิทธิ์คืนชีพวิญญาณ', type: 'Magic/Skills' },
      { id: 8504, character_id: 85, x: 50, y: 16, word: 'Knight Helmet', mean: 'หมวกเกราะอัศวินทองคำ', type: 'Armor' },
      { id: 8505, character_id: 85, x: 70, y: 45, word: 'Alchemy Bag', mean: 'ถุงกระเป๋าสูตรเล่นแร่แปรธาตุ', type: 'Accessories' },
    ]
  },
  {
    id: 86,
    name: 'Teeri',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Teeri_full.png',
    hotspots: [
      { id: 8601, character_id: 86, x: 25, y: 45, word: 'Dual Circular Blades', mean: 'กงจักรคู่ล่าสังหารสองมือ', type: 'Weapon' },
      { id: 8602, character_id: 86, x: 50, y: 40, word: 'Investigator Uniform', mean: 'เครื่องแบบนักสืบสาวรุ่นเยาว์', type: 'Attire' },
      { id: 8603, character_id: 86, x: 50, y: 15, word: 'Feathered Beret', mean: 'หมวกเบเร่ต์ประดับขนนก', type: 'Accessories' },
      { id: 8604, character_id: 86, x: 75, y: 35, word: 'Tracking Scope', mean: 'กล้องเล็งวิเคราะห์แกะรอย', type: 'Magic/Skills' },
      { id: 8605, character_id: 86, x: 48, y: 82, word: 'Swift Boots', mean: 'รองเท้าบูทสืบคดีคล่องตัว', type: 'Attire' },
    ]
  },
  {
    id: 87,
    name: 'Tel\'Annas',
    role: 'Carry / Marksman',
    color: 'emerald',
    img: './characters/Tel\'Annas_full.png',
    hotspots: [
      { id: 8701, character_id: 87, x: 25, y: 45, word: 'Bow of the Stars', mean: 'คันธนูประกายดาราแห่งเอลฟ์', type: 'Weapon' },
      { id: 8702, character_id: 87, x: 50, y: 15, word: 'Elven Tiara', mean: 'รัดเกล้ามงกุฎราชินีเอลฟ์', type: 'Accessories' },
      { id: 8703, character_id: 87, x: 50, y: 42, word: 'Regal Gown', mean: 'ชุดราตรีราชินีพงไพร', type: 'Attire' },
      { id: 8704, character_id: 87, x: 78, y: 35, word: 'Starlight Arrow', mean: 'ศรประกายแสงดวงดาว', type: 'Magic/Skills' },
      { id: 8705, character_id: 87, x: 70, y: 50, word: 'Quiver of Eternity', mean: 'ซองลูกศรอมตะนิรันดร์กาล', type: 'Accessories' },
    ]
  },
  {
    id: 88,
    name: 'The Flash',
    role: 'Assassin',
    color: 'red',
    img: './characters/The flash_full.png',
    hotspots: [
      { id: 8801, character_id: 88, x: 50, y: 15, word: 'Crimson Cowl', mean: 'หน้ากากฮู้ดสีแดงสายฟ้า', type: 'Attire' },
      { id: 8802, character_id: 88, x: 50, y: 35, word: 'Lightning Emblem', mean: 'ตราสัญลักษณ์สายฟ้าทองคำ', type: 'Attire' },
      { id: 8803, character_id: 88, x: 50, y: 48, word: 'Friction Suit', mean: 'ชุดบอดี้สูททนแรงเสียดทาน', type: 'Attire' },
      { id: 8804, character_id: 88, x: 75, y: 40, word: 'Speed Force Lightning', mean: 'ประกายสายฟ้าสปีดฟอร์ซ', type: 'Magic/Skills' },
      { id: 8805, character_id: 88, x: 48, y: 85, word: 'Gold Boots', mean: 'รองเท้าบูททองคำความเร็วสูง', type: 'Attire' },
      { id: 8806, character_id: 88, x: 25, y: 45, word: 'Mach Punch', mean: 'หมัดทะลวงกำแพงเสียงมัค', type: 'Magic/Skills' },
    ]
  },
  {
    id: 89,
    name: 'Thorne',
    role: 'Carry / Marksman',
    color: 'purple',
    img: './characters/Thorne_full.png',
    hotspots: [
      { id: 8901, character_id: 89, x: 25, y: 48, word: 'Magic Revolver', mean: 'ปืนลูกโม่มนตรากระสุนเวท', type: 'Weapon' },
      { id: 8902, character_id: 89, x: 50, y: 38, word: 'Scholar Cape', mean: 'เสื้อคลุมนักวิชาการเวทมนตร์', type: 'Attire' },
      { id: 8903, character_id: 89, x: 75, y: 45, word: 'Bullet Cylinder', mean: 'รังเพลิงบรรจุกระสุนเวทมนตร์', type: 'Accessories' },
      { id: 8904, character_id: 89, x: 50, y: 16, word: 'Monocle', mean: 'แว่นตาเลนส์เดียวส่องวิเคราะห์', type: 'Accessories' },
      { id: 8905, character_id: 89, x: 48, y: 82, word: 'Leather Boots', mean: 'รองเท้าบูทหนังนักค้นคว้า', type: 'Attire' },
    ]
  },
  {
    id: 90,
    name: 'Toro',
    role: 'Tank',
    color: 'amber',
    img: './characters/Toro_full.png',
    hotspots: [
      { id: 9001, character_id: 90, x: 25, y: 45, word: 'Iron Armguards', mean: 'สนับแขนเหล็กกล้ากระทิงดุ', type: 'Weapon' },
      { id: 9002, character_id: 90, x: 50, y: 15, word: 'Bull Horns', mean: 'เขาคู่กระทิงยักษ์สะท้านปฐพี', type: 'Armor' },
      { id: 9003, character_id: 90, x: 50, y: 22, word: 'Nose Ring', mean: 'ห่วงคล้องจมูกทองเหลือง', type: 'Accessories' },
      { id: 9004, character_id: 90, x: 50, y: 42, word: 'Bull Armor', mean: 'ชุดเกราะเหล็กอสูรกระทิง', type: 'Armor' },
      { id: 9005, character_id: 90, x: 75, y: 65, word: 'Earth Quake Stomp', mean: 'กระทืบพื้นสะเทือนแผ่นดินไหว', type: 'Magic/Skills' },
    ]
  },
  {
    id: 91,
    name: 'Tulen',
    role: 'Mage',
    color: 'blue',
    img: './characters/Tulen_full.png',
    hotspots: [
      { id: 9101, character_id: 91, x: 25, y: 35, word: 'Thunder Orbs', mean: 'ลูกแก้วสายฟ้าสวรรค์ลอยรอบกาย', type: 'Magic/Skills' },
      { id: 9102, character_id: 91, x: 50, y: 40, word: 'High Priest Robes', mean: 'เสื้อคลุมมหาปุโรหิตวิหารเทพ', type: 'Attire' },
      { id: 9103, character_id: 91, x: 50, y: 15, word: 'Lightning Crown', mean: 'มงกุฎสายฟ้าอสนีบาต', type: 'Accessories' },
      { id: 9104, character_id: 91, x: 75, y: 35, word: 'Winged Cloak', mean: 'ผ้าคลุมมีปีกสัญลักษณ์สายฟ้า', type: 'Attire' },
      { id: 9105, character_id: 91, x: 78, y: 60, word: 'Ionized Beam', mean: 'ลำแสงนกสายฟ้ายิงทะลวง', type: 'Magic/Skills' },
    ]
  },
  {
    id: 92,
    name: 'Valhein',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Valhein_full.png',
    hotspots: [
      { id: 9201, character_id: 92, x: 25, y: 45, word: 'Silver Revolver', mean: 'ปืนลูกโม่เงินกำราบปีศาจ', type: 'Weapon' },
      { id: 9202, character_id: 92, x: 75, y: 45, word: 'Hunter Glaive', mean: 'กงจักรใบมีดนักล่าแวมไพร์', type: 'Weapon' },
      { id: 9203, character_id: 92, x: 50, y: 15, word: 'Hunter Hat', mean: 'หมวกปีกกว้างนักล่าปีศาจ', type: 'Accessories' },
      { id: 9204, character_id: 92, x: 50, y: 40, word: 'Leather Trenchcoat', mean: 'เสื้อเทรนช์โค้ตหนังล่าอสูร', type: 'Attire' },
      { id: 9205, character_id: 92, x: 40, y: 32, word: 'Bullet Bandolier', mean: 'สายสะพายกระสุนเงิน', type: 'Accessories' },
      { id: 9206, character_id: 92, x: 78, y: 65, word: 'Bullet Storm', mean: 'พายุระดมยิงกระสุนเวทมนตร์', type: 'Magic/Skills' },
    ]
  },
  {
    id: 93,
    name: 'Veera',
    role: 'Mage',
    color: 'purple',
    img: './characters/Veera_full.png',
    hotspots: [
      { id: 9301, character_id: 93, x: 20, y: 30, word: 'Bat Wings', mean: 'ปีกค้างคาวปีศาจราคะ', type: 'Accessories' },
      { id: 9302, character_id: 93, x: 50, y: 42, word: 'Succubus Corset', mean: 'คอร์เซ็ตซัคคิวบัสสุดเซ็กซี่', type: 'Attire' },
      { id: 9303, character_id: 93, x: 50, y: 15, word: 'Demon Horns', mean: 'เขาคู่ปีศาจน้อยน่าหลงใหล', type: 'Accessories' },
      { id: 9304, character_id: 93, x: 75, y: 35, word: 'Kiss of Death', mean: 'จุมพิตมรณะสตันตรึงวิญญาณ', type: 'Magic/Skills' },
      { id: 9305, character_id: 93, x: 78, y: 60, word: 'Bats Swarm', mean: 'ฝูงค้างคาววิญญาณสาดส่อง', type: 'Magic/Skills' },
    ]
  },
  {
    id: 94,
    name: 'Veres',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Veres_full.png',
    hotspots: [
      { id: 9401, character_id: 94, x: 25, y: 48, word: 'Chain Whip', mean: 'แส้โซ่ใบมีดสะบัดสังหาร', type: 'Weapon' },
      { id: 9402, character_id: 94, x: 50, y: 40, word: 'Executioner Tunic', mean: 'ชุดทูนิคเพชฌฆาตสาวสีแดง', type: 'Attire' },
      { id: 9403, character_id: 94, x: 75, y: 30, word: 'Sigil Rings', mean: 'วงแหวนอักขระเวทสี่วง', type: 'Accessories' },
      { id: 9404, character_id: 94, x: 78, y: 55, word: 'Blood Thirst Aura', mean: 'ออร่ากระหายเลือดปลดปล่อยพลัง', type: 'Magic/Skills' },
      { id: 9405, character_id: 94, x: 48, y: 82, word: 'Heel Greaves', mean: 'สนับส้นรองเท้าเกราะเหล็ก', type: 'Armor' },
    ]
  },
  {
    id: 95,
    name: 'Violet (Classic)',
    role: 'Carry / Marksman',
    color: 'purple',
    img: './characters/violet_full1.png',
    hotspots: [
      { id: 9501, character_id: 95, x: 80, y: 55, word: 'Handgun', mean: 'ปืนพกสั้นคลาสสิก', type: 'Weapon' },
      { id: 9502, character_id: 95, x: 20, y: 45, word: 'Heavy Bazooka', mean: 'ปืนใหญ่บาซูก้ากระหน่ำยิง', type: 'Weapon' },
      { id: 9503, character_id: 95, x: 50, y: 25, word: 'Yellow Scarf', mean: 'ผ้าพันคอสีเหลืองสดใส', type: 'Accessories' },
      { id: 9504, character_id: 95, x: 50, y: 45, word: 'Leather Holster', mean: 'ซองปืนหนังคาดเอว', type: 'Accessories' },
      { id: 9505, character_id: 95, x: 35, y: 85, word: 'Field Boots', mean: 'รองเท้าบูทเดินสนามรบ', type: 'Attire' },
      { id: 9506, character_id: 95, x: 65, y: 30, word: 'Rolling Shot', mean: 'ท่ากลิ้งยิงทรงพลัง', type: 'Magic/Skills' },
    ]
  },
  {
    id: 96,
    name: 'Volkath',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Volkath_full.png',
    hotspots: [
      { id: 9601, character_id: 96, x: 25, y: 45, word: 'Dark Greatsword', mean: 'ดาบยักษ์ความมืดกลืนกิน', type: 'Weapon' },
      { id: 9602, character_id: 96, x: 50, y: 65, word: 'Nightmare Steed', mean: 'ม้าศึกฝันร้ายแห่งขุมนรก', type: 'Magic/Skills' },
      { id: 9603, character_id: 96, x: 50, y: 38, word: 'Dark Iron Armor', mean: 'ชุดเกราะเหล็กทมิฬแห่งความตาย', type: 'Armor' },
      { id: 9604, character_id: 96, x: 50, y: 16, word: 'Spiked Crown Helm', mean: 'หมวกเกราะมงกุฎหนามจอมมาร', type: 'Armor' },
      { id: 9605, character_id: 96, x: 78, y: 35, word: 'Undying Fury', mean: 'ความโกรธแค้นอมตะคืนชีพ', type: 'Magic/Skills' },
    ]
  },
  {
    id: 97,
    name: 'Wiro',
    role: 'Tank',
    color: 'amber',
    img: './characters/Wiro_full.png',
    hotspots: [
      { id: 9701, character_id: 97, x: 25, y: 45, word: 'Sacred Battle Axe', mean: 'ขวานศึกศักดิ์สิทธิ์เบิกปฐพี', type: 'Weapon' },
      { id: 9702, character_id: 97, x: 72, y: 35, word: 'Invulnerability Talisman', mean: 'เครื่องรางคุ้มกายคงกระพัน', type: 'Accessories' },
      { id: 9703, character_id: 97, x: 50, y: 40, word: 'Warrior Tunic', mean: 'ชุดทูนิคนักรบชนพื้นเมือง', type: 'Attire' },
      { id: 9704, character_id: 97, x: 50, y: 16, word: 'Martial Headband', mean: 'ผ้าคาดผมศิลาศักดิ์สิทธิ์', type: 'Accessories' },
      { id: 9705, character_id: 97, x: 75, y: 65, word: 'Earth Shatter', mean: 'ท่าฟาดขวานแผ่นดินแยก', type: 'Magic/Skills' },
    ]
  },
  {
    id: 98,
    name: 'Wisp',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Wisp_full.png',
    hotspots: [
      { id: 9801, character_id: 98, x: 50, y: 55, word: 'War Machine Mech', mean: 'หุ่นยนต์จักรกลสงครามสองขา', type: 'Weapon' },
      { id: 9802, character_id: 98, x: 25, y: 35, word: 'Rocket Launchers', mean: 'ท่อยิงจรวดมิสไซล์คู่', type: 'Weapon' },
      { id: 9803, character_id: 98, x: 50, y: 16, word: 'Aviator Helmet', mean: 'หมวกนักบินเกราะกลม', type: 'Accessories' },
      { id: 9804, character_id: 98, x: 50, y: 38, word: 'Armored Cockpit', mean: 'ห้องควบคุมหุ่นยนต์เกราะหนา', type: 'Armor' },
      { id: 9805, character_id: 98, x: 78, y: 65, word: 'Barrel Roll', mean: 'การกลิ้งหลบระเบิดทิ้งบอมบ์', type: 'Magic/Skills' },
    ]
  },
  {
    id: 99,
    name: 'Wonder Woman',
    role: 'Warrior / Fighter',
    color: 'red',
    img: './characters/Wonder Woman_full.png',
    hotspots: [
      { id: 9901, character_id: 99, x: 25, y: 45, word: 'Sword of Athena', mean: 'ดาบแห่งเทพีเอธีนา', type: 'Weapon' },
      { id: 9902, character_id: 99, x: 75, y: 45, word: 'Amazonian Shield', mean: 'โล่เกราะเผ่านักรบอเมซอน', type: 'Armor' },
      { id: 9903, character_id: 99, x: 70, y: 60, word: 'Lasso of Truth', mean: 'บ่วงบาศก์แห่งความจริง', type: 'Magic/Skills' },
      { id: 9904, character_id: 99, x: 35, y: 55, word: 'Bracelets of Submission', mean: 'ปลอกแขนสะท้อนกระสุน', type: 'Armor' },
      { id: 9905, character_id: 99, x: 50, y: 15, word: 'Golden Tiara', mean: 'มงกุฎรัดเกล้าทองคำดาวแดง', type: 'Accessories' },
      { id: 9906, character_id: 99, x: 50, y: 38, word: 'Eagle Corset', mean: 'ชุดเกราะรัดรูปตราอินทรีทอง', type: 'Attire' },
    ]
  },
  {
    id: 100,
    name: 'Wukong',
    role: 'Assassin',
    color: 'amber',
    img: './characters/WuKong_full.png',
    hotspots: [
      { id: 10001, character_id: 100, x: 25, y: 45, word: 'Ruyi Jingu Bang', mean: 'กระบองสารพัดนึกหงอคง', type: 'Weapon' },
      { id: 10002, character_id: 100, x: 50, y: 15, word: 'Golden Circlet', mean: 'รัดเกล้าทองคำกำราบใจ', type: 'Accessories' },
      { id: 10003, character_id: 100, x: 50, y: 40, word: 'Battle Robes', mean: 'เสื้อเกราะผ้ารัดกุมเห้งเจีย', type: 'Armor' },
      { id: 10004, character_id: 100, x: 75, y: 35, word: 'Cloud Somersault', mean: 'เมฆหมอกเหาะตีลังกา', type: 'Magic/Skills' },
      { id: 10005, character_id: 100, x: 72, y: 65, word: 'Monkey Tail', mean: 'หางวานรทรงตัวคล่องแคล่ว', type: 'Accessories' },
    ]
  },
  {
    id: 101,
    name: 'Xeniel',
    role: 'Tank',
    color: 'blue',
    img: './characters/Xeniel_full.png',
    hotspots: [
      { id: 10101, character_id: 101, x: 25, y: 45, word: 'Holy Flail', mean: 'ลูกตุ้มหนามศักดิ์สิทธิ์', type: 'Weapon' },
      { id: 10102, character_id: 101, x: 78, y: 25, word: 'Seraphic Wings', mean: 'หกปีกเทพผู้ส่งสาส์นสวรรค์', type: 'Accessories' },
      { id: 10103, character_id: 101, x: 50, y: 38, word: 'Archangel Plate', mean: 'ชุดเกราะเทวทูตอัครเสนา', type: 'Armor' },
      { id: 10104, character_id: 101, x: 50, y: 65, word: 'Celestial Intervention', mean: 'วาร์ปเหินเวหาคุ้มกันสหาย', type: 'Magic/Skills' },
      { id: 10105, character_id: 101, x: 32, y: 55, word: 'Book of Prayers', mean: 'คัมภีร์บทสวดพิทักษ์ชีพ', type: 'Accessories' },
    ]
  },
  {
    id: 102,
    name: 'Yan',
    role: 'Warrior / Fighter',
    color: 'cyan',
    img: './characters/Yan_full.png',
    hotspots: [
      { id: 10201, character_id: 102, x: 25, y: 45, word: 'Brush-Blade', mean: 'พู่กันกระบี่จิตรกรสะบัดหมึก', type: 'Weapon' },
      { id: 10202, character_id: 102, x: 75, y: 45, word: 'Ink Scroll', mean: 'ม้วนคัมภีร์หมึกภาพวาดโบราณ', type: 'Accessories' },
      { id: 10203, character_id: 102, x: 50, y: 40, word: 'Scholar Hanfu', mean: 'ชุดฮั่นฝูบัณฑิตหนุ่มพริ้วไหว', type: 'Attire' },
      { id: 10204, character_id: 102, x: 78, y: 65, word: 'Ink Mountain Barrier', mean: 'ม่านหมึกขุนเขากำแพงป้องกัน', type: 'Magic/Skills' },
      { id: 10205, character_id: 102, x: 50, y: 58, word: 'Jade Pendant', mean: 'จี้หยกห้อยเอวนำโชค', type: 'Accessories' },
    ]
  },
  {
    id: 103,
    name: 'Y\'bneth',
    role: 'Tank',
    color: 'emerald',
    img: './characters/Y\'bneth_full.png',
    hotspots: [
      { id: 10301, character_id: 103, x: 25, y: 45, word: 'Tree Branches', mean: 'กิ่งก้านต้นไม้ยักษ์บรรพกาล', type: 'Weapon' },
      { id: 10302, character_id: 103, x: 50, y: 40, word: 'Bark Armor', mean: 'เปลือกไม้หนาเกราะพงไพร', type: 'Armor' },
      { id: 10303, character_id: 103, x: 75, y: 35, word: 'Seed Pods', mean: 'ฝักเมล็ดพันธุ์ระเบิดพืช', type: 'Magic/Skills' },
      { id: 10304, character_id: 103, x: 50, y: 70, word: 'Root Vines', mean: 'เถาวัลย์รากไม้ดึงตวัด', type: 'Magic/Skills' },
      { id: 10305, character_id: 103, x: 50, y: 15, word: 'Leaf Crown', mean: 'มงกุฎใบไม้เขียวขจี', type: 'Accessories' },
    ]
  },
  {
    id: 104,
    name: 'Yorn',
    role: 'Carry / Marksman',
    color: 'amber',
    img: './characters/Yorn_full.png',
    hotspots: [
      { id: 10401, character_id: 104, x: 25, y: 45, word: 'Bow of Apollo', mean: 'คันธนูสุริยันอพอลโล', type: 'Weapon' },
      { id: 10402, character_id: 104, x: 70, y: 50, word: 'Sunfire Quiver', mean: 'ซองลูกศรเปลวสุริยัน', type: 'Accessories' },
      { id: 10403, character_id: 104, x: 50, y: 38, word: 'Archer Armor', mean: 'เกราะอกนักธนูแสงสว่าง', type: 'Armor' },
      { id: 10404, character_id: 104, x: 78, y: 30, word: 'Heart of the Sun', mean: 'ศรสุริยะยิงข้ามแมพ', type: 'Magic/Skills' },
      { id: 10405, character_id: 104, x: 50, y: 15, word: 'Golden Circlet', mean: 'มงกุฎรัดเกล้าทองคำบุตรแห่งดวงอาทิตย์', type: 'Accessories' },
      { id: 10406, character_id: 104, x: 35, y: 55, word: 'Archer Gauntlet', mean: 'ถุงมือหนังเหนี่ยวสายธนู', type: 'Armor' },
    ]
  },
  {
    id: 105,
    name: 'Yue',
    role: 'Mage',
    color: 'pink',
    img: './characters/Yue_full.png',
    hotspots: [
      { id: 10501, character_id: 105, x: 25, y: 45, word: 'Jade Folding Fan', mean: 'พัดพับหยกคมกริบสังหาร', type: 'Weapon' },
      { id: 10502, character_id: 105, x: 50, y: 42, word: 'Princess Gown', mean: 'ชุดราตรีองค์หญิงผ้าไหมชั้นสูง', type: 'Attire' },
      { id: 10503, character_id: 105, x: 50, y: 15, word: 'Phoenix Hairpin', mean: 'ปิ่นปักผมหงส์ทองคำโบราณ', type: 'Accessories' },
      { id: 10504, character_id: 105, x: 78, y: 35, word: 'Cross Fan Blades', mean: 'พัดคมมีดไขว้ตัดมิติ', type: 'Magic/Skills' },
      { id: 10505, character_id: 105, x: 50, y: 65, word: 'Ribbon Sashes', mean: 'แพรแถบคาดเอวลอยละล่อง', type: 'Attire' },
    ]
  },
  {
    id: 106,
    name: 'Zanis',
    role: 'Warrior / Fighter',
    color: 'blue',
    img: './characters/Zanis_full.png',
    hotspots: [
      { id: 10601, character_id: 106, x: 25, y: 45, word: 'Dragon Spear', mean: 'ทวนมังกรศึกสะท้านแดน', type: 'Weapon' },
      { id: 10602, character_id: 106, x: 50, y: 38, word: 'Dragon Scale Armor', mean: 'ชุดเกราะเกล็ดมังกรขาว', type: 'Armor' },
      { id: 10603, character_id: 106, x: 50, y: 16, word: 'White War Mask', mean: 'หน้ากากสงครามขาวขุนศึก', type: 'Accessories' },
      { id: 10604, character_id: 106, x: 78, y: 55, word: 'Dragon Blood Strike', mean: 'เพลงทวนกระหน่ำแทงเลือดมังกร', type: 'Magic/Skills' },
      { id: 10605, character_id: 106, x: 48, y: 80, word: 'Plated Greaves', mean: 'สนับแข้งเกราะเหล็กแผ่น', type: 'Armor' },
    ]
  },
  {
    id: 107,
    name: 'Zata',
    role: 'Mage',
    color: 'purple',
    img: './characters/Zata_full.png',
    hotspots: [
      { id: 10701, character_id: 107, x: 25, y: 45, word: 'Feather Darts', mean: 'ขนนกเวทมนตร์คมดั่งมีดบิน', type: 'Weapon' },
      { id: 10702, character_id: 107, x: 78, y: 25, word: 'Avian Wings', mean: 'ปีกปักษาทมิฬโผบิน', type: 'Accessories' },
      { id: 10703, character_id: 107, x: 50, y: 40, word: 'Courier Coat', mean: 'เสื้อโค้ตนกส่งสารแห่งเงา', type: 'Attire' },
      { id: 10704, character_id: 107, x: 50, y: 70, word: 'Ascending Gale', mean: 'ทะยานฟ้ากระหน่ำยิงขนนก', type: 'Magic/Skills' },
      { id: 10705, character_id: 107, x: 50, y: 16, word: 'Feather Crown', mean: 'มงกุฎขนนกเหยี่ยวทมิฬ', type: 'Accessories' },
    ]
  },
  {
    id: 108,
    name: 'Zephys',
    role: 'Warrior / Fighter',
    color: 'blue',
    img: './characters/Zephys_full.png',
    hotspots: [
      { id: 10801, character_id: 108, x: 25, y: 45, word: 'Dual Spears', mean: 'ทวนคู่ยมทูตพิฆาตวิญญาณ', type: 'Weapon' },
      { id: 10802, character_id: 108, x: 50, y: 38, word: 'Vanguard Armor', mean: 'เกราะเหล็กกองหน้าผู้กล้า', type: 'Armor' },
      { id: 10803, character_id: 108, x: 50, y: 16, word: 'Knight Helm', mean: 'หมวกเกราะอัศวินแห่งความตาย', type: 'Armor' },
      { id: 10804, character_id: 108, x: 78, y: 55, word: 'Death from Above', mean: 'ท่าพุ่งกระแทกมรณะจากฟ้า', type: 'Magic/Skills' },
      { id: 10805, character_id: 108, x: 50, y: 65, word: 'Unyielding Soul', mean: 'จิตวิญญาณแกร่งยิ่งเจ็บยิ่งอึด', type: 'Magic/Skills' },
    ]
  },
  {
    id: 109,
    name: 'Zill',
    role: 'Assassin',
    color: 'cyan',
    img: './characters/Zill_full.png',
    hotspots: [
      { id: 10901, character_id: 109, x: 25, y: 45, word: 'Wind Scythes', mean: 'เคียวคู่วายุหมุนปลิดชีพ', type: 'Weapon' },
      { id: 10902, character_id: 109, x: 50, y: 45, word: 'Cyclone Body', mean: 'ลำตัวสายลมพายุหมุนวน', type: 'Attire' },
      { id: 10903, character_id: 109, x: 50, y: 16, word: 'Storm Mask', mean: 'หน้ากากพายุอสูรวายุ', type: 'Accessories' },
      { id: 10904, character_id: 109, x: 78, y: 35, word: 'Tempest Tornado', mean: 'พายุทอร์นาโดกระหน่ำฟัน', type: 'Magic/Skills' },
      { id: 10905, character_id: 109, x: 50, y: 70, word: 'Wind Shroud', mean: 'ม่านไอหมอกวายุคุ้มกัน', type: 'Magic/Skills' },
    ]
  },
  {
    id: 110,
    name: 'Zip',
    role: 'Support',
    color: 'purple',
    img: './characters/Zip_full.png',
    hotspots: [
      { id: 11001, character_id: 110, x: 50, y: 50, word: 'Inflatable Belly', mean: 'พุงกลมโตกลืนเพื่อนกลืนครีป', type: 'Magic/Skills' },
      { id: 11002, character_id: 110, x: 50, y: 16, word: 'Demon Horns', mean: 'เขาน้อยปีศาจป่วนกวนใจ', type: 'Accessories' },
      { id: 11003, character_id: 110, x: 78, y: 25, word: 'Bat Wings', mean: 'ปีกค้างคาวจิ๋วบินดุ๊กดิ๊ก', type: 'Accessories' },
      { id: 11004, character_id: 110, x: 75, y: 65, word: 'Rolling Shield', mean: 'โล่กลิ้งทับป้องกันความเสียหาย', type: 'Magic/Skills' },
      { id: 11005, character_id: 110, x: 22, y: 60, word: 'Demon Tail', mean: 'หางปีศาจน้อยน่ารัก', type: 'Accessories' },
    ]
  },
  {
    id: 111,
    name: 'Zuka',
    role: 'Warrior / Fighter',
    color: 'emerald',
    img: './characters/Zuka_full.png',
    hotspots: [
      { id: 11101, character_id: 111, x: 25, y: 45, word: 'Bo-Staff', mean: 'ไม้พลองไผ่ปรมาจารย์กังฟู', type: 'Weapon' },
      { id: 11102, character_id: 111, x: 50, y: 16, word: 'Bamboo Hat', mean: 'หมวกงอบสานไม้ไผ่โบราณ', type: 'Accessories' },
      { id: 11103, character_id: 111, x: 50, y: 42, word: 'Martial Artist Vest', mean: 'เสื้อกั๊กจอมยุทธ์แพนด้า', type: 'Attire' },
      { id: 11104, character_id: 111, x: 72, y: 55, word: 'Wine Gourd', mean: 'น้ำเต้าสุราเซียนห้อยเอว', type: 'Accessories' },
      { id: 11105, character_id: 111, x: 78, y: 70, word: 'Mountain Weight', mean: 'ท่าทับก้นกระแทกภูผา', type: 'Magic/Skills' },
    ]
  },
];