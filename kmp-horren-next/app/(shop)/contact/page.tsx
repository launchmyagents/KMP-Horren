"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er ging iets mis");
      }

      setSubmitted(true);
      trackEvent("contact_form_submit", { form_name: "contact" });
      toast.success("Bericht verzonden!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Er ging iets mis bij het verzenden");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-kmp-blue text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20 opacity-50 hidden md:block" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Contact
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Heeft u vragen over onze producten of wilt u advies op maat? Ons team
            van specialisten staat voor u klaar.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
              <h3 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-3">
                <span className="bg-kmp-orange/10 p-2 rounded-lg text-kmp-orange">
                  <MapPin size={20} />
                </span>
                Gegevens
              </h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-kmp-blue min-w-[80px]">Adres:</span>
                  <span>
                    Honderdland 111B
                    <br />
                    2676 LT, Maasdijk
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-kmp-blue min-w-[80px]">Tel:</span>
                  <a
                    href="tel:+31643065041"
                    onClick={() => trackEvent("tel_click", { link_url: "tel:+31643065041" })}
                    className="hover:text-kmp-orange transition-colors"
                  >
                    +31 6 43 06 50 41
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-kmp-blue min-w-[80px]">Email:</span>
                  <a
                    href="mailto:Info@kmphorren.nl"
                    className="hover:text-kmp-orange transition-colors"
                  >
                    Info@kmphorren.nl
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-kmp-blue min-w-[80px]">KVK:</span>
                  <span>93094698</span>
                </li>
              </ul>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
              <h3 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-3">
                <span className="bg-kmp-orange/10 p-2 rounded-lg text-kmp-orange">
                  <Clock size={20} />
                </span>
                Openingstijden
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span>Maandag - Vrijdag</span>
                  <span className="font-bold text-kmp-blue">09:00 - 18:00</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2 pt-2">
                  <span>Zaterdag</span>
                  <span className="font-bold text-kmp-blue">09:00 - 18:00</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>Zondag</span>
                  <span className="text-kmp-orange font-bold">Gesloten</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-slate-100 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-kmp-blue uppercase mb-2">
                    Bedankt!
                  </h3>
                  <p className="text-slate-500 max-w-md">
                    We hebben uw bericht ontvangen en nemen zo spoedig mogelijk
                    contact met u op.
                  </p>
                  <Button
                    className="mt-8"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Nog een bericht sturen
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-kmp-blue uppercase mb-2">
                    Stuur een bericht
                  </h3>
                  <p className="text-slate-500 mb-8">
                    Vul het formulier in en wij reageren binnen 1 werkdag.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Naam</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          placeholder="Uw naam"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="uw@email.nl"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Onderwerp</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer een onderwerp" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Advies over product">
                            Advies over product
                          </SelectItem>
                          <SelectItem value="Vraag over bestelling">
                            Vraag over bestelling
                          </SelectItem>
                          <SelectItem value="Garantie / Reparatie">
                            Garantie / Reparatie
                          </SelectItem>
                          <SelectItem value="Overig">Overig</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-slate-500 mt-2">
                        Wilt u een inmeetafspraak? Gebruik ons{" "}
                        <Link
                          href="/inmeetservice#aanvraag-formulier"
                          className="text-kmp-orange font-medium hover:underline"
                        >
                          inmeetservice-formulier
                        </Link>
                        .
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Bericht</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        placeholder="Typ hier uw bericht..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto min-w-[200px] bg-kmp-orange hover:bg-kmp-orange/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Versturen..."
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Verstuur Bericht
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Teaser */}
      <div className="container mx-auto px-4 mt-20">
        <div className="bg-kmp-blue/5 border border-kmp-blue/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-kmp-orange shadow-sm shrink-0">
              <MessageSquare size={32} />
            </div>
            <div>
              <h3 className="font-black text-xl text-kmp-blue uppercase mb-1">
                Veelgestelde vragen
              </h3>
              <p className="text-slate-600">
                Bekijk onze FAQ voor snelle antwoorden op veelvoorkomende vragen.
              </p>
            </div>
          </div>
          <Link href="/faq">
            <Button variant="outline" className="shrink-0 bg-white">
              Bekijk FAQ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
