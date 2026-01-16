"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  ExternalLink,
  Check,
  Plus,
  X,
  Upload,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PRODUCTS } from "@/data/products";
import { toast } from "sonner";

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    imageUrl: product?.imageUrl || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
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
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er ging iets mis");
      }

      toast.success("Product bijgewerkt");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(
        error instanceof Error ? error.message : "Er ging iets mis bij het opslaan"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er ging iets mis");
      }

      toast.success("Product verwijderd");
      router.push("/admin/producten");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Er ging iets mis bij het verwijderen"
      );
      setIsDeleting(false);
    }
  };

  const handleChange = (
    field: string,
    value: string | number | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      formDataUpload.append("productId", productId);

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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        // Trigger the same upload logic
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files;
          const event = new Event("change", { bubbles: true });
          fileInputRef.current.dispatchEvent(event);
        }
      }
    },
    []
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
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

          {/* Features - Now Editable */}
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
          {/* Product Image - Now with Upload */}
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
                  <span className="text-sm">Klik of sleep afbeelding</span>
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

          {/* Delete Product */}
          <div className="bg-white rounded-xl border border-red-200 p-6">
            <h2 className="font-semibold text-red-600 mb-4">Gevaarzone</h2>
            <p className="text-sm text-gray-600 mb-4">
              Het verwijderen van dit product is permanent en kan niet ongedaan
              worden gemaakt.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center gap-2"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  {isDeleting ? "Verwijderen..." : "Product verwijderen"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Product verwijderen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Weet je zeker dat je <strong>{product.name}</strong> wilt
                    verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Verwijderen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
