
import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { getDessertRecommendations } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    const data = await getDessertRecommendations(prompt);
    setResults(data);
    setLoading(false);
  };

  return (
    <section className="bg-zinc-50 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
          <Sparkles className="text-zinc-800" size={24} />
        </div>
        <h2 className="text-3xl md:text-4xl font-normal mb-6 serif">寻找完美的甜点？</h2>
        <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
          让我们的 AI 甜点助手为您提供建议。只需描述您的场合或口味偏好，如“我想要一款适合30人婚礼、口感轻盈的蛋糕”。
        </p>

        <form onSubmit={handleAsk} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="告诉助手您的需求..."
            className="w-full bg-white border-b border-zinc-200 py-4 px-4 pr-12 focus:outline-none focus:border-black transition text-lg"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition disabled:opacity-50"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </form>

        {results && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {results.map((res, idx) => (
              <div key={idx} className="bg-white p-6 rounded-sm shadow-sm border border-zinc-100">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-2">{res.dessertType}</span>
                <h3 className="text-lg font-medium serif mb-2">{res.flavor}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{res.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Assistant;
