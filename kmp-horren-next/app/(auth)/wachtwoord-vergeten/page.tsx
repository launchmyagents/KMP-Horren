import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Wachtwoord Vergeten",
  description: "Vraag een nieuw wachtwoord aan voor uw KMP Horren account",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
