import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Check, Ruler, Palette, Shield } from "lucide-react";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { getProductBySlug as getDbProductBySlug, getProducts } from "@/lib/supabase/database";
import { ProductConfigurator } from "@/components/configurator";
import { ProductSchema, ProductDetailBreadcrumb } from "@/components/seo";
import { ProductImageGallery } from "@/components/products";
import { Product } from "@/types";
import { BASE_URL } from "@/lib/seo-config";

// Revalidate every 60 seconds so admin product updates (e.g. min_price) are reflected
export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Transform DB product to frontend Product type
function transformDbProduct(dbProduct: {
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
}): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    type: dbProduct.type,
    description: dbProduct.description,
    features: dbProduct.features || [],
    basePricePerM2: dbProduct.base_price_per_m2,
    minPrice: dbProduct.min_price,
    minWidthMm: dbProduct.min_width_mm,
    maxWidthMm: dbProduct.max_width_mm,
    minHeightMm: dbProduct.min_height_mm,
    maxHeightMm: dbProduct.max_height_mm,
    imageUrl: dbProduct.image_url,
    galleryUrls: dbProduct.gallery_urls || [],
    options: dbProduct.options || [],
    isActive: dbProduct.is_active,
    sortOrder: dbProduct.sort_order,
  };
}

// Get product with database fallback to static
async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    const dbProduct = await getDbProductBySlug(slug);
    if (dbProduct) {
      return transformDbProduct(dbProduct);
    }
  } catch (error) {
    console.error("Error fetching product from database:", error);
  }
  // Fallback to static data
  return getProductBySlug(slug);
}

export async function generateStaticParams() {
  // Try to get slugs from database, fallback to static
  try {
    const dbProducts = await getProducts();
    if (dbProducts.length > 0) {
      return dbProducts.map((product) => ({
        slug: product.slug,
      }));
    }
  } catch (error) {
    console.error("Error fetching products for static params:", error);
  }
  
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product niet gevonden",
    };
  }

  const productType = product.type === "WINDOW" ? "Raamhor" : "Deurhor";

  return {
    title: `${product.name} - ${productType} op Maat | KMP Horren`,
    description: `${product.description} Vanaf €${product.minPrice},-. ✓ Op maat gemaakt ✓ Gratis verzending vanaf €250 ✓ 3 jaar garantie`,
    keywords: [
      product.name.toLowerCase(),
      productType.toLowerCase(),
      "horren",
      "maatwerk",
      "op maat",
      "insectenwering",
      ...product.features.slice(0, 3).map((f) => f.toLowerCase()),
    ],
    alternates: {
      canonical: `${BASE_URL}/producten/${product.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      url: `${BASE_URL}/producten/${product.slug}`,
      siteName: "KMP Horren",
      title: `${product.name} - ${productType} op Maat`,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - KMP Horren`,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <ProductSchema product={product} />
      <ProductDetailBreadcrumb productName={product.name} productSlug={product.slug} />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-kmp-blue transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/producten"
              className="hover:text-kmp-blue transition-colors"
            >
              Producten
            </Link>
            <ChevronRight size={14} />
            <Link
              href={`/producten/${product.type === "WINDOW" ? "raamhorren" : "deurhorren"}`}
              className="hover:text-kmp-blue transition-colors"
            >
              {product.type === "WINDOW" ? "Raamhorren" : "Deurhorren"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-kmp-blue font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image Gallery */}
            <ProductImageGallery
              mainImage={product.imageUrl}
              galleryImages={product.galleryUrls || []}
              productName={product.name}
              productType={product.type}
            />

            {/* Product Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-kmp-blue uppercase tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <span className="w-6 h-6 bg-kmp-orange/10 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-kmp-orange" />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <Ruler className="w-6 h-6 mx-auto text-kmp-orange mb-2" />
                  <p className="text-xs text-slate-500 uppercase">Max. breedte</p>
                  <p className="font-bold text-kmp-blue">
                    {product.maxWidthMm}mm
                  </p>
                </div>
                <div className="text-center border-x border-slate-200">
                  <Palette className="w-6 h-6 mx-auto text-kmp-orange mb-2" />
                  <p className="text-xs text-slate-500 uppercase">Kleuren</p>
                  <p className="font-bold text-kmp-blue">17 opties</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto text-kmp-orange mb-2" />
                  <p className="text-xs text-slate-500 uppercase">Garantie</p>
                  <p className="font-bold text-kmp-blue">3 jaar</p>
                </div>
              </div>

              {/* Price indicator */}
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-sm text-slate-500 uppercase">Vanaf</span>
                <span className="text-4xl font-black text-kmp-blue">
                  €{product.minPrice},-
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-kmp-blue uppercase tracking-tight mb-2">
              Configureer uw {product.name}
            </h2>
            <p className="text-slate-500">
              Vul de afmetingen in en kies uw gewenste opties. De prijs wordt
              direct berekend.
            </p>
          </div>

          <ProductConfigurator product={product} />
        </div>
      </section>
    </div>
  );
}
