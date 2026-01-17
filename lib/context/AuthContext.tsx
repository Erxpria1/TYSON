import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '@/lib/firebase';

const AUTH_USER_KEY = '@ty_auth_user';
const AUTH_ROLE_KEY = '@ty_auth_role';
const AUTH_EMAIL_KEY = '@ty_auth_email';

interface AuthContextType {
  user: User | null;
  userData: any | null;
  loading: boolean;
  role: 'customer' | 'barber' | null;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  initialCheckDone: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  role: null,
  signOut: async () => {},
  isAuthenticated: false,
  initialCheckDone: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'customer' | 'barber' | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const isAuthenticated = !!user;

  const checkPersistedAuth = async (): Promise<{ email: string | null, role: string | null }> => {
    try {
      const email = await AsyncStorage.getItem(AUTH_EMAIL_KEY);
      const savedRole = await AsyncStorage.getItem(AUTH_ROLE_KEY);
      return { email, role: savedRole };
    } catch (error) {
      return { email: null, role: null };
    }
  };

  useEffect(() => {
    let mounted = true;
    let unsubscribe: () => void;

    const initAuth = async () => {
      const { email, role: savedRole } = await checkPersistedAuth();

      if (savedRole && mounted) {
        setRole(savedRole as 'customer' | 'barber');
      }

      try {
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!mounted) return;

          if (firebaseUser) {
            setUser(firebaseUser);

            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              const data = userDoc.data();

              if (mounted) {
                setUserData(data);
                const userRole = data?.role || 'customer';
                setRole(userRole);

                await AsyncStorage.setItem(AUTH_USER_KEY, firebaseUser.uid);
                await AsyncStorage.setItem(AUTH_ROLE_KEY, userRole);
                await AsyncStorage.setItem(AUTH_EMAIL_KEY, firebaseUser.email || '');
              }
            } catch (error) {
              if (mounted) {
                setRole('customer');
              }
            }
          } else {
            await AsyncStorage.multiRemove([AUTH_EMAIL_KEY, AUTH_USER_KEY, AUTH_ROLE_KEY]);

            if (mounted) {
              setUser(null);
              setUserData(null);
              setRole(null);
            }
          }

          if (mounted) {
            setLoading(false);
            setInitialCheckDone(true);
          }
        });
      } catch (err: any) {
        console.error('Auth initialization failed (Firebase may be misconfigured):', err?.message || err);
        if (mounted) {
          // Allow app to continue without auth so other flows can be tested
          setLoading(false);
          setInitialCheckDone(true);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      await AsyncStorage.multiRemove([AUTH_USER_KEY, AUTH_ROLE_KEY, AUTH_EMAIL_KEY]);
      setUser(null);
      setUserData(null);
      setRole(null);
    } catch (error) {
      // Error handling silently
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, role, signOut, isAuthenticated, initialCheckDone }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
