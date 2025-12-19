
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Lock, ChevronRight, LayoutDashboard } from 'lucide-react';
import { getStoredProducts, saveProducts } from '../services/storageService';
import { Category } from '../types';

// 直接硬编码生产环境密码
const PRODUCTION_PASSCODE = '102938765aacc';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setProducts(getStoredProducts());
    }
  }, [isAuthenticated]);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === PRODUCTION_PASSCODE) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPasscode('');
      setTimeout(() => setError(false), 1000);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveProduct = () => {
    const updatedProducts = products.map(p => p.id === editingId ? editForm : p);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个产品吗？')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
    }
  };

  const handleAddNew = () => {
    const newProduct = {
      id: Date.now().toString(),
      sku: `NEW-${Math.floor(Math.random() * 1000)}`,
      name: '新产品',
      price: 0,
      category: Category.CAKES,
      description: '',
      image: '',
      stock: 0,
      flavors: [],
      sizes: []
    };
    setEditingId(newProduct.id);
    setEditForm(newProduct);
    setProducts([newProduct, ...products]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-sm w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center">
            <div className="w-16 h-16 border border-zinc-100 flex items-center justify-center rounded-full">
              <Lock className="text-zinc-300" size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-normal serif tracking-widest mb-2">访问受限</h1>
            <p className="text-zinc-400 text-xs uppercase tracking-[0.2em]">请输入商家通行码</p>
          </div>
          <form onSubmit={handlePasscodeSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="•••••••••••••"
                className={`w-full text-center text-2xl tracking-[0.5em] border-b pb-2 focus:outline-none transition-colors duration-300 ${error ? 'border-red-400 text-red-400 animate-shake' : 'border-zinc-200 focus:border-black'}`}
              />
              {error && <p className="text-[10px] text-red-400 uppercase tracking-widest mt-4">密码无效</p>}
            </div>
            <button 
              type="submit"
              disabled={passcode.length < 5}
              className="group flex items-center justify-center space-x-2 w-full border border-black py-4 text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all disabled:opacity-30"
            >
              <span>进入控制台</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          <p className="text-[10px] text-zinc-300 uppercase tracking-widest pt-8">The Dessert Room · 管理系统安全保护</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-normal serif tracking-tight">管理控制台</h1>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest pb-1 border-b-2 border-black text-black">
              <LayoutDashboard size={14} />
              <span>库存管理</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleAddNew}
          className="flex items-center space-x-2 bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-zinc-800 transition"
        >
          <Plus size={16} />
          <span>添加新产品</span>
        </button>
      </div>

      <div className="overflow-x-auto border border-zinc-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold border-b border-zinc-100">
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">产品名称</th>
              <th className="px-6 py-4">类别</th>
              <th className="px-6 py-4">价格</th>
              <th className="px-6 py-4">库存</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 text-sm">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-zinc-50/50 transition">
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">{product.sku}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={product.image || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 object-cover rounded-sm" />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-500">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {product.stock} 在库
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(product)} className="text-zinc-400 hover:text-black transition">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-zinc-400 hover:text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingId && editForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCancel} />
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8 pb-4 border-b">
              <h2 className="text-2xl font-normal serif">编辑产品信息</h2>
              <button onClick={handleCancel} className="text-zinc-400 hover:text-black transition">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">SKU</label>
                  <input 
                    type="text" 
                    value={editForm.sku} 
                    onChange={(e) => setEditForm({...editForm, sku: e.target.value})}
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">价格 ($)</label>
                  <input 
                    type="number" 
                    value={editForm.price} 
                    onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">产品全名</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">类别</label>
                  <select 
                    value={editForm.category} 
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition bg-transparent"
                  >
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">库存数量</label>
                  <input 
                    type="number" 
                    value={editForm.stock} 
                    onChange={(e) => setEditForm({...editForm, stock: parseInt(e.target.value)})}
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">描述</label>
                <textarea 
                  value={editForm.description} 
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  rows={3}
                  className="w-full border border-zinc-200 p-3 focus:outline-none focus:border-black transition text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">图片 URL</label>
                <input 
                  type="text" 
                  value={editForm.image} 
                  onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                  className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">口味 (逗号隔开)</label>
                  <input 
                    type="text" 
                    value={editForm.flavors?.join(', ')} 
                    onChange={(e) => setEditForm({...editForm, flavors: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">尺寸 (逗号隔开)</label>
                  <input 
                    type="text" 
                    value={editForm.sizes?.join(', ')} 
                    onChange={(e) => setEditForm({...editForm, sizes: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <button 
                onClick={handleSaveProduct}
                className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition mt-4"
              >
                保存所有更改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
