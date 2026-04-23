import { useStore } from '@/context/StoreContext';
import { Link, useNavigate } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X, Shield, Truck, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Cart() {
  const { getCartProducts, updateQuantity, removeFromCart, cartTotal, couponCode, applyCoupon, removeCoupon, couponDiscount } = useStore();
  const navigate = useNavigate();
  const cartProducts = getCartProducts();
  const [couponInput, setCouponInput] = useState('');

  const discountAmount = couponDiscount > 0 ? Math.round((cartTotal * couponDiscount) / 100) : 0;
  const finalTotal = cartTotal - discountAmount;
  const freeShipping = cartTotal >= 2999;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) {
      toast.success(`Coupon applied! ${couponDiscount}% off`);
      setCouponInput('');
    } else {
      toast.error('Invalid or expired coupon code');
    }
  };

  if (cartProducts.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-[#333] mx-auto mb-6" />
          <h2 className="font-display text-2xl text-white mb-3">Your Cart is Empty</h2>
          <p className="text-[#999] text-sm mb-8">Discover our collection and find your signature scent.</p>
          <Link
            to="/shop"
            className="inline-block bg-gold text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-cream transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl text-white mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map((item) => (
              <div key={item.id} className="flex gap-4 sm:gap-6 pb-6 border-b border-[#1A1A1A]">
                <Link to={`/product/${item.id}`} className="w-24 sm:w-28 h-32 sm:h-36 flex-shrink-0 rounded overflow-hidden bg-[#0A0A0A]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-display text-base sm:text-lg text-white hover:text-gold transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-[#666] text-xs mt-1">{item.size} · {item.fragranceFamily}</p>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success(`${item.name} removed from cart`);
                      }}
                      className="text-[#666] hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-[#333] rounded-l flex items-center justify-center text-[#999] hover:border-gold hover:text-gold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 h-8 border-y border-[#333] flex items-center justify-center text-white text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-[#333] rounded-r flex items-center justify-center text-[#999] hover:border-gold hover:text-gold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-gold font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[#999] text-sm hover:text-gold transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg p-6 space-y-6">
              <h3 className="font-display text-xl text-white">Order Summary</h3>

              {/* Coupon */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-gold/10 border border-gold/20 rounded px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gold" />
                      <span className="text-gold text-sm font-medium">{couponCode}</span>
                      <span className="text-gold/70 text-xs">{couponDiscount}% off</span>
                    </div>
                    <button onClick={removeCoupon} className="text-[#666] hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-transparent border border-[#333] rounded px-3 py-2 text-white placeholder-[#666] text-sm focus:outline-none focus:border-gold"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-gold text-black px-4 py-2 rounded text-sm font-medium hover:bg-cream transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-[#666] text-xs mt-2">Try: AURA10, WELCOME20, DIWALI30</p>
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#999]">Subtotal</span>
                  <span className="text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#999]">Shipping</span>
                  <span className={freeShipping ? 'text-green-500' : 'text-white'}>
                    {freeShipping ? 'Free' : '₹149'}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#999]">Discount</span>
                    <span className="text-green-500">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-[#1A1A1A]">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-gold font-semibold text-lg">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[#666] text-xs">Order total includes GST</p>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gold text-black py-4 rounded-full font-medium text-sm hover:bg-cream transition-colors"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1A1A1A]">
                <div className="text-center">
                  <Shield className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-[10px] text-[#666]">SSL Secure</p>
                </div>
                <div className="text-center">
                  <Truck className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-[10px] text-[#666]">COD Available</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-[10px] text-[#666]">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
