"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DiscountCode } from "@/types";

const discountSchema = z.object({
  code: z
    .string()
    .min(3, "Code moet minimaal 3 karakters zijn")
    .max(20, "Code mag maximaal 20 karakters zijn")
    .toUpperCase(),
  description: z.string().optional(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0.01, "Waarde moet groter zijn dan 0"),
  minOrderValue: z.number().min(0).optional(),
  maxUses: z.number().min(1).optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  isActive: z.boolean(),
});

type DiscountFormData = z.infer<typeof discountSchema>;

interface DiscountFormProps {
  discount?: DiscountCode;
  open: boolean;
  onClose: () => void;
  onSave: (data: DiscountFormData) => void;
}

export function DiscountForm({
  discount,
  open,
  onClose,
  onSave,
}: DiscountFormProps) {
  const isEditing = !!discount;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      code: discount?.code || "",
      description: discount?.description || "",
      discountType: discount?.discountType || "percentage",
      discountValue: discount?.discountValue || 10,
      minOrderValue: discount?.minOrderValue || undefined,
      maxUses: discount?.maxUses || undefined,
      validFrom: discount?.validFrom
        ? discount.validFrom.split("T")[0]
        : undefined,
      validUntil: discount?.validUntil
        ? discount.validUntil.split("T")[0]
        : undefined,
      isActive: discount?.isActive ?? true,
    },
  });

  const discountType = watch("discountType");
  const isActive = watch("isActive");

  const onSubmit = (data: DiscountFormData) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Kortingscode bewerken" : "Nieuwe kortingscode"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Code */}
          <div>
            <Label htmlFor="code">Kortingscode *</Label>
            <Input
              id="code"
              {...register("code")}
              placeholder="ZOMER2024"
              className="mt-1 uppercase"
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Beschrijving</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Korting voor zomerperiode"
              rows={2}
              className="mt-1"
            />
          </div>

          {/* Discount Type & Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Type korting *</Label>
              <Select
                value={discountType}
                onValueChange={(value: "percentage" | "fixed") =>
                  setValue("discountType", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Vast bedrag (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="discountValue">
                Waarde {discountType === "percentage" ? "(%)" : "(€)"} *
              </Label>
              <Input
                id="discountValue"
                type="number"
                step={discountType === "percentage" ? "1" : "0.01"}
                {...register("discountValue", { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.discountValue && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountValue.message}
                </p>
              )}
            </div>
          </div>

          {/* Min Order Value & Max Uses */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minOrderValue">Min. bestelwaarde (€)</Label>
              <Input
                id="minOrderValue"
                type="number"
                step="0.01"
                {...register("minOrderValue", { valueAsNumber: true })}
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxUses">Max. aantal keer</Label>
              <Input
                id="maxUses"
                type="number"
                {...register("maxUses", { valueAsNumber: true })}
                placeholder="Onbeperkt"
                className="mt-1"
              />
            </div>
          </div>

          {/* Valid Period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="validFrom">Geldig vanaf</Label>
              <Input
                id="validFrom"
                type="date"
                {...register("validFrom")}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="validUntil">Geldig tot</Label>
              <Input
                id="validUntil"
                type="date"
                {...register("validUntil")}
                className="mt-1"
              />
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900">Code actief</p>
              <p className="text-sm text-gray-500">
                Kan gebruikt worden door klanten
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuleren
            </Button>
            <Button
              type="submit"
              className="bg-kmp-orange hover:bg-kmp-orange/90"
            >
              {isEditing ? "Opslaan" : "Aanmaken"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
