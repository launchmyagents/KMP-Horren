"use client";

import {
  BookOpen,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Tag,
  MessageSquare,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowRight,
} from "lucide-react";

export default function HandleidingPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-kmp-blue flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          Admin Handleiding
        </h1>
        <p className="text-gray-600 mt-2">
          Uitgebreide handleiding voor het gebruik van het KMP Horren admin panel
        </p>
      </div>

      {/* Inhoudsopgave */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-kmp-blue mb-4">
          Inhoudsopgave
        </h2>
        <nav className="space-y-2">
          <a
            href="#dashboard"
            className="flex items-center gap-2 text-gray-700 hover:text-kmp-orange transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>1. Dashboard</span>
          </a>
          <a
            href="#bestellingen"
            className="flex items-center gap-2 text-gray-700 hover:text-kmp-orange transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>2. Bestellingen beheren</span>
          </a>
          <a
            href="#klanten"
            className="flex items-center gap-2 text-gray-700 hover:text-kmp-orange transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>3. Klanten beheren</span>
          </a>
          <a
            href="#producten"
            className="flex items-center gap-2 text-gray-700 hover:text-kmp-orange transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>4. Producten beheren</span>
          </a>
          <a
            href="#kortingscodes"
            className="flex items-center gap-2 text-gray-700 hover:text-kmp-orange transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>5. Kortingscodes</span>
          </a>
          <a
            href="#berichten"
            className="flex items-center gap-2 text-gray-700 hover:text-kmp-orange transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>6. Berichten beheren</span>
          </a>
          <a
            href="#inmeetservice"
            className="flex items-center gap-2 text-gray-700 hover:text-kmp-orange transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>7. Inmeetservice</span>
          </a>
        </nav>
      </div>

      {/* Sectie 1: Dashboard */}
      <section
        id="dashboard"
        className="bg-white rounded-xl border border-gray-200 p-6 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <LayoutDashboard className="w-6 h-6 text-kmp-orange" />
          <h2 className="text-2xl font-semibold text-kmp-blue">
            1. Dashboard
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            Het dashboard geeft u een overzicht van de belangrijkste
            statistieken en activiteiten van uw webshop.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Dashboard Overzicht
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li>
                    <strong>Omzet vandaag/deze week:</strong> Toont de totale
                    omzet en aantal bestellingen
                  </li>
                  <li>
                    <strong>In behandeling:</strong> Aantal bestellingen die
                    verwerkt moeten worden
                  </li>
                  <li>
                    <strong>Nieuwe berichten:</strong> Ongelezen contactberichten
                  </li>
                  <li>
                    <strong>Totaal bestellingen/klanten:</strong> Algemene
                    statistieken
                  </li>
                  <li>
                    <strong>Inmeetservice:</strong> Openstaande meetaanvragen
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">Quick Actions</h3>
            <p className="mb-2">
              Op het dashboard vindt u snelle acties voor:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bestellingen die op betaling wachten</li>
              <li>Bestellingen in productie die verwerkt moeten worden</li>
              <li>Ongelezen berichten</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Recente Bestellingen
            </h3>
            <p>
              Onderaan het dashboard ziet u de laatste 5 bestellingen. Klik op
              &quot;Alle bestellingen&quot; om naar de volledige lijst te gaan.
            </p>
          </div>
        </div>
      </section>

      {/* Sectie 2: Bestellingen */}
      <section
        id="bestellingen"
        className="bg-white rounded-xl border border-gray-200 p-6 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShoppingBag className="w-6 h-6 text-kmp-orange" />
          <h2 className="text-2xl font-semibold text-kmp-blue">
            2. Bestellingen beheren
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            Op de bestellingen pagina kunt u alle bestellingen bekijken,
            filteren en beheren.
          </p>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Bestellingen overzicht
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk alle bestellingen in een overzichtelijke tabel</li>
              <li>Zoek op bestelnummer, klantnaam of e-mailadres</li>
              <li>
                Filter op status (In afwachting, Betaald, In productie,
                Verzonden, etc.)
              </li>
              <li>Sorteer op datum of totaalbedrag</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Bestelstatussen
                </h3>
                <ul className="space-y-1 text-yellow-800">
                  <li>
                    <strong>In afwachting:</strong> Bestelling wacht op betaling
                  </li>
                  <li>
                    <strong>Betaald:</strong> Betaling ontvangen, klaar voor
                    verwerking
                  </li>
                  <li>
                    <strong>In productie:</strong> Bestelling wordt geproduceerd
                  </li>
                  <li>
                    <strong>Verzonden:</strong> Bestelling is verzonden naar
                    klant
                  </li>
                  <li>
                    <strong>Geleverd:</strong> Bestelling is bij klant aangekomen
                  </li>
                  <li>
                    <strong>Geannuleerd:</strong> Bestelling is geannuleerd
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Bestelling bewerken
            </h3>
            <p className="mb-2">
              Klik op een bestelling om de details te bekijken en te bewerken:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk alle bestelgegevens (klant, producten, adres)</li>
              <li>Wijzig de status van de bestelling</li>
              <li>Voeg notities toe voor interne communicatie</li>
              <li>Download bestelbon of factuur</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">
                  Best Practices
                </h3>
                <ul className="space-y-1 text-green-800">
                  <li>
                    Update de status regelmatig zodat klanten op de hoogte blijven
                  </li>
                  <li>
                    Controleer betalingen voordat u de status naar &quot;Betaald&quot; zet
                  </li>
                  <li>
                    Gebruik notities om belangrijke informatie vast te leggen
                  </li>
                  <li>
                    Verzend bevestigingsmails wanneer u de status wijzigt
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie 3: Klanten */}
      <section
        id="klanten"
        className="bg-white rounded-xl border border-gray-200 p-6 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-kmp-orange" />
          <h2 className="text-2xl font-semibold text-kmp-blue">
            3. Klanten beheren
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            Beheer alle klantgegevens en bekijk de bestelgeschiedenis per klant.
          </p>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Klanten overzicht
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk alle geregistreerde klanten</li>
              <li>Zoek op naam of e-mailadres</li>
              <li>Bekijk totaal aantal bestellingen per klant</li>
              <li>Zie totale bestedingsbedrag per klant</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">Klantdetails</h3>
            <p className="mb-2">
              Klik op een klant om de volledige details te bekijken:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Persoonlijke gegevens (naam, e-mail, telefoon)</li>
              <li>Adresgegevens (verzend- en factuuradres)</li>
              <li>Complete bestelgeschiedenis</li>
              <li>Bekijk alle bestellingen van deze klant</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sectie 4: Producten */}
      <section
        id="producten"
        className="bg-white rounded-xl border border-gray-200 p-6 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-6 h-6 text-kmp-orange" />
          <h2 className="text-2xl font-semibold text-kmp-blue">
            4. Producten beheren
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            Beheer uw productcatalogus: voeg nieuwe producten toe, bewerk
            bestaande producten en beheer voorraad.
          </p>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Producten overzicht
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk alle producten in uw catalogus</li>
              <li>Zoek op productnaam of SKU</li>
              <li>Filter op categorie of beschikbaarheid</li>
              <li>Bekijk prijs en voorraadstatus</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Nieuw product toevoegen
            </h3>
            <p className="mb-2">
              Klik op &quot;Nieuw product&quot; om een product toe te voegen:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Vul productnaam en beschrijving in</li>
              <li>Upload productafbeeldingen</li>
              <li>Stel prijs en voorraad in</li>
              <li>Selecteer categorie (deurhorren, raamhorren, etc.)</li>
              <li>
                Configureer productopties (afmetingen, kleuren, montage)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Product bewerken
            </h3>
            <p className="mb-2">
              Klik op een product om het te bewerken:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Wijzig productgegevens</li>
              <li>Update prijzen en voorraad</li>
              <li>Voeg of verwijder afbeeldingen</li>
              <li>Activeer of deactiveer product</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Belangrijk
                </h3>
                <p className="text-yellow-800">
                  Wijzigingen aan producten worden direct zichtbaar op de
                  website. Controleer altijd of alle informatie correct is
                  voordat u opslaat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie 5: Kortingscodes */}
      <section
        id="kortingscodes"
        className="bg-white rounded-xl border border-gray-200 p-6 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-6 h-6 text-kmp-orange" />
          <h2 className="text-2xl font-semibold text-kmp-blue">
            5. Kortingscodes
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            Maak en beheer kortingscodes voor promoties en speciale aanbiedingen.
          </p>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Kortingscode aanmaken
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Kies een unieke code (bijv. &quot;WELKOM10&quot;)</li>
              <li>Stel kortingspercentage of vast bedrag in</li>
              <li>Bepaal minimale bestelwaarde (optioneel)</li>
              <li>Stel geldigheidsperiode in</li>
              <li>Beperk aantal gebruik (optioneel)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Kortingscode beheren
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk alle actieve en verlopen codes</li>
              <li>Zie hoeveel keer een code gebruikt is</li>
              <li>Activeer of deactiveer codes</li>
              <li>Bewerk bestaande codes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sectie 6: Berichten */}
      <section
        id="berichten"
        className="bg-white rounded-xl border border-gray-200 p-6 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-6 h-6 text-kmp-orange" />
          <h2 className="text-2xl font-semibold text-kmp-blue">
            6. Berichten beheren
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            Beheer contactberichten die klanten via het contactformulier hebben
            verzonden.
          </p>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Berichten overzicht
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk alle ontvangen berichten</li>
              <li>Zie ongelezen berichten gemarkeerd</li>
              <li>Zoek op naam, e-mail of onderwerp</li>
              <li>Filter op gelezen/ongelezen status</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Bericht beantwoorden
            </h3>
            <p className="mb-2">
              Klik op een bericht om het volledig te bekijken:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Lees het volledige bericht</li>
              <li>Markeer als gelezen na beantwoording</li>
              <li>Verwijder oude berichten</li>
              <li>Kopieer e-mailadres om direct te antwoorden</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Tip</h3>
                <p className="text-green-800">
                  Reageer altijd binnen 24 uur op berichten voor de beste
                  klantenservice. Markeer berichten als gelezen nadat u ze heeft
                  beantwoord.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie 7: Inmeetservice */}
      <section
        id="inmeetservice"
        className="bg-white rounded-xl border border-gray-200 p-6 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-kmp-orange" />
          <h2 className="text-2xl font-semibold text-kmp-blue">
            7. Inmeetservice
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            Beheer aanvragen voor de inmeetservice. Klanten kunnen via de website
            een afspraak aanvragen voor het opmeten van hun ramen of deuren.
          </p>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Aanvragen overzicht
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk alle meetaanvragen</li>
              <li>Zie gewenste datum en tijd</li>
              <li>Bekijk contactgegevens van klant</li>
              <li>Zie type aanvraag (deurhorren, raamhorren, etc.)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Aanvraag verwerken
            </h3>
            <p className="mb-2">
              Klik op een aanvraag om details te bekijken:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bekijk volledige aanvraaggegevens</li>
              <li>
                Neem contact op met klant om afspraak te bevestigen
              </li>
              <li>Markeer aanvraag als verwerkt na afspraak</li>
              <li>Voeg notities toe over de afspraak</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Workflow</h3>
                <ol className="space-y-1 text-blue-800 list-decimal list-inside">
                  <li>Klant doet aanvraag via website</li>
                  <li>U ontvangt melding in admin panel</li>
                  <li>Neem contact op met klant om afspraak te plannen</li>
                  <li>Bevestig afspraakdatum en tijd</li>
                  <li>
                    Markeer aanvraag als verwerkt na succesvolle afspraak
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Veelgestelde vragen */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-kmp-blue mb-4">
          Veelgestelde Vragen
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Hoe kan ik een bestelling annuleren?
            </h3>
            <p className="text-gray-700">
              Ga naar de bestellingen pagina, klik op de bestelling en wijzig de
              status naar &quot;Geannuleerd&quot;. De klant ontvangt automatisch een
              melding.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Kan ik meerdere producten tegelijk bewerken?
            </h3>
            <p className="text-gray-700">
              Momenteel moet u elk product individueel bewerken. Dit zorgt
              ervoor dat wijzigingen zorgvuldig worden doorgevoerd.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-kmp-blue mb-2">
              Hoe exporteer ik bestellingen?
            </h3>
            <p className="text-gray-700">
              Op de bestellingen pagina kunt u de exportfunctie gebruiken om
              bestellingen te exporteren naar CSV of Excel.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-kmp-orange/10 rounded-xl border border-kmp-orange/20 p-6">
        <h2 className="text-xl font-semibold text-kmp-blue mb-2">
          Hulp nodig?
        </h2>
        <p className="text-gray-700">
          Als u vragen heeft of hulp nodig heeft bij het gebruik van het admin
          panel, neem dan contact op met de technische ondersteuning.
        </p>
      </section>
    </div>
  );
}
