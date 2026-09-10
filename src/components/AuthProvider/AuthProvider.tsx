'use client';

import { useEffect, ReactNode } from 'react';
import { getCurrentUser, refreshSession } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await refreshSession();
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        clearAuth();
      }
    };

    checkSession();
  }, [setUser, clearAuth]);

  return <>{children}</>;
}
