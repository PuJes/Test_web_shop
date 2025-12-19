
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FEATURED_COLLECTIONS = [
  { id: 'cakes', name: 'Signature Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop', link: '/shop?cat=Cakes' },
  { id: 'cupcakes', name: 'Artisan Cupcakes', image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1000&auto=format&fit=crop', link: '/shop?cat=Cupcakes' },
  { id: 'macarons', name: 'French Macarons', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=1000&auto=format&fit=crop', link: '/shop?cat=Macarons' },
];

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero Dessert" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">Art for Your Moments</h1>
            <p className="text-lg md:text-xl font-light mb-10 tracking-widest uppercase italic">Handcrafted · Luxury Taste</p>
            <Link to="/shop" className="inline-block border border-white px-10 py-4 text-sm uppercase tracking-[0.3em] hover:bg-white hover:text-black transition duration-500">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 block mb-2 font-bold">Collections</span>
            <h2 className="text-4xl font-normal serif">Curated Selections</h2>
          </div>
          <Link to="/shop" className="text-sm uppercase tracking-widest flex items-center hover:opacity-60 transition">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_COLLECTIONS.map((col) => (
            <Link key={col.id} to={col.link} className="group overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img 
                  src={col.image} 
                  alt={col.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <h3 className="text-xl serif font-normal text-center group-hover:italic transition-all">{col.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Quality Statement */}
      <section className="py-32 bg-zinc-50 text-center px-4">
        <div className="max-w-2xl mx-auto italic text-2xl md:text-3xl font-light serif leading-relaxed text-zinc-700">
          “We believe every dessert should tell a story of elegance, purity, and joy. We use only the finest ingredients to transform nature's gifts into edible art.”
        </div>
        <div className="mt-12 text-sm uppercase tracking-widest text-zinc-400">— Our Promise</div>
      </section>
    </div>
  );
};

export default Home;
