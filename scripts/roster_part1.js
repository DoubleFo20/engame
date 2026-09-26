// scripts/roster_part1.js - Heroes 1 to 37
export const rosterPart1 = [
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
];
