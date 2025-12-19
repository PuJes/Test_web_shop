
import React from 'react';
import { Instagram, Facebook, Mail, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-normal tracking-[0.2em] serif mb-6">THE DESSERT ROOM</h2>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6">
            Handcrafted treats designed to elevate your most precious moments. We celebrate creativity and dedicate ourselves to making every gift unique.
          </p>
          <div className="flex space-x-6 text-zinc-400">
            <a href="#" className="hover:text-black transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-black transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-black transition"><Mail size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest mb-6">Menu</h3>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-black transition">About Us</a></li>
            <li><a href="#" className="hover:text-black transition">Shipping Info</a></li>
            <li><a href="#" className="hover:text-black transition">Returns Policy</a></li>
            <li><Link to="/admin" className="hover:text-black transition flex items-center space-x-2">
              <Settings size={14} />
              <span>Merchant Console</span>
            </Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest mb-6">Connect</h3>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li>Auckland CBD, NZ</li>
            <li>Phone: 09 123 4567</li>
            <li>Email: hello@thedessertroom.co.nz</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t text-[10px] uppercase tracking-widest text-zinc-400 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2024 THE DESSERT ROOM. All Rights Reserved.</p>
        <p className="mt-4 md:mt-0">Minimalist Aesthetic · Powered by AI Concierge</p>
      </div>
    </footer>
  );
};

export default Footer;
