import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';
import toast from 'react-hot-toast';

class AuthService {
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    this.setupAuthStateListener();
  }

  setupAuthStateListener() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Update last login timestamp
        try {
          await setDoc(doc(db, 'users', user.uid), {
            lastLogin: serverTimestamp(),
            emailVerified: user.emailVerified
          }, { merge: true });
        } catch (error) {
          console.error('Error updating user login timestamp:', error);
        }
      }
    });
  }

  async registerUser(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName });

      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        role: 'user',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        emailVerified: false,
        isActive: true
      });

      // Send verification email
      await sendEmailVerification(user);

      toast.success('Registration successful! Please verify your email.');
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(this.getErrorMessage(error.code));
      return { success: false, error: error.message };
    }
  }

  async loginUser(email, password) {
    try {
      console.log('🔐 Attempting login for:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ Firebase auth successful:', user.uid);

      // Check if email is verified (skip for development)
      if (!user.emailVerified && import.meta.env.VITE_APP_ENV !== 'development') {
        console.log('❌ Email not verified');
        await signOut(auth);
        toast.error('Please verify your email before logging in.');
        return { success: false, error: 'Email not verified' };
      }
      console.log('✅ Email verification check passed (dev mode)');

      // Check if user is active (skip Firestore check if not available)
      try {
        console.log('🔍 Checking Firestore for user data...');
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          console.log('✅ User document found:', userDoc.data());
          const userData = userDoc.data();
          // Only check isActive if the field exists and is explicitly false
          if (userData.isActive === false) {
            await signOut(auth);
            toast.error('Your account has been deactivated.');
            return { success: false, error: 'Account deactivated' };
          }
        } else {
          console.log('ℹ️ No user document found in Firestore');
        }
      } catch (firestoreError) {
        console.warn('⚠️ Firestore check skipped:', firestoreError.code, firestoreError.message);
        // Continue login even if Firestore is not available
      }

      console.log('✅ Login successful!');
      toast.success('Login successful!');
      return { success: true, user };
    } catch (error) {
      console.error('❌ Login error:', error.code, error.message);
      toast.error(this.getErrorMessage(error.code));
      return { success: false, error: error.message };
    }
  }

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const user = result.user;

      // Create or update user document
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'user',
        lastLogin: serverTimestamp(),
        provider: 'google',
        isActive: true
      }, { merge: true });

      toast.success('Google login successful!');
      return { success: true, user };
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(this.getErrorMessage(error.code));
      return { success: false, error: error.message };
    }
  }

  async loginWithFacebook() {
    try {
      const result = await signInWithPopup(auth, this.facebookProvider);
      const user = result.user;

      // Create or update user document
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'user',
        lastLogin: serverTimestamp(),
        provider: 'facebook',
        isActive: true
      }, { merge: true });

      toast.success('Facebook login successful!');
      return { success: true, user };
    } catch (error) {
      console.error('Facebook login error:', error);
      toast.error(this.getErrorMessage(error.code));
      return { success: false, error: error.message };
    }
  }

  async logout() {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
      return { success: false, error: error.message };
    }
  }

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(this.getErrorMessage(error.code));
      return { success: false, error: error.message };
    }
  }

  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/email-already-in-use': 'Email already registered',
      'auth/invalid-email': 'Invalid email address',
      'auth/operation-not-allowed': 'Operation not allowed',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/user-disabled': 'Account has been disabled',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Invalid password',
      'auth/too-many-requests': 'Too many attempts. Try again later',
      'auth/network-request-failed': 'Network error. Check your connection'
    };
    return errorMessages[errorCode] || 'An error occurred. Please try again.';
  }

  // Admin-specific methods
  async createAdminUser(email, password, displayName) {
    try {
      // This should be called from a secure admin panel only
      const adminCredential = await createUserWithEmailAndPassword(auth, email, password);
      const admin = adminCredential.user;

      await updateProfile(admin, { displayName });

      await setDoc(doc(db, 'users', admin.uid), {
        uid: admin.uid,
        email: admin.email,
        displayName,
        role: 'admin',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isActive: true,
        permissions: ['read', 'write', 'delete', 'admin']
      });

      return { success: true, user: admin };
    } catch (error) {
      console.error('Admin creation error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new AuthService();
