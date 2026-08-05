import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Registreren",
  description: "Account aanmaken bij KMP Horren. Vul uw gegevens in en kies een wachtwoord. Daarna kunt u bestellen en uw eerdere aankopen terugvinden.",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE_URL}/registreren`,
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
