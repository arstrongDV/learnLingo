import { useEffect, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { subscribeToAuthChanges } from '../services/auth';
import { AuthContext, type AuthUser } from './useAuth';

const toAuthUser = (user: User | null): AuthUser | null =>
  user ? { uid: user.uid, name: user.displayName, email: user.email } : null;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Firebase calls this on page load (restoring the saved session), on login and on logout
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(toAuthUser(firebaseUser));
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  // Needed after updateProfile(), which doesn't trigger the auth listener
  const refreshUser = () => setUser(toAuthUser(auth.currentUser));

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
