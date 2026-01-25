"use client"; // Required for interactivity like onClick

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const venues = [
  { id: 'WYN', name: 'WYN Venue', color: 'bg-blue-500' },
  { id: 'MCC', name: 'MCC Venue', color: 'bg-emerald-500' },
  { id: 'WSQ', name: 'WSQ Venue', color: 'bg-amber-500' },
  { id: 'DSQ', name: 'DSQ Venue', color: 'bg-red-500' },
];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Bar Food Stock</h1>
        <p className="text-gray-500">Select venue for stocktake</p>
      </header>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {venues.map((venue) => (
          /* Use Link for internal navigation */
          <Link 
            key={venue.id} 
            href={`/stocktake/${venue.id}`}
            className="flex items-center justify-center h-20 text-xl font-bold text-white rounded-xl shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: venue.color }}
          >
            {venue.name}
          </Link>
        ))}
      </div>

      <hr className="w-full max-w-sm my-8 border-gray-300" />

      {/* Changed this to a generic link since "venue.id" isn't specific here */}
      <Link 
  key={venue.id} 
  href={`/stocktake/${venue.id}`}
  className={`${venue.color} flex items-center justify-center h-24 text-2xl font-black text-white rounded-2xl shadow-xl active:scale-95 transition-transform mb-4`}
>
  {venue.name}
</Link>

      <footer className="mt-auto pt-10 text-xs text-gray-400">
        Connected to Supabase & Slack
      </footer>
    </div>
  );
}
