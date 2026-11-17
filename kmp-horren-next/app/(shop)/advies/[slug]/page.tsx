import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/seo";
import { ADVIES } from "@/data/advies";
import { BASE_URL } from "@/lib/seo-config";

export function generateStaticParams() {
  return ADVIES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const artikel = ADVIES.find((a) => a.slug === params.slug);
  if (!artikel) return {};

  return {
    title: artikel.metaTitel,
    description: artikel.metaBeschrijving,
    alternates: { canonical: `${BASE_URL}/advies/${artikel.slug}` },
    openGraph: {
      type: "article",
      locale: "nl_NL",
      url: `${BASE_URL}/advies/${artikel.slug}`,
      siteName: "KMP Horren",
      title: artikel.metaTitel,
      description: artikel.metaBeschrijving,
    },
  };
}

export default function AdviesArtikelPage({
  params,
}: {
  params: { slug: string };
}) {
  const artikel = ADVIES.find((a) => a.slug === params.slug);
  if (!artikel) notFound();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <ArticleSchema
        headline={artikel.titel}
        description={artikel.metaBeschrijving}
        slug={artikel.slug}
        datePublished={artikel.bijgewerkt}
        dateModified={artikel.bijgewerkt}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Advies", url: "/advies" },
          { name: artikel.titel, url: `/advies/${artikel.slug}` },
        ]}
      />
      <FAQSchema
        faqs={artikel.vragen.map((v) => ({ ...v, category: "Advies" }))}
      />

      <section className="bg-kmp-blue text-white py-16 mb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav
            aria-label="Kruimelpad"
            className="flex items-center gap-2 text-sm text-slate-300 mb-6"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/advies" className="hover:text-white">
              Advies
            </Link>
          </nav>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            {artikel.titel}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {artikel.samenvatting}
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 max-w-3xl">
        {artikel.secties.map((sectie) => (
          <section key={sectie.kop} className="mb-10">
            <h2 className="text-2xl font-black text-kmp-blue uppercase tracking-tight mb-4">
              {sectie.kop}
            </h2>

            {sectie.alineas?.map((alinea) => (
              <p key={alinea} className="text-slate-600 leading-relaxed mb-4">
                {alinea}
              </p>
            ))}

            {sectie.stappen && (
              <ol className="space-y-3 list-none">
                {sectie.stappen.map((stap, i) => (
                  <li key={stap} className="flex gap-4">
                    <span
                      className="shrink-0 w-8 h-8 rounded-full bg-kmp-orange text-white font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="text-slate-600 leading-relaxed pt-1">
                      {stap}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            {sectie.lijst && (
              <ul className="space-y-3">
                {sectie.lijst.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="text-kmp-orange font-bold" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mb-10">
          <h2 className="text-2xl font-black text-kmp-blue uppercase tracking-tight mb-6">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {artikel.vragen.map((vraag) => (
              <details
                key={vraag.question}
                className="group bg-white p-6 rounded-xl border border-slate-200"
              >
                <summary className="font-bold text-kmp-blue cursor-pointer flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                  <span>{vraag.question}</span>
                  <ChevronRight
                    size={20}
                    className="text-kmp-orange shrink-0 transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-slate-600 leading-relaxed mt-4">
                  {vraag.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-8 mb-10">
          <h2 className="text-xl font-black text-kmp-blue uppercase mb-4">
            Verder lezen
          </h2>
          <ul className="space-y-3">
            {artikel.verwant.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-kmp-blue font-semibold hover:text-kmp-orange inline-flex items-center gap-2"
                >
                  <ChevronRight size={16} aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-kmp-blue text-white rounded-2xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
            Liever advies van een mens
          </h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Wij maken alles zelf in onze eigen fabriek, dus u krijgt iemand aan
            de lijn die de hor ook gemaakt heeft.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-kmp-orange hover:bg-kmp-orange/90">
                Contact opnemen
              </Button>
            </Link>
            <Link href="/inmeetservice">
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-kmp-blue"
              >
                Inmeetservice aanvragen
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/advies"
            className="text-slate-500 hover:text-kmp-blue inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Terug naar alle adviespagina&apos;s
          </Link>
        </div>
      </article>
    </div>
  );
}
