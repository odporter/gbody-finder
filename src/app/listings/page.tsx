'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Filter, Grid3X3, List, ExternalLink, RefreshCw } from 'lucide-react';

// Real listing sources and search URLs
const SEARCH_SOURCES = {
  'monte-carlo': {
    facebook: 'https://www.facebook.com/marketplace/search/?query=monte%20carlo%20ss%201978%201988',
    craigslist: 'https://www.craigslist.org/search/sss?query=monte%20carlo%20gbody&sort=rel',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=monte+carlo+ss+1978-1988&_sop=15',
    bat: 'https://bringatrailer.com/search/monte-carlo/',
  },
  'grand-national': {
    facebook: 'https://www.facebook.com/marketplace/search/?query=buick%20grand%20national',
    craigslist: 'https://www.craigslist.org/search/sss?query=grand%20national%20buick&sort=rel',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=buick+grand+national&_sop=15',
    bat: 'https://bringatrailer.com/search/buick-grand-national/',
  },
  'cutlass-supreme': {
    facebook: 'https://www.facebook.com/marketplace/search/?query=oldsmobile%20cutlass%20supreme',
    craigslist: 'https://www.craigslist.org/search/sss?query=cutlass%20supreme%20442&sort=rel',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=oldsmobile+cutlass+442&_sop=15',
    bat: 'https://bringatrailer.com/search/oldsmobile/',
  },
  'regal': {
    facebook: 'https://www.facebook.com/marketplace/search/?query=buick%20regal%20t-type',
    craigslist: 'https://www.craigslist.org/search/sss?query=buick%20regal%20gbody&sort=rel',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=buick+regal+grand+national&_sop=15',
    bat: 'https://bringatrailer.com/search/buick/',
  },
  'el-camino': {
    facebook: 'https://www.facebook.com/marketplace/search/?query=el%20camino%201978%201988',
    craigslist: 'https://www.craigslist.org/search/sss?query=el%20camino%20ss&sort=rel',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=el+camino+ss&_sop=15',
    bat: 'https://bringatrailer.com/search/el-camino/',
  },
  'malibu': {
    facebook: 'https://www.facebook.com/marketplace/search/?query=chevy%20malibu%201978%201983',
    craigslist: 'https://www.craigslist.org/search/sss?query=malibu%20chevelle&sort=rel',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=chevy+malibu+1978&_sop=15',
    bat: 'https://bringatrailer.com/search/chevrolet-malibu/',
  },
  'grand-prix': {
    facebook: 'https://www.facebook.com/marketplace/search/?query=pontiac%20grand%20prix%201978',
    craigslist: 'https://www.craigslist.org/search/sss?query=grand%20prix%20pontiac&sort=rel',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=pontiac+grand+prix&_sop=15',
    bat: 'https://bringatrailer.com/search/pontiac-grand-prix/',
  },
};

const MODEL_NAMES: Record<string, string> = {
  'monte-carlo': 'Monte Carlo',
  'grand-national': 'Grand National',
  'cutlass-supreme': 'Cutlass Supreme',
  'regal': 'Buick Regal',
  'el-camino': 'El Camino',
  'malibu': 'Chevy Malibu',
  'grand-prix': 'Grand Prix',
};

const SOURCE_LABELS: Record<string, string> = {
  facebook: 'Facebook Marketplace',
  craigslist: 'Craigslist',
  ebay: 'eBay Motors',
  bat: 'Bring a Trailer',
};

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const model = searchParams.get('model') || 'monte-carlo';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sources = SEARCH_SOURCES[model as keyof typeof SEARCH_SOURCES] || SEARCH_SOURCES['monte-carlo'];
  const modelName = MODEL_NAMES[model as keyof typeof MODEL_NAMES] || 'G-Body';

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
        {/* Model Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{modelName} Listings</h1>
          <p className="text-[var(--gb-text-secondary)]">
            Search across Facebook Marketplace, Craigslist, eBay, and Bring a Trailer
          </p>
        </div>

        {/* Search Sources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(sources).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group gb-card p-6 hover:border-orange-500 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{SOURCE_LABELS[key]}</h3>
                <ExternalLink size={18} className="text-[var(--gb-text-muted)] group-hover:text-orange-500 transition-colors" />
              </div>
              <p className="text-sm text-[var(--gb-text-muted)]">
                Search {modelName} on {SOURCE_LABELS[key]}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-orange-500 text-sm font-medium">
                <RefreshCw size={14} />
                Live Results
              </div>
            </a>
          ))}
        </div>

        {/* Search Tips */}
        <div className="gb-card p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">Search Tips for {modelName}</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--gb-text-secondary)]">
            <div>
              <h4 className="font-medium text-white mb-2">Keywords to Try</h4>
              <ul className="space-y-1">
                <li>• "{modelName} for sale"</li>
                <li>• "{modelName} project"</li>
                <li>• "{modelName} restomod"</li>
                <li>• "{modelName} numbers matching"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Year Ranges</h4>
              <ul className="space-y-1">
                <li>• 1978-1988 (full G-Body era)</li>
                <li>• 1983-1988 (fuel injection years)</li>
                <li>• 1986-1987 (final years, best build quality)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Model Selector */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4">Browse Other Models</h2>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Full Integration Coming Soon</h2>
          <p className="text-[var(--gb-text-secondary)] mb-6 max-w-xl mx-auto">
            We're building a unified search that pulls real listings from all sources. 
            For now, click the buttons above to search directly on each platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/build-calculator" className="gb-btn gb-btn-primary">
              Build Calculator
            </Link>
            <Link href="/parts" className="gb-btn gb-btn-secondary">
              Browse Parts
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}