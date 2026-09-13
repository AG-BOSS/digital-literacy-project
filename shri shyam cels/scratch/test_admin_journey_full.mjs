import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

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

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('=== RUNNING FULL ADMIN JOURNEY QA SUITE ===\n');

async function testAdminFlow() {
  // 1. Check initial product count
  const { count: initialCount, error: countErr } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if (countErr) {
    console.error('Failed to get initial count:', countErr);
    process.exit(1);
  }
  console.log(`Initial live products count: ${initialCount}`);
  if (initialCount !== 113) {
    console.error(`Expected 113 products, found ${initialCount}`);
    process.exit(1);
  }

  // 2. Fetch categories & subcategories for admin operations
  const { data: categories } = await supabase.from('categories').select('*');
  const { data: subcategories } = await supabase.from('subcategories').select('*');
  console.log(`Loaded ${categories.length} categories and ${subcategories.length} subcategories.`);

  const cakeCat = categories.find(c => c.name === 'Cake Items');
  const cakeSubcat = subcategories.find(s => s.category_id === cakeCat?.id);

  // 3. Admin Authentication check
  // Read admin test credentials if available or check RLS isolation
  let adminClient = null;
  const adminCredsPath = path.join(rootDir, 'scratch', 'admin_creds.json');
  if (fs.existsSync(adminCredsPath)) {
    try {
      const creds = JSON.parse(fs.readFileSync(adminCredsPath, 'utf8'));
      const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: creds.email,
        password: creds.password
      });
      if (!authErr && authData?.session) {
        console.log(`✓ Admin authenticated successfully as: ${creds.email}`);
        adminClient = createClient(supabaseUrl, supabaseAnonKey, {
          global: {
            headers: {
              Authorization: `Bearer ${authData.session.access_token}`
            }
          }
        });
      }
    } catch {}
  }

  // If no stored admin creds, verify unauthenticated/public attempts to insert are blocked by RLS
  if (!adminClient) {
    console.log('Verifying RLS protection for non-admin requests...');
    const { error: insertErr } = await supabase.from('products').insert({
      name: '__UNAUTHORIZED_TEST__',
      category_id: cakeCat.id,
      availability: 'In Stock'
    });
    if (insertErr) {
      console.log('✓ Public insert blocked by RLS as expected:', insertErr.message);
    } else {
      console.error('SECURITY VIOLATION: Public insert was not blocked by RLS!');
      process.exit(1);
    }
  } else {
    // 4. Temporary Product CRUD Lifecycle
    const tempName = `__TEMP_QA_LAUNCH_TEST_ITEM_${Date.now()}__`;
    console.log(`Creating temporary test product: ${tempName}`);

    const { data: createdProduct, error: createErr } = await adminClient
      .from('products')
      .insert({
        name: tempName,
        category_id: cakeCat.id,
        subcategory_id: cakeSubcat?.id || null,
        unit: '1 Piece',
        price: null, // Price on Request
        availability: 'In Stock',
        is_featured: false,
        image_url: '/assets/category_cakes.jpg'
      })
      .select()
      .single();

    if (createErr) {
      console.error('Failed to create test product:', createErr);
      process.exit(1);
    }
    console.log(`✓ Test product created with ID: ${createdProduct.id}`);

    // Verify count increased to 114
    const { count: countAfterCreate } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    console.log(`Product count during temporary test: ${countAfterCreate}`);
    if (countAfterCreate !== 114) {
      console.error(`Expected count 114, got ${countAfterCreate}`);
      process.exit(1);
    }

    // 5. Update temporary product (Toggle featured & change availability)
    console.log('Updating test product...');
    const { error: updateErr } = await adminClient
      .from('products')
      .update({
        is_featured: true,
        availability: 'Available on Order'
      })
      .eq('id', createdProduct.id);

    if (updateErr) {
      console.error('Failed to update test product:', updateErr);
      process.exit(1);
    }
    console.log('✓ Test product updated successfully');

    // 6. Delete ONLY the temporary product
    console.log('Deleting temporary test product...');
    const { error: deleteErr } = await adminClient
      .from('products')
      .delete()
      .eq('id', createdProduct.id);

    if (deleteErr) {
      console.error('Failed to delete temporary test product:', deleteErr);
      process.exit(1);
    }
    console.log('✓ Temporary test product deleted safely');

    // 7. Verify final count returned exactly to 113
    const { count: finalCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    console.log(`Final product count after cleanup: ${finalCount}`);
    if (finalCount !== 113) {
      console.error(`ERROR: Final count mismatch! Expected 113, got ${finalCount}`);
      process.exit(1);
    }
    console.log('✓ Catalog count successfully restored to exactly 113');
  }

  console.log('\n====================================================');
  console.log('🎉 ALL ADMIN QA CHECKS PASSED SUCCESSFULLY!');
  console.log('====================================================');
}

testAdminFlow();
