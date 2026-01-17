/**
 * Firebase Admin User Creation Script
 * Creates an admin user in Firebase Authentication and Firestore
 *
 * Usage: node scripts/create-admin.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Firebase config (matches lib/firebase.ts)
const firebaseConfig = {
  apiKey: 'AIzaSyDqhJpsmB5JTwmj-Qp4bLJFGm-zaovdqm0',
  authDomain: 'appbase-b0e96.firebaseapp.com',
  projectId: 'appbase-b0e96',
  storageBucket: 'appbase-b0e96.firebasestorage.app',
  messagingSenderId: '410229978344',
  appId: '1:410229978344:web:d9df8fd4808abfca0dc55d',
};

// Admin credentials - you need to download service account key from Firebase Console
// Path: Project Settings -> Service Accounts -> Generate New Private Key
const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');

// Check if service account exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Service account key not found!');
  console.log('\n📋 To create an admin user, you need to:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/appbase-b0e96/settings/serviceaccounts/adminsdk');
  console.log('2. Click "Generate new private key"');
  console.log('3. Save it as: firebase-service-account.json in the project root');
  console.log('4. Run this script again\n');

  console.log('⚠️  Alternative: Create admin manually via Firebase Console');
  console.log('   1. Go to: https://console.firebase.google.com/project/appbase-b0e96/authentication/users');
  console.log('   2. Click "Add user"');
  console.log('   3. Email: tarikyalcin@hotmail.com');
  console.log('   4. Password: 123456');
  console.log('   5. Then manually add to Firestore database:');
  console.log(`
   Collection: users
   Document: [USER_UID_FROM_AUTH]
   Fields:
   - uid: "[USER_UID_FROM_AUTH]"
   - email: "tarikyalcin@hotmail.com"
   - displayName: "Tarık Yalçın"
   - phone: "05335494014"
   - role: "barber"
   - createdAt: [CURRENT_TIMESTAMP]
   `);
  process.exit(1);
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  ...firebaseConfig,
});

const auth = admin.auth();
const db = admin.firestore();

// Admin user data
const adminData = {
  email: 'tarikyalcin@hotmail.com',
  password: '123456',
  displayName: 'Tarık Yalçın',
  phone: '05335494014',
  role: 'barber',
};

async function createAdminUser() {
  try {
    console.log('🔐 Creating admin user...\n');
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log(`Name: ${adminData.displayName}`);
    console.log(`Phone: ${adminData.phone}`);
    console.log(`Role: ${adminData.role}\n`);

    // Step 1: Create user in Firebase Authentication
    console.log('⏳ Creating user in Firebase Authentication...');
    const userRecord = await auth.createUser({
      email: adminData.email,
      password: adminData.password,
      displayName: adminData.displayName,
      phoneNumber: adminData.phone.startsWith('+') ? adminData.phone : `+90${adminData.phone}`,
    });

    console.log(`✅ User created in Auth with UID: ${userRecord.uid}\n`);

    // Step 2: Add user document to Firestore
    console.log('⏳ Adding user to Firestore database...');
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: adminData.email,
      displayName: adminData.displayName,
      phone: adminData.phone,
      role: adminData.role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('✅ User added to Firestore\n');

    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 ADMIN USER CREATED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`\n📧 Email:    ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log(`📱 Phone:    ${adminData.phone}`);
    console.log(`👤 Name:     ${adminData.displayName}`);
    console.log(`🔐 Role:     ${adminData.role}`);
    console.log(`\n🆔 UID:      ${userRecord.uid}`);
    console.log('\n═══════════════════════════════════════════════════════\n');

    console.log('💡 You can now login with these credentials in the app!');
    console.log('   Use the "Berber Girişi" (Barber Login) screen.\n');

  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('⚠️  User with this email already exists!');
      console.log('\n📋 To update the existing user to admin role, run:');
      console.log('   node scripts/update-to-admin.js\n');
    } else if (error.code === 'auth/uid-already-exists') {
      console.log('⚠️  User with this UID already exists!');
    } else {
      console.error('❌ Error creating admin user:', error.message);
    }
    console.error('\nFull error:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
createAdminUser();
