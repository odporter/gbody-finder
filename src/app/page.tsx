'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Car, Star, ArrowRight, TrendingUp, Flame, Wrench, Calculator, Gauge, Zap, Cog, Timer, TrendingDown } from 'lucide-react';

// G-Body Models with real images
const GBODY_MODELS = [
  {
    id: 'monte-carlo',
    name: 'Monte Carlo',
    years: '1978-1988',
    subtitle: 'SS • Aerocoupe',
    image: '/images/cars/monte-carlo-ss.jpg',
    count: 1247,
    hot: true,
    avgPrice: '$28,500',
    trend: '+16.7%',
    trendUp: true,
  },
  {
    id: 'grand-national',
    name: 'Grand National',
    years: '1982-1987',
    subtitle: 'GN • GNX • T-Type',
    image: '/images/cars/grand-national.jpg',
    count: 892,
    hot: true,
    avgPrice: '$55,000',
    trend: '+23.5%',
    trendUp: true,
  },
  {
    id: 'cutlass-supreme',
    name: 'Cutlass Supreme',
    years: '1978-1988',
    subtitle: '442 • Hurst Olds',
    image: '/images/cars/cutlass-442.jpg',
    count: 1089,
    hot: false,
    avgPrice: '$22,000',
    trend: '+14.3%',
    trendUp: true,
  },
  {
    id: 'regal',
    name: 'Buick Regal',
    years: '1978-1987',
    subtitle: 'T-Type • Limited',
    image: '/images/cars/regal-t-type.jpg',
    count: 756,
    hot: false,
    avgPrice: '$18,000',
    trend: '+16.7%',
    trendUp: true,
  },
  {
    id: 'el-camino',
    name: 'El Camino',
    years: '1978-1987',
    subtitle: 'SS • Conquista',
    image: '/images/cars/el-camino.jpg',
    count: 634,
    hot: false,
    avgPrice: '$16,000',
    trend: '+18.2%',
    trendUp: true,
  },
  {
    id: 'malibu',
    name: 'Chevy Malibu',
    years: '1978-1983',
    subtitle: 'Classic • Landau',
    image: '/images/cars/malibu.jpg',
    count: 423,
    hot: false,
    avgPrice: '$12,000',
    trend: '+22.2%',
    trendUp: true,
  },
  {
    id: 'grand-prix',
    name: 'Grand Prix',
    years: '1978-1987',
    subtitle: 'LJ • SJ • Turbo',
    image: '/images/cars/grand-prix.jpg',
    count: 567,
    hot: false,
    avgPrice: '$14,000',
    trend: '+21.1%',
    trendUp: true,
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

const MARKET_INSIGHTS = [
  { label: 'Avg. YoY Return', value: '+17.8%', icon: TrendingUp, color: 'text-green-400' },
  { label: 'Models Tracked', value: '7', icon: Car, color: 'text-orange-400' },
  { label: '5-Year Avg Return', value: '+137%', icon: Gauge, color: 'text-blue-400' },
];

const POPULAR_SEARCHES = [
  'door seals', 'window switch', 'T-top kit',
  'floor mats', 'hood latch', 'weatherstrip',
  'Monte Carlo SS bumper', 'Grand National parts',
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cars/monte-carlo-ss.jpg"
            alt="Monte Carlo SS"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[var(--gb-dark)]" />
          {/* Decorative grid */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-24">
          {/* Logo */}
          <div className="mb-16 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-1">
              <img src="/logo.svg" alt="G-Body Finder" className="h-12 w-12" />
              <div>
                <h1 className="text-4xl md:text-5xl font-black leading-none">
                  <span className="chrome-text">G-BODY</span>
                  <span className="text-white ml-2">FINDER</span>
                </h1>
              </div>
            </div>
            <p className="text-[var(--gb-text-muted)] text-sm mt-2 ml-1">
              The #1 Marketplace for G-Body Classics
            </p>
          </div>

          {/* Hot Models — 2-column grid */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-orange-500" size={16} />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Trending Now</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {GBODY_MODELS.filter(m => m.hot).map((model) => (
                <Link
                  key={model.id}
                  href={`/models/${model.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--gb-border)] hover:border-orange-500/60 transition-all duration-300 bg-black/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-white text-base">{model.name}</h3>
                        <span className="premium-badge">HOT</span>
                      </div>
                      <p className="text-xs text-white/50 mb-2">{model.years} · {model.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-orange-400">{model.avgPrice}</span>
                        <span className="text-xs text-green-400 font-medium flex items-center gap-0.5">
                          <TrendingUp size={10} />
                          {model.trend} yr
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* G-Body Model Grid */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xs font-semibold text-[var(--gb-text-muted)] uppercase tracking-widest mb-4">
              Browse All Models
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {GBODY_MODELS.filter(m => !m.hot).map((model) => (
                <Link
                  key={model.id}
                  href={`/models/${model.id}`}
                  className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm border border-white/5 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="font-bold text-sm text-white leading-tight">{model.name}</h4>
                    <p className="text-xs text-white/40 mt-0.5">{model.years}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-orange-400 font-medium">{model.avgPrice}</span>
                      <span className="text-xs text-green-400 flex items-center gap-0.5">
                        <TrendingUp size={10} />
                        {model.trend}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Parts shortcut */}
              <Link
                href="/parts"
                className="group relative overflow-hidden rounded-xl border border-dashed border-white/10 hover:border-orange-500/50 transition-all duration-300 bg-black/30"
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center gap-2">
                  <Wrench size={32} className="text-orange-500/60 group-hover:text-orange-500 transition-colors" />
                  <span className="text-sm font-semibold text-white/70">Parts Shop</span>
                  <span className="text-xs text-white/30">8,234 items</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <form action="/search" method="get" className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search parts, builds, models..."
                className="w-full pl-13 pr-36 py-4 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-base"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm flex items-center gap-1.5"
              >
                Search
                <ArrowRight size={14} />
              </button>
            </form>
            {/* Quick searches */}
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {POPULAR_SEARCHES.slice(0, 4).map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    window.location.href = `/search?q=${encodeURIComponent(term)}`;
                  }}
                  className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-xs text-white/40 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/10 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {MARKET_INSIGHTS.map((stat) => (
              <div key={stat.label} className="stat-card py-4 px-3">
                <stat.icon className={`mx-auto mb-1.5 ${stat.color}`} size={18} />
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-[var(--gb-text-muted)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Calculator */}
      <section className="py-20 bg-[var(--gb-surface)] border-y border-[var(--gb-border)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Cog size={12} />
              Engine Build Estimator
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Plan Your Dream Build</h2>
            <p className="text-[var(--gb-text-secondary)] max-w-lg mx-auto">
              Pick your engine, transmission, and rear end. Get HP estimates and cost projections instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {BUILD_ENGINES.map((engine) => (
              <div
                key={engine.name}
                className={`relative p-6 rounded-2xl border transition-all duration-200 ${
                  engine.popular
                    ? 'border-orange-500/40 bg-gradient-to-br from-orange-500/[0.07] to-transparent'
                    : 'border-[var(--gb-border)] bg-[var(--gb-dark)]'
                }`}
              >
                {engine.popular && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <h3 className="font-bold text-lg mb-0.5">{engine.name}</h3>
                <p className="text-xs text-[var(--gb-text-muted)] mb-4">G-Body Swap Ready</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--gb-text-muted)] flex items-center gap-1.5">
                      <TrendingUp size={11} className="text-orange-500" /> HP
                    </span>
                    <span className="font-semibold text-sm text-white">{engine.hp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--gb-text-muted)] flex items-center gap-1.5">
                      <Timer size={11} className="text-orange-500" /> Torque
                    </span>
                    <span className="font-semibold text-sm text-white">{engine.torque} lb-ft</span>
                  </div>
                  {engine.boost !== 'N/A' && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[var(--gb-text-muted)]">Boost</span>
                      <span className="font-semibold text-sm text-orange-400">{engine.boost}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--gb-border)] mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--gb-text-muted)]">Est. Cost</span>
                    <span className="text-lg font-bold text-orange-400">${engine.cost}</span>
                  </div>
                </div>

                <Link
                  href="/build-calculator"
                  className="block w-full text-center py-2.5 rounded-xl bg-[var(--gb-surface)] border border-[var(--gb-border)] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-sm font-medium"
                >
                  Configure Build
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/build-calculator" className="gb-btn gb-btn-primary">
              <Calculator size={16} className="mr-2" />
              Open Full Build Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings — clean grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-orange-500" size={14} />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Featured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Listings Worth Watching</h2>
            <p className="text-[var(--gb-text-secondary)] mt-1">Hand-picked G-Bodies from across the web</p>
          </div>
          <Link href="/listings" className="hidden md:flex items-center gap-1 text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
            View all listings <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              id: '1',
              title: '1987 Monte Carlo SS Aerocoupe',
              price: 28500,
              location: 'Houston, TX',
              year: 1987,
              engine: '305 V8',
              mileage: 45000,
              image: '/images/cars/monte-carlo-ss.jpg',
              condition: 'Excellent',
              featured: true,
              trend: '+16.7%',
            },
            {
              id: '2',
              title: '1986 Buick Grand National',
              price: 45000,
              location: 'Phoenix, AZ',
              year: 1986,
              engine: '3.8L Turbo V6',
              mileage: 62000,
              image: '/images/cars/grand-national.jpg',
              condition: 'Show Quality',
              featured: true,
              trend: '+23.5%',
            },
            {
              id: '3',
              title: '1983 Hurst Olds 442',
              price: 38000,
              location: 'Charlotte, NC',
              year: 1983,
              engine: '350 V8',
              mileage: 42000,
              image: '/images/cars/cutlass-442.jpg',
              condition: 'Excellent',
              featured: false,
              trend: '+14.3%',
            },
          ].map((listing) => (
            <Link key={listing.id} href="/listings" className="gb-card group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {listing.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur text-white text-xs font-semibold rounded">
                    {listing.condition}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>{listing.year} · {listing.engine}</span>
                    <span className="text-green-400 font-medium">{listing.trend}/yr</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-base mb-1 line-clamp-1">{listing.title}</h3>
                <p className="text-xs text-[var(--gb-text-muted)] mb-3">{listing.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-400 price-tag">
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

      {/* Why G-Body Finder — horizontal feature strip */}
      <section className="py-16 bg-[var(--gb-surface)] border-y border-[var(--gb-border)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Why Use G-Body Finder?</h2>
            <p className="text-[var(--gb-text-secondary)] text-sm">
              Aggregates listings from Facebook, Craigslist, eBay, Bring a Trailer, Cars.com, Autotrader & more.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Search, title: 'All Sources', desc: 'Facebook, eBay, BAT, Cars.com — one place' },
              { icon: TrendingUp, title: 'Market Tracker', desc: 'Track G-Body values like stocks' },
              { icon: Wrench, title: 'Parts Network', desc: "Mike's Montes, GBodyParts & more" },
              { icon: Calculator, title: 'Build Calculator', desc: 'HP, torque, and cost estimates' },
            ].map((item) => (
              <div key={item.title} className="text-center p-5 rounded-xl bg-[var(--gb-dark)] border border-[var(--gb-border)]">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <item.icon className="text-orange-500" size={22} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--gb-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-transparent to-orange-900/20" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Find Your <span className="chrome-orange">G-Body</span> Today
          </h2>
          <p className="text-[var(--gb-text-secondary)] text-lg mb-10 max-w-xl mx-auto">
            Join thousands of enthusiasts. Browse live listings. Track market values. Build your dream.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" className="gb-btn gb-btn-primary text-base px-8 py-4">
              Browse All Listings <ArrowRight size={16} className="ml-1" />
            </Link>
            <Link href="/build-calculator" className="gb-btn gb-btn-secondary text-base px-8 py-4">
              Build Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="" className="h-7 w-7" />
                <span className="font-black text-sm chrome-text">G-BODY</span>
                <span className="text-white text-sm font-light">FINDER</span>
              </div>
              <p className="text-xs text-[var(--gb-text-muted)] leading-relaxed">
                The #1 marketplace for G-Body classics. Monte Carlo, Grand National, Cutlass, Regal, El Camino, Malibu & Grand Prix.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Browse</h4>
              <ul className="space-y-1.5 text-xs text-[var(--gb-text-secondary)]">
                <li><Link href="/listings" className="footer-link">All Listings</Link></li>
                <li><Link href="/listings?model=monte-carlo" className="footer-link">Monte Carlo</Link></li>
                <li><Link href="/listings?model=grand-national" className="footer-link">Grand National</Link></li>
                <li><Link href="/listings?model=cutlass-supreme" className="footer-link">Cutlass Supreme</Link></li>
                <li><Link href="/parts" className="footer-link">Parts Shop</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Tools</h4>
              <ul className="space-y-1.5 text-xs text-[var(--gb-text-secondary)]">
                <li><Link href="/build-calculator" className="footer-link">Build Calculator</Link></li>
                <li><Link href="/market" className="footer-link">Market Tracker</Link></li>
                <li><Link href="/search" className="footer-link">Parts Search</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Sell</h4>
              <ul className="space-y-1.5 text-xs text-[var(--gb-text-secondary)]">
                <li><Link href="/sell" className="footer-link">Create Listing</Link></li>
                <li><Link href="/dealer-program" className="footer-link">Dealer Program</Link></li>
              </ul>
            </div>
          </div>
          <div className="section-divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--gb-text-muted)]">
            <p>© 2026 G-Body Finder. All rights reserved.</p>
            <p>Values based on Hagerty, Bring a Trailer & Mecum data.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
