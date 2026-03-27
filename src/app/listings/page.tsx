'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, TrendingUp, Wrench, Car } from 'lucide-react';

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
  { 
    name: 'Bring a Trailer', 
    url: 'bat', 
    color: 'from-green-600 to-emerald-700',
    description: 'Auction site for classic cars',
  },
  { 
    name: 'eBay Motors', 
    url: 'ebay', 
    color: 'from-yellow-500 to-orange-500',
    description: 'Largest marketplace for used cars',
  },
  { 
    name: 'Facebook Marketplace', 
    url: 'facebook', 
    color: 'from-blue-600 to-blue-700',
    description: 'Local listings from private sellers',
  },
  { 
    name: 'Cars.com', 
    url: 'cars', 
    color: 'from-red-600 to-red-700',
    description: 'Dealer and private listings',
  },
  { 
    name: 'Autotrader', 
    url: 'autotrader', 
    color: 'from-orange-500 to-red-600',
    description: 'Nationwide dealer inventory',
  },
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
      case 'cars':
        return `https://www.cars.com/shopping/results/?stock_type=used&keywords=${query}`;
      case 'autotrader':
        return `https://www.autotrader.com/cars-for-sale/all-cars/${query}`;
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
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[var(--gb-dark)]" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-4 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-full">
              {config.years}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {config.name}
          </h1>
          <p className="text-lg md:text-xl text-[var(--gb-text-secondary)] max-w-2xl mb-6">
            {config.description}
          </p>
        </div>
      </section>

      {/* Model Selector */}
      <div className="border-b border-[var(--gb-border)] bg-[var(--gb-surface)]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-1">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">Find {config.name}s For Sale</h2>
          <p className="text-[var(--gb-text-secondary)]">
            Search across top platforms for {config.years} {config.name}s
          </p>
        </div>

        {/* Source Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SOURCES.map((source) => (
            <a
              key={source.url}
              href={getSearchUrl(source.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl border border-[var(--gb-border)] hover:border-orange-500 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${source.color} opacity-5 group-hover:opacity-15 transition-opacity`} />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{source.name}</h3>
                  <ExternalLink size={20} className="text-[var(--gb-text-muted)] group-hover:text-orange-500 transition-colors" />
                </div>
                <p className="text-[var(--gb-text-secondary)] mb-4">
                  {source.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-orange-500">
                  <TrendingUp size={16} />
                  <span>Live Listings</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Market Insights */}
        <div className="gb-card p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">Market Insights</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-4 bg-[var(--gb-dark)] rounded-xl">
              <div className="text-sm text-[var(--gb-text-muted)] mb-2">Price Range</div>
              <div className="text-3xl font-bold text-orange-500">$5K - $75K</div>
              <div className="text-xs text-[var(--gb-text-muted)] mt-1">Based on recent sales</div>
            </div>
            <div className="text-center p-4 bg-[var(--gb-dark)] rounded-xl">
              <div className="text-sm text-[var(--gb-text-muted)] mb-2">Most Popular</div>
              <div className="text-3xl font-bold">SS Aerocoupe</div>
              <div className="text-xs text-[var(--gb-text-muted)] mt-1">{config.name}</div>
            </div>
            <div className="text-center p-4 bg-[var(--gb-dark)] rounded-xl">
              <div className="text-sm text-[var(--gb-text-muted)] mb-2">Value Trend</div>
              <div className="text-3xl font-bold text-green-400">↑ 12% YoY</div>
              <div className="text-xs text-[var(--gb-text-muted)] mt-1">G-Body market rising</div>
            </div>
          </div>
        </div>

        {/* Buying Tips */}
        <div className="gb-card p-8">
          <h3 className="text-2xl font-bold mb-6">Buying Tips for {config.name}</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Car size={20} className="text-orange-500" />
                What to Look For
              </h4>
              <ul className="space-y-2 text-[var(--gb-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Rust in quarter panels and rockers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Frame damage or previous accidents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Numbers-matching drivetrain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Original interior condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>T-top seals and leaks</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Wrench size={20} className="text-orange-500" />
                Best Years to Buy
              </h4>
              <ul className="space-y-2 text-[var(--gb-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">1986-1987</span>
                  <span>— Best build quality, fuel injection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">1983-1985</span>
                  <span>— Good value, simpler to work on</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">1978-1980</span>
                  <span>— Lighter weight, carbureted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">Aerocoupe</span>
                  <span>— Most collectible (1986-1988)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/build-calculator"
            className="gb-btn gb-btn-primary text-lg"
          >
            Build Calculator
          </Link>
          <Link 
            href="/parts"
            className="gb-btn gb-btn-secondary text-lg"
          >
            Shop Parts
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