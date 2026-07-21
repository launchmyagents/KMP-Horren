import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { TrackedTelLink } from "@/components/analytics/TrackedTelLink";

const footerNavigation = {
  producten: [
    { name: "Raamhorren", href: "/producten/raamhorren" },
    { name: "Deurhorren", href: "/producten/deurhorren" },
    { name: "Alle producten", href: "/producten" },
  ],
  service: [
    { name: "Inmeetservice", href: "/inmeetservice" },
    { name: "Montage instructies", href: "/faq#montage" },
    { name: "Garantie & Reparatie", href: "/faq#garantie" },
    { name: "Veelgestelde vragen", href: "/faq" },
  ],
  bedrijf: [
    { name: "Over ons", href: "/over-ons" },
    { name: "Contact", href: "/contact" },
    { name: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-kmp-blue text-white mt-auto">
      {/* Main footer */}
      <div className="border-t-4 border-kmp-orange">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand column */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.svg"
                  alt="KMP Horren"
                  width={160}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                De specialist in maatwerk insectenwering. Kwaliteit van
                Nederlandse bodem, direct geleverd uit eigen fabriek.
              </p>
              <div className="space-y-3">
                <TrackedTelLink
                  href="tel:+31643065041"
                  className="flex items-center gap-3 text-slate-300 hover:text-kmp-orange transition-colors text-sm"
                >
                  <Phone size={16} />
                  <span>+31 6 43 06 50 41</span>
                </TrackedTelLink>
                <a
                  href="mailto:Info@kmphorren.nl"
                  className="flex items-center gap-3 text-slate-300 hover:text-kmp-orange transition-colors text-sm"
                >
                  <Mail size={16} />
                  <span>Info@kmphorren.nl</span>
                </a>
              </div>
            </div>

            {/* Products column */}
            <div>
              <h3 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">
                Producten
              </h3>
              <ul className="space-y-3">
                {footerNavigation.producten.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-kmp-orange transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service column */}
            <div>
              <h3 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">
                Service
              </h3>
              <ul className="space-y-3">
                {footerNavigation.service.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-kmp-orange transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h3 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">
                Contact
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <div>
                    <p>Honderdland 111B</p>
                    <p>2676 LT, Maasdijk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-400">
                  <Clock size={16} className="mt-1 flex-shrink-0" />
                  <div>
                    <p>Ma - Za: 09:00 - 18:00</p>
                    <p>Zo: Gesloten</p>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                  Veilig betalen
                </p>
                <div className="flex gap-2">
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs text-slate-400">
                    iDEAL
                  </div>
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs text-slate-400">
                    Visa
                  </div>
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs text-slate-400">
                    MC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} KMP Horren. Alle rechten voorbehouden.</p>
            <div className="flex gap-6">
              <Link
                href="/algemene-voorwaarden"
                className="hover:text-white transition-colors"
              >
                Algemene Voorwaarden
              </Link>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <a
                href="https://launchmyagents.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Website door Launch My Agents
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
