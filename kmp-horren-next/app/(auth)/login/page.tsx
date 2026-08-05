import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Inlogpagina van KMP Horren. Log in met het e-mailadres en wachtwoord waarmee u uw account heeft aangemaakt. Nog geen account? Maak er eerst een aan.",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE_URL}/login`,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
