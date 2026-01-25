"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Using @ alias or correct relative path
import Link from 'next/link';

export default function StocktakeForm({ params }) {
  // Use React.use() to unwrap params safely
  const resolvedParams = React.use(params);
  const venue = resolvedParams.venue;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error("Supabase Error:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">Loading {venue} Products...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans pb-24">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 uppercase">{venue}</h1>
          <p className="text-sm text-gray-500">Inventory Management</p>
        </div>
        <Link href="/" className="text-blue-600 font-medium">← Back</Link>
      </header>

      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center border border-dashed border-gray-300">
            <p className="text-gray-500">No products found in database.</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-700">{product.name}</h2>
              <p className="text-xs text-gray-400 mb-3">Shelf Life: {product.shelf_life_days} days</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Qty (L/Kg)</label>
                  <input type="number" step="0.1" className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.0" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Made On</label>
                  <input type="date" className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all shadow-lg"
          onClick={() => alert(`Submitting ${venue} stock...`)}
        >
          Submit {venue} Stock
        </button>
      </div>
    </div>
  );
}
