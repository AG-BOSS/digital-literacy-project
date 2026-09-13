export type MainCategoryType = 'Cake Items' | 'Birthday & Party Items' | 'Disposable Items';

export type AvailabilityStatus = 'In Stock' | 'Available on Order' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  mainCategory: MainCategoryType;
  subCategory: string;
  price: string; // "Price on Request" or editable placeholder e.g. "Price on Request (Est. ₹149)"
  numericPrice: number; // for cart calculation
  unit: string; // e.g. "Pack of 12", "Set of 25", "1 Piece", "Pack of 50"
  availability: AvailabilityStatus;
  inStock: boolean;
  description: string;
  features: string[];
  image: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CelebrationType = 'Birthday' | 'Anniversary' | 'Baby Shower' | 'Engagement' | 'Wedding' | 'Other';
export type ThemeColor = 'Elegant Gold' | 'Vibrant Magenta' | 'Royal Blue' | 'Pastel Rainbow' | 'Classic White' | 'Custom Theme';
export type PackageTier = 'Essential Party Pack' | 'Deluxe Celebration Box' | 'Grand VIP Setup';

export interface PartyBuilderState {
  celebration: CelebrationType;
  theme: ThemeColor;
  packageTier: PackageTier;
  guestCount: number;
  customNotes: string;
}
