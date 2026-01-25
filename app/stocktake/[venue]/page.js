"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function StocktakePage({ params }) {
  // In Next.js 15+, params is a Promise that must be unwrapped
  const { venue } = React.use(params);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });

        if (supabaseError) throw supabaseError;
        setProducts(data || []);
      } catch (err) {
        console.error('Supabase Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (venue) {
      fetchProducts();
    }
  }, [venue]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold animate-pulse text-gray-400">Loading {venue} Inventory...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex justify-between items-center border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{venue}</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Stocktake Mode</p>
        </div>
        <Link href="/" className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 active:scale-95 transition-all">
          Exit
        </Link>
      </header>

      {/* Product List */}
      <main className="p-4 space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
            <strong>Error:</strong> {error}
          </div>
        )}

        {products.length === 0 && !error && (
          <div className="text-center py-20 text-gray-400">
            No products found in the database.
          </div>
        )}

        {products.map((product) => (
          <div key={product.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4">{product.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Quantity</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="w-full bg-gray-50 border-none p-4 rounded-xl text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="0.0" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Expiry/Date</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-200">
        <button className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg shadow-xl active:scale-[0.98] transition-all">
          SUBMIT {venue} DATA
        </button>
      </div>
    </div>
  );
}
