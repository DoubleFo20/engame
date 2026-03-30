-- =============================================
-- Engame Database - Full Schema + Seed Data
-- =============================================

CREATE DATABASE IF NOT EXISTS `engame` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `engame`;

-- ===== USERS =====
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `xp` INT NOT NULL DEFAULT 0,
  `rank` VARCHAR(50) DEFAULT 'Bronze III',
  `role` ENUM('guest','admin') NOT NULL DEFAULT 'guest',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ===== CHARACTERS =====
CREATE TABLE `characters` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `color` VARCHAR(20) DEFAULT 'blue'
) ENGINE=InnoDB;

-- ===== HOTSPOTS (vocab words on characters) =====
CREATE TABLE `hotspots` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `character_id` INT NOT NULL,
  `x` DECIMAL(5,2) NOT NULL,
  `y` DECIMAL(5,2) NOT NULL,
  `word` VARCHAR(100) NOT NULL,
  `mean` VARCHAR(100) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ===== USER_VOCAB (saved words per user) =====
CREATE TABLE `user_vocab` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `hotspot_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`hotspot_id`) REFERENCES `hotspots`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_user_hotspot` (`user_id`, `hotspot_id`)
) ENGINE=InnoDB;

-- =============================================
-- SEED DATA
-- =============================================

-- Users (password = bcrypt hash of "123")
INSERT INTO `users` (`username`, `password`, `name`, `xp`, `rank`, `role`) VALUES
('player', '$2a$10$xVqYLGEMC6oNExkQPL.dEurZIxnSfS3MkOYBwcFhR7ND1hVr4XZ4y', 'Player 1', 0, 'Silver II', 'guest'),
('admin', '$2a$10$xVqYLGEMC6oNExkQPL.dEurZIxnSfS3MkOYBwcFhR7ND1hVr4XZ4y', 'Admin GM', 99999, 'Conqueror', 'admin');

-- Characters
INSERT INTO `characters` (`id`, `name`, `role`, `img`, `color`) VALUES
(1, 'Violet',    'Carry',    '/characters/violet_full.png',    'purple'),
(2, 'Butterfly', 'Assassin', '/characters/Butterfly_full.png', 'pink'),
(3, 'Thane',     'Tank',     '/characters/Thane_full.png',     'blue'),
(4, 'Krixi',     'Mage',     '/characters/Krixi_full.png',     'blue'),
(5, 'Alice',     'Support',  '/characters/Alice_full.png',     'blue'),
(6, 'Yena',      'Assassin', '/characters/Yena_full.png',      'blue');

-- Hotspots: Violet
INSERT INTO `hotspots` (`character_id`, `x`, `y`, `word`, `mean`, `type`) VALUES
(1, 80.00, 55.00, 'Pistol',        'ปืนพก',                'Weapon'),
(1, 50.00, 28.00, 'Tactical Suit', 'ชุดปฏิบัติการ',         'Attire'),
(1, 30.00, 45.00, 'Ammunition',    'กระสุน',               'Equipment'),
(1, 15.00, 13.50, 'Shotgun',       'ลูกซอง (โหมดกลิ้ง)',    'Weapon'),
(1, 50.00, 40.00, 'Belt',          'เข็มขัดอุปกรณ์',        'Accessory'),
(1, 23.00, 90.00, 'Boots',         'รองเท้าบูทสนาม',       'Attire');

-- Hotspots: Butterfly
INSERT INTO `hotspots` (`character_id`, `x`, `y`, `word`, `mean`, `type`) VALUES
(2, 20.00, 40.00, 'Broadsword',    'ดาบใหญ่',             'Weapon'),
(2, 50.00, 23.00, 'Cape',          'ผ้าคลุม',             'Attire'),
(2, 40.00, 78.00, 'Boots',         'รองเท้าบูท',          'Attire'),
(2, 80.00, 20.00, 'Wing Ornament', 'ปีกประดับหลัง',        'Accessory'),
(2, 73.00, 45.00, 'Wrist Guard',   'เกราะข้อมือ',          'Equipment'),
(2, 45.00, 35.00, 'Armor Plate',   'ชิ้นเกราะหน้าอก',      'Defense'),
(2, 65.00, 70.00, 'Shin Guard',    'สนับแข้ง',            'Armor');

-- Hotspots: Thane
INSERT INTO `hotspots` (`character_id`, `x`, `y`, `word`, `mean`, `type`) VALUES
(3, 20.00, 50.00, 'Shield',         'โล่',                'Defense'),
(3, 85.00, 55.00, 'Excalibur',      'ดาบศักดิ์สิทธิ์',      'Weapon'),
(3, 50.00, 30.00, 'Heavy Armor',    'เกราะหนัก',           'Defense'),
(3, 76.00, 20.00, 'Shoulder Plate', 'เกราะไหล่',           'Armor'),
(3, 85.00, 40.00, 'Gauntlet',       'เกราะแขน',           'Armor'),
(3, 40.00, 70.00, 'Greaves',        'เกราะขา',            'Armor');

-- Hotspots: Krixi
INSERT INTO `hotspots` (`character_id`, `x`, `y`, `word`, `mean`, `type`) VALUES
(4, 20.00, 30.00, 'Wings',       'ปีก',               'Equipment'),
(4, 50.00, 45.00, 'Leaf Dress',  'ชุดเดรสใบไม้',       'Attire'),
(4, 70.00, 75.00, 'Fairy Shoes', 'รองเท้านางฟ้า',      'Attire'),
(4, 47.00, 13.00, 'Hairband',    'ที่คาดผม',           'Accessory'),
(4, 33.00, 68.00, 'Stockings',   'ถุงน่อง',            'Attire');

-- Hotspots: Alice
INSERT INTO `hotspots` (`character_id`, `x`, `y`, `word`, `mean`, `type`) VALUES
(5, 17.00, 35.00, 'Staff',      'คทา/ไม้เท้าเวทมนตร์',  'Weapon'),
(5, 65.00, 80.00, 'Boots',      'รองเท้าบูท',          'Equipment'),
(5, 50.00, 40.00, 'Robe',       'ชุดคลุมเวทมนตร์',     'Attire'),
(5, 79.00, 25.00, 'Wings',      'ปีก',               'Equipment'),
(5, 50.00, 73.00, 'Stockings',  'ถุงน่อง',            'Attire');

-- Hotspots: Yena
INSERT INTO `hotspots` (`character_id`, `x`, `y`, `word`, `mean`, `type`) VALUES
(6,  8.00, 22.00, 'Blade',           'ดาบ',          'Weapon'),
(6, 46.00, 43.00, 'Battle Dress',    'ชุดเดรสต่อสู้',   'Attire'),
(6, 27.00, 85.00, 'Boots',           'รองเท้าบูท',    'Attire'),
(6, 62.00, 32.00, 'Shoulder Guard',  'เกราะไหล่',     'Defense'),
(6, 45.00, 70.00, 'Leg Armor',       'เกราะขา',      'Armor'),
(6, 75.00, 58.00, 'Dual Blade Aura', 'พลังมีดคู่',    'Weapon');
