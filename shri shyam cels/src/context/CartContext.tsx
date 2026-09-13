import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  distinctCount: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  addMultipleToCart: (products: Product[]) => void;
  updateQuantity: (productId: string, delta: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  feedbackProduct: { id: string; name: string; quantity: number } | null;
  dismissFeedback: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'shri_shyam_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackProduct, setFeedbackProduct] = useState<{ id: string; name: string; quantity: number } | null>(null);

  // Initialize cart from localStorage with safe fallback
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item: any) =>
              item &&
              item.product &&
              typeof item.product.id === 'string' &&
              typeof item.quantity === 'number' &&
              item.quantity >= 1
          );
        }
      }
    } catch (err) {
      console.warn('Failed to parse cart from localStorage, starting empty:', err);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
    return [];
  });

  // Sync to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to save cart to localStorage:', err);
    }
  }, [items]);

  // Auto-dismiss feedback toast after 2.5 seconds
  useEffect(() => {
    if (!feedbackProduct) return;
    const timer = setTimeout(() => {
      setFeedbackProduct(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [feedbackProduct]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const dismissFeedback = () => setFeedbackProduct(null);

  const addToCart = (product: Product, quantity = 1) => {
    const qtyToAdd = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd
        };
        return updated;
      }
      return [...prev, { product, quantity: qtyToAdd }];
    });

    setFeedbackProduct({ id: product.id, name: product.name, quantity: qtyToAdd });
  };

  const addMultipleToCart = (products: Product[]) => {
    setItems((prev) => {
      let updated = [...prev];
      products.forEach((prod) => {
        const idx = updated.findIndex((item) => item.product.id === prod.id);
        if (idx > -1) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      });
      return updated;
    });
    setIsOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          // Keep minimum quantity of 1 (remove is handled via removeItem)
          return newQty >= 1 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const setQuantity = (productId: string, quantity: number) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: safeQty };
        }
        return item;
      })
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Total quantity across all products (e.g. 5 balloons + 1 cake topper = 6)
  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const distinctCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalItems,
        distinctCount,
        openCart,
        closeCart,
        addToCart,
        addMultipleToCart,
        updateQuantity,
        setQuantity,
        removeItem,
        clearCart,
        feedbackProduct,
        dismissFeedback
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
