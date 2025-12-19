
import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium">
            <Link to="/" className="hover:text-zinc-400 transition">首页</Link>
            <Link to="/shop" className="hover:text-zinc-400 transition">全线产品</Link>
            <Link to="/custom" className="hover:text-zinc-400 transition">私人定制</Link>
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-normal uppercase tracking-[0.2em] serif">
            THE DESSERT ROOM
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-5 text-zinc-600">
            <button className="hover:text-zinc-900 transition hidden sm:block">
              <Search size={20} />
            </button>
            <button onClick={toggleCart} className="relative hover:text-zinc-900 transition">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-6 space-y-4 border-t">
          <Link to="/" className="block text-lg uppercase tracking-widest" onClick={() => setIsOpen(false)}>首页</Link>
          <Link to="/shop" className="block text-lg uppercase tracking-widest" onClick={() => setIsOpen(false)}>全线产品</Link>
          <Link to="/custom" className="block text-lg uppercase tracking-widest" onClick={() => setIsOpen(false)}>私人定制</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
