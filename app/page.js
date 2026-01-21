import React from 'react';

export default function Home() {
  const venues = [
    { id: 'WYN', name: 'WYN Venue', color: '#3b82f6' },
    { id: 'MCC', name: 'MCC Venue', color: '#10b981' },
    { id: 'WSQ', name: 'WSQ Venue', color: '#f59e0b' },
    { id: 'DSQ', name: 'DSQ Venue', color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Bar Food Stock</h1>
        <p className="text-gray-500">Select venue for stocktake</p>
      </header>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {venues.map((venue) => (
          <button
            key={venue.id}
            className="h-20 text-xl font-bold text-white rounded-xl shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: venue.color }}
            onClick={() => alert(`Starting stocktake for ${venue.id}`)}
          >
            {venue.name}
          </button>
        ))}
      </div>

      <hr className="w-full max-w-sm my-8 border-gray-300" />

      <button 
        className="w-full max-w-sm h-14 bg-gray-800 text-white rounded-xl font-semibold shadow-md active:bg-gray-900"
        onClick={() => window.location.href = `/stocktake/${venue.id}`}
      >
        View All Venue Stock
      </button>

      <footer className="mt-auto pt-10 text-xs text-gray-400">
        Connected to Supabase & Slack
      </footer>
    </div>
  );
}
