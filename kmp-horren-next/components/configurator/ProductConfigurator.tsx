"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product } from "@/types";
import { useConfiguratorStore, useCartStore } from "@/store";
import { MESH_TYPES, PROFILE_DEPTHS, FRAME_TYPES } from "@/data/configurator";
import { DimensionInput } from "./DimensionInput";
import { ColorSelector } from "./ColorSelector";
import { OptionSelector } from "./OptionSelector";
import { MontageToggle } from "./MontageToggle";
import { QuantitySelector } from "./QuantitySelector";
import { PriceSummary } from "./PriceSummary";

interface ProductConfiguratorProps {
  product: Product;
}

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const router = useRouter();
  const {
    setProduct,
    widthMm,
    heightMm,
    colorId,
    meshId,
    profileId,
    frameTypeId,
    montageService,
    quantity,
    errors,
    priceCalculation,
    areaM2,
    setWidth,
    setHeight,
    setColor,
    setMesh,
    setProfile,
    setFrameType,
    setMontageService,
    setQuantity,
    validateDimensions,
    getConfiguration,
  } = useConfiguratorStore();

  const { addItem } = useCartStore();

  // Initialize configurator with product
  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);

  const handleAddToCart = () => {
    if (!validateDimensions()) {
      toast.error("Controleer de afmetingen");
      return;
    }

    if (!priceCalculation) {
      toast.error("Prijs kon niet worden berekend");
      return;
    }

    const configuration = getConfiguration();
    
    addItem(product, configuration, priceCalculation.unitPrice, areaM2, quantity);
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-semibold">{product.name} toegevoegd!</span>
        <span className="text-sm text-slate-500">
          {quantity}x - €{(priceCalculation.unitPrice * quantity).toFixed(2)}
        </span>
      </div>,
      {
        action: {
          label: "Bekijk winkelwagen",
          onClick: () => router.push("/winkelwagen"),
        },
      }
    );
  };

  const meshOptions = MESH_TYPES.map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
    surcharge: m.surcharge,
  }));

  const profileOptions = PROFILE_DEPTHS.map((p) => ({
    id: p.id,
    name: `${p.depthMm}mm`,
    description: p.description,
    suitableFor: p.suitableFor,
    surcharge: p.surcharge,
  }));

  const frameOptions = FRAME_TYPES.map((f) => ({
    id: f.id,
    name: f.name,
    description: f.description,
    surcharge: f.surcharge,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Configuration Form */}
      <div className="lg:col-span-2 space-y-8">
        {/* Step 1: Dimensions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-kmp-blue uppercase tracking-wide mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-kmp-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            Afmetingen
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DimensionInput
              label="Breedte"
              value={widthMm}
              onChange={setWidth}
              min={product.minWidthMm}
              max={product.maxWidthMm}
              step={1}
              unit="mm"
              error={errors.width}
              helpText="Meet de dagmaat van uw kozijn"
            />
            
            <DimensionInput
              label="Hoogte"
              value={heightMm}
              onChange={setHeight}
              min={product.minHeightMm}
              max={product.maxHeightMm}
              step={1}
              unit="mm"
              error={errors.height}
              helpText="Meet de dagmaat van uw kozijn"
            />
          </div>
        </div>

        {/* Step 2: Color */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-kmp-blue uppercase tracking-wide mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-kmp-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            Kleur
          </h3>
          
          <ColorSelector value={colorId} onChange={setColor} />
        </div>

        {/* Step 3: Mesh Type */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-kmp-blue uppercase tracking-wide mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-kmp-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            Gaas Type
          </h3>
          
          <OptionSelector
            label=""
            options={meshOptions}
            value={meshId}
            onChange={setMesh}
            columns={2}
          />
        </div>

        {/* Step 4: Profile & Frame */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-kmp-blue uppercase tracking-wide mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-kmp-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
              4
            </span>
            Profiel & Kozijn
          </h3>
          
          <div className="space-y-6">
            <OptionSelector
              label="Profieldiepte"
              options={profileOptions}
              value={profileId}
              onChange={setProfile}
              columns={2}
            />
            
            <OptionSelector
              label="Kozijntype"
              options={frameOptions}
              value={frameTypeId}
              onChange={setFrameType}
              columns={3}
            />
          </div>
        </div>

        {/* Step 5: Montage & Quantity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-kmp-blue uppercase tracking-wide mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-kmp-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
              5
            </span>
            Montage & Aantal
          </h3>
          
          <div className="space-y-6">
            <MontageToggle
              value={montageService}
              onChange={setMontageService}
              pricePerUnit={15}
            />
            
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
            />
          </div>
        </div>
      </div>

      {/* Price Summary Sidebar */}
      <div className="lg:col-span-1">
        <PriceSummary
          priceCalculation={priceCalculation}
          quantity={quantity}
          hasMontage={montageService}
          onAddToCart={handleAddToCart}
          isValid={validateDimensions()}
          errors={errors}
        />
      </div>
    </div>
  );
}
