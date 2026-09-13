import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Process CLI Arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.includes('-d');
const isExecute = args.includes('--execute') || (!isDryRun && args.length > 0);

// 2. Load environment variables from .env
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
  envLines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const adminEmail = process.env.ADMIN_EMAIL || '';
const adminPassword = process.env.ADMIN_PASSWORD || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found in .env');
  process.exit(1);
}

const isServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

function normalize(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeCompositeKey(name, categoryId, subcategoryId) {
  return `${normalize(name)}::${categoryId || ''}::${subcategoryId || ''}`;
}

async function runImporter() {
  console.log('================================================================');
  console.log(`SHRI SHYAM CELEBRATIONS – CATALOG IMPORTER [MODE: ${isDryRun ? 'DRY-RUN' : 'LIVE EXECUTION'}]`);
  console.log('================================================================\n');

  // Load curated dataset
  const jsonPath = path.resolve(__dirname, '../src/data/balloonhouse-import.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: Dataset not found at ${jsonPath}`);
    process.exit(1);
  }
  const importItems = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Loaded ${importItems.length} curated products from dataset.`);

  // Verify all image paths against disk
  const publicDir = path.resolve(__dirname, '../public');
  let diskImageCount = 0;
  let missingImageCount = 0;
  const missingImagesList = [];

  importItems.forEach(item => {
    const img = item.image_url || item.image;
    if (!img) {
      missingImageCount++;
      missingImagesList.push({ name: item.name, reason: 'Empty image path' });
      return;
    }
    const cleanImg = img.replace(/^\//, '');
    const fullPath = path.join(publicDir, cleanImg);
    if (fs.existsSync(fullPath)) {
      diskImageCount++;
    } else {
      missingImageCount++;
      missingImagesList.push({ name: item.name, reason: `File missing on disk: ${fullPath}` });
    }
  });

  // Fetch current categories & subcategories from Supabase
  const { data: categories, error: catErr } = await supabase.from('categories').select('id, name, slug');
  if (catErr) {
    console.error('Failed to query categories:', catErr.message);
    process.exit(1);
  }
  const catMap = new Map(categories.map(c => [c.name, c.id]));

  const { data: subcategories, error: subErr } = await supabase.from('subcategories').select('id, category_id, name, slug');
  if (subErr) {
    console.error('Failed to query subcategories:', subErr.message);
    process.exit(1);
  }
  const subMap = new Map(subcategories.map(s => [s.name, s.id]));

  // New subcategories required
  const newSubcategoriesNeeded = [
    { name: 'Stands & Props', slug: 'stands-props', category: 'Birthday & Party Items' },
    { name: 'Party Lighting & Effects', slug: 'party-lighting-effects', category: 'Birthday & Party Items' },
    { name: 'Birthday Themes', slug: 'birthday-themes', category: 'Birthday & Party Items' }
  ];

  // Fetch existing products from database
  const { data: existingProducts, error: prodErr } = await supabase
    .from('products')
    .select('id, name, category_id, subcategory_id');
  if (prodErr) {
    console.error('Failed to query existing products:', prodErr.message);
    process.exit(1);
  }

  // Build composite duplicate index of existing products
  const existingCompositeSet = new Set(
    existingProducts.map(p => makeCompositeKey(p.name, p.category_id, p.subcategory_id))
  );

  // Analyze potential duplicates, invalid products, and new additions
  let potentialNew = 0;
  let duplicates = 0;
  let invalidProducts = 0;
  const invalidList = [];

  for (const item of importItems) {
    const catId = catMap.get(item.mainCategory);
    if (!catId) {
      invalidProducts++;
      invalidList.push({ name: item.name, reason: `Category "${item.mainCategory}" not found` });
      continue;
    }

    const subId = subMap.get(item.subCategory) || null;
    const compKey = makeCompositeKey(item.name, catId, subId);

    if (existingCompositeSet.has(compKey)) {
      duplicates++;
    } else {
      potentialNew++;
    }
  }

  // --- DRY RUN REPORT ---
  if (isDryRun || !isExecute) {
    console.log('----------------------------------------------------------------');
    console.log('DRY-RUN AUDIT REPORT (Zero database modifications made)');
    console.log('----------------------------------------------------------------');
    console.log(`Existing products:               ${existingProducts.length}`);
    console.log(`Potential new products:          ${potentialNew}`);
    console.log(`Duplicates:                      ${duplicates}`);
    console.log(`Potential updates:               0 (Additive import; existing rows are never modified)`);
    console.log(`Invalid products:                ${invalidProducts}`);
    console.log(`Missing images:                  ${missingImageCount}`);
    console.log(`Local images verified on disk:   ${diskImageCount}`);
    console.log('----------------------------------------------------------------');

    if (invalidProducts > 0) {
      console.log('\nInvalid Products:');
      invalidList.forEach(inv => console.log(`  - ${inv.name}: ${inv.reason}`));
    }
    if (missingImageCount > 0) {
      console.log('\nMissing Images:');
      missingImagesList.forEach(m => console.log(`  - ${m.name}: ${m.reason}`));
    }

    console.log('\nTo execute the live import into Supabase:');
    console.log('1. Run: node scripts/importCatalog.js --execute');
    console.log('OR');
    console.log('2. Paste and run supabase/import_balloonhouse.sql in Supabase SQL Editor.');
    return;
  }

  // --- LIVE EXECUTION ---
  console.log('----------------------------------------------------------------');
  console.log('STARTING LIVE IMPORT INTO SUPABASE...');
  console.log('----------------------------------------------------------------\n');

  // Attempt admin login if credentials present and not service role
  if (adminEmail && adminPassword && !isServiceRole) {
    console.log(`Authenticating as admin (${adminEmail})...`);
    const { error: authErr } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    });
    if (authErr) {
      console.warn(`Admin login note: ${authErr.message}`);
    } else {
      console.log('Authenticated successfully.');
    }
  }

  // Ensure subcategories exist
  let subcatsCreated = 0;
  for (const ns of newSubcategoriesNeeded) {
    if (!subMap.has(ns.name)) {
      const parentCatId = catMap.get(ns.category);
      if (parentCatId) {
        const { data: created, error: createErr } = await supabase
          .from('subcategories')
          .insert([{ name: ns.name, slug: ns.slug, category_id: parentCatId }])
          .select()
          .single();
        if (!createErr && created) {
          subMap.set(created.name, created.id);
          subcatsCreated++;
          console.log(`Created subcategory: ${created.name}`);
        }
      }
    }
  }

  let addedCount = 0;
  let skippedDuplicates = 0;
  let failedCount = 0;
  const failedItems = [];

  for (const item of importItems) {
    const catId = catMap.get(item.mainCategory);
    if (!catId) {
      failedCount++;
      failedItems.push({ name: item.name, reason: `Category "${item.mainCategory}" not found` });
      continue;
    }

    const subId = subMap.get(item.subCategory) || null;
    const compKey = makeCompositeKey(item.name, catId, subId);

    if (existingCompositeSet.has(compKey)) {
      skippedDuplicates++;
      continue;
    }

    const payload = {
      name: item.name,
      category_id: catId,
      subcategory_id: subId,
      description: item.description || null,
      price: item.price !== null && item.price !== undefined ? Number(item.price) : null,
      price_on_request: Boolean(item.price_on_request),
      unit: item.unit || '1 Piece',
      availability: 'Available on Order',
      in_stock: false,
      image_url: item.image_url || null,
      is_best_seller: false,
      is_new: true,
      features: item.features || [],
      updated_at: new Date().toISOString()
    };

    const { error: insertErr } = await supabase.from('products').insert([payload]);
    if (insertErr) {
      failedCount++;
      failedItems.push({ name: item.name, reason: insertErr.message });
    } else {
      addedCount++;
      existingCompositeSet.add(compKey);
    }
  }

  // Authoritative post-import count from Supabase
  const { data: finalProducts } = await supabase.from('products').select('id');
  const finalCount = finalProducts ? finalProducts.length : (existingProducts.length + addedCount);

  console.log('\n================================================================');
  console.log('LIVE IMPORT SUMMARY REPORT');
  console.log('================================================================');
  console.log(`Existing products before import: ${existingProducts.length}`);
  console.log(`New products added:              ${addedCount}`);
  console.log(`Duplicates skipped:              ${skippedDuplicates}`);
  console.log(`Products updated:                0 (Preserved intact)`);
  console.log(`Failed:                          ${failedCount}`);
  console.log(`Final product count:             ${finalCount}`);
  console.log('================================================================');

  if (failedItems.length > 0) {
    console.log('\nFailed Items Details:');
    failedItems.slice(0, 3).forEach(f => console.log(`  - ${f.name}: ${f.reason}`));
    if (failedItems.some(f => f.reason.includes('row-level security'))) {
      console.log('\n[NOTICE] Supabase RLS is active.');
      console.log('To execute this import with superuser permissions, run supabase/import_balloonhouse.sql in Supabase SQL Editor.');
    }
  }
}

runImporter().catch(err => {
  console.error('Fatal error running import:', err);
  process.exit(1);
});
