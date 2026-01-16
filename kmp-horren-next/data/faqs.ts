export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQ[] = [
  // Producten
  {
    category: "Producten",
    question: "Wat is het verschil tussen een inzethor en een voorzet-inzethor?",
    answer:
      "Een inzethor klemt zichzelf vast in het kozijn door middel van een veerconstructie, ideaal voor draai-kiep ramen. Een voorzet-inzethor wordt op het kozijn geplaatst als er te weinig inbouwdiepte is voor een normale inzethor.",
  },
  {
    category: "Producten",
    question: "Welk type gaas moet ik kiezen?",
    answer:
      "Standaard gaas is prima voor normale insectenwering. Heeft u hooikoorts? Kies dan voor anti-pollengaas. Heeft u huisdieren? Dan raden wij extra sterk petscreen gaas aan.",
  },
  {
    category: "Producten",
    question: "Zijn de horren geschikt voor kunststof kozijnen?",
    answer:
      "Ja, onze inzethorren zijn speciaal ontwikkeld voor kunststof, aluminium en houten draai-kiep kozijnen en worden geplaatst zonder boren of schroeven.",
  },
  {
    category: "Producten",
    question: "Welke hor is geschikt voor een draai-kiepraam?",
    answer:
      "Voor draai-kiepramen raden wij de Luxe Inzethor of de Inzet Plissé Hor aan. Beide typen klemmen zichzelf vast in het kozijn en zijn eenvoudig uitneembaar wanneer u het raam wilt schoonmaken.",
  },
  {
    category: "Producten",
    question: "Kan ik een hor bestellen voor een dakraam?",
    answer:
      "Ja, wij hebben speciaal de Plissé Hor Dakraam ontwikkeld. Deze is compatibel met de meeste dakraammerken zoals Velux, Fakro en Roto.",
  },

  // Meten & Monteren
  {
    category: "Meten & Monteren",
    question: "Hoe moet ik mijn raam opmeten?",
    answer:
      "Voor een inzethor meet u de dagmaat: de strakke opening van het kozijn in de breedte en hoogte. Meet op minimaal 3 punten en neem de kleinste maat. Bekijk onze uitgebreide meetinstructies of gebruik onze AI-hulp op de homepagina.",
  },
  {
    category: "Meten & Monteren",
    question: "Doen jullie ook inmeten?",
    answer:
      "Ja, wij bieden een professionele inmeetservice aan voor €85,-. Onze adviseur komt dan bij u thuis om alles exact op te meten en u te adviseren over de beste oplossing.",
  },
  {
    category: "Meten & Monteren",
    question: "Kan ik de hor zelf monteren?",
    answer:
      "Ja, al onze horren worden geleverd met een duidelijke montagehandleiding. De meeste horren zijn binnen 5-10 minuten geplaatst zonder gereedschap. Optioneel kunt u onze montageservice bijboeken.",
  },
  {
    category: "Meten & Monteren",
    question: "Welke profieldiepte heb ik nodig?",
    answer:
      "De profieldiepte hangt af van eventuele obstakels in uw kozijn zoals ventilatieroosters of lekdorpels. Standaard is 27mm, bij een ventilatierooster kiest u 34mm, bij een grote lekdorpel 43mm.",
  },

  // Bestellen & Levering
  {
    category: "Bestellen & Levering",
    question: "Wat is de levertijd?",
    answer:
      "Omdat wij alles op maat maken in onze eigen fabriek, is de levertijd gemiddeld 10 tot 15 werkdagen na ontvangst van uw betaling.",
  },
  {
    category: "Bestellen & Levering",
    question: "Kan ik mijn bestelling retourneren?",
    answer:
      "Omdat het maatwerk betreft, is retourneren helaas niet mogelijk, tenzij er sprake is van een productiefout. Wij raden daarom aan de maten goed te controleren voordat u bestelt.",
  },
  {
    category: "Bestellen & Levering",
    question: "Hoe wordt mijn bestelling verzonden?",
    answer:
      "Uw bestelling wordt zorgvuldig verpakt en verzonden via een pakketdienst. Bij bestellingen vanaf €250,- is de verzending gratis. U ontvangt een track & trace code zodra uw pakket onderweg is.",
  },
  {
    category: "Bestellen & Levering",
    question: "Kan ik mijn bestelling ophalen?",
    answer:
      "Ja, u kunt uw bestelling gratis ophalen op ons adres in Amsterdam. Selecteer deze optie tijdens het afrekenen en wij nemen contact op zodra uw bestelling klaar ligt.",
  },

  // Garantie & Service
  {
    category: "Garantie & Service",
    question: "Hoeveel garantie krijg ik?",
    answer:
      "Wij geven 3 jaar garantie op constructie en onderdelen. De garantie dekt fabricagefouten, maar geen slijtage door normaal gebruik of schade door onjuiste montage.",
  },
  {
    category: "Garantie & Service",
    question: "Wat als mijn hor beschadigd aankomt?",
    answer:
      "Mocht uw bestelling beschadigd aankomen, neem dan binnen 48 uur contact met ons op met foto's van de schade. Wij zorgen dan voor een passende oplossing.",
  },
  {
    category: "Garantie & Service",
    question: "Kan ik onderdelen nabestellen?",
    answer:
      "Ja, alle onderdelen zoals gaas, klemmen en profielen zijn apart te bestellen. Neem contact op met onze klantenservice voor de mogelijkheden.",
  },

  // Betaling
  {
    category: "Betaling",
    question: "Welke betaalmethodes accepteren jullie?",
    answer:
      "Wij accepteren iDEAL, creditcard (Visa, Mastercard), Bancontact en PayPal. Alle betalingen worden veilig verwerkt via Mollie.",
  },
  {
    category: "Betaling",
    question: "Zijn de prijzen inclusief BTW?",
    answer:
      "Ja, alle prijzen op onze website zijn inclusief 21% BTW.",
  },
  {
    category: "Betaling",
    question: "Krijg ik korting bij meerdere horren?",
    answer:
      "Ja, wij hanteren staffelkorting: 5% bij 3+ stuks, 8% bij 5+ stuks, 10% bij 8+ stuks en 12% bij 12+ stuks. De korting wordt automatisch berekend in uw winkelwagen.",
  },
];

export const getFAQsByCategory = () => {
  const categories = Array.from(new Set(FAQS.map((f) => f.category)));
  return categories.map((category) => ({
    category,
    faqs: FAQS.filter((f) => f.category === category),
  }));
};
