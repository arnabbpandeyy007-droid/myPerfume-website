import { Link } from 'react-router';
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold text-gold">AURA</span>
            </Link>
            <p className="text-[#999] text-sm mt-4 leading-relaxed">
              Crafting memories through scent. India's finest luxury perfumes, made for the modern soul.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#999] hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#999] hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-6">Shop</h3>
            <ul className="space-y-3">
              {[
                { to: '/shop?category=men', label: "Men's Perfumes" },
                { to: '/shop?category=women', label: "Women's Perfumes" },
                { to: '/shop?category=unisex', label: 'Unisex' },
                { to: '/shop', label: 'Gift Sets' },
                { to: '/shop', label: 'Attar & Oud' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[#999] text-sm hover:text-gold transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '#', label: 'Track Order' },
                { to: '#', label: 'Shipping Policy' },
                { to: '#', label: 'Returns & Exchanges' },
                { to: '#', label: 'FAQs' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[#999] text-sm hover:text-gold transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-6">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm">+91-98765-43210</p>
                  <p className="text-[#666] text-xs">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm">hello@auraperfumes.in</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm">AURA House, 42 Linking Road</p>
                  <p className="text-[#666] text-xs">Bandra West, Mumbai - 400050</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm">Mon - Sat: 10AM - 7PM IST</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-[#1A1A1A]">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-xl text-white mb-2">Join the Inner Circle</h3>
            <p className="text-[#999] text-sm mb-6">
              Be the first to know about new launches and exclusive offers.
            </p>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-b border-[#333] text-white placeholder-[#666] py-2 px-1 focus:outline-none focus:border-gold transition-colors text-sm"
              />
              <button
                type="submit"
                className="bg-gold text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-cream transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-xs">
            © 2026 AURA Perfumes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-[#666] text-xs hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-[#666] text-xs hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
