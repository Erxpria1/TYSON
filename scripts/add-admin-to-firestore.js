/**
 * Add/Update Admin User to Firestore
 * Uses Firebase Client SDK to add user document to Firestore database
 *
 * Usage: node scripts/add-admin-to-firestore.js [UID]
 * If UID is not provided, it will use a placeholder that you can update manually
 */

const https = require('https');

const API_KEY = 'AIzaSyDqhJpsmB5JTwmj-Qp4bLJFGm-zaovdqm0';
const PROJECT_ID = 'appbase-b0e96';

const adminData = {
  email: 'tarikyalcin@hotmail.com',
  displayName: 'Tarık Yalçın',
  phone: '05335494014',
  role: 'barber',
};

// Get UID from command line or use placeholder
const userUID = process.argv[2] || 'AUTO_GENERATED_OR_COPY_FROM_AUTH';

/**
 * This script provides the exact Firestore document structure you need to add
 * Since we can't directly write to Firestore without proper authentication,
 * this will generate the JSON you can import or use as a reference
 */

console.log('═══════════════════════════════════════════════════════');
console.log('📋 FIRESTORE DOCUMENT REFERENCE');
console.log('═══════════════════════════════════════════════════════\n');

console.log('📍 Location:');
console.log('   Collection: users');
console.log(`   Document ID: ${userUID.length > 10 ? userUID : '[COPY UID FROM AUTH]'}\n`);

console.log('📄 Document Fields (JSON):\n');
console.log('{\n' +
  '  "uid": "' + userUID + '",\n' +
  '  "email": "' + adminData.email + '",\n' +
  '  "displayName": "' + adminData.displayName + '",\n' +
  '  "phone": "' + adminData.phone + '",\n' +
  '  "role": "' + adminData.role + '",\n' +
  '  "createdAt": [SERVER_TIMESTAMP - select "timestamp" in Firebase Console]\n' +
'}\n');

console.log('═══════════════════════════════════════════════════════');
console.log('🔗 DIRECT FIREBASE CONSOLE LINKS');
console.log('═══════════════════════════════════════════════════════\n');

console.log('1️⃣ Authentication (to get UID):');
console.log('   https://console.firebase.google.com/project/appbase-b0e96/authentication/users\n');

console.log('2️⃣ Firestore (to add document):');
console.log('   https://console.firebase.google.com/project/appbase-b0e96/firestore/data/~2Fusers\n');

console.log('\n═══════════════════════════════════════════════════════\n');

console.log('⚠️  NOTE: User already exists in Authentication!');
console.log('   You only need to add the Firestore document.\n');
