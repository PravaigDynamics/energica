import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Auth state changed:', user ? user.email : 'No user');
      if (user) {
        // Get user role from Firestore
        try {
          console.log('🔍 Fetching user role from Firestore...');
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('✅ User data loaded:', userData);
            setUserRole(userData.role || 'user');
            setCurrentUser({ ...user, role: userData.role });
          } else {
            console.log('⚠️ No user document, setting default role');
            setUserRole('user');
            setCurrentUser({ ...user, role: 'user' });
          }
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
          console.log('⚠️ Continuing with basic auth info');
          setUserRole('user');
          setCurrentUser({ ...user, role: 'user' });
        }
      } else {
        setCurrentUser(null);
        setUserRole('user');
      }
      setLoading(false);
      console.log('✅ Auth context loading complete');
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    isAdmin: userRole === 'admin',
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
