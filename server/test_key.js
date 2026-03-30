// Test Gemini API Key
const https = require('https');
const key = 'AIzaSyAF2z6HaaZJ8_sT4MlWhvXVhQPO_i5JqYA';
const url = 'https://generativelanguage.googleapis.com/v1beta/models?key=' + key;

https.get(url, (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', d.substring(0, 500));
    });
}).on('error', e => console.error('Error:', e.message));
