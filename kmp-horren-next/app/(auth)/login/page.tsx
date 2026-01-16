import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Log in op uw KMP Horren account",
};

export default function LoginPage() {
  return <LoginForm />;
}
