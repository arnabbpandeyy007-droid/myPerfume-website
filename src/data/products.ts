export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'unisex';
  fragranceFamily: string;
  size: string;
  image: string;
  images: string[];
  badge?: string;
  description: string;
  shortDescription: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  longevity: string;
  projection: string;
  sillage: string;
  bestFor: string[];
  concentration: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'midnight-oud',
    name: 'Midnight Oud',
    price: 4999,
    category: 'men',
    fragranceFamily: 'Woody Oriental',
    size: '100ml',
    image: '/images/product-midnight-oud.jpg',
    images: ['/images/product-midnight-oud.jpg'],
    badge: 'Bestseller',
    description: 'Inspired by the mystique of Arabian nights, Midnight Oud is a bold statement of masculinity. Rich oud wood intertwines with smoky incense and warm amber, creating a scent that commands attention and lingers long after you leave the room.',
    shortDescription: 'A bold woody oriental fragrance with rich oud, incense, and warm amber.',
    topNotes: ['Bergamot', 'Black Pepper', 'Saffron'],
    middleNotes: ['Oud', 'Rose', 'Cardamom'],
    baseNotes: ['Amber', 'Sandalwood', 'Musk'],
    longevity: '8-10 Hours',
    projection: 'Strong',
    sillage: 'Heavy',
    bestFor: ['Evening', 'Special Occasions', 'Winter'],
    concentration: 'Eau de Parfum',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: 'royal-vetiver',
    name: 'Royal Vetiver',
    price: 3499,
    category: 'men',
    fragranceFamily: 'Woody Fresh',
    size: '100ml',
    image: '/images/product-royal-vetiver.jpg',
    images: ['/images/product-royal-vetiver.jpg'],
    description: 'The scent of earthy sophistication. Royal Vetiver captures the essence of fresh-cut grass and damp earth after a summer rain, blended with refined woods and a touch of citrus. For the man who is grounded yet ambitious.',
    shortDescription: 'Earthy vetiver with fresh citrus and refined woods.',
    topNotes: ['Grapefruit', 'Lemon', 'Mint'],
    middleNotes: ['Vetiver', 'Cedarwood', 'Geranium'],
    baseNotes: ['Patchouli', 'Oakmoss', 'Tonka Bean'],
    longevity: '6-8 Hours',
    projection: 'Moderate',
    sillage: 'Medium',
    bestFor: ['Daytime', 'Office', 'Summer'],
    concentration: 'Eau de Parfum',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: 'noir-leather',
    name: 'Noir Leather',
    price: 5499,
    category: 'men',
    fragranceFamily: 'Leather Spicy',
    size: '100ml',
    image: '/images/product-noir-leather.jpg',
    images: ['/images/product-noir-leather.jpg'],
    badge: 'New',
    description: 'For the man who appreciates the finer things. Noir Leather opens with a burst of spice and settles into a luxurious leather accord, wrapped in smoky birch and sweetened with a hint of honey. Unapologetically bold.',
    shortDescription: 'Luxurious leather with smoky birch, spices, and honey.',
    topNotes: ['Cardamom', 'Black Pepper', 'Bergamot'],
    middleNotes: ['Leather', 'Jasmine', 'Cinnamon'],
    baseNotes: ['Birch', 'Honey', 'Vanilla'],
    longevity: '10-12 Hours',
    projection: 'Strong',
    sillage: 'Heavy',
    bestFor: ['Evening', 'Date Night', 'Winter'],
    concentration: 'Eau de Parfum',
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
  },
  {
    id: 'ocean-drift',
    name: 'Ocean Drift',
    price: 2999,
    category: 'men',
    fragranceFamily: 'Aquatic Fresh',
    size: '100ml',
    image: '/images/product-ocean-drift.jpg',
    images: ['/images/product-ocean-drift.jpg'],
    description: 'Capture the freedom of the open sea. Ocean Drift brings together marine notes, crisp citrus, and a subtle woody base to evoke the feeling of standing on a cliff overlooking the ocean. Fresh, clean, and effortlessly modern.',
    shortDescription: 'Marine freshness with citrus and a subtle woody base.',
    topNotes: ['Sea Salt', 'Lime', 'Calone'],
    middleNotes: ['Jasmine', 'Rosemary', 'Cypress'],
    baseNotes: ['Driftwood', 'Ambergris', 'White Musk'],
    longevity: '5-7 Hours',
    projection: 'Moderate',
    sillage: 'Light',
    bestFor: ['Daytime', 'Casual', 'Summer'],
    concentration: 'Eau de Toilette',
    rating: 4.5,
    reviewCount: 102,
    inStock: true,
  },
  {
    id: 'rose-nectar',
    name: 'Rose Nectar',
    price: 4499,
    category: 'women',
    fragranceFamily: 'Floral Oriental',
    size: '100ml',
    image: '/images/product-rose-nectar.jpg',
    images: ['/images/product-rose-nectar.jpg'],
    badge: 'Bestseller',
    description: 'A love letter to the rose. Rose Nectar opens with a burst of fresh Bulgarian rose, deepens into a heart of exotic spices, and settles into a warm, honeyed base. It is feminine, powerful, and utterly unforgettable.',
    shortDescription: 'Bulgarian rose with exotic spices and a honeyed base.',
    topNotes: ['Bulgarian Rose', 'Pink Pepper', 'Lychee'],
    middleNotes: ['Turkish Rose', 'Saffron', 'Peony'],
    baseNotes: ['Honey', 'Vanilla', 'Agarwood'],
    longevity: '8-10 Hours',
    projection: 'Strong',
    sillage: 'Medium',
    bestFor: ['Evening', 'Romantic', 'All Seasons'],
    concentration: 'Eau de Parfum',
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
  },
  {
    id: 'golden-amber',
    name: 'Golden Amber',
    price: 5999,
    category: 'women',
    fragranceFamily: 'Oriental Gourmand',
    size: '100ml',
    image: '/images/product-golden-amber.jpg',
    images: ['/images/product-golden-amber.jpg'],
    description: 'Indulgence in a bottle. Golden Amber wraps you in a warm embrace of rich amber, sweet vanilla, and caramel, with a whisper of exotic resins. It is comfort and luxury intertwined, perfect for the woman who owns every room she enters.',
    shortDescription: 'Rich amber, vanilla, and caramel with exotic resins.',
    topNotes: ['Mandarin', 'Almond', 'Bergamot'],
    middleNotes: ['Amber', 'Jasmine', 'Caramel'],
    baseNotes: ['Vanilla', 'Sandalwood', 'Benzoin'],
    longevity: '10-12 Hours',
    projection: 'Strong',
    sillage: 'Heavy',
    bestFor: ['Evening', 'Special Occasions', 'Winter'],
    concentration: 'Eau de Parfum',
    rating: 4.7,
    reviewCount: 78,
    inStock: true,
  },
  {
    id: 'jasmine-bloom',
    name: 'Jasmine Bloom',
    price: 3999,
    category: 'women',
    fragranceFamily: 'Floral Fresh',
    size: '100ml',
    image: '/images/product-jasmine-bloom.jpg',
    images: ['/images/product-jasmine-bloom.jpg'],
    description: 'The scent of a garden at dawn. Jasmine Bloom captures the ethereal beauty of Indian jasmine in full bloom, supported by crisp green notes and a soft musk base. Elegant, timeless, and refreshingly modern.',
    shortDescription: 'Indian jasmine with crisp green notes and soft musk.',
    topNotes: ['Neroli', 'Green Tea', 'Bergamot'],
    middleNotes: ['Indian Jasmine', 'Orange Blossom', 'Freesia'],
    baseNotes: ['White Musk', 'Cedarwood', 'Sandalwood'],
    longevity: '6-8 Hours',
    projection: 'Moderate',
    sillage: 'Medium',
    bestFor: ['Daytime', 'Office', 'Spring'],
    concentration: 'Eau de Parfum',
    rating: 4.6,
    reviewCount: 92,
    inStock: true,
  },
  {
    id: 'velvet-orchid',
    name: 'Velvet Orchid',
    price: 4299,
    category: 'women',
    fragranceFamily: 'Floral Woody',
    size: '100ml',
    image: '/images/product-velvet-orchid.jpg',
    images: ['/images/product-velvet-orchid.jpg'],
    badge: 'New',
    description: 'Mysterious and alluring, Velvet Orchid weaves together dark orchid, rum, and black truffle with a warm woody base. This is a fragrance for the woman who embraces her complexity and leaves a trail of intrigue.',
    shortDescription: 'Dark orchid, rum, and black truffle with warm woods.',
    topNotes: ['Rum', 'Honey', 'Mandarin'],
    middleNotes: ['Black Orchid', 'Rose', 'Iris'],
    baseNotes: ['Peruvian Balsam', 'Sandalwood', 'Myrrh'],
    longevity: '8-10 Hours',
    projection: 'Strong',
    sillage: 'Heavy',
    bestFor: ['Evening', 'Date Night', 'Fall'],
    concentration: 'Eau de Parfum',
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: 'mystic-sandalwood',
    name: 'Mystic Sandalwood',
    price: 4799,
    category: 'unisex',
    fragranceFamily: 'Woody Floral',
    size: '100ml',
    image: '/images/product-mystic-sandalwood.jpg',
    images: ['/images/product-mystic-sandalwood.jpg'],
    badge: 'Bestseller',
    description: 'A fragrance that transcends gender. Mystic Sandalwood pairs creamy Indian sandalwood with delicate white florals and a hint of spice. It is meditative, warm, and universally appealing — a true modern classic.',
    shortDescription: 'Creamy Indian sandalwood with white florals and spice.',
    topNotes: ['Pink Pepper', 'Lemon', 'Nutmeg'],
    middleNotes: ['Sandalwood', 'Ylang Ylang', 'Lily of the Valley'],
    baseNotes: ['Musk', 'Cedarwood', 'Vanilla'],
    longevity: '8-10 Hours',
    projection: 'Moderate',
    sillage: 'Medium',
    bestFor: ['All Day', 'Meditation', 'All Seasons'],
    concentration: 'Eau de Parfum',
    rating: 4.7,
    reviewCount: 143,
    inStock: true,
  },
  {
    id: 'citrus-gold',
    name: 'Citrus Gold',
    price: 3299,
    category: 'unisex',
    fragranceFamily: 'Citrus Fresh',
    size: '100ml',
    image: '/images/product-citrus-gold.jpg',
    images: ['/images/product-citrus-gold.jpg'],
    description: 'Sunshine captured in a bottle. Citrus Gold is a vibrant burst of Sicilian lemon, bergamot, and grapefruit, grounded by a subtle woody base. Energizing, uplifting, and perfect for those who radiate positivity.',
    shortDescription: 'Sicilian lemon, bergamot, and grapefruit with a woody base.',
    topNotes: ['Sicilian Lemon', 'Bergamot', 'Grapefruit'],
    middleNotes: ['Neroli', 'Ginger', 'Basil'],
    baseNotes: ['Cedarwood', 'Vetiver', 'White Musk'],
    longevity: '5-7 Hours',
    projection: 'Moderate',
    sillage: 'Light',
    bestFor: ['Daytime', 'Casual', 'Summer'],
    concentration: 'Eau de Toilette',
    rating: 4.5,
    reviewCount: 88,
    inStock: true,
  },
  {
    id: 'oud-royale',
    name: 'Oud Royale',
    price: 7999,
    originalPrice: 9999,
    category: 'unisex',
    fragranceFamily: 'Oriental Woody',
    size: '100ml',
    image: '/images/product-oud-royale.jpg',
    images: ['/images/product-oud-royale.jpg'],
    badge: 'Premium',
    description: 'The crown jewel of our collection. Oud Royale features rare Cambodian oud, aged for decades, blended with rose de mai and royal amber. This is not just a fragrance — it is an heirloom, a legacy, a statement of uncompromising luxury.',
    shortDescription: 'Rare Cambodian oud with rose de mai and royal amber.',
    topNotes: ['Saffron', 'Rose De Mai', 'Pink Pepper'],
    middleNotes: ['Cambodian Oud', 'Cashmere Wood', 'Frankincense'],
    baseNotes: ['Royal Amber', 'Musk', 'Vetiver'],
    longevity: '12+ Hours',
    projection: 'Intense',
    sillage: 'Enormous',
    bestFor: ['Special Occasions', 'Weddings', 'Winter'],
    concentration: 'Extrait de Parfum',
    rating: 5.0,
    reviewCount: 45,
    inStock: true,
  },
  {
    id: 'white-musk',
    name: 'White Musk',
    price: 2499,
    category: 'unisex',
    fragranceFamily: 'Musk Floral',
    size: '100ml',
    image: '/images/product-white-musk.jpg',
    images: ['/images/product-white-musk.jpg'],
    description: 'Pure, clean, and infinitely wearable. White Musk is a modern interpretation of the classic musk scent, softened with white florals and a touch of powdery iris. It is your skin, but better — an intimate fragrance that stays close and feels like home.',
    shortDescription: 'Clean white musk with white florals and powdery iris.',
    topNotes: ['Aldehydes', 'Bergamot', 'Lily'],
    middleNotes: ['White Musk', 'Iris', 'Lily of the Valley'],
    baseNotes: ['Musk', 'Tonka Bean', 'Sandalwood'],
    longevity: '6-8 Hours',
    projection: 'Soft',
    sillage: 'Light',
    bestFor: ['Everyday', 'Office', 'All Seasons'],
    concentration: 'Eau de Parfum',
    rating: 4.4,
    reviewCount: 110,
    inStock: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
};

export const getBestsellers = (): Product[] => {
  return products.filter((p) => p.badge === 'Bestseller');
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && (p.category === product.category || p.fragranceFamily === product.fragranceFamily))
    .slice(0, 4);
};

export const categories = [
  { id: 'men', name: 'For Him', image: '/images/collection-men.jpg' },
  { id: 'women', name: 'For Her', image: '/images/collection-women.jpg' },
  { id: 'unisex', name: 'Unisex', image: '/images/collection-unisex.jpg' },
];

export const fragranceFamilies = ['Woody', 'Floral', 'Oriental', 'Fresh', 'Citrus', 'Spicy', 'Leather', 'Musk'];

export const priceRanges = [
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹4,000', min: 2000, max: 4000 },
  { label: '₹4,000 - ₹6,000', min: 4000, max: 6000 },
  { label: 'Above ₹6,000', min: 6000, max: Infinity },
];

export const testimonials = [
  {
    id: 1,
    text: "The Midnight Oud lasts all day. I've never received so many compliments. People literally stop me to ask what I'm wearing.",
    name: 'Rahul M.',
    location: 'Mumbai',
    rating: 5,
  },
  {
    id: 2,
    text: "Rose Nectar is my signature scent now. Absolutely divine. The packaging itself feels like unwrapping a luxury gift every time.",
    name: 'Priya S.',
    location: 'Delhi',
    rating: 5,
  },
  {
    id: 3,
    text: "Finally, a luxury perfume brand that understands Indian preferences. The longevity in our humid climate is impressive.",
    name: 'Arjun K.',
    location: 'Bangalore',
    rating: 5,
  },
  {
    id: 4,
    text: "The packaging itself feels like a gift. Premium in every sense. I've gifted AURA to three friends and they all loved it.",
    name: 'Sneha T.',
    location: 'Hyderabad',
    rating: 5,
  },
];

export const coupons: Record<string, { discount: number; type: 'percentage' | 'fixed'; minOrder?: number }> = {
  AURA10: { discount: 10, type: 'percentage' },
  WELCOME20: { discount: 20, type: 'percentage', minOrder: 3000 },
  DIWALI30: { discount: 30, type: 'percentage', minOrder: 5000 },
};
