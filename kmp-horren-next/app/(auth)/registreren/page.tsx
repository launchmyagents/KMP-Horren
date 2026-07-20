import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Registreren",
  description: "Maak een KMP Horren account aan",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
