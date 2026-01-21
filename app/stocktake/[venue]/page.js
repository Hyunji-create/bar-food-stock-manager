"use client";
import React, { useState } from 'react';

export default function StocktakeForm({ params }) {
  // This gets 'WYN', 'MCC', etc. from the URL
  const { venue } = React.use(params); 
  
  const [items, setItems] = useState([
    { name: 'Tomato Paste', qty: '', date: '' },
    { name: 'Lemon Mix', qty: '', date: '' }
  ]);

  return (
    <div className="min-h-screen bg-white p-4 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{venue} Stocktake</h1>
        <a href="/" className="text-blue-500 font-semibold">Cancel</a>
      </header>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="p-4 border rounded-xl bg-gray-50 shadow-sm">
            <h3 className="font-bold text-lg mb-3">{item.name}</h3>
            
            <label className="block text-sm font-medium text-gray-700">Quantity (L/Kg)</label>
            <input 
              type="number" 
              placeholder="0.0" 
              className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-700">Production Date</label>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg"
            />
          </div>
        ))}
      </div>

      <button 
        className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
        onClick={() => alert('Sending to Supabase & Slack...')}
      >
        Submit Stocktake
      </button>
    </div>
  );
}
