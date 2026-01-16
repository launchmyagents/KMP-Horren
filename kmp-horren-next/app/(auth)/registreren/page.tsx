import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Registreren",
  description: "Maak een KMP Horren account aan",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
