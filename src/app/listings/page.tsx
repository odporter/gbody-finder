'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, MapPin, DollarSign, Clock, Eye, TrendingUp } from 'lucide-react';

const MODEL_CONFIGS: Record<string, { name: string; years: string; hero: string; description: string }> = {
  'monte-carlo': {
    name: 'Monte Carlo',
    years: '1978-1988',
    hero: '/images/cars/monte-carlo-ss.jpg',
    description: 'The Monte Carlo SS dominated NASCAR in the 1980s. The Aerocoupe is especially sought after by collectors.',
  },
  'grand-national': {
    name: 'Grand National',
    years: '1982-1987',
    hero: '/images/cars/grand-national.jpg',
    description: 'Buick\'s turbocharged legend. The Grand National was the fastest production car in America in 1987.',
  },
  'cutlass-supreme': {
    name: 'Cutlass Supreme / 442',
    years: '1978-1988',
    hero: '/images/cars/cutlass-442.jpg',
    description: 'Oldsmobile\'s muscle icon. The Hurst Olds and 442 are the most collectible variants.',
  },
  'regal': {
    name: 'Buick Regal',
    years: '1978-1987',
    hero: '/images/cars/regal-t-type.jpg',
    description: 'The T-Type Regal offered turbo performance before the Grand National made it famous.',
  },
  'el-camino': {
    name: 'El Camino',
    years: '1978-1987',
    hero: '/images/cars/el-camino.jpg',
    description: 'Half car, half truck, all muscle. The SS Conquista is the most desirable trim.',
  },
  'malibu': {
    name: 'Chevy Malibu',
    years: '1978-1983',
    hero: '/images/cars/malibu.jpg',
    description: 'The Malibu was the more affordable G-Body, but classic styling makes it a great platform for restoration.',
  },
  'grand-prix': {
    name: 'Pontiac Grand Prix',
    years: '1978-1987',
    hero: '/images/cars/grand-prix.jpg',
    description: 'Pontiac\'s personal luxury car. The LJ and SJ trims offer the most features.',
  },
};

const SOURCES = [
  { name: 'Bring a Trailer', url: 'bat', color: 'bg-green-500' },
  { name: 'eBay Motors', url: 'ebay', color: 'bg-yellow-500' },
  { name: 'Facebook Marketplace', url: 'facebook', color: 'bg-blue-500' },
  { name: 'Craigslist', url: 'craigslist', color: 'bg-purple-500' },
];

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const model = searchParams.get('model') || 'monte-carlo';
  const config = MODEL_CONFIGS[model] || MODEL_CONFIGS['monte-carlo'];

  const getSearchUrl = (source: string) => {
    const query = encodeURIComponent(`${config.name} ${config.years}`);
    switch (source) {
      case 'bat':
        return `https://bringatrailer.com/search/?q=${encodeURIComponent(config.name)}`;
      case 'ebay':
        return `https://www.ebay.com/sch/i.html?_nkw=${query}&LH_ItemCondition=4&_sop=15`;
      case 'facebook':
        return `https://www.facebook.com/marketplace/search/?query=${query}`;
      case 'craigslist':
        return `https://www.craigslist.org/search/sss?query=${query}&sort=rel`;
      default:
        return '#';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img 
          src={config.hero}
          alt={config.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--gb-dark)]" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded">
              {config.years}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {config.name}
          </h1>
          <p className="text-lg text-[var(--gb-text-secondary)] max-w-2xl">
            {config.description}
          </p>
        </div>
      </section>

      {/* Model Selector */}
      <div className="border-b border-[var(--gb-border)] bg-[var(--gb-surface)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {Object.entries(MODEL_CONFIGS).map(([key, cfg]) => (
              <Link
                key={key}
                href={`/listings?model=${key}`}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  model === key
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-[var(--gb-text-secondary)] hover:text-white'
                }`}
              >
                {cfg.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search Sources */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Find {config.name}s For Sale</h2>
          <p className="text-[var(--gb-text-secondary)]">
            Search across all major platforms for {config.years} {config.name}s
          </p>
        </div>

        {/* Source Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {SOURCES.map((source) => (
            <a
              key={source.url}
              href={getSearchUrl(source.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="group gb-card p-6 hover:border-orange-500 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`${source.color} text-white px-3 py-1 rounded text-sm font-bold`}>
                  {source.name}
                </span>
                <ExternalLink size={20} className="text-[var(--gb-text-muted)] group-hover:text-orange-500 transition-colors" />
              </div>
              <p className="text-[var(--gb-text-secondary)] text-sm">
                Search {config.name}s on {source.name}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-orange-500">
                <TrendingUp size={14} />
                Live Listings
              </div>
            </a>
          ))}
        </div>

        {/* Craigslist by City */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">Browse by Region</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {['Los Angeles', 'Houston', 'Atlanta', 'Detroit', 'Phoenix', 'Dallas'].map((city) => (
              <a
                key={city}
                href={`https://${city.toLowerCase().replace(' ', '')}.craigslist.org/search/sss?query=${encodeURIComponent(config.name)}&sort=rel`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-sm hover:border-orange-500 transition-colors"
              >
                {city}
              </a>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="gb-card p-6 mb-12">
          <h3 className="text-xl font-bold mb-4">Market Insights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-[var(--gb-text-muted)] mb-1">Price Range</div>
              <div className="text-2xl font-bold">$5,000 - $75,000</div>
              <div className="text-xs text-[var(--gb-text-muted)]">Based on recent sales</div>
            </div>
            <div>
              <div className="text-sm text-[var(--gb-text-muted)] mb-1">Most Popular</div>
              <div className="text-2xl font-bold">SS Aerocoupe</div>
              <div className="text-xs text-[var(--gb-text-muted)]">For {config.name}</div>
            </div>
            <div>
              <div className="text-sm text-[var(--gb-text-muted)] mb-1">Value Trend</div>
              <div className="text-2xl font-bold text-green-500">↑ 12% YoY</div>
              <div className="text-xs text-[var(--gb-text-muted)]">G-Body market rising</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="gb-card p-6">
          <h3 className="text-xl font-bold mb-4">Buying Tips</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-2">What to Look For</h4>
              <ul className="space-y-1 text-[var(--gb-text-secondary)]">
                <li>• Rust in quarter panels and rockers</li>
                <li>• Frame damage or previous accidents</li>
                <li>• Numbers-matching drivetrain</li>
                <li>• Original interior condition</li>
                <li>• T-top seals and leaks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Best Years</h4>
              <ul className="space-y-1 text-[var(--gb-text-secondary)]">
                <li>• <strong>1986-1987</strong> — Best build quality, fuel injection</li>
                <li>• <strong>1983-1985</strong> — Good value, simpler to work on</li>
                <li>• <strong>1978-1980</strong> — Lighter weight, carbureted</li>
                <li>• <strong>Aerocoupe (1986-1988)</strong> — Most collectible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/build-calculator"
            className="gb-btn gb-btn-primary text-lg"
          >
            Build Calculator →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. External listings provided by respective platforms.</p>
        </div>
      </footer>
    </div>
  );
}