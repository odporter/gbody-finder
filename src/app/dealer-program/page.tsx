'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Users, BarChart3, Zap, Star, Shield, Phone, Mail } from 'lucide-react';

export const metadata = {
  title: 'G-Body Dealer Program | List Unlimited Cars for $99/month',
  description: 'The only dedicated G-Body dealer platform. Reach 40,000+ monthly enthusiasts. Unlimited listings, analytics, lead management. $99/month. Apply today.',
};

const DEALER_FEATURES = [
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Track views, clicks, and leads for every listing. Know what sells.',
  },
  {
    icon: Users,
    title: '40K+ Monthly Visitors',
    desc: 'Get your inventory in front of the most engaged G-Body audience online.',
  },
  {
    icon: Zap,
    title: 'Instant Listings',
    desc: 'Upload inventory directly. No forms, no waiting for approval.',
  },
  {
    icon: Shield,
    title: 'Verified Dealer Badge',
    desc: 'Build trust with buyers. Display your dealer badge on all listings.',
  },
];

const PRICING_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$99',
    period: '/month',
    note: 'Cancel anytime',
    features: [
      'Unlimited listings',
      'Dealer profile page',
      'Analytics dashboard',
      'Lead management',
      'Email support',
      'Verified dealer badge',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '$79',
    period: '/month',
    note: 'Save $240/year — billed annually',
    features: [
      'Everything in Monthly',
      'Priority support',
      'Featured dealer placement',
      'Early access to new features',
    ],
    popular: true,
  },
];

export default function DealerProgramPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    inventory: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
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
            <img src="/logo.svg" alt="G-Body Finder" className="h-10 w-10" />
            <div>
              <span className="text-lg font-black chrome-text">G-BODY</span>
              <span className="text-white text-sm font-light ml-1">FINDER</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/listings" className="text-[var(--gb-text-secondary)] hover:text-white text-sm">Listings</Link>
            <Link href="/market" className="text-[var(--gb-text-secondary)] hover:text-white text-sm">Market</Link>
            <Link href="/parts" className="text-[var(--gb-text-secondary)] hover:text-white text-sm">Parts</Link>
            <Link href="/sell" className="text-orange-500 font-semibold text-sm">Sell</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-orange-900/20" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Star size={12} />
            Dealer Program
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Move Your G-Body Inventory <span className="chrome-orange">Faster</span>
          </h1>
          <p className="text-[var(--gb-text-secondary)] text-lg mb-8 max-w-xl mx-auto">
            The only dedicated G-Body dealer platform. Reach 40,000+ monthly enthusiasts actively looking to buy.
          </p>
          <a href="#apply" className="gb-btn gb-btn-primary text-base px-8 py-4">
            Apply for Dealer Access <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--gb-surface)] border-y border-[var(--gb-border)]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '40K+', label: 'Monthly Visitors' },
              { value: '2,400+', label: 'Email Subscribers' },
              { value: '$2.1M', label: 'Cars Sold via Site' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--gb-text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Everything You Need to Sell More</h2>
          <p className="text-[var(--gb-text-secondary)] text-center mb-12 max-w-lg mx-auto">
            Built specifically for G-Body dealers and specialty rebuilders.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {DEALER_FEATURES.map((feat, i) => (
              <div key={i} className="gb-card p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <feat.icon className="text-orange-500" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{feat.title}</h3>
                  <p className="text-sm text-[var(--gb-text-secondary)] leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[var(--gb-surface)] border-y border-[var(--gb-border)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Simple Pricing</h2>
          <p className="text-[var(--gb-text-secondary)] text-center mb-10">
            No listing fees. No commission. Just one monthly price.
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 ${
                  plan.popular
                    ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/[0.08] to-transparent'
                    : 'border-[var(--gb-border)] bg-[var(--gb-dark)]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">Best Value</span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-[var(--gb-text-muted)] text-sm">{plan.period}</span>
                  </div>
                  <p className="text-xs text-[var(--gb-text-muted)] mt-1">{plan.note}</p>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--gb-text-secondary)]">
                      <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-[var(--gb-surface)] border border-[var(--gb-border)] hover:border-orange-500/50'
                  }`}
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section id="apply" className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Apply for Dealer Access</h2>
          <p className="text-[var(--gb-text-secondary)] text-center mb-10">
            Tell us about your dealership. We review applications within 48 hours.
          </p>

          {submitted ? (
            <div className="gb-card p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
              <p className="text-[var(--gb-text-secondary)] mb-6">
                We&apos;ll review your application and get back to you within 48 hours.
              </p>
              <Link href="/" className="gb-btn gb-btn-primary">
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="gb-card p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Website</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={e => setForm({ ...form, website: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Current G-Body Inventory</label>
                <select
                  value={form.inventory}
                  onChange={e => setForm({ ...form, inventory: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select range</option>
                  <option>1-5 cars</option>
                  <option>6-20 cars</option>
                  <option>21-50 cars</option>
                  <option>50+ cars</option>
                  <option>None yet — applying to start selling</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[var(--gb-text-muted)] block mb-1.5">Tell us about your business</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="What types of G-Bodies do you specialize in? What makes your dealership unique?"
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

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
                    Submit Application <ArrowRight size={16} />
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-[var(--gb-text-muted)]">
                We review every application manually. No spam, no automated approvals.
              </p>
            </form>
          )}
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
