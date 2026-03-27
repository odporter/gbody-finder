'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Filter, Package, Truck, Wrench, CheckCircle } from 'lucide-react';
import { MIKES_MONTES_PARTS, PART_CATEGORIES, VENDORS, FORUMS } from '@/lib/parts';

export default function PartsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Parts');

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
            Real parts from trusted vendors — exact fitment for your Monte Carlo, Grand National, Cutlass, and more
          </p>
        </div>

        {/* Featured Vendor */}
        <div className="gb-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <Wrench className="text-orange-500 flex-shrink-0" size={32} />
            <div className="flex-1">
              <h2 className="text-xl font-bold">Mike's Montes</h2>
              <p className="text-sm text-[var(--gb-text-muted)]">
                Your #1 source for 1981-1988 Monte Carlo SS and G-body parts. 
                New, used, GM, and aftermarket. Free shipping on select items.
              </p>
            </div>
            <a 
              href="https://www.mikesmontes.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gb-btn gb-btn-primary flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Shop Direct
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1 text-green-400">
              <CheckCircle size={14} />
              In-Stock Items
            </span>
            <span className="flex items-center gap-1 text-[var(--gb-text-muted)]">
              <Truck size={14} />
              Ships in 2-3 Business Days
            </span>
            <span className="flex items-center gap-1 text-[var(--gb-text-muted)]">
              <Package size={14} />
              130+ Parts Available
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts (e.g., weatherstrip, floor mats, switches)..."
              className="w-full pl-12 pr-4 py-3 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-white placeholder-[var(--gb-text-muted)] focus:outline-none focus:border-orange-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-white focus:outline-none focus:border-orange-500 min-w-[200px]"
          >
            {PART_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Parts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
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
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                    {part.source}
                  </span>
                  {part.freeShipping && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                      FREE SHIP
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                  {part.name}
                </h3>
                <p className="text-xs text-[var(--gb-text-muted)] mb-3">
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

        {/* More Vendors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">More G-Body Vendors</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {VENDORS.map((vendor) => (
              <a
                key={vendor.name}
                href={vendor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gb-card p-6 hover:border-orange-500 transition-colors group"
              >
                <h3 className="font-bold text-lg group-hover:text-orange-400">{vendor.name}</h3>
                <p className="text-sm text-[var(--gb-text-secondary)] mt-2 mb-3">
                  {vendor.description}
                </p>
                <span className="text-orange-500 text-sm font-medium">{vendor.highlight}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Forums */}
        <div className="gb-card p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">G-Body Forums & Community</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FORUMS.map((forum) => (
              <a
                key={forum.name}
                href={forum.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[var(--gb-dark)] rounded-lg hover:bg-[var(--gb-surface)] transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-lg">
                  {forum.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-orange-400">{forum.name}</h4>
                  <p className="text-sm text-[var(--gb-text-muted)]">{forum.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
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