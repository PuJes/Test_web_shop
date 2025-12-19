
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search as SearchIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart, onSearch, searchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when navigating away from shop unless it's the search triggering it
  useEffect(() => {
    if (location.pathname !== '/shop' && !searchQuery) {
      setIsSearchOpen(false);
    }
  }, [location, searchQuery]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          
          {/* Left Section: Mobile Menu / Nav Links */}
          <div className="flex-1 flex items-center">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex space-x-6 lg:space-x-8 text-[10px] lg:text-xs uppercase tracking-[0.2em] font-medium">
              <Link to="/" className="hover:text-zinc-400 transition whitespace-nowrap">Home</Link>
              <Link to="/shop" className="hover:text-zinc-400 transition whitespace-nowrap">Shop All</Link>
              <Link to="/custom" className="hover:text-zinc-400 transition whitespace-nowrap">Custom Orders</Link>
            </div>
          </div>

          {/* Center Section: Logo */}
          <div className="flex-shrink-0 flex justify-center px-4">
            {!isSearchOpen && (
              <Link to="/" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal uppercase tracking-[0.2em] serif transition-opacity duration-300 whitespace-nowrap">
                THE DESSERT ROOM
              </Link>
            )}
          </div>

          {/* Right Section: Actions */}
          <div className="flex-1 flex justify-end items-center space-x-4 lg:space-x-6 text-zinc-600">
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-zinc-50 border-b border-black px-2 animate-in fade-in slide-in-from-right-4 duration-300">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search desserts..."
                    className="bg-transparent py-1 px-2 text-xs focus:outline-none w-24 sm:w-32 md:w-48 lg:w-64"
                  />
                  <button onClick={() => { setIsSearchOpen(false); onSearch(''); }} className="p-1 hover:text-black">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)} 
                  className="hover:text-zinc-900 transition p-1"
                  aria-label="Search"
                >
                  <SearchIcon size={18} />
                </button>
              )}
            </div>
            
            <button onClick={toggleCart} className="relative hover:text-zinc-900 transition p-1">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
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
          <Link to="/" className="block text-sm uppercase tracking-widest" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" className="block text-sm uppercase tracking-widest" onClick={() => setIsOpen(false)}>Shop All</Link>
          <Link to="/custom" className="block text-sm uppercase tracking-widest" onClick={() => setIsOpen(false)}>Custom Orders</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
