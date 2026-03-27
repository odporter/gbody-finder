import { NextRequest, NextResponse } from 'next/server';

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
}

// Mike's Montes parts with realistic placeholder images by category
const MIKES_MONTES_PARTS: Part[] = [
  // Front End Body Parts
  {
    id: 'mm-front-bumper',
    name: 'Monte Carlo SS New Front Bumper Nose',
    price: 769.00,
    category: 'Front End',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS 1983-1988'],
    inStock: true,
    freeShipping: false,
  },
  {
    id: 'mm-inner-fender',
    name: 'Monte Carlo Inner Fender (Pair)',
    price: 299.00,
    category: 'Front End',
    image: 'https://images.unsplash.com/photo-1486262715612-cb603c959fd1?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS 1983-1988'],
    inStock: true,
    freeShipping: false,
  },
  {
    id: 'mm-hood-latch',
    name: 'Black Hood Latch Safety Catch',
    price: 49.99,
    category: 'Front End',
    image: 'https://images.unsplash.com/photo-1558573667-eb5e5f8c7d5d?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['All G-Body'],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 'mm-headlight-covers',
    name: 'Smoked Headlight Covers for Monte Carlo SS',
    price: 89.99,
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS 1983-1988'],
    inStock: true,
    freeShipping: false,
  },
  
  // Weatherstrip & Seals
  {
    id: 'mm-weatherstrip-9pc',
    name: 'Monte Carlo SS 9pc Door and Trunk Weatherstrip Seal Kit',
    price: 199.99,
    category: 'Seals & Weatherstrip',
    image: 'https://images.unsplash.com/photo-1558346174-56a66552b09a?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS 1983-1988'],
    inStock: true,
    freeShipping: false,
  },
  {
    id: 'mm-door-seals',
    name: 'Door Seals Weatherstrip',
    price: 54.99,
    category: 'Seals & Weatherstrip',
    image: 'https://images.unsplash.com/photo-1558346174-56a66552b09a?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo', 'Grand National', 'Regal'],
    inStock: true,
    freeShipping: false,
  },
  {
    id: 'mm-ttop-kit',
    name: '8pc Stainless Steel and 6 pc Seal T-Top Kit',
    price: 529.00,
    category: 'Seals & Weatherstrip',
    image: 'https://images.unsplash.com/photo-1492144534655-ae8c224e9dfd?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS Aerocoupe'],
    inStock: true,
    freeShipping: false,
  },
  
  // Interior
  {
    id: 'mm-window-switches',
    name: 'Power Window and Lock Switches',
    price: 49.99,
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo', 'Grand National', 'Cutlass', 'Regal', 'El Camino'],
    inStock: true,
    freeShipping: true,
  },
  {
    id: 'mm-floor-mats-gray',
    name: 'Carpeted Floor Mats - Large Gray Monte Carlo SS Logo',
    price: 112.99,
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1544636331-e26859cd61e1?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS'],
    inStock: true,
    freeShipping: false,
  },
  {
    id: 'mm-floor-mats-blue',
    name: 'Carpeted Floor Mats - Blue with Large Gray Monte Carlo SS Logo',
    price: 157.99,
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1544636331-e26859cd61e1?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS'],
    inStock: true,
    freeShipping: false,
  },
  {
    id: 'mm-console-lid',
    name: 'New Maroon Console Door Lid with Hinge',
    price: 89.95,
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS'],
    inStock: true,
    freeShipping: false,
  },
  
  // Engine & Cooling
  {
    id: 'mm-washer-bottle',
    name: 'Windshield Washer Bottle and Coolant Overflow Bottle Set',
    price: 64.95,
    category: 'Engine',
    image: 'https://images.unsplash.com/photo-1486262715612-cb603c959fd1?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['All G-Body'],
    inStock: true,
    freeShipping: false,
  },
  {
    id: 'mm-coolant-jug',
    name: 'Chevrolet Coolant Jug',
    price: 34.95,
    category: 'Engine',
    image: 'https://images.unsplash.com/photo-1486262715612-cb603c959fd1?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS'],
    inStock: true,
    freeShipping: false,
  },
  
  // Exterior
  {
    id: 'mm-splash-shields',
    name: 'Monte Carlo Splash Shields - Pair',
    price: 74.95,
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c6cd88?w=400&h=400&fit=crop',
    url: 'https://www.mikesmontes.com/',
    source: "Mike's Montes",
    fits: ['Monte Carlo SS 1983-1988'],
    inStock: true,
    freeShipping: false,
  },
];

const PART_CATEGORIES = [
  'All Parts',
  'Front End',
  'Exterior',
  'Seals & Weatherstrip',
  'Interior',
  'Engine',
  'Transmission',
  'Suspension',
  'Brakes',
  'Electrical',
];

// Additional vendor links
const VENDORS = [
  {
    name: "Mike's Montes",
    url: 'https://www.mikesmontes.com/',
    description: '1981-1988 Monte Carlo SS and G-body parts. New, used, GM, and aftermarket.',
    highlight: 'Free shipping on select items',
  },
  {
    name: 'GBodyParts.com',
    url: 'https://gbodyparts.com',
    description: 'Wide selection of G-Body restoration and performance parts.',
    highlight: 'Large inventory',
  },
  {
    name: 'TurboBuick.com Marketplace',
    url: 'https://turbobuick.com/forums/parts-for-sale.35/',
    description: 'Parts for sale by Grand National and T-Type community members.',
    highlight: 'Community marketplace',
  },
  {
    name: 'TurboBuick Cars For Sale',
    url: 'https://turbobuick.com/forums/cars-for-sale.39/',
    description: 'Grand Nationals, T-Types, Turbo Ts for sale by owner.',
    highlight: 'Community listings',
  },
];

const FORUMS = [
  {
    name: 'TurboBuick.com',
    url: 'https://turbobuick.com',
    description: 'Grand National and T-Type community',
  },
  {
    name: 'GBodyForum.com',
    url: 'https://gbodyforum.com',
    description: 'All G-Body discussion and marketplace',
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'All Parts';
  const search = searchParams.get('search') || '';
  
  let parts = MIKES_MONTES_PARTS;
  
  if (category !== 'All Parts') {
    parts = parts.filter(p => p.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    parts = parts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.fits.some(f => f.toLowerCase().includes(searchLower))
    );
  }
  
  return NextResponse.json({
    parts,
    categories: PART_CATEGORIES,
    vendors: VENDORS,
    forums: FORUMS,
    total: parts.length,
  });
}