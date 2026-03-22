import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  email: string;
  id: string;
}

interface AuthContext {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthContext | undefined>(undefined);

// These would normally come from environment variables
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "MQmz9weQb9ccMhsf";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("portfolio_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const newUser = { email, id: "admin-id" };
      setUser(newUser);
      setIsAdmin(true);
      localStorage.setItem("portfolio_user", JSON.stringify(newUser));
      return { error: null };
    } else {
      return { error: new Error("Invalid email or password") };
    }
  };

  const signOut = async () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("portfolio_user");
  };

  return (
    <AuthCtx.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
