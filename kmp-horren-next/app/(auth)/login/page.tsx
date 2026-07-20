import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Log in op uw KMP Horren account",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginForm />;
}
