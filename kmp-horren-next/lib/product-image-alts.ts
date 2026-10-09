/**
 * Alternative text per product photo.
 *
 * Until 2026-10-09 every gallery image was described as `${productName} ${index}`
 * ("Luxe inzet hor 2"), which tells a screen-reader user and a search engine nothing
 * about what is in the photo. The monthly scorecard scored this check as partial for
 * that reason: alt text present, but generic.
 *
 * The keys are the tail of the Supabase storage path, so a lookup keeps working if the
 * bucket or domain ever changes. Every description below was written after looking at
 * the actual photo on 2026-10-09 — do not add an entry without doing the same.
 */
const ALT_BY_IMAGE_PATH: Record<string, string> = {
  // Luxe inzethor
  "luxe-inzethor/main-642e85e6.jpg":
    "Luxe inzethor met zwart aluminium frame in een openstaand draairaam, daarachter een tuin met hortensia's",
  "luxe-inzethor/gallery-99a8a7f8.jpg":
    "Detail van de hoek van een luxe inzethor, met het zwarte aluminium profiel en het strak gespannen gaas",
  "luxe-inzethor/gallery-4becd933.jpg":
    "Luxe inzethor van buitenaf gezien in een openstaand raam in een donkere bakstenen gevel",

  // Inzet plissé hor
  "inzet-plisse-hor/main-52a148fc.jpg":
    "Inzet plissé hor in een wit woonkamerraam, met het antracietkleurige doek half neergelaten",
  "inzet-plisse-hor/gallery-product-1b82881f.jpg":
    "Inzet plissé hor los gefotografeerd op een witte achtergrond, met het antracietkleurige doek half dicht",
  "inzet-plisse-hor/gallery-closed-08c55477.jpg":
    "Inzet plissé hor volledig dichtgetrokken voor een slaapkamerraam",

  // Voorzet plissé hor
  "voorzet-plisse-hor/1784858073694.jpeg":
    "Voorzet plissé hor op het kozijn van een slaapkamerraam, met het doek grotendeels neergelaten",
  "voorzet-plisse-hor/studio-final-v8.jpg":
    "Wit frame van een voorzet plissé hor, los gefotografeerd met het doek half dichtgeschoven",
  // Dit bestand is byte voor byte identiek aan 1784858073694.jpeg hierboven
  // (zelfde SHA-1, gecontroleerd 2026-10-09): dezelfde foto staat twee keer in de
  // galerij van deze productpagina. Twee verschillende beschrijvingen verzinnen voor
  // een en dezelfde foto zou onjuist zijn, dus de tekst is gelijk. De echte oplossing
  // is de dubbele foto uit de galerij halen, en dat is een vraag aan de eigenaar.
  "voorzet-plisse-hor/sfeer-slaapkamer-front-v4.jpg":
    "Voorzet plissé hor op het kozijn van een slaapkamerraam, met het doek grotendeels neergelaten",

  // Plissé hor dakraam
  "plisse-hor-dakraam/main-zolder-ca62057d.jpg":
    "Plissé hor voor een dakraam op zolder, met het doek half over het raam getrokken",
  "plisse-hor-dakraam/gallery-product-1874b906.jpg":
    "Plissé hor voor een dakraam, los gefotografeerd met een wit frame en antracietkleurig doek",
  "plisse-hor-dakraam/gallery-badkamer-33f07869.jpg":
    "Plissé hor voor een dakraam in een badkamer onder een schuin dak",

  // Plissé hordeur enkel
  "plisse-hordeur-enkel/main-achterdeur-f27d3904-v2-nohandle.jpg":
    "Enkele plissé hordeur in de deuropening van een bakstenen woning, met de achterdeur open en zicht op de keuken",
  "plisse-hordeur-enkel/gallery-product-331e2d9b.jpg":
    "Enkele plissé hordeur los gefotografeerd op een witte achtergrond, met het doek half dichtgeschoven",
  "plisse-hordeur-enkel/gallery-schuifpui-07188503.jpg":
    "Enkele plissé hordeur voor een schuifpui, met zicht op het terras en de tuin",
  "plisse-hordeur-enkel/gallery-detail-5ed51b78.jpg":
    "Detail van het plissédoek en het antracietkleurige profiel van een plissé hordeur",

  // Plissé hordeur dubbel
  "plisse-hordeur-dubbel/main-interieur-7dddba72.jpg":
    "Dubbele plissé hordeur voor openslaande tuindeuren, vanuit de woonkamer gezien met zicht op de tuin",
  "plisse-hordeur-dubbel/gallery-product-96447fdd.jpg":
    "Dubbele plissé hordeur los gefotografeerd op een witte achtergrond, met twee doeken in een antracietkleurig frame",
  "plisse-hordeur-dubbel/gallery-buiten-40317555.jpg":
    "Dubbele plissé hordeur voor openstaande houten tuindeuren, van buitenaf gezien in de avond",
  "plisse-hordeur-dubbel/gallery-detail-f783b86b.jpg":
    "Detail van de middensluiting van een dubbele plissé hordeur, waar beide doeken samenkomen",

  // Duo plissé hor verduisterend
  "duo-plisse-hor-verduisterend/main-6b85371b-v3-nohandle.jpg":
    "Duo plissé hor los gefotografeerd, met een verduisterend doek boven en insectengaas onder in hetzelfde witte frame",
  "duo-plisse-hor-verduisterend/gallery-4e36bea4.jpg":
    "Duo plissé hor in het dakraam van een werkkamer op zolder met houten balken, waarbij het verduisterende deel half is neergelaten",
  "duo-plisse-hor-verduisterend/gallery-3ee8b1c9.jpg":
    "Duo plissé hor in het dakraam van een slaapkamer, waarbij het verduisterende deel het bovenste deel van het raam afdekt",
  "duo-plisse-hor-verduisterend/gallery-normaal-raam-slaapkamer.jpg":
    "Duo plissé hor in een slaapkamerraam in de gevel, met het verduisterende deel boven en het horgaas daaronder",
};

/**
 * Returns the described alt text for a product photo, or a sensible fallback when the
 * photo is not in the list above (a newly uploaded image, for instance). The fallback
 * is deliberately still useful rather than empty: a product photo is content, never
 * decoration.
 */
export function getProductImageAlt(
  src: string,
  productName: string,
  index = 0
): string {
  const match = Object.keys(ALT_BY_IMAGE_PATH).find((path) => src.includes(path));
  if (match) return ALT_BY_IMAGE_PATH[match];
  return index === 0 ? `${productName} op maat` : `${productName}, foto ${index + 1}`;
}
