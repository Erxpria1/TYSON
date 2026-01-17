import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, initializeAuth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Try to load react-native persistence helper at runtime. Metro may not expose 'firebase/auth/react-native' in all setups.
let getReactNativePersistence: ((storage: any) => any) | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const rnAuth = require('firebase/auth/react-native');
  getReactNativePersistence = rnAuth?.getReactNativePersistence;
} catch (err) {
  getReactNativePersistence = undefined;
}

// Firebase yapılandırması
// Hassas değerler `.env` (veya CI ortam değişkenleri) aracılığıyla sağlanmalıdır.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Güvenlik kontrolü: kritik env değişkenleri eksikse — geliştirmede uyarı, üretimde hata fırlat
const requiredKeys = ['EXPO_PUBLIC_FIREBASE_API_KEY', 'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN', 'EXPO_PUBLIC_FIREBASE_PROJECT_ID', 'EXPO_PUBLIC_FIREBASE_APP_ID'];
const missing = requiredKeys.filter((k) => !process.env[k]);
if (missing.length) {
  const msg = `Missing Firebase env vars: ${missing.join(', ')}. Add them to .env and do not commit.`;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(msg);
  } else {
    console.warn('Warning:', msg);
  }
}

// Debug: show masked prefix and length of loaded API key (do not log full key)
if (process.env.EXPO_PUBLIC_FIREBASE_API_KEY) {
  const key = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
  console.log('DEBUG: EXPO_PUBLIC_FIREBASE_API_KEY prefix=', `${key.slice(0,8)}…`, 'length=', key.length);
} else {
  console.log('DEBUG: EXPO_PUBLIC_FIREBASE_API_KEY is undefined');
}

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  try {
    // Initialize Auth with React Native AsyncStorage persistence so auth state is persisted between app restarts
    if (getReactNativePersistence) {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage as any),
      });
    } else {
      auth = getAuth(app);
    }
  } catch (err) {
    // Fallback to getAuth if initializeAuth throws
    auth = getAuth(app);
  }
  db = getFirestore(app);
} else {
  app = getApps()[0];
  try {
    if (getReactNativePersistence) {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage as any),
      });
    } else {
      auth = getAuth(app);
    }
  } catch (err) {
    auth = getAuth(app);
  }
  db = getFirestore(app);
}

export { app, auth, db };
export default app;
