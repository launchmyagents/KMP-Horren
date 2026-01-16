"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Address } from "@/types";

const addressSchema = z.object({
  street: z.string().min(2, "Straatnaam is verplicht"),
  houseNumber: z.string().min(1, "Huisnummer is verplicht"),
  houseNumberAddition: z.string(),
  postalCode: z
    .string()
    .regex(
      /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/,
      "Voer een geldige postcode in (bijv. 1234 AB)"
    ),
  city: z.string().min(2, "Plaatsnaam is verplicht"),
  country: z.string(),
  isDefault: z.boolean(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  address?: Address;
  onSubmit: (data: Omit<Address, "id" | "userId">) => void;
  onCancel: () => void;
}

export function AddressForm({ address, onSubmit, onCancel }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: address?.street || "",
      houseNumber: address?.houseNumber || "",
      houseNumberAddition: address?.houseNumberAddition || "",
      postalCode: address?.postalCode || "",
      city: address?.city || "",
      country: address?.country || "Nederland",
      isDefault: address?.isDefault || false,
    },
  });

  const isDefault = watch("isDefault");

  const handleFormSubmit = (data: AddressFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="street">Straatnaam *</Label>
          <Input
            id="street"
            {...register("street")}
            placeholder="Hoofdstraat"
            className={errors.street ? "border-red-500" : ""}
          />
          {errors.street && (
            <p className="text-xs text-red-500">{errors.street.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="houseNumber">Huisnr. *</Label>
          <div className="flex gap-2">
            <Input
              id="houseNumber"
              {...register("houseNumber")}
              placeholder="123"
              className={`w-16 ${errors.houseNumber ? "border-red-500" : ""}`}
            />
            <Input
              id="houseNumberAddition"
              {...register("houseNumberAddition")}
              placeholder="A"
              className="w-14"
            />
          </div>
          {errors.houseNumber && (
            <p className="text-xs text-red-500">{errors.houseNumber.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postcode *</Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            placeholder="1234 AB"
            className={errors.postalCode ? "border-red-500" : ""}
          />
          {errors.postalCode && (
            <p className="text-xs text-red-500">{errors.postalCode.message}</p>
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
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>
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

      <div className="flex items-center gap-3 pt-2">
        <Checkbox
          id="isDefault"
          checked={isDefault}
          onCheckedChange={(checked) => setValue("isDefault", checked as boolean)}
        />
        <label
          htmlFor="isDefault"
          className="text-sm text-gray-600 cursor-pointer"
        >
          Instellen als standaard bezorgadres
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Annuleren
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-kmp-orange hover:bg-kmp-orange/90"
        >
          {address ? "Opslaan" : "Toevoegen"}
        </Button>
      </div>
    </form>
  );
}
