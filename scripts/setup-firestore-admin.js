/**
 * FIREBASE ADMIN SETUP WITH SERVICE ACCOUNT
 *
 * This script CAN automatically add the user to Firestore.
 * You need to provide the service account key file.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../firebase-service-account.json');

const adminData = {
  email: 'tarikyalcin@hotmail.com',
  displayName: 'Tarık Yalçın',
  phone: '05335494014',
  role: 'barber',
};

console.log('🔍 Checking for service account key...\n');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.log('❌ Service account key not found at: firebase-service-account.json\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📋 HOW TO GET SERVICE ACCOUNT KEY');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log('1. Go to Firebase Console:');
  console.log('   https://console.firebase.google.com/project/appbase-b0e96/settings/serviceaccounts/adminsdk\n');
  console.log('2. Click "Generate new private key"\n');
  console.log('3. Download the JSON file\n');
  console.log('4. Save it in project ROOT as: firebase-service-account.json\n');
  console.log('5. Run this script again: node scripts/setup-firestore-admin.js\n');
  console.log('═══════════════════════════════════════════════════════\n');
  process.exit(1);
}

console.log('✅ Service account key found!\n');

// Initialize Firebase Admin
try {
  const serviceAccount = require(SERVICE_ACCOUNT_PATH);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();

  async function setupAdmin() {
    try {
      // First, get the user by email from Auth
      console.log('🔍 Looking up user in Authentication...');
      const auth = admin.auth();

      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(adminData.email);
        console.log(`✅ User found! UID: ${userRecord.uid}\n`);
      } catch (err) {
        if (err.code === 'auth/user-not-found') {
          console.log('⚠️  User NOT found in Authentication!');
          console.log('   Creating user in Auth first...\n');

          userRecord = await auth.createUser({
            email: adminData.email,
            password: '123456',
            displayName: adminData.displayName,
            phoneNumber: '+90' + adminData.phone,
          });
          console.log(`✅ User created! UID: ${userRecord.uid}\n`);
        } else {
          throw err;
        }
      }

      // Now add/update Firestore document
      console.log('⏳ Adding user to Firestore...');
      const userRef = db.collection('users').doc(userRecord.uid);

      const doc = await userRef.get();
      if (doc.exists) {
        console.log('⚠️  Document already exists. Updating...\n');
        await userRef.update({
          role: adminData.role,
          phone: adminData.phone,
          displayName: adminData.displayName,
        });
        console.log('✅ Document updated!\n');
      } else {
        console.log('Creating new document...\n');
        await userRef.set({
          uid: userRecord.uid,
          email: adminData.email,
          displayName: adminData.displayName,
          phone: adminData.phone,
          role: adminData.role,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log('✅ Document created!\n');
      }

      console.log('═══════════════════════════════════════════════════════');
      console.log('🎉 ADMIN SETUP COMPLETE!');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`\n📧 Email:    ${adminData.email}`);
      console.log(`🔑 Password: 123456`);
      console.log(`👤 Name:     ${adminData.displayName}`);
      console.log(`📱 Phone:    ${adminData.phone}`);
      console.log(`🔐 Role:     ${adminData.role}`);
      console.log(`🆔 UID:      ${userRecord.uid}\n`);
      console.log('✅ You can now login in the app!\n');

    } catch (error) {
      console.error('❌ Error:', error.message);
      console.error(error);
    } finally {
      process.exit(0);
    }
  }

  setupAdmin();

} catch (error) {
  console.error('❌ Error loading service account:', error.message);
  console.log('\nMake sure the JSON file is valid and in the correct location.\n');
  process.exit(1);
}
