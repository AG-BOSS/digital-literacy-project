// ==============================================================================
// SHRI SHYAM CELEBRATIONS – IMPORTED CATALOG DATASET
// Reference: Public Catalog Inspiration from balloonhouse.in
// Curation: Shri Shyam Celebrations Original Product Inventory
// All assets localized in /assets/products/ (No external hotlinking)
// ==============================================================================

import type { MainCategoryType, AvailabilityStatus } from '../types';

export interface ImportProductItem {
  name: string;
  mainCategory: MainCategoryType;
  subCategory: string;
  price: number | null;
  price_on_request: boolean;
  unit: string;
  availability: AvailabilityStatus;
  in_stock: boolean;
  description: string;
  features: string[];
  image_url?: string;
  is_best_seller: boolean;
  is_new: boolean;
}

export const BALLOONHOUSE_IMPORT_DATA: ImportProductItem[] = [
  {
    "name": "Celebration Event Prop Stand (Heart stand)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Stands & Props",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Decorative celebration display prop for organizing stages, table settings, and photo corners.",
    "features": [
      "Stable Construction",
      "Photogenic Display",
      "Versatile Setup"
    ],
    "image_url": "/assets/products/celebration-event-prop-stand-heart-stand.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Celebration Event Prop Stand (n stand)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Stands & Props",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Decorative celebration display prop for organizing stages, table settings, and photo corners.",
    "features": [
      "Stable Construction",
      "Photogenic Display",
      "Versatile Setup"
    ],
    "image_url": "/assets/products/celebration-event-prop-stand-n-stand.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Celebration Event Prop Stand (A Stand)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Stands & Props",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Decorative celebration display prop for organizing stages, table settings, and photo corners.",
    "features": [
      "Stable Construction",
      "Photogenic Display",
      "Versatile Setup"
    ],
    "image_url": "/assets/products/celebration-event-prop-stand-a-stand.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Arch Gate Celebration Entrance Welcome Frame",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Stands & Props",
    "price": null,
    "price_on_request": true,
    "unit": "1 Frame Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.",
    "features": [
      "Disassembles for Easy Transport",
      "Heavy-Duty Anti-Tip Footplates",
      "Ideal for Indoors & Outdoors"
    ],
    "image_url": "/assets/products/arch-gate-celebration-entrance-welcome-f.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Cylinder Drum Plinth Display Cake Stands Set",
    "mainCategory": "Cake Items",
    "subCategory": "Cake Accessories",
    "price": null,
    "price_on_request": true,
    "unit": "Set of 3 Pillars",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Sturdy elegant display pedestal for spotlighting celebratory cakes, cupcakes, and dessert buffets.",
    "features": [
      "Heavy-Duty Stable Base",
      "Photogenic Modern Aesthetic",
      "Supports Multi-Tier Cakes"
    ],
    "image_url": "/assets/products/cylinder-drum-plinth-display-cake-stands.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Foldable Roman Pillar Accordion Paper Cake Stand",
    "mainCategory": "Cake Items",
    "subCategory": "Cake Accessories",
    "price": null,
    "price_on_request": true,
    "unit": "1 Pedestal",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Sturdy elegant display pedestal for spotlighting celebratory cakes, cupcakes, and dessert buffets.",
    "features": [
      "Heavy-Duty Stable Base",
      "Photogenic Modern Aesthetic",
      "Supports Multi-Tier Cakes"
    ],
    "image_url": "/assets/products/foldable-roman-pillar-accordion-paper-ca.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Decorative Vintage Floral Cart Bicycle Prop",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Stands & Props",
    "price": null,
    "price_on_request": true,
    "unit": "1 Prop Stand",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.",
    "features": [
      "Disassembles for Easy Transport",
      "Heavy-Duty Anti-Tip Footplates",
      "Ideal for Indoors & Outdoors"
    ],
    "image_url": "/assets/products/decorative-vintage-floral-cart-bicycle-p.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Ornate Wrought Iron Pedestal Cake Stand",
    "mainCategory": "Cake Items",
    "subCategory": "Cake Accessories",
    "price": null,
    "price_on_request": true,
    "unit": "1 Stand",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Sturdy elegant display pedestal for spotlighting celebratory cakes, cupcakes, and dessert buffets.",
    "features": [
      "Heavy-Duty Stable Base",
      "Photogenic Modern Aesthetic",
      "Supports Multi-Tier Cakes"
    ],
    "image_url": "/assets/products/ornate-wrought-iron-pedestal-cake-stand.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Screen",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Celebration backdrop element for vibrant event stage and photo booth staging.",
    "features": [
      "Vibrant Backdrop Staging",
      "Easy Installation",
      "Festive Photo Background"
    ],
    "image_url": "/assets/products/screen.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Sky Blue Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Sky Blue. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/sky-blue-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Dark Blue Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Dark Blue. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/dark-blue-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Red Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Red. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/red-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Dark Green Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Dark Green. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/dark-green-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Light Green Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Light Green. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/light-green-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Orange Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Orange. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/orange-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Black Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Black. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/black-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Pink Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Pink. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/pink-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Violet Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Violet. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/violet-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Yellow Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant Yellow. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/yellow-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "White Standard Balloon (Pack of 25)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 50,
    "price_on_request": false,
    "unit": "Pack of 25",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium quality biodegradable latex balloons in vibrant White. Ideal for balloon arches, bouquets, and birthday celebration decor.",
    "features": [
      "100% Biodegradable Latex",
      "Helium & Air Compatible",
      "Rich Uniform Color",
      "Durable & Burst-Resistant"
    ],
    "image_url": "/assets/products/white-standard-balloon-pack-of-25.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Silver Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Silver. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/silver-metallic-chrome-balloon-pack.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Gold Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Gold. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/gold-metallic-chrome-balloon-pack.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Rose Gold Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Rose Gold. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/rose-gold-metallic-chrome-balloon-pack.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Black Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Black. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/black-metallic-chrome-balloon-pack.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Blue Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Blue. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/blue-metallic-chrome-balloon-pack.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Violet Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Violet. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/violet-metallic-chrome-balloon-pack.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Copper Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Copper. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/copper-metallic-chrome-balloon-pack.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Pink Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Pink. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/pink-metallic-chrome-balloon-pack.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Parrot Green Metallic Chrome Balloon Pack",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloons",
    "price": 55,
    "price_on_request": false,
    "unit": "Pack of 10",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luxurious high-shine metallic chrome balloons in gleaming Parrot Green. Creates a mirror-like radiant finish for VIP parties and milestone celebrations.",
    "features": [
      "Reflective Mirror Shine",
      "Thick Heavy-Gauge Latex",
      "Pack of 10 Pieces",
      "Suitable for Air & Helium"
    ],
    "image_url": "/assets/products/parrot-green-metallic-chrome-balloon-pac.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Individual Letter \"Happy Birthday\" Pick Candles Set",
    "mainCategory": "Cake Items",
    "subCategory": "Candles",
    "price": 100,
    "price_on_request": false,
    "unit": "Set of 13 Picks",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Spell out Happy Birthday across the cake with this full set of colorful letter birthday candle picks.",
    "features": [
      "Complete 13-Letter Set",
      "Colorful Festive Picks",
      "Even Clean Flame"
    ],
    "image_url": "/assets/products/individual-letter-happy-birthday-pick-ca.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Heart-Shaped Metallic Cake Candle",
    "mainCategory": "Cake Items",
    "subCategory": "Candles",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Romantic heart-shaped celebratory cake candle, perfect for anniversaries, Valentine celebrations, and birthdays.",
    "features": [
      "Clean Burning Wax",
      "Food-Grade Base Pick",
      "Charming Romantic Heart Design"
    ],
    "image_url": "/assets/products/heart-shaped-metallic-cake-candle.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Star-Shaped Metallic Cake Candle",
    "mainCategory": "Cake Items",
    "subCategory": "Candles",
    "price": 150,
    "price_on_request": false,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Elegant star-shaped celebratory birthday candle with a gleaming metallic finish for cakes and pastries.",
    "features": [
      "Smokeless Wax Formulation",
      "Sturdy Food-Safe Pick",
      "Metallic Shimmer Coating"
    ],
    "image_url": "/assets/products/star-shaped-metallic-cake-candle.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Half Birthday \"1/2\" Milestone Cake Candle",
    "mainCategory": "Cake Items",
    "subCategory": "Candles",
    "price": 100,
    "price_on_request": false,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Celebrate your baby’s 6-month milestone with this adorable special 1/2 birthday cake candle.",
    "features": [
      "Special 6-Month Baby Milestone",
      "Vibrant Festive Colors",
      "Safe Sturdy Stand"
    ],
    "image_url": "/assets/products/half-birthday-1-2-milestone-cake-candle.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "\"Just Engaged\" Celebration Acrylic Cake Topper",
    "mainCategory": "Cake Items",
    "subCategory": "Cake Toppers",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Delicate script acrylic cake topper celebrating engagement and ring ceremony parties.",
    "features": [
      "Mirror Gloss Finish",
      "Food-Safe Acrylic",
      "Reusable Keepsake"
    ],
    "image_url": "/assets/candles_decor.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "LED Letters",
    "mainCategory": "Cake Items",
    "subCategory": "Cake Toppers",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Stylish celebration cake topper for elegant birthday and milestone desserts.",
    "features": [
      "Food-Grade Material",
      "Lightweight Sturdy Pick",
      "Festive High-Gloss Finish"
    ],
    "image_url": "/assets/products/led-letters.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Golden Foil Alphabet Letter Message Cards Set",
    "mainCategory": "Cake Items",
    "subCategory": "Cake Toppers",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Gold foil stamped letter cards for personalizing cake boxes, gift displays, and party backdrops.",
    "features": [
      "Lustrous Gold Stamping",
      "Sturdy Cardstock",
      "Versatile Celebration Use"
    ],
    "image_url": "/assets/candles_decor.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Half Birthday \"6 Months\" Milestone Party Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Adorable photo-backdrop garland banner celebrating baby half-birthday 6-month milestones.",
    "features": [
      "Milestone Keepsake Decor",
      "Easy to Hang",
      "Vibrant Child-Safe Inks"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Happy Anniversary Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": 100,
    "price_on_request": false,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Festive wall and backdrop party banner to elevate your party decoration.",
    "features": [
      "Eye-Catching Design",
      "Ready to Hang",
      "Reusable"
    ],
    "image_url": "/assets/products/happy-anniversary-banner.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "\"Bride To Be\" Bachelorette Celebration Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Chic gold & rose banner for bridal showers, bachelorette nights, and pre-wedding photo setups.",
    "features": [
      "High-Shine Foil Lettering",
      "Lightweight Easy Hanging",
      "Instagram-Ready Aesthetic"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Cursive \"Welcome Baby\" Celebration Hanging Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Sweet pastel cursive banner welcoming newborn arrivals, baby showers, and homecoming celebrations.",
    "features": [
      "Pastel Soft Tones",
      "Gentle Calligraphy Font",
      "Includes Hanging Twine"
    ],
    "image_url": "/assets/products/cursive-welcome-baby-celebration-hanging.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Cursive Script \"Happy Birthday\" Glitter Bunting Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": 150,
    "price_on_request": false,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Graceful flowing cursive Happy Birthday hanging garland banner with ribbon string.",
    "features": [
      "Flowing Calligraphy Design",
      "Pre-Strung Ribbon Included",
      "Glitter Foil Finish"
    ],
    "image_url": "/assets/products/cursive-script-happy-birthday-glitter-bu.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Cursive Script \"Happy Anniversary\" Elegant Bunting Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": 150,
    "price_on_request": false,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Romantic cursive calligraphy Happy Anniversary party banner for home or venue backdrops.",
    "features": [
      "Elegant Calligraphy Script",
      "Matching Hanging Ribbon",
      "Premium Heavy Cardstock"
    ],
    "image_url": "/assets/products/cursive-script-happy-anniversary-elegant.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Glamour Makeup Theme Birthday Garland Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Birthday Themes",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Trendy beauty and makeup-themed birthday party bunting with lipstick and brush cutouts.",
    "features": [
      "Die-Cut Makeup Elements",
      "Bright Gloss Inks",
      "Matching Satin String"
    ],
    "image_url": "/assets/products/glamour-makeup-theme-birthday-garland-ba.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Mermaid Under-the-Sea Theme Birthday Bunting Banner",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Birthday Themes",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Magical mermaid tail and ocean shell party bunting for fantasy birthday celebrations.",
    "features": [
      "Iridescent Foil Accents",
      "Whimsical Sea Creature Cutouts",
      "Sturdy Cardstock"
    ],
    "image_url": "/assets/products/mermaid-under-the-sea-theme-birthday-bun.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Celebration Party Snow Foam Spray Can",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Confetti",
    "price": 60,
    "price_on_request": false,
    "unit": "1 Can (250ml)",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Non-toxic, quick-evaporating celebratory snow foam spray for birthdays, countdowns, and weddings.",
    "features": [
      "Non-Staining Formula",
      "Quick-Evaporating Foam",
      "Exciting Party Atmosphere"
    ],
    "image_url": "/assets/products/celebration-party-snow-foam-spray-can.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Balloon Bright High-Gloss Shine Spray Can",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Accessories",
    "price": 250,
    "price_on_request": false,
    "unit": "1 Can (450ml)",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Professional balloon polish spray that prevents oxidation and keeps latex balloons glossy for days.",
    "features": [
      "Prevents Oxidation & Cloudiness",
      "Instant Mirror Gloss",
      "Essential for Balloon Decorators"
    ],
    "image_url": "/assets/products/balloon-bright-high-gloss-shine-spray-ca.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Balloon Flower Shape Garland Clips",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Accessories",
    "price": 12,
    "price_on_request": false,
    "unit": "Pack of 10 Clips",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Specialty snap clips allowing you to easily build stunning 5-petal and 6-petal balloon flowers in seconds.",
    "features": [
      "Holds up to 6 Balloons",
      "Reusable Sturdy Plastic",
      "Quick Floral Backdrop Styling"
    ],
    "image_url": "/assets/products/balloon-flower-shape-garland-clips.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Removable Balloon Glue Dots Strip Roll",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Accessories",
    "price": 50,
    "price_on_request": false,
    "unit": "Roll of 100 Dots",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Double-sided transparent adhesive glue dots for securing balloons to ceilings, walls, and balloon arches.",
    "features": [
      "100 Strong Glue Dots",
      "No Residue / Wall-Safe",
      "Invisible Clear Bond"
    ],
    "image_url": "/assets/products/removable-balloon-glue-dots-strip-roll.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Perforated Balloon Garland Strip / Arch Tape",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Arch Kits",
    "price": 50,
    "price_on_request": false,
    "unit": "5 Meter Roll",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Flexible 5-meter dual-hole balloon decorating strip tape for assembling professional garlands and arches.",
    "features": [
      "5 Meters / 16 Feet Length",
      "Dual Hole Grip Design",
      "Bendable to Any Shape"
    ],
    "image_url": "/assets/products/perforated-balloon-garland-strip-arch-ta.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Glow-in-the-Dark Neon Radium Party Wristbands",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Favors",
    "price": 10,
    "price_on_request": false,
    "unit": "Pack of 5 Bands",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Luminous neon glow wristbands for nighttime birthday parties, concerts, and celebration dance floors.",
    "features": [
      "Vibrant Night Glow",
      "Flexible Comfortable Fit",
      "Fun Party Favor for All Ages"
    ],
    "image_url": "/assets/products/glow-in-the-dark-neon-radium-party-wrist.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Heavy-Duty Celebration Mounting Tape (Cello Tape)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Accessories",
    "price": 15,
    "price_on_request": false,
    "unit": "1 Roll",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Essential party setup mounting tape for adhering backdrops, banners, and decor securely.",
    "features": [
      "High Tack Adhesive",
      "Clean Release",
      "Essential Setup Tool"
    ],
    "image_url": "/assets/products/heavy-duty-celebration-mounting-tape-cel.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Heavy-Duty Celebration Mounting Tape (Double Side Tape)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Accessories",
    "price": 20,
    "price_on_request": false,
    "unit": "1 Roll",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Essential party setup mounting tape for adhering backdrops, banners, and decor securely.",
    "features": [
      "High Tack Adhesive",
      "Clean Release",
      "Essential Setup Tool"
    ],
    "image_url": "/assets/products/heavy-duty-celebration-mounting-tape-dou.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Transparent \"O-N-E\" First Birthday Balloon Boxes Set",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Accessories",
    "price": 475,
    "price_on_request": false,
    "unit": "Set of 3 Boxes",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Clear display cube boxes with bold gold/white ONE lettering. Fill with mini balloons for baby 1st birthdays!",
    "features": [
      "Set of 3 Clear Boxes",
      "Bold Alphabet Lettering",
      "Easy Foldable Assembly"
    ],
    "image_url": "/assets/products/transparent-o-n-e-first-birthday-balloon.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Geometric Square Grid Box Foil Fringe Backdrop",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Panel (3x6 ft)",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Modern square-pattern metallic foil backdrop curtain creating high-fashion geometric photo walls.",
    "features": [
      "Modern Square Grid Pattern",
      "Double-Sided Adhesive Tape Pre-Applied",
      "Vibrant Reflective Foil"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Cascading Heart Cutout Foil Fringe Curtain",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Panel (3x6 ft)",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Romantic foil fringe backdrop featuring repeating die-cut hearts for anniversaries and birthdays.",
    "features": [
      "Cascading Heart Motifs",
      "Adhesive Strip Top",
      "Dazzling Photo Backdrop"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Luxury Layered Tassel Fringe Wall Backdrop",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Textured layered tassel curtain adding rich dimensional elegance behind party tables and stages.",
    "features": [
      "Textured Tassel Strands",
      "Full Volume Coverage",
      "Reusable Hanging Loop"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Round Accordion Rosette Paper Fan Backdrop Set",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "Set of 6 Fans",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Set of 6 assorted dimensional paper rosette fans in coordinating celebratory patterns and gold foil edges.",
    "features": [
      "Assorted Sizes (8\", 12\", 16\")",
      "Peel-and-Stick Assembly",
      "Includes Hanging Strings"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Multipurpose Celebration Sheer Net Backdrop Fabric",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Drape (5x8 ft)",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Soft sheer flowing net drape for creating fairy light backdrops, floral arches, and mandaps.",
    "features": [
      "Soft Flowing Drape",
      "Pairs Beautifully with Fairy Lights",
      "Durable Washable Fabric"
    ],
    "image_url": "/assets/products/multipurpose-celebration-sheer-net-backd.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Pastel Rainbow Foil Tinsel Fringe Curtain",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Panel (3x6 ft)",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Dreamy multicolored pastel tinsel foil fringe backdrop perfect for unicorn and rainbow parties.",
    "features": [
      "Soft Pastel Rainbow Hues",
      "Lightweight Foil Tinsel",
      "Ready to Peel and Stick"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Happy Birthday Sash",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Accessories",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "High quality party essential curated for joyful celebrations.",
    "features": [
      "Curated Selection",
      "Great for Parties",
      "Trustworthy Quality"
    ],
    "image_url": "/assets/category_balloons.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Warm White Battery-Operated LED Fairy Rice Lights",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": 50,
    "price_on_request": false,
    "unit": "3 Meter String",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Flexible copper wire micro LED fairy lights with compact battery pack for balloon boxes and table centerpieces.",
    "features": [
      "3 Meters Flexible Copper Wire",
      "Energy-Saving Warm White Glow",
      "Requires 2x AA Batteries (Portable)"
    ],
    "image_url": "/assets/products/warm-white-battery-operated-led-fairy-ri.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Celebration Backdrop LED Serial String Lights",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": 180,
    "price_on_request": false,
    "unit": "10 Meter String",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "10-meter plug-in celebration serial string lights to illuminate backdrops, curtains, and party stages.",
    "features": [
      "10 Meters Length",
      "Plug-in Power with Multiple Flash Modes",
      "Weather-Resistant Cabling"
    ],
    "image_url": "/assets/products/celebration-backdrop-led-serial-string-l.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Electric Dual-Nozzle Balloon Air Blower Pump Machine",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Accessories",
    "price": 850,
    "price_on_request": false,
    "unit": "1 Machine",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "High-efficiency dual nozzle electric balloon inflator machine for rapidly inflating hundreds of party balloons.",
    "features": [
      "Dual Inflation Nozzles",
      "Touch-On Automatic Mode",
      "Rapid Inflation in Seconds",
      "Built-in Cable Storage"
    ],
    "image_url": "/assets/products/electric-dual-nozzle-balloon-air-blower-.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Professional Party Event Machine (Electric Balloon Blower)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Unit",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Professional event effect equipment for milestone celebrations and stage performances.",
    "features": [
      "Reliable Commercial Grade",
      "Simple Controls",
      "Memorable Party Effect"
    ],
    "image_url": "/assets/products/professional-party-event-machine-electri.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Automatic High-Output Celebration Bubble Machine",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Machine",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Electric bubble generator blowing thousands of floating bubbles per minute for child parties and wedding exits.",
    "features": [
      "Continuous Automatic Bubble Flow",
      "Safe Non-Toxic Fluid Friendly",
      "Compact Carry Handle"
    ],
    "image_url": "/assets/products/automatic-high-output-celebration-bubble.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "DMX Electronic Cold-Pyro Stage Fountain Machine",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Machine",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Safe indoor electronic cold spark machine creating spectacular 3-meter spark fountains without fire hazard.",
    "features": [
      "Cold Spark Technology (No Burning Smell)",
      "Safe for Indoor Use",
      "Spectacular Grand Entry Effect"
    ],
    "image_url": "/assets/products/dmx-electronic-cold-pyro-stage-fountain-.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Handheld Electronic Celebration Cold Pyro Sparkler Gun",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Unit",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Exciting handheld cold pyro trigger gun for VIP celebrations, DJs, and stage moments.",
    "features": [
      "Battery Powered Cordless Operation",
      "Comfortable Grip Trigger",
      "Spectacular Party Highlight"
    ],
    "image_url": "/assets/products/handheld-electronic-celebration-cold-pyr.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Giant 2-Foot Illuminated Marquee Number \"1\" Light",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece (2 ft)",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Statement 24-inch marquee number 1 illuminated with warm round bulbs for unforgettable 1st birthday photos.",
    "features": [
      "Impressive 2-Foot Height",
      "Soft Warm Filament Bulbs",
      "Sturdy Self-Standing Base"
    ],
    "image_url": "/assets/products/giant-2-foot-illuminated-marquee-number-.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Warm Glow Acrylic \"Happy Birthday\" Neon Sign Light",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Sign",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Premium curved acrylic LED neon sign radiating warm celebratory lighting for birthday stage backdrops.",
    "features": [
      "Modern Silicone LED Neon Tubing",
      "Crystal Clear Acrylic Backing Plate",
      "Pre-Drilled Hanging Holes"
    ],
    "image_url": "/assets/products/warm-glow-acrylic-happy-birthday-neon-si.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Decorative Celebration Light (LED Alphabet Letters)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Piece",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Eye-catching illuminated lighting fixture for evening celebration backdrops.",
    "features": [
      "Low Energy LED Technology",
      "Warm Festive Illumination",
      "Stunning Nighttime Glow"
    ],
    "image_url": "/assets/products/decorative-celebration-light-led-alphabe.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Round Circular Metal Balloon Arch Backdrop Stand (6.5 ft)",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Stands & Props",
    "price": null,
    "price_on_request": true,
    "unit": "1 Frame Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.",
    "features": [
      "Disassembles for Easy Transport",
      "Heavy-Duty Anti-Tip Footplates",
      "Ideal for Indoors & Outdoors"
    ],
    "image_url": "/assets/products/round-circular-metal-balloon-arch-backdr.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Square Geometric Metal Balloon Arch Backdrop Frame",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Stands & Props",
    "price": null,
    "price_on_request": true,
    "unit": "1 Frame Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Durable modular celebration metal arch frame designed for attaching balloon garlands, flowers, and draping.",
    "features": [
      "Disassembles for Easy Transport",
      "Heavy-Duty Anti-Tip Footplates",
      "Ideal for Indoors & Outdoors"
    ],
    "image_url": "/assets/products/square-geometric-metal-balloon-arch-back.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Illuminated \"LOVE\" Marquee Stage Feature",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Party Lighting & Effects",
    "price": null,
    "price_on_request": true,
    "unit": "1 Feature Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Glowing illuminated LOVE marquee centerpiece for anniversaries, engagements, and romantic party setups.",
    "features": [
      "High-Impact Romantic Feature",
      "Warm LED Illumination",
      "Perfect Photo Centerpiece"
    ],
    "image_url": "/assets/products/illuminated-love-marquee-stage-feature.jpg",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Hanging Swirl Ceiling Paper Ribbon Streamers",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Balloon Accessories",
    "price": 30,
    "price_on_request": false,
    "unit": "Pack of 6 Ribbons",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Spiral ceiling streamer ribbons that catch gentle air currents, creating dynamic movement above party spaces.",
    "features": [
      "Pack of 6 Cascading Swirls",
      "Vibrant Dual-Color Paper",
      "Includes Ceiling Hooks"
    ],
    "image_url": "/assets/products/hanging-swirl-ceiling-paper-ribbon-strea.png",
    "is_best_seller": false,
    "is_new": true
  },
  {
    "name": "Baby shower",
    "mainCategory": "Birthday & Party Items",
    "subCategory": "Banners & Backdrops",
    "price": null,
    "price_on_request": true,
    "unit": "1 Set",
    "availability": "Available on Order",
    "in_stock": false,
    "description": "Festive wall and backdrop party banner to elevate your party decoration.",
    "features": [
      "Eye-Catching Design",
      "Ready to Hang",
      "Reusable"
    ],
    "image_url": "/assets/party_accessories.jpg",
    "is_best_seller": false,
    "is_new": true
  }
];
