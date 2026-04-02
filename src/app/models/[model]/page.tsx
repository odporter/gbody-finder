'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, TrendingUp, Wrench, Car, MapPin } from 'lucide-react';

const MODEL_DATA: Record<string, {
  name: string;
  years: string;
  hero: string;
  production: number;
  description: string;
  history: string;
  bestYears: string;
  topVariants: { name: string; premium: string; limited?: number }[];
  specs: { engine: string; power: string; weight: string; trans: string };
  priceRange: string;
  appreciation: number;
}> = {
  'monte-carlo': {
    name: 'Monte Carlo SS',
    years: '1978-1988',
    hero: '/images/cars/monte-carlo-ss.jpg',
    production: 116227,
    description: 'The Monte Carlo SS dominated NASCAR in the 1980s and became an icon of American muscle.',
    history: 'The fourth-generation Monte Carlo SS was introduced in 1983 as a high-performance version of Chevrolet\'s personal luxury car. Built on the G-Body platform, it featured a 305 V8 HO engine and aggressive styling. The Aerocoupe (1986-1988) added a louvered rear window for NASCAR homologation.',
    bestYears: '1986-1987 (fuel injection, best build quality)',
    topVariants: [
      { name: 'SS Aerocoupe', premium: '+$15-25K', limited: 6052 },
      { name: 'SS 1986-1987', premium: '+$5-8K' },
      { name: 'SS 1984-1985', premium: 'Base' },
    ],
    specs: { engine: '305 V8 HO', power: '180 HP / 245 LB-FT', weight: '3,480 lbs', trans: 'TH350 / 200-4R' },
    priceRange: '$12K - $55K',
    appreciation: 115,
  },
  'grand-national': {
    name: 'Grand National / GNX',
    years: '1982-1987',
    hero: '/images/cars/grand-national.jpg',
    production: 32535,
    description: 'The Buick Grand National was the fastest production car in America in 1987, outperforming Ferraris and Porsches.',
    history: 'Buick transformed the Regal into a turbocharged monster. The Grand National started as a slow 4.3L V6 but evolved into a 3.8L turbo that ran 13-second quarter miles. The GNX (1987 only) was the ultimate version with 547 built.',
    bestYears: '1986-1987 (intercooled turbo, best power)',
    topVariants: [
      { name: 'GNX (1987)', premium: '$150-250K', limited: 547 },
      { name: 'Grand National Turbo', premium: 'Base' },
      { name: 'T-Type (rare)', premium: '+$5-10K' },
    ],
    specs: { engine: '3.8L Turbo V6', power: '245 HP (GNX: 276 HP)', weight: '3,400 lbs', trans: 'TH200-4R' },
    priceRange: '$25K - $165K+',
    appreciation: 150,
  },
  'cutlass-supreme': {
    name: 'Cutlass Supreme / 442',
    years: '1978-1988',
    hero: '/images/cars/cutlass-442.jpg',
    production: 856000,
    description: 'The Cutlass Supreme was the best-selling G-Body, offering luxury and muscle in one package.',
    history: 'Oldsmobile\'s Cutlass Supreme combined luxury with performance. The 442 option added the W41 package with improved handling. The Hurst Olds (1983-1984) featured a unique shifter and performance upgrades.',
    bestYears: '1983-1984 (Hurst Olds), 1985-1987 (fuel injection)',
    topVariants: [
      { name: 'Hurst Olds (1983-84)', premium: '+$10-18K', limited: 3501 },
      { name: '442 W41', premium: '+$5-8K' },
      { name: 'Convertible (rare)', premium: '+$8-12K' },
    ],
    specs: { engine: '307/350 V8', power: '150-180 HP', weight: '3,400 lbs', trans: 'TH350 / 200-4R' },
    priceRange: '$8K - $45K',
    appreciation: 113,
  },
  'regal': {
    name: 'Buick Regal',
    years: '1978-1987',
    hero: '/images/cars/regal-t-type.jpg',
    production: 845000,
    description: 'The Regal offered luxury and turbo performance, with the T-Type leading the way before the Grand National.',
    history: 'The Buick Regal was the platform for the Grand National, but the T-Type offered turbo performance in a more subdued package. The Limited trim added luxury features.',
    bestYears: '1986-1987 (intercooled turbo available)',
    topVariants: [
      { name: 'T-Type Turbo', premium: '+$8-15K' },
      { name: 'Grand National (separate)', premium: 'See GN' },
      { name: 'Limited trim', premium: '+$2-4K' },
    ],
    specs: { engine: '3.8L Turbo / 307 V8', power: '150-200 HP', weight: '3,350 lbs', trans: 'TH200-4R' },
    priceRange: '$6K - $35K',
    appreciation: 133,
  },
  'el-camino': {
    name: 'El Camino',
    years: '1978-1987',
    hero: '/images/cars/el-camino.jpg',
    production: 514000,
    description: 'Half car, half truck, all muscle. The El Camino combined utility with performance.',
    history: 'The El Camino SS offered the same 305 V8 as the Monte Carlo SS but with a truck bed. The Conquista trim added luxury features. Later models (1985-87) got fuel injection.',
    bestYears: '1985-1987 (fuel injection)',
    topVariants: [
      { name: 'SS Conquista', premium: '+$5-8K' },
      { name: 'Royal trim', premium: '+$3-5K' },
      { name: 'SS 1983-1984', premium: 'Base' },
    ],
    specs: { engine: '305/350 V8', power: '150-190 HP', weight: '3,600 lbs', trans: 'TH350 / 200-4R' },
    priceRange: '$5K - $35K',
    appreciation: 136,
  },
  'malibu': {
    name: 'Chevy Malibu',
    years: '1978-1983',
    hero: '/images/cars/malibu.jpg',
    production: 1200000,
    description: 'The budget G-Body that\'s perfect for LS swaps and restomods.',
    history: 'The Malibu was Chevrolet\'s entry-level G-Body. Lighter and simpler than the Monte Carlo, it became a favorite for drag racers and LS swap builders.',
    bestYears: '1980-1983 (lighter weight)',
    topVariants: [
      { name: 'Classic trim', premium: '+$2-4K' },
      { name: 'Landau', premium: '+$1-2K' },
      { name: 'Wagon (rare)', premium: '+$3-5K' },
    ],
    specs: { engine: '267/305/350 V8', power: '105-170 HP', weight: '3,200 lbs', trans: 'TH250 / 350' },
    priceRange: '$4K - $25K',
    appreciation: 159,
  },
  'grand-prix': {
    name: 'Pontiac Grand Prix',
    years: '1978-1987',
    hero: '/images/cars/grand-prix.jpg',
    production: 650000,
    description: 'Pontiac\'s personal luxury car with available turbo power.',
    history: 'The Grand Prix offered Pontiac styling on the G-Body platform. The LJ and SJ trims added luxury, while the rare LJ Turbo offered performance.',
    bestYears: '1985-1987 (fuel injection)',
    topVariants: [
      { name: 'LJ Turbo (rare)', premium: '+$8-12K' },
      { name: 'SJ trim', premium: '+$3-5K' },
      { name: 'T-top cars', premium: '+$2-4K' },
    ],
    specs: { engine: '301/305/350 V8', power: '135-170 HP', weight: '3,450 lbs', trans: 'TH350 / 200-4R' },
    priceRange: '$4K - $28K',
    appreciation: 156,
  },
};

export async function generateMetadata({ params }: { params: { model: string } }) {
  const modelId = params?.model as string;
  const model = MODEL_DATA[modelId] || MODEL_DATA['monte-carlo'];
  return {
    title: `${model.name} (${model.years}) — Specs, History & Market Value | G-Body Finder`,
    description: `${model.description} Complete guide: specs, best years, collectible variants, price ranges, and appreciation data. ${model.name} from ${model.years}.`,
    openGraph: {
      title: `${model.name} | G-Body Finder`,
      description: model.description,
    },
  };
}

export default function ModelPage() {
  const params = useParams();
  const modelId = params?.model as string || 'monte-carlo';
  const model = MODEL_DATA[modelId] || MODEL_DATA['monte-carlo'];

  const [startYear, endYear] = model.years.split('-').map(Number);

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": model.name,
    "manufacturer": {
      "@type": "Organization",
      "name": modelId === 'grand-national' || modelId === 'regal' ? 'Buick' :
              modelId === 'cutlass-supreme' ? 'Oldsmobile' :
              modelId === 'grand-prix' ? 'Pontiac' :
              modelId === 'el-camino' ? 'Chevrolet' :
              modelId === 'malibu' ? 'Chevrolet' : 'Chevrolet',
    },
    "productionDate": `${startYear}-${endYear}`,
    "vehicleModelDate": `${startYear}`,
    "bodyType": "Coupe",
    "vehicleConfiguration": "Front-engine, rear-wheel-drive, 2-door coupe",
    "numberProduced": model.production,
    "description": model.description,
    "keywords": `${model.name}, G-Body, classic car, muscle car, ${model.years}`,
  };

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
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
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={model.hero} alt={model.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[var(--gb-dark)]" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-4 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-full">{model.years}</span>
            <span className="px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full">{model.production.toLocaleString()} built</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{model.name}</h1>
          <p className="text-lg md:text-xl text-[var(--gb-text-secondary)] max-w-2xl mb-6">{model.description}</p>
        </div>
      </section>

      {/* Model Tabs */}
      <div className="border-b border-[var(--gb-border)] bg-[var(--gb-surface)]/95 backdrop-blur sticky top-[52px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-1">
            {Object.entries(MODEL_DATA).map(([key, cfg]) => (
              <Link
                key={key}
                href={`/models/${key}`}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  modelId === key
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-[var(--gb-text-secondary)] hover:text-white'
                }`}
              >
                {cfg.name.split(' / ')[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="gb-card p-6 text-center">
            <div className="text-sm text-[var(--gb-text-muted)] mb-1">Price Range</div>
            <div className="text-2xl font-bold text-orange-500">{model.priceRange}</div>
          </div>
          <div className="gb-card p-6 text-center">
            <div className="text-sm text-[var(--gb-text-muted)] mb-1">5-Year Return</div>
            <div className="text-2xl font-bold text-green-400">+{model.appreciation}%</div>
          </div>
          <div className="gb-card p-6 text-center">
            <div className="text-sm text-[var(--gb-text-muted)] mb-1">Production</div>
            <div className="text-2xl font-bold">{model.production.toLocaleString()}</div>
          </div>
          <div className="gb-card p-6 text-center">
            <div className="text-sm text-[var(--gb-text-muted)] mb-1">Best Variant</div>
            <div className="text-2xl font-bold">{model.topVariants[0].name}</div>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* History */}
          <div className="gb-card p-6">
            <h2 className="text-2xl font-bold mb-4">History & Overview</h2>
            <p className="text-[var(--gb-text-secondary)] leading-relaxed">{model.history}</p>
          </div>
          
          {/* Specs */}
          <div className="gb-card p-6">
            <h2 className="text-2xl font-bold mb-4">Specs</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[var(--gb-text-muted)]">Engine</span>
                <span className="font-medium">{model.specs.engine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gb-text-muted)]">Power</span>
                <span className="font-medium">{model.specs.power}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gb-text-muted)]">Weight</span>
                <span className="font-medium">{model.specs.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gb-text-muted)]">Transmission</span>
                <span className="font-medium">{model.specs.trans}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Best Years */}
        <div className="gb-card p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Best Years to Buy</h2>
            <p className="text-xl text-[var(--gb-text-secondary)]">{model.bestYears}</p>
        </div>

        {/* Top Variants */}
        <div className="gb-card p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Most Collectible Variants</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {model.topVariants.map((variant, i) => (
              <div key={i} className="p-4 bg-[var(--gb-dark)] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{variant.name}</h3>
                <p className="text-orange-500 font-semibold">{variant.premium}</p>
                {variant.limited && (
                  <p className="text-sm text-[var(--gb-text-muted)] mt-1">Only {variant.limited.toLocaleString()} built</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Find Listings */}
        <div className="gb-card p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Find {model.name}s For Sale</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href={`https://bringatrailer.com/search/?q=${encodeURIComponent(model.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--gb-dark)] rounded-xl hover:border-orange-500 border border-[var(--gb-border)] transition-colors group"
            >
              <h3 className="font-bold group-hover:text-orange-400">Bring a Trailer</h3>
              <p className="text-sm text-[var(--gb-text-muted)] mt-1">Auctions</p>
            </a>
            <a
              href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(model.name + ' ' + model.years)}&_sop=15`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--gb-dark)] rounded-xl hover:border-orange-500 border border-[var(--gb-border)] transition-colors group"
            >
              <h3 className="font-bold group-hover:text-orange-400">eBay Motors</h3>
              <p className="text-sm text-[var(--gb-text-muted)] mt-1">Marketplace</p>
            </a>
            <a
              href={`https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(model.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--gb-dark)] rounded-xl hover:border-orange-500 border border-[var(--gb-border)] transition-colors group"
            >
              <h3 className="font-bold group-hover:text-orange-400">Facebook</h3>
              <p className="text-sm text-[var(--gb-text-muted)] mt-1">Local listings</p>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/market" className="gb-btn gb-btn-primary text-lg">
            View Full Market Tracker
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}