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
  role?: 'admin' | 'user';
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (provider: 'google' | 'apple', asAdmin?: boolean) => void;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USERS: Record<'google' | 'apple', Omit<AuthUser, 'role'>> = {
  google: { displayName: 'Google User', photoURL: undefined },
  apple: { displayName: 'Apple User', photoURL: undefined },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback((provider: 'google' | 'apple', asAdmin = false) => {
    setLoading(true);
    setTimeout(() => {
      const base = MOCK_USERS[provider];
      setUser({ ...base, role: asAdmin ? 'admin' : 'user' });
      setLoading(false);
    }, 300);
  }, []);

  const loginWithEmailPassword = useCallback((email: string, _password: string) => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ displayName: email || 'Admin User', role: 'admin' });
        setLoading(false);
        resolve();
      }, 300);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextValue = { user, loading, login, loginWithEmailPassword, logout };

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
