-- ==============================================================================
-- SHRI SHYAM CELEBRATIONS – THE PARTY STORE
-- ALL-IN-ONE SUPABASE SETUP SCRIPT (SCHEMA + POLICIES + SEED DATA)
-- Run this single script directly in the Supabase SQL Editor.
-- It is 100% idempotent: safe to run multiple times without errors or duplicates.
-- ==============================================================================

-- 0. CLEAN RESET (Drops previous incomplete tables so schema is 100% clean and fresh)
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.subcategories CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL,
    description TEXT,
    price NUMERIC(10, 2) DEFAULT NULL,
    price_on_request BOOLEAN NOT NULL DEFAULT TRUE,
    unit TEXT,
    availability TEXT NOT NULL DEFAULT 'In Stock',
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    image_url TEXT,
    is_best_seller BOOLEAN NOT NULL DEFAULT FALSE,
    is_new BOOLEAN NOT NULL DEFAULT FALSE,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure all columns exist even if tables existed previously
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS in_stock BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_on_request BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS unit TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS availability TEXT NOT NULL DEFAULT 'In Stock';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_best_seller BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_new BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price NUMERIC(10, 2) DEFAULT NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT;

-- 3. UNIQUE INDEX & PERFORMANCE INDEXES
DELETE FROM public.products a USING public.products b
WHERE a.ctid < b.ctid AND a.name = b.name;

CREATE UNIQUE INDEX IF NOT EXISTS idx_products_name_unique ON public.products (name);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory_id ON public.products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON public.subcategories(category_id);

-- 4. UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories RLS
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert categories" ON public.categories;
CREATE POLICY "Allow authenticated users to insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update categories" ON public.categories;
CREATE POLICY "Allow authenticated users to update categories" ON public.categories FOR UPDATE TO authenticated USING (true);

-- Subcategories RLS
DROP POLICY IF EXISTS "Allow public read access on subcategories" ON public.subcategories;
CREATE POLICY "Allow public read access on subcategories" ON public.subcategories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert subcategories" ON public.subcategories;
CREATE POLICY "Allow authenticated users to insert subcategories" ON public.subcategories FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update subcategories" ON public.subcategories;
CREATE POLICY "Allow authenticated users to update subcategories" ON public.subcategories FOR UPDATE TO authenticated USING (true);

-- Products RLS
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON public.products;
CREATE POLICY "Allow authenticated users to insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update products" ON public.products;
CREATE POLICY "Allow authenticated users to update products" ON public.products FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON public.products;
CREATE POLICY "Allow authenticated users to delete products" ON public.products FOR DELETE TO authenticated USING (true);

-- 6. STORAGE BUCKET (Handled with safe dynamic execution so it never blocks script execution)
DO $$
BEGIN
    EXECUTE 'INSERT INTO storage.buckets (id, name, public) VALUES (''store-images'', ''store-images'', true) ON CONFLICT (id) DO NOTHING';
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- ==============================================================================
-- 7. INSERT CATEGORIES
-- ==============================================================================
INSERT INTO public.categories (name, slug, description, image_url)
VALUES 
    (
        'Cake Items',
        'cake-items',
        'Everything you need to turn any cake into a magical celebration – custom acrylic toppers, sparklers, number candles, and dessert displays.',
        '/assets/category_cakes.jpg'
    ),
    (
        'Birthday & Party Items',
        'birthday-party-items',
        'Vibrant latex and foil balloons, garland arch sets, birthday banners, confetti poppers, party hats, and photo props for unforgettable celebrations.',
        '/assets/category_balloons.jpg'
    ),
    (
        'Disposable Items',
        'disposable-items',
        'Eco-friendly and elegant party tableware: gold rimmed plates, insulated cups, printed napkins, birchwood cutlery, and spill-proof table runners.',
        '/assets/category_disposables.jpg'
    )
ON CONFLICT (slug) DO UPDATE 
SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- ==============================================================================
-- 8. INSERT SUBCATEGORIES (Using reliable subqueries)
-- ==============================================================================
INSERT INTO public.subcategories (category_id, name, slug)
VALUES
    -- Cake Subcategories
    ((SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1), 'Cake Toppers', 'cake-toppers'),
    ((SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1), 'Candles', 'candles'),
    ((SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1), 'Cake Decor', 'cake-decor'),
    ((SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1), 'Cake Accessories', 'cake-accessories'),

    -- Party Subcategories
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Balloons', 'balloons'),
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Foil Balloons', 'foil-balloons'),
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Balloon Arch Kits', 'balloon-arch-kits'),
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Balloon Accessories', 'balloon-accessories'),
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Banners & Backdrops', 'banners-backdrops'),
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Party Confetti', 'party-confetti'),
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Hats & Sashes', 'hats-sashes'),
    ((SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1), 'Party Favors', 'party-favors'),

    -- Disposable Subcategories
    ((SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1), 'Plates & Bowls', 'plates-bowls'),
    ((SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1), 'Cups & Drinkware', 'cups-drinkware'),
    ((SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1), 'Napkins & Tissues', 'napkins-tissues'),
    ((SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1), 'Cutlery', 'cutlery'),
    ((SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1), 'Table Covers', 'table-covers')
ON CONFLICT (slug) DO UPDATE
SET 
    name = EXCLUDED.name,
    category_id = EXCLUDED.category_id;

-- ==============================================================================
-- 9. INSERT PRODUCTS (Migrated from src/data/products.ts)
-- ==============================================================================

-- 🍰 CAKE ITEMS
INSERT INTO public.products (name, category_id, subcategory_id, description, price, price_on_request, unit, availability, in_stock, image_url, is_best_seller, is_new, features)
VALUES
(
    'Custom Acrylic Birthday Cake Topper (Mirror Gold Glitter)',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cake-toppers' LIMIT 1),
    'Premium laser-cut gold mirror acrylic cake topper. Adds an elegant, sparkling centerpiece to any birthday cake.',
    149.00,
    TRUE,
    '1 Piece',
    'In Stock',
    TRUE,
    '/assets/category_cakes.jpg',
    TRUE,
    FALSE,
    '["Food-grade durable acrylic", "Washable & reusable", "Fits cakes from 0.5 kg to 3 kg+"]'::jsonb
),
(
    'Elegant "Happy Anniversary" Script Cake Topper',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cake-toppers' LIMIT 1),
    'Charming cursive typography cake topper in reflective metallic gold finish, perfect for romantic celebrations.',
    159.00,
    TRUE,
    '1 Piece',
    'In Stock',
    TRUE,
    '/assets/category_cakes.jpg',
    FALSE,
    TRUE,
    '["Sturdy double-stem insert", "Scratch-resistant foil finish", "Timeless calligraphy design"]'::jsonb
),
(
    'Mini Balloon Arch Garland Cake Topper Set',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cake-toppers' LIMIT 1),
    'Chic DIY mini balloon cluster on decorative paper straws to crown birthday and baby shower cakes.',
    179.00,
    TRUE,
    '1 Set',
    'In Stock',
    TRUE,
    '/assets/category_cakes.jpg',
    FALSE,
    FALSE,
    '["Includes 10 mini latex balloons", "Decorative striped support straws", "Glue dots and ribbon included"]'::jsonb
),
(
    'Luxury Spiral Gold & Pastel Birthday Candles',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'candles' LIMIT 1),
    'Elegant metallic spiral candles with non-drip wax and golden sheen. Upgrades any birthday cake instantly.',
    99.00,
    TRUE,
    'Pack of 12',
    'In Stock',
    TRUE,
    '/assets/candles_decor.jpg',
    TRUE,
    FALSE,
    '["Smokeless wax formulation", "Includes sturdy candle holders", "Even and steady flame burn"]'::jsonb
),
(
    'Gold Glitter Number Birthday Candles (0 to 9)',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'candles' LIMIT 1),
    'Shimmering 3D numerals coated in sparkling gold glitter for milestone birthdays and anniversaries.',
    79.00,
    TRUE,
    '1 Piece (Select Number)',
    'In Stock',
    TRUE,
    '/assets/candles_decor.jpg',
    TRUE,
    FALSE,
    '["Numbered 0 through 9 available", "Stable food-safe bottom peg", "Long burning duration"]'::jsonb
),
(
    'Celebration Cold-Pyro Sparkler Cake Candles',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'candles' LIMIT 1),
    'Dazzling indoor-safe cold firework sparklers that create an energetic golden fountain shower over the cake.',
    120.00,
    TRUE,
    'Pack of 4',
    'In Stock',
    TRUE,
    '/assets/candles_decor.jpg',
    TRUE,
    FALSE,
    '["Certified food-safe cold spark", "Burns for 45+ seconds", "High visual celebration impact"]'::jsonb
),
(
    'Magic Relighting Trick Birthday Candles',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'candles' LIMIT 1),
    'Hilarious surprise candles that automatically reignite after being blown out! A party classic.',
    69.00,
    TRUE,
    'Pack of 10',
    'In Stock',
    TRUE,
    '/assets/candles_decor.jpg',
    FALSE,
    FALSE,
    '["Automatic reignition wick", "Assorted bright festive colors", "Guaranteed laughter for all ages"]'::jsonb
),
(
    'Edible Gold Leaf Foil Flakes & Sugar Pearls Set',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cake-decor' LIMIT 1),
    'Food-grade shimmering gold foil flakes and metallic sugar pearls to give bakery and homemade cakes luxury appeal.',
    249.00,
    TRUE,
    '1 Set (2 Jars)',
    'Available on Order',
    TRUE,
    '/assets/category_cakes.jpg',
    FALSE,
    TRUE,
    '["100% Edible & certified food grade", "Ideal for frosting & fondant", "Includes precision tweezers"]'::jsonb
),
(
    'Tiered Cupcake & Dessert Display Stand (Gold Trim)',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cake-accessories' LIMIT 1),
    'Sturdy 3-tier presentation stand for displaying cupcakes, pastries, muffins, and dessert shots.',
    349.00,
    TRUE,
    '1 Piece',
    'In Stock',
    TRUE,
    '/assets/category_cakes.jpg',
    FALSE,
    FALSE,
    '["Easy slot-together assembly", "Wipe-clean laminated surface", "Holds 18-24 standard cupcakes"]'::jsonb
),
(
    'Heavy Duty Gold Foil Cake Base Boards (10-inch)',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cake-accessories' LIMIT 1),
    'Greaseproof embossed gold cake drum boards providing solid support for heavy tier cakes and transport.',
    129.00,
    TRUE,
    'Pack of 5',
    'In Stock',
    TRUE,
    '/assets/category_cakes.jpg',
    FALSE,
    FALSE,
    '["Embossed foil patterned finish", "Non-slip greaseproof surface", "Rigid corrugated board support"]'::jsonb
),
(
    'Golden Stainless Steel Cake Knife & Server Set',
    (SELECT id FROM public.categories WHERE slug = 'cake-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cake-accessories' LIMIT 1),
    'Sleek metallic gold finished serrated cake knife and triangular serving spatula for smooth cake cutting ceremonies.',
    299.00,
    TRUE,
    '1 Set (2 Pcs)',
    'In Stock',
    TRUE,
    '/assets/category_cakes.jpg',
    FALSE,
    FALSE,
    '["Durable stainless steel core", "Serrated cutting edge", "Elegant presentation box"]'::jsonb
),

-- 🎈 BIRTHDAY & PARTY ITEMS
(
    'Metallic Pearl Latex Balloons (Assorted Color Mix)',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'balloons' LIMIT 1),
    'Premium thick latex balloons with a rich metallic shimmer. Suitable for air filling or helium inflation.',
    199.00,
    TRUE,
    'Pack of 50',
    'In Stock',
    TRUE,
    '/assets/category_balloons.jpg',
    TRUE,
    FALSE,
    '["12-inch diameter size", "Durable non-burst latex", "Assorted gold, blue, magenta & silver"]'::jsonb
),
(
    'Pastel Macaron Balloons Garland Pack',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'balloons' LIMIT 1),
    'Trendy soft pastel shades for aesthetic kids birthdays, baby showers, and garden tea parties.',
    229.00,
    TRUE,
    'Pack of 50',
    'In Stock',
    TRUE,
    '/assets/category_balloons.jpg',
    FALSE,
    FALSE,
    '["Soft matte pastel tone", "Extra thick rubber elasticity", "10 & 12 inch mixed size"]'::jsonb
),
(
    'Pre-Filled Golden Confetti Clear Latex Balloons',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'balloons' LIMIT 1),
    'Transparent 12-inch balloons filled with shiny gold circular foil sequins that cling to the sides with static.',
    149.00,
    TRUE,
    'Pack of 10',
    'In Stock',
    TRUE,
    '/assets/category_balloons.jpg',
    TRUE,
    FALSE,
    '["Pre-filled for zero mess", "High transparency latex", "Ribbon ties included"]'::jsonb
),
(
    '32-Inch Jumbo Foil Number Balloons (Gold / Rose Gold)',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'foil-balloons' LIMIT 1),
    'Massive 32-inch glossy foil numeral balloons for age milestones, anniversaries, and year highlights.',
    129.00,
    TRUE,
    '1 Piece (Select 0-9)',
    'In Stock',
    TRUE,
    '/assets/foil_balloons.jpg',
    TRUE,
    FALSE,
    '["Automatic self-sealing valve", "Top and bottom hanging tabs", "Refillable and long-lasting"]'::jsonb
),
(
    '16-Inch "HAPPY BIRTHDAY" Alphabet Foil Balloon Banner Set',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'foil-balloons' LIMIT 1),
    'Complete 13-letter foil spelling banner. Hangs effortlessly against walls or curtain backdrops.',
    249.00,
    TRUE,
    '1 Set (13 Letters + Ribbon)',
    'In Stock',
    TRUE,
    '/assets/category_balloons.jpg',
    TRUE,
    FALSE,
    '["Includes inflation straw", "10m matching hanging ribbon", "Glossy metallic finish"]'::jsonb
),
(
    'Celebration Champagne Bottle & Flute Foil Balloon Combo',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'foil-balloons' LIMIT 1),
    'Jumbo bubbly champagne bottle and cheers flute balloon, ideal for adults, milestone birthdays and anniversaries.',
    169.00,
    TRUE,
    'Set of 2',
    'In Stock',
    TRUE,
    '/assets/foil_balloons.jpg',
    FALSE,
    TRUE,
    '["Jumbo 36-inch size", "Double sided high-res print", "Self-closing air valve"]'::jsonb
),
(
    'Metallic Gold, Navy & Magenta DIY Balloon Garland Arch Kit',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'balloon-arch-kits' LIMIT 1),
    'Complete all-in-one arch set: assorted sized balloons, arch fixing strip, curling ribbon, and 100 glue dots.',
    499.00,
    TRUE,
    '70 Pcs Kit',
    'In Stock',
    TRUE,
    '/assets/category_balloons.jpg',
    TRUE,
    FALSE,
    '["70 assorted balloons", "16ft arch decorating chain", "No experience needed for DIY setup"]'::jsonb
),
(
    'Dual Action Hand Balloon Air Inflator Pump',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'balloon-accessories' LIMIT 1),
    'Lightweight manual handheld air pump that inflates balloons on both up and down strokes to save time and effort.',
    99.00,
    TRUE,
    '1 Piece',
    'In Stock',
    TRUE,
    '/assets/category_balloons.jpg',
    FALSE,
    FALSE,
    '["Dual-direction air output", "Ergonomic non-slip handle", "Suitable for all latex & foil valves"]'::jsonb
),
(
    '3D Gold Foil Embossed "Happy Birthday" Hanging Bunting Banner',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'banners-backdrops' LIMIT 1),
    'Thick cardstock swallowtail pennants featuring glimmering gold foil typography and matching satin ribbon.',
    179.00,
    TRUE,
    '1 Piece',
    'In Stock',
    TRUE,
    '/assets/category_balloons.jpg',
    FALSE,
    FALSE,
    '["Pre-strung letters for quick hang", "Reusable thick cardstock", "Adjustable pennant spacing"]'::jsonb
),
(
    'Shimmering Metallic Tinsel Foil Fringe Curtain Backdrop',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'banners-backdrops' LIMIT 1),
    'Glistening foil tinsel fringe backdrop curtains with peel-and-stick adhesive tape for photo booth walls.',
    199.00,
    TRUE,
    'Pack of 2 (3ft x 6ft each)',
    'In Stock',
    TRUE,
    '/assets/foil_balloons.jpg',
    TRUE,
    FALSE,
    '["Built-in adhesive tape strip", "Durable laser foil strands", "Creates immediate photo-ready backdrop"]'::jsonb
),
(
    'Confetti Party Popper Cannon (Celebration Burst)',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'party-confetti' LIMIT 1),
    'Spring-loaded and air-compressed twist popper packed with shiny gold metallic foil confetti & colored streamers.',
    149.00,
    TRUE,
    'Pack of 2',
    'In Stock',
    TRUE,
    '/assets/party_accessories.jpg',
    TRUE,
    FALSE,
    '["Safe non-pyrotechnic mechanism", "Shoots 10-15 feet in the air", "Indoor and outdoor safe"]'::jsonb
),
(
    'Glitter Cone Party Hats with Fluffy Pom-Poms',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'hats-sashes' LIMIT 1),
    'Eye-catching party cone hats in gold, pink, and navy sparkles with comfortable chin elastic cords.',
    199.00,
    TRUE,
    'Pack of 8',
    'In Stock',
    TRUE,
    '/assets/party_accessories.jpg',
    FALSE,
    FALSE,
    '["Sparkle finish without loose glitter", "Secure soft chin elastic", "Fits kids & adults alike"]'::jsonb
),
(
    '"Birthday Girl" / "Birthday Boy" Satin Ribbon Sash & Tiara Set',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'hats-sashes' LIMIT 1),
    'Silky smooth satin sash with golden glitter lettering and matching rhinestone celebration crown.',
    199.00,
    TRUE,
    '1 Set',
    'In Stock',
    TRUE,
    '/assets/party_accessories.jpg',
    FALSE,
    TRUE,
    '["High quality double satin", "Comes with safety pin clip", "Rhinestone alloy tiara"]'::jsonb
),
(
    'Fun Photo Booth Stick Props with Celebration Quotes',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'party-favors' LIMIT 1),
    'Pre-assembled photo booth props featuring fun glasses, crowns, mustaches, and celebration speech bubbles.',
    179.00,
    TRUE,
    'Set of 20 Props',
    'In Stock',
    TRUE,
    '/assets/party_accessories.jpg',
    FALSE,
    FALSE,
    '["High-density cardstock props", "Sturdy wooden dowels pre-glued", "Creates hilarious photo memories"]'::jsonb
),
(
    'Luxury Birthday Favor Gift Bags with Gold Handles',
    (SELECT id FROM public.categories WHERE slug = 'birthday-party-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'party-favors' LIMIT 1),
    'Thick kraft paper return gift bags adorned with gold foil stars to hand out party favors and treats.',
    229.00,
    TRUE,
    'Pack of 10',
    'In Stock',
    TRUE,
    '/assets/hero_celebration.jpg',
    FALSE,
    FALSE,
    '["Reinforced flat base", "Silky woven handle cords", "Generous 8 x 6 inch storage size"]'::jsonb
),

-- 🍽️ DISPOSABLE ITEMS
(
    'Gold Rimmed Heavy-Duty Disposable Dinner Plates (9-inch)',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'plates-bowls' LIMIT 1),
    'Premium heavyweight disposable plates featuring a classic gold foil rim. Rigid enough to hold heavy meals.',
    299.00,
    TRUE,
    'Set of 25',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    TRUE,
    FALSE,
    '["Oil & grease leak resistant", "Rigid design does not bend", "100% Food-grade composite"]'::jsonb
),
(
    'Matching Gold Foil Cake & Snack Plates (7-inch)',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'plates-bowls' LIMIT 1),
    'Perfect dessert size plates matching the dinner set. Ideal for cake slices, snacks, and appetizers.',
    219.00,
    TRUE,
    'Set of 25',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    FALSE,
    FALSE,
    '["Raised edge to prevent drips", "Glossy gold trim finish", "Microwave safe"]'::jsonb
),
(
    'Eco-Friendly Areca Palm Leaf Square Buffet Plates (10-inch)',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'plates-bowls' LIMIT 1),
    'Naturally fallen areca palm leaves hot-pressed into rustic, chemical-free dinner plates.',
    259.00,
    TRUE,
    'Pack of 20',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    TRUE,
    FALSE,
    '["100% Biodegradable & compostable", "Extremely sturdy for hot foods", "Naturally water & cut resistant"]'::jsonb
),
(
    'Insulated Hot & Cold Paper Drinking Cups (Gold Geometric)',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cups-drinkware' LIMIT 1),
    'Double-walled party paper cups with metallic gold art-deco geometric lines. Safe for hot tea, coffee or cold soda.',
    149.00,
    TRUE,
    'Set of 25 (250ml)',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    TRUE,
    FALSE,
    '["Double-wall insulation stays cool to touch", "Rolled rim prevents spills", "BPA-free & odorless paper"]'::jsonb
),
(
    'Crystal Clear Hard Plastic Party Tumblers',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cups-drinkware' LIMIT 1),
    'Heavyweight clear tumblers with crystal diamond cut texture for serving mocktails, juices, and cold drinks.',
    169.00,
    TRUE,
    'Pack of 20 (300ml)',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    FALSE,
    FALSE,
    '["Shatterproof durable plastic", "Glass-like optical clarity", "Recyclable food-grade plastic"]'::jsonb
),
(
    'Metallic Striped Biodegradable Paper Drinking Straws',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cups-drinkware' LIMIT 1),
    'High-density multi-ply paper drinking straws in gold and green stripes that resist sogginess.',
    89.00,
    TRUE,
    'Pack of 50',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    FALSE,
    FALSE,
    '["Lasts 3+ hours in cold drinks", "Dye-free food grade paper", "100% Marine biodegradable"]'::jsonb
),
(
    'Designer 3-Ply Gold Stamped Party Napkins',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'napkins-tissues' LIMIT 1),
    'Ultra-soft 3-ply party tissues with stamped gold celebration patterns and bordered scallop edging.',
    119.00,
    TRUE,
    'Pack of 40',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    TRUE,
    FALSE,
    '["Extra thick & highly absorbent", "Lint-free velvety texture", "Foil stamped luxury look"]'::jsonb
),
(
    'Buffet & Catering Soft Table Luncheon Tissues',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'napkins-tissues' LIMIT 1),
    'Economical bulk pack of white embossed virgin tissue paper for guest dining tables and snack counters.',
    99.00,
    TRUE,
    'Pack of 100',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    FALSE,
    FALSE,
    '["Virgin wood pulp softness", "Embossed honeycomb pattern", "Fast absorption"]'::jsonb
),
(
    'Premium Birchwood Eco Cutlery (Spoons, Forks & Knives)',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cutlery' LIMIT 1),
    '100% natural smooth-burnished birchwood cutlery tied with rustic jute twine. Zero splintering guarantee.',
    189.00,
    TRUE,
    'Pack of 30 (10 Spoons + 10 Forks + 10 Knives)',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    TRUE,
    FALSE,
    '["Smooth natural wax polish", "Eco compostable & plastic-free", "Sturdy and lightweight"]'::jsonb
),
(
    'Metallic Gold Heavyweight Reusable Plastic Cutlery Set',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'cutlery' LIMIT 1),
    'Looks identical to authentic golden silverware. Heavyweight, washable and reusable or disposable.',
    249.00,
    TRUE,
    'Pack of 24 (8 Spoons + 8 Forks + 8 Knives)',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    FALSE,
    FALSE,
    '["Mirror gold metallic plating", "Heavy balanced hand feel", "Full size dinner silverware"]'::jsonb
),
(
    'Waterproof Navy Blue & Gold Dot Spill-Proof Table Cover',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'table-covers' LIMIT 1),
    'Durable waterproof PE plastic table protector decorated with gold confetti polka dots. Fits tables up to 8ft.',
    199.00,
    TRUE,
    'Pack of 2 (54 x 108 inches)',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    FALSE,
    FALSE,
    '["100% Spill & stain proof", "Tear-resistant thickness", "Makes post-party cleanup effortless"]'::jsonb
),
(
    'Metallic Gold Shimmer Sequin Table Runner',
    (SELECT id FROM public.categories WHERE slug = 'disposable-items' LIMIT 1),
    (SELECT id FROM public.subcategories WHERE slug = 'table-covers' LIMIT 1),
    'High-density round sequins stitched onto mesh fabric to lay across cake and buffet tables for sparkle.',
    279.00,
    TRUE,
    '1 Piece (12 x 72 inches)',
    'In Stock',
    TRUE,
    '/assets/category_disposables.jpg',
    FALSE,
    TRUE,
    '["Non-shedding stitched sequins", "Glittering light reflection", "Reusable for multiple parties"]'::jsonb
)
ON CONFLICT (name) DO UPDATE 
SET 
    category_id = EXCLUDED.category_id,
    subcategory_id = EXCLUDED.subcategory_id,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    price_on_request = EXCLUDED.price_on_request,
    unit = EXCLUDED.unit,
    availability = EXCLUDED.availability,
    in_stock = EXCLUDED.in_stock,
    image_url = EXCLUDED.image_url,
    is_best_seller = EXCLUDED.is_best_seller,
    is_new = EXCLUDED.is_new,
    features = EXCLUDED.features;
