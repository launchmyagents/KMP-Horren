import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, Ruler, Palette, Shield } from "lucide-react";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { ProductConfigurator } from "@/components/configurator";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product niet gevonden",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | KMP Horren`,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
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
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 bg-kmp-blue text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-md">
                {product.type === "WINDOW" ? "Raamhor" : "Deurhor"}
              </div>
            </div>

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
