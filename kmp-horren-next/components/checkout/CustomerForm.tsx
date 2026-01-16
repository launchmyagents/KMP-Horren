"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCheckoutStore, CustomerDetails } from "@/store";
import { ArrowRight, User, MapPin, Phone, Mail } from "lucide-react";

const customerSchema = z.object({
  email: z.string().email("Voer een geldig e-mailadres in"),
  firstName: z.string().min(2, "Voornaam moet minimaal 2 karakters zijn"),
  lastName: z.string().min(2, "Achternaam moet minimaal 2 karakters zijn"),
  phone: z
    .string()
    .min(10, "Voer een geldig telefoonnummer in")
    .regex(/^[0-9+\-\s()]+$/, "Voer een geldig telefoonnummer in"),
  street: z.string().min(2, "Straatnaam is verplicht"),
  houseNumber: z.string().min(1, "Huisnummer is verplicht"),
  houseNumberAddition: z.string(),
  postalCode: z
    .string()
    .regex(/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/, "Voer een geldige postcode in (bijv. 1234 AB)"),
  city: z.string().min(2, "Plaatsnaam is verplicht"),
  country: z.string(),
  notes: z.string(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export function CustomerForm() {
  const { customerDetails, setCustomerDetails, nextStep } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerDetails,
  });

  const onSubmit = (data: CustomerFormData) => {
    setCustomerDetails(data as CustomerDetails);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-kmp-blue/10 flex items-center justify-center">
            <User className="w-5 h-5 text-kmp-blue" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-kmp-blue">Contactgegevens</h2>
            <p className="text-sm text-gray-500">Hoe kunnen wij u bereiken?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Voornaam *</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="Jan"
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Achternaam *</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Jansen"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              E-mailadres *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="jan@voorbeeld.nl"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Telefoonnummer *
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="06 12345678"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-kmp-orange/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-kmp-orange" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-kmp-blue">Bezorgadres</h2>
            <p className="text-sm text-gray-500">Waar mogen wij leveren?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="street">Straatnaam *</Label>
              <Input
                id="street"
                {...register("street")}
                placeholder="Hoofdstraat"
                className={errors.street ? "border-red-500" : ""}
              />
              {errors.street && (
                <p className="text-sm text-red-500">{errors.street.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="houseNumber">Huisnr. *</Label>
              <div className="flex gap-2">
                <Input
                  id="houseNumber"
                  {...register("houseNumber")}
                  placeholder="123"
                  className={`w-20 ${errors.houseNumber ? "border-red-500" : ""}`}
                />
                <Input
                  id="houseNumberAddition"
                  {...register("houseNumberAddition")}
                  placeholder="A"
                  className="w-16"
                />
              </div>
              {errors.houseNumber && (
                <p className="text-sm text-red-500">{errors.houseNumber.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Postcode *</Label>
            <Input
              id="postalCode"
              {...register("postalCode")}
              placeholder="1234 AB"
              className={errors.postalCode ? "border-red-500" : ""}
            />
            {errors.postalCode && (
              <p className="text-sm text-red-500">{errors.postalCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Plaats *</Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="Amsterdam"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Land</Label>
            <Input
              id="country"
              {...register("country")}
              value="Nederland"
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-2">
          <Label htmlFor="notes">Opmerkingen (optioneel)</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Heeft u speciale wensen of opmerkingen voor uw bestelling?"
            rows={3}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-kmp-orange hover:bg-kmp-orange/90 text-white px-8"
        >
          Naar Overzicht
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}
