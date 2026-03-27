'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname?.() || '';
  
  return (
    <header className="bg-[var(--gb-surface)]/95 backdrop-blur border-b border-[var(--gb-border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.svg" 
            alt="G-Body Finder" 
            className="h-10 w-10 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg font-black chrome-text leading-tight">G-BODY</span>
            <span className="text-xs text-[var(--gb-text-muted)] leading-tight">FINDER</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1 md:gap-6">
          <Link 
            href="/listings" 
            className={`px-3 py-2 text-sm font-medium transition-colors ${pathname.includes('/listings') ? 'text-orange-500' : 'text-[var(--gb-text-secondary)] hover:text-white'}`}
          >
            Listings
          </Link>
          <Link 
            href="/market" 
            className={`px-3 py-2 text-sm font-medium transition-colors ${pathname.includes('/market') ? 'text-orange-500' : 'text-[var(--gb-text-secondary)] hover:text-white'}`}
          >
            Market
          </Link>
          <Link 
            href="/parts" 
            className={`px-3 py-2 text-sm font-medium transition-colors ${pathname.includes('/parts') ? 'text-orange-500' : 'text-[var(--gb-text-secondary)] hover:text-white'}`}
          >
            Parts
          </Link>
          <Link 
            href="/build-calculator" 
            className={`px-3 py-2 text-sm font-medium transition-colors hidden md:block ${pathname.includes('/build') ? 'text-orange-500' : 'text-[var(--gb-text-secondary)] hover:text-white'}`}
          >
            Build Calc
          </Link>
        </nav>
      </div>
    </header>
  );
}