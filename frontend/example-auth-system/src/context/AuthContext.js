"use client";

import { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const logoutTimer = useRef(null);

  const logout = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    api.post('/logout'); 
    setUser(null);
    router.push('/login');
  }, [router]);


  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data } = await api.get('/me');
        setUser({ email: data.email });

        if (logoutTimer.current) {
          clearTimeout(logoutTimer.current);
        }
        const remainingTime = (data.exp * 1000) - new Date().getTime();
        
        if (remainingTime > 0) {
          logoutTimer.current = setTimeout(logout, remainingTime);
        } else {
          logout();
        }

      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [logout]);

  useEffect(() => {
    const errorInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && user && pathname !== '/login') {
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(errorInterceptor);
  }, [router, pathname, logout, user]);

  const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password });
    setUser({ email: data.email });

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    const remainingTime = (data.exp * 1000) - new Date().getTime();
    logoutTimer.current = setTimeout(logout, remainingTime);

    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);