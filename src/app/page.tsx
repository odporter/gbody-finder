'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, ChevronRight, Car, Zap, Users, Shield, Package, Wrench, ArrowRight, Filter, Grid3X3, List } from 'lucide-react';

// G-Body Models with logos/images
const GBODY_MODELS = [
  {
    id: 'monte-carlo',
    name: 'Monte Carlo',
    years: '1978-1988',
    subtitle: 'SS • Aerocoupe • LS',
    image: '/images/monte-carlo-hero.jpg',
    logo: '🏎️',
    color: 'from-red-600 to-orange-600',
    count: 1247,
  },
  {
    id: 'grand-national',
    name: 'Grand National',
    years: '1982-1987',
    subtitle: 'GN • T-Type • Turbo T',
    image: '/images/grand-national-hero.jpg',
    logo: '🖤',
    color: 'from-gray-900 to-gray-700',
    count: 892,
  },
  {
    id: 'cutlass-supreme',
    name: 'Cutlass Supreme',
    years: '1978-1988',
    subtitle: '442 • Salon • Brougham',
    image: '/images/cutlass-hero.jpg',
    logo: '🔥',
    color: 'from-amber-500 to-yellow-600',
    count: 1089,
  },
  {
    id: 'regal',
    name: 'Buick Regal',
    years: '1978-1987',
    subtitle: 'Limited • T-Type • GS',
    image: '/images/regal-hero.jpg',
    logo: '⚡',
    color: 'from-blue-600 to-indigo-700',
    count: 756,
  },
  {
    id: 'el-camino',
    name: 'El Camino',
    years: '1978-1987',
    subtitle: 'SS • Conquista • Royal',
    image: '/images/el-camino-hero.jpg',
    logo: '🛻',
    color: 'from-green-600 to-emerald-700',
    count: 634,
  },
  {
    id: 'malibu',
    name: 'Chevrolet Malibu',
    years: '1978-1983',
    subtitle: 'Classic • Landau • Sport',
    image: '/images/malibu-hero.jpg',
    logo: '🚗',
    color: 'from-purple-600 to-violet-700',
    count: 423,
  },
  {
    id: 'grand-prix',
    name: 'Pontiac Grand Prix',
    years: '1978-1987',
    subtitle: 'LJ • SJ • Turbo',
    image: '/images/grand-prix-hero.jpg',
    logo: ' Pontiac',
    color: 'from-gray-600 to-slate-700',
    count: 567,
  },
  {
    id: 'parts',
    name: 'Parts & Accessories',
    years: 'All Years',
    subtitle: 'Engines • Body • Interior',
    image: '/images/parts-hero.jpg',
    logo: '🔧',
    color: 'from-zinc-600 to-zinc-800',
    count: 3421,
    isParts: true,
  },
];

// Sample listings
const FEATURED_LISTINGS = [
  {
    id: '1',
    title: '1987 Monte Carlo SS Aerocoupe',
    price: 28500,
    location: 'Houston, TX',
    year: 1987,
    model: 'Monte Carlo SS',
    engine: '305 V8',
    mileage: 45000,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c6cd88?w=600&h=400&fit=crop',
    condition: 'Excellent',
    seller: 'Verified Dealer',
    isFeatured: true,
  },
  {
    id: '2',
    title: '1986 Buick Grand National',
    price: 45000,
    location: 'Phoenix, AZ',
    year: 1986,
    model: 'Grand National',
    engine: '3.8L Turbo V6',
    mileage: 62000,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
    condition: 'Show Quality',
    seller: 'Private Seller',
    isFeatured: true,
  },
  {
    id: '3',
    title: '1984 Oldsmobile 442',
    price: 38000,
    location: 'Charlotte, NC',
    year: 1984,
    model: '442',
    engine: '350 V8',
    mileage: 42000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    condition: 'Excellent',
    seller: 'Verified Dealer',
  },
];

const STATS = [
  { icon: Car, label: 'Vehicles Listed', value: '2,847' },
  { icon: Package, label: 'Parts Available', value: '8,234' },
  { icon: Users, label: 'Members', value: '15,892' },
  { icon: Shield, label: 'Verified Sellers', value: '234' },
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Hero Section with Background */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--gb-dark)]" />
          <img 
            src="https://images.unsplash.com/photo-1583121274602-3e2820c6cd88?w=1920&h=1080&fit=crop"
            alt="G-Body Classic"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:60px_60px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-2">
              <span className="chrome-text">G-BODY</span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-[var(--gb-text-secondary)]">
              FINDER
            </p>
          </div>

          {/* Tagline */}
          <div className="text-center mb-16">
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              The ultimate marketplace for <span className="text-orange-500 font-semibold">Monte Carlos, Grand Nationals, Cutlasses, Regals, El Caminos, Malibus & Grand Prix</span>
            </p>
            <p className="text-[var(--gb-text-muted)] mt-2">1978-1988 G-Body Classics</p>
          </div>

          {/* Model Selector - Logo Buttons */}
          <div className="mb-16">
            <h3 className="text-center text-sm font-medium text-[var(--gb-text-muted)] uppercase tracking-wider mb-6">
              Select Your G-Body
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {GBODY_MODELS.slice(0, 7).map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`group relative overflow-hidden rounded-xl p-6 border-2 transition-all ${
                    selectedModel === model.id 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-[var(--gb-border)] bg-[var(--gb-surface)] hover:border-orange-500/50'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-2">{model.logo}</div>
                    <h4 className="font-bold text-sm">{model.name}</h4>
                    <p className="text-xs text-[var(--gb-text-muted)]">{model.years}</p>
                    <div className="mt-2 inline-flex items-center gap-1 text-xs text-orange-500">
                      <span>{model.count.toLocaleString()}</span>
                      <span className="text-[var(--gb-text-muted)]">listed</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Parts Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setSelectedModel('parts')}
                className={`group relative overflow-hidden rounded-xl px-12 py-4 border-2 transition-all flex items-center gap-3 ${
                  selectedModel === 'parts'
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-[var(--gb-border)] bg-[var(--gb-surface)] hover:border-orange-500/50'
                }`}
              >
                <Wrench size={24} className="text-orange-500" />
                <div className="text-left">
                  <h4 className="font-bold">Parts & Accessories</h4>
                  <p className="text-xs text-[var(--gb-text-muted)]">8,234 parts available</p>
                </div>
                <ArrowRight size={20} className="text-[var(--gb-text-muted)] group-hover:text-orange-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model, year, location..."
                className="w-full pl-12 pr-4 py-4 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-xl text-white placeholder-[var(--gb-text-muted)] focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-[var(--gb-text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <p className="text-[var(--gb-text-secondary)] mt-1">Hand-picked G-Bodies ready for a new home</p>
          </div>
          <Link href="/listings" className="gb-btn gb-btn-secondary">
            View All <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED_LISTINGS.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`} className="gb-card group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {listing.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                      FEATURED
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/80 text-white text-xs font-semibold rounded">
                    {listing.condition}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
                <div className="flex items-center gap-2 text-sm text-[var(--gb-text-muted)] mb-2">
                  <span>{listing.year}</span>
                  <span>•</span>
                  <span>{listing.engine}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--gb-text-muted)] mb-3">
                  <MapPin size={14} />
                  {listing.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">
                    ${listing.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-[var(--gb-text-muted)]">
                    {listing.mileage.toLocaleString()} mi
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why G-Body Finder */}
      <section className="bg-[var(--gb-surface)] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why G-Body Finder?</h2>
            <p className="text-[var(--gb-text-secondary)] max-w-2xl mx-auto">
              We aggregate listings from across the web — Facebook Marketplace, Craigslist, eBay, Bring a Trailer, and more — so you can find your perfect G-Body in one place.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Search className="text-orange-500" size={24} />
              </div>
              <h3 className="font-semibold mb-2">All Sources</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                Facebook, Craigslist, eBay, Bring a Trailer, forums — all in one search.
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Shield className="text-orange-500" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Verified Sellers</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                We verify dealers and private sellers so you can buy with confidence.
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Wrench className="text-orange-500" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Parts Network</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                Engine, body, interior — find parts from trusted sellers nationwide.
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Zap className="text-orange-500" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Instant Alerts</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                Get notified the moment your dream G-Body hits the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your G-Body?</h2>
          <p className="text-white/80 mb-8">
            Join the community. Browse listings. Get alerts. Find your classic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="gb-btn bg-white text-orange-600 hover:bg-gray-100">
              Create Free Account
            </Link>
            <Link href="/listings" className="gb-btn bg-transparent text-white border-2 border-white hover:bg-white/10">
              Browse All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gb-dark)] border-t border-[var(--gb-border)] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="chrome-text">G-BODY</span> FINDER
              </h3>
              <p className="text-sm text-[var(--gb-text-muted)]">
                The ultimate marketplace for G-Body classics. 1978-1988 Monte Carlo, Grand National, Cutlass, Regal, El Camino, Malibu & Grand Prix.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-sm text-[var(--gb-text-secondary)]">
                <li><Link href="/listings" className="hover:text-orange-500">All Listings</Link></li>
                <li><Link href="/listings?model=monte-carlo" className="hover:text-orange-500">Monte Carlo</Link></li>
                <li><Link href="/listings?model=grand-national" className="hover:text-orange-500">Grand National</Link></li>
                <li><Link href="/listings?model=cutlass" className="hover:text-orange-500">Cutlass Supreme</Link></li>
                <li><Link href="/parts" className="hover:text-orange-500">Parts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[var(--gb-text-secondary)]">
                <li><Link href="/buyers-guide" className="hover:text-orange-500">Buyer's Guide</Link></li>
                <li><Link href="/price-guide" className="hover:text-orange-500">Price Guide</Link></li>
                <li><Link href="/shipping" className="hover:text-orange-500">Shipping</Link></li>
                <li><Link href="/community" className="hover:text-orange-500">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sell</h4>
              <ul className="space-y-2 text-sm text-[var(--gb-text-secondary)]">
                <li><Link href="/sell" className="hover:text-orange-500">Create Listing</Link></li>
                <li><Link href="/dealer-program" className="hover:text-orange-500">Dealer Program</Link></li>
                <li><Link href="/pricing" className="hover:text-orange-500">Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--gb-border)] mt-8 pt-8 text-center text-sm text-[var(--gb-text-muted)]">
            <p>© 2026 G-Body Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}