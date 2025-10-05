// Test what environment variables are actually loaded
console.log('=== ENVIRONMENT TEST ===');
console.log('Current working directory:', process.cwd());

// Try different dotenv loading methods
require('dotenv').config();
console.log('Method 1 - Basic dotenv:');
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'NOT SET');

require('dotenv').config({ path: './.env.mongo' });
console.log('Method 2 - .env.mongo:');
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'NOT SET');

require('dotenv').config({ path: '../.env' });
console.log('Method 3 - parent .env:');
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'NOT SET');

console.log('Final EMAIL_PASS:', process.env.EMAIL_PASS);
console.log('Gmail test password: "finu avav pfrw ywgx" (length: 19)');
console.log('Match?', process.env.EMAIL_PASS === 'finu avav pfrw ywgx');