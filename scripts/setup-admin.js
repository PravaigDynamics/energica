import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

async function createAdminAccount() {
  const adminEmail = 'admin@energica.com';
  const adminPassword = 'admin123';
  const displayName = 'Energica Admin';

  try {
    console.log('Creating admin account...');

    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    const user = userCredential.user;

    console.log('✅ Admin user created:', user.uid);

    // Update display name
    await updateProfile(user, { displayName });
    console.log('✅ Display name updated');

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName,
      role: 'admin',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      emailVerified: false,
      isActive: true,
      permissions: ['read', 'write', 'delete', 'admin']
    });

    console.log('✅ Admin document created in Firestore');
    console.log('\n🎉 Admin account setup complete!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('\n⚠️  Note: You should verify your email and change the password after first login.');

    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  Admin account already exists!');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    } else {
      console.error('❌ Error creating admin account:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
    }
    process.exit(1);
  }
}

createAdminAccount();
