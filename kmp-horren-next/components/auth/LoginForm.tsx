"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Loader2, AlertCircle, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Voer een geldig e-mailadres in"),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 karakters zijn"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get redirect URL from query params (e.g., /login?redirect=/admin)
  const redirectTo = searchParams.get("redirect") || "/account";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError("Onjuist e-mailadres of wachtwoord");
        } else {
          setError(authError.message);
        }
        return;
      }

      // Redirect to the intended destination (or /account by default)
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-kmp-blue mb-2">Welkom terug</h1>
        <p className="text-gray-600">Log in op uw account</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            E-mailadres
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="uw@email.nl"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-400" />
              Wachtwoord
            </Label>
            <Link
              href="/wachtwoord-vergeten"
              className="text-sm text-kmp-orange hover:underline"
            >
              Vergeten?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Bezig met inloggen...
            </>
          ) : (
            <>
              Inloggen
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Nog geen account?{" "}
          <Link
            href="/registreren"
            className="text-kmp-blue font-semibold hover:underline"
          >
            Registreren
          </Link>
        </p>
      </div>
    </div>
  );
}
