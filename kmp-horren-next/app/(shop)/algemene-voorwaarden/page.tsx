import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | KMP Horren",
  description: "Lees onze algemene voorwaarden voor het bestellen van horren en insectenwering bij KMP Horren.",
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Algemene Voorwaarden
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, bestellingen en overeenkomsten van KMP Horren.
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
                Artikel 1 - Definities
              </h2>
              <p>
                In deze voorwaarden wordt verstaan onder:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>KMP Horren:</strong> de besloten vennootschap KMP Horren B.V., gevestigd te Maasdijk, ingeschreven bij de Kamer van Koophandel.</li>
                <li><strong>Klant:</strong> de natuurlijke persoon of rechtspersoon die een overeenkomst aangaat met KMP Horren.</li>
                <li><strong>Overeenkomst:</strong> de overeenkomst tussen KMP Horren en de Klant.</li>
                <li><strong>Product:</strong> horren, insectenwering en aanverwante producten die door KMP Horren worden geleverd.</li>
                <li><strong>Maatwerk:</strong> producten die op specificatie van de Klant worden vervaardigd.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 2 - Toepasselijkheid
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Deze algemene voorwaarden zijn van toepassing op elk aanbod van KMP Horren en op elke tot stand gekomen overeenkomst tussen KMP Horren en de Klant.</li>
                <li>Voordat de overeenkomst wordt gesloten, wordt de tekst van deze algemene voorwaarden aan de Klant beschikbaar gesteld.</li>
                <li>Afwijkingen van deze voorwaarden zijn slechts geldig indien deze uitdrukkelijk schriftelijk zijn overeengekomen.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 3 - Het aanbod
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Het aanbod bevat een volledige en nauwkeurige omschrijving van de aangeboden producten. De beschrijving is voldoende gedetailleerd om een goede beoordeling van het aanbod door de Klant mogelijk te maken.</li>
                <li>Kennelijke vergissingen of fouten in het aanbod binden KMP Horren niet.</li>
                <li>Elk aanbod bevat zodanige informatie, dat voor de Klant duidelijk is wat de rechten en verplichtingen zijn, die aan de aanvaarding van het aanbod zijn verbonden.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 4 - De overeenkomst
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>De overeenkomst komt tot stand op het moment van aanvaarding door de Klant van het aanbod en het voldoen aan de daarbij gestelde voorwaarden.</li>
                <li>Indien de Klant het aanbod langs elektronische weg heeft aanvaard, bevestigt KMP Horren onverwijld langs elektronische weg de ontvangst van de aanvaarding van het aanbod.</li>
                <li>KMP Horren kan zich binnen wettelijke kaders op de hoogte stellen of de Klant aan zijn betalingsverplichtingen kan voldoen.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 5 - Herroepingsrecht
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Bij de aankoop van producten heeft de Klant de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende 14 dagen.</li>
                <li><strong>Uitzondering maatwerk:</strong> Het herroepingsrecht is niet van toepassing op producten die volgens specificaties van de Klant zijn vervaardigd (maatwerk horren).</li>
                <li>Tijdens de bedenktijd zal de Klant zorgvuldig omgaan met het product en de verpakking.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 6 - Prijzen en betaling
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Alle prijzen zijn inclusief BTW, tenzij anders vermeld.</li>
                <li>Betaling dient te geschieden via de op de website aangeboden betaalmethoden (iDEAL, creditcard, etc.).</li>
                <li>De Klant heeft de plicht om onjuistheden in verstrekte of vermelde betaalgegevens onverwijld aan KMP Horren te melden.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 7 - Levering
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>KMP Horren zal de grootst mogelijke zorgvuldigheid in acht nemen bij het in ontvangst nemen en bij de uitvoering van bestellingen.</li>
                <li>Als plaats van levering geldt het adres dat de Klant aan KMP Horren kenbaar heeft gemaakt.</li>
                <li>De levertijd voor maatwerk horren bedraagt gemiddeld 2-3 weken na ontvangst van de betaling.</li>
                <li>Het risico van beschadiging en/of vermissing van producten berust bij KMP Horren tot het moment van bezorging aan de Klant.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 8 - Garantie
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>KMP Horren staat ervoor in dat de producten voldoen aan de overeenkomst, de in het aanbod vermelde specificaties en aan de redelijke eisen van deugdelijkheid.</li>
                <li>Op alle horren geldt een garantie van 2 jaar op fabricagefouten.</li>
                <li>De garantie vervalt bij onjuist gebruik, onoordeelkundige montage of externe beschadigingen.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 9 - Klachtenregeling
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Klachten over de uitvoering van de overeenkomst moeten binnen bekwame tijd nadat de Klant de gebreken heeft geconstateerd, volledig en duidelijk omschreven worden ingediend bij KMP Horren.</li>
                <li>Bij KMP Horren ingediende klachten worden binnen een termijn van 14 dagen gerekend vanaf de datum van ontvangst beantwoord.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 10 - Aansprakelijkheid
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>De aansprakelijkheid van KMP Horren is beperkt tot het bedrag dat door de verzekering wordt uitgekeerd, dan wel tot maximaal het factuurbedrag van de betreffende bestelling.</li>
                <li>KMP Horren is niet aansprakelijk voor schade ontstaan door onjuiste montage door de Klant of derden.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 11 - Toepasselijk recht
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Op overeenkomsten tussen KMP Horren en de Klant waarop deze algemene voorwaarden betrekking hebben, is uitsluitend Nederlands recht van toepassing.</li>
                <li>Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar KMP Horren is gevestigd.</li>
              </ol>

              <h2 className="text-2xl font-bold text-kmp-blue mt-8 mb-4">
                Artikel 12 - Contactgegevens
              </h2>
              <p>
                Voor vragen over deze algemene voorwaarden kunt u contact opnemen met:
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
