'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Gauge, Cog, TrendingUp, DollarSign, Zap, Settings } from 'lucide-react';

const ENGINE_OPTIONS = [
  {
    id: 'ls3',
    name: 'LS3 6.2L',
    hp: '430-500',
    hpRange: [430, 500],
    torque: '425-470',
    torqueRange: [425, 470],
    cost: [8000, 15000],
    boost: 'N/A',
    popular: true,
    description: 'The go-to swap for G-Body. 430HP stock, 500HP with cam and headers.',
  },
  {
    id: 'ls1',
    name: 'LS1 5.7L',
    hp: '305-350',
    hpRange: [305, 350],
    torque: '300-350',
    torqueRange: [300, 350],
    cost: [4000, 8000],
    boost: 'N/A',
    popular: false,
    description: 'Budget-friendly LS swap. Great for daily drivers.',
  },
  {
    id: 'ls7',
    name: 'LS7 7.0L',
    hp: '505-580',
    hpRange: [505, 580],
    torque: '470-540',
    torqueRange: [470, 540],
    cost: [15000, 25000],
    boost: 'N/A',
    popular: false,
    description: 'The ultimate naturally aspirated LS. 505HP Z06 motor.',
  },
  {
    id: '350-sbc',
    name: '350 Small Block',
    hp: '300-400',
    hpRange: [300, 400],
    torque: '350-420',
    torqueRange: [350, 420],
    cost: [3000, 7000],
    boost: 'N/A',
    popular: true,
    description: 'Classic SBC. Cheap, reliable, endless parts availability.',
  },
  {
    id: '383-stroker',
    name: '383 Stroker',
    hp: '400-500',
    hpRange: [400, 500],
    torque: '420-500',
    torqueRange: [420, 500],
    cost: [5000, 12000],
    boost: 'N/A',
    popular: false,
    description: '383ci stroker from 350 block. Great torque for street.',
  },
  {
    id: 'ls-turbo',
    name: 'LS Turbo',
    hp: '600-1000+',
    hpRange: [600, 1000],
    torque: '550-900+',
    torqueRange: [550, 900],
    cost: [12000, 30000],
    boost: '15-30 PSI',
    popular: true,
    description: 'Turbocharged LS. 600HP on pump gas, 1000+ on E85.',
  },
  {
    id: 'buick-turbo',
    name: 'Buick Turbo (GN)',
    hp: '300-600+',
    hpRange: [300, 600],
    torque: '400-600+',
    torqueRange: [400, 600],
    cost: [3000, 15000],
    boost: '15-25 PSI',
    popular: false,
    description: '3.8L Turbo V6. The Grand National engine. 300HP stock, 600+ modified.',
  },
  {
    id: '454-bigblock',
    name: '454 Big Block',
    hp: '450-600',
    hpRange: [450, 600],
    torque: '500-650',
    torqueRange: [500, 650],
    cost: [6000, 15000],
    boost: 'N/A',
    popular: false,
    description: 'Big block Chevrolet. Maximum torque, classic muscle.',
  },
];

const TRANSMISSION_OPTIONS = [
  { id: 'th350', name: 'TH350', cost: [800, 1500], description: '2-speed auto, bulletproof' },
  { id: 'th400', name: 'TH400', cost: [1000, 2000], description: '3-speed auto, handles big power' },
  { id: '700r4', name: '700R4', cost: [1200, 2500], description: '4-speed auto, overdrive for highway' },
  { id: '4l60e', name: '4L60E', cost: [1500, 3000], description: 'Electronic 4-speed, LS-compatible' },
  { id: '4l80e', name: '4L80E', cost: [2000, 4000], description: 'Heavy-duty 4-speed, 1000+ HP' },
  { id: 't56', name: 'T56 6-Speed', cost: [2500, 5000], description: '6-speed manual, fun factor' },
];

const REAR_END_OPTIONS = [
  { id: '2.73', name: '2.73:1', cost: [0, 500], description: 'Highway gear, best MPG' },
  { id: '3.08', name: '3.08:1', cost: [0, 500], description: 'Stock G-Body ratio' },
  { id: '3.42', name: '3.42:1', cost: [200, 600], description: 'Street/strip balance' },
  { id: '3.73', name: '3.73:1', cost: [300, 700], description: 'Quick acceleration' },
  { id: '4.10', name: '4.10:1', cost: [400, 800], description: 'Drag racing' },
  { id: '4.56', name: '4.56:1', cost: [500, 1000], description: 'Track only' },
];

export default function BuildCalculatorPage() {
  const [selectedEngine, setSelectedEngine] = useState(ENGINE_OPTIONS[0]);
  const [selectedTrans, setSelectedTrans] = useState(TRANSMISSION_OPTIONS[2]);
  const [selectedRear, setSelectedRear] = useState(REAR_END_OPTIONS[2]);
  
  const totalCostLow = selectedEngine.cost[0] + selectedTrans.cost[0] + selectedRear.cost[0];
  const totalCostHigh = selectedEngine.cost[1] + selectedTrans.cost[1] + selectedRear.cost[1];

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
            <Link href="/build-calculator" className="px-3 py-2 text-sm font-medium text-orange-500">Build Calc</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Calculator className="mx-auto mb-4 text-orange-500" size={48} />
          <h1 className="text-4xl font-bold mb-4">Build Calculator</h1>
          <p className="text-[var(--gb-text-secondary)] text-lg max-w-2xl mx-auto">
            Estimate horsepower, torque, and cost for your G-Body build. Select your engine, transmission, and rear end.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Engine Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-orange-500" size={20} />
              Select Engine
            </h2>
            <div className="space-y-3">
              {ENGINE_OPTIONS.map((engine) => (
                <button
                  key={engine.id}
                  onClick={() => setSelectedEngine(engine)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedEngine.id === engine.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-[var(--gb-border)] bg-[var(--gb-surface)] hover:border-orange-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">{engine.name}</span>
                    {engine.popular && (
                      <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">POPULAR</span>
                    )}
                  </div>
                  <div className="text-sm text-[var(--gb-text-secondary)]">
                    {engine.hp} HP • {engine.torque} LB-FT
                  </div>
                  <div className="text-sm text-orange-500 mt-1">
                    ${engine.cost[0].toLocaleString()} - ${engine.cost[1].toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Transmission Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Cog className="text-orange-500" size={20} />
              Select Transmission
            </h2>
            <div className="space-y-3">
              {TRANSMISSION_OPTIONS.map((trans) => (
                <button
                  key={trans.id}
                  onClick={() => setSelectedTrans(trans)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedTrans.id === trans.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-[var(--gb-border)] bg-[var(--gb-surface)] hover:border-orange-500/50'
                  }`}
                >
                  <div className="font-bold mb-1">{trans.name}</div>
                  <div className="text-sm text-[var(--gb-text-secondary)]">{trans.description}</div>
                  <div className="text-sm text-orange-500 mt-1">
                    ${trans.cost[0].toLocaleString()} - ${trans.cost[1].toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rear End Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Gauge className="text-orange-500" size={20} />
              Select Rear End
            </h2>
            <div className="space-y-3">
              {REAR_END_OPTIONS.map((rear) => (
                <button
                  key={rear.id}
                  onClick={() => setSelectedRear(rear)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedRear.id === rear.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-[var(--gb-border)] bg-[var(--gb-surface)] hover:border-orange-500/50'
                  }`}
                >
                  <div className="font-bold mb-1">{rear.name}</div>
                  <div className="text-sm text-[var(--gb-text-secondary)]">{rear.description}</div>
                  <div className="text-sm text-orange-500 mt-1">
                    ${rear.cost[0].toLocaleString()} - ${rear.cost[1].toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-12 gb-card p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Build</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-xl">
              <Zap className="mx-auto mb-3 text-orange-500" size={32} />
              <div className="text-sm text-[var(--gb-text-muted)] mb-2">Horsepower</div>
              <div className="text-4xl font-bold">{selectedEngine.hpRange[0]} - {selectedEngine.hpRange[1]}</div>
              <div className="text-sm text-[var(--gb-text-muted)] mt-1">HP</div>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-xl">
              <Gauge className="mx-auto mb-3 text-orange-500" size={32} />
              <div className="text-sm text-[var(--gb-text-muted)] mb-2">Torque</div>
              <div className="text-4xl font-bold">{selectedEngine.torqueRange[0]} - {selectedEngine.torqueRange[1]}</div>
              <div className="text-sm text-[var(--gb-text-muted)] mt-1">LB-FT</div>
            </div>
            <div className="text-center p-6 bg-[var(--gb-dark)] rounded-xl">
              <DollarSign className="mx-auto mb-3 text-orange-500" size={32} />
              <div className="text-sm text-[var(--gb-text-muted)] mb-2">Estimated Cost</div>
              <div className="text-4xl font-bold text-orange-500">
                ${totalCostLow.toLocaleString()} - ${totalCostHigh.toLocaleString()}
              </div>
              <div className="text-sm text-[var(--gb-text-muted)] mt-1">Engine + Trans + Rear</div>
            </div>
          </div>

          <div className="text-center text-[var(--gb-text-secondary)] text-sm">
            <p>Costs are estimates for parts only. Labor, fabrication, and accessories not included.</p>
            <p className="mt-2">HP/torque ranges based on common builds. Your results may vary.</p>
          </div>
        </div>

        {/* Build Notes */}
        <div className="mt-8 gb-card p-6">
          <h3 className="font-bold text-lg mb-4">{selectedEngine.name} Notes</h3>
          <p className="text-[var(--gb-text-secondary)]">{selectedEngine.description}</p>
          {selectedEngine.boost !== 'N/A' && (
            <p className="text-orange-500 mt-2 font-medium">Boost: {selectedEngine.boost}</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/parts" className="gb-btn gb-btn-primary text-lg">
            Shop Parts
          </Link>
          <Link href="/listings" className="gb-btn gb-btn-secondary text-lg">
            Find a G-Body
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. Build estimates are for reference only.</p>
        </div>
      </footer>
    </div>
  );
}