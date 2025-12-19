
import React, { useState, useMemo, useEffect } from 'react';
import { Category, Product } from '../types';
import { getStoredProducts } from '../services/storageService';

interface ShopProps {
  addToCart: (product: Product) => void;
  searchQuery: string;
}

const Shop: React.FC<ShopProps> = ({ addToCart, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-5xl font-normal serif mb-12 text-center tracking-tight">
        {searchQuery ? `Results for "${searchQuery}"` : 'Shop All'}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm uppercase tracking-[0.2em]">
        <button 
          onClick={() => setActiveCategory('All')}
          className={`pb-1 border-b transition-all ${activeCategory === 'All' ? 'border-black' : 'border-transparent text-zinc-400 hover:text-black'}`}
        >
          All
        </button>
        {Object.values(Category).map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-1 border-b transition-all ${activeCategory === cat ? 'border-black' : 'border-transparent text-zinc-400 hover:text-black'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filtered.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-zinc-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <span className="bg-black text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold">Sold Out</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <button 
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                  className={`absolute bottom-0 left-0 w-full bg-black text-white py-4 translate-y-full group-hover:translate-y-0 transition duration-300 text-xs uppercase tracking-widest disabled:bg-zinc-400 disabled:cursor-not-allowed`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest mb-1">{product.name}</h3>
                  <p className="text-xs text-zinc-400 italic mb-2">{product.category}</p>
                </div>
                <span className="text-sm font-medium">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-zinc-500 italic text-lg serif">No products found matching your criteria.</p>
          <button 
            onClick={() => { setActiveCategory('All'); }} 
            className="mt-6 text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-zinc-500 transition"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
