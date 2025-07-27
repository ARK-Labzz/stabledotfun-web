"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export function useAuthGuard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // If not authenticated, redirect to signup
    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }
  }, [isAuthenticated, user, isLoading, router]);

  return {
    isAuthenticated,
    user,
    isLoading,
  };
}