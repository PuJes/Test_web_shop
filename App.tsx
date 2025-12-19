
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { Product, CartItem } from './types';

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && window.location.hash !== '#/shop') {
      navigate('/shop');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-black selection:text-white">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        toggleCart={() => setIsCartOpen(true)} 
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} searchQuery={searchQuery} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
