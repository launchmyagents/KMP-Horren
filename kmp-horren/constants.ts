import { Product, ProductType, ColorOption, MeshOption, ProfileOption } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Luxe Inzethor',
    slug: 'inzethor',
    type: ProductType.WINDOW,
    basePricePerM2: 65.00,
    minPrice: 59.00,
    description: 'De ideale oplossing voor draai-kiep ramen. Zonder boren of schroeven te plaatsen.',
    image: 'https://picsum.photos/800/600?random=1',
    features: ['Geschikt voor draai-kiep', 'Geen boren nodig', 'Strak design', 'Uitneembaar']
  },
  {
    id: 'p2',
    name: 'Inzet Plissé Hor',
    slug: 'inzet-plisse',
    type: ProductType.WINDOW,
    basePricePerM2: 85.00,
    minPrice: 75.00,
    description: 'Luxe hor met geplisseerd gaas. Decoratief en functioneel.',
    image: 'https://picsum.photos/800/600?random=2',
    features: ['Decoratief gaas', 'Geruisloze bediening', 'Modern uiterlijk']
  },
  {
    id: 'p3',
    name: 'Luxe Rolhor',
    slug: 'rolhor',
    type: ProductType.WINDOW,
    basePricePerM2: 95.00,
    minPrice: 90.00,
    description: 'Klassieke rolhor met soft-close systeem. Geschikt voor naar buiten draaiende ramen.',
    image: 'https://picsum.photos/800/600?random=3',
    features: ['Soft-close systeem', 'Windvast', 'Geschikt voor buitendraaiend']
  },
  {
    id: 'p4',
    name: 'Plissé Hordeur',
    slug: 'plisse-hordeur',
    type: ProductType.DOOR,
    basePricePerM2: 120.00,
    minPrice: 215.00,
    description: 'De meest verkochte hordeur van Nederland. Gebruiksvriendelijk en duurzaam.',
    image: 'https://picsum.photos/800/600?random=4',
    features: ['Kindvriendelijk', 'Lage ondergeleider', 'Blijft op elke stand staan']
  }
];

export const COLORS: ColorOption[] = [
  { id: '9016', name: 'Verkeerswit', ral: 'RAL 9016', hex: '#F7F9EF', surcharge: 0 },
  { id: '9010', name: 'Zuiverwit', ral: 'RAL 9010', hex: '#FFFFFF', surcharge: 0 },
  { id: '9001', name: 'Cremewit', ral: 'RAL 9001', hex: '#F0EBE0', surcharge: 8 },
  { id: '7016', name: 'Antraciet', ral: 'RAL 7016', hex: '#383E42', surcharge: 12 },
  { id: '9005', name: 'Zwart', ral: 'RAL 9005', hex: '#0A0A0A', surcharge: 10 },
  { id: '6009', name: 'Dennengroen', ral: 'RAL 6009', hex: '#26392F', surcharge: 15 },
  { id: '5011', name: 'Staalblauw', ral: 'RAL 5011', hex: '#1E2C44', surcharge: 15 },
];

export const MESH_TYPES: MeshOption[] = [
  { id: 'std-grey', name: 'Standaard Grijs', description: 'Goed zicht, neutraal', surcharge: 0 },
  { id: 'std-black', name: 'Standaard Zwart', description: 'Minder opvallend', surcharge: 0 },
  { id: 'bellavista', name: 'Bella Vista', description: 'Ultra helder doorzicht', surcharge: 25 },
  { id: 'pollen', name: 'Anti-pollen', description: 'Tegen hooikoorts', surcharge: 15 },
  { id: 'pets', name: 'Huisdiergaas', description: 'Extra sterk tegen krassen', surcharge: 20 },
];

export const PROFILES: ProfileOption[] = [
  { id: '19mm', depthMm: 19, description: 'Ondiep (rolluiken)', surcharge: 0 },
  { id: '27mm', depthMm: 27, description: 'Standaard', surcharge: 0 },
  { id: '34mm', depthMm: 34, description: 'Met ventilatierooster', surcharge: 5 },
  { id: '43mm', depthMm: 43, description: 'Grote lekdorpel', surcharge: 10 },
];

export const COSTS = {
  montageService: 15.00,
  minAreaM2: 0.25,
};
