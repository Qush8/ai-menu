import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export interface AuthUser {
  displayName: string;
  photoURL?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (provider: 'google' | 'apple') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USERS: Record<'google' | 'apple', AuthUser> = {
  google: { displayName: 'Google User', photoURL: undefined },
  apple: { displayName: 'Apple User', photoURL: undefined },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback((provider: 'google' | 'apple') => {
    setLoading(true);
    setTimeout(() => {
      setUser(MOCK_USERS[provider]);
      setLoading(false);
    }, 300);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextValue = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
