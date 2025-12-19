
import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-normal tracking-[0.2em] serif mb-6">THE DESSERT ROOM</h2>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6">
            手工制作，旨在为您最重要的时刻增光添彩。我们热爱创意，专注于将每一份甜品打造成独一无二的礼物。
          </p>
          <div className="flex space-x-6 text-zinc-400">
            <a href="#" className="hover:text-black transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-black transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-black transition"><Mail size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest mb-6">菜单</h3>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-black transition">关于我们</a></li>
            <li><a href="#" className="hover:text-black transition">配送说明</a></li>
            <li><a href="#" className="hover:text-black transition">退换政策</a></li>
            <li><a href="#" className="hover:text-black transition">联系我们</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest mb-6">联系方式</h3>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li>奥克兰中央商务区</li>
            <li>联系电话: 09 123 4567</li>
            <li>邮件: hello@thedessertroom.co.nz</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t text-[10px] uppercase tracking-widest text-zinc-400 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2024 THE DESSERT ROOM. 保留所有权利。</p>
        <p className="mt-4 md:mt-0">极简美学 · 由 AI 驱动建议</p>
      </div>
    </footer>
  );
};

export default Footer;
