"use client";

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const venues = [
    { id: 'WYN', name: 'WYN Venue', color: 'bg-blue-600' },
    { id: 'MCC', name: 'MCC Venue', color: 'bg-emerald-600' },
    { id: 'WSQ', name: 'WSQ Venue', color: 'bg-orange-500' },
    { id: 'DSQ', name: 'DSQ Venue', color: 'bg-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
      <header className="mb-10 mt-8 text-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Bar Food Stock</h1>
        <p className="text-gray-500 mt-2">Select venue for stocktake</p>
      </header>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {venues.map((v) => (
          <Link 
            key={v.id} 
            href={`/stocktake/${v.id}`}
            className={`${v.color} flex items-center justify-center h-24 text-2xl font-bold text-white rounded-2xl shadow-lg active:scale-95 transition-transform`}
          >
            {v.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 w-full max-w-sm">
        <Link 
          href="/stocktake/all"
          className="flex items-center justify-center w-full h-14 bg-gray-800 text-white rounded-xl font-semibold shadow-md active:bg-gray-900"
        >
          View All Venue Stock
        </Link>
      </div>

      <footer className="mt-auto pt-10 text-xs text-gray-400 font-medium uppercase tracking-widest">
        Connected to Supabase
      </footer>
    </div>
  );
}
