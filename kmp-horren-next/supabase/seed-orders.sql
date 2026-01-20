-- ============================================
-- KMP HORREN - DEMO ORDERS SEED
-- ============================================
-- Run this SQL in your Supabase SQL Editor to add demo orders:
-- https://supabase.com/dashboard/project/mtgxtqwloccobslbzunc/sql/new
-- ============================================

-- First, delete existing demo orders by order_number (if any)
DELETE FROM order_items WHERE order_id IN (
  SELECT id FROM orders WHERE order_number IN (
    'KMP240116001', 'KMP240115002', 'KMP240114003', 
    'KMP240113004', 'KMP240112005', 'KMP240111006'
  )
);
DELETE FROM orders WHERE order_number IN (
  'KMP240116001', 'KMP240115002', 'KMP240114003', 
  'KMP240113004', 'KMP240112005', 'KMP240111006'
);

-- ============================================
-- DEMO ORDERS
-- ============================================
INSERT INTO orders (
  order_number, customer_email, customer_first_name, customer_last_name, customer_phone,
  shipping_street, shipping_house_number, shipping_house_number_addition, shipping_postal_code, shipping_city,
  subtotal, discount_amount, discount_code, shipping_cost, voorrijkosten, total_price,
  status, payment_method, paid_at, customer_notes, admin_notes, created_at, updated_at
) VALUES
  (
    'KMP240116001', 'jan.jansen@example.nl', 'Jan', 'Jansen', '06 12345678',
    'Hoofdstraat', '123', 'A', '1234 AB', 'Amsterdam',
    425.00, 0, NULL, 0, 0, 425.00,
    'processing', 'ideal', '2024-01-16T10:30:00Z', NULL, NULL,
    '2024-01-16T10:15:00Z', '2024-01-16T10:30:00Z'
  ),
  (
    'KMP240115002', 'maria.devries@example.nl', 'Maria', 'de Vries', '06 98765432',
    'Kerkweg', '45', NULL, '5678 CD', 'Rotterdam',
    890.00, 71.20, NULL, 0, 85.00, 903.80,
    'shipped', 'ideal', '2024-01-15T14:00:00Z', NULL, NULL,
    '2024-01-15T13:45:00Z', '2024-01-16T09:00:00Z'
  ),
  (
    'KMP240114003', 'pieter.bakker@example.nl', 'Pieter', 'Bakker', '06 11223344',
    'Dorpsplein', '7', NULL, '9012 EF', 'Utrecht',
    156.00, 0, NULL, 12.50, 0, 168.50,
    'delivered', 'creditcard', '2024-01-14T16:20:00Z', NULL, NULL,
    '2024-01-14T16:00:00Z', '2024-01-15T14:00:00Z'
  ),
  (
    'KMP240113004', 'anna.smit@example.nl', 'Anna', 'Smit', '06 55667788',
    'Laan van Meerdervoort', '256', 'B', '2563 GH', 'Den Haag',
    1250.00, 150.00, 'WELKOM10', 0, 0, 1100.00,
    'paid', 'ideal', '2024-01-13T11:00:00Z', NULL, NULL,
    '2024-01-13T10:30:00Z', '2024-01-13T11:00:00Z'
  ),
  (
    'KMP240112005', 'kees.vanderberg@example.nl', 'Kees', 'van der Berg', '06 99887766',
    'Stationsweg', '12', NULL, '3456 IJ', 'Eindhoven',
    89.00, 0, NULL, 12.50, 0, 101.50,
    'pending', 'ideal', NULL, NULL, NULL,
    '2024-01-12T09:00:00Z', '2024-01-12T09:00:00Z'
  ),
  (
    'KMP240111006', 'lisa.dejong@example.nl', 'Lisa', 'de Jong', '06 44332211',
    'Marktstraat', '88', NULL, '7890 KL', 'Groningen',
    567.00, 28.35, NULL, 0, 0, 538.65,
    'cancelled', 'ideal', NULL, 'Graag voor 15 januari leveren', 'Klant heeft geannuleerd wegens verhuizing',
    '2024-01-11T15:30:00Z', '2024-01-12T10:00:00Z'
  );

-- ============================================
-- DEMO ORDER ITEMS
-- ============================================
-- Order 1 items (KMP240116001)
INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'luxe-inzethor', 'Luxe Inzethor', 800, 1200, 0.96,
  'ral7016', 'Antracietgrijs (RAL 7016)', 'grijs', 'Standaard Gaas', '19mm', 19,
  '{"bediening": "rechts"}', false, 85.00, 3, 255.00
FROM orders WHERE order_number = 'KMP240116001';

INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'plisse-hordeur-enkel', 'Plissé Hordeur Enkel', 900, 2100, 1.89,
  'ral9010', 'Wit (RAL 9010)', 'grijs', 'Standaard Gaas', '27mm', 27,
  '{"sluiting": "magneet", "richting": "naarBuiten"}', false, 170.00, 1, 170.00
FROM orders WHERE order_number = 'KMP240116001';

-- Order 2 items (KMP240115002)
INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'luxe-inzethor', 'Luxe Inzethor', 1000, 1400, 1.4,
  'ral9010', 'Wit (RAL 9010)', 'zwart', 'Fijnmazig Gaas', '19mm', 19,
  '{"bediening": "links"}', true, 95.00, 8, 760.00
FROM orders WHERE order_number = 'KMP240115002';

INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'luxe-rolhor', 'Luxe Rolhor', 600, 800, 0.48,
  'ral9010', 'Wit (RAL 9010)', 'grijs', 'Standaard Gaas', '19mm', 19,
  '{}', true, 130.00, 1, 130.00
FROM orders WHERE order_number = 'KMP240115002';

-- Order 3 items (KMP240114003)
INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'luxe-klemhor', 'Luxe Klemhor', 700, 900, 0.63,
  'ral9005', 'Verkeerszwart (RAL 9017)', 'grijs', 'Standaard Gaas', '19mm', 19,
  '{}', false, 78.00, 2, 156.00
FROM orders WHERE order_number = 'KMP240114003';

-- Order 4 items (KMP240113004)
INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'plisse-hordeur-dubbel', 'Plissé Hordeur Dubbel', 1800, 2200, 3.96,
  'ral7016', 'Antracietgrijs (RAL 7016)', 'grijs', 'Standaard Gaas', '27mm', 27,
  '{"sluiting": "magneet", "richting": "naarBinnen"}', false, 320.00, 2, 640.00
FROM orders WHERE order_number = 'KMP240113004';

INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'inzet-plisse-hor', 'Inzet Plissé Hor', 1200, 1600, 1.92,
  'ral7016', 'Antracietgrijs (RAL 7016)', 'pollen', 'Pollengaas', '19mm', 19,
  '{"bediening": "midden"}', false, 122.00, 5, 610.00
FROM orders WHERE order_number = 'KMP240113004';

-- Order 5 items (KMP240112005)
INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'luxe-inzethor', 'Luxe Inzethor', 600, 800, 0.48,
  'ral9001', 'Crème Wit (RAL 9001)', 'grijs', 'Standaard Gaas', '19mm', 19,
  '{"bediening": "rechts"}', false, 89.00, 1, 89.00
FROM orders WHERE order_number = 'KMP240112005';

-- Order 6 items (KMP240111006)
INSERT INTO order_items (
  order_id, product_id, product_name, width_mm, height_mm, area_m2,
  color_id, color_name, mesh_type_id, mesh_type_name, profile_depth_id, profile_depth_mm,
  custom_options, montage_service, unit_price, quantity, line_total
)
SELECT 
  id, 'scharnier-hordeur', 'Scharnier Hordeur', 900, 2050, 1.845,
  'ral9010', 'Wit (RAL 9010)', 'huisdier', 'Pet-Screen Gaas', '27mm', 27,
  '{"sluiting": "klik", "richting": "naarBuiten"}', false, 189.00, 3, 567.00
FROM orders WHERE order_number = 'KMP240111006';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Demo orders inserted successfully!';
  RAISE NOTICE '📋 Orders: 6';
  RAISE NOTICE '📦 Order items: 9';
END $$;
