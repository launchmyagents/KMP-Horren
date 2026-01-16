"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Edit,
  Eye,
  EyeOff,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { toast } from "sonner";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleToggleActive = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );
    const product = products.find((p) => p.id === productId);
    toast.success(
      `${product?.name} is nu ${product?.isActive ? "inactief" : "actief"}`
    );
  };

  const activeCount = products.filter((p) => p.isActive).length;
  const windowProducts = filteredProducts.filter((p) => p.type === "WINDOW");
  const doorProducts = filteredProducts.filter((p) => p.type === "DOOR");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-kmp-blue">Producten</h1>
          <p className="text-gray-600 mt-1">
            {activeCount} van {products.length} producten actief
          </p>
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
                {windowProducts.map((product, index) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    index={index + 1}
                    onToggleActive={handleToggleActive}
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
                {doorProducts.map((product, index) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    index={index + 1}
                    onToggleActive={handleToggleActive}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Geen producten gevonden voor &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  );
}

function ProductRow({
  product,
  index,
  onToggleActive,
}: {
  product: Product;
  index: number;
  onToggleActive: (id: string) => void;
}) {
  return (
    <tr className={`hover:bg-gray-50 ${!product.isActive ? "opacity-50" : ""}`}>
      <td className="py-4 px-4 text-gray-400">
        <GripVertical className="w-4 h-4 cursor-grab" />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={product.imageUrl}
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
            €{product.basePricePerM2}/m²
          </p>
          <p className="text-sm text-gray-500">Vanaf €{product.minPrice}</p>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        <div>
          <p>
            B: {product.minWidthMm} - {product.maxWidthMm} mm
          </p>
          <p>
            H: {product.minHeightMm} - {product.maxHeightMm} mm
          </p>
        </div>
      </td>
      <td className="py-4 px-4 text-center">
        <Switch
          checked={product.isActive}
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
        </div>
      </td>
    </tr>
  );
}
