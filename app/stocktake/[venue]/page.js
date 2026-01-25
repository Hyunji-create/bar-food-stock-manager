"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function StocktakePage({ params }) {
  const { venue } = React.use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) console.error('Error fetching:', error);
      else setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Loading {venue} Inventory...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">{venue} Stocktake</h1>
        <Link href="/" className="text-blue-500 font-medium">Back</Link>
      </header>

      <main className="p-4 space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase">Qty (L/Kg)</label>
                <input type="number" className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase">Expiry/Made Date</label>
                <input type="date" className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all">
          Submit {venue} Stock
        </button>
      </div>
    </div>
  );
}
