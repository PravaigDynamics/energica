import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaqW8-mdPLbLLcLSITczUYZIwPSXLquYM",
  authDomain: "energica-admin.firebaseapp.com",
  projectId: "energica-admin",
  storageBucket: "energica-admin.firebasestorage.app",
  messagingSenderId: "140963133320",
  appId: "1:140963133320:web:95988e29471cc600ca6c3d",
  measurementId: "G-ZQJ0V1VHDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createUserDocument() {
  const adminEmail = 'admin@energica.com';
  const adminPassword = 'admin123';

  try {
    console.log('Signing in to get user ID...');
    const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    const user = userCredential.user;

    console.log('✅ Signed in as:', user.uid);
    console.log('Creating/updating user document in Firestore...');

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: 'Energica Admin',
      role: 'admin',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      emailVerified: user.emailVerified,
      isActive: true,
      permissions: ['read', 'write', 'delete', 'admin']
    });

    console.log('✅ User document created successfully!');
    console.log('\n🎉 Admin account is now fully set up!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('\n✨ You can now log in to your app!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    process.exit(1);
  }
}

createUserDocument();
