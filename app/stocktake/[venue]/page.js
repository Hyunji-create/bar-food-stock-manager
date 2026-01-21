"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function StocktakeForm({ params }) {
  const { venue } = React.use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products from your Supabase table
  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (data) setProducts(data);
      setLoading(false);
    }
    getProducts();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Products...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{venue} Stocktake</h1>
        <button onClick={() => window.location.href='/'} className="text-blue-500">Back</button>
      </header>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-700">{product.name}</h2>
            <p className="text-xs text-gray-400 mb-3">Shelf Life: {product.shelf_life_days} days</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Qty (L/Kg)</label>
                <input type="number" step="0.1" className="w-full border p-3 rounded-xl bg-gray-50" placeholder="0" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Made On</label>
                <input type="date" className="w-full border p-3 rounded-xl bg-gray-50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button 
          className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all"
          onClick={() => alert('Logic coming next: Save to Supabase & Send to Slack!')}
        >
          Submit {venue} Stock
        </button>
      </div>
    </div>
  );
}
