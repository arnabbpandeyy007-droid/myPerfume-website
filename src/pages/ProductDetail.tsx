import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Star, Minus, Plus, Heart, ShoppingBag, Zap, Share2, Truck, Shield, RotateCcw, ChevronRight, StarHalf } from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const wishlisted = isInWishlist(product?.id || '');

  // Reviews state
  const [reviews, setReviews] = useState<Array<{ id: number; name: string; rating: number; text: string; date: string }>>([
    { id: 1, name: 'Rahul M.', rating: 5, text: "Absolutely stunning fragrance. The longevity is incredible - I can still smell it after 10 hours. Worth every rupee.", date: '2026-03-15' },
    { id: 2, name: 'Priya S.', rating: 5, text: "This has become my signature scent. I get compliments every time I wear it. The packaging is also gorgeous!", date: '2026-02-28' },
    { id: 3, name: 'Arjun K.', rating: 4, text: "Great projection and sillage. Perfect for evening events. Will definitely buy again.", date: '2026-01-20' },
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });

  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.reveal');
            children.forEach((child, i) => {
              setTimeout(() => {
                (child as HTMLElement).style.opacity = '1';
                (child as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (notesRef.current) observer.observe(notesRef.current);
    return () => observer.disconnect();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#999] text-lg mb-4">Product not found</p>
          <Link to="/shop" className="text-gold hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product.id);
    navigate('/checkout');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;
    setReviews([{ id: Date.now(), ...newReview, date: new Date().toISOString().split('T')[0] }, ...reviews]);
    setNewReview({ name: '', rating: 5, text: '' });
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 text-gold fill-gold" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} className="w-4 h-4 text-gold fill-gold" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-[#333]" />);
      }
    }
    return stars;
  };

  return (
    <main className="min-h-screen">
      {/* Product Hero */}
      <section className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#666] mb-8 flex-wrap">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-gold transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#999]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div>
              <div className="aspect-[3/4] rounded overflow-hidden bg-[#0A0A0A] mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-24 rounded overflow-hidden transition-all ${
                        activeImage === i ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:pt-4">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full border border-gold/20">
                  {product.fragranceFamily}
                </span>
                {product.badge && (
                  <span className="bg-[#1A1A1A] text-[#999] text-xs px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-gold text-2xl sm:text-3xl font-semibold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-[#666] text-lg line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-[#999] text-sm sm:text-base leading-relaxed mb-8">
                {product.shortDescription}
              </p>

              {/* Size */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-3 block">
                  Size
                </span>
                <button className="bg-gold/10 text-gold border border-gold/30 px-4 py-2 rounded text-sm font-medium">
                  {product.size}
                </button>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-3 block">
                  Quantity
                </span>
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-[#333] rounded-l flex items-center justify-center text-[#999] hover:border-gold hover:text-gold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 h-10 border-y border-[#333] flex items-center justify-center text-white text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-[#333] rounded-r flex items-center justify-center text-[#999] hover:border-gold hover:text-gold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gold text-black py-4 rounded-full font-medium text-sm hover:bg-cream transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full border border-gold text-gold py-4 rounded-full font-medium text-sm hover:bg-gold hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
                      icon: wishlisted ? '💔' : '❤️',
                    });
                  }}
                  className="w-full border border-[#333] text-[#999] py-4 rounded-full font-medium text-sm hover:border-gold hover:text-gold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-gold text-gold' : ''}`} />
                  {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 text-[#666] text-xs">
                  <Shield className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-[#666] text-xs">
                  <Truck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>COD Available</span>
                </div>
                <div className="flex items-center gap-2 text-[#666] text-xs">
                  <RotateCcw className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>7-Day Returns</span>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 text-sm text-[#666]">
                <span>Share:</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard');
                  }}
                  className="hover:text-gold transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fragrance Notes */}
      <section className="py-16 sm:py-20 bg-[#0A0A0A]" ref={notesRef}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-white text-center mb-14">
            The Scent Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Top Notes */}
            <div className="reveal text-center opacity-0 translate-y-8 transition-all duration-700" style={{ transitionProperty: 'opacity, transform' }}>
              <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-cream mb-3">Top Notes</h3>
              <p className="font-display text-lg text-white/80 italic mb-3">
                {product.topNotes.join(', ')}
              </p>
              <p className="text-[#999] text-sm">The first impression — bright and inviting.</p>
            </div>

            {/* Heart Notes */}
            <div className="reveal text-center opacity-0 translate-y-8 transition-all duration-700" style={{ transitionProperty: 'opacity, transform', transitionDelay: '150ms' }}>
              <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-cream mb-3">Heart Notes</h3>
              <p className="font-display text-lg text-white/80 italic mb-3">
                {product.middleNotes.join(', ')}
              </p>
              <p className="text-[#999] text-sm">The soul of the fragrance — warm and lasting.</p>
            </div>

            {/* Base Notes */}
            <div className="reveal text-center opacity-0 translate-y-8 transition-all duration-700" style={{ transitionProperty: 'opacity, transform', transitionDelay: '300ms' }}>
              <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-cream mb-3">Base Notes</h3>
              <p className="font-display text-lg text-white/80 italic mb-3">
                {product.baseNotes.join(', ')}
              </p>
              <p className="text-[#999] text-sm">The foundation — deep and memorable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Details */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Story */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-6">The Story</h3>
            <p className="font-display text-lg sm:text-xl text-cream italic leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Details Table */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-6">Details</h3>
            <div className="space-y-0">
              {[
                { label: 'Longevity', value: product.longevity },
                { label: 'Projection', value: product.projection },
                { label: 'Sillage', value: product.sillage },
                { label: 'Best For', value: product.bestFor.join(', ') },
                { label: 'Concentration', value: product.concentration },
                { label: 'Size', value: product.size },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-4 border-b border-[#1A1A1A]"
                >
                  <span className="text-[#999] text-sm">{row.label}</span>
                  <span className="text-white text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 sm:py-20 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">Customer Reviews</h3>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl font-semibold text-white">{product.rating}</span>
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
            </div>
            <p className="text-[#666] text-sm">Based on {product.reviewCount} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2 mb-10">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-[#999] text-xs w-8">{star}★</span>
                  <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[#666] text-xs w-8">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Write Review */}
          {!showReviewForm && (
            <div className="text-center mb-10">
              <button
                onClick={() => setShowReviewForm(true)}
                className="border border-[#333] text-[#999] px-6 py-2.5 rounded-full text-sm hover:border-gold hover:text-gold transition-colors"
              >
                Write a Review
              </button>
            </div>
          )}

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-10 bg-black border border-[#1A1A1A] rounded-lg p-6">
              <h4 className="font-display text-lg text-white mb-4">Write Your Review</h4>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold text-sm"
                  required
                />
                <div className="flex items-center gap-3">
                  <span className="text-[#999] text-sm">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        <Star
                          className={`w-5 h-5 ${star <= newReview.rating ? 'text-gold fill-gold' : 'text-[#333]'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Share your experience..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full bg-transparent border border-[#333] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-gold text-sm min-h-[100px] resize-none"
                  required
                />
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-gold text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-cream transition-colors"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="text-[#666] text-sm hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Review Cards */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-[#1A1A1A] pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white text-sm font-medium">{review.name}</span>
                  <span className="text-[#666] text-xs">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-[#999] text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-10">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
