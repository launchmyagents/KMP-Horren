-- ============================================
-- KMP HORREN - SEED DATA
-- ============================================
-- Run this AFTER schema.sql to populate initial data
-- ============================================

-- ============================================
-- COLORS (17 opties)
-- ============================================
INSERT INTO colors (id, name, ral, hex, surcharge, sort_order) VALUES
  ('ral9016', 'Verkeerswit', 'RAL 9016', '#F7F5F0', 0, 1),
  ('ral9001', 'Crèmewit', 'RAL 9001', '#FDF4E3', 0, 2),
  ('ral9010', 'Zuiver wit', 'RAL 9010', '#FFFFFF', 0, 3),
  ('ral7016', 'Antracietgrijs', 'RAL 7016', '#383E42', 0, 4),
  ('ral9005', 'Gitzwart', 'RAL 9005', '#0E0E10', 0, 5),
  ('ral8014', 'Sepiabruin', 'RAL 8014', '#4A3526', 15, 6),
  ('ral8017', 'Chocoladebruin', 'RAL 8017', '#45322E', 15, 7),
  ('ral6009', 'Dennengroen', 'RAL 6009', '#27352A', 15, 8),
  ('ral5011', 'Staalblauw', 'RAL 5011', '#1A2B3C', 15, 9),
  ('ral3005', 'Wijnrood', 'RAL 3005', '#5E2028', 15, 10),
  ('ral1015', 'Licht ivoor', 'RAL 1015', '#E6D2B5', 10, 11),
  ('ral7035', 'Lichtgrijs', 'RAL 7035', '#C5C7C4', 10, 12),
  ('ral7001', 'Zilvergrijs', 'RAL 7001', '#8C9196', 10, 13),
  ('ral6005', 'Mosgroen', 'RAL 6005', '#0F4336', 15, 14),
  ('ral7021', 'Zwartgrijs', 'RAL 7021', '#2F3234', 10, 15),
  ('ral9007', 'Grijs aluminium', 'RAL 9007', '#8F8F8C', 20, 16),
  ('custom', 'Kleur op aanvraag', 'Op maat', '#CCCCCC', 45, 17)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  ral = EXCLUDED.ral,
  hex = EXCLUDED.hex,
  surcharge = EXCLUDED.surcharge,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- MESH TYPES
-- ============================================
INSERT INTO mesh_types (id, name, description, surcharge, sort_order) VALUES
  ('grijs', 'Standaard Grijs', 'Klassiek grijs gaas, goede doorschijnendheid', 0, 1),
  ('zwart', 'Zwart Gaas', 'Beste doorzicht, nauwelijks zichtbaar', 5, 2),
  ('bellavista', 'Bellavista', 'Premium gaas met optimaal doorzicht en ventilatie', 15, 3),
  ('pollen', 'Pollengaas', 'Filtert pollen en fijnstof, ideaal bij hooikoorts', 35, 4),
  ('huisdier', 'Huisdierengaas', 'Extra sterk petscreen, kras- en scheurbestendig', 25, 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  surcharge = EXCLUDED.surcharge,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- PROFILE DEPTHS
-- ============================================
INSERT INTO profile_depths (id, depth_mm, clearance_mm, description, suitable_for, surcharge, sort_order) VALUES
  ('19mm', 19, 16, 'Standaard profiel', 'Kozijnen zonder obstakels', 0, 1),
  ('27mm', 27, 24, 'Middel profiel', 'Kozijnen met klein ventilatierooster', 10, 2),
  ('34mm', 34, 31, 'Diep profiel', 'Kozijnen met ventilatierooster of lekdorpel', 18, 3),
  ('43mm', 43, 40, 'Extra diep profiel', 'Kozijnen met grote obstakels', 25, 4)
ON CONFLICT (id) DO UPDATE SET
  depth_mm = EXCLUDED.depth_mm,
  clearance_mm = EXCLUDED.clearance_mm,
  description = EXCLUDED.description,
  suitable_for = EXCLUDED.suitable_for,
  surcharge = EXCLUDED.surcharge,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- FRAME TYPES
-- ============================================
INSERT INTO frame_types (id, name, description, surcharge, sort_order) VALUES
  ('kunststof', 'Kunststof', 'PVC / Kunststof kozijnen', 0, 1),
  ('hout', 'Hout', 'Houten kozijnen', 0, 2),
  ('aluminium', 'Aluminium', 'Aluminium kozijnen', 5, 3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  surcharge = EXCLUDED.surcharge,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- PRODUCTS - RAAMHORREN (8 producten)
-- ============================================
INSERT INTO products (id, name, slug, type, description, features, base_price_per_m2, min_price, min_width_mm, max_width_mm, min_height_mm, max_height_mm, image_url, options, sort_order) VALUES
  (
    'luxe-inzethor',
    'Luxe Inzethor',
    'luxe-inzethor',
    'WINDOW',
    'De ideale oplossing voor draai-kiep ramen. Klemt zichzelf vast zonder boren of schroeven.',
    '["Geschikt voor draai-kiep ramen", "Geen boren of schroeven nodig", "Eenvoudig uitneembaar", "Strak aluminium profiel"]',
    65.00,
    59.00,
    300, 1500, 300, 2000,
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    '["profileDepth", "frameType"]',
    1
  ),
  (
    'inzet-plisse-hor',
    'Inzet Plissé Hor',
    'inzet-plisse-hor',
    'WINDOW',
    'Luxe hor met geplisseerd gaas. Decoratief en functioneel, ideaal voor grote ramen.',
    '["Geplisseerd gaas", "Geruisloze bediening", "Modern design", "Ruimtebesparend"]',
    85.00,
    75.00,
    300, 1800, 300, 2400,
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    '["profileDepth", "frameType", "foldDirection"]',
    2
  ),
  (
    'luxe-rolhor',
    'Luxe Rolhor',
    'luxe-rolhor',
    'WINDOW',
    'Klassieke rolhor met soft-close systeem. Perfect voor naar buiten draaiende ramen.',
    '["Soft-close systeem", "Windvast", "Geschikt voor buitendraaiende ramen", "Compact oprolbaar"]',
    95.00,
    90.00,
    300, 1600, 300, 2500,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    '["mountDirection", "pullBarPosition"]',
    3
  ),
  (
    'luxe-klemhor',
    'Luxe Klemhor',
    'luxe-klemhor',
    'WINDOW',
    'Eenvoudig te plaatsen klemhor. Ideaal voor huurwoningen zonder permanente montage.',
    '["Geen gereedschap nodig", "Verstelbare klemmen", "Geschikt voor huurwoningen", "Snel te verwijderen"]',
    70.00,
    65.00,
    300, 1200, 300, 1800,
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    '["frameType"]',
    4
  ),
  (
    'luxe-veerstifthor',
    'Luxe Veerstifthor',
    'luxe-veerstifthor',
    'WINDOW',
    'Veerstifthor met onzichtbare bevestiging. Strak resultaat voor elk kozijn.',
    '["Onzichtbare veerstiften", "Strakke afwerking", "Eenvoudige montage", "Geschikt voor alle kozijntypes"]',
    68.00,
    62.00,
    300, 1400, 300, 1800,
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
    '["profileDepth", "frameType"]',
    5
  ),
  (
    'voorzethor',
    'Voorzethor',
    'voorzethor',
    'WINDOW',
    'Wordt op het kozijn geplaatst. Ideaal bij onvoldoende inbouwdiepte.',
    '["Montage op kozijn", "Geschikt bij weinig inbouwruimte", "Duurzaam aluminium", "Diverse kleuren"]',
    60.00,
    55.00,
    300, 1500, 300, 2000,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    '["frameType"]',
    6
  ),
  (
    'vaste-raamhor',
    'Vaste Raamhor',
    'vaste-raamhor',
    'WINDOW',
    'Permanente hor voor vaste ramen. Robuust en onderhoudsarm.',
    '["Voor vaste (niet-draaiende) ramen", "Permanente oplossing", "Extra stevig frame", "Minimaal onderhoud"]',
    55.00,
    50.00,
    300, 2000, 300, 2500,
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    '["frameType"]',
    7
  ),
  (
    'plisse-hor-dakraam',
    'Plissé Hor Dakraam',
    'plisse-hor-dakraam',
    'WINDOW',
    'Speciaal ontworpen voor dakramen. Compatibel met Velux en Fakro.',
    '["Geschikt voor dakramen", "Velux/Fakro compatibel", "Plissé systeem", "UV-bestendig gaas"]',
    110.00,
    95.00,
    400, 1200, 500, 1800,
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    '["roofWindowBrand", "roofWindowSize"]',
    8
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  features = EXCLUDED.features,
  base_price_per_m2 = EXCLUDED.base_price_per_m2,
  min_price = EXCLUDED.min_price,
  min_width_mm = EXCLUDED.min_width_mm,
  max_width_mm = EXCLUDED.max_width_mm,
  min_height_mm = EXCLUDED.min_height_mm,
  max_height_mm = EXCLUDED.max_height_mm,
  image_url = EXCLUDED.image_url,
  options = EXCLUDED.options,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- PRODUCTS - DEURHORREN (7 producten)
-- ============================================
INSERT INTO products (id, name, slug, type, description, features, base_price_per_m2, min_price, min_width_mm, max_width_mm, min_height_mm, max_height_mm, image_url, options, sort_order) VALUES
  (
    'plisse-hordeur-enkel',
    'Plissé Hordeur (Enkel)',
    'plisse-hordeur-enkel',
    'DOOR',
    'De meest verkochte hordeur van Nederland. Gebruiksvriendelijk en duurzaam.',
    '["Kindvriendelijk", "Lage ondergeleider", "Blijft op elke stand staan", "Geruisloos"]',
    120.00,
    215.00,
    600, 1200, 1800, 2600,
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    '["hingeSide", "handleType"]',
    9
  ),
  (
    'plisse-hordeur-dubbel',
    'Dubbele Plissé Hordeur',
    'plisse-hordeur-dubbel',
    'DOOR',
    'Dubbele uitvoering voor brede doorgangen. Twee plissédelen die in het midden sluiten.',
    '["Voor brede doorgangen", "Twee plissédelen", "Magnetische sluiting", "Symmetrisch design"]',
    140.00,
    350.00,
    1200, 2400, 1800, 2600,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    '["handleType"]',
    10
  ),
  (
    'scharnier-hordeur',
    'Scharnier Hordeur',
    'scharnier-hordeur',
    'DOOR',
    'Klassieke hordeur met scharnieren. Robuust en tijdloos design.',
    '["Traditioneel design", "Zelfsluitend", "Optionele deurdranger", "Slot mogelijk"]',
    150.00,
    250.00,
    600, 1100, 1800, 2400,
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
    '["hingeSide", "doorCloser", "lockType"]',
    11
  ),
  (
    'royal-22-enkel',
    'Royal 22 Hordeur',
    'royal-22-enkel',
    'DOOR',
    'Premium hordeur met 22mm profiel. Slank design met maximale sterkte.',
    '["Slank 22mm profiel", "Premium uitstraling", "Versterkte hoeken", "Diverse kleuren"]',
    135.00,
    240.00,
    600, 1200, 1800, 2500,
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
    '["hingeSide", "handleType", "doorCloser"]',
    12
  ),
  (
    'royal-32-enkel',
    'Royal 32 Hordeur',
    'royal-32-enkel',
    'DOOR',
    'Extra stevig 32mm profiel. Ideaal voor intensief gebruik.',
    '["Extra stevig 32mm profiel", "Intensief gebruik", "Versterkte constructie", "Lange levensduur"]',
    145.00,
    260.00,
    600, 1200, 1800, 2600,
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
    '["hingeSide", "handleType", "doorCloser", "lockType"]',
    13
  ),
  (
    'royal-32-dubbel',
    'Royal 32 Dubbele Deur',
    'royal-32-dubbel',
    'DOOR',
    'Dubbele openslaande hordeur. Perfect voor tuindeuren en terrassen.',
    '["Dubbele openslaande deuren", "Stevig 32mm profiel", "Geschikt voor tuindeuren", "Espagnolet sluiting"]',
    160.00,
    420.00,
    1200, 2400, 1800, 2600,
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    '["handleType", "doorCloser", "lockType"]',
    14
  ),
  (
    'schuifpui-hor',
    'Schuifpui Hor',
    'schuifpui-hor',
    'DOOR',
    'Speciaal voor schuifpuien. Glijdt soepel mee met uw deur.',
    '["Voor schuifpuien", "Soepele geleiding", "Grote maatvoeringen", "Onderrail of bovenrail"]',
    130.00,
    280.00,
    800, 3000, 1800, 2800,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    '["railPosition", "numberOfPanels"]',
    15
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  features = EXCLUDED.features,
  base_price_per_m2 = EXCLUDED.base_price_per_m2,
  min_price = EXCLUDED.min_price,
  min_width_mm = EXCLUDED.min_width_mm,
  max_width_mm = EXCLUDED.max_width_mm,
  min_height_mm = EXCLUDED.min_height_mm,
  max_height_mm = EXCLUDED.max_height_mm,
  image_url = EXCLUDED.image_url,
  options = EXCLUDED.options,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- SAMPLE DISCOUNT CODES
-- ============================================
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_value, is_active) VALUES
  ('WELKOM10', 'Welkomstkorting voor nieuwe klanten', 'percentage', 10, 100, true),
  ('ZOMER2026', 'Zomerkorting 2026', 'percentage', 15, 200, true),
  ('GRATIS25', '€25 korting', 'fixed', 25, 150, true)
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Seed data inserted successfully!';
  RAISE NOTICE '📦 Products: 15 (8 window screens, 7 door screens)';
  RAISE NOTICE '🎨 Colors: 17';
  RAISE NOTICE '🕸️ Mesh types: 5';
  RAISE NOTICE '📏 Profile depths: 4';
  RAISE NOTICE '🪟 Frame types: 3';
  RAISE NOTICE '🏷️ Discount codes: 3';
END $$;
