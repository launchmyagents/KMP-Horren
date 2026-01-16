"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Edit,
  GripVertical,
  ExternalLink,
  Trash2,
  Loader2,
  RefreshCw,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { toast } from "sonner";

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  type: "WINDOW" | "DOOR";
  description: string;
  features: string[];
  base_price_per_m2: number;
  min_price: number;
  min_width_mm: number;
  max_width_mm: number;
  min_height_mm: number;
  max_height_mm: number;
  image_url: string;
  gallery_urls: string[] | null;
  options: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"database" | "static" | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/products");
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er ging iets mis");
      }
      const data = await response.json();
      setProducts(data.products || []);
      setDataSource(data.source || "database");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "Er ging iets mis bij het ophalen van producten");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleToggleActive = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newActiveState = !product.is_active;

    // Optimistic update
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, is_active: newActiveState } : p
      )
    );

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: newActiveState }),
      });

      if (!response.ok) {
        throw new Error("Kon status niet bijwerken");
      }

      toast.success(`${product.name} is nu ${newActiveState ? "actief" : "inactief"}`);
    } catch (err) {
      // Revert on error
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_active: !newActiveState } : p
        )
      );
      toast.error("Er ging iets mis bij het bijwerken van de status");
    }
  };

  const handleDelete = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setDeletingId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er ging iets mis");
      }

      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success(`${product.name} is verwijderd`);
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(
        err instanceof Error ? err.message : "Er ging iets mis bij het verwijderen"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const activeCount = products.filter((p) => p.is_active).length;
  const windowProducts = filteredProducts.filter((p) => p.type === "WINDOW");
  const doorProducts = filteredProducts.filter((p) => p.type === "DOOR");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-kmp-orange mx-auto mb-4" />
          <p className="text-gray-600">Producten laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Fout bij laden</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchProducts} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Opnieuw proberen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-kmp-blue">Producten</h1>
          <p className="text-gray-600 mt-1">
            {activeCount} van {products.length} producten actief
            {dataSource === "static" && (
              <span className="ml-2 text-amber-600 text-sm">
                (demo data - voer seed.sql uit in Supabase)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchProducts}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Vernieuwen
          </Button>
          <Link href="/admin/producten/nieuw">
            <Button className="bg-kmp-orange hover:bg-kmp-orange/90 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nieuw product
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Zoek producten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Window Products */}
      {windowProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-kmp-blue flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            Raamhorren ({windowProducts.length})
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-12">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Prijs
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Afmetingen
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Actief
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {windowProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onToggleActive={handleToggleActive}
                    onDelete={handleDelete}
                    isDeleting={deletingId === product.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Door Products */}
      {doorProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-kmp-blue flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            Deurhorren ({doorProducts.length})
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-12">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Prijs
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Afmetingen
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Actief
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doorProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onToggleActive={handleToggleActive}
                    onDelete={handleDelete}
                    isDeleting={deletingId === product.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          {searchQuery
            ? `Geen producten gevonden voor "${searchQuery}"`
            : "Geen producten gevonden. Voer seed.sql uit in Supabase om producten toe te voegen."}
        </div>
      )}
    </div>
  );
}

function ProductRow({
  product,
  onToggleActive,
  onDelete,
  isDeleting,
}: {
  product: DbProduct;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  return (
    <tr className={`hover:bg-gray-50 ${!product.is_active ? "opacity-50" : ""}`}>
      <td className="py-4 px-4 text-gray-400">
        <GripVertical className="w-4 h-4 cursor-grab" />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-kmp-blue">{product.name}</p>
            <p className="text-sm text-gray-500 line-clamp-1">
              {product.description}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div>
          <p className="font-medium text-gray-900">
            €{product.base_price_per_m2}/m²
          </p>
          <p className="text-sm text-gray-500">Vanaf €{product.min_price}</p>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        <div>
          <p>
            B: {product.min_width_mm} - {product.max_width_mm} mm
          </p>
          <p>
            H: {product.min_height_mm} - {product.max_height_mm} mm
          </p>
        </div>
      </td>
      <td className="py-4 px-4 text-center">
        <Switch
          checked={product.is_active}
          onCheckedChange={() => onToggleActive(product.id)}
        />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/producten/${product.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={`/producten/${product.slug}`} target="_blank">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
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
                  onClick={() => onDelete(product.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Verwijderen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
}
