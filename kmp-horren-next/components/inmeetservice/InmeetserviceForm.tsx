"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

interface FormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export function InmeetserviceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inmeetservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          street: formData.street.trim(),
          houseNumber: formData.houseNumber.trim(),
          postalCode: formData.postalCode.trim(),
          city: formData.city.trim(),
          preferredDate: formData.preferredDate || null,
          preferredTime: formData.preferredTime || null,
          notes: formData.notes.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        throw new Error(data.error || data.details || "Er ging iets mis bij het indienen van de aanvraag");
      }

      console.log("Request submitted successfully:", data);
      setSubmitted(true);
      trackEvent("inmeet_request", { form_name: "inmeetservice" });
      toast.success("Aanvraag succesvol ingediend!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Er ging iets mis bij het indienen van de aanvraag");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-12 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-black text-kmp-blue uppercase mb-2">
          Bedankt voor uw aanvraag!
        </h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          We hebben uw inmeetservice aanvraag ontvangen. U ontvangt binnenkort een
          bevestigingsmail en wij nemen zo spoedig mogelijk contact met u op om een
          afspraak in te plannen.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          className="bg-kmp-orange hover:bg-kmp-orange/90"
        >
          Nieuwe aanvraag indienen
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-2">
          Vraag een afspraak aan
        </h2>
        <p className="text-slate-600">
          Vul het formulier in en wij nemen zo spoedig mogelijk contact met u op om een
          afspraak in te plannen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contactgegevens */}
        <div>
          <h3 className="text-lg font-bold text-kmp-blue mb-4 flex items-center gap-2">
            <span className="bg-kmp-orange/10 p-1.5 rounded-lg text-kmp-orange">
              <Calendar size={18} />
            </span>
            Contactgegevens
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Naam <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Uw volledige naam"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                E-mailadres <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="uw@email.nl"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Telefoonnummer <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="06 12345678"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Adresgegevens */}
        <div>
          <h3 className="text-lg font-bold text-kmp-blue mb-4 flex items-center gap-2">
            <span className="bg-kmp-orange/10 p-1.5 rounded-lg text-kmp-orange">
              <Calendar size={18} />
            </span>
            Adresgegevens
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="street">
                Straatnaam <span className="text-red-500">*</span>
              </Label>
              <Input
                id="street"
                name="street"
                type="text"
                required
                placeholder="Straatnaam"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="houseNumber">
                Huisnummer <span className="text-red-500">*</span>
              </Label>
              <Input
                id="houseNumber"
                name="houseNumber"
                type="text"
                required
                placeholder="123"
                value={formData.houseNumber}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">
                Postcode <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                placeholder="1234 AB"
                value={formData.postalCode}
                onChange={handleChange}
                pattern="[0-9]{4}[ ]?[A-Za-z]{2}"
                title="Voer een geldige Nederlandse postcode in (bijv. 1234 AB)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">
                Plaats <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                type="text"
                required
                placeholder="Stad"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Voorkeursdatum en tijd */}
        <div>
          <h3 className="text-lg font-bold text-kmp-blue mb-4 flex items-center gap-2">
            <span className="bg-kmp-orange/10 p-1.5 rounded-lg text-kmp-orange">
              <Clock size={18} />
            </span>
            Voorkeursdatum en tijd (optioneel)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Voorkeursdatum</Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Voorkeurstijd</Label>
              <Input
                id="preferredTime"
                name="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            We proberen zoveel mogelijk rekening te houden met uw voorkeur, maar kunnen
            dit niet garanderen.
          </p>
        </div>

        {/* Opmerkingen */}
        <div>
          <Label htmlFor="notes">Opmerkingen (optioneel)</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Heeft u specifieke vragen of opmerkingen? Laat het ons weten..."
            value={formData.notes}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto min-w-[200px] bg-kmp-orange hover:bg-kmp-orange/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verzenden...
              </>
            ) : (
              <>
                <Calendar className="mr-2" size={18} />
                Aanvraag indienen
              </>
            )}
          </Button>
          <p className="text-sm text-slate-500 mt-4">
            Door dit formulier in te dienen, gaat u akkoord met ons{" "}
            <a href="/privacy" className="text-kmp-blue hover:underline">
              privacybeleid
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
