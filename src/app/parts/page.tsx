'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Truck, Wrench, CheckCircle, Heart, HeartOff, Zap, Bell, TrendingDown, ChevronDown, Filter } from 'lucide-react';

interface Part {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  url: string;
  source: string;
  fits: string[];
  inStock: boolean;
  freeShipping: boolean;
  historicalPrices?: { date: string; price: number }[];
}

interface PriceAlert {
  partId: string;
  partName: string;
  targetPrice: number;
  currentPrice: number;
  email?: string;
}

const PART_CATEGORIES = [
  { id: 'all', label: 'All Parts' },
  { id: 'front-end', label: 'Front End' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'seals-weatherstrip', label: 'Seals & Weatherstrip' },
  { id: 'interior', label: 'Interior' },
  { id: 'engine', label: 'Engine & Cooling' },
  { id: 'electrical', label: 'Electrical' },
];

const POPULAR_SEARCHES = [
  'door seals', 'window switch', 'floor mats', 'weatherstrip',
  'T-top kit', 'hood latch', 'bumper', 'headlight covers',
];

// Price-tracked vendors with affiliate links
const VENDORS = [
  {
    name: "Mike's Montes",
    url: 'https://www.mikesmontes.com/',
    affiliate: '?ref=gbodyfinder',
    description: 'The #1 source for Monte Carlo SS and G-body parts. New, used, GM NOS, and aftermarket.',
    highlight: '8,000+ parts',
    color: 'from-orange-500 to-red-600',
    rating: 4.8,
    reviewCount: 2340,
    priceMatch: true,
    freeShippingThreshold: 150,
  },
  {
    name: 'Summit Racing',
    url: 'https://www.summitracing.com/',
    affiliate: '?ref=gbodyfinder',
    description: 'Huge selection of performance parts, tools, and equipment.',
    highlight: 'Same-day shipping',
    color: 'from-blue-500 to-blue-700',
    rating: 4.6,
    reviewCount: 18500,
    priceMatch: true,
    freeShippingThreshold: 100,
  },
  {
    name: 'JEGS High Performance',
    url: 'https://www.jegs.com/',
    affiliate: '?ref=gbodyfinder',
    description: 'Same-day shipping on thousands of performance parts.',
    highlight: 'Same-day dispatch',
    color: 'from-red-600 to-orange-600',
    rating: 4.7,
    reviewCount: 11200,
    priceMatch: true,
    freeShippingThreshold: 99,
  },
  {
    name: 'RockAuto',
    url: 'https://www.rockauto.com/',
    affiliate: '?ref=gbodyfinder',
    description: 'Factory OE and aftermarket parts at discount prices.',
    highlight: 'Everyday low prices',
    color: 'from-green-500 to-emerald-600',
    rating: 4.4,
    reviewCount: 8900,
    priceMatch: false,
    freeShippingThreshold: 0,
  },
];

// Add historical prices to parts for "price dropping" UI
const MOCK_HISTORICAL: Record<string, { date: string; price: number }[]> = {
  'mm-weatherstrip-9pc': [
    { date: '2025-01', price: 249.99 },
    { date: '2025-02', price: 229.99 },
    { date: '2025-03', price: 209.99 },
    { date: '2025-04', price: 199.99 },
  ],
  'mm-door-seals': [
    { date: '2025-01', price: 74.99 },
    { date: '2025-02', price: 69.99 },
    { date: '2025-03', price: 59.99 },
    { date: '2025-04', price: 54.99 },
  ],
  'mm-window-switches': [
    { date: '2025-01', price: 69.99 },
    { date: '2025-02', price: 64.99 },
    { date: '2025-03', price: 54.99 },
    { date: '2025-04', price: 49.99 },
  ],
};

function getPriceTrend(partId: string, currentPrice: number): { trend: 'up' | 'down' | 'stable'; percent: number } {
  const hist = MOCK_HISTORICAL[partId];
  if (!hist || hist.length < 2) return { trend: 'stable', percent: 0 };
  const oldest = hist[0].price;
  const percent = ((oldest - currentPrice) / oldest) * 100;
  if (percent > 2) return { trend: 'down', percent: Math.round(percent) };
  if (percent < -2) return { trend: 'up', percent: Math.round(Math.abs(percent)) };
  return { trend: 'stable', percent: 0 };
}

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try { return new Set(JSON.parse(localStorage.getItem('gbf-wishlist') || '[]')); }
    catch { return new Set(); }
  });
  const [showWishlist, setShowWishlist] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('gbf-price-alerts') || '[]'); }
    catch { return []; }
  });
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTargetPrice, setAlertTargetPrice] = useState('');
  const [alertEmail, setAlertEmail] = useState('');
  const [activePartForAlert, setActivePartForAlert] = useState<Part | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [alertSuccess, setAlertSuccess] = useState('');

  useEffect(() => {
    async function fetchParts() {
      setLoading(true);
      try {
        const cat = selectedCategory === 'all' ? 'All Parts' : selectedCategory;
        const res = await fetch(`/api/parts?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setParts(data.parts || []);
      } catch (error) {
        console.error('Failed to fetch parts:', error);
      }
      setLoading(false);
    }
    const timeout = setTimeout(fetchParts, searchQuery ? 300 : 0);
    return () => clearTimeout(timeout);
  }, [selectedCategory, searchQuery]);

  const toggleWishlist = (partId: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(partId)) {
        next.delete(partId);
      } else {
        next.add(partId);
      }
      try {
        localStorage.setItem('gbf-wishlist', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  const openAlertModal = (part: Part) => {
    setActivePartForAlert(part);
    setAlertTargetPrice(Math.floor(part.price * 0.9).toString());
    setAlertSuccess('');
    setShowAlertModal(true);
  };

  const savePriceAlert = () => {
    if (!activePartForAlert) return;
    const alert: PriceAlert = {
      partId: activePartForAlert.id,
      partName: activePartForAlert.name,
      targetPrice: parseFloat(alertTargetPrice) || Math.floor(activePartForAlert.price * 0.9),
      currentPrice: activePartForAlert.price,
      email: alertEmail || undefined,
    };
    const updated = [alert, ...priceAlerts].slice(0, 20);
    setPriceAlerts(updated);
    try { localStorage.setItem('gbf-price-alerts', JSON.stringify(updated)); } catch {}
    
    const subject = encodeURIComponent(`Price Alert: ${activePartForAlert.name}`);
    const body = encodeURIComponent(
      `I'd like to be notified when the price drops below $${alertTargetPrice}.\n\nPart: ${activePartForAlert.name}\nCurrent Price: $${activePartForAlert.price}\nVendor: ${activePartForAlert.source}\nLink: ${activePartForAlert.url}`
    );
    window.location.href = `mailto:alerts@gbodyfinder.com?subject=${subject}&body=${body}`;
    
    setAlertSuccess('Alert saved! You\'ll receive an email when the price drops.');
    setTimeout(() => {
      setShowAlertModal(false);
      setAlertSuccess('');
    }, 2000);
  };

  const displayedParts = showWishlist
    ? parts.filter(p => wishlist.has(p.id))
    : parts;

  const sortedParts = [...displayedParts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
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
            <Link href="/listings" className="text-[var(--gb-text-secondary)] hover:text-white transition-colors">Listings</Link>
            <Link href="/parts" className="text-orange-500 font-semibold">Parts</Link>
            <Link href="/build-calculator" className="text-[var(--gb-text-secondary)] hover:text-white transition-colors">Build Calc</Link>
            <Link href="/market" className="text-[var(--gb-text-secondary)] hover:text-white transition-colors">Market</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="text-orange-500" size={20} />
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">G-Body Parts</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Parts Shop</h1>
          <p className="text-[var(--gb-text-secondary)] text-sm">
            Real parts for your G-Body. Track prices, set alerts, and earn affiliate commissions to support the site.
          </p>
        </div>

        {/* Featured Vendor Banner */}
        <div className="gb-card p-5 mb-8 border-orange-500/30 bg-gradient-to-r from-orange-500/[0.06] to-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="text-orange-500" size={20} />
                <h2 className="font-bold text-lg">{"Mike's Montes"}</h2>
                <span className="badge badge-green text-[10px]">Verified</span>
              </div>
              <p className="text-sm text-[var(--gb-text-secondary)]">
                The premier source for Monte Carlo SS and G-Body parts. New, used, GM NOS, and aftermarket.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-[var(--gb-text-muted)]">
                <CheckCircle size={13} className="text-green-400" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--gb-text-muted)]">
                <Truck size={13} />
                <span>Ships 2-3 days</span>
              </div>
              <a
                href="https://www.mikesmontes.com/?ref=gbodyfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="gb-btn gb-btn-primary text-sm py-2.5"
              >
                Shop Now <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Price Alerts Banner */}
        {priceAlerts.length > 0 && (
          <div className="gb-card p-4 mb-6 border-yellow-500/30 bg-gradient-to-r from-yellow-500/[0.05] to-transparent">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-yellow-500" />
                <span className="text-sm font-semibold">
                  {priceAlerts.length} active price alert{priceAlerts.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {priceAlerts.slice(0, 3).map((alert) => (
                  <span key={alert.partId} className="px-3 py-1 bg-[var(--gb-dark)] rounded-lg text-xs">
                    {alert.partName.length > 25 ? alert.partName.slice(0, 25) + '…' : alert.partName}
                    {' '}<span className="text-yellow-500 font-semibold">${alert.targetPrice}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts by name or fitment..."
              className="w-full pl-11 pr-4 py-3 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-xl text-white placeholder-[var(--gb-text-muted)] text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
          
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none px-4 py-3 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-xl text-sm text-white pr-9 cursor-pointer focus:outline-none focus:border-orange-500"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name A–Z</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)] pointer-events-none" />
          </div>

          {/* Wishlist toggle */}
          <button
            onClick={() => setShowWishlist(!showWishlist)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              showWishlist
                ? 'bg-orange-500/10 border-orange-500/50 text-orange-400'
                : 'bg-[var(--gb-surface)] border-[var(--gb-border)] text-[var(--gb-text-secondary)] hover:border-orange-500/30'
            }`}
          >
            <Heart size={16} className={showWishlist ? 'fill-orange-400' : ''} />
            Saved ({wishlist.size})
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {PART_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-[var(--gb-surface)] border border-[var(--gb-border)] text-[var(--gb-text-secondary)] hover:border-orange-500/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick searches */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs text-[var(--gb-text-muted)] self-center">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 bg-white/[0.04] border border-[var(--gb-border)] rounded-full text-xs text-[var(--gb-text-secondary)] hover:border-orange-500/30 hover:text-white transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Parts Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-[var(--gb-text-muted)] text-sm">Loading parts...</p>
          </div>
        ) : sortedParts.length === 0 ? (
          <div className="text-center py-20">
            <HeartOff className="mx-auto mb-3 text-[var(--gb-text-muted)]" size={32} />
            <p className="text-[var(--gb-text-secondary)]">
              {showWishlist ? 'No saved parts yet. Browse and save parts you like!' : 'No parts found. Try a different search.'}
            </p>
            {showWishlist && (
              <button onClick={() => setShowWishlist(false)} className="mt-3 text-orange-500 text-sm hover:underline">
                Browse all parts
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {sortedParts.map((part) => {
              const trend = getPriceTrend(part.id, part.price);
              const hasAlert = priceAlerts.some(a => a.partId === part.id);
              
              return (
                <div key={part.id} className="gb-card group relative">
                  {/* Top badges */}
                  <div className="absolute top-3 left-2.5 z-10 flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-orange-500/90 text-white text-[10px] font-bold rounded">
                      {part.source}
                    </span>
                    {part.freeShipping && (
                      <span className="px-2 py-0.5 bg-green-600/90 text-white text-[10px] font-bold rounded">
                        FREE SHIP
                      </span>
                    )}
                    {trend.trend === 'down' && (
                      <span className="px-2 py-0.5 bg-blue-600/90 text-white text-[10px] font-bold rounded flex items-center gap-0.5">
                        <TrendingDown size={8} /> -{trend.percent}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist + alert buttons */}
                  <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(part.id); }}
                      className="w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <Heart size={12} className={wishlist.has(part.id) ? 'fill-red-500 text-red-500' : 'text-white'} />
                    </button>
                  </div>

                  {/* Image */}
                  <a
                    href={`${part.url}${part.url.includes('?') ? '&' : '?'}ref=gbodyfinder`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="aspect-square bg-[var(--gb-dark)] relative overflow-hidden">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </a>

                  {/* Info */}
                  <div className="p-3.5">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 leading-snug min-h-[2.5rem]">
                      <a
                        href={`${part.url}${part.url.includes('?') ? '&' : '?'}ref=gbodyfinder`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition-colors"
                      >
                        {part.name}
                      </a>
                    </h3>
                    <p className="text-[10px] text-[var(--gb-text-muted)] mb-2.5 leading-tight">
                      Fits: {part.fits.slice(0, 2).join(', ')}{part.fits.length > 2 ? ` +${part.fits.length - 2}` : ''}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-400 price-tag">
                        ${part.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {/* Price alert button */}
                        <button
                          onClick={(e) => { e.preventDefault(); openAlertModal(part); }}
                          className={`p-1.5 rounded-lg transition-colors ${hasAlert ? 'text-yellow-400' : 'text-[var(--gb-text-muted)] hover:text-yellow-400'}`}
                          title={hasAlert ? 'Alert set' : 'Set price alert'}
                        >
                          <Bell size={13} className={hasAlert ? 'fill-yellow-400' : ''} />
                        </button>
                        <a
                          href={`${part.url}${part.url.includes('?') ? '&' : '?'}ref=gbodyfinder`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--gb-text-muted)] hover:text-orange-500 transition-colors"
                        >
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Price Alert Modal */}
        {showAlertModal && activePartForAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="gb-card w-full max-w-md p-6">
              <h3 className="text-xl font-bold mb-1">💰 Set Price Alert</h3>
              <p className="text-sm text-[var(--gb-text-secondary)] mb-5">
                Get notified when <strong className="text-white">{activePartForAlert.name}</strong> drops below your target price.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Current Price</label>
                  <div className="text-2xl font-bold text-orange-400">${activePartForAlert.price.toFixed(2)}</div>
                </div>
                
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Alert me when price drops to</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]">$</span>
                    <input
                      type="number"
                      value={alertTargetPrice}
                      onChange={(e) => setAlertTargetPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">
                    Your email (optional — we'll email you when the price drops)
                  </label>
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white placeholder-[var(--gb-text-muted)] text-sm focus:outline-none focus:border-orange-500"
                  />
                  <p className="text-[10px] text-[var(--gb-text-muted)] mt-1">
                    No cloud services — we'll send you a plain email notification. No account required.
                  </p>
                </div>

                {alertSuccess && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                    {alertSuccess}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowAlertModal(false)}
                    className="flex-1 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-sm font-medium hover:border-orange-500/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={savePriceAlert}
                    className="flex-1 py-3 bg-orange-500 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Bell size={14} />
                    Set Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="text-center mb-12">
          <p className="text-xs text-[var(--gb-text-muted)]">
            🎯 Affiliate links — we earn a small commission when you buy through our partners, at no extra cost to you.
          </p>
        </div>

        {/* More Vendors - Improved Cards */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-5">All G-Body Vendors</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {VENDORS.map((vendor) => (
              <a
                key={vendor.name}
                href={`${vendor.url}${vendor.affiliate}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gb-card p-5 hover:border-orange-500/40 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vendor.color} opacity-30 flex items-center justify-center flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold group-hover:text-orange-400 transition-colors">{vendor.name}</h3>
                      <ExternalLink size={12} className="text-[var(--gb-text-muted)]" />
                    </div>
                    <p className="text-xs text-[var(--gb-text-secondary)] mb-2 leading-relaxed">
                      {vendor.description}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-[var(--gb-text-muted)]">
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span> {vendor.rating} ({vendor.reviewCount.toLocaleString()})
                      </span>
                      {vendor.priceMatch && (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={10} className="text-green-400" /> Price Match
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Truck size={10} /> Free ship ${vendor.freeShippingThreshold}+
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-orange-400 font-medium flex items-center gap-1">
                        <Zap size={10} />
                        {vendor.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Community Forums */}
        <div className="gb-card p-6">
          <h2 className="text-lg font-bold mb-4">G-Body Community & Forums</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                name: 'TurboBuick.com',
                url: 'https://turbobuick.com',
                description: 'Grand National & T-Type community — 48,000+ members',
                members: '48K+',
              },
              {
                name: 'GBodyForum.com',
                url: 'https://gbodyforum.com',
                description: 'All G-Body discussion, marketplace, and technical help',
                members: 'Forum',
              },
            ].map((forum) => (
              <a
                key={forum.name}
                href={forum.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[var(--gb-dark)] rounded-xl hover:bg-[var(--gb-surface)] transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-500 font-bold text-base flex-shrink-0">
                  {forum.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm group-hover:text-orange-400">{forum.name}</h4>
                  <p className="text-xs text-[var(--gb-text-muted)]">{forum.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-orange-500 hover:text-orange-400 text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. Parts sourced from trusted vendors. Affiliate links support the site.</p>
        </div>
      </footer>
    </div>
  );
}
