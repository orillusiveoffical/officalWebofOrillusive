import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface BookingItem {
  _id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'pending' | 'reviewed' | 'confirmed';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  bookings: BookingItem[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fetchMyBookings: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('orillusive_auth_token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('orillusive_auth_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
          setToken(storedToken);
        } else {
          localStorage.removeItem('orillusive_auth_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('[AUTH CONTEXT INIT ERROR]', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const fetchMyBookings = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/bookings/my', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error('[FETCH BOOKINGS ERROR]', err);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchMyBookings();
    } else {
      setBookings([]);
    }
  }, [user, token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('orillusive_auth_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error during login' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('orillusive_auth_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setBookings([]);
    localStorage.removeItem('orillusive_auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, bookings, login, register, logout, fetchMyBookings }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
