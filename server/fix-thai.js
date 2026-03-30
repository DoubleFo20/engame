// fix-thai.js — Re-insert hotspots with correct Thai encoding
const pool = require('./db');

const hotspots = [
    // Violet (character_id: 1)
    { character_id: 1, x: 80, y: 55, word: 'Pistol', mean: 'ปืนพก', type: 'Weapon' },
    { character_id: 1, x: 50, y: 28, word: 'Tactical Suit', mean: 'ชุดปฏิบัติการ', type: 'Attire' },
    { character_id: 1, x: 30, y: 45, word: 'Ammunition', mean: 'กระสุน', type: 'Equipment' },
    { character_id: 1, x: 15, y: 13.5, word: 'Shotgun', mean: 'ลูกซอง (โหมดกลิ้ง)', type: 'Weapon' },
    { character_id: 1, x: 50, y: 40, word: 'Belt', mean: 'เข็มขัดอุปกรณ์', type: 'Accessory' },
    { character_id: 1, x: 23, y: 90, word: 'Boots', mean: 'รองเท้าบูทสนาม', type: 'Attire' },

    // Butterfly (character_id: 2)
    { character_id: 2, x: 20, y: 40, word: 'Broadsword', mean: 'ดาบใหญ่', type: 'Weapon' },
    { character_id: 2, x: 50, y: 23, word: 'Cape', mean: 'ผ้าคลุม', type: 'Attire' },
    { character_id: 2, x: 40, y: 78, word: 'Boots', mean: 'รองเท้าบูท', type: 'Attire' },
    { character_id: 2, x: 80, y: 20, word: 'Wing Ornament', mean: 'ปีกประดับหลัง', type: 'Accessory' },
    { character_id: 2, x: 73, y: 45, word: 'Wrist Guard', mean: 'เกราะข้อมือ', type: 'Equipment' },
    { character_id: 2, x: 45, y: 35, word: 'Armor Plate', mean: 'ชิ้นเกราะหน้าอก', type: 'Defense' },
    { character_id: 2, x: 65, y: 70, word: 'Shin Guard', mean: 'สนับแข้ง', type: 'Armor' },

    // Thane (character_id: 3)
    { character_id: 3, x: 20, y: 50, word: 'Shield', mean: 'โล่', type: 'Defense' },
    { character_id: 3, x: 85, y: 55, word: 'Excalibur', mean: 'ดาบศักดิ์สิทธิ์', type: 'Weapon' },
    { character_id: 3, x: 50, y: 30, word: 'Heavy Armor', mean: 'เกราะหนัก', type: 'Defense' },
    { character_id: 3, x: 76, y: 20, word: 'Shoulder Plate', mean: 'เกราะไหล่', type: 'Armor' },
    { character_id: 3, x: 85, y: 40, word: 'Gauntlet', mean: 'เกราะแขน', type: 'Armor' },
    { character_id: 3, x: 40, y: 70, word: 'Greaves', mean: 'เกราะขา', type: 'Armor' },

    // Krixi (character_id: 4)
    { character_id: 4, x: 20, y: 30, word: 'Wings', mean: 'ปีก', type: 'Equipment' },
    { character_id: 4, x: 50, y: 45, word: 'Leaf Dress', mean: 'ชุดเดรสใบไม้', type: 'Attire' },
    { character_id: 4, x: 70, y: 75, word: 'Fairy Shoes', mean: 'รองเท้านางฟ้า', type: 'Attire' },
    { character_id: 4, x: 47, y: 13, word: 'Hairband', mean: 'ที่คาดผม', type: 'Accessory' },
    { character_id: 4, x: 33, y: 68, word: 'Stockings', mean: 'ถุงน่อง', type: 'Attire' },

    // Alice (character_id: 5)
    { character_id: 5, x: 17, y: 35, word: 'Staff', mean: 'คทา/ไม้เท้าเวทมนตร์', type: 'Weapon' },
    { character_id: 5, x: 65, y: 80, word: 'Boots', mean: 'รองเท้าบูท', type: 'Equipment' },
    { character_id: 5, x: 50, y: 40, word: 'Robe', mean: 'ชุดคลุมเวทมนตร์', type: 'Attire' },
    { character_id: 5, x: 79, y: 25, word: 'Wings', mean: 'ปีก', type: 'Equipment' },
    { character_id: 5, x: 50, y: 73, word: 'Stockings', mean: 'ถุงน่อง', type: 'Attire' },

    // Yena (character_id: 6)
    { character_id: 6, x: 8, y: 22, word: 'Blade', mean: 'ดาบ', type: 'Weapon' },
    { character_id: 6, x: 46, y: 43, word: 'Battle Dress', mean: 'ชุดเดรสต่อสู้', type: 'Attire' },
    { character_id: 6, x: 27, y: 85, word: 'Boots', mean: 'รองเท้าบูท', type: 'Attire' },
    { character_id: 6, x: 62, y: 32, word: 'Shoulder Guard', mean: 'เกราะไหล่', type: 'Defense' },
    { character_id: 6, x: 45, y: 70, word: 'Leg Armor', mean: 'เกราะขา', type: 'Armor' },
    { character_id: 6, x: 75, y: 58, word: 'Dual Blade Aura', mean: 'พลังมีดคู่', type: 'Weapon' },
];

(async () => {
    try {
        // Clear old hotspots
        await pool.query('DELETE FROM user_vocab');
        await pool.query('DELETE FROM hotspots');
        console.log('✅ Old hotspots cleared');

        // Insert with correct UTF-8
        for (const h of hotspots) {
            await pool.query(
                'INSERT INTO hotspots (character_id, x, y, word, mean, type) VALUES (?, ?, ?, ?, ?, ?)',
                [h.character_id, h.x, h.y, h.word, h.mean, h.type]
            );
        }
        console.log(`✅ Inserted ${hotspots.length} hotspots with Thai text`);

        // Verify
        const [rows] = await pool.query('SELECT word, mean FROM hotspots LIMIT 5');
        console.log('📋 Sample data:');
        rows.forEach(r => console.log(`   ${r.word} → ${r.mean}`));

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
})();
