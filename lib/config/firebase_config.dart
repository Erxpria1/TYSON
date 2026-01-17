import 'package:firebase_core/firebase_core.dart';
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class FirebaseConfig {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (Platform.operatingSystem) {
      case 'ios':
        return ios;
      case 'android':
        return android;
      default:
        throw UnsupportedError(
          'FirebaseOptions are not supported for this platform.',
        );
    }
  }

  // TODO: Replace with your actual Firebase configuration
  // Get these from Firebase Console > Project Settings > Your apps
  static const FirebaseOptions web = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY'),
    authDomain: String.fromEnvironment('FIREBASE_AUTH_DOMAIN'),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID'),
    storageBucket: String.fromEnvironment('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: String.fromEnvironment('FIREBASE_MESSAGING_SENDER_ID'),
    appId: String.fromEnvironment('FIREBASE_APP_ID'),
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY'),
    authDomain: String.fromEnvironment('FIREBASE_AUTH_DOMAIN'),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID'),
    storageBucket: String.fromEnvironment('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: String.fromEnvironment('FIREBASE_MESSAGING_SENDER_ID'),
    appId: String.fromEnvironment('FIREBASE_APP_ID'),
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: String.fromEnvironment('FIREBASE_API_KEY'),
    authDomain: String.fromEnvironment('FIREBASE_AUTH_DOMAIN'),
    projectId: String.fromEnvironment('FIREBASE_PROJECT_ID'),
    storageBucket: String.fromEnvironment('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: String.fromEnvironment('FIREBASE_MESSAGING_SENDER_ID'),
    appId: String.fromEnvironment('FIREBASE_APP_ID'),
    iosBundleId: 'com.tyhairdesign.app',
  );
}
