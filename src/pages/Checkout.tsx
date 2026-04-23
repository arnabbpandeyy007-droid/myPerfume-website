import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { useNavigate } from 'react-router';
import { CreditCard, Wallet, Landmark, Banknote, Check, ChevronRight, Truck, Shield } from 'lucide-react';
import { toast } from 'sonner';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh',
];

export default function Checkout() {
  const { getCartProducts, cartTotal, couponDiscount, clearCart } = useStore();
  const navigate = useNavigate();
  const cartProducts = getCartProducts();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [form, setForm] = useState({
    email: '',
    fullName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    delivery: 'standard',
    payment: 'upi',
  });
  const [orderId, setOrderId] = useState('');

  const discountAmount = couponDiscount > 0 ? Math.round((cartTotal * couponDiscount) / 100) : 0;
  const shippingCost = cartTotal >= 2999 ? 0 : form.delivery === 'express' ? 149 : 0;
  const finalTotal = cartTotal - discountAmount + shippingCost;

  if (cartProducts.length === 0 && step !== 'success') {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    if (!form.email || !form.fullName || !form.phone || !form.address1 || !form.city || !form.state || !form.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }
    const newOrderId = 'AURA' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    setStep('success');
    clearCart();
    toast.success('Order placed successfully!');
  };

  const PaymentOption = ({ value, icon: Icon, label, sublabel }: { value: string; icon: any; label: string; sublabel: string }) => (
    <label
      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
        form.payment === value ? 'border-gold bg-gold/5' : 'border-[#333] hover:border-[#444]'
      }`}
    >
      <input
        type="radio"
        name="payment"
        value={value}
        checked={form.payment === value}
        onChange={(e) => setForm({ ...form, payment: e.target.value })}
        className="w-4 h-4 accent-gold"
      />
      <Icon className={`w-5 h-5 ${form.payment === value ? 'text-gold' : 'text-[#666]'}`} />
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-[#666] text-xs">{sublabel}</p>
      </div>
    </label>
  );

  if (step === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-display text-3xl text-white mb-3">Thank You!</h2>
          <p className="text-[#999] mb-2">Your order has been placed successfully.</p>
          <p className="text-gold font-medium mb-6">Order ID: {orderId}</p>
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg p-4 mb-8 text-left">
            <p className="text-[#999] text-sm mb-1">Estimated Delivery:</p>
            <p className="text-white text-sm font-medium">3-5 Business Days</p>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="bg-gold text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-cream transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl text-white mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-gold' : 'text-[#666]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'shipping' ? 'bg-gold text-black' : 'bg-[#1A1A1A] text-[#999]'}`}>
              {step === 'payment' ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="text-sm font-medium">Shipping</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#333]" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-gold' : 'text-[#666]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'payment' ? 'bg-gold text-black' : 'bg-[#1A1A1A] text-[#999]'}`}>
              2
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {step === 'shipping' && (
              <>
                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">Contact Information</h3>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold transition-colors text-sm"
                    required
                  />
                </div>

                {/* Shipping */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">Shipping Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold transition-colors text-sm"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone *"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold transition-colors text-sm"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address Line 1 *"
                    value={form.address1}
                    onChange={(e) => setForm({ ...form, address1: e.target.value })}
                    className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold transition-colors text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2 (Optional)"
                    value={form.address2}
                    onChange={(e) => setForm({ ...form, address2: e.target.value })}
                    className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold transition-colors text-sm"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City *"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold transition-colors text-sm"
                      required
                    />
                    <select
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full bg-black border border-[#333] rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors text-sm appearance-none"
                      required
                    >
                      <option value="">Select State *</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="PIN Code *"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Delivery */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">Delivery Method</h3>
                  <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${form.delivery === 'standard' ? 'border-gold bg-gold/5' : 'border-[#333]'}`}>
                    <input type="radio" name="delivery" value="standard" checked={form.delivery === 'standard'} onChange={(e) => setForm({ ...form, delivery: e.target.value })} className="w-4 h-4 accent-gold" />
                    <Truck className="w-5 h-5 text-gold" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Standard Delivery</p>
                      <p className="text-[#666] text-xs">3-5 business days</p>
                    </div>
                    <span className="text-gold text-sm font-medium">{cartTotal >= 2999 ? 'Free' : '₹149'}</span>
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${form.delivery === 'express' ? 'border-gold bg-gold/5' : 'border-[#333]'}`}>
                    <input type="radio" name="delivery" value="express" checked={form.delivery === 'express'} onChange={(e) => setForm({ ...form, delivery: e.target.value })} className="w-4 h-4 accent-gold" />
                    <Truck className="w-5 h-5 text-gold" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Express Delivery</p>
                      <p className="text-[#666] text-xs">1-2 business days</p>
                    </div>
                    <span className="text-gold text-sm font-medium">₹149</span>
                  </label>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-gold text-black py-4 rounded-full font-medium text-sm hover:bg-cream transition-colors"
                >
                  Continue to Payment
                </button>
              </>
            )}

            {step === 'payment' && (
              <>
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">Payment Method</h3>
                  <PaymentOption value="upi" icon={Wallet} label="UPI" sublabel="Google Pay, PhonePe, Paytm" />
                  <PaymentOption value="card" icon={CreditCard} label="Credit / Debit Card" sublabel="Visa, Mastercard, RuPay" />
                  <PaymentOption value="netbanking" icon={Landmark} label="Net Banking" sublabel="All major banks" />
                  <PaymentOption value="cod" icon={Banknote} label="Cash on Delivery" sublabel="Pay when you receive" />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex-1 border border-[#333] text-[#999] py-4 rounded-full font-medium text-sm hover:border-gold hover:text-gold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-[2] bg-gold text-black py-4 rounded-full font-medium text-sm hover:bg-cream transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg p-6 sticky top-28">
              <h3 className="font-display text-lg text-white mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cartProducts.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded overflow-hidden bg-[#1A1A1A] flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.name}</p>
                      <p className="text-[#666] text-xs">{item.size}</p>
                    </div>
                    <span className="text-gold text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1A1A1A]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#999]">Subtotal</span>
                  <span className="text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#999]">Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-500' : 'text-white'}>
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
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
              </div>

              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#1A1A1A]">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-[#666] text-xs">Secure SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
