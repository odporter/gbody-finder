import { Search, MapPin, DollarSign, Calendar, ChevronRight, Car, Zap, Users, Shield } from 'lucide-react';
import Link from 'next/link';

const FEATURED_LISTINGS = [
  {
    id: '1',
    title: '1987 Monte Carlo SS Aerocoupe',
    price: 28500,
    location: 'Houston, TX',
    year: 1987,
    model: 'Monte Carlo SS',
    engine: '305 V8',
    transmission: 'Automatic',
    mileage: 45000,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c6cd88?w=600&h=400&fit=crop',
    condition: 'Excellent',
    seller: 'Verified Dealer',
  },
  {
    id: '2',
    title: '1985 Buick Grand National',
    price: 45000,
    location: 'Phoenix, AZ',
    year: 1985,
    model: 'Grand National',
    engine: '3.8L Turbo V6',
    transmission: 'Automatic',
    mileage: 62000,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
    condition: 'Show Quality',
    seller: 'Private Seller',
  },
  {
    id: '3',
    title: '1984 Oldsmobile Cutlass Supreme',
    price: 18500,
    location: 'Atlanta, GA',
    year: 1984,
    model: 'Cutlass Supreme',
    engine: '307 V8',
    transmission: 'Automatic',
    mileage: 78000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    condition: 'Good',
    seller: 'Private Seller',
  },
  {
    id: '4',
    title: '1988 Monte Carlo LS',
    price: 12000,
    location: 'Miami, FL',
    year: 1988,
    model: 'Monte Carlo LS',
    engine: '305 V8',
    transmission: 'Automatic',
    mileage: 95000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    condition: 'Project',
    seller: 'Private Seller',
  },
];

const POPULAR_SEARCHES = [
  { label: 'Monte Carlo SS', count: 234 },
  { label: 'Grand National', count: 89 },
  { label: 'Cutlass Supreme', count: 156 },
  { label: 'Regal T-Type', count: 67 },
  { label: 'Grand Prix', count: 112 },
  { label: '442', count: 43 },
];

const STATS = [
  { icon: Car, label: 'Listings', value: '2,847' },
  { icon: Users, label: 'Members', value: '12,453' },
  { icon: Zap, label: 'Sold', value: '892' },
  { icon: Shield, label: 'Verified Sellers', value: '156' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-6">
              <Zap size={16} />
              New listings daily
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Find Your <span className="chrome-text">G-Body</span>
            </h1>
            <p className="text-xl text-[var(--gb-text-secondary)] max-w-2xl mx-auto">
              The ultimate marketplace for Monte Carlos, Grand Nationals, Cutlasses, Regals & Grand Prix. 
              1978-1988 G-Body classics, all in one place.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-2xl p-6 shadow-2xl">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={20} />
                  <select className="w-full pl-10 pr-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-lg text-white focus:outline-none focus:border-orange-500">
                    <option>All Models</option>
                    <option>Monte Carlo</option>
                    <option>Grand National</option>
                    <option>Cutlass Supreme</option>
                    <option>Regal</option>
                    <option>Grand Prix</option>
                  </select>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={20} />
                  <input 
                    type="text" 
                    placeholder="City or ZIP"
                    className="w-full pl-10 pr-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-lg text-white placeholder-[var(--gb-text-muted)] focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]" size={20} />
                  <select className="w-full pl-10 pr-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-lg text-white focus:outline-none focus:border-orange-500">
                    <option>Any Price</option>
                    <option>Under $10K</option>
                    <option>$10K - $20K</option>
                    <option>$20K - $35K</option>
                    <option>$35K - $50K</option>
                    <option>$50K+</option>
                  </select>
                </div>
                <button className="gb-btn gb-btn-primary text-lg">
                  <Search size={20} />
                  Search
                </button>
              </div>

              {/* Popular Searches */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--gb-text-muted)]">Popular:</span>
                {POPULAR_SEARCHES.map((search) => (
                  <button 
                    key={search.label}
                    className="px-3 py-1 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-full text-sm text-[var(--gb-text-secondary)] hover:border-orange-500 hover:text-orange-400 transition-colors"
                  >
                    {search.label} <span className="text-[var(--gb-text-muted)]">({search.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-[var(--gb-text-muted)]">{stat.label}</div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_LISTINGS.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`} className="gb-card group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                    {listing.condition}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/70 text-white text-xs font-semibold rounded">
                    {listing.seller}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
                <div className="flex items-center gap-2 text-sm text-[var(--gb-text-muted)] mb-2">
                  <Calendar size={14} />
                  {listing.year} • {listing.engine}
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--gb-text-muted)] mb-3">
                  <MapPin size={14} />
                  {listing.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-500">
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

      {/* Models Section */}
      <section className="bg-[var(--gb-surface)] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Model</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Monte Carlo', 'Grand National', 'Cutlass Supreme', 'Regal', 'Grand Prix', '442'].map((model) => (
              <Link 
                key={model}
                href={`/listings?model=${model.toLowerCase().replace(' ', '-')}`}
                className="gb-card p-6 text-center hover:border-orange-500"
              >
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-semibold">{model}</h3>
                <p className="text-sm text-[var(--gb-text-muted)] mt-1">
                  {Math.floor(Math.random() * 200) + 50} listings
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why G-Body Finder */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why G-Body Finder?</h2>
          <p className="text-[var(--gb-text-secondary)] max-w-2xl mx-auto">
            We aggregate listings from across the web so you can find your perfect G-Body in one place.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Search className="text-orange-500" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">All Sources, One Search</h3>
            <p className="text-[var(--gb-text-secondary)]">
              We pull from Facebook Marketplace, Craigslist, eBay, Bring a Trailer, and more.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Shield className="text-orange-500" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
            <p className="text-[var(--gb-text-secondary)]">
              We verify dealers and private sellers so you can buy with confidence.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Zap className="text-orange-500" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
            <p className="text-[var(--gb-text-secondary)]">
              Get notified the moment your dream G-Body hits the market.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your G-Body?</h2>
          <p className="text-white/80 mb-8">
            Join thousands of enthusiasts who found their dream car through G-Body Finder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="gb-btn bg-white text-orange-600 hover:bg-gray-100">
              Create Free Account
            </Link>
            <Link href="/listings" className="gb-btn bg-transparent text-white border-2 border-white hover:bg-white/10">
              Browse Listings
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
                <span className="chrome-text">G-Body</span> Finder
              </h3>
              <p className="text-sm text-[var(--gb-text-muted)]">
                The ultimate marketplace for G-Body enthusiasts. 1978-1988 Monte Carlo, Grand National, Cutlass, Regal & Grand Prix.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-sm text-[var(--gb-text-secondary)]">
                <li><Link href="/listings" className="hover:text-orange-500">All Listings</Link></li>
                <li><Link href="/listings?model=monte-carlo" className="hover:text-orange-500">Monte Carlo</Link></li>
                <li><Link href="/listings?model=grand-national" className="hover:text-orange-500">Grand National</Link></li>
                <li><Link href="/listings?model=cutlass" className="hover:text-orange-500">Cutlass Supreme</Link></li>
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
              <h4 className="font-semibold mb-4">Sell Your G-Body</h4>
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
