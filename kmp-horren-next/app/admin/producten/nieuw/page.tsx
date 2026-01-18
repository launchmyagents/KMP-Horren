"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Check,
  Plus,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateId(): string {
  return `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "WINDOW" as "WINDOW" | "DOOR",
    description: "",
    basePricePerM2: 0,
    minPrice: 0,
    minWidthMm: 300,
    maxWidthMm: 1500,
    minHeightMm: 300,
    maxHeightMm: 2500,
    isActive: true,
    sortOrder: 0,
    features: [] as string[],
    imageUrl: "",
    galleryUrls: [] as string[],
    options: [] as string[],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(true);

  const handleSave = async () => {
    // Validatie
    if (!formData.name.trim()) {
      toast.error("Productnaam is verplicht");
      return;
    }
    if (!formData.slug.trim()) {
      toast.error("Slug is verplicht");
      return;
    }
    if (!formData.type) {
      toast.error("Producttype is verplicht");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: generateId(),
          name: formData.name,
          slug: formData.slug,
          type: formData.type,
          description: formData.description,
          base_price_per_m2: formData.basePricePerM2,
          min_price: formData.minPrice,
          min_width_mm: formData.minWidthMm,
          max_width_mm: formData.maxWidthMm,
          min_height_mm: formData.minHeightMm,
          max_height_mm: formData.maxHeightMm,
          is_active: formData.isActive,
          sort_order: formData.sortOrder,
          features: formData.features,
          image_url: formData.imageUrl,
          gallery_urls: formData.galleryUrls,
          options: formData.options,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er ging iets mis");
      }

      toast.success("Product aangemaakt");
      router.push("/admin/producten");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error instanceof Error ? error.message : "Er ging iets mis bij het aanmaken"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    field: string,
    value: string | number | boolean | string[]
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug when name changes
      if (field === "name" && autoSlug) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const handleSlugChange = (value: string) => {
    setAutoSlug(false);
    setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("productId", "new");

      const response = await fetch("/api/admin/products/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload mislukt");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      setPreviewImage(null);
      toast.success("Afbeelding geüpload");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        error instanceof Error ? error.message : "Er ging iets mis bij het uploaden"
      );
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event("change", { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingGallery(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("productId", "new");
      formDataUpload.append("isGallery", "true");

      const response = await fetch("/api/admin/products/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload mislukt");
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        galleryUrls: [...prev.galleryUrls, data.imageUrl],
      }));
      toast.success("Afbeelding toegevoegd aan galerij");
    } catch (error) {
      console.error("Error uploading gallery image:", error);
      toast.error(
        error instanceof Error ? error.message : "Er ging iets mis bij het uploaden"
      );
    } finally {
      setIsUploadingGallery(false);
      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryUrls: prev.galleryUrls.filter((_, i) => i !== index),
    }));
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
            <h1 className="text-3xl font-bold text-kmp-blue">Nieuw product</h1>
            <p className="text-gray-600 mt-1">Voeg een nieuw product toe aan de catalogus</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/producten">
            <Button variant="outline">Annuleren</Button>
          </Link>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-kmp-orange hover:bg-kmp-orange/90 flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Opslaan..." : "Product aanmaken"}
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
                <Label htmlFor="name">Productnaam *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Bijv. Inzethor Basic"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="bijv-inzethor-basic"
                  className="mt-1 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Dit wordt gebruikt in de URL: /producten/{formData.slug || "..."}
                </p>
              </div>
              <div>
                <Label htmlFor="type">Producttype *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange("type", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecteer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WINDOW">Raamhor</SelectItem>
                    <SelectItem value="DOOR">Deurhor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Beschrijving</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  placeholder="Beschrijf het product..."
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
                      handleChange("basePricePerM2", parseFloat(e.target.value) || 0)
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
                      handleChange("minPrice", parseFloat(e.target.value) || 0)
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
                    handleChange("minWidthMm", parseInt(e.target.value) || 0)
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
                    handleChange("maxWidthMm", parseInt(e.target.value) || 0)
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
                    handleChange("minHeightMm", parseInt(e.target.value) || 0)
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
                    handleChange("maxHeightMm", parseInt(e.target.value) || 0)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Kenmerken</h2>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 group bg-gray-50 rounded-lg px-3 py-2"
                >
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="flex-1 text-gray-700">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                    title="Verwijder kenmerk"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              {formData.features.length === 0 && (
                <p className="text-gray-500 text-sm italic">
                  Nog geen kenmerken toegevoegd
                </p>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Nieuw kenmerk toevoegen..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddFeature}
                variant="outline"
                className="flex items-center gap-1"
                disabled={!newFeature.trim()}
              >
                <Plus className="w-4 h-4" />
                Toevoegen
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Afbeelding</h2>
            <div
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-kmp-orange transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                  <Loader2 className="w-8 h-8 animate-spin text-kmp-orange mb-2" />
                  <span className="text-sm text-gray-600">Uploaden...</span>
                </div>
              ) : previewImage ? (
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : formData.imageUrl ? (
                <Image
                  src={formData.imageUrl}
                  alt={formData.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm text-center px-4">
                    Klik of sleep afbeelding
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              JPG, PNG of WebP (max. 5MB)
            </p>
          </div>

          {/* Gallery Images */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Galerij</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {formData.galleryUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                >
                  <Image
                    src={url}
                    alt={`Galerij ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {/* Add new image button */}
              <div
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-kmp-orange transition-colors cursor-pointer flex flex-col items-center justify-center text-gray-400"
                onClick={() => galleryInputRef.current?.click()}
              >
                {isUploadingGallery ? (
                  <Loader2 className="w-6 h-6 animate-spin text-kmp-orange" />
                ) : (
                  <>
                    <Plus className="w-6 h-6 mb-1" />
                    <span className="text-xs">Toevoegen</span>
                  </>
                )}
              </div>
            </div>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleGalleryUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500 text-center">
              Extra afbeeldingen voor de productpagina
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
                    Direct zichtbaar op de website
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
                    handleChange("sortOrder", parseInt(e.target.value) || 0)
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lagere nummers worden eerst getoond
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h2 className="font-semibold text-blue-800 mb-3">💡 Tips</h2>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Gebruik duidelijke en beschrijvende productnamen</li>
              <li>• Voeg minimaal 3 kenmerken toe voor betere SEO</li>
              <li>• Upload afbeeldingen in hoge kwaliteit (min. 800x800px)</li>
              <li>• Stel realistische afmetingen in voor de configurator</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
