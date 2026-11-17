import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo";
import { ADVIES } from "@/data/advies";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Advies over horren",
  description:
    "Uitleg over opmeten, plaatsen, schoonmaken en repareren van horren, en over de keuze tussen de gaassoorten. Geschreven door de mensen die ze maken.",
  alternates: { canonical: `${BASE_URL}/advies` },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/advies`,
    siteName: "KMP Horren",
    title: "Advies over horren - KMP Horren",
    description:
      "Uitleg over opmeten, plaatsen, schoonmaken en repareren van horren, en over de keuze tussen de gaassoorten.",
  },
};

export default function AdviesIndexPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Advies", url: "/advies" },
        ]}
      />

      <section className="bg-kmp-blue text-white py-16 mb-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Advies over horren
          </h1>
          <p className="text-slate-300 text-lg">
            Opmeten, plaatsen, schoonmaken en repareren, plus de keuze tussen de
            gaassoorten. Geschreven door de mensen die de horren ook maken.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-4">
          {ADVIES.map((artikel) => (
            <Link
              key={artikel.slug}
              href={`/advies/${artikel.slug}`}
              className="block bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h2 className="font-black text-kmp-blue text-xl mb-2 flex items-center justify-between gap-4">
                <span>{artikel.titel}</span>
                <ChevronRight
                  className="text-kmp-orange shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {artikel.metaBeschrijving}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
