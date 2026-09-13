import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Package,
  Check,
  ShoppingBasket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onRemoveItem?: (productId: string) => void;
  onClearCart?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  items: propItems,
  onUpdateQuantity: propOnUpdateQuantity,
  onRemoveItem: propOnRemoveItem,
  onClearCart: propOnClearCart
}) => {
  const cart = useCart();

  // Support both context and props
  const isOpen = propIsOpen !== undefined ? propIsOpen : cart.isOpen;
  const onClose = propOnClose || cart.closeCart;
  const items = propItems !== undefined ? propItems : cart.items;
  const onUpdateQuantity = propOnUpdateQuantity || cart.updateQuantity;
  const onRemoveItem = propOnRemoveItem || cart.removeItem;
  const onClearCart = propOnClearCart || cart.clearCart;

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [whatsappSentNotice, setWhatsappSentNotice] = useState(false);

  // Close drawer on Escape key
  useEffect(() => {
    if (!isOpen) {
      setShowClearConfirm(false);
      setWhatsappSentNotice(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Total items represents sum of all product quantities (e.g. 5 balloons + 1 cake topper = 6)
  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Separate priced vs price-on-request items for transparent pricing
  const pricedItems = items.filter(
    (item) => item.product.numericPrice > 0 && item.product.price !== 'Price on Request'
  );
  const requestItems = items.filter(
    (item) => item.product.price === 'Price on Request' || item.product.numericPrice <= 0
  );

  const knownSubtotal = pricedItems.reduce(
    (acc, item) => acc + item.product.numericPrice * item.quantity,
    0
  );

  // Generate clean, human-readable WhatsApp Enquiry Message
  const handleEnquireWhatsApp = () => {
    if (items.length === 0) return;

    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#C99A3E', '#25D366', '#C2185B', '#F8F3E8']
      });
    } catch {}

    const itemListText = items
      .map((item, idx) => {
        const cat =
          item.product.mainCategory +
          (item.product.subCategory ? ` > ${item.product.subCategory}` : '');
        const hasPrice =
          item.product.numericPrice > 0 && item.product.price !== 'Price on Request';
        const priceStr = hasPrice
          ? `₹${item.product.numericPrice.toLocaleString('en-IN')} / ${item.product.unit || 'unit'}`
          : 'Price on Request';

        return `${idx + 1}. *${item.product.name}*\n   Quantity: ${item.quantity}\n   Category: ${cat}\n   Unit: ${item.product.unit || '1 Piece'}\n   Price: ${priceStr}`;
      })
      .join('\n\n');

    let summaryBlock = `\n\n*Total Selected Items:* ${totalItems}`;
    if (pricedItems.length > 0 && requestItems.length === 0) {
      summaryBlock += `\n*Known Item Value:* ₹${knownSubtotal.toLocaleString('en-IN')}`;
    } else if (pricedItems.length > 0 && requestItems.length > 0) {
      summaryBlock += `\n*Known Item Value:* ₹${knownSubtotal.toLocaleString('en-IN')}\n*Additional Items:* ${requestItems.length} item(s) (Price on Request)`;
    } else {
      summaryBlock += `\n*Estimated Price:* Price on Request (To be confirmed by store)`;
    }

    const message = [
      'Hello Shri Shyam Celebrations,',
      '',
      'I would like to enquire about the following products from your website:',
      '',
      itemListText,
      summaryBlock,
      '*Store Location for Pickup/Delivery:* Opposite Agarwal & Sons Grocery',
      '',
      'Please share the current price and availability for these items.',
      '',
      'Thank you.'
    ].join('\n');

    // WhatsApp URL with existing primary phone number
    const whatsappUrl = `https://wa.me/919800312493?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show persistent post-enquiry feedback without wiping the cart
    setWhatsappSentNotice(true);
  };

  const handleConfirmClear = () => {
    onClearCart();
    setShowClearConfirm(false);
  };

  const handleBrowseCatalog = () => {
    onClose();
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
      className="fixed inset-0 z-50 overflow-hidden animate-fadeIn"
    >
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (Right side on Desktop, Full screen / near full screen on Mobile) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-[#071A36] border-l border-[#C99A3E]/30 text-white shadow-2xl flex flex-col justify-between h-full">
          
          {/* 1. Header */}
          <div className="p-4 sm:p-5 bg-[#0B2545] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C99A3E]/20 border border-[#C99A3E]/30 flex items-center justify-center text-[#C99A3E]">
                <ShoppingBag className="w-5 h-5 text-[#C99A3E]" />
              </div>
              <div>
                <h2 id="cart-drawer-heading" className="font-serif-display font-bold text-base sm:text-lg text-white">
                  YOUR ENQUIRY CART
                </h2>
                <p className="text-xs text-gray-300">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'} selected ({items.length} {items.length === 1 ? 'product' : 'products'})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close enquiry cart"
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C99A3E]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Post-WhatsApp Feedback Banner */}
          {whatsappSentNotice && (
            <div className="p-3 bg-emerald-950/90 border-b border-emerald-500/40 px-4 flex items-start gap-2.5 text-xs text-emerald-200">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-emerald-300">Enquiry prepared in WhatsApp!</p>
                <p className="text-[11px] text-emerald-200/90">
                  Your items remain safely in this cart. You may continue browsing or clear when done.
                </p>
              </div>
              <button
                onClick={() => setWhatsappSentNotice(false)}
                aria-label="Dismiss notice"
                className="text-emerald-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 3. Items List */}
          <div className="p-3 sm:p-5 flex-1 overflow-y-auto space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              /* Professional Empty State */
              <div className="text-center py-16 px-4 space-y-4 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#0B2545] border border-[#C99A3E]/30 flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBasket className="w-8 h-8 text-[#C99A3E]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-display font-semibold text-lg text-white">
                    Your enquiry cart is empty.
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Browse our products and add items you're interested in to send a combined WhatsApp enquiry.
                  </p>
                </div>
                <button
                  onClick={handleBrowseCatalog}
                  aria-label="Browse products catalog"
                  className="inline-flex items-center gap-2 bg-[#C99A3E] hover:bg-[#E5BA55] text-[#071A36] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  <Package className="w-4 h-4" />
                  <span>Browse Products</span>
                </button>
              </div>
            ) : (
              items.map((item) => {
                const hasPrice =
                  item.product.numericPrice > 0 && item.product.price !== 'Price on Request';
                const subCategoryLabel = item.product.subCategory || item.product.mainCategory;

                return (
                  <div
                    key={item.product.id}
                    className="p-3 sm:p-3.5 bg-[#0B2545] border border-white/10 rounded-2xl flex items-center gap-3 justify-between shadow-md hover:border-[#C99A3E]/40 transition-colors"
                  >
                    {/* Thumbnail Image (Aspect-square, uncropped object-contain) */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-[#051329] border border-white/10 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        decoding="async"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('category_')) return;
                          target.src =
                            item.product.mainCategory === 'Disposable Items'
                              ? '/assets/category_disposables.jpg'
                              : item.product.mainCategory === 'Birthday & Party Items'
                              ? '/assets/category_balloons.jpg'
                              : '/assets/category_cakes.jpg';
                        }}
                      />
                    </div>

                    {/* Product Details & Controls */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h4
                        className="text-xs sm:text-sm font-bold text-white truncate"
                        title={item.product.name}
                      >
                        {item.product.name}
                      </h4>

                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#C99A3E] font-medium my-0.5 truncate">
                        <span>{subCategoryLabel}</span>
                        {item.product.unit && (
                          <>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">{item.product.unit}</span>
                          </>
                        )}
                      </div>

                      {/* Truthful Price Display */}
                      <div className="text-[11px] text-gray-300">
                        {hasPrice ? (
                          <div className="flex items-baseline gap-1">
                            <span className="font-semibold text-white">
                              ₹{item.product.numericPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-gray-400">× {item.quantity}</span>
                            <span className="text-[#C99A3E] font-bold ml-1 text-xs">
                              = ₹{(item.product.numericPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[#C99A3E] text-[11px] font-medium bg-[#071A36] px-2 py-0.5 rounded border border-[#C99A3E]/20">
                            <Sparkles className="w-2.5 h-2.5 text-[#C99A3E]" />
                            <span>Price on Request × {item.quantity}</span>
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <div className="flex items-center bg-[#071A36] border border-white/10 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity for ${item.product.name}`}
                            className="w-7 h-7 rounded-md text-white flex items-center justify-center hover:bg-[#C99A3E] hover:text-[#071A36] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span
                            className="text-xs font-bold text-white w-7 text-center select-none"
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            aria-label={`Increase quantity for ${item.product.name}`}
                            className="w-7 h-7 rounded-md text-white flex items-center justify-center hover:bg-[#C99A3E] hover:text-[#071A36] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-[10px] text-gray-400">
                          {item.quantity > 1 ? `${item.quantity} items` : '1 item'}
                        </span>
                      </div>
                    </div>

                    {/* Remove Action Button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label={`Remove ${item.product.name} from cart`}
                      className="text-gray-400 hover:text-[#C2185B] p-2 rounded-lg hover:bg-white/5 transition-colors shrink-0"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* 4. Footer Pricing & WhatsApp Enquiry Section */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#0B2545] border-t border-white/10 space-y-3.5 shrink-0">
              
              {/* Pricing Breakdown */}
              <div className="space-y-1.5 bg-[#071A36] p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>Selected Products:</span>
                  <span className="font-bold text-white">
                    {items.length} {items.length === 1 ? 'type' : 'types'} ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                </div>

                {pricedItems.length > 0 && (
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>Known item value:</span>
                    <span className="font-bold text-sm text-[#C99A3E]">
                      ₹{knownSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {requestItems.length > 0 && (
                  <div className="flex items-center justify-between text-xs text-amber-300/90">
                    <span>Additional items:</span>
                    <span className="font-semibold text-[11px]">
                      {requestItems.length} {requestItems.length === 1 ? 'item' : 'items'} (Price on Request)
                    </span>
                  </div>
                )}

                <div className="pt-1.5 border-t border-white/5 text-[11px] text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C99A3E] shrink-0" />
                  <span>
                    {requestItems.length === items.length
                      ? 'Price will be confirmed by Shri Shyam Celebrations on WhatsApp.'
                      : 'Final shop pricing & availability confirmed on WhatsApp.'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {/* Primary: Combined WhatsApp Enquiry */}
                <button
                  onClick={handleEnquireWhatsApp}
                  aria-label={`Enquire on WhatsApp for ${totalItems} items`}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#20ba5a] hover:to-[#17a850] text-white font-extrabold py-3.5 px-5 rounded-xl shadow-xl transition-all text-sm active:scale-[0.98] min-h-[46px]"
                >
                  <MessageSquare className="w-4 h-4 fill-white shrink-0" />
                  <span>Enquire on WhatsApp ({totalItems} Items)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                {/* Secondary Action Row: Continue Shopping & Clear Cart */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={onClose}
                    aria-label="Continue shopping and keep cart"
                    className="text-xs font-semibold text-gray-300 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Continue Shopping
                  </button>

                  {!showClearConfirm ? (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      aria-label="Clear all items in cart"
                      className="text-xs text-gray-400 hover:text-[#C2185B] py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Clear Cart
                    </button>
                  ) : (
                    /* Clear Confirmation Inline Step */
                    <div className="flex items-center gap-2 bg-[#071A36] px-2.5 py-1 rounded-lg border border-[#C2185B]/40 animate-fadeIn">
                      <span className="text-[11px] text-gray-300">Clear all?</span>
                      <button
                        onClick={handleConfirmClear}
                        aria-label="Confirm clear cart"
                        className="text-[11px] bg-[#C2185B] text-white font-bold px-2 py-0.5 rounded hover:bg-[#a0134a]"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        aria-label="Cancel clear cart"
                        className="text-[11px] text-gray-400 hover:text-white px-1.5 py-0.5"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
