import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import { products, type Product, coupons } from '@/data/products';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  couponCode: string | null;
  couponDiscount: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getCartProducts: () => (Product & { quantity: number })[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem('aura-coupon');
    } catch {
      return null;
    }
  });

  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('aura-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem('aura-coupon', couponCode);
    } else {
      localStorage.removeItem('aura-coupon');
    }
  }, [couponCode]);

  useEffect(() => {
    if (couponCode && coupons[couponCode]) {
      const coupon = coupons[couponCode];
      const subtotal = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
      if (coupon.minOrder && subtotal < coupon.minOrder) {
        setCouponDiscount(0);
      } else {
        setCouponDiscount(coupon.discount);
      }
    } else {
      setCouponDiscount(0);
    }
  }, [couponCode, cart]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCouponCode(null);
    setCouponDiscount(0);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = useCallback((code: string) => {
    const upperCode = code.toUpperCase();
    if (coupons[upperCode]) {
      const coupon = coupons[upperCode];
      const subtotal = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
      if (coupon.minOrder && subtotal < coupon.minOrder) {
        return false;
      }
      setCouponCode(upperCode);
      return true;
    }
    return false;
  }, [cart]);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
    setCouponDiscount(0);
  }, []);

  const getCartProducts = useCallback(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter(Boolean) as (Product & { quantity: number })[];
  }, [cart]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        couponCode,
        couponDiscount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        applyCoupon,
        removeCoupon,
        getCartProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
