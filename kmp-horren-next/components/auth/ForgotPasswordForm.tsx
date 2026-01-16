"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import {
  Mail,
  Loader2,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Send,
} from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Voer een geldig e-mailadres in"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${window.location.origin}/wachtwoord-reset`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-kmp-blue mb-4">
          E-mail verzonden
        </h1>
        <p className="text-gray-600 mb-6">
          Als dit e-mailadres bij ons bekend is, ontvangt u binnen enkele minuten
          een link om uw wachtwoord te resetten.
        </p>
        <Link href="/login">
          <Button
            variant="outline"
            className="w-full h-12 border-kmp-blue text-kmp-blue hover:bg-kmp-blue hover:text-white"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Terug naar inloggen
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-kmp-blue mb-2">
          Wachtwoord vergeten?
        </h1>
        <p className="text-gray-600">
          Vul uw e-mailadres in en we sturen u een link om uw wachtwoord te
          resetten.
        </p>
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

        <Button
          type="submit"
          className="w-full h-12 bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Bezig met verzenden...
            </>
          ) : (
            <>
              Verstuur reset link
              <Send className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-gray-600 hover:text-kmp-blue transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Terug naar inloggen
        </Link>
      </div>
    </div>
  );
}
