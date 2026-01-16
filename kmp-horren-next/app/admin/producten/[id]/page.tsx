"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "@/data/products";
import { toast } from "sonner";

export default function ProductEditPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId),
    [productId]
  );

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    basePricePerM2: product?.basePricePerM2 || 0,
    minPrice: product?.minPrice || 0,
    minWidthMm: product?.minWidthMm || 0,
    maxWidthMm: product?.maxWidthMm || 0,
    minHeightMm: product?.minHeightMm || 0,
    maxHeightMm: product?.maxHeightMm || 0,
    isActive: product?.isActive || false,
    sortOrder: product?.sortOrder || 0,
    features: product?.features || [],
  });

  const [isSaving, setIsSaving] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-kmp-blue mb-4">
          Product niet gevonden
        </h1>
        <Link href="/admin/producten">
          <Button>Terug naar producten</Button>
        </Link>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Product bijgewerkt");
    setIsSaving(false);
  };

  const handleChange = (
    field: string,
    value: string | number | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/producten"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-kmp-blue">{product.name}</h1>
            <p className="text-gray-600 mt-1">Product bewerken</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/producten/${product.slug}`} target="_blank">
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Bekijk op website
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-kmp-orange hover:bg-kmp-orange/90 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Opslaan..." : "Opslaan"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">
              Algemene informatie
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Productnaam</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Beschrijving</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Prijzen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basePricePerM2">Basisprijs per m²</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    €
                  </span>
                  <Input
                    id="basePricePerM2"
                    type="number"
                    step="0.01"
                    value={formData.basePricePerM2}
                    onChange={(e) =>
                      handleChange("basePricePerM2", parseFloat(e.target.value))
                    }
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="minPrice">Minimumprijs</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    €
                  </span>
                  <Input
                    id="minPrice"
                    type="number"
                    step="0.01"
                    value={formData.minPrice}
                    onChange={(e) =>
                      handleChange("minPrice", parseFloat(e.target.value))
                    }
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Afmetingen</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="minWidthMm">Min. breedte (mm)</Label>
                <Input
                  id="minWidthMm"
                  type="number"
                  value={formData.minWidthMm}
                  onChange={(e) =>
                    handleChange("minWidthMm", parseInt(e.target.value))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxWidthMm">Max. breedte (mm)</Label>
                <Input
                  id="maxWidthMm"
                  type="number"
                  value={formData.maxWidthMm}
                  onChange={(e) =>
                    handleChange("maxWidthMm", parseInt(e.target.value))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="minHeightMm">Min. hoogte (mm)</Label>
                <Input
                  id="minHeightMm"
                  type="number"
                  value={formData.minHeightMm}
                  onChange={(e) =>
                    handleChange("minHeightMm", parseInt(e.target.value))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxHeightMm">Max. hoogte (mm)</Label>
                <Input
                  id="maxHeightMm"
                  type="number"
                  value={formData.maxHeightMm}
                  onChange={(e) =>
                    handleChange("maxHeightMm", parseInt(e.target.value))
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Kenmerken</h2>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Kenmerken kunnen in een toekomstige versie bewerkt worden.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Afbeelding</h2>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Afbeeldingen kunnen in een toekomstige versie geüpload worden via
              Supabase Storage.
            </p>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Product actief</p>
                  <p className="text-sm text-gray-500">
                    Zichtbaar op de website
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleChange("isActive", checked)
                  }
                />
              </div>
              <Separator />
              <div>
                <Label htmlFor="sortOrder">Sorteervolgorde</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    handleChange("sortOrder", parseInt(e.target.value))
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lagere nummers worden eerst getoond
                </p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Product info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">ID</span>
                <span className="font-mono text-gray-700">{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Slug</span>
                <span className="font-mono text-gray-700">{product.slug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span className="text-gray-700">
                  {product.type === "WINDOW" ? "Raamhor" : "Deurhor"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Opties</span>
                <span className="text-gray-700">{product.options.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
