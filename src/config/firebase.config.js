import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Enhanced Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
  console.log('📱 Project ID:', firebaseConfig.projectId);
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Connect to emulators in development (only if enabled)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.warn('Firebase emulators not available:', error);
  }
}

// Enhanced security rules helper
export const firebaseSecurityRules = {
  users: {
    read: 'request.auth != null',
    write: 'request.auth != null && request.auth.uid == resource.id'
  },
  garage: {
    read: 'request.auth != null',
    write: 'request.auth != null && request.auth.uid == resource.data.userId'
  }
};

export { auth, db, storage, analytics };
export default app;
