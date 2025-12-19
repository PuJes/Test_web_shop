
import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, updateQuantity, removeItem }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const merchantEmail = "orders@thedessertroom.co.nz";
    const subject = encodeURIComponent("New Order Request - The Dessert Room Clone");
    
    let orderDetails = "ORDER SUMMARY:\n";
    items.forEach(item => {
      orderDetails += `- ${item.name} x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    orderDetails += `\nTOTAL: $${total.toFixed(2)}\n`;
    orderDetails += "\n------------------------------------------\n";
    orderDetails += "PLEASE PROVIDE YOUR DELIVERY DETAILS BELOW:\n";
    orderDetails += "Full Name:\n";
    orderDetails += "Phone Number:\n";
    orderDetails += "Delivery Address:\n";
    orderDetails += "Preferred Delivery Date/Time:\n";
    orderDetails += "Additional Notes:\n";
    orderDetails += "------------------------------------------\n";

    const body = encodeURIComponent(orderDetails);
    
    window.location.href = `mailto:${merchantEmail}?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 luxury-border">
            <h2 className="text-xl font-medium serif tracking-wide">Your Cart</h2>
            <button onClick={onClose} className="text-zinc-400 hover:text-black">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-500 italic">Your cart is currently empty...</p>
                <button 
                  onClick={onClose}
                  className="mt-6 border border-black px-8 py-2 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-sm" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium uppercase tracking-wider">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-zinc-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      {item.selectedFlavor && `Flavor: ${item.selectedFlavor}`}
                      {item.selectedSize && ` | Size: ${item.selectedSize}`}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-zinc-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-zinc-100">
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-zinc-100">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-8 bg-zinc-50 space-y-4">
              <div className="flex justify-between text-lg font-medium serif">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-zinc-400 italic">Clicking Checkout will open your email client to send your order details to us.</p>
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-4 text-sm uppercase tracking-[0.2em] hover:bg-zinc-800 transition"
              >
                Checkout via Email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
