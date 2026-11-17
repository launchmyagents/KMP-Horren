export interface AdviesSectie {
  kop: string;
  alineas?: string[];
  lijst?: string[];
  stappen?: string[];
}

export interface AdviesArtikel {
  slug: string;
  titel: string;
  metaTitel: string;
  metaBeschrijving: string;
  doelterm: string;
  /** Direct antwoord op de vraag in de kop, binnen honderd woorden. */
  samenvatting: string;
  bijgewerkt: string;
  secties: AdviesSectie[];
  vragen: { question: string; answer: string }[];
  verwant: { label: string; href: string }[];
}

export const ADVIES: AdviesArtikel[] = [
  {
    slug: "hordeur-plaatsen",
    titel: "Hordeur plaatsen: zo doet u het zelf",
    metaTitel: "Hordeur plaatsen in 6 stappen",
    metaBeschrijving:
      "Een hordeur plaatst u zelf in ongeveer een uur. Welk gereedschap u nodig heeft, hoe u het kozijn uitlijnt en waar het meestal misgaat.",
    doelterm: "hordeur plaatsen",
    samenvatting:
      "Een hordeur plaatsen kost ongeveer een uur en u heeft er een boormachine, een waterpas en een schroevendraaier voor nodig. Het werk zit hem niet in het schroeven maar in het uitlijnen: staat het kozijn niet zuiver waterpas en haaks, dan sluit de deur nooit helemaal aan en laat hij muggen door. Meet daarom eerst, zet het kozijn los vast, controleer de werking en draai pas daarna alles aan.",
    bijgewerkt: "2026-11-17",
    secties: [
      {
        kop: "Wat u nodig heeft",
        lijst: [
          "Boormachine met steenboor of houtboor, afhankelijk van uw kozijn",
          "Waterpas van minimaal 60 centimeter",
          "Kruiskopschroevendraaier of een schroefmachine met koppeling",
          "Potlood en rolmaat",
          "Eventueel pluggen, als u in steen of in beton boort",
        ],
      },
      {
        kop: "In zes stappen",
        stappen: [
          "Houd het kozijn van de hordeur in de opening en teken de boorgaten af. Werk met zijn tweeën als de deur breder is dan een meter.",
          "Controleer met de waterpas of de bovenregel zuiver horizontaal staat voordat u een gat boort. Een scheve bovenregel is achteraf niet meer te corrigeren.",
          "Boor de gaten en zet het kozijn losjes vast, dus de schroeven net niet aangedraaid.",
          "Hang de deur in en doe hem een paar keer open en dicht. Hij hoort vanzelf in het slot te vallen zonder dat u hoeft te duwen.",
          "Corrigeer waar nodig met dunne vulplaatjes achter het kozijn. Dat is normaal: vrijwel geen enkele deuropening is perfect haaks.",
          "Draai alle schroeven aan en controleer de werking nog een laatste keer.",
        ],
      },
      {
        kop: "Waar het meestal misgaat",
        alineas: [
          "De drie fouten die wij het vaakst terugzien zijn meetfouten, geen montagefouten.",
          "De eerste is meten op één plek. Een deuropening is zelden overal even breed. Meet boven, in het midden en onderin. Ga uit van de kleinste maat.",
          "De tweede is de vloer vergeten. Ligt er nog een drempel, een deurmat of straks een nieuwe vloer, dan verandert de hoogte en loopt de deur aan.",
          "De derde is te strak meten. Een hordeur heeft speling nodig om te kunnen bewegen. Bij een plissé hordeur gaat het om een paar millimeter. Die ruimte hoort in de maat te zitten, niet eruit.",
        ],
      },
      {
        kop: "Wanneer u het beter niet zelf doet",
        alineas: [
          "Bij een schuifpui, bij een opening breder dan twee en een halve meter en bij een kozijn dat zichtbaar uit het lood staat, wordt zelf plaatsen lastig. Niet omdat het werk moeilijker is, maar omdat een meetfout daar veel zwaarder doorwerkt.",
          "In die gevallen is onze inmeetservice goedkoper dan een hor die niet past. Wij komen langs en meten op. De maatvoering is dan onze verantwoordelijkheid.",
        ],
      },
    ],
    vragen: [
      {
        question: "Hoe lang duurt het plaatsen van een hordeur?",
        answer:
          "Reken op ongeveer een uur voor een enkele deur, inclusief uitlijnen en controleren. Een dubbele deur duurt iets langer omdat beide helften op elkaar moeten aansluiten.",
      },
      {
        question: "Moet ik boren in mijn kozijn?",
        answer:
          "Bij een hordeur vrijwel altijd, omdat de deur zijn gewicht ergens kwijt moet. Bij onze inzethorren voor ramen hoeft dat juist niet: die klemmen zichzelf vast met een veerconstructie.",
      },
      {
        question: "Kan een hordeur ook in een huurwoning?",
        answer:
          "Dat hangt af van uw verhuurder, omdat er geboord wordt. Vraag het na voordat u bestelt, want een hor op maat kunnen wij niet terugnemen.",
      },
    ],
    verwant: [
      { label: "Hordeuren op maat bekijken", href: "/producten/deurhorren" },
      { label: "Hor opmeten", href: "/advies/hor-opmeten" },
      { label: "Inmeetservice aanvragen", href: "/inmeetservice" },
    ],
  },
  {
    slug: "hor-schoonmaken",
    titel: "Hor schoonmaken zonder het gaas te beschadigen",
    metaTitel: "Hor schoonmaken: wat wel en niet werkt",
    metaBeschrijving:
      "Horgaas gaat jaren mee als u het goed schoonmaakt. Welke middelen veilig zijn, welke het gaas uitrekken en hoe vaak het nodig is.",
    doelterm: "hor schoonmaken",
    samenvatting:
      "Een hor maakt u schoon met lauw water, een scheutje afwasmiddel en een zachte borstel of microvezeldoek. Meer is het niet en meer moet het ook niet zijn. De meeste schade aan horgaas ontstaat niet door vuil maar door schoonmaken: een hogedrukreiniger rekt het gaas uit, een schuurspons maakt het dof en een allesreiniger met oplosmiddel tast de coating aan. Twee keer per jaar is genoeg, aan het begin en aan het eind van het seizoen.",
    bijgewerkt: "2026-11-17",
    secties: [
      {
        kop: "Zo doet u het",
        stappen: [
          "Haal de hor uit het kozijn en leg hem plat neer, op een handdoek of op het gras. Rechtop schoonmaken drukt het gaas uit vorm.",
          "Zuig eerst het losse stof eraf met de borstelmond van de stofzuiger, op de laagste stand.",
          "Maak een sopje van lauw water met een paar druppels afwasmiddel.",
          "Ga met een zachte borstel of een microvezeldoek in één richting over het gaas en boen niet heen en weer.",
          "Spoel af met de tuinslang op lage druk of met een plantenspuit.",
          "Laat de hor plat drogen voordat u hem terugzet. Een vochtig profiel geeft kringen op het kozijn.",
        ],
      },
      {
        kop: "Wat u beter niet gebruikt",
        lijst: [
          "Hogedrukreiniger. Dit is veruit de fout die wij het vaakst zien. Het gaas rekt uit en komt niet meer terug in vorm.",
          "Schuurspons of staalwol. Laat krassen achter in het gaas en in de lak van het profiel.",
          "Allesreiniger met ammoniak of oplosmiddel. Tast de coating van het gaas en de afwerking van het aluminium aan.",
          "Afwasborstel met harde haren. Werkt op de ruit, niet op gaas.",
        ],
      },
      {
        kop: "Plissé horren vragen iets anders",
        alineas: [
          "Een plissé hor heeft een gevouwen doek dat in de rails loopt. Die rails is het onderdeel dat aandacht nodig heeft, niet het doek.",
          "Zuig de onderrails uit of blaas hem schoon. Zand en stof in de geleiding zijn de reden dat een plissé hor stroef gaat lopen. Dat voelt als slijtage, maar het is gewoon vuil.",
          "Het doek zelf veegt u af met een licht vochtige microvezeldoek. Niet nat maken en niet in de was.",
        ],
      },
      {
        kop: "Hoe vaak schoonmaken?",
        alineas: [
          "Twee keer per jaar is voor de meeste woningen genoeg. Eén keer in het voorjaar voordat u de horren weer gebruikt en één keer in het najaar voordat ze opgeborgen worden.",
          "Woont u aan een drukke weg, vlak bij de kust of naast akkerland, maak er dan drie of vier keer per jaar van. Fijnstof, zout en landbouwstof hechten zich sterker dan gewoon huisstof.",
        ],
      },
    ],
    vragen: [
      {
        question: "Mag horgaas in de wasmachine?",
        answer:
          "Nee. Het doek van een plissé hor heeft vouwen die precies op hun plek moeten blijven zitten. Een wasprogramma haalt die eruit. Gaas van een inzethor zit vast in het profiel en gaat er sowieso niet uit.",
      },
      {
        question: "Hoe krijg ik vet of aanslag van de keukenhor af?",
        answer:
          "Gebruik hetzelfde sopje maar laat het vijf minuten intrekken voordat u borstelt. Vet laat los door weken, niet door kracht.",
      },
      {
        question: "Mijn gaas is dof geworden, is dat vuil?",
        answer:
          "Meestal wel, maar als het na schoonmaken dof blijft is de coating beschadigd. Dat is niet te herstellen, wel te vervangen. Losse gaasdoeken zijn bij ons na te bestellen.",
      },
    ],
    verwant: [
      { label: "Hor repareren", href: "/advies/hor-repareren" },
      { label: "Welk horgaas past bij u", href: "/advies/horgaas-kiezen" },
      { label: "Onze horren bekijken", href: "/producten" },
    ],
  },
  {
    slug: "hor-repareren",
    titel: "Hor repareren of horgaas vervangen",
    metaTitel: "Hor repareren en horgaas vervangen",
    metaBeschrijving:
      "Een gat in het gaas, een losse klem of een stroeve plissé hor. Wat u zelf oplost, wat vervangen moet worden en wanneer repareren niet meer loont.",
    doelterm: "hor repareren",
    samenvatting:
      "De meeste horschades zijn te repareren zonder de hele hor te vervangen. Een klein gaatje plakt u dicht met een reparatiepatch en een versleten veerklem vervangt u afzonderlijk. Een stroef lopende plissé hor is bijna altijd een vieze rails en geen kapotte hor. Vervangen loont pas als het gaas op meerdere plekken scheurt of als het profiel verbogen is. Losse onderdelen zoals gaas, klemmen en profielen zijn bij ons na te bestellen.",
    bijgewerkt: "2026-11-17",
    secties: [
      {
        kop: "Een gat of scheur in het gaas",
        alineas: [
          "Tot ongeveer een centimeter is een reparatiepatch de snelste oplossing. Dat is een zelfklevend stukje gaas dat u over het gat drukt. Maak het gaas eromheen eerst schoon en droog, anders laat de lijm na een paar weken los.",
          "Is de scheur langer, dan is dichtplakken uitstel. De spanning in het gaas trekt de scheur verder open en u ziet de patch bovendien zitten. In dat geval vervangt u het hele doek.",
        ],
      },
      {
        kop: "Horgaas vervangen in een inzethor",
        alineas: [
          "Twee woorden vooraf. De keder is het rubberen koordje dat het gaas in de groef van het profiel klemt. Een kederroller is het wieltje waarmee u dat koordje terugdrukt. Zo'n roller kost bij de bouwmarkt een paar euro.",
        ],
        stappen: [
          "Leg de hor plat en wip de rubberen kederstrip met een platte schroevendraaier uit de groef.",
          "Haal het oude gaas eruit en gooi de keder niet weg, die kunt u meestal hergebruiken.",
          "Leg het nieuwe gaas over het frame, zodat het aan alle kanten ruim overlapt.",
          "Begin in het midden van de lange zijde en druk de keder met een kederroller terug in de groef.",
          "Houd het gaas licht op spanning terwijl u rolt, maar trek het niet strak. Te strak getrokken gaas trekt het profiel krom.",
          "Snijd de overlap af met een afbreekmes, net buiten de keder.",
        ],
      },
      {
        kop: "Een plissé hor die stroef loopt",
        alineas: [
          "Dit is in negen van de tien gevallen vuil in de onderrails en geen defect. Zuig de rails uit en veeg hem na met een licht vochtige doek.",
          "Helpt dat niet, controleer dan of de rails nog recht ligt. Een rails waar iemand op gestapt heeft of die ingedrukt is, klemt het doek.",
          "Smeer de rails niet met olie of siliconenspray. Dat werkt een week en trekt daarna stof aan, waardoor het probleem erger terugkomt.",
        ],
      },
      {
        kop: "Wanneer repareren niet meer loont",
        lijst: [
          "Het profiel is verbogen of gescheurd. Dan sluit de hor nooit meer goed aan.",
          "Het gaas scheurt op meerdere plekken tegelijk. Dat betekent dat de coating overal verouderd is.",
          "De hor is ouder dan tien jaar en het gaas is bros. Nieuw gaas in een oud profiel houdt het dan niet lang.",
        ],
      },
      {
        kop: "Garantie",
        alineas: [
          "Wij geven drie jaar garantie op constructie en onderdelen. Schade door gebruik, zoals een scheur die ontstaat doordat er iets tegenaan gewaaid is, valt daar niet onder. Twijfelt u of iets onder de garantie valt, stuur dan een foto mee als u contact opneemt. Dat scheelt een keer heen en weer mailen.",
        ],
      },
    ],
    vragen: [
      {
        question: "Kan ik losse onderdelen nabestellen?",
        answer:
          "Ja. Gaas, klemmen en profielen zijn los te bestellen. Geef bij uw aanvraag het type hor en de maat door, dan weten wij welk profiel erin zit.",
      },
      {
        question: "Wat kost horgaas vervangen?",
        answer:
          "Dat hangt af van het formaat en het type gaas. Een doek standaardgaas is een fractie van de prijs van een nieuwe hor, dus zolang het profiel nog onbeschadigd is, loont vervangen vrijwel altijd.",
      },
      {
        question: "Mijn hond heeft door het gaas gelopen, wat nu?",
        answer:
          "Vervang het doek en kies dan petscreen. Dat gaas is een stuk sterker en is bedoeld voor huishoudens met honden of katten.",
      },
    ],
    verwant: [
      { label: "Welk horgaas past bij u", href: "/advies/horgaas-kiezen" },
      { label: "Hor schoonmaken", href: "/advies/hor-schoonmaken" },
      { label: "Contact opnemen", href: "/contact" },
    ],
  },
  {
    slug: "horgaas-kiezen",
    titel: "Welk horgaas past bij uw situatie",
    metaTitel: "Horgaas kiezen: standaard, pollen of petscreen",
    metaBeschrijving:
      "Standaardgaas, anti-pollengaas of petscreen. Het verschil in doorkijk, luchtdoorlaat en sterkte. Zo kiest u het gaas dat bij uw situatie past.",
    doelterm: "pollengaas",
    samenvatting:
      "Er zijn drie soorten horgaas en de keuze hangt af van wat u tegen wilt houden. Standaardgaas houdt insecten tegen en laat het meeste licht en lucht door. Anti-pollengaas heeft een veel fijnere structuur en vangt ook stuifmeel. Dat merkt u als u hooikoorts heeft. Petscreen is grover maar vele malen sterker en is bedoeld voor huishoudens met een hond of kat. Fijner gaas betekent altijd iets minder doorkijk en iets minder luchtstroom.",
    bijgewerkt: "2026-11-17",
    secties: [
      {
        kop: "Standaardgaas",
        alineas: [
          "Dit is het gaas dat in de meeste horren zit en voor de meeste woningen de juiste keuze. Het houdt muggen, vliegen en wespen tegen en u kijkt er nagenoeg ongehinderd doorheen.",
          "Kies dit tenzij u een concrete reden heeft om het niet te doen. Fijner of sterker gaas gaat altijd iets ten koste van de doorkijk of de luchtstroom. Dat merkt u elke dag, terwijl u de extra eigenschap misschien maar een paar weken per jaar nodig heeft.",
        ],
      },
      {
        kop: "Anti-pollengaas",
        alineas: [
          "De mazen zijn zoveel fijner dat stuifmeel er grotendeels buiten blijft. Mensen met hooikoorts die hun slaapkamerraam 's nachts open willen, merken hier het meeste van.",
          "Er is een keerzijde: het gaas is dichter, dus er gaat minder lucht doorheen en de doorkijk is wat melkachtiger. In een slaapkamer weegt dat vrijwel nooit op tegen een nacht doorslapen. In een woonkamer met uitzicht weegt het soms wel.",
          "Overweeg het per ruimte in plaats van voor het hele huis. Anti-pollengaas op de slaapkamer en standaardgaas beneden is een heel normale combinatie.",
        ],
      },
      {
        kop: "Petscreen",
        alineas: [
          "Petscreen is letterlijk huisdierengaas. Het is gemaakt van dikkere draad en is bestand tegen nagels en tegen een hond die ertegenaan springt. Dit is het gaas dat u kiest als een gewone hor binnen één seizoen kapotgaat.",
          "Het gaas is zichtbaar grover en donkerder dan standaardgaas. Dat is geen gebrek maar de reden dat het sterk is.",
        ],
      },
      {
        kop: "Kort naast elkaar",
        lijst: [
          "Doorkijk: standaard is het best, petscreen het minst.",
          "Luchtdoorlaat: standaard is het best, anti-pollengaas het minst.",
          "Sterkte: petscreen is veruit het sterkst.",
          "Houdt stuifmeel tegen: alleen anti-pollengaas.",
        ],
      },
      {
        kop: "Twijfelt u?",
        alineas: [
          "Bel ons even. Welk gaas verstandig is hangt af van de ruimte, de ligging en wie er woont. Dat is in twee minuten aan de telefoon duidelijker dan in een vergelijkingstabel. U kunt het gaas later overigens los vervangen zonder de hele hor te vernieuwen.",
        ],
      },
    ],
    vragen: [
      {
        question: "Kan ik later ander gaas in dezelfde hor krijgen?",
        answer:
          "Ja. Het gaas zit met een rubberen keder in het profiel en is te vervangen zonder dat de hor eruit hoeft. Losse doeken zijn na te bestellen.",
      },
      {
        question: "Houdt anti-pollengaas ook fijnstof tegen?",
        answer:
          "Gedeeltelijk, maar het is er niet voor gemaakt en wij claimen dat ook niet. Het is ontwikkeld voor stuifmeel.",
      },
      {
        question: "Is petscreen nodig bij een kat die niet naar buiten gaat?",
        answer:
          "Meestal wel. Een kat hoeft niet naar buiten te willen om zijn nagels in het gaas te zetten. Juist bij inzethorren op kattenhoogte is petscreen het overwegen waard.",
      },
    ],
    verwant: [
      { label: "Raamhorren op maat", href: "/producten/raamhorren" },
      { label: "Hor repareren", href: "/advies/hor-repareren" },
      { label: "Hor schoonmaken", href: "/advies/hor-schoonmaken" },
    ],
  },
  {
    slug: "hor-opmeten",
    titel: "Hor opmeten: welke maat heeft u nodig",
    metaTitel: "Hor opmeten zonder meetfout",
    metaBeschrijving:
      "Dagmaat of buitenmaat, waar u precies meet en waarom u op drie plekken moet meten. De meetinstructie per type hor.",
    doelterm: "hor opmeten",
    samenvatting:
      "Welke maat u opgeeft hangt af van het type hor. Voor een inzethor meet u de dagmaat, dus de kleinste vrije opening in het kozijn. Voor een voorzethor meet u de buitenmaat van het kozijn, omdat de hor ervoor komt. Meet altijd op drie plekken: boven, midden en onder. Geef bij een inzethor de kleinste maat door. Trek zelf geen speling af, dat doen wij. Trekt u er zelf ook iets af, dan wordt de hor te klein en gaat hij rammelen.",
    bijgewerkt: "2026-11-17",
    secties: [
      {
        kop: "Dagmaat of buitenmaat",
        alineas: [
          "De dagmaat is de vrije opening: van kozijnhout tot kozijnhout, de ruimte waar daglicht doorheen valt. Die maat heeft u nodig bij alles wat in het kozijn valt, dus bij inzethorren en bij veerstifthorren, die met uitschuifbare veerstiften in het kozijn worden geklemd.",
          "De buitenmaat is de maat over het kozijn heen. Die heeft u nodig bij alles wat voor het kozijn komt, dus bij voorzethorren en bij de meeste hordeuren.",
          "Weet u niet zeker in welke categorie uw situatie valt, meet dan beide maten en geef ze allebei door. Wij halen er dan de juiste uit.",
        ],
      },
      {
        kop: "Meet op drie plekken",
        alineas: [
          "Vrijwel geen enkel kozijn is overal precies even breed. Een verschil van drie of vier millimeter tussen boven en onder is volstrekt normaal, ook in nieuwbouw.",
          "Meet daarom de breedte boven, in het midden en onderin. Meet de hoogte links, in het midden en rechts. Bij een inzethor geeft u de kleinste maat door, want die bepaalt of de hor er überhaupt in past.",
        ],
      },
      {
        kop: "Let op deze vier dingen",
        lijst: [
          "Meet in millimeters en niet in centimeters. Een afronding van een halve centimeter is bij een hor het verschil tussen passen en niet passen.",
          "Haal eerst het meetlint langs het kozijn zonder iets te noteren, zodat u ziet waar de vernauwingen zitten.",
          "Kijk naar obstakels in het kozijn, zoals een raamboompje, een scharnier of een rolluikkast. Die bepalen hoeveel inbouwdiepte er overblijft, dus hoeveel ruimte er in het kozijn is om de hor in te zetten.",
          "Houd rekening met de vloer bij hordeuren. Een drempel, een deurmat of een vloer die nog gelegd moet worden verandert de hoogte.",
        ],
      },
      {
        kop: "Draai-kiepramen",
        alineas: [
          "Bij een draai-kiepraam komt de hor aan de binnenzijde en moet het raam er nog langs kunnen kiepen. De inbouwdiepte is daarom belangrijker dan bij een gewoon raam.",
          "Is er te weinig diepte, dan is een voorzet-inzethor de oplossing. Die komt op het kozijn in plaats van erin. Dan heeft u de buitenmaat nodig.",
        ],
      },
      {
        kop: "Liever niet zelf meten",
        alineas: [
          "Dat hoeft ook niet. Meten is wel de stap waar een fout geld kost: alles wordt op maat gemaakt, dus een verkeerd gemeten hor kunnen wij niet terugnemen.",
          "Met onze inmeetservice komen wij bij u langs en meten wij op. De maatvoering is dan onze verantwoordelijkheid. Bij meerdere ramen of bij een schuifpui verdient dat zich bijna altijd terug.",
        ],
      },
    ],
    vragen: [
      {
        question: "Moet ik speling aftrekken van mijn maat?",
        answer:
          "Nee. Geef de werkelijk gemeten maat door. Wij verwerken de benodigde speling in de productie. Trekt u er zelf ook nog iets af, dan wordt de hor te klein.",
      },
      {
        question: "Hoe meet ik een dakraam op?",
        answer:
          "Bij Velux en Fakro staat het typenummer op een plaatje aan de bovenzijde van het raam. U ziet het als u het raam openklapt. Dat nummer is nauwkeuriger dan zelf meten, dus geef dat door als u het kunt vinden.",
      },
      {
        question: "Wat als ik toch verkeerd meet?",
        answer:
          "Omdat het maatwerk is kunnen wij de hor niet terugnemen. Twijfelt u over uw maten, stuur ze dan vooraf naar ons toe met een foto van het kozijn. Wij kijken er gratis naar.",
      },
    ],
    verwant: [
      { label: "Inmeetservice aanvragen", href: "/inmeetservice" },
      { label: "Hordeur plaatsen", href: "/advies/hordeur-plaatsen" },
      { label: "Alle horren bekijken", href: "/producten" },
    ],
  },
];
