import { Search, MapPin, DollarSign, Calendar, Filter, Grid3X3, List } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const LISTINGS = [
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
    posted: '2 days ago',
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
    posted: '3 days ago',
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
    posted: '5 days ago',
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
    posted: '1 week ago',
  },
  {
    id: '5',
    title: '1986 Buick Regal T-Type',
    price: 32000,
    location: 'Dallas, TX',
    year: 1986,
    model: 'Regal T-Type',
    engine: '3.8L Turbo V6',
    transmission: 'Automatic',
    mileage: 56000,
    image: 'https://images.unsplash.com/photo-1492144534655-ae8c224e9dfd?w=600&h=400&fit=crop',
    condition: 'Excellent',
    seller: 'Verified Dealer',
    posted: '4 days ago',
  },
  {
    id: '6',
    title: '1983 Oldsmobile 442',
    price: 38000,
    location: 'Charlotte, NC',
    year: 1983,
    model: '442',
    engine: '350 V8',
    transmission: 'Automatic',
    mileage: 42000,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
    condition: 'Show Quality',
    seller: 'Verified Dealer',
    posted: '1 day ago',
  },
];

export default function ListingsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Header */}
      <header className="bg-[var(--gb-surface)] border-b border-[var(--gb-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="chrome-text">G-Body</span> Finder
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/listings" className="text-orange-500 font-semibold">Listings</Link>
            <Link href="/sell" className="text-[var(--gb-text-secondary)] hover:text-white">Sell</Link>
            <Link href="/community" className="text-[var(--gb-text-secondary)] hover:text-white">Community</Link>
            <Link href="/signup" className="gb-btn gb-btn-primary text-sm">Sign Up</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="gb-card p-4 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} />
                <h3 className="font-semibold">Filters</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[var(--gb-text-muted)] mb-2 block">Model</label>
                  <select className="w-full px-3 py-2 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-lg text-white focus:outline-none focus:border-orange-500">
                    <option>All Models</option>
                    <option>Monte Carlo</option>
                    <option>Grand National</option>
                    <option>Cutlass Supreme</option>
                    <option>Regal</option>
                    <option>Grand Prix</option>
                    <option>442</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-[var(--gb-text-muted)] mb-2 block">Year Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="From" className="px-3 py-2 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-lg text-white placeholder-[var(--gb-text-muted)] focus:outline-none focus:border-orange-500" />
                    <input type="number" placeholder="To" className="px-3 py-2 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-lg text-white placeholder-[var(--gb-text-muted)] focus:outline-none focus:border-orange-500" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[var(--gb-text-muted)] mb-2 block">Price Range</label>
                  <select className="w-full px-3 py-2 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-lg text-white focus:outline-none focus:border-orange-500">
                    <option>Any Price</option>
                    <option>Under $10K</option>
                    <option>$10K - $20K</option>
                    <option>$20K - $35K</option>
                    <option>$35K - $50K</option>
                    <option>$50K+</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-[var(--gb-text-muted)] mb-2 block">Condition</label>
                  <div className="space-y-2">
                    {['Show Quality', 'Excellent', 'Good', 'Fair', 'Project'].map((condition) => (
                      <label key={condition} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-[var(--gb-border)] text-orange-500 focus:ring-orange-500" />
                        <span className="text-sm">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[var(--gb-text-muted)] mb-2 block">Seller Type</label>
                  <div className="space-y-2">
                    {['Verified Dealer', 'Private Seller'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-[var(--gb-border)] text-orange-500 focus:ring-orange-500" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full gb-btn gb-btn-primary">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">G-Body Listings</h1>
                <p className="text-[var(--gb-text-muted)]">{LISTINGS.length} results found</p>
              </div>
              <div className="flex items-center gap-4">
                <select className="px-3 py-2 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-white focus:outline-none focus:border-orange-500">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Mileage: Low to High</option>
                </select>
                <div className="flex bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500' : 'hover:bg-[var(--gb-surface-hover)]'}`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-orange-500' : 'hover:bg-[var(--gb-surface-hover)]'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {LISTINGS.map((listing) => (
                <Link 
                  key={listing.id} 
                  href={`/listings/${listing.id}`}
                  className={viewMode === 'grid' ? 'gb-card group' : 'gb-card group flex gap-4 p-4'}
                >
                  {viewMode === 'grid' ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{listing.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-[var(--gb-text-muted)] mt-1">
                              <span className="flex items-center gap-1"><Calendar size={14} /> {listing.year}</span>
                              <span>{listing.engine}</span>
                              <span>{listing.mileage.toLocaleString()} mi</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[var(--gb-text-muted)] mt-1">
                              <MapPin size={14} />
                              {listing.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-500">${listing.price.toLocaleString()}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">{listing.condition}</span>
                              <span className="text-xs text-[var(--gb-text-muted)]">{listing.seller}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-12">
              <button className="px-4 py-2 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-[var(--gb-text-muted)] hover:text-white">
                Previous
              </button>
              <button className="px-4 py-2 bg-orange-500 rounded-lg text-white">1</button>
              <button className="px-4 py-2 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-white hover:border-orange-500">2</button>
              <button className="px-4 py-2 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-white hover:border-orange-500">3</button>
              <button className="px-4 py-2 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-[var(--gb-text-muted)] hover:text-white">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}