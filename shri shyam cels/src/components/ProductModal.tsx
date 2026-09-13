import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import {
  X,
  MessageSquare,
  ShoppingBag,
  CheckCircle,
  Sparkles,
  Package,
  Plus,
  Minus,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset quantity, justAdded state, and listen for Escape key
  useEffect(() => {
    setQty(1);
    setJustAdded(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const isOutOfStock = product.availability === 'Out of Stock' || product.inStock === false;
  const isAvailableOnOrder = product.availability === 'Available on Order';
  const isInStock = !isOutOfStock && !isAvailableOnOrder;
  const isPriceOnRequest = product.price === 'Price on Request' || product.numericPrice <= 0;

  const handleWhatsAppEnquiry = () => {
    const message = [
      'Hello Shri Shyam Celebrations,',
      '',
      'I am interested in this product:',
      '',
      `Product: ${product.name}`,
      `Category: ${product.mainCategory}${product.subCategory ? ` > ${product.subCategory}` : ''}`,
      `Unit / Pack: ${product.unit}`,
      `Availability: ${product.availability}`,
      `Desired Quantity: ${qty}`,
      '',
      'Please share the current price and availability.',
      '',
      'Thank you.'
    ].join('\n');

    const url = `https://wa.me/919800312493?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCartClick = () => {
    if (isOutOfStock) return;
    const safeQty = Math.max(1, Math.floor(qty));
    onAddToCart(product, safeQty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 450);
  };

  const hasValidDescription = product.description && product.description.trim().length > 0;
  const hasValidFeatures = Array.isArray(product.features) && product.features.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0B2545] border border-[#C99A3E]/40 rounded-3xl overflow-hidden shadow-2xl text-white my-auto max-h-[92vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details modal"
          className="absolute top-3.5 right-3.5 z-20 p-2 bg-[#071A36]/90 hover:bg-[#C99A3E] text-gray-300 hover:text-[#071A36] rounded-full transition-colors border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C99A3E]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Image (Uncropped, aspect-square on clean background) */}
            <div className="relative bg-[#051329] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 min-h-[260px] md:min-h-[360px]">
              <img
                src={product.image}
                alt={product.name}
                decoding="async"
                className="max-h-72 w-auto object-contain drop-shadow-xl"
                onError={(e) => {
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

              {/* Subcategory Pill */}
              <div className="absolute top-3.5 left-3.5 bg-[#C99A3E] text-[#071A36] font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {product.subCategory || product.mainCategory}
              </div>

              {/* Availability Badge */}
              <div className="absolute bottom-3.5 left-3.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md border backdrop-blur-md ${
                    isOutOfStock
                      ? 'bg-red-950/90 border-red-500/50 text-red-300'
                      : isInStock
                      ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
                      : 'bg-amber-950/90 border-amber-500/50 text-amber-300'
                  }`}
                >
                  {isOutOfStock ? (
                    <AlertCircle className="w-3 h-3 text-red-400" />
                  ) : isInStock ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Clock className="w-3 h-3 text-amber-400" />
                  )}
                  <span>{product.availability}</span>
                </span>
              </div>
            </div>

            {/* Right: Product Details & Purchase/Enquiry Options */}
            <div className="p-5 sm:p-6 md:p-7 flex flex-col justify-between space-y-5">
              <div>
                {/* Category Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C99A3E] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{product.mainCategory}</span>
                  {product.subCategory && (
                    <>
                      <span className="text-gray-500">&gt;</span>
                      <span className="text-gray-300">{product.subCategory}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3
                  id="modal-product-title"
                  className="text-lg sm:text-xl font-serif-display font-bold text-white mb-3 leading-snug"
                >
                  {product.name}
                </h3>

                {/* Price & Unit Details */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  {isPriceOnRequest ? (
                    <div className="inline-flex items-center gap-1.5 bg-[#071A36] border border-[#C99A3E]/40 text-[#C99A3E] font-bold text-sm px-3 py-1.5 rounded-xl shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
                      <span>Price on Request</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[#C99A3E] font-extrabold text-2xl tracking-tight">
                        ₹{product.numericPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400">/ {product.unit || 'piece'}</span>
                    </div>
                  )}

                  <span className="inline-flex items-center gap-1 bg-[#071A36] border border-white/10 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-xl">
                    <Package className="w-3.5 h-3.5 text-[#C99A3E]" />
                    <span>Unit: {product.unit || '1 Piece'}</span>
                  </span>
                </div>

                {/* Store note */}
                <p className="text-[11px] text-gray-400 italic mb-4">
                  📍 Local celebration store: WhatsApp enquiry gives immediate confirmed shop price and stock status for pickup or local delivery.
                </p>

                {/* Description (Rendered only if valid) */}
                {hasValidDescription && (
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-[#071A36]/40 p-3 rounded-xl border border-white/5">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Key Features (Rendered only if array has items) */}
                {hasValidFeatures && (
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Product Highlights:</p>
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                        <CheckCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Controls */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between bg-[#071A36] p-2 rounded-xl border border-white/10">
                  <span className="text-xs font-semibold text-gray-300 pl-2">Select Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center hover:bg-[#C99A3E] hover:text-[#071A36] transition-colors disabled:opacity-30 disabled:hover:bg-[#0B2545] disabled:hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-white w-8 text-center select-none">{qty}</span>
                    <button
                      onClick={() => setQty((prev) => prev + 1)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center hover:bg-[#C99A3E] hover:text-[#071A36] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Enquiry & Cart Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleWhatsAppEnquiry}
                    aria-label={`Enquire about ${product.name} on WhatsApp`}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] text-xs min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>WhatsApp Enquiry</span>
                  </button>

                  <button
                    onClick={handleAddToCartClick}
                    disabled={isOutOfStock}
                    aria-label={
                      isOutOfStock
                        ? `${product.name} is out of stock`
                        : justAdded
                        ? `Added ${qty} of ${product.name} to cart`
                        : `Add ${qty} of ${product.name} to cart`
                    }
                    className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl transition-all text-xs min-h-[44px] ${
                      isOutOfStock
                        ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                        : justAdded
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-inner'
                        : 'bg-gradient-to-r from-[#C99A3E] to-[#E5BA55] text-[#071A36] hover:shadow-lg active:scale-[0.98]'
                    }`}
                  >
                    {isOutOfStock ? (
                      <span>Out of Stock</span>
                    ) : justAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>✓ Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add {qty} to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
