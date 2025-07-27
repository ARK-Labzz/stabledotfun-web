// hooks/use-auth-guard.ts
"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export function useAuthGuard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // Don't redirect if we already have
    if (hasRedirected.current) return;

    // Only redirect if auth is complete and user is not authenticated
    if (!isLoading && !isAuthenticated && !user) {
      hasRedirected.current = true;
      router.push('/auth/signup');
      return;
    }

    // Reset redirect flag if user becomes authenticated
    if (isAuthenticated && user) {
      hasRedirected.current = false;
    }
  }, [isAuthenticated, user, isLoading, router]);

  return {
    isAuthenticated,
    user,
    isLoading,
  };
}