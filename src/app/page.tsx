'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Car, Zap, Users, Shield, Package, Wrench, Calculator, Settings, Gauge, Cog, Timer, TrendingUp } from 'lucide-react';

// G-Body Models with real images and logos
const GBODY_MODELS = [
  {
    id: 'monte-carlo',
    name: 'Monte Carlo',
    years: '1978-1988',
    subtitle: 'SS • Aerocoupe • LS',
    image: '/images/cars/monte-carlo-ss.jpg',
    logo: '/images/logos/monte-carlo-logo.png',
    count: 1247,
  },
  {
    id: 'grand-national',
    name: 'Grand National',
    years: '1982-1987',
    subtitle: 'GN • T-Type • Turbo T',
    image: '/images/cars/grand-national.jpg',
    logo: '/images/logos/buick-logo.png',
    count: 892,
  },
  {
    id: 'cutlass-supreme',
    name: 'Cutlass Supreme',
    years: '1978-1988',
    subtitle: '442 • Salon • Brougham',
    image: '/images/cars/cutlass-442.jpg',
    logo: '/images/logos/chevrolet-logo.jpg',
    count: 1089,
  },
  {
    id: 'regal',
    name: 'Buick Regal',
    years: '1978-1987',
    subtitle: 'Limited • T-Type • GS',
    image: '/images/cars/regal-t-type.jpg',
    logo: '/images/logos/buick-logo.png',
    count: 756,
  },
  {
    id: 'el-camino',
    name: 'El Camino',
    years: '1978-1987',
    subtitle: 'SS • Conquista • Royal',
    image: '/images/cars/el-camino.jpg',
    logo: '/images/logos/chevrolet-logo.jpg',
    count: 634,
  },
  {
    id: 'malibu',
    name: 'Chevy Malibu',
    years: '1978-1983',
    subtitle: 'Classic • Landau • Sport',
    image: '/images/cars/malibu.jpg',
    logo: '/images/logos/chevrolet-logo.jpg',
    count: 423,
  },
  {
    id: 'grand-prix',
    name: 'Grand Prix',
    years: '1978-1987',
    subtitle: 'LJ • SJ • Turbo',
    image: '/images/cars/grand-prix.jpg',
    logo: '/images/logos/pontiac-logo.svg',
    count: 567,
  },
];

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
    image: '/images/cars/monte-carlo-ss.jpg',
    condition: 'Excellent',
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
    image: '/images/cars/grand-national.jpg',
    condition: 'Show Quality',
    isFeatured: true,
  },
  {
    id: '3',
    title: '1983 Hurst Olds 442',
    price: 38000,
    location: 'Charlotte, NC',
    year: 1983,
    model: '442',
    engine: '350 V8',
    mileage: 42000,
    image: '/images/cars/cutlass-442.jpg',
    condition: 'Excellent',
  },
];

const BUILD_ENGINES = [
  { name: 'LS3 6.2L', hp: '430-500', torque: '425-470', cost: '8,000-15,000', popular: true, boost: 'N/A' },
  { name: 'LS1 5.7L', hp: '305-350', torque: '300-350', cost: '4,000-8,000', popular: false, boost: 'N/A' },
  { name: 'LS7 7.0L', hp: '505-580', torque: '470-540', cost: '15,000-25,000', popular: false, boost: 'N/A' },
  { name: '350 Small Block', hp: '300-400', torque: '350-420', cost: '3,000-7,000', popular: true, boost: 'N/A' },
  { name: '383 Stroker', hp: '400-500', torque: '420-500', cost: '5,000-12,000', popular: false, boost: 'N/A' },
  { name: 'LS Turbo', hp: '600-1000+', torque: '550-900+', cost: '12,000-30,000', popular: true, boost: '15-30 PSI' },
];

const STATS = [
  { icon: Car, label: 'Vehicles Listed', value: '2,847' },
  { icon: Package, label: 'Parts Available', value: '8,234' },
  { icon: Users, label: 'Members', value: '15,892' },
  { icon: Shield, label: 'Verified Sellers', value: '234' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Hero Section - Big Monte Carlo Background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/cars/monte-carlo-ss.jpg"
            alt="Monte Carlo SS"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[var(--gb-dark)]" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-20">
          {/* Logo - Top Left */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black">
              <span className="chrome-text">G-BODY</span>
              <span className="text-white ml-2">FINDER</span>
            </h1>
            <p className="text-[var(--gb-text-muted)] text-sm mt-1">
              The #1 Marketplace for G-Body Classics
            </p>
          </div>

          {/* G-Body Selector - Prominent */}
          <div className="mb-10">
            <h3 className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-4">
              Find Your G-Body
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl">
              {GBODY_MODELS.map((model) => (
                <Link
                  key={model.id}
                  href={`/models/${model.id}`}
                  className="group relative overflow-hidden rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 hover:border-orange-500 transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={model.image} 
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <img src={model.logo} alt="" className="w-5 h-5 object-contain brightness-200" />
                      <h4 className="font-bold text-sm text-white">{model.name}</h4>
                    </div>
                    <p className="text-xs text-white/60">{model.years}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <span className="text-orange-400 font-semibold">{model.count.toLocaleString()}</span>
                      <span className="text-white/40">listed</span>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Parts Card */}
              <Link
                href="/parts"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-orange-500 transition-all duration-300"
              >
                <div className="aspect-[4/3] flex items-center justify-center">
                  <Wrench size={48} className="text-orange-500/60 group-hover:text-orange-500 transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="font-bold text-sm text-white">Parts</h4>
                  <p className="text-xs text-white/60">All Years</p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <span className="text-orange-400 font-semibold">8,234</span>
                    <span className="text-white/40">parts</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <form action="/search" method="get" className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" size={22} />
              <input
                type="text"
                name="q"
                placeholder="Find any part... (door seals, window switch, T-top kit)"
                className="w-full pl-14 pr-32 py-5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-lg"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors">
                Find Parts
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
                <stat.icon className="mx-auto mb-2 text-orange-400" size={24} />
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Calculator */}
      <section className="py-16 bg-gradient-to-b from-[var(--gb-dark)] to-[var(--gb-surface)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-4">
              <Cog size={16} />
              Build Calculator
            </div>
            <h2 className="text-3xl font-bold">Engine Build Estimator</h2>
            <p className="text-[var(--gb-text-secondary)] mt-2">Estimate HP, torque, and cost for your G-Body build</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {BUILD_ENGINES.map((engine) => (
              <div 
                key={engine.name}
                className={`relative p-6 rounded-2xl border ${engine.popular ? 'border-orange-500 bg-gradient-to-br from-orange-500/10 to-transparent' : 'border-[var(--gb-border)] bg-[var(--gb-dark)]'}`}
              >
                {engine.popular && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                    POPULAR
                  </span>
                )}
                <h3 className="font-bold text-xl mb-1">{engine.name}</h3>
                <p className="text-sm text-[var(--gb-text-muted)] mb-4">G-Body Swap Ready</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--gb-text-muted)] text-sm flex items-center gap-2">
                      <TrendingUp size={14} className="text-orange-500" />
                      Horsepower
                    </span>
                    <span className="font-semibold text-white">{engine.hp} HP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--gb-text-muted)] text-sm flex items-center gap-2">
                      <Timer size={14} className="text-orange-500" />
                      Torque
                    </span>
                    <span className="font-semibold text-white">{engine.torque} LB-FT</span>
                  </div>
                  {engine.boost !== 'N/A' && (
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--gb-text-muted)] text-sm">Boost</span>
                      <span className="font-semibold text-orange-400">{engine.boost}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--gb-border)] mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--gb-text-muted)] text-sm">Est. Cost</span>
                    <span className="text-2xl font-bold text-orange-500">${engine.cost}</span>
                  </div>
                </div>

                <Link 
                  href={`/build-calculator?engine=${engine.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block w-full text-center py-3 rounded-xl bg-[var(--gb-surface)] border border-[var(--gb-border)] hover:border-orange-500 transition-colors text-sm font-medium"
                >
                  Configure Build
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/build-calculator" className="gb-btn gb-btn-primary">
              <Calculator size={18} className="mr-2" />
              Full Build Calculator
            </Link>
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
          <Link href="/listings" className="gb-btn gb-btn-secondary hidden md:flex">
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
                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                      FEATURED
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/80 backdrop-blur text-white text-xs font-semibold rounded">
                    {listing.condition}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
                <div className="flex items-center gap-2 text-sm text-[var(--gb-text-muted)] mb-2">
                  <span>{listing.year}</span>
                  <span>•</span>
                  <span>{listing.engine}</span>
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
      <section className="py-16 bg-[var(--gb-surface)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why G-Body Finder?</h2>
            <p className="text-[var(--gb-text-secondary)] max-w-2xl mx-auto">
              We pull from <strong>everywhere</strong> — Facebook, Craigslist, eBay, Bring a Trailer, Cars.com, Autotrader, forums, and dealers nationwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-2xl border border-[var(--gb-border)]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Search className="text-orange-500" size={28} />
              </div>
              <h3 className="font-semibold mb-2 text-lg">All Sources</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                Facebook, Craigslist, eBay, BAT, Cars.com, Autotrader, forums — one search.
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-2xl border border-[var(--gb-border)]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Shield className="text-orange-500" size={28} />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Verified Sellers</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                Dealers and private sellers verified for safe transactions.
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-2xl border border-[var(--gb-border)]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Wrench className="text-orange-500" size={28} />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Parts Network</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                Summit, Jegs, RockAuto, Classic Industries, Mikes Montes.
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-2xl border border-[var(--gb-border)]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Gauge className="text-orange-500" size={28} />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Build Calculator</h3>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                HP, torque, and cost estimates for LS and 350 builds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Find Your G-Body Today</h2>
          <p className="text-white/80 text-lg mb-8">
            Join thousands of enthusiasts. Browse listings. Get alerts. Build your dream.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="gb-btn bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4">
              Create Free Account
            </Link>
            <Link href="/listings" className="gb-btn bg-transparent text-white border-2 border-white hover:bg-white/10 text-lg px-8 py-4">
              Browse All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Fade - Regal */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/cars/regal-t-type.jpg"
            alt="Buick Regal T-Type"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gb-dark)] via-[var(--gb-dark)]/90 to-[var(--gb-dark)]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="chrome-text">G-BODY</span>
            <span className="text-white"> FINDER</span>
          </h2>
          <p className="text-xl text-[var(--gb-text-secondary)] mb-8 max-w-2xl mx-auto">
            The #1 marketplace for G-Body classics. Find your Monte Carlo, Grand National, Cutlass, Regal, El Camino, Malibu, or Grand Prix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" className="gb-btn gb-btn-primary text-lg">
              Browse All Listings
            </Link>
            <Link href="/build-calculator" className="gb-btn gb-btn-secondary text-lg">
              Build Calculator
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
                The #1 marketplace for G-Body classics. Monte Carlo, Grand National, Cutlass, Regal, El Camino, Malibu & Grand Prix.
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
                <li><Link href="/build-calculator" className="hover:text-orange-500">Build Calculator</Link></li>
                <li><Link href="/buyers-guide" className="hover:text-orange-500">Buyer's Guide</Link></li>
                <li><Link href="/price-guide" className="hover:text-orange-500">Price Guide</Link></li>
                <li><Link href="/shipping" className="hover:text-orange-500">Shipping</Link></li>
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
}// trigger deploy
