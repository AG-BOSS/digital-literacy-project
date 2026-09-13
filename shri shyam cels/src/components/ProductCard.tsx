import React, { useState } from 'react';
import type { Product } from '../types';
import { MessageSquare, Eye, ShoppingBag, Sparkles, Check, Clock, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onAddToCart
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const isOutOfStock = product.availability === 'Out of Stock' || product.inStock === false;
  const isAvailableOnOrder = product.availability === 'Available on Order';
  const isInStock = !isOutOfStock && !isAvailableOnOrder;
  const isPriceOnRequest = product.price === 'Price on Request' || product.numericPrice <= 0;

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Standardized, customer-friendly enquiry message
    const message = [
      'Hello Shri Shyam Celebrations,',
      '',
      'I am interested in this product:',
      '',
      `Product: ${product.name}`,
      `Category: ${product.mainCategory}${product.subCategory ? ` > ${product.subCategory}` : ''}`,
      `Unit / Pack: ${product.unit}`,
      `Availability: ${product.availability}`,
      '',
      'Please share the current price and availability.',
      '',
      'Thank you.'
    ].join('\n');

    const url = `https://wa.me/919800312493?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    if (onAddToCart) {
      onAddToCart(product, e);
    }

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenQuickView(product);
        }
      }}
      aria-label={`View details for ${product.name}`}
      className="group cursor-pointer rounded-2xl bg-[#071A36] border border-[#C99A3E]/20 hover:border-[#C99A3E]/70 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative focus:outline-none focus:ring-2 focus:ring-[#C99A3E]"
    >
      {/* 1. PRODUCT IMAGE CONTAINER (Consistent Aspect Ratio & No Distortion/Chopping) */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#051329] flex items-center justify-center p-3 border-b border-white/5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Safe fallback if localized file fails to load
            const target = e.target as HTMLImageElement;
            if (target.src.includes('category_')) return;
            target.src =
              product.mainCategory === 'Disposable Items'
                ? '/assets/category_disposables.jpg'
                : product.mainCategory === 'Birthday & Party Items'
                ? '/assets/category_balloons.jpg'
                : '/assets/category_cakes.jpg';
          }}
        />

        {/* Subcategory Pill Tag */}
        <span className="absolute top-2.5 left-2.5 bg-[#071A36]/90 backdrop-blur-md border border-[#C99A3E]/30 text-[#C99A3E] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
          {product.subCategory || product.mainCategory}
        </span>

        {/* Truthful Availability Badge */}
        <span
          className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border backdrop-blur-md ${
            isOutOfStock
              ? 'bg-red-950/80 border-red-500/40 text-red-300'
              : isInStock
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
          }`}
        >
          {isOutOfStock ? (
            <AlertCircle className="w-2.5 h-2.5 text-red-400" />
          ) : isInStock ? (
            <Check className="w-2.5 h-2.5 text-emerald-400" />
          ) : (
            <Clock className="w-2.5 h-2.5 text-amber-400" />
          )}
          <span>{product.availability}</span>
        </span>

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px] pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-[#071A36]/90 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#C99A3E]/60 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-[#C99A3E]" /> Quick View
          </span>
        </div>
      </div>

      {/* 2. CARD CONTENT & HIERARCHY */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unit / Pack Specification */}
          <div className="text-[11px] font-medium text-gray-400 mb-1 flex items-center gap-1">
            <span className="text-[#C99A3E]">Unit:</span>
            <span>{product.unit || '1 Piece'}</span>
          </div>

          {/* Product Name */}
          <h3
            title={product.name}
            className="text-xs sm:text-sm font-bold text-white group-hover:text-[#C99A3E] transition-colors line-clamp-2 leading-snug min-h-[2.4rem]"
          >
            {product.name}
          </h3>

          {/* Price Presentation (₹XXX or Price on Request) */}
          <div className="mt-2.5">
            {isPriceOnRequest ? (
              <div className="inline-flex items-center gap-1.5 bg-[#0B2545] border border-[#C99A3E]/30 text-[#C99A3E] font-bold text-xs px-2.5 py-1 rounded-md">
                <Sparkles className="w-3 h-3 text-[#C99A3E]" />
                <span>Price on Request</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-[#C99A3E] font-extrabold text-base sm:text-lg tracking-tight">
                  ₹{product.numericPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-gray-400">/ {product.unit || 'piece'}</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. ACTIONS (Prominent WhatsApp Enquiry + Add to Cart / Quick View) */}
        <div className="pt-2 border-t border-white/10 space-y-1.5">
          {/* Primary WhatsApp Enquiry Button */}
          <button
            onClick={handleWhatsAppEnquiry}
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md active:scale-[0.98] min-h-[40px]"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>Enquire on WhatsApp</span>
          </button>

          {/* Secondary Action: Add to Cart with temporary '✓ Added' feedback */}
          {onAddToCart && (
            <button
              onClick={handleAddToCartClick}
              disabled={isOutOfStock}
              aria-label={
                isOutOfStock
                  ? `${product.name} is out of stock`
                  : justAdded
                  ? `Added ${product.name} to cart`
                  : `Add ${product.name} to cart`
              }
              className={`w-full flex items-center justify-center gap-1.5 font-semibold text-xs py-1.5 px-3 rounded-xl transition-all min-h-[32px] ${
                isOutOfStock
                  ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                  : justAdded
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-inner'
                  : 'bg-[#0B2545] hover:bg-[#C99A3E] text-[#C99A3E] hover:text-[#071A36] border border-[#C99A3E]/30 active:scale-98'
              }`}
            >
              {isOutOfStock ? (
                <span>Out of Stock</span>
              ) : justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>✓ Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
