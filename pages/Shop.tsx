
import React, { useState } from 'react';
import { Category, Product } from '../types';

const PRODUCTS: Product[] = [
  { id: '1', name: '伯爵茶薰衣草蛋糕', price: 85, category: Category.CAKES, description: '轻盈的伯爵茶海绵蛋糕，点缀有机薰衣草花瓣。', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop' },
  { id: '2', name: '树莓丝绒纸杯蛋糕', price: 24, category: Category.CUPCAKES, description: '经典红丝绒与新鲜树莓的完美结合。', image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop' },
  { id: '3', name: '玫瑰花瓣马卡龙', price: 32, category: Category.MACARONS, description: '12枚装，带有淡淡的保加利亚玫瑰香气。', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800&auto=format&fit=crop' },
  { id: '4', name: '香草接骨木花蛋糕', price: 92, category: Category.CAKES, description: '皇室婚礼同款风味，清爽花香。', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?q=80&w=800&auto=format&fit=crop' },
  { id: '5', name: '咸焦糖山核桃蛋糕', price: 78, category: Category.CAKES, description: '浓郁的咸焦糖与松脆山核桃。', image: 'https://images.unsplash.com/photo-1535231544450-b414669ef8e7?q=80&w=800&auto=format&fit=crop' },
  { id: '6', name: '奢华巧克力礼盒', price: 45, category: Category.GIFTS, description: '精选手工巧克力，适合赠送心意。', image: 'https://images.unsplash.com/photo-1549007994-cb92cfd38457?q=80&w=800&auto=format&fit=crop' },
];

interface ShopProps {
  addToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-5xl font-normal serif mb-12 text-center tracking-tight">全线甜点</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm uppercase tracking-[0.2em]">
        <button 
          onClick={() => setActiveCategory('All')}
          className={`pb-1 border-b transition-all ${activeCategory === 'All' ? 'border-black' : 'border-transparent text-zinc-400 hover:text-black'}`}
        >
          全部
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filtered.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-zinc-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <button 
                onClick={() => addToCart(product)}
                className="absolute bottom-0 left-0 w-full bg-black text-white py-4 translate-y-full group-hover:translate-y-0 transition duration-300 text-xs uppercase tracking-widest"
              >
                加入购物车
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
    </div>
  );
};

export default Shop;
