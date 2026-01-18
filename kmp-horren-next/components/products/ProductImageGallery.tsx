"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  mainImage: string;
  galleryImages: string[];
  productName: string;
  productType: "WINDOW" | "DOOR";
}

export function ProductImageGallery({
  mainImage,
  galleryImages,
  productName,
  productType,
}: ProductImageGalleryProps) {
  const allImages = [mainImage, ...galleryImages];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
        <Image
          src={allImages[selectedIndex]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 bg-kmp-blue text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-md">
          {productType === "WINDOW" ? "Raamhor" : "Deurhor"}
        </div>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                selectedIndex === index
                  ? "border-kmp-orange"
                  : "border-transparent hover:border-slate-300"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
