"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import {
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  AlertCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "Voornaam moet minimaal 2 karakters zijn"),
    lastName: z.string().min(2, "Achternaam moet minimaal 2 karakters zijn"),
    email: z.string().email("Voer een geldig e-mailadres in"),
    phone: z.string().optional(),
    password: z
      .string()
      .min(8, "Wachtwoord moet minimaal 8 karakters zijn")
      .regex(/[A-Z]/, "Wachtwoord moet minimaal 1 hoofdletter bevatten")
      .regex(/[0-9]/, "Wachtwoord moet minimaal 1 cijfer bevatten"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "U moet akkoord gaan met de voorwaarden",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Wachtwoorden komen niet overeen",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const acceptTerms = watch("acceptTerms");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();

      // Sign up the user
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone || null,
          },
          emailRedirectTo: `${window.location.origin}/callback`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("Dit e-mailadres is al geregistreerd");
        } else {
          setError(signUpError.message);
        }
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
          Bevestig uw e-mailadres
        </h1>
        <p className="text-gray-600 mb-6">
          We hebben een bevestigingslink naar uw e-mailadres gestuurd. Klik op de
          link in de e-mail om uw account te activeren.
        </p>
        <Link href="/login">
          <Button
            variant="outline"
            className="w-full h-12 border-kmp-blue text-kmp-blue hover:bg-kmp-blue hover:text-white"
          >
            Terug naar inloggen
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-kmp-blue mb-2">Account aanmaken</h1>
        <p className="text-gray-600">Registreer voor een KMP Horren account</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              Voornaam
            </Label>
            <Input
              id="firstName"
              placeholder="Jan"
              {...register("firstName")}
              className={errors.firstName ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Achternaam</Label>
            <Input
              id="lastName"
              placeholder="Jansen"
              {...register("lastName")}
              className={errors.lastName ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            Telefoonnummer (optioneel)
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="06 12345678"
            {...register("phone")}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" />
            Wachtwoord
          </Label>
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
          <p className="text-xs text-gray-500">
            Minimaal 8 karakters, 1 hoofdletter en 1 cijfer
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) =>
              setValue("acceptTerms", checked as boolean)
            }
            disabled={isLoading}
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm text-gray-600 leading-tight cursor-pointer"
          >
            Ik ga akkoord met de{" "}
            <Link href="/algemene-voorwaarden" className="text-kmp-blue hover:underline">
              algemene voorwaarden
            </Link>{" "}
            en{" "}
            <Link href="/privacy-policy" className="text-kmp-blue hover:underline">
              privacy policy
            </Link>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Bezig met registreren...
            </>
          ) : (
            <>
              Registreren
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Heeft u al een account?{" "}
          <Link
            href="/login"
            className="text-kmp-blue font-semibold hover:underline"
          >
            Inloggen
          </Link>
        </p>
      </div>
    </div>
  );
}
