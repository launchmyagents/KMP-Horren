import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

/**
 * Until 2026-10-09 this file did `redirect("/")`. Every unknown address on the domain
 * therefore answered 307 followed by the homepage with HTTP 200, so no address on this
 * site could ever return "not found". A typo, an old link from elsewhere and a crawler
 * probing a guessed address all landed on a second, third and fourth copy of the
 * homepage. Google calls that a soft 404 and handles it by picking its own canonical,
 * which is exactly the behaviour this domain has been fighting since June.
 *
 * Rendering this page instead of redirecting makes Next.js answer with a real HTTP 404,
 * which is the one answer that tells a search engine the address does not exist.
 * Addresses that genuinely moved keep their 301 in next.config.mjs and never reach this
 * page.
 */
export default function NotFound() {
  return (
    // The root not-found sits outside the (shop) route group, so it does not inherit
    // that group's header and footer. A visitor who lands here needs the navigation
    // more than anyone, so the same two components are rendered around it by hand.
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center bg-kmp-blue">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl">
          <p className="text-kmp-orange font-bold uppercase tracking-wider mb-4">
            Fout 404
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] uppercase tracking-tight">
            Deze pagina bestaat niet
          </h1>
          <p className="text-xl text-slate-300 mb-10 font-light leading-relaxed">
            Mogelijk klopt het adres niet of is de pagina verplaatst. Hieronder vindt u
            ons volledige assortiment horren op maat. Komt u er niet uit,
            bel ons dan gerust op 06 43 06 50 41.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/producten">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-kmp-orange hover:bg-kmp-orange/90 text-white px-10 text-lg font-semibold"
              >
                Bekijk alle horren
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-kmp-blue bg-white border-white hover:bg-white/90 hover:text-kmp-blue px-10 text-lg"
              >
                Neem contact op
              </Button>
            </Link>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
