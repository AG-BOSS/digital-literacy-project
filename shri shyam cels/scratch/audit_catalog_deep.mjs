import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env if present
const envPath = path.join(rootDir, '.env');
let supabaseUrl = '';
let supabaseAnonKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, '');
      if (key === 'VITE_SUPABASE_URL') supabaseUrl = val;
      if (key === 'VITE_SUPABASE_ANON_KEY') supabaseAnonKey = val;
    }
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('=== RUNNING COMPREHENSIVE CATALOG & IMAGE AUDIT ===\n');

async function audit() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(name), subcategories(name)')
    .order('name');

  if (error) {
    console.error('Supabase query error:', error);
    process.exit(1);
  }

  console.log(`Total Products in Supabase: ${products.length}`);
  if (products.length !== 113) {
    console.error(`ERROR: Expected 113 products, got ${products.length}`);
    process.exit(1);
  }

  // Department counts
  const counts = { 'Cake Items': 0, 'Birthday & Party Items': 0, 'Disposable Items': 0, Other: 0 };
  const duplicateMap = new Map();
  let invalidPrices = 0;
  let priceOnRequestCount = 0;
  let validPricedCount = 0;
  let missingImages = 0;
  let externalHotlinks = 0;
  let brokenLocalAssets = 0;
  let invalidAvailability = 0;

  for (const p of products) {
    const catName = p.categories?.name || 'Unknown';
    if (counts[catName] !== undefined) {
      counts[catName]++;
    } else {
      counts.Other++;
    }

    // Duplicate key: name.toLowerCase().trim() + '::' + catName
    const dupKey = `${p.name.trim().toLowerCase()}::${catName}::${p.subcategories?.name || ''}`;
    if (duplicateMap.has(dupKey)) {
      console.warn(`Potential duplicate product: "${p.name}" in "${catName}"`);
      duplicateMap.get(dupKey).push(p.id);
    } else {
      duplicateMap.set(dupKey, [p.id]);
    }

    // Price audit
    if (p.price === null || p.price === undefined) {
      priceOnRequestCount++;
    } else if (typeof p.price === 'number') {
      if (p.price <= 0) {
        invalidPrices++;
        console.error(`Invalid non-positive price on "${p.name}": ${p.price}`);
      } else {
        validPricedCount++;
      }
    } else {
      invalidPrices++;
      console.error(`Unknown price type on "${p.name}":`, p.price);
    }

    // Availability audit
    const validStatuses = ['In Stock', 'Available on Order', 'Out of Stock'];
    if (!validStatuses.includes(p.availability)) {
      invalidAvailability++;
      console.error(`Invalid availability on "${p.name}": "${p.availability}"`);
    }

    // Image audit
    if (!p.image_url) {
      missingImages++;
    } else {
      if (p.image_url.startsWith('http://') || p.image_url.startsWith('https://')) {
        // Check if it's Supabase Storage or unwanted third party
        if (!p.image_url.includes('supabase.co')) {
          externalHotlinks++;
          console.warn(`External non-Supabase image URL on "${p.name}": ${p.image_url}`);
        }
      } else {
        // Local asset
        const cleanPath = p.image_url.startsWith('/') ? p.image_url.slice(1) : p.image_url;
        const localPath = path.join(rootDir, 'public', cleanPath);
        if (!fs.existsSync(localPath)) {
          brokenLocalAssets++;
          console.error(`Broken local asset path on "${p.name}": ${p.image_url} (checked ${localPath})`);
        }
      }
    }
  }

  console.log('\n--- Department Breakdown ---');
  console.log(`Cake Items: ${counts['Cake Items']} (Expected: 21)`);
  console.log(`Birthday & Party Items: ${counts['Birthday & Party Items']} (Expected: 80)`);
  console.log(`Disposable Items: ${counts['Disposable Items']} (Expected: 12)`);
  console.log(`Other Categories: ${counts.Other} (Expected: 0)`);

  console.log('\n--- Pricing Breakdown ---');
  console.log(`Price on Request: ${priceOnRequestCount}`);
  console.log(`Valid Numerically Priced: ${validPricedCount}`);
  console.log(`Invalid / Negative / Fake Zero Prices: ${invalidPrices}`);

  console.log('\n--- Image & Asset Integrity ---');
  console.log(`Missing Image URLs: ${missingImages}`);
  console.log(`External Third-Party Hotlinks: ${externalHotlinks}`);
  console.log(`Broken Local Asset Paths: ${brokenLocalAssets}`);

  console.log('\n--- Availability Integrity ---');
  console.log(`Invalid Availability Values: ${invalidAvailability}`);

  // Summary validation
  const errors = [];
  if (counts['Cake Items'] !== 21) errors.push(`Cake Items count is ${counts['Cake Items']}, expected 21`);
  if (counts['Birthday & Party Items'] !== 80) errors.push(`Birthday & Party Items count is ${counts['Birthday & Party Items']}, expected 80`);
  if (counts['Disposable Items'] !== 12) errors.push(`Disposable Items count is ${counts['Disposable Items']}, expected 12`);
  if (invalidPrices > 0) errors.push(`Found ${invalidPrices} invalid prices`);
  if (invalidAvailability > 0) errors.push(`Found ${invalidAvailability} invalid availability values`);
  if (externalHotlinks > 0) errors.push(`Found ${externalHotlinks} external hotlinks`);
  if (brokenLocalAssets > 0) errors.push(`Found ${brokenLocalAssets} broken local asset files`);

  if (errors.length > 0) {
    console.error('\n✗ AUDIT FAILED with errors:');
    errors.forEach(e => console.error(' - ' + e));
    process.exit(1);
  } else {
    console.log('\n✓ ALL CATALOG & ASSET INTEGRITY AUDITS PASSED WITH ZERO ERRORS!');
  }
}

audit();
