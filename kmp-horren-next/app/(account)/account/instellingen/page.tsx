"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
  Save,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const profileSchema = z.object({
  firstName: z.string().min(2, "Voornaam moet minimaal 2 karakters zijn"),
  lastName: z.string().min(2, "Achternaam moet minimaal 2 karakters zijn"),
  phone: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Huidig wachtwoord is verplicht"),
    newPassword: z
      .string()
      .min(8, "Wachtwoord moet minimaal 8 karakters zijn")
      .regex(/[A-Z]/, "Wachtwoord moet minimaal 1 hoofdletter bevatten")
      .regex(/[0-9]/, "Wachtwoord moet minimaal 1 cijfer bevatten"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Wachtwoorden komen niet overeen",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email || "");
        profileForm.reset({
          firstName: user.user_metadata?.first_name || "",
          lastName: user.user_metadata?.last_name || "",
          phone: user.user_metadata?.phone || "",
        });
      }
    };

    loadUserData();
  }, [profileForm]);

  const handleProfileSubmit = async (data: ProfileFormData) => {
    setIsLoadingProfile(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || null,
        },
      });

      if (error) throw error;

      toast.success("Profiel succesvol bijgewerkt");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Er ging iets mis");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setIsLoadingPassword(true);

    try {
      const supabase = createClient();

      // First verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: data.currentPassword,
      });

      if (signInError) {
        toast.error("Huidig wachtwoord is onjuist");
        return;
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      toast.success("Wachtwoord succesvol gewijzigd");
      passwordForm.reset();
    } catch (error: any) {
      toast.error(error.message || "Er ging iets mis");
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);

    try {
      // In production, this would call an API endpoint that uses the service role
      // to delete the user and their data
      toast.info("Account verwijderen is tijdelijk uitgeschakeld in demo modus");
    } catch (error: any) {
      toast.error(error.message || "Er ging iets mis");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-kmp-blue">Instellingen</h1>
        <p className="text-gray-600">Beheer uw accountgegevens en wachtwoord</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-kmp-orange" />
          <h2 className="text-lg font-semibold text-kmp-blue">Profielgegevens</h2>
        </div>

        <form
          onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Voornaam</Label>
              <Input
                id="firstName"
                {...profileForm.register("firstName")}
                className={
                  profileForm.formState.errors.firstName ? "border-red-500" : ""
                }
              />
              {profileForm.formState.errors.firstName && (
                <p className="text-xs text-red-500">
                  {profileForm.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Achternaam</Label>
              <Input
                id="lastName"
                {...profileForm.register("lastName")}
                className={
                  profileForm.formState.errors.lastName ? "border-red-500" : ""
                }
              />
              {profileForm.formState.errors.lastName && (
                <p className="text-xs text-red-500">
                  {profileForm.formState.errors.lastName.message}
                </p>
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
              value={userEmail}
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">
              E-mailadres kan niet worden gewijzigd
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              Telefoonnummer
            </Label>
            <Input
              id="phone"
              type="tel"
              {...profileForm.register("phone")}
              placeholder="06 12345678"
            />
          </div>

          <Button
            type="submit"
            className="bg-kmp-orange hover:bg-kmp-orange/90"
            disabled={isLoadingProfile}
          >
            {isLoadingProfile ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Opslaan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Profiel opslaan
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Password Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-kmp-orange" />
          <h2 className="text-lg font-semibold text-kmp-blue">
            Wachtwoord wijzigen
          </h2>
        </div>

        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Huidig wachtwoord</Label>
            <Input
              id="currentPassword"
              type="password"
              {...passwordForm.register("currentPassword")}
              className={
                passwordForm.formState.errors.currentPassword
                  ? "border-red-500"
                  : ""
              }
            />
            {passwordForm.formState.errors.currentPassword && (
              <p className="text-xs text-red-500">
                {passwordForm.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nieuw wachtwoord</Label>
              <Input
                id="newPassword"
                type="password"
                {...passwordForm.register("newPassword")}
                className={
                  passwordForm.formState.errors.newPassword
                    ? "border-red-500"
                    : ""
                }
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-xs text-red-500">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...passwordForm.register("confirmPassword")}
                className={
                  passwordForm.formState.errors.confirmPassword
                    ? "border-red-500"
                    : ""
                }
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Minimaal 8 karakters, 1 hoofdletter en 1 cijfer
          </p>

          <Button
            type="submit"
            className="bg-kmp-blue hover:bg-kmp-blue/90"
            disabled={isLoadingPassword}
          >
            {isLoadingPassword ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wijzigen...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Wachtwoord wijzigen
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-red-600">Gevarenzone</h2>
        </div>

        <p className="text-gray-600 mb-4">
          Wanneer u uw account verwijdert, worden al uw gegevens permanent
          verwijderd. Deze actie kan niet ongedaan worden gemaakt.
        </p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Account verwijderen</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
              <AlertDialogDescription>
                Deze actie kan niet ongedaan worden gemaakt. Uw account en alle
                bijbehorende gegevens worden permanent verwijderd.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuleren</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700"
                disabled={isDeletingAccount}
              >
                {isDeletingAccount ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verwijderen...
                  </>
                ) : (
                  "Ja, verwijder mijn account"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
