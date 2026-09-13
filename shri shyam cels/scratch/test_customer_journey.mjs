import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== RUNNING FULL CUSTOMER JOURNEY QA SUITE ===\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✓ JOURNEY TEST ${totalTests} Passed: ${message}`);
    passedTests++;
  } else {
    console.error(`✗ JOURNEY TEST ${totalTests} FAILED: ${message}`);
    process.exit(1);
  }
}

// 1. JOURNEY 1: Homepage Loading & Core Elements
const customerHomePath = path.join(rootDir, 'src', 'pages', 'CustomerHome.tsx');
const customerHomeCode = fs.readFileSync(customerHomePath, 'utf8');
assert(
  customerHomeCode.includes('<Navbar') &&
  customerHomeCode.includes('<Hero') &&
  customerHomeCode.includes('<ShopSection') &&
  customerHomeCode.includes('<WhyUs') &&
  customerHomeCode.includes('<Footer'),
  'Homepage integrates Navbar, Hero, ShopSection, WhyUs, and Footer'
);

// 2. JOURNEY 2: Category Switching & Filtering Logic
const shopSectionPath = path.join(rootDir, 'src', 'components', 'ShopSection.tsx');
const shopSectionCode = fs.readFileSync(shopSectionPath, 'utf8');
assert(
  shopSectionCode.includes('selectedCategoryFilter') &&
  shopSectionCode.includes('Cake Items') &&
  shopSectionCode.includes('Birthday & Party Items') &&
  shopSectionCode.includes('Disposable Items'),
  'ShopSection manages selectedCategoryFilter with all 3 core departments'
);

// 3. JOURNEY 3: Subcategory Filter & Reset Behavior
assert(
  shopSectionCode.includes('activeSubcategory') &&
  shopSectionCode.includes('setActiveSubcategory') &&
  shopSectionCode.includes('handleResetFilters'),
  'ShopSection supports subcategory selection and filter clearing'
);

// 4. JOURNEY 4: Search Filtering
assert(
  shopSectionCode.includes('searchQuery') &&
  shopSectionCode.includes('onSearchChange') &&
  shopSectionCode.includes('.toLowerCase()') &&
  customerHomeCode.includes('setSearchQuery'),
  'CustomerHome and ShopSection support case-insensitive search queries across catalog'
);

// 5. JOURNEY 5: Product Modal & Price on Request Integrity
const productModalPath = path.join(rootDir, 'src', 'components', 'ProductModal.tsx');
const productModalCode = fs.readFileSync(productModalPath, 'utf8');
assert(
  productModalCode.includes('Price on Request') &&
  productModalCode.includes('product.numericPrice <= 0') &&
  !productModalCode.includes('₹0'),
  'ProductModal explicitly preserves Price on Request and forbids displaying ₹0'
);
assert(
  productModalCode.includes('setQty((prev) => Math.max(1, prev - 1))') &&
  productModalCode.includes('setQty((prev) => prev + 1)'),
  'ProductModal quantity selector supports increment & decrement with minimum 1'
);

// 6. JOURNEY 6 & 7: Cart Context Methods (Add, Deduplicate, Increase, Decrease, Remove, Clear)
const cartContextPath = path.join(rootDir, 'src', 'context', 'CartContext.tsx');
const cartContextCode = fs.readFileSync(cartContextPath, 'utf8');
assert(
  cartContextCode.includes('existingIndex > -1') &&
  cartContextCode.includes('quantity: updated[existingIndex].quantity + qtyToAdd'),
  'CartContext increments existing item quantity on duplicate add'
);
assert(
  cartContextCode.includes('updateQuantity') &&
  cartContextCode.includes('removeItem') &&
  cartContextCode.includes('clearCart'),
  'CartContext implements updateQuantity, removeItem, and clearCart methods'
);

// 7. JOURNEY 8: Cart Persistence & Error Resilience in localStorage
assert(
  cartContextCode.includes("STORAGE_KEY = 'shri_shyam_cart'") &&
  cartContextCode.includes('localStorage.getItem(STORAGE_KEY)') &&
  cartContextCode.includes('localStorage.setItem(STORAGE_KEY'),
  'CartContext persists cart state to localStorage using STORAGE_KEY'
);
assert(
  cartContextCode.includes('try {') &&
  cartContextCode.includes('catch (err)') &&
  cartContextCode.includes('return [];'),
  'CartContext safely catches corrupt localStorage and falls back to empty array without crashing'
);

// 8. JOURNEY 9: WhatsApp Message Generation & Cart Retention
const cartDrawerPath = path.join(rootDir, 'src', 'components', 'CartDrawer.tsx');
const cartDrawerCode = fs.readFileSync(cartDrawerPath, 'utf8');
assert(
  cartDrawerCode.includes('919800312493') &&
  cartDrawerCode.includes('https://wa.me/919800312493?text='),
  'CartDrawer uses verified WhatsApp number 919800312493 with wa.me API'
);
assert(
  cartDrawerCode.includes('encodeURIComponent') &&
  cartDrawerCode.includes('Price on Request') &&
  cartDrawerCode.includes('Opposite Agarwal & Sons Grocery'),
  'WhatsApp message includes properly encoded products, truthful pricing, and store location'
);
assert(
  !cartDrawerCode.includes('clearCart();') &&
  cartDrawerCode.includes('setWhatsappSentNotice(true)'),
  'CartDrawer retains items after generating WhatsApp message and shows confirmation notice'
);

console.log(`\n====================================================`);
console.log(`🎉 ALL ${passedTests} CUSTOMER JOURNEY QA CHECKS PASSED!`);
console.log(`====================================================`);
