'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DollarSign, Camera, Shield, TrendingUp, ArrowRight, CheckCircle, Star, Users } from 'lucide-react';

export const metadata = {
  title: 'Sell Your G-Body | List a Car on G-Body Finder',
  description: 'List your 1978-1988 G-Body on G-Body Finder. Reach 40,000+ monthly enthusiasts. No commission, no listing fees for Basic. Featured listings from $19.',
};

const LISTING_TIERS = [
  {
    id: 'basic',
    name: 'Basic Listing',
    price: 'Free',
    duration: '30 days',
    features: [
      'List on G-Body Finder',
      'Link to your listing (eBay, BAT, Facebook)',
      'Market valuation estimate',
      'Social share buttons',
    ],
    cta: 'List for Free',
    popular: false,
  },
  {
    id: 'featured',
    name: 'Featured Listing',
    price: '$19',
    duration: '30 days',
    features: [
      'Everything in Basic',
      'Homepage featured placement',
      'Priority in search results',
      'Email notification to 2,400+ subscribers',
      'Up to 20 photos',
      'Price drop alerts for buyers',
    ],
    cta: 'Get Featured',
    popular: true,
  },
  {
    id: 'dealer',
    name: 'Dealer Program',
    price: '$99/mo',
    duration: 'per month',
    features: [
      'Everything in Featured',
      'Unlimited listings',
      'Dealer profile page',
      'Inventory feed integration',
      'Lead management dashboard',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Apply Now',
    popular: false,
  },
];

const SELL_STEPS = [
  {
    icon: Camera,
    title: '1. Submit Your Listing',
    desc: 'Add your G-Body photos, details, price, and link to where it\'s listed.',
  },
  {
    icon: TrendingUp,
    title: '2. Get Featured',
    desc: 'Featured listings reach 40,000+ monthly G-Body enthusiasts.',
  },
  {
    icon: DollarSign,
    title: '3. Close the Deal',
    desc: 'Buyers contact you directly. We take zero commission.',
  },
];

export default function SellPage() {
  const [form, setForm] = useState({
    model: '',
    year: '',
    price: '',
    location: '',
    condition: '',
    description: '',
    listingUrl: '',
    email: '',
    name: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // In production: send to email or database
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Header */}
      <header className="bg-[var(--gb-surface)]/95 backdrop-blur border-b border-[var(--gb-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.svg" alt="G-Body Finder" className="h-10 w-10 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="text-lg font-black chrome-text leading-tight">G-BODY</span>
              <span className="text-xs text-[var(--gb-text-muted)] leading-tight">FINDER</span>
            </div>
          </Link>
          <nav className="flex items-center gap-1 md:gap-6">
            <Link href="/listings" className="px-3 py-2 text-sm font-medium text-[var(--gb-text-secondary)] hover:text-white">Listings</Link>
            <Link href="/market" className="px-3 py-2 text-sm font-medium text-[var(--gb-text-secondary)] hover:text-white">Market</Link>
            <Link href="/parts" className="px-3 py-2 text-sm font-medium text-[var(--gb-text-secondary)] hover:text-white">Parts</Link>
            <Link href="/build-calculator" className="px-3 py-2 text-sm font-medium text-[var(--gb-text-secondary)] hover:text-white hidden md:block">Build Calc</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-orange-900/10" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
            <DollarSign size={12} />
            Sell Your G-Body
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            List Your G-Body in <span className="chrome-orange">60 Seconds</span>
          </h1>
          <p className="text-[var(--gb-text-secondary)] text-lg mb-8 max-w-xl mx-auto">
            Reach 40,000+ monthly G-Body enthusiasts. No commission, no hassle. Just list and let buyers come to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#create-listing" className="gb-btn gb-btn-primary text-base px-8 py-4">
              List Your Car <ArrowRight size={16} className="ml-1" />
            </a>
            <Link href="/dealer-program" className="gb-btn gb-btn-secondary text-base px-8 py-4">
              Dealer Program →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[var(--gb-surface)] border-y border-[var(--gb-border)]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SELL_STEPS.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                  <step.icon className="text-orange-500" size={26} />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--gb-text-secondary)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Simple, Transparent Pricing</h2>
          <p className="text-[var(--gb-text-secondary)] text-center mb-12 max-w-lg mx-auto">
            No commission. No hidden fees. Pay once, list for 30 days.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {LISTING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  tier.popular
                    ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/[0.08] to-transparent'
                    : 'border-[var(--gb-border)] bg-[var(--gb-surface)]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-xl mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    {tier.price !== 'Free' && (
                      <span className="text-[var(--gb-text-muted)] text-sm">{tier.duration}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--gb-text-secondary)]">
                      <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#create-listing"
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    tier.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-[var(--gb-dark)] border border-[var(--gb-border)] hover:border-orange-500/50'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-[var(--gb-surface)] border-y border-[var(--gb-border)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center mb-10">
            {[
              { icon: TrendingUp, value: '40K+', label: 'Monthly Visitors' },
              { icon: Users, value: '2,400+', label: 'Email Subscribers' },
              { icon: Star, value: '500+', label: 'Cars Listed' },
            ].map((stat) => (
              <div key={stat.label} className="p-5">
                <stat.icon className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--gb-text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Listing Form */}
      <section id="create-listing" className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Create Your Listing</h2>
          <p className="text-[var(--gb-text-secondary)] text-center mb-10">
            Fill this out and we&apos;ll feature your G-Body on the site within 24 hours.
          </p>

          {submitted ? (
            <div className="gb-card p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Listing Received!</h3>
              <p className="text-[var(--gb-text-secondary)] mb-6">
                We&apos;ll review your listing and get back to you within 24 hours. Check your email for confirmation.
              </p>
              <Link href="/listings" className="gb-btn gb-btn-primary">
                Browse Other Listings
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="gb-card p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">G-Body Model *</label>
                  <select
                    required
                    value={form.model}
                    onChange={e => setForm({ ...form, model: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Select model</option>
                    <option>Monte Carlo SS</option>
                    <option>Grand National / GNX</option>
                    <option>Cutlass Supreme / 442</option>
                    <option>Buick Regal / T-Type</option>
                    <option>El Camino SS</option>
                    <option>Chevy Malibu</option>
                    <option>Pontiac Grand Prix</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Year *</label>
                  <select
                    required
                    value={form.year}
                    onChange={e => setForm({ ...form, year: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Year</option>
                    {[...Array(11)].map((_, i) => (
                      <option key={i}>{1978 + i}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Asking Price *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gb-text-muted)]">$</span>
                    <input
                      type="number"
                      required
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      placeholder="25,000"
                      className="w-full pl-8 pr-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Location *</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="Houston, TX"
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Condition</label>
                <select
                  value={form.condition}
                  onChange={e => setForm({ ...form, condition: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select condition</option>
                  <option>Concours</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Project / In Progress</option>
                  <option>Parts Car</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Listing URL (eBay, BAT, Facebook, etc.) *</label>
                <input
                  type="url"
                  required
                  value={form.listingUrl}
                  onChange={e => setForm({ ...form, listingUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Tell buyers about your G-Body..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="John D."
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-base flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Listing <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-[var(--gb-text-muted)] mt-2">
                  No spam. No fees. We&apos;ll review your listing within 24 hours.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="py-16 bg-[var(--gb-surface)] border-t border-[var(--gb-border)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Are You a Dealer?</h2>
          <p className="text-[var(--gb-text-secondary)] mb-6">
            Get unlimited listings, a dealer profile, lead management, and analytics for $99/month.
          </p>
          <Link href="/dealer-program" className="gb-btn gb-btn-secondary">
            Dealer Program → <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder.</p>
        </div>
      </footer>
    </div>
  );
}
