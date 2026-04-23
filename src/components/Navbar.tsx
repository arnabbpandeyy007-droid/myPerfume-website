import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlist } = useStore();

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop?category=men', label: 'Men' },
    { to: '/shop?category=women', label: 'Women' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (to: string) => {
    if (to === '/shop') return location.pathname === '/shop' && !location.search;
    return location.pathname + location.search === to;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gold text-black text-center py-2.5 px-4">
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          Free Shipping on Orders Above ₹2,999 | WhatsApp: +91-98765-43210
        </p>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="font-display text-2xl sm:text-3xl font-bold text-gold tracking-tight">
                AURA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs uppercase tracking-[0.08em] font-medium transition-colors duration-300 ${
                    isActive(link.to) ? 'text-gold' : 'text-[#999] hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-[#999] hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="text-[#999] hover:text-gold transition-colors duration-300 relative hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="text-[#999] hover:text-gold transition-colors duration-300 relative"
                    aria-label="Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <CartDrawer />
              </Sheet>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-[#999] hover:text-gold transition-colors duration-300"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-start justify-center pt-32 px-4">
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes..."
                className="w-full bg-transparent border-b-2 border-gold text-2xl sm:text-3xl text-white placeholder-[#666] py-4 pr-12 focus:outline-none font-display"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
            </form>
            <p className="text-[#666] text-sm mt-4">
              Press Enter to search or ESC to close
            </p>
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-8 right-8 text-[#999] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black">
          <div className="border-b-2 border-gold">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-display text-2xl font-bold text-gold">AURA</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[#999] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl text-[#999] hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="font-display text-2xl text-[#999] hover:text-gold transition-colors duration-300 flex items-center gap-2"
            >
              <Heart className="w-5 h-5" /> Wishlist ({wishlist.length})
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function CartDrawer() {
  const { getCartProducts, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const cartProducts = getCartProducts();

  return (
    <SheetContent className="w-full sm:w-[400px] bg-black border-l border-[#1A1A1A] p-0 flex flex-col">
      <SheetHeader className="px-6 py-4 border-b border-[#1A1A1A]">
        <SheetTitle className="font-display text-xl text-white">
          Your Cart ({cartProducts.length})
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {cartProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="w-12 h-12 text-[#333] mb-4" />
            <p className="text-[#999] mb-4">Your cart is empty</p>
            <Button
              onClick={() => navigate('/shop')}
              className="bg-gold text-black hover:bg-cream rounded-full px-6"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {cartProducts.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-display text-sm text-white">{item.name}</h4>
                  <p className="text-xs text-[#999] mb-2">{item.size}</p>
                  <p className="text-gold font-semibold text-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 border border-[#333] rounded text-[#999] hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 border border-[#333] rounded text-[#999] hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-[#666] hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartProducts.length > 0 && (
        <div className="border-t border-[#1A1A1A] px-6 py-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#999]">Subtotal</span>
            <span className="text-white font-semibold">
              ₹{cartTotal.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs text-[#666]">Shipping calculated at checkout</p>
          <Button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gold text-black hover:bg-cream rounded-full py-3 font-medium"
          >
            Checkout
          </Button>
          <div className="flex items-center justify-center gap-2 text-xs text-[#666]">
            <span className="text-green-500">✓</span> Cash on Delivery Available
          </div>
          <button
            onClick={clearCart}
            className="w-full text-center text-xs text-[#666] hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      )}
    </SheetContent>
  );
}
