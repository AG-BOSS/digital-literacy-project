-- ==============================================================================
-- SHRI SHYAM CELEBRATIONS – BALLOONHOUSE CATALOG IMPORT SCRIPT
-- Safe, purely additive, idempotent migration script.
--
-- Duplicate Detection Policy:
-- Composite Identity: normalized(name) + category_id + subcategory_id
-- Uses explicit WHERE NOT EXISTS checks.
-- Zero destructive operations. Zero modifications to existing products.
-- ==============================================================================

-- 1. ENSURE NEW SUBCATEGORIES EXIST
INSERT INTO public.subcategories (category_id, name, slug)
SELECT id, 'Stands & Props', 'stands-props'
FROM public.categories WHERE name = 'Birthday & Party Items'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.subcategories (category_id, name, slug)
SELECT id, 'Party Lighting & Effects', 'party-lighting-effects'
FROM public.categories WHERE name = 'Birthday & Party Items'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.subcategories (category_id, name, slug)
SELECT id, 'Birthday Themes', 'birthday-themes'
FROM public.categories WHERE name = 'Birthday & Party Items'
ON CONFLICT (slug) DO NOTHING;

-- 2. ADDITIVE PRODUCT INSERTIONS WITH COMPOSITE EXISTENCE CHECKS

-- Product 1: Celebration Event Prop Stand (Heart stand)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Celebration Event Prop Stand (Heart stand)',
    c.id,
    s.id,
    'Decorative celebration display prop for organizing stages, table settings, and photo corners.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/celebration-event-prop-stand-heart-stand.png',
    FALSE,
    TRUE,
    '["Stable Construction","Photogenic Display","Versatile Setup"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Stands & Props'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Celebration Event Prop Stand (Heart stand)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 2: Celebration Event Prop Stand (n stand)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Celebration Event Prop Stand (n stand)',
    c.id,
    s.id,
    'Decorative celebration display prop for organizing stages, table settings, and photo corners.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/celebration-event-prop-stand-n-stand.jpg',
    FALSE,
    TRUE,
    '["Stable Construction","Photogenic Display","Versatile Setup"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Stands & Props'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Celebration Event Prop Stand (n stand)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 3: Celebration Event Prop Stand (A Stand)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Celebration Event Prop Stand (A Stand)',
    c.id,
    s.id,
    'Decorative celebration display prop for organizing stages, table settings, and photo corners.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/celebration-event-prop-stand-a-stand.jpg',
    FALSE,
    TRUE,
    '["Stable Construction","Photogenic Display","Versatile Setup"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Stands & Props'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Celebration Event Prop Stand (A Stand)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 4: Arch Gate Celebration Entrance Welcome Frame
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Arch Gate Celebration Entrance Welcome Frame',
    c.id,
    s.id,
    'Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.',
    NULL,
    TRUE,
    '1 Frame Set',
    'Available on Order',
    FALSE,
    '/assets/products/arch-gate-celebration-entrance-welcome-f.png',
    FALSE,
    TRUE,
    '["Disassembles for Easy Transport","Heavy-Duty Anti-Tip Footplates","Ideal for Indoors & Outdoors"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Stands & Props'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Arch Gate Celebration Entrance Welcome Frame'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 5: Cylinder Drum Plinth Display Cake Stands Set
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Cylinder Drum Plinth Display Cake Stands Set',
    c.id,
    s.id,
    'Sturdy elegant display pedestal for spotlighting celebratory cakes, cupcakes, and dessert buffets.',
    NULL,
    TRUE,
    'Set of 3 Pillars',
    'Available on Order',
    FALSE,
    '/assets/products/cylinder-drum-plinth-display-cake-stands.jpg',
    FALSE,
    TRUE,
    '["Heavy-Duty Stable Base","Photogenic Modern Aesthetic","Supports Multi-Tier Cakes"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Cake Accessories'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Cylinder Drum Plinth Display Cake Stands Set'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 6: Foldable Roman Pillar Accordion Paper Cake Stand
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Foldable Roman Pillar Accordion Paper Cake Stand',
    c.id,
    s.id,
    'Sturdy elegant display pedestal for spotlighting celebratory cakes, cupcakes, and dessert buffets.',
    NULL,
    TRUE,
    '1 Pedestal',
    'Available on Order',
    FALSE,
    '/assets/products/foldable-roman-pillar-accordion-paper-ca.jpg',
    FALSE,
    TRUE,
    '["Heavy-Duty Stable Base","Photogenic Modern Aesthetic","Supports Multi-Tier Cakes"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Cake Accessories'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Foldable Roman Pillar Accordion Paper Cake Stand'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 7: Decorative Vintage Floral Cart Bicycle Prop
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Decorative Vintage Floral Cart Bicycle Prop',
    c.id,
    s.id,
    'Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.',
    NULL,
    TRUE,
    '1 Prop Stand',
    'Available on Order',
    FALSE,
    '/assets/products/decorative-vintage-floral-cart-bicycle-p.jpg',
    FALSE,
    TRUE,
    '["Disassembles for Easy Transport","Heavy-Duty Anti-Tip Footplates","Ideal for Indoors & Outdoors"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Stands & Props'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Decorative Vintage Floral Cart Bicycle Prop'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 8: Ornate Wrought Iron Pedestal Cake Stand
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Ornate Wrought Iron Pedestal Cake Stand',
    c.id,
    s.id,
    'Sturdy elegant display pedestal for spotlighting celebratory cakes, cupcakes, and dessert buffets.',
    NULL,
    TRUE,
    '1 Stand',
    'Available on Order',
    FALSE,
    '/assets/products/ornate-wrought-iron-pedestal-cake-stand.jpg',
    FALSE,
    TRUE,
    '["Heavy-Duty Stable Base","Photogenic Modern Aesthetic","Supports Multi-Tier Cakes"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Cake Accessories'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Ornate Wrought Iron Pedestal Cake Stand'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 9: Screen
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Screen',
    c.id,
    s.id,
    'Celebration backdrop element for vibrant event stage and photo booth staging.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/screen.jpg',
    FALSE,
    TRUE,
    '["Vibrant Backdrop Staging","Easy Installation","Festive Photo Background"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Screen'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 10: Sky Blue Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Sky Blue Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Sky Blue. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/sky-blue-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Sky Blue Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 11: Dark Blue Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Dark Blue Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Dark Blue. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/dark-blue-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Dark Blue Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 12: Red Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Red Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Red. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/red-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Red Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 13: Dark Green Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Dark Green Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Dark Green. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/dark-green-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Dark Green Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 14: Light Green Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Light Green Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Light Green. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/light-green-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Light Green Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 15: Orange Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Orange Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Orange. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/orange-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Orange Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 16: Black Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Black Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Black. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/black-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Black Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 17: Pink Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Pink Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Pink. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/pink-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Pink Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 18: Violet Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Violet Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Violet. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/violet-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Violet Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 19: Yellow Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Yellow Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant Yellow. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/yellow-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Yellow Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 20: White Standard Balloon (Pack of 25)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'White Standard Balloon (Pack of 25)',
    c.id,
    s.id,
    'Premium quality biodegradable latex balloons in vibrant White. Ideal for balloon arches, bouquets, and birthday celebration decor.',
    50,
    FALSE,
    'Pack of 25',
    'Available on Order',
    FALSE,
    '/assets/products/white-standard-balloon-pack-of-25.png',
    FALSE,
    TRUE,
    '["100% Biodegradable Latex","Helium & Air Compatible","Rich Uniform Color","Durable & Burst-Resistant"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('White Standard Balloon (Pack of 25)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 21: Silver Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Silver Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Silver. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/silver-metallic-chrome-balloon-pack.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Silver Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 22: Gold Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Gold Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Gold. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/gold-metallic-chrome-balloon-pack.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Gold Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 23: Rose Gold Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Rose Gold Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Rose Gold. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/rose-gold-metallic-chrome-balloon-pack.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Rose Gold Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 24: Black Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Black Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Black. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/black-metallic-chrome-balloon-pack.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Black Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 25: Blue Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Blue Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Blue. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/blue-metallic-chrome-balloon-pack.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Blue Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 26: Violet Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Violet Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Violet. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/violet-metallic-chrome-balloon-pack.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Violet Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 27: Copper Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Copper Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Copper. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/copper-metallic-chrome-balloon-pack.jpg',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Copper Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 28: Pink Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Pink Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Pink. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/pink-metallic-chrome-balloon-pack.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Pink Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 29: Parrot Green Metallic Chrome Balloon Pack
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Parrot Green Metallic Chrome Balloon Pack',
    c.id,
    s.id,
    'Luxurious high-shine metallic chrome balloons in gleaming Parrot Green. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.',
    55,
    FALSE,
    'Pack of 10',
    'Available on Order',
    FALSE,
    '/assets/products/parrot-green-metallic-chrome-balloon-pac.png',
    FALSE,
    TRUE,
    '["Reflective Mirror Shine","Thick Heavy-Gauge Latex","Pack of 10 Pieces","Suitable for Air & Helium"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloons'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Parrot Green Metallic Chrome Balloon Pack'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 30: Individual Letter "Happy Birthday" Pick Candles Set
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Individual Letter "Happy Birthday" Pick Candles Set',
    c.id,
    s.id,
    'Spell out Happy Birthday across the cake with this full set of colorful letter birthday candle picks.',
    100,
    FALSE,
    'Set of 13 Picks',
    'Available on Order',
    FALSE,
    '/assets/products/individual-letter-happy-birthday-pick-ca.jpg',
    FALSE,
    TRUE,
    '["Complete 13-Letter Set","Colorful Festive Picks","Even Clean Flame"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Candles'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Individual Letter "Happy Birthday" Pick Candles Set'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 31: Heart-Shaped Metallic Cake Candle
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Heart-Shaped Metallic Cake Candle',
    c.id,
    s.id,
    'Romantic heart-shaped celebratory cake candle, perfect for anniversaries, Valentine celebrations, and birthdays.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/heart-shaped-metallic-cake-candle.jpg',
    FALSE,
    TRUE,
    '["Clean Burning Wax","Food-Grade Base Pick","Charming Romantic Heart Design"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Candles'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Heart-Shaped Metallic Cake Candle'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 32: Star-Shaped Metallic Cake Candle
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Star-Shaped Metallic Cake Candle',
    c.id,
    s.id,
    'Elegant star-shaped celebratory birthday candle with a gleaming metallic finish for cakes and pastries.',
    150,
    FALSE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/star-shaped-metallic-cake-candle.jpg',
    FALSE,
    TRUE,
    '["Smokeless Wax Formulation","Sturdy Food-Safe Pick","Metallic Shimmer Coating"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Candles'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Star-Shaped Metallic Cake Candle'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 33: Half Birthday "1/2" Milestone Cake Candle
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Half Birthday "1/2" Milestone Cake Candle',
    c.id,
    s.id,
    'Celebrate your baby’s 6-month milestone with this adorable special 1/2 birthday cake candle.',
    100,
    FALSE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/half-birthday-1-2-milestone-cake-candle.png',
    FALSE,
    TRUE,
    '["Special 6-Month Baby Milestone","Vibrant Festive Colors","Safe Sturdy Stand"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Candles'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Half Birthday "1/2" Milestone Cake Candle'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 34: "Just Engaged" Celebration Acrylic Cake Topper
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    '"Just Engaged" Celebration Acrylic Cake Topper',
    c.id,
    s.id,
    'Delicate script acrylic cake topper celebrating engagement and ring ceremony parties.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/candles_decor.jpg',
    FALSE,
    TRUE,
    '["Mirror Gloss Finish","Food-Safe Acrylic","Reusable Keepsake"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Cake Toppers'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('"Just Engaged" Celebration Acrylic Cake Topper'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 35: LED Letters
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'LED Letters',
    c.id,
    s.id,
    'Stylish celebration cake topper for elegant birthday and milestone desserts.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/led-letters.jpg',
    FALSE,
    TRUE,
    '["Food-Grade Material","Lightweight Sturdy Pick","Festive High-Gloss Finish"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Cake Toppers'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('LED Letters'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 36: Golden Foil Alphabet Letter Message Cards Set
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Golden Foil Alphabet Letter Message Cards Set',
    c.id,
    s.id,
    'Gold foil stamped letter cards for personalizing cake boxes, gift displays, and party backdrops.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/candles_decor.jpg',
    FALSE,
    TRUE,
    '["Lustrous Gold Stamping","Sturdy Cardstock","Versatile Celebration Use"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Cake Toppers'
WHERE c.name = 'Cake Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Golden Foil Alphabet Letter Message Cards Set'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 37: Half Birthday "6 Months" Milestone Party Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Half Birthday "6 Months" Milestone Party Banner',
    c.id,
    s.id,
    'Adorable photo-backdrop garland banner celebrating baby half-birthday 6-month milestones.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["Milestone Keepsake Decor","Easy to Hang","Vibrant Child-Safe Inks"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Half Birthday "6 Months" Milestone Party Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 38: Happy Anniversary Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Happy Anniversary Banner',
    c.id,
    s.id,
    'Festive wall and backdrop party banner to elevate your party decoration.',
    100,
    FALSE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/products/happy-anniversary-banner.png',
    FALSE,
    TRUE,
    '["Eye-Catching Design","Ready to Hang","Reusable"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Happy Anniversary Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 39: "Bride To Be" Bachelorette Celebration Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    '"Bride To Be" Bachelorette Celebration Banner',
    c.id,
    s.id,
    'Chic gold & rose banner for bridal showers, bachelorette nights, and pre-wedding photo setups.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["High-Shine Foil Lettering","Lightweight Easy Hanging","Instagram-Ready Aesthetic"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('"Bride To Be" Bachelorette Celebration Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 40: Cursive "Welcome Baby" Celebration Hanging Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Cursive "Welcome Baby" Celebration Hanging Banner',
    c.id,
    s.id,
    'Sweet pastel cursive banner welcoming newborn arrivals, baby showers, and homecoming celebrations.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/products/cursive-welcome-baby-celebration-hanging.png',
    FALSE,
    TRUE,
    '["Pastel Soft Tones","Gentle Calligraphy Font","Includes Hanging Twine"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Cursive "Welcome Baby" Celebration Hanging Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 41: Cursive Script "Happy Birthday" Glitter Bunting Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Cursive Script "Happy Birthday" Glitter Bunting Banner',
    c.id,
    s.id,
    'Graceful flowing cursive Happy Birthday hanging garland banner with ribbon string.',
    150,
    FALSE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/products/cursive-script-happy-birthday-glitter-bu.jpg',
    FALSE,
    TRUE,
    '["Flowing Calligraphy Design","Pre-Strung Ribbon Included","Glitter Foil Finish"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Cursive Script "Happy Birthday" Glitter Bunting Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 42: Cursive Script "Happy Anniversary" Elegant Bunting Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Cursive Script "Happy Anniversary" Elegant Bunting Banner',
    c.id,
    s.id,
    'Romantic cursive calligraphy Happy Anniversary party banner for home or venue backdrops.',
    150,
    FALSE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/products/cursive-script-happy-anniversary-elegant.jpg',
    FALSE,
    TRUE,
    '["Elegant Calligraphy Script","Matching Hanging Ribbon","Premium Heavy Cardstock"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Cursive Script "Happy Anniversary" Elegant Bunting Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 43: Glamour Makeup Theme Birthday Garland Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Glamour Makeup Theme Birthday Garland Banner',
    c.id,
    s.id,
    'Trendy beauty and makeup-themed birthday party bunting with lipstick and brush cutouts.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/products/glamour-makeup-theme-birthday-garland-ba.jpg',
    FALSE,
    TRUE,
    '["Die-Cut Makeup Elements","Bright Gloss Inks","Matching Satin String"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Birthday Themes'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Glamour Makeup Theme Birthday Garland Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 44: Mermaid Under-the-Sea Theme Birthday Bunting Banner
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Mermaid Under-the-Sea Theme Birthday Bunting Banner',
    c.id,
    s.id,
    'Magical mermaid tail and ocean shell party bunting for fantasy birthday celebrations.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/products/mermaid-under-the-sea-theme-birthday-bun.jpg',
    FALSE,
    TRUE,
    '["Iridescent Foil Accents","Whimsical Sea Creature Cutouts","Sturdy Cardstock"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Birthday Themes'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Mermaid Under-the-Sea Theme Birthday Bunting Banner'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 45: Celebration Party Snow Foam Spray Can
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Celebration Party Snow Foam Spray Can',
    c.id,
    s.id,
    'Non-toxic, quick-evaporating celebratory snow foam spray for birthdays, countdowns, and weddings.',
    60,
    FALSE,
    '1 Can (250ml)',
    'Available on Order',
    FALSE,
    '/assets/products/celebration-party-snow-foam-spray-can.jpg',
    FALSE,
    TRUE,
    '["Non-Staining Formula","Quick-Evaporating Foam","Exciting Party Atmosphere"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Confetti'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Celebration Party Snow Foam Spray Can'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 46: Balloon Bright High-Gloss Shine Spray Can
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Balloon Bright High-Gloss Shine Spray Can',
    c.id,
    s.id,
    'Professional balloon polish spray that prevents oxidation and keeps latex balloons glossy for days.',
    250,
    FALSE,
    '1 Can (450ml)',
    'Available on Order',
    FALSE,
    '/assets/products/balloon-bright-high-gloss-shine-spray-ca.png',
    FALSE,
    TRUE,
    '["Prevents Oxidation & Cloudiness","Instant Mirror Gloss","Essential for Balloon Decorators"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Balloon Bright High-Gloss Shine Spray Can'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 47: Balloon Flower Shape Garland Clips
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Balloon Flower Shape Garland Clips',
    c.id,
    s.id,
    'Specialty snap clips allowing you to easily build stunning 5-petal and 6-petal balloon flowers in seconds.',
    12,
    FALSE,
    'Pack of 10 Clips',
    'Available on Order',
    FALSE,
    '/assets/products/balloon-flower-shape-garland-clips.png',
    FALSE,
    TRUE,
    '["Holds up to 6 Balloons","Reusable Sturdy Plastic","Quick Floral Backdrop Styling"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Balloon Flower Shape Garland Clips'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 48: Removable Balloon Glue Dots Strip Roll
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Removable Balloon Glue Dots Strip Roll',
    c.id,
    s.id,
    'Double-sided transparent adhesive glue dots for securing balloons to ceilings, walls, and balloon arches.',
    50,
    FALSE,
    'Roll of 100 Dots',
    'Available on Order',
    FALSE,
    '/assets/products/removable-balloon-glue-dots-strip-roll.png',
    FALSE,
    TRUE,
    '["100 Strong Glue Dots","No Residue / Wall-Safe","Invisible Clear Bond"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Removable Balloon Glue Dots Strip Roll'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 49: Perforated Balloon Garland Strip / Arch Tape
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Perforated Balloon Garland Strip / Arch Tape',
    c.id,
    s.id,
    'Flexible 5-meter dual-hole balloon decorating strip tape for assembling professional garlands and arches.',
    50,
    FALSE,
    '5 Meter Roll',
    'Available on Order',
    FALSE,
    '/assets/products/perforated-balloon-garland-strip-arch-ta.png',
    FALSE,
    TRUE,
    '["5 Meters / 16 Feet Length","Dual Hole Grip Design","Bendable to Any Shape"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Arch Kits'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Perforated Balloon Garland Strip / Arch Tape'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 50: Glow-in-the-Dark Neon Radium Party Wristbands
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Glow-in-the-Dark Neon Radium Party Wristbands',
    c.id,
    s.id,
    'Luminous neon glow wristbands for nighttime birthday parties, concerts, and celebration dance floors.',
    10,
    FALSE,
    'Pack of 5 Bands',
    'Available on Order',
    FALSE,
    '/assets/products/glow-in-the-dark-neon-radium-party-wrist.png',
    FALSE,
    TRUE,
    '["Vibrant Night Glow","Flexible Comfortable Fit","Fun Party Favor for All Ages"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Favors'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Glow-in-the-Dark Neon Radium Party Wristbands'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 51: Heavy-Duty Celebration Mounting Tape (Cello Tape)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Heavy-Duty Celebration Mounting Tape (Cello Tape)',
    c.id,
    s.id,
    'Essential party setup mounting tape for adhering backdrops, banners, and decor securely.',
    15,
    FALSE,
    '1 Roll',
    'Available on Order',
    FALSE,
    '/assets/products/heavy-duty-celebration-mounting-tape-cel.png',
    FALSE,
    TRUE,
    '["High Tack Adhesive","Clean Release","Essential Setup Tool"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Heavy-Duty Celebration Mounting Tape (Cello Tape)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 52: Heavy-Duty Celebration Mounting Tape (Double Side Tape)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Heavy-Duty Celebration Mounting Tape (Double Side Tape)',
    c.id,
    s.id,
    'Essential party setup mounting tape for adhering backdrops, banners, and decor securely.',
    20,
    FALSE,
    '1 Roll',
    'Available on Order',
    FALSE,
    '/assets/products/heavy-duty-celebration-mounting-tape-dou.png',
    FALSE,
    TRUE,
    '["High Tack Adhesive","Clean Release","Essential Setup Tool"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Heavy-Duty Celebration Mounting Tape (Double Side Tape)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 53: Transparent "O-N-E" First Birthday Balloon Boxes Set
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Transparent "O-N-E" First Birthday Balloon Boxes Set',
    c.id,
    s.id,
    'Clear display cube boxes with bold gold/white ONE lettering. Fill with mini balloons for baby 1st birthdays!',
    475,
    FALSE,
    'Set of 3 Boxes',
    'Available on Order',
    FALSE,
    '/assets/products/transparent-o-n-e-first-birthday-balloon.png',
    FALSE,
    TRUE,
    '["Set of 3 Clear Boxes","Bold Alphabet Lettering","Easy Foldable Assembly"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Transparent "O-N-E" First Birthday Balloon Boxes Set'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 54: Geometric Square Grid Box Foil Fringe Backdrop
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Geometric Square Grid Box Foil Fringe Backdrop',
    c.id,
    s.id,
    'Modern square-pattern metallic foil backdrop curtain creating high-fashion geometric photo walls.',
    NULL,
    TRUE,
    '1 Panel (3x6 ft)',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["Modern Square Grid Pattern","Double-Sided Adhesive Tape Pre-Applied","Vibrant Reflective Foil"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Geometric Square Grid Box Foil Fringe Backdrop'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 55: Cascading Heart Cutout Foil Fringe Curtain
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Cascading Heart Cutout Foil Fringe Curtain',
    c.id,
    s.id,
    'Romantic foil fringe backdrop featuring repeating die-cut hearts for anniversaries and birthdays.',
    NULL,
    TRUE,
    '1 Panel (3x6 ft)',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["Cascading Heart Motifs","Adhesive Strip Top","Dazzling Photo Backdrop"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Cascading Heart Cutout Foil Fringe Curtain'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 56: Luxury Layered Tassel Fringe Wall Backdrop
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Luxury Layered Tassel Fringe Wall Backdrop',
    c.id,
    s.id,
    'Textured layered tassel curtain adding rich dimensional elegance behind party tables and stages.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["Textured Tassel Strands","Full Volume Coverage","Reusable Hanging Loop"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Luxury Layered Tassel Fringe Wall Backdrop'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 57: Round Accordion Rosette Paper Fan Backdrop Set
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Round Accordion Rosette Paper Fan Backdrop Set',
    c.id,
    s.id,
    'Set of 6 assorted dimensional paper rosette fans in coordinating celebratory patterns and gold foil edges.',
    NULL,
    TRUE,
    'Set of 6 Fans',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["Assorted Sizes (8\", 12\", 16\")","Peel-and-Stick Assembly","Includes Hanging Strings"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Round Accordion Rosette Paper Fan Backdrop Set'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 58: Multipurpose Celebration Sheer Net Backdrop Fabric
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Multipurpose Celebration Sheer Net Backdrop Fabric',
    c.id,
    s.id,
    'Soft sheer flowing net drape for creating fairy light backdrops, floral arches, and mandaps.',
    NULL,
    TRUE,
    '1 Drape (5x8 ft)',
    'Available on Order',
    FALSE,
    '/assets/products/multipurpose-celebration-sheer-net-backd.jpg',
    FALSE,
    TRUE,
    '["Soft Flowing Drape","Pairs Beautifully with Fairy Lights","Durable Washable Fabric"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Multipurpose Celebration Sheer Net Backdrop Fabric'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 59: Pastel Rainbow Foil Tinsel Fringe Curtain
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Pastel Rainbow Foil Tinsel Fringe Curtain',
    c.id,
    s.id,
    'Dreamy multicolored pastel tinsel foil fringe backdrop perfect for unicorn and rainbow parties.',
    NULL,
    TRUE,
    '1 Panel (3x6 ft)',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["Soft Pastel Rainbow Hues","Lightweight Foil Tinsel","Ready to Peel and Stick"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Pastel Rainbow Foil Tinsel Fringe Curtain'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 60: Happy Birthday Sash
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Happy Birthday Sash',
    c.id,
    s.id,
    'High quality party essential curated for joyful celebrations.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/category_balloons.jpg',
    FALSE,
    TRUE,
    '["Curated Selection","Great for Parties","Trustworthy Quality"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Happy Birthday Sash'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 61: Warm White Battery-Operated LED Fairy Rice Lights
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Warm White Battery-Operated LED Fairy Rice Lights',
    c.id,
    s.id,
    'Flexible copper wire micro LED fairy lights with compact battery pack for balloon boxes and table centerpieces.',
    50,
    FALSE,
    '3 Meter String',
    'Available on Order',
    FALSE,
    '/assets/products/warm-white-battery-operated-led-fairy-ri.png',
    FALSE,
    TRUE,
    '["3 Meters Flexible Copper Wire","Energy-Saving Warm White Glow","Requires 2x AA Batteries (Portable)"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Warm White Battery-Operated LED Fairy Rice Lights'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 62: Celebration Backdrop LED Serial String Lights
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Celebration Backdrop LED Serial String Lights',
    c.id,
    s.id,
    '10-meter plug-in celebration serial string lights to illuminate backdrops, curtains, and party stages.',
    180,
    FALSE,
    '10 Meter String',
    'Available on Order',
    FALSE,
    '/assets/products/celebration-backdrop-led-serial-string-l.png',
    FALSE,
    TRUE,
    '["10 Meters Length","Plug-in Power with Multiple Flash Modes","Weather-Resistant Cabling"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Celebration Backdrop LED Serial String Lights'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 63: Electric Dual-Nozzle Balloon Air Blower Pump Machine
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Electric Dual-Nozzle Balloon Air Blower Pump Machine',
    c.id,
    s.id,
    'High-efficiency dual nozzle electric balloon inflator machine for rapidly inflating hundreds of party balloons.',
    850,
    FALSE,
    '1 Machine',
    'Available on Order',
    FALSE,
    '/assets/products/electric-dual-nozzle-balloon-air-blower-.jpg',
    FALSE,
    TRUE,
    '["Dual Inflation Nozzles","Touch-On Automatic Mode","Rapid Inflation in Seconds","Built-in Cable Storage"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Electric Dual-Nozzle Balloon Air Blower Pump Machine'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 64: Professional Party Event Machine (Electric Balloon Blower)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Professional Party Event Machine (Electric Balloon Blower)',
    c.id,
    s.id,
    'Professional event effect equipment for milestone celebrations and stage performances.',
    NULL,
    TRUE,
    '1 Unit',
    'Available on Order',
    FALSE,
    '/assets/products/professional-party-event-machine-electri.jpg',
    FALSE,
    TRUE,
    '["Reliable Commercial Grade","Simple Controls","Memorable Party Effect"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Professional Party Event Machine (Electric Balloon Blower)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 65: Automatic High-Output Celebration Bubble Machine
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Automatic High-Output Celebration Bubble Machine',
    c.id,
    s.id,
    'Electric bubble generator blowing thousands of floating bubbles per minute for child parties and wedding exits.',
    NULL,
    TRUE,
    '1 Machine',
    'Available on Order',
    FALSE,
    '/assets/products/automatic-high-output-celebration-bubble.jpg',
    FALSE,
    TRUE,
    '["Continuous Automatic Bubble Flow","Safe Non-Toxic Fluid Friendly","Compact Carry Handle"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Automatic High-Output Celebration Bubble Machine'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 66: DMX Electronic Cold-Pyro Stage Fountain Machine
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'DMX Electronic Cold-Pyro Stage Fountain Machine',
    c.id,
    s.id,
    'Safe indoor electronic cold spark machine creating spectacular 3-meter spark fountains without fire hazard.',
    NULL,
    TRUE,
    '1 Machine',
    'Available on Order',
    FALSE,
    '/assets/products/dmx-electronic-cold-pyro-stage-fountain-.jpg',
    FALSE,
    TRUE,
    '["Cold Spark Technology (No Burning Smell)","Safe for Indoor Use","Spectacular Grand Entry Effect"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('DMX Electronic Cold-Pyro Stage Fountain Machine'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 67: Handheld Electronic Celebration Cold Pyro Sparkler Gun
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Handheld Electronic Celebration Cold Pyro Sparkler Gun',
    c.id,
    s.id,
    'Exciting handheld cold pyro trigger gun for VIP celebrations, DJs, and stage moments.',
    NULL,
    TRUE,
    '1 Unit',
    'Available on Order',
    FALSE,
    '/assets/products/handheld-electronic-celebration-cold-pyr.jpg',
    FALSE,
    TRUE,
    '["Battery Powered Cordless Operation","Comfortable Grip Trigger","Spectacular Party Highlight"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Handheld Electronic Celebration Cold Pyro Sparkler Gun'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 68: Giant 2-Foot Illuminated Marquee Number "1" Light
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Giant 2-Foot Illuminated Marquee Number "1" Light',
    c.id,
    s.id,
    'Statement 24-inch marquee number 1 illuminated with warm round bulbs for unforgettable 1st birthday photos.',
    NULL,
    TRUE,
    '1 Piece (2 ft)',
    'Available on Order',
    FALSE,
    '/assets/products/giant-2-foot-illuminated-marquee-number-.jpg',
    FALSE,
    TRUE,
    '["Impressive 2-Foot Height","Soft Warm Filament Bulbs","Sturdy Self-Standing Base"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Giant 2-Foot Illuminated Marquee Number "1" Light'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 69: Warm Glow Acrylic "Happy Birthday" Neon Sign Light
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Warm Glow Acrylic "Happy Birthday" Neon Sign Light',
    c.id,
    s.id,
    'Premium curved acrylic LED neon sign radiating warm celebratory lighting for birthday stage backdrops.',
    NULL,
    TRUE,
    '1 Sign',
    'Available on Order',
    FALSE,
    '/assets/products/warm-glow-acrylic-happy-birthday-neon-si.jpg',
    FALSE,
    TRUE,
    '["Modern Silicone LED Neon Tubing","Crystal Clear Acrylic Backing Plate","Pre-Drilled Hanging Holes"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Warm Glow Acrylic "Happy Birthday" Neon Sign Light'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 70: Decorative Celebration Light (LED Alphabet Letters)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Decorative Celebration Light (LED Alphabet Letters)',
    c.id,
    s.id,
    'Eye-catching illuminated lighting fixture for evening celebration backdrops.',
    NULL,
    TRUE,
    '1 Piece',
    'Available on Order',
    FALSE,
    '/assets/products/decorative-celebration-light-led-alphabe.jpg',
    FALSE,
    TRUE,
    '["Low Energy LED Technology","Warm Festive Illumination","Stunning Nighttime Glow"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Decorative Celebration Light (LED Alphabet Letters)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 71: Round Circular Metal Balloon Arch Backdrop Stand (6.5 ft)
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Round Circular Metal Balloon Arch Backdrop Stand (6.5 ft)',
    c.id,
    s.id,
    'Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.',
    NULL,
    TRUE,
    '1 Frame Set',
    'Available on Order',
    FALSE,
    '/assets/products/round-circular-metal-balloon-arch-backdr.jpg',
    FALSE,
    TRUE,
    '["Disassembles for Easy Transport","Heavy-Duty Anti-Tip Footplates","Ideal for Indoors & Outdoors"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Stands & Props'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Round Circular Metal Balloon Arch Backdrop Stand (6.5 ft)'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 72: Square Geometric Metal Balloon Arch Backdrop Frame
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Square Geometric Metal Balloon Arch Backdrop Frame',
    c.id,
    s.id,
    'Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.',
    NULL,
    TRUE,
    '1 Frame Set',
    'Available on Order',
    FALSE,
    '/assets/products/square-geometric-metal-balloon-arch-back.jpg',
    FALSE,
    TRUE,
    '["Disassembles for Easy Transport","Heavy-Duty Anti-Tip Footplates","Ideal for Indoors & Outdoors"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Stands & Props'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Square Geometric Metal Balloon Arch Backdrop Frame'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 73: Illuminated "LOVE" Marquee Stage Feature
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Illuminated "LOVE" Marquee Stage Feature',
    c.id,
    s.id,
    'Glowing illuminated LOVE marquee centerpiece for anniversaries, engagements, and romantic party setups.',
    NULL,
    TRUE,
    '1 Feature Set',
    'Available on Order',
    FALSE,
    '/assets/products/illuminated-love-marquee-stage-feature.jpg',
    FALSE,
    TRUE,
    '["High-Impact Romantic Feature","Warm LED Illumination","Perfect Photo Centerpiece"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Party Lighting & Effects'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Illuminated "LOVE" Marquee Stage Feature'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 74: Hanging Swirl Ceiling Paper Ribbon Streamers
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Hanging Swirl Ceiling Paper Ribbon Streamers',
    c.id,
    s.id,
    'Spiral ceiling streamer ribbons that catch gentle air currents, creating dynamic movement above party spaces.',
    30,
    FALSE,
    'Pack of 6 Ribbons',
    'Available on Order',
    FALSE,
    '/assets/products/hanging-swirl-ceiling-paper-ribbon-strea.png',
    FALSE,
    TRUE,
    '["Pack of 6 Cascading Swirls","Vibrant Dual-Color Paper","Includes Ceiling Hooks"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Balloon Accessories'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Hanging Swirl Ceiling Paper Ribbon Streamers'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );

-- Product 75: Baby shower
INSERT INTO public.products (
    name,
    category_id,
    subcategory_id,
    description,
    price,
    price_on_request,
    unit,
    availability,
    in_stock,
    image_url,
    is_best_seller,
    is_new,
    features
)
SELECT
    'Baby shower',
    c.id,
    s.id,
    'Festive wall and backdrop party banner to elevate your party decoration.',
    NULL,
    TRUE,
    '1 Set',
    'Available on Order',
    FALSE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["Eye-Catching Design","Ready to Hang","Reusable"]'::jsonb
FROM public.categories c
LEFT JOIN public.subcategories s ON s.category_id = c.id AND s.name = 'Banners & Backdrops'
WHERE c.name = 'Birthday & Party Items'
  AND NOT EXISTS (
      SELECT 1 FROM public.products p
      WHERE LOWER(TRIM(p.name)) = LOWER(TRIM('Baby shower'))
        AND p.category_id = c.id
        AND (
            (p.subcategory_id IS NULL AND s.id IS NULL)
            OR p.subcategory_id = s.id
        )
  );
