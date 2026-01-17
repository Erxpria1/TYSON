/**
 * Update Existing User to Admin Role
 * Use this when the user already exists in Firebase Auth
 *
 * Usage: node scripts/update-to-admin.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Service account key not found!');
  console.log('\n📋 See create-admin.js for instructions on how to set up the service account.\n');
  process.exit(1);
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();
const auth = admin.auth();

// Admin user data
const adminEmail = 'tarikyalcin@hotmail.com';

async function updateToAdmin() {
  try {
    console.log('🔍 Looking for user...\n');
    console.log(`Email: ${adminEmail}\n`);

    // Step 1: Find user by email
    const userRecord = await auth.getUserByEmail(adminEmail);
    console.log(`✅ User found with UID: ${userRecord.uid}\n`);

    // Step 2: Update user in Firestore
    console.log('⏳ Updating user role in Firestore...');
    const userDoc = await db.collection('users').doc(userRecord.uid).get();

    if (userDoc.exists) {
      await db.collection('users').doc(userRecord.uid).update({
        role: 'barber',
        phone: '05335494014',
        displayName: 'Tarık Yalçın',
      });
      console.log('✅ Updated existing user document\n');
    } else {
      console.log('⏳ Creating new user document...');
      await db.collection('users').doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: adminEmail,
        displayName: 'Tarık Yalçın',
        phone: '05335494014',
        role: 'barber',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log('✅ Created new user document\n');
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 USER UPDATED TO ADMIN!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`\n📧 Email:    ${adminEmail}`);
    console.log(`📱 Phone:    05335494014`);
    console.log(`👤 Name:     Tarık Yalçın`);
    console.log(`🔐 Role:     barber`);
    console.log(`\n🆔 UID:      ${userRecord.uid}`);
    console.log('\n═══════════════════════════════════════════════════════\n');

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.log('❌ User not found! Please create the user first.');
      console.log('   Run: node scripts/create-admin.js\n');
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    process.exit(0);
  }
}

updateToAdmin();
