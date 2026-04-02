'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight, Star, ExternalLink } from 'lucide-react';
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
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-9 w-9" />
            <span className="text-lg font-black chrome-text">G-BODY</span>
            <span className="text-white font-light">FINDER</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/listings" className="text-[var(--gb-text-secondary)] hover:text-white">Listings</Link>
            <Link href="/market" className="text-orange-500 font-semibold">Market</Link>
            <Link href="/parts" className="text-[var(--gb-text-secondary)] hover:text-white">Parts</Link>
            <Link href="/build-calculator" className="text-[var(--gb-text-secondary)] hover:text-white">Build Calc</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-orange-500" size={18} />
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Market Intelligence</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">G-Body Market Tracker</h1>
          <p className="text-[var(--gb-text-secondary)] text-sm max-w-lg">
            Track G-Body values like stocks. Based on real sales data from Bring a Trailer, Mecum, and Hagerty.
          </p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid md:grid-cols-4 gap-3 mb-8">
          {[
            {
              icon: DollarSign, label: 'Avg. Value',
              value: '$29,400',
              sub: 'across all models',
              color: 'text-orange-400',
              bg: 'from-orange-500/10 to-transparent',
            },
            {
              icon: TrendingUp, label: 'Avg. YoY Return',
              value: `+${stats.avgYoYAppreciation}%`,
              sub: 'past 12 months',
              color: 'text-green-400',
              bg: 'from-green-500/10 to-transparent',
            },
            {
              icon: BarChart3, label: '5-Year Return',
              value: '+137%',
              sub: 'average all models',
              color: 'text-blue-400',
              bg: 'from-blue-500/10 to-transparent',
            },
            {
              icon: Star, label: 'Top Performer',
              value: 'GN / GNX',
              sub: '+23.5% YoY',
              color: 'text-yellow-400',
              bg: 'from-yellow-500/10 to-transparent',
            },
          ].map((card) => (
            <div key={card.label} className={`gb-card p-5 bg-gradient-to-br ${card.bg}`}>
              <div className={`${card.color} mb-2`}>
                <card.icon size={20} />
              </div>
              <div className="text-2xl font-bold mb-0.5">{card.value}</div>
              <div className="text-xs text-[var(--gb-text-muted)]">{card.label}</div>
              <div className="text-[10px] text-[var(--gb-text-muted)] mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-[var(--gb-text-muted)] mr-1">Sort by:</span>
          {[
            { key: 'y1', label: '1-Year Gain' },
            { key: 'y5', label: '5-Year Gain' },
            { key: 'price', label: 'Price' },
            { key: 'name', label: 'Name' },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setSortBy(btn.key as typeof sortBy)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                sortBy === btn.key
                  ? 'bg-orange-500 text-white'
                  : 'bg-[var(--gb-surface)] text-[var(--gb-text-secondary)] hover:text-white border border-[var(--gb-border)]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Model Cards */}
        <div className="space-y-3 mb-12">
          {sortedModels.map((model, idx) => (
            <Link
              key={model.id}
              href={`/models/${model.id}`}
              className="block gb-card p-5 hover:border-orange-500/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                {/* Rank + Name */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="text-2xl font-black text-[var(--gb-border)] w-8 text-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-base">{model.name}</h3>
                      <span className="text-xs text-[var(--gb-text-muted)]">{model.years}</span>
                    </div>
                    <p className="text-xs text-[var(--gb-text-secondary)] line-clamp-1 leading-snug">
                      {model.insight}
                    </p>
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex items-center gap-6 lg:gap-10">
                  <div className="text-center">
                    <div className="text-[10px] text-[var(--gb-text-muted)] uppercase tracking-wider mb-0.5">Avg. Value</div>
                    <div className="text-xl font-bold text-white price-tag">
                      ${model.priceRange.mid.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[var(--gb-text-muted)]">
                      ${model.priceRange.low.toLocaleString()} – ${model.priceRange.high.toLocaleString()}
                    </div>
                  </div>

                  {/* YoY return */}
                  <div className="text-center min-w-[72px]">
                    <div className="text-[10px] text-[var(--gb-text-muted)] uppercase tracking-wider mb-0.5">1-Year</div>
                    <div className={`text-xl font-bold flex items-center justify-center gap-0.5 ${
                      model.appreciation.y1 >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {model.appreciation.y1 >= 0
                        ? <ArrowUpRight size={14} />
                        : <ArrowDownRight size={14} />}
                      {Math.abs(model.appreciation.y1)}%
                    </div>
                    <div className="text-[10px] text-[var(--gb-text-muted)]">
                      3Y: +{model.appreciation.y3}% · 5Y: +{model.appreciation.y5}%
                    </div>
                  </div>

                  {/* Top Variant */}
                  <div className="hidden xl:block text-right min-w-[140px]">
                    <div className="text-[10px] text-[var(--gb-text-muted)] uppercase tracking-wider mb-0.5">Top Variant</div>
                    <div className="text-sm font-semibold truncate">{model.topVariants[0].name}</div>
                    <div className="text-xs text-green-400">{model.topVariants[0].premium}</div>
                  </div>

                  {/* Arrow */}
                  <div className="text-[var(--gb-text-muted)] hidden lg:block">
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Top Variants Quick Reference */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-5">Most Collectible Variants</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { model: 'Grand National', variant: 'GNX (1987)', count: 547, value: '$150-250K', color: 'from-yellow-500/20 to-orange-500/10' },
              { model: 'Monte Carlo SS', variant: 'Aerocoupe (1986-88)', count: 6052, value: '+$15-25K', color: 'from-orange-500/20 to-red-500/10' },
              { model: 'Hurst Olds 442', variant: '1983-1984', count: 3501, value: '+$10-18K', color: 'from-blue-500/20 to-purple-500/10' },
              { model: 'Grand National', variant: 'Grand National Turbo', count: null, value: 'Base', color: 'from-green-500/20 to-teal-500/10' },
              { model: 'Buick Regal', variant: 'T-Type Turbo', count: null, value: '+$8-15K', color: 'from-red-500/20 to-pink-500/10' },
              { model: 'El Camino', variant: 'SS Conquista', count: null, value: '+$5-8K', color: 'from-orange-500/20 to-yellow-500/10' },
            ].map((v, i) => (
              <div key={i} className={`gb-card p-4 bg-gradient-to-br ${v.color}`}>
                <div className="text-xs text-[var(--gb-text-muted)] mb-1">{v.model}</div>
                <div className="font-bold text-sm mb-0.5">{v.variant}</div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 font-semibold text-sm">{v.value}</span>
                  {v.count && (
                    <span className="text-xs text-[var(--gb-text-muted)]">{v.count.toLocaleString()} built</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="gb-card p-5 mb-8">
          <h3 className="font-bold text-sm mb-2">📊 Market Data Disclaimer</h3>
          <p className="text-xs text-[var(--gb-text-secondary)] leading-relaxed">
            Values are based on recent sales data from Bring a Trailer, Mecum, and Hagerty valuations.
            Actual values may vary based on condition, provenance, and regional market differences.
            This data is for informational purposes only and does not constitute financial advice.
            Kendrick Lamar's 2024 GN album and social media influencers have driven significant appreciation in Grand Nationals.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/listings" className="gb-btn gb-btn-primary">
            Find {sortedModels[0]?.name || 'Your G-Body'}
          </Link>
          <Link href="/build-calculator" className="gb-btn gb-btn-secondary">
            Plan a Build
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. Market data sourced from Hagerty, Bring a Trailer & Mecum.</p>
        </div>
      </footer>
    </div>
  );
}
