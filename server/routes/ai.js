// server/routes/ai.js — AI-powered hotspot generation using Gemini Vision
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const pool = require('../db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Helper: HTTPS POST request (works on all Node.js versions)
function httpsPost(url, body) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const postData = JSON.stringify(body);

        const options = {
            hostname: urlObj.hostname,
            port: 443,
            path: urlObj.pathname + urlObj.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
            },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// POST /api/ai/generate-hotspots
router.post('/generate-hotspots', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { characterId } = req.body;
        if (!characterId) {
            return res.status(400).json({ error: 'characterId is required' });
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY not configured in .env' });
        }

        // Get character from DB
        const [chars] = await pool.query('SELECT * FROM characters WHERE id = ?', [characterId]);
        if (chars.length === 0) {
            return res.status(404).json({ error: 'Character not found' });
        }
        const character = chars[0];

        // Read image file from public directory
        const imgPath = path.join(__dirname, '..', '..', 'public', character.img);
        if (!fs.existsSync(imgPath)) {
            return res.status(404).json({ error: `Image file not found: ${character.img}` });
        }

        const imageBuffer = fs.readFileSync(imgPath);
        const base64Image = imageBuffer.toString('base64');

        // Detect MIME type from extension
        const ext = path.extname(imgPath).toLowerCase();
        const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };
        const mimeType = mimeTypes[ext] || 'image/png';

        // Prompt for Gemini
        const prompt = `You are analyzing a game character image for an English vocabulary learning game.

Character name: "${character.name}"
Character role: "${character.role}"

Analyze this character image and identify 5-8 notable items/features visible on the character (weapons, armor, clothing, accessories, body features, magical effects, etc).

For each item, provide:
- "word": English vocabulary word (capitalize first letter)
- "mean": Thai translation/meaning
- "type": Category (one of: Weapon, Armor, Attire, Accessory, Feature, Effect, Equipment)
- "x": Estimated X position as percentage (0-100, where 0=left edge, 100=right edge)
- "y": Estimated Y position as percentage (0-100, where 0=top edge, 100=bottom edge)

IMPORTANT: The x,y positions should indicate WHERE on the image that item is located. Think of the image as a 100x100 grid.

Respond with ONLY a valid JSON array, no markdown formatting, no explanation. Example:
[{"word":"Sword","mean":"ดาบ","type":"Weapon","x":60,"y":55},{"word":"Helmet","mean":"หมวกเกราะ","type":"Armor","x":50,"y":10}]`;

        const GEMINI_MODEL = 'gemini-2.5-flash';
        const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

        console.log(`[AI] Generating hotspots for "${character.name}" (id=${characterId})...`);

        // Call Gemini API using https module
        const geminiResult = await httpsPost(GEMINI_URL, {
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: mimeType,
                            data: base64Image,
                        }
                    }
                ]
            }],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 2048,
            }
        });

        if (geminiResult.status !== 200) {
            console.error('[AI] Gemini API error:', geminiResult.status, JSON.stringify(geminiResult.data).substring(0, 500));
            const errMsg = geminiResult.data?.error?.message || `Gemini API error: ${geminiResult.status}`;
            return res.status(502).json({ error: errMsg });
        }

        // Extract text from Gemini response
        const responseText = geminiResult.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) {
            console.error('[AI] Gemini returned no text:', JSON.stringify(geminiResult.data).substring(0, 500));
            return res.status(502).json({ error: 'Gemini returned no usable response' });
        }

        console.log('[AI] Gemini response:', responseText.substring(0, 200));

        // Parse JSON from response (strip markdown code fences if present)
        let hotspots;
        try {
            const cleaned = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            hotspots = JSON.parse(cleaned);
        } catch (parseErr) {
            console.error('[AI] Failed to parse Gemini response:', responseText);
            return res.status(502).json({ error: 'Failed to parse AI response', raw: responseText });
        }

        if (!Array.isArray(hotspots) || hotspots.length === 0) {
            return res.status(502).json({ error: 'AI returned empty or invalid hotspots' });
        }

        // Insert hotspots into DB
        const insertedHotspots = [];
        for (const hs of hotspots) {
            const word = (hs.word || '').toString().trim();
            const mean = (hs.mean || '').toString().trim();
            const type = (hs.type || 'Feature').toString().trim();
            const x = Math.max(0, Math.min(100, Number(hs.x) || 50));
            const y = Math.max(0, Math.min(100, Number(hs.y) || 50));

            if (!word || !mean) continue;

            const [result] = await pool.query(
                'INSERT INTO hotspots (character_id, x, y, word, mean, type) VALUES (?, ?, ?, ?, ?, ?)',
                [characterId, x, y, word, mean, type]
            );

            insertedHotspots.push({
                id: result.insertId,
                character_id: characterId,
                x, y, word, mean, type,
            });
        }

        console.log(`[AI] Generated ${insertedHotspots.length} hotspots for "${character.name}"`);

        res.json({
            message: `Generated ${insertedHotspots.length} hotspots`,
            hotspots: insertedHotspots,
        });
    } catch (err) {
        console.error('[AI] Generate hotspots error:', err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

module.exports = router;
