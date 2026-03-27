'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Clock, Zap } from 'lucide-react';
import { GBODY_MARKET_DATA, getTotalMarketStats } from '@/lib/market-data';

export default function MarketPage() {
  const [sortBy, setSortBy] = useState<'name' | 'y1' | 'y5' | 'price'>('y1');
  const stats = getTotalMarketStats();

  const sortedModels = [...GBODY_MARKET_DATA].sort((a, b) => {
    switch (sortBy) {
      case 'y1': return b.appreciation.y1 - a.appreciation.y1;
      case 'y5': return b.appreciation.y5 - a.appreciation.y5;
      case 'price': return b.priceRange.mid - a.priceRange.mid;
      default: return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Header */}
      <header className="bg-[var(--gb-surface)] border-b border-[var(--gb-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="chrome-text">G-BODY</span> FINDER
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/listings" className="text-[var(--gb-text-secondary)] hover:text-white">Listings</Link>
            <Link href="/parts" className="text-[var(--gb-text-secondary)] hover:text-white">Parts</Link>
            <Link href="/market" className="text-orange-500 font-semibold">Market</Link>
            <Link href="/build-calculator" className="text-[var(--gb-text-secondary)] hover:text-white">Build Calc</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">G-Body Market Tracker</h1>
          <p className="text-[var(--gb-text-secondary)]">
            Track G-Body values like stocks. See appreciation rates, price trends, and investment potential.
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="gb-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-orange-500" size={24} />
              <span className="text-sm text-[var(--gb-text-muted)]">Average Value</span>
            </div>
            <div className="text-3xl font-bold">$29,400</div>
            <div className="text-sm text-[var(--gb-text-muted)]">Across all G-Body models</div>
          </div>
          <div className="gb-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-400" size={24} />
              <span className="text-sm text-[var(--gb-text-muted)]">Avg. YoY Appreciation</span>
            </div>
            <div className="text-3xl font-bold text-green-400">+{stats.avgYoYAppreciation}%</div>
            <div className="text-sm text-[var(--gb-text-muted)]">Past 12 months</div>
          </div>
          <div className="gb-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="text-blue-400" size={24} />
              <span className="text-sm text-[var(--gb-text-muted)]">5-Year Returns</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">+137%</div>
            <div className="text-sm text-[var(--gb-text-muted)]">Average across all models</div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-[var(--gb-text-muted)]">Sort by:</span>
          <button
            onClick={() => setSortBy('y1')}
            className={`px-3 py-1.5 rounded-lg text-sm ${sortBy === 'y1' ? 'bg-orange-500 text-white' : 'bg-[var(--gb-surface)] text-[var(--gb-text-secondary)]'}`}
          >
            1-Year Gain
          </button>
          <button
            onClick={() => setSortBy('y5')}
            className={`px-3 py-1.5 rounded-lg text-sm ${sortBy === 'y5' ? 'bg-orange-500 text-white' : 'bg-[var(--gb-surface)] text-[var(--gb-text-secondary)]'}`}
          >
            5-Year Gain
          </button>
          <button
            onClick={() => setSortBy('price')}
            className={`px-3 py-1.5 rounded-lg text-sm ${sortBy === 'price' ? 'bg-orange-500 text-white' : 'bg-[var(--gb-surface)] text-[var(--gb-text-secondary)]'}`}
          >
            Price
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-3 py-1.5 rounded-lg text-sm ${sortBy === 'name' ? 'bg-orange-500 text-white' : 'bg-[var(--gb-surface)] text-[var(--gb-text-secondary)]'}`}
          >
            Name
          </button>
        </div>

        {/* Model Cards */}
        <div className="space-y-4">
          {sortedModels.map((model) => (
            <Link
              key={model.id}
              href={`/market/${model.id}`}
              className="block gb-card p-6 hover:border-orange-500 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Name & Years */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{model.name}</h3>
                  <p className="text-sm text-[var(--gb-text-muted)]">{model.years}</p>
                  <p className="text-sm text-[var(--gb-text-secondary)] mt-2">{model.insight}</p>
                </div>

                {/* Price Range */}
                <div className="text-center">
                  <div className="text-sm text-[var(--gb-text-muted)] mb-1">Price Range</div>
                  <div className="text-lg font-bold">
                    ${model.priceRange.low.toLocaleString()} - ${model.priceRange.high.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--gb-text-muted)]">
                    Avg: ${model.priceRange.mid.toLocaleString()}
                  </div>
                </div>

                {/* Appreciation */}
                <div className="text-center">
                  <div className="text-sm text-[var(--gb-text-muted)] mb-1">1-Year Return</div>
                  <div className="text-2xl font-bold text-green-400">
                    +{model.appreciation.y1}%
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--gb-text-muted)] mt-1">
                    <span>3Y: +{model.appreciation.y3}%</span>
                    <span>5Y: +{model.appreciation.y5}%</span>
                  </div>
                </div>

                {/* Top Variant */}
                <div className="text-center md:text-right">
                  <div className="text-sm text-[var(--gb-text-muted)] mb-1">Top Variant</div>
                  <div className="font-semibold">{model.topVariants[0].name}</div>
                  <div className="text-sm text-green-400">{model.topVariants[0].premium}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 gb-card p-6">
          <h3 className="font-bold mb-2">📊 Market Data Disclaimer</h3>
          <p className="text-sm text-[var(--gb-text-secondary)]">
            Values are based on recent sales data from Bring a Trailer, Mecum, and Hagerty valuations. 
            Actual values may vary based on condition, provenance, and regional market differences. 
            This data is for informational purposes only and does not constitute financial advice.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link href="/listings" className="gb-btn gb-btn-primary">
            Find {sortedModels[0]?.name || 'Your G-Body'}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. Market data from Hagerty, Bring a Trailer, Mecum.</p>
        </div>
      </footer>
    </div>
  );
}