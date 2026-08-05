import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Wachtwoord Vergeten",
  description: "Wachtwoord vergeten? Vul het e-mailadres van uw account bij KMP Horren in. U ontvangt een e-mail waarmee u een nieuw wachtwoord instelt.",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE_URL}/wachtwoord-vergeten`,
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
