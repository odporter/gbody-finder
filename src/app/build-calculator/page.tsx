'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gauge, Cog, DollarSign, Zap, Save, Trash2, CheckCircle } from 'lucide-react';

const ENGINE_OPTIONS = [
  {
    id: 'ls3', name: 'LS3 6.2L', hp: '430-500', hpRange: [430, 500],
    torque: '425-470', torqueRange: [425, 470],
    cost: [8000, 15000], boost: 'N/A', popular: true,
    description: 'The go-to swap for G-Body. 430HP stock, 500HP with cam and headers.',
  },
  {
    id: 'ls1', name: 'LS1 5.7L', hp: '305-350', hpRange: [305, 350],
    torque: '300-350', torqueRange: [300, 350],
    cost: [4000, 8000], boost: 'N/A', popular: false,
    description: 'Budget-friendly LS swap. Great for daily drivers.',
  },
  {
    id: 'ls7', name: 'LS7 7.0L', hp: '505-580', hpRange: [505, 580],
    torque: '470-540', torqueRange: [470, 540],
    cost: [15000, 25000], boost: 'N/A', popular: false,
    description: 'The ultimate naturally aspirated LS. 505HP Z06 motor.',
  },
  {
    id: '350-sbc', name: '350 Small Block', hp: '300-400', hpRange: [300, 400],
    torque: '350-420', torqueRange: [350, 420],
    cost: [3000, 7000], boost: 'N/A', popular: true,
    description: 'Classic SBC. Cheap, reliable, endless parts availability.',
  },
  {
    id: '383-stroker', name: '383 Stroker', hp: '400-500', hpRange: [400, 500],
    torque: '420-500', torqueRange: [420, 500],
    cost: [5000, 12000], boost: 'N/A', popular: false,
    description: '383ci stroker from 350 block. Great torque for street.',
  },
  {
    id: 'ls-turbo', name: 'LS Turbo', hp: '600-1000+', hpRange: [600, 1000],
    torque: '550-900+', torqueRange: [550, 900],
    cost: [12000, 30000], boost: '15-30 PSI', popular: true,
    description: 'Turbocharged LS. 600HP on pump gas, 1000+ on E85.',
  },
  {
    id: 'buick-turbo', name: 'Buick Turbo (GN)', hp: '300-600+', hpRange: [300, 600],
    torque: '400-600+', torqueRange: [400, 600],
    cost: [3000, 15000], boost: '15-25 PSI', popular: false,
    description: '3.8L Turbo V6. Grand National engine. 300HP stock, 600+ modified.',
  },
  {
    id: '454-bigblock', name: '454 Big Block', hp: '450-600', hpRange: [450, 600],
    torque: '500-650', torqueRange: [500, 650],
    cost: [6000, 15000], boost: 'N/A', popular: false,
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

interface SavedBuild {
  id: string;
  name: string;
  engineId: string;
  transId: string;
  rearId: string;
  createdAt: number;
  cost: [number, number];
  hp: [number, number];
  torque: [number, number];
}

export default function BuildCalculatorPage() {
  const [selectedEngine, setSelectedEngine] = useState(ENGINE_OPTIONS[0]);
  const [selectedTrans, setSelectedTrans] = useState(TRANSMISSION_OPTIONS[2]);
  const [selectedRear, setSelectedRear] = useState(REAR_END_OPTIONS[2]);
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('gbf-builds') || '[]'); }
    catch { return []; }
  });
  const [buildName, setBuildName] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [activeSection, setActiveSection] = useState<'engine' | 'trans' | 'rear'>('engine');

  const totalCostLow = selectedEngine.cost[0] + selectedTrans.cost[0] + selectedRear.cost[0];
  const totalCostHigh = selectedEngine.cost[1] + selectedTrans.cost[1] + selectedRear.cost[1];

  const saveBuild = () => {
    const name = buildName.trim() || `${selectedEngine.name} Build`;
    const build: SavedBuild = {
      id: `build-${Date.now()}`,
      name,
      engineId: selectedEngine.id,
      transId: selectedTrans.id,
      rearId: selectedRear.id,
      createdAt: Date.now(),
      cost: [totalCostLow, totalCostHigh],
      hp: [selectedEngine.hpRange[0], selectedEngine.hpRange[1]],
      torque: [selectedEngine.torqueRange[0], selectedEngine.torqueRange[1]],
    };
    const updated = [build, ...savedBuilds].slice(0, 10); // max 10 builds
    setSavedBuilds(updated);
    setBuildName('');
    try { localStorage.setItem('gbf-builds', JSON.stringify(updated)); } catch {}
    setSavedMessage('Build saved!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  const loadBuild = (build: SavedBuild) => {
    const engine = ENGINE_OPTIONS.find(e => e.id === build.engineId) || ENGINE_OPTIONS[0];
    const trans = TRANSMISSION_OPTIONS.find(t => t.id === build.transId) || TRANSMISSION_OPTIONS[0];
    const rear = REAR_END_OPTIONS.find(r => r.id === build.rearId) || REAR_END_OPTIONS[0];
    setSelectedEngine(engine);
    setSelectedTrans(trans);
    setSelectedRear(rear);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteBuild = (id: string) => {
    const updated = savedBuilds.filter(b => b.id !== id);
    setSavedBuilds(updated);
    try { localStorage.setItem('gbf-builds', JSON.stringify(updated)); } catch {}
  };

  return (
    <div className="min-h-screen bg-[var(--gb-dark)]">
      {/* Header */}
      <header className="bg-[var(--gb-surface)]/95 backdrop-blur border-b border-[var(--gb-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-9 w-9" />
            <div className="flex flex-col">
              <span className="text-base font-black chrome-text leading-tight">G-BODY</span>
              <span className="text-[10px] text-[var(--gb-text-muted)] leading-tight">FINDER</span>
            </div>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/listings" className="text-[var(--gb-text-secondary)] hover:text-white">Listings</Link>
            <Link href="/market" className="text-[var(--gb-text-secondary)] hover:text-white">Market</Link>
            <Link href="/parts" className="text-[var(--gb-text-secondary)] hover:text-white">Parts</Link>
            <Link href="/build-calculator" className="text-orange-500 font-semibold">Build Calc</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Cog size={12} />
            Engine Build Estimator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Build Calculator</h1>
          <p className="text-[var(--gb-text-secondary)] text-sm max-w-lg mx-auto">
            Pick your engine, transmission, and rear end. Get HP estimates and cost projections instantly.
          </p>
        </div>

        {/* Saved Builds (if any) */}
        {savedBuilds.length > 0 && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[var(--gb-text-muted)] uppercase tracking-wider">Saved Builds</h2>
              <div className="flex gap-2 flex-wrap">
                {savedBuilds.map((build) => (
                  <div key={build.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--gb-surface)] border border-[var(--gb-border)] rounded-lg text-xs group">
                    <button
                      onClick={() => loadBuild(build)}
                      className="text-white hover:text-orange-400 font-medium transition-colors"
                    >
                      {build.name}
                    </button>
                    <span className="text-[var(--gb-text-muted)]">
                      ${build.cost[0].toLocaleString()}
                    </span>
                    <button
                      onClick={() => deleteBuild(build.id)}
                      className="text-[var(--gb-text-muted)] hover:text-red-400 transition-colors ml-1"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile section tabs */}
        <div className="flex gap-1 mb-6 md:hidden">
          {(['engine', 'trans', 'rear'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSection === sec ? 'bg-orange-500 text-white' : 'bg-[var(--gb-surface)] text-[var(--gb-text-secondary)]'
              }`}
            >
              {sec === 'engine' ? 'Engine' : sec === 'trans' ? 'Trans' : 'Rear End'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Engine Selection */}
          <div className={`space-y-3 ${activeSection !== 'engine' ? 'hidden md:block' : ''}`}>
            <h2 className="text-sm font-bold text-[var(--gb-text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap size={14} className="text-orange-500" />
              Select Engine
            </h2>
            {ENGINE_OPTIONS.map((engine) => (
              <button
                key={engine.id}
                onClick={() => { setSelectedEngine(engine); setActiveSection('trans'); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedEngine.id === engine.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-[var(--gb-border)] bg-[var(--gb-surface)] hover:border-orange-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{engine.name}</span>
                  {engine.popular && (
                    <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[9px] font-bold rounded uppercase">Pop</span>
                  )}
                </div>
                <div className="text-xs text-[var(--gb-text-secondary)]">
                  {engine.hp} HP · {engine.torque} lb-ft
                </div>
                <div className="text-xs text-orange-400 mt-1">
                  ${engine.cost[0].toLocaleString()} - ${engine.cost[1].toLocaleString()}
                </div>
              </button>
            ))}
          </div>

          {/* Transmission Selection */}
          <div className={`space-y-3 ${activeSection !== 'trans' ? 'hidden md:block' : ''}`}>
            <h2 className="text-sm font-bold text-[var(--gb-text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Cog size={14} className="text-orange-500" />
              Transmission
            </h2>
            {TRANSMISSION_OPTIONS.map((trans) => (
              <button
                key={trans.id}
                onClick={() => { setSelectedTrans(trans); setActiveSection('rear'); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedTrans.id === trans.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-[var(--gb-border)] bg-[var(--gb-surface)] hover:border-orange-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{trans.name}</span>
                </div>
                <div className="text-xs text-[var(--gb-text-secondary)] mb-1">{trans.description}</div>
                <div className="text-xs text-orange-400">
                  ${trans.cost[0].toLocaleString()} - ${trans.cost[1].toLocaleString()}
                </div>
              </button>
            ))}
          </div>

          {/* Rear End Selection */}
          <div className={`space-y-3 ${activeSection !== 'rear' ? 'hidden md:block' : ''}`}>
            <h2 className="text-sm font-bold text-[var(--gb-text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Gauge size={14} className="text-orange-500" />
              Rear End
            </h2>
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
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{rear.name}</span>
                </div>
                <div className="text-xs text-[var(--gb-text-secondary)] mb-1">{rear.description}</div>
                <div className="text-xs text-orange-400">
                  ${rear.cost[0].toLocaleString()} - ${rear.cost[1].toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Panel */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="gb-card p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Build Summary</h2>

            {/* Build spec pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { label: 'Engine', value: selectedEngine.name },
                { label: 'Transmission', value: selectedTrans.name },
                { label: 'Rear End', value: selectedRear.name },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2 bg-[var(--gb-dark)] rounded-full border border-[var(--gb-border)]">
                  <span className="text-xs text-[var(--gb-text-muted)]">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-5 bg-[var(--gb-dark)] rounded-xl">
                <Zap className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-sm text-[var(--gb-text-muted)] mb-1">Horsepower</div>
                <div className="text-3xl font-bold">
                  {selectedEngine.hpRange[0]}–{selectedEngine.hpRange[1]}
                </div>
                <div className="text-xs text-[var(--gb-text-muted)] mt-1">HP</div>
              </div>
              <div className="text-center p-5 bg-[var(--gb-dark)] rounded-xl">
                <Gauge className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-sm text-[var(--gb-text-muted)] mb-1">Torque</div>
                <div className="text-3xl font-bold">
                  {selectedEngine.torqueRange[0]}–{selectedEngine.torqueRange[1]}
                </div>
                <div className="text-xs text-[var(--gb-text-muted)] mt-1">LB-FT</div>
              </div>
              <div className="text-center p-5 bg-[var(--gb-dark)] rounded-xl">
                <DollarSign className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-sm text-[var(--gb-text-muted)] mb-1">Est. Cost</div>
                <div className="text-3xl font-bold text-orange-400">
                  ${totalCostLow.toLocaleString()}
                </div>
                <div className="text-xs text-[var(--gb-text-muted)] mt-1">
                  – ${totalCostHigh.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Build Notes */}
            <div className="mb-6 p-4 bg-[var(--gb-dark)] rounded-xl">
              <h3 className="font-semibold mb-1.5 text-sm">{selectedEngine.name}</h3>
              <p className="text-xs text-[var(--gb-text-secondary)] leading-relaxed">
                {selectedEngine.description}
              </p>
              {selectedEngine.boost !== 'N/A' && (
                <p className="text-xs text-orange-400 font-medium mt-2">
                  ⚡ Boost: {selectedEngine.boost}
                </p>
              )}
            </div>

            {/* Save Build */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="text"
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                placeholder="Name this build (e.g., &quot;Daily Driver&quot;)..."
                className="flex-1 px-4 py-3 bg-[var(--gb-dark)] border border-[var(--gb-border)] rounded-xl text-sm text-white placeholder-[var(--gb-text-muted)]"
              />
              <button
                onClick={saveBuild}
                className="gb-btn gb-btn-primary py-3"
              >
                {savedMessage ? <CheckCircle size={16} /> : <Save size={16} />}
                {savedMessage || 'Save Build'}
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-center text-[var(--gb-text-muted)]">
              Costs are estimates for parts only. Labor, fabrication, wiring, cooling, and accessories not included.
              HP/torque ranges based on commonly reported builds — results vary.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 text-center flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/parts" className="gb-btn gb-btn-primary text-sm">
            Shop Parts for This Build
          </Link>
          <Link href="/listings" className="gb-btn gb-btn-secondary text-sm">
            Find a G-Body Project
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gb-surface)] border-t border-[var(--gb-border)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[var(--gb-text-muted)]">
          <p>© 2026 G-Body Finder. Build estimates are for reference only.</p>
        </div>
      </footer>
    </div>
  );
}
