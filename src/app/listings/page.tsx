'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, RefreshCw, MapPin, DollarSign, Car, Search } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  image: string;
  url: string;
  source: string;
}

const MODEL_NAMES: Record<string, string> = {
  'monte-carlo': 'Monte Carlo',
  'grand-national': 'Grand National',
  'cutlass-supreme': 'Cutlass Supreme',
  'regal': 'Buick Regal',
  'el-camino': 'El Camino',
  'malibu': 'Chevy Malibu',
  'grand-prix': 'Grand Prix',
};

const SOURCE_ICONS: Record<string, string> = {
  'ebay': '🛒',
  'facebook': '👤',
  'craigslist': '📍',
  'bat': '🏁',
  'cars': '🚗',
  'autotrader': '🔍',
};

const SOURCE_COLORS: Record<string, string> = {
  'ebay': 'border-yellow-500 bg-yellow-500/10',
  'facebook': 'border-blue-500 bg-blue-500/10',
  'craigslist': 'border-purple-500 bg-purple-500/10',
  'bat': 'border-green-500 bg-green-500/10',
};

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const model = searchParams.get('model') || 'monte-carlo';
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const modelName = MODEL_NAMES[model as keyof typeof MODEL_NAMES] || 'G-Body';

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const res = await fetch(`/api/listings?model=${model}`);
        const data = await res.json();
        setListings(data.listings || []);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
      setLoading(false);
    }
    fetchListings();
  }, [model]);

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Header */}
      <header className="bg-[var(--gb-surface)] border-b border-[var(--gb-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="chrome-text">G-BODY</span> FINDER
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/listings" className="text-orange-500 font-semibold">Listings</Link>
            <Link href="/parts" className="text-[var(--gb-text-secondary)] hover:text-white">Parts</Link>
            <Link href="/build-calculator" className="text-[var(--gb-text-secondary)] hover:text-white">Build Calc</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{modelName} Listings</h1>
          <p className="text-[var(--gb-text-secondary)]">
            Real listings from Facebook, Craigslist, eBay, and Bring a Trailer
          </p>
        </div>

        {/* Model Selector */}
        <div className="mb-8 flex flex-wrap gap-2">
          {Object.entries(MODEL_NAMES).map(([key, name]) => (
            <Link
              key={key}
              href={`/listings?model=${key}`}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                model === key
                  ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                  : 'border-[var(--gb-border)] bg-[var(--gb-surface)] text-[var(--gb-text-secondary)] hover:border-orange-500/50'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="animate-spin mx-auto mb-4 text-orange-500" size={32} />
            <p className="text-[var(--gb-text-muted)]">Searching all platforms...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <a
                key={listing.id}
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-xl border overflow-hidden transition-all hover:scale-[1.02] ${
                  SOURCE_COLORS[listing.source] || 'border-[var(--gb-border)] bg-[var(--gb-surface)]'
                }`}
              >
                <div className="aspect-video relative overflow-hidden bg-[var(--gb-dark)]">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/cars/placeholder.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      listing.source === 'ebay' ? 'bg-yellow-500 text-black' :
                      listing.source === 'facebook' ? 'bg-blue-500 text-white' :
                      listing.source === 'craigslist' ? 'bg-purple-500 text-white' :
                      listing.source === 'bat' ? 'bg-green-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {listing.source.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">
                    {listing.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--gb-text-muted)] flex items-center gap-1">
                      <MapPin size={14} />
                      {listing.location}
                    </span>
                    <ExternalLink size={16} className="text-orange-500" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Search Tips */}
        <div className="mt-12 gb-card p-6">
          <h2 className="font-semibold text-lg mb-4">💡 Pro Search Tips</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--gb-text-secondary)]">
            <div>
              <h4 className="font-medium text-white mb-2">Best Keywords for {modelName}</h4>
              <ul className="space-y-1">
                <li>• "{modelName} project" - find fixer-uppers</li>
                <li>• "{modelName} restomod" - modified builds</li>
                <li>• "{modelName} numbers matching" - original cars</li>
                <li>• "{modelName} low miles" - low mileage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Year Ranges</h4>
              <ul className="space-y-1">
                <li>• 1978-1988 - Full G-Body era</li>
                <li>• 1983-1988 - Fuel injection years</li>
                <li>• 1986-1987 - Best build quality</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-orange-500 hover:text-orange-400">
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. Links to external marketplaces.</p>
        </div>
      </footer>
    </div>
  );
}