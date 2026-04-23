import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { products, priceRanges, fragranceFamilies, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryFilter = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'featured';
  const selectedGenders = searchParams.getAll('gender');
  const selectedFamilies = searchParams.getAll('family');
  const selectedPriceRanges = searchParams.getAll('price');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fragranceFamily.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Gender filter
    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.category));
    }

    // Fragrance family filter
    if (selectedFamilies.length > 0) {
      result = result.filter((p) =>
        selectedFamilies.some((f) =>
          p.fragranceFamily.toLowerCase().includes(f.toLowerCase())
        )
      );
    }

    // Price filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) =>
        selectedPriceRanges.some((rangeLabel) => {
          const range = priceRanges.find((r) => r.label === rangeLabel);
          if (!range) return false;
          return p.price >= range.min && p.price < range.max;
        })
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [categoryFilter, searchQuery, sortBy, selectedGenders, selectedFamilies, selectedPriceRanges]);

  const toggleParam = (key: string, value: string) => {
    const current = searchParams.getAll(key);
    const next = new URLSearchParams(searchParams);
    next.delete(key);
    if (current.includes(value)) {
      current.filter((v) => v !== value).forEach((v) => next.append(key, v));
    } else {
      current.forEach((v) => next.append(key, v));
      next.append(key, value);
    }
    setSearchParams(next);
  };

  const setSingleParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount =
    selectedGenders.length + selectedFamilies.length + selectedPriceRanges.length;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Gender */}
      <div>
        <h4 className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-4">
          Gender
        </h4>
        <div className="space-y-2">
          {['men', 'women', 'unisex'].map((gender) => (
            <label key={gender} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border transition-colors duration-200 flex items-center justify-center ${
                  selectedGenders.includes(gender)
                    ? 'bg-gold border-gold'
                    : 'border-[#333] group-hover:border-gold'
                }`}
                onClick={() => toggleParam('gender', gender)}
              >
                {selectedGenders.includes(gender) && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#999] group-hover:text-white transition-colors capitalize">
                {gender}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fragrance Family */}
      <div>
        <h4 className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-4">
          Fragrance Family
        </h4>
        <div className="space-y-2">
          {fragranceFamilies.map((family) => (
            <label key={family} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border transition-colors duration-200 flex items-center justify-center ${
                  selectedFamilies.includes(family)
                    ? 'bg-gold border-gold'
                    : 'border-[#333] group-hover:border-gold'
                }`}
                onClick={() => toggleParam('family', family)}
              >
                {selectedFamilies.includes(family) && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#999] group-hover:text-white transition-colors">
                {family}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs uppercase tracking-[0.15em] text-[#999] font-medium mb-4">
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border transition-colors duration-200 flex items-center justify-center ${
                  selectedPriceRanges.includes(range.label)
                    ? 'bg-gold border-gold'
                    : 'border-[#333] group-hover:border-gold'
                }`}
                onClick={() => toggleParam('price', range.label)}
              >
                {selectedPriceRanges.includes(range.label) && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#999] group-hover:text-white transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="pt-32 sm:pt-40 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
          Our Collection
        </h1>
        <p className="text-[#999] text-base sm:text-lg max-w-lg mx-auto">
          Discover your signature scent from our curated range.
        </p>
        {searchQuery && (
          <p className="text-gold text-sm mt-3">
            Search results for "{searchQuery}"
          </p>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm text-[#999] hover:text-gold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <p className="text-sm text-[#666]">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#666]">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSingleParam('sort', e.target.value)}
                className="appearance-none bg-transparent border border-[#333] text-white text-sm py-2 pl-4 pr-10 rounded focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#666] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {selectedGenders.map((g) => (
              <span
                key={g}
                className="inline-flex items-center gap-1 bg-[#1A1A1A] text-[#999] text-xs px-3 py-1.5 rounded-full"
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
                <button onClick={() => toggleParam('gender', g)}>
                  <X className="w-3 h-3 hover:text-gold" />
                </button>
              </span>
            ))}
            {selectedFamilies.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 bg-[#1A1A1A] text-[#999] text-xs px-3 py-1.5 rounded-full"
              >
                {f}
                <button onClick={() => toggleParam('family', f)}>
                  <X className="w-3 h-3 hover:text-gold" />
                </button>
              </span>
            ))}
            {selectedPriceRanges.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1 bg-[#1A1A1A] text-[#999] text-xs px-3 py-1.5 rounded-full"
              >
                {p}
                <button onClick={() => toggleParam('price', p)}>
                  <X className="w-3 h-3 hover:text-gold" />
                </button>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="text-gold text-xs hover:underline"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#999] text-lg mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-gold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-black border-r border-[#1A1A1A] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-xl text-white">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-[#999] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-gold text-black py-3 rounded-full font-medium mt-8 hover:bg-cream transition-colors"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
