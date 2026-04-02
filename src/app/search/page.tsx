'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Play, ExternalLink, ShoppingCart, Wrench } from 'lucide-react';

export const metadata = {
  title: 'G-Body Parts Search | Find Parts for Monte Carlo SS, Grand National & More',
  description: 'Search thousands of G-Body parts across Mike\'s Montes, Summit Racing, JEGS, and RockAuto. Door seals, window switches, weatherstrip, T-top kits and more.',
};

interface PartResult {
  name: string;
  price: string;
  url: string;
  source: string;
  fits: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ parts?: PartResult[]; youtubeSearch?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Header */}
      <header className="bg-[var(--gb-surface)] border-b border-[var(--gb-border)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="chrome-text">G-BODY</span> FINDER
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/listings" className="text-[var(--gb-text-secondary)] hover:text-white">Listings</Link>
            <Link href="/parts" className="text-[var(--gb-text-secondary)] hover:text-white">Parts</Link>
            <Link href="/build-calculator" className="text-[var(--gb-text-secondary)] hover:text-white">Build Calc</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Search Form */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Any Part</h1>
          <p className="text-[var(--gb-text-secondary)] mb-8">
            Search for parts, get tutorial videos, and buy from trusted vendors
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={24} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="door seals, window switch, T-top kit..."
                className="w-full pl-14 pr-4 py-5 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-2xl text-white placeholder-[var(--gb-text-muted)] focus:outline-none focus:border-orange-500 text-xl"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-[var(--gb-text-muted)]">Popular:</span>
            {['door seals', 'window switch', 'T-top kit', 'floor mats', 'bumper'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-full text-sm text-[var(--gb-text-secondary)] hover:border-orange-500 hover:text-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Parts */}
            {results.parts && results.parts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ShoppingCart className="text-orange-500" size={24} />
                  Parts
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.parts.map((part, i) => (
                    <a
                      key={i}
                      href={part.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gb-card p-4 hover:border-orange-500 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold group-hover:text-orange-400">{part.name}</h3>
                        {part.price && (
                          <span className="text-orange-500 font-bold whitespace-nowrap ml-2">{part.price}</span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--gb-text-muted)] mb-2">
                        Fits: {part.fits.join(', ')}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[var(--gb-text-secondary)]">
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">
                          {part.source}
                        </span>
                        <ExternalLink size={14} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Tutorials */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Play className="text-red-500" size={24} />
                Video Tutorials
              </h2>
              <a
                href={results.youtubeSearch || `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' g-body installation')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gb-card p-6 hover:border-red-500 transition-colors group block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Play className="text-red-500" size={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-red-400">
                      Search &ldquo;{query}&rdquo; on YouTube
                    </h3>
                    <p className="text-sm text-[var(--gb-text-muted)]">
                      Find installation tutorials, how-to videos, and DIY guides
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Additional Resources */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Wrench className="text-orange-500" size={24} />
                More Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href={`https://turbobuick.com/forums/parts-for-sale.35/?search=${encodeURIComponent(query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gb-card p-4 hover:border-orange-500 transition-colors group"
                >
                  <h3 className="font-semibold group-hover:text-orange-400">TurboBuick.com Marketplace</h3>
                  <p className="text-sm text-[var(--gb-text-muted)]">Parts for sale by community members</p>
                </a>
                <a
                  href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query + ' g-body')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gb-card p-4 hover:border-yellow-500 transition-colors group"
                >
                  <h3 className="font-semibold group-hover:text-yellow-400">eBay Motors</h3>
                  <p className="text-sm text-[var(--gb-text-muted)]">G-Body parts on eBay</p>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!results && !loading && (
          <div className="text-center py-12">
            <p className="text-[var(--gb-text-muted)]">
              Type any part name above and I&apos;ll find where to buy it and show you how to install it.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
