import { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Wachtwoord Resetten",
  description: "Stel een nieuw wachtwoord in voor uw KMP Horren account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
