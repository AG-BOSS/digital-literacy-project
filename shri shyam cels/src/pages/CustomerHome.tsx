import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CelebrationThemes } from '../components/CelebrationThemes';
import { QuickPaths } from '../components/QuickPaths';
import { ShopSection } from '../components/ShopSection';
import { PartyBuilder } from '../components/PartyBuilder';
import { WhyUs } from '../components/WhyUs';
import { WhatsAppCtaSection } from '../components/WhatsAppCtaSection';
import { StoreLocationSection } from '../components/StoreLocationSection';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { CartDrawer } from '../components/CartDrawer';
import { ProductModal } from '../components/ProductModal';
import { PRODUCTS } from '../data/products';
import { fetchProducts, type BackendStatus } from '../services/productService';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { Check, ShoppingBag } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

export function CustomerHome() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    isLive: false,
    source: 'local',
    itemCount: PRODUCTS.length
  });
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedSubCategoryFilter, setSelectedSubCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [featuredQuickViewProduct, setFeaturedQuickViewProduct] = useState<Product | null>(null);

  // Global Cart Context
  const {
    items: cartItems,
    isOpen: isCartOpen,
    totalItems: cartCount,
    openCart,
    closeCart,
    addToCart,
    addMultipleToCart,
    updateQuantity,
    removeItem,
    clearCart,
    feedbackProduct
  } = useCart();

  // Fetch products from Supabase on mount, falling back to local PRODUCTS
  useEffect(() => {
    let isMounted = true;
    fetchProducts().then(({ products: loadedProducts, status }) => {
      if (isMounted) {
        setProducts(loadedProducts);
        setBackendStatus(status);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setSelectedSubCategoryFilter('All');
  };

  const handleSelectThemeFilter = (mainCategory: string, subCategory: string) => {
    setSelectedCategoryFilter(mainCategory);
    setSelectedSubCategoryFilter(subCategory);
  };

  const handleViewAllProducts = () => {
    setSelectedCategoryFilter('All');
    setSelectedSubCategoryFilter('All');
    setSearchQuery('');
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071A36] text-[#F8F3E8] font-sans selection:bg-[#C99A3E] selection:text-[#071A36]">
      <SeoHead />
      {/* 1. Navigation Bar with Live Cart Indicator */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={openCart}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Sections */}
      <main>
        {/* 2. Hero Section */}
        <Hero onExploreClick={handleViewAllProducts} />

        {/* 3. Shop by Category (Dynamic Counts) */}
        <CategorySection
          products={products}
          onSelectCategoryFilter={handleSelectCategory}
          onSelectSubCategoryFilter={setSelectedSubCategoryFilter}
        />

        {/* 4. Featured Products (Deterministic 6–8 items Preview) */}
        <FeaturedProducts
          products={products}
          onOpenQuickView={setFeaturedQuickViewProduct}
          onAddToCart={addToCart}
          onViewAllProducts={handleViewAllProducts}
        />

        {/* 5. Birthday / Celebration Themes (Subcategory Discovery) */}
        <CelebrationThemes
          products={products}
          onSelectFilter={handleSelectThemeFilter}
        />

        {/* 6. Quick Shopping Paths ("What are you celebrating?") */}
        <QuickPaths
          onSelectCategoryFilter={handleSelectCategory}
          onSelectSubCategoryFilter={setSelectedSubCategoryFilter}
        />

        {/* 7. Full Store Catalog Section */}
        <ShopSection
          products={products}
          backendStatus={backendStatus}
          onAddToCart={addToCart}
          selectedCategoryFilter={selectedCategoryFilter}
          onSelectCategoryFilter={handleSelectCategory}
          selectedSubCategoryFilter={selectedSubCategoryFilter}
          onSelectSubCategoryFilter={setSelectedSubCategoryFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isLoading={isLoading}
        />

        {/* 8. Celebration Party Pack Builder */}
        <PartyBuilder onAddMultipleToCart={addMultipleToCart} />

        {/* 9. Why Shop With Shri Shyam (Truthful Trust Points) */}
        <WhyUs />

        {/* 10. Dedicated WhatsApp Conversion CTA */}
        <WhatsAppCtaSection />

        {/* 11. Local Store Location Section */}
        <StoreLocationSection />
      </main>

      {/* 12. Footer with Interactive Cart & Department Links */}
      <Footer onSelectCategoryFilter={handleSelectCategory} />

      {/* Floating Action WhatsApp Button */}
      <WhatsAppButton />

      {/* Enquiry Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      {/* Quick View Modal for Featured Products */}
      <ProductModal
        product={featuredQuickViewProduct}
        onClose={() => setFeaturedQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Subtle Floating Toast Confirmation when adding to Cart */}
      {feedbackProduct && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 bg-[#0B2545]/95 border border-[#C99A3E]/60 text-white p-3 sm:px-4 sm:py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-slideUp backdrop-blur-md max-w-sm sm:max-w-md"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-white">
                <span>✓ Added to enquiry cart</span>
                {feedbackProduct.quantity > 1 && (
                  <span className="bg-[#C99A3E] text-[#071A36] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                    +{feedbackProduct.quantity}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-300 truncate">
                {feedbackProduct.name}
              </p>
            </div>
          </div>

          <button
            onClick={openCart}
            aria-label="Open enquiry cart"
            className="shrink-0 flex items-center gap-1.5 bg-[#C99A3E] hover:bg-[#E5BA55] text-[#071A36] font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
        </aside>
      )}
    </div>
  );
}

export default CustomerHome;
