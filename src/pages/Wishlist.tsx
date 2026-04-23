import { useStore } from '@/context/StoreContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { wishlist } = useStore();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <Heart className="w-16 h-16 text-[#333] mx-auto mb-6" />
          <h2 className="font-display text-2xl text-white mb-3">Your Wishlist is Empty</h2>
          <p className="text-[#999] text-sm mb-8">Save your favorite fragrances here.</p>
          <Link
            to="/shop"
            className="inline-block bg-gold text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-cream transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl text-white mb-3">Your Wishlist</h1>
        <p className="text-[#999] text-sm mb-10">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
