"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

interface UseUserReturn {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  updateProfile: (data: Partial<Omit<UserProfile, "id" | "email" | "createdAt">>) => Promise<{ error: Error | null }>;
  refresh: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!authUser) {
        setUser(null);
        setProfile(null);
        return;
      }

      setUser(authUser);

      // Build profile from user metadata
      const userProfile: UserProfile = {
        id: authUser.id,
        email: authUser.email || "",
        firstName: authUser.user_metadata?.first_name || null,
        lastName: authUser.user_metadata?.last_name || null,
        phone: authUser.user_metadata?.phone || null,
        avatarUrl: authUser.user_metadata?.avatar_url || null,
        createdAt: authUser.created_at,
      };

      setProfile(userProfile);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase.auth]);

  useEffect(() => {
    fetchUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        setUser(session.user);
        setProfile({
          id: session.user.id,
          email: session.user.email || "",
          firstName: session.user.user_metadata?.first_name || null,
          lastName: session.user.user_metadata?.last_name || null,
          phone: session.user.user_metadata?.phone || null,
          avatarUrl: session.user.user_metadata?.avatar_url || null,
          createdAt: session.user.created_at,
        });
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUser, supabase.auth]);

  const updateProfile = useCallback(
    async (data: Partial<Omit<UserProfile, "id" | "email" | "createdAt">>) => {
      try {
        const updateData: Record<string, unknown> = {};

        if (data.firstName !== undefined) {
          updateData.first_name = data.firstName;
        }
        if (data.lastName !== undefined) {
          updateData.last_name = data.lastName;
        }
        if (data.phone !== undefined) {
          updateData.phone = data.phone;
        }
        if (data.avatarUrl !== undefined) {
          updateData.avatar_url = data.avatarUrl;
        }

        const { error: updateError } = await supabase.auth.updateUser({
          data: updateData,
        });

        if (updateError) {
          return { error: updateError };
        }

        // Refresh user data
        await fetchUser();

        return { error: null };
      } catch (err) {
        return { error: err as Error };
      }
    },
    [supabase.auth, fetchUser]
  );

  const refresh = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  return {
    user,
    profile,
    isLoading,
    error,
    updateProfile,
    refresh,
  };
}
