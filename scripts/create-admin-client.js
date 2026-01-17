/**
 * Firebase Admin User Creation Script (Client SDK Version)
 * Creates an admin user using Firebase Client SDK
 *
 * This version works without service account key by using the REST API
 * or you can use this in a web browser environment.
 *
 * SETUP:
 * 1. Enable Email/Password sign-in in Firebase Console
 * 2. Run: node scripts/create-admin-client.js
 */

const https = require('https');

// Firebase config
const API_KEY = 'AIzaSyDqhJpsmB5JTwmj-Qp4bLJFGm-zaovdqm0';
const PROJECT_ID = 'appbase-b0e96';

// Admin user data
const adminData = {
  email: 'tarikyalcin@hotmail.com',
  password: '123456',
  displayName: 'Tarık Yalçın',
  phone: '05335494014',
  role: 'barber',
};

/**
 * Method 1: Using Firebase Auth REST API to create user
 */
function createUserViaREST() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email: adminData.email,
      password: adminData.password,
      displayName: adminData.displayName,
      phoneNumber: `+90${adminData.phone}`,
      returnSecureToken: true,
    });

    const options = {
      hostname: 'identitytoolkit.googleapis.com',
      path: `/v1/projects:signUp?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (res.statusCode === 200) {
            resolve(response);
          } else {
            reject({ error: body, statusCode: res.statusCode });
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🔐 Creating admin user via Firebase REST API...\n');
  console.log(`Email: ${adminData.email}`);
  console.log(`Password: ${adminData.password}`);
  console.log(`Name: ${adminData.displayName}`);
  console.log(`Phone: ${adminData.phone}`);
  console.log(`Role: ${adminData.role}\n`);

  try {
    // Step 1: Create user in Firebase Auth
    console.log('⏳ Creating user in Firebase Authentication...');
    const authResult = await createUserViaREST();

    if (authResult.error && authResult.error.message === 'EMAIL_EXISTS') {
      console.log('⚠️  User already exists in Firebase Auth!');
      console.log('\n✅ User already created. Now you need to add the Firestore document.');
    } else {
      console.log(`✅ User created in Auth!`);
      console.log(`   Local ID: ${authResult.localId || authResult.idToken}\n`);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('NEXT STEPS:');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n📋 You need to add the user to Firestore database.\n');
    console.log('Option 1: Use Firebase Console (Easiest)');
    console.log('  1. Go to: https://console.firebase.google.com/project/appbase-b0e96/firestore');
    console.log('  2. Click "Start collection" if new, or go to existing "users" collection');
    console.log('  3. Click "Add document"');
    console.log('  4. Document ID: [Use the UID from Auth or auto-generate]');
    console.log('  5. Add these fields:');
    console.log('');
    console.log('     Field          Value              Type');
    console.log('     ──────────────────────────────────────────');
    console.log(`     email          ${adminData.email}      string`);
    console.log(`     displayName    ${adminData.displayName}  string`);
    console.log(`     phone          ${adminData.phone}       string`);
    console.log('     role           barber             string');
    console.log('     uid            [COPY_FROM_AUTH]   string (or auto)');
    console.log('     createdAt      [server timestamp] timestamp');
    console.log('');
    console.log('\n═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error.error || error.message);
    if (error.statusCode === 400) {
      console.log('\n⚠️  User might already exist!');
      console.log('   Follow the steps above to add/update Firestore document.\n');
    }
  }

  process.exit(0);
}

main();
