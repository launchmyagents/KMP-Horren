import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Wachtwoord Vergeten",
  description: "Vraag een nieuw wachtwoord aan voor uw KMP Horren account",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
