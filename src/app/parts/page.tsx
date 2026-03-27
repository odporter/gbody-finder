'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, ShoppingCart, Filter, Grid3X3, List, Wrench } from 'lucide-react';
import { MIKES_MONTES_PARTS, PART_CATEGORIES } from '@/lib/parts';

export default function PartsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Parts');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredParts = MIKES_MONTES_PARTS.filter(part => {
    if (selectedCategory !== 'All Parts' && part.category !== selectedCategory) return false;
    if (searchQuery && !part.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !part.fits.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    return true;
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
            <Link href="/parts" className="text-orange-500 font-semibold">Parts</Link>
            <Link href="/build-calculator" className="text-[var(--gb-text-secondary)] hover:text-white">Build Calc</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">G-Body Parts</h1>
          <p className="text-[var(--gb-text-secondary)]">
            Real parts from trusted vendors — Mike's Montes, GBodyParts, and more
          </p>
        </div>

        {/* Featured Vendor */}
        <div className="gb-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Wrench className="text-orange-500" size={32} />
            <div>
              <h2 className="text-xl font-bold">Mike's Montes</h2>
              <p className="text-sm text-[var(--gb-text-muted)]">Your #1 source for 1981-1988 Monte Carlo SS and G-body parts</p>
            </div>
            <a 
              href="https://www.mikesmontes.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto gb-btn gb-btn-primary"
            >
              <ExternalLink size={16} className="mr-2" />
              Shop Direct
            </a>
          </div>
          <p className="text-[var(--gb-text-secondary)] text-sm">
            Mike's Montes has been serving the G-Body community for years. New, used, GM, and aftermarket parts 
            for Monte Carlo SS, Grand National, Cutlass, Regal, El Camino, Malibu and more. Free shipping on select items.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts..."
              className="w-full pl-12 pr-4 py-3 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-white placeholder-[var(--gb-text-muted)] focus:outline-none focus:border-orange-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-white focus:outline-none focus:border-orange-500"
          >
            {PART_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Parts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredParts.map((part) => (
            <a
              key={part.id}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group gb-card overflow-hidden hover:border-orange-500 transition-all"
            >
              <div className="aspect-square bg-[var(--gb-dark)] relative overflow-hidden">
                <img 
                  src={part.image} 
                  alt={part.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/cars/placeholder.jpg';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                    {part.source}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                  {part.name}
                </h3>
                <p className="text-sm text-[var(--gb-text-muted)] mb-3">
                  Fits: {part.fits.join(', ')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-500">
                    ${part.price.toFixed(2)}
                  </span>
                  <ExternalLink size={16} className="text-[var(--gb-text-muted)] group-hover:text-orange-500 transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Other Vendors */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More G-Body Parts Vendors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://gbodyparts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gb-card p-6 hover:border-orange-500 transition-colors group"
            >
              <h3 className="font-bold text-lg group-hover:text-orange-400">GBodyParts.com</h3>
              <p className="text-sm text-[var(--gb-text-muted)] mt-2">
                Wide selection of G-Body restoration and performance parts
              </p>
              <div className="mt-4 text-orange-500 text-sm font-medium">
                Visit Store →
              </div>
            </a>
            <a
              href="https://turbobuick.com/forums/parts-for-sale.35/"
              target="_blank"
              rel="noopener noreferrer"
              className="gb-card p-6 hover:border-orange-500 transition-colors group"
            >
              <h3 className="font-bold text-lg group-hover:text-orange-400">TurboBuick.com Marketplace</h3>
              <p className="text-sm text-[var(--gb-text-muted)] mt-2">
                Parts for sale by community members - Grand National, T-Type, Turbo T
              </p>
              <div className="mt-4 text-orange-500 text-sm font-medium">
                View Listings →
              </div>
            </a>
            <a
              href="https://turbobuick.com/forums/cars-for-sale.39/"
              target="_blank"
              rel="noopener noreferrer"
              className="gb-card p-6 hover:border-orange-500 transition-colors group"
            >
              <h3 className="font-bold text-lg group-hover:text-orange-400">TurboBuick Cars For Sale</h3>
              <p className="text-sm text-[var(--gb-text-muted)] mt-2">
                Grand Nationals, T-Types, Turbo T's for sale by owner
              </p>
              <div className="mt-4 text-orange-500 text-sm font-medium">
                View Cars →
              </div>
            </a>
          </div>
        </div>

        {/* Forum Links */}
        <div className="mt-12 gb-card p-6">
          <h2 className="font-bold text-lg mb-4">G-Body Forums & Communities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://turbobuick.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[var(--gb-dark)] rounded-lg hover:bg-[var(--gb-surface)] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">
                TB
              </div>
              <div>
                <h4 className="font-medium">TurboBuick.com</h4>
                <p className="text-sm text-[var(--gb-text-muted)]">Grand National & T-Type community</p>
              </div>
            </a>
            <a
              href="https://gbodyforum.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[var(--gb-dark)] rounded-lg hover:bg-[var(--gb-surface)] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
                GB
              </div>
              <div>
                <h4 className="font-medium">GBodyForum.com</h4>
                <p className="text-sm text-[var(--gb-text-muted)]">All G-Body discussion</p>
              </div>
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-orange-500 hover:text-orange-400">
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. Parts sourced from trusted vendors.</p>
        </div>
      </footer>
    </div>
  );
}