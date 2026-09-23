import { createContext, useContext } from 'react';

export type AuthUser = {
  uid: string;
  name: string | null;
  email: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshUser: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
};
