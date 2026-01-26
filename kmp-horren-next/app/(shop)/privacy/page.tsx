import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KMP Horren",
  description: "Lees hoe KMP Horren omgaat met uw persoonsgegevens en privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            KMP Horren respecteert uw privacy en zorgt ervoor dat uw persoonlijke gegevens vertrouwelijk worden behandeld.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-500 mb-8">
                Laatst bijgewerkt: januari 2026
              </p>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                1. Wie zijn wij?
              </h2>
              <p>
                KMP Horren is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
              </p>
              <div className="bg-slate-50 p-6 rounded-lg mt-4">
                <p className="font-semibold">KMP Horren</p>
                <p>100land 111</p>
                <p>2676 LT Maasdijk</p>
                <p className="mt-2">
                  <strong>Telefoon:</strong> +31 6 43 06 50 41
                </p>
                <p>
                  <strong>E-mail:</strong> Info@kmphorren.nl
                </p>
              </div>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                2. Welke persoonsgegevens verwerken wij?
              </h2>
              <p>
                KMP Horren verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Voor- en achternaam</li>
                <li>Adresgegevens (factuur- en leveradres)</li>
                <li>Telefoonnummer</li>
                <li>E-mailadres</li>
                <li>Betalingsgegevens</li>
                <li>Bestelgeschiedenis</li>
                <li>IP-adres</li>
                <li>Gegevens over uw activiteiten op onze website</li>
                <li>Internetbrowser en apparaat type</li>
              </ul>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                3. Waarom verwerken wij persoonsgegevens?
              </h2>
              <p>
                KMP Horren verwerkt uw persoonsgegevens voor de volgende doelen:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Het afhandelen van uw betaling</li>
                <li>Het verzenden van uw bestelling</li>
                <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
                <li>U te informeren over wijzigingen van onze diensten en producten</li>
                <li>Om producten bij u af te leveren</li>
                <li>Het verbeteren van onze website en dienstverlening</li>
                <li>Het voldoen aan wettelijke verplichtingen (zoals belastingadministratie)</li>
              </ul>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                4. Hoe lang bewaren wij persoonsgegevens?
              </h2>
              <p>
                KMP Horren bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Klantgegevens:</strong> 7 jaar na laatste aankoop (wettelijke bewaarplicht)</li>
                <li><strong>Bestelgegevens:</strong> 7 jaar (fiscale bewaarplicht)</li>
                <li><strong>Nieuwsbriefabonnees:</strong> tot uitschrijving</li>
                <li><strong>Websitestatistieken:</strong> 26 maanden</li>
              </ul>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                5. Delen van persoonsgegevens met derden
              </h2>
              <p>
                KMP Horren verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens.
              </p>
              <p className="mt-4">
                Wij delen gegevens met de volgende partijen:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Bezorgdiensten:</strong> voor het afleveren van uw bestelling</li>
                <li><strong>Betalingsproviders:</strong> voor het verwerken van betalingen (Stripe)</li>
                <li><strong>Hostingpartij:</strong> voor het hosten van onze website</li>
                <li><strong>Boekhoudsoftware:</strong> voor onze financiële administratie</li>
              </ul>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                6. Cookies
              </h2>
              <p>
                KMP Horren gebruikt functionele, analytische en tracking cookies. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van uw computer, tablet of smartphone.
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                Functionele cookies
              </h3>
              <p>
                Deze cookies zijn noodzakelijk voor het functioneren van de website, zoals het onthouden van uw winkelwagen.
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                Analytische cookies
              </h3>
              <p>
                Wij gebruiken analytische cookies om het gebruik van onze website te analyseren en te verbeteren. Deze gegevens worden geanonimiseerd.
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                Cookies uitschakelen
              </h3>
              <p>
                U kunt zich afmelden voor cookies door uw internetbrowser zo in te stellen dat deze geen cookies meer opslaat. Daarnaast kunt u ook alle informatie die eerder is opgeslagen via de instellingen van uw browser verwijderen.
              </p>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                7. Beveiliging
              </h2>
              <p>
                KMP Horren neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Onze website maakt gebruik van een betrouwbaar SSL Certificaat om te borgen dat uw persoonsgegevens niet in verkeerde handen vallen.
              </p>
              <p className="mt-4">
                Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via Info@kmphorren.nl.
              </p>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                8. Uw rechten
              </h2>
              <p>
                U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door KMP Horren.
              </p>
              <p className="mt-4">
                U heeft de volgende rechten:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Recht op inzage:</strong> u kunt opvragen welke gegevens wij van u hebben</li>
                <li><strong>Recht op rectificatie:</strong> u kunt onjuiste gegevens laten corrigeren</li>
                <li><strong>Recht op verwijdering:</strong> u kunt vragen uw gegevens te verwijderen</li>
                <li><strong>Recht op beperking:</strong> u kunt vragen de verwerking te beperken</li>
                <li><strong>Recht op dataportabiliteit:</strong> u kunt uw gegevens opvragen in een gangbaar formaat</li>
                <li><strong>Recht van bezwaar:</strong> u kunt bezwaar maken tegen de verwerking</li>
              </ul>
              <p className="mt-4">
                U kunt een verzoek tot inzage, correctie, verwijdering of gegevensoverdraging sturen naar Info@kmphorren.nl. Om er zeker van te zijn dat het verzoek door u is gedaan, vragen wij u een kopie van uw identiteitsbewijs met het verzoek mee te sturen.
              </p>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                9. Klachten
              </h2>
              <p>
                Mocht u een klacht hebben over de verwerking van uw persoonsgegevens dan vragen wij u hierover direct contact met ons op te nemen. Komen wij er samen met u niet uit dan vinden wij dit natuurlijk erg vervelend. U heeft altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens, dit is de toezichthoudende autoriteit op het gebied van privacybescherming.
              </p>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                10. Wijzigingen
              </h2>
              <p>
                KMP Horren behoudt zich het recht voor om wijzigingen aan te brengen in deze privacyverklaring. Het verdient aanbeveling om deze privacyverklaring geregeld te raadplegen, zodat u van deze wijzigingen op de hoogte bent.
              </p>

              <div className="bg-kmp-orange/10 border border-kmp-orange/20 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold text-kmp-blue mb-2">
                  Vragen over privacy?
                </h3>
                <p className="text-slate-600">
                  Heeft u vragen of opmerkingen over ons privacybeleid? Neem dan gerust contact met ons op via{" "}
                  <a href="mailto:Info@kmphorren.nl" className="text-kmp-orange hover:underline">
                    Info@kmphorren.nl
                  </a>{" "}
                  of bel ons op{" "}
                  <a href="tel:+31643065041" className="text-kmp-orange hover:underline">
                    +31 6 43 06 50 41
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
