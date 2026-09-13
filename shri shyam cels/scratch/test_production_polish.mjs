import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== RUNNING PHASE 6 PRODUCTION POLISH & SEO TEST SUITE ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✓ TEST ${totalTests} Passed: ${message}`);
    passedTests++;
  } else {
    console.error(`✗ TEST ${totalTests} FAILED: ${message}`);
    process.exit(1);
  }
}

// 1. Check index.html for Title, Meta Description, Viewport, Theme-color
const indexHtmlPath = path.join(rootDir, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'index.html exists');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

assert(
  indexHtml.includes('<title>Shri Shyam Celebrations | Birthday, Cake &amp; Party Items</title>') ||
  indexHtml.includes('<title>Shri Shyam Celebrations | Birthday, Cake & Party Items</title>'),
  'Proper title tag exists in index.html'
);

assert(
  indexHtml.includes('name="description"') &&
  indexHtml.includes('Shri Shyam Celebrations') &&
  indexHtml.includes('WhatsApp'),
  'Natural, informative meta description exists in index.html'
);

assert(
  indexHtml.includes('name="theme-color" content="#071A36"'),
  'Theme-color meta tag matches navy brand color'
);

// 2. Check Open Graph & Twitter Cards
assert(
  indexHtml.includes('property="og:title"') &&
  indexHtml.includes('property="og:description"') &&
  indexHtml.includes('property="og:image"') &&
  indexHtml.includes('property="og:type" content="website"'),
  'Open Graph metadata (og:title, og:description, og:image, og:type) exists'
);

assert(
  indexHtml.includes('name="twitter:card"') &&
  indexHtml.includes('name="twitter:title"') &&
  indexHtml.includes('name="twitter:image"'),
  'Twitter/X card metadata exists'
);

// 3. Check Local Asset Reference for Social Previews (No external CDNs)
assert(
  indexHtml.includes('/assets/logo_banner.jpg'),
  'Social preview image references verified local asset /assets/logo_banner.jpg'
);
assert(
  fs.existsSync(path.join(rootDir, 'public', 'assets', 'logo_banner.jpg')),
  'Referenced social preview asset exists in public/assets/'
);

// 4. Check robots.txt
const robotsTxtPath = path.join(rootDir, 'public', 'robots.txt');
assert(fs.existsSync(robotsTxtPath), 'public/robots.txt exists');
const robotsTxt = fs.readFileSync(robotsTxtPath, 'utf8');
assert(robotsTxt.includes('Allow: /'), 'robots.txt allows public store browsing');
assert(
  robotsTxt.includes('Disallow: /admin') && robotsTxt.includes('Disallow: /admin/login'),
  'robots.txt blocks crawlers from indexing /admin routes'
);
assert(
  robotsTxt.includes('Sitemap: /sitemap.xml'),
  'robots.txt safely references /sitemap.xml without hardcoded domain'
);

// 5. Check sitemap.xml
const sitemapXmlPath = path.join(rootDir, 'public', 'sitemap.xml');
assert(fs.existsSync(sitemapXmlPath), 'public/sitemap.xml exists');
const sitemapXml = fs.readFileSync(sitemapXmlPath, 'utf8');
assert(sitemapXml.includes('<loc>/</loc>'), 'sitemap.xml contains public storefront URL');
assert(
  !sitemapXml.includes('/admin'),
  'sitemap.xml strictly excludes private /admin routes'
);

// 6. Check Admin Route Noindex implementation (SeoHead)
const seoHeadPath = path.join(rootDir, 'src', 'components', 'SeoHead.tsx');
assert(fs.existsSync(seoHeadPath), 'src/components/SeoHead.tsx exists');
const seoHeadCode = fs.readFileSync(seoHeadPath, 'utf8');
assert(
  seoHeadCode.includes('noindex,nofollow') && seoHeadCode.includes('index,follow'),
  'SeoHead supports dynamic noindex,nofollow for admin routes'
);

const adminLayoutPath = path.join(rootDir, 'src', 'components', 'admin', 'AdminLayout.tsx');
const adminLayoutCode = fs.readFileSync(adminLayoutPath, 'utf8');
assert(
  adminLayoutCode.includes('<SeoHead') && adminLayoutCode.includes('noindex={true}'),
  'AdminLayout applies noindex={true} across all admin dashboard screens'
);

const adminLoginPath = path.join(rootDir, 'src', 'pages', 'admin', 'AdminLogin.tsx');
const adminLoginCode = fs.readFileSync(adminLoginPath, 'utf8');
assert(
  adminLoginCode.includes('<SeoHead') && adminLoginCode.includes('noindex={true}'),
  'AdminLogin applies noindex={true} to keep login out of search index'
);

// 7. Check Structured Data / JSON-LD
assert(
  indexHtml.includes('"@type": "Store"') &&
  indexHtml.includes('"name": "Shri Shyam Celebrations"') &&
  indexHtml.includes('"telephone": "+919800312493"') &&
  indexHtml.includes('Opposite Agarwal & Sons Grocery') &&
  !indexHtml.includes('"streetAddress"'),
  'Truthful JSON-LD Schema.org Store schema is present without misleading streetAddress'
);

assert(
  !indexHtml.includes('fake') &&
  !indexHtml.includes('4.9') &&
  !indexHtml.includes('5.0') &&
  !indexHtml.includes('AggregateRating'),
  'Zero fake reviews, ratings, or opening hours in JSON-LD'
);

// 8. Check Code Splitting & Lazy Loading for Admin Routes
const appTsxPath = path.join(rootDir, 'src', 'App.tsx');
const appTsxCode = fs.readFileSync(appTsxPath, 'utf8');
assert(
  (appTsxCode.includes('React.lazy') || appTsxCode.includes('lazy(')) &&
  appTsxCode.includes('Suspense') &&
  appTsxCode.includes('./pages/admin/AdminDashboard'),
  'Admin routes are code-split using React.lazy / lazy() and Suspense'
);

// 9. Check 404 Not Found Route Handling
const notFoundPath = path.join(rootDir, 'src', 'pages', 'NotFound.tsx');
assert(fs.existsSync(notFoundPath), 'src/pages/NotFound.tsx exists');
assert(
  appTsxCode.includes('path="*"') && appTsxCode.includes('NotFound'),
  'App.tsx has catch-all wildcard route pointing to friendly NotFound page'
);

// 10. Check Image Performance Attributes in Components
const productCardPath = path.join(rootDir, 'src', 'components', 'ProductCard.tsx');
const productCardCode = fs.readFileSync(productCardPath, 'utf8');
assert(
  productCardCode.includes('loading="lazy"') && productCardCode.includes('decoding="async"'),
  'ProductCard uses loading="lazy" and decoding="async"'
);

const heroPath = path.join(rootDir, 'src', 'components', 'Hero.tsx');
const heroCode = fs.readFileSync(heroPath, 'utf8');
assert(
  heroCode.includes('fetchPriority="high"') && heroCode.includes('decoding="async"'),
  'Hero above-the-fold image uses fetchPriority="high" and decoding="async"'
);

// 11. Check Accessibility: Reduced Motion & Focus
const indexCssPath = path.join(rootDir, 'src', 'index.css');
const indexCssCode = fs.readFileSync(indexCssPath, 'utf8');
assert(
  indexCssCode.includes('prefers-reduced-motion: reduce'),
  'prefers-reduced-motion media query implemented in index.css'
);
assert(
  indexCssCode.includes(':focus-visible'),
  ':focus-visible outline styling implemented in index.css'
);

// 12. Check Escape-key listener & Dialog ARIA in ProductModal and CartDrawer
const modalPath = path.join(rootDir, 'src', 'components', 'ProductModal.tsx');
const modalCode = fs.readFileSync(modalPath, 'utf8');
assert(
  modalCode.includes("e.key === 'Escape'") &&
  modalCode.includes('role="dialog"') &&
  modalCode.includes('aria-modal="true"'),
  'ProductModal implements Escape key listener, role="dialog", and aria-modal'
);

const cartDrawerPath = path.join(rootDir, 'src', 'components', 'CartDrawer.tsx');
const cartDrawerCode = fs.readFileSync(cartDrawerPath, 'utf8');
assert(
  cartDrawerCode.includes("e.key === 'Escape'") &&
  cartDrawerCode.includes('role="dialog"') &&
  cartDrawerCode.includes('aria-modal="true"'),
  'CartDrawer implements Escape key listener, role="dialog", and aria-modal'
);

// 13. Security Audit: Check for exposed service_role keys or secrets
const srcFiles = [];
function findSrcFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findSrcFiles(fullPath);
    } else if (/\.(ts|tsx|js|mjs|html|css)$/.test(entry.name)) {
      srcFiles.push(fullPath);
    }
  }
}
findSrcFiles(path.join(rootDir, 'src'));

let secretFound = false;
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (
    content.includes('service_role') ||
    content.includes('SUPABASE_SERVICE_ROLE_KEY') ||
    /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/.test(content)
  ) {
    // Check if it's the public anon key or service role
    if (content.includes('service_role')) {
      secretFound = true;
      console.error(`Found potential service_role reference in ${file}`);
    }
  }
}
assert(!secretFound, 'Zero service_role keys or secret tokens found in src/ files');

// 14. Check No Localhost Hardcoded in Production Metadata
assert(
  !indexHtml.includes('localhost') && !indexHtml.includes('127.0.0.1'),
  'No hardcoded localhost in index.html'
);
assert(
  !robotsTxt.includes('localhost') && !robotsTxt.includes('127.0.0.1'),
  'No hardcoded localhost in robots.txt'
);
assert(
  !sitemapXml.includes('localhost') && !sitemapXml.includes('127.0.0.1'),
  'No hardcoded localhost in sitemap.xml'
);

// 15. Check that build output (dist/) exists and passes
const distIndex = path.join(rootDir, 'dist', 'index.html');
const distRobots = path.join(rootDir, 'dist', 'robots.txt');
const distSitemap = path.join(rootDir, 'dist', 'sitemap.xml');
assert(
  fs.existsSync(distIndex) && fs.existsSync(distRobots) && fs.existsSync(distSitemap),
  'Production dist folder built with index.html, robots.txt, and sitemap.xml'
);

console.log(`\n====================================================`);
console.log(`🎉 ALL ${passedTests} PHASE 6 PRODUCTION POLISH TESTS PASSED!`);
console.log(`====================================================`);
