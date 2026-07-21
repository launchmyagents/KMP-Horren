"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, unknown>
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Lazy useState initializer so the client (and its mock fallback) is
  // created once per component instance, not on every render — a fresh
  // mock client each render gave `supabase.auth` a new identity every
  // time, retriggering the effect below in an infinite loop.
  const [supabase] = useState(() => createClient());

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setState({
          user: session?.user ?? null,
          session,
          isLoading: false,
          isAuthenticated: !!session,
        });
      } catch (error) {
        console.error("Error initializing auth:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setState({
        user: session?.user ?? null,
        session,
        isLoading: false,
        isAuthenticated: !!session,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error };
        }

        router.refresh();
        return { error: null };
      } catch (error) {
        return { error: error as Error };
      }
    },
    [supabase.auth, router]
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      metadata?: Record<string, unknown>
    ) => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
            emailRedirectTo: `${window.location.origin}/callback`,
          },
        });

        if (error) {
          return { error };
        }

        return { error: null };
      } catch (error) {
        return { error: error as Error };
      }
    },
    [supabase.auth]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }, [supabase.auth, router]);

  const resetPassword = useCallback(
    async (email: string) => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/wachtwoord-reset`,
        });

        if (error) {
          return { error };
        }

        return { error: null };
      } catch (error) {
        return { error: error as Error };
      }
    },
    [supabase.auth]
  );

  const updatePassword = useCallback(
    async (newPassword: string) => {
      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          return { error };
        }

        return { error: null };
      } catch (error) {
        return { error: error as Error };
      }
    },
    [supabase.auth]
  );

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };
}
