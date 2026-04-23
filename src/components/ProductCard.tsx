import { Link } from 'react-router';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { type Product } from '@/data/products';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(wishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`, {
      icon: wishlisted ? '💔' : '❤️',
    });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded bg-[#0A0A0A]">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            loading="lazy"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-gold text-black text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-300 ${
                wishlisted ? 'text-gold fill-gold' : 'text-white'
              }`}
            />
          </button>

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Link
              to={`/product/${product.id}`}
              className="bg-cream text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gold transition-colors duration-300 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-4 h-4" />
              Quick View
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-gold text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-cream transition-colors duration-300 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="font-display text-base text-white group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-xs text-[#666] mt-1">{product.fragranceFamily}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gold font-semibold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[#666] text-sm line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
