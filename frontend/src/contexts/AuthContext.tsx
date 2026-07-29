import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as api from "../services/api";
import type { LogInRequest } from "../types/LogInRequest";

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  user: string | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  login: (credentials: LogInRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: LogInRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      '"useAuth" must be used within an "AuthProvider" component',
    );
  }
  return context;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    setLoading(true);
    try {
      const user = await api.getUser();
      setUser(user.username);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials: LogInRequest) {
    await api.login(credentials);
    await refreshUser();
  }

  async function logout() {
    await api.logout();
    await refreshUser();
  }

  async function register(credentials: LogInRequest) {
    await api.register(credentials);
    await refreshUser();
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshUser, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
