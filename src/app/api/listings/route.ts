import { NextRequest, NextResponse } from 'next/server';

// eBay Finding API - requires App ID from developer.ebay.com
// Get your App ID at: https://developer.ebay.com/my/keys

const EBAY_APP_ID = process.env.EBAY_APP_ID || process.env.NEXT_PUBLIC_EBAY_APP_ID;

interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  image: string;
  url: string;
  source: string;
  condition?: string;
  endTime?: string;
  bidCount?: number;
}

const MODEL_SEARCHES: Record<string, { keywords: string; category?: string }> = {
  'monte-carlo': {
    keywords: 'Monte Carlo SS 1978 1979 1980 1981 1982 1983 1984 1985 1986 1987 1988',
    category: '6026', // Cars & Trucks
  },
  'grand-national': {
    keywords: 'Buick Grand National GN Turbo 1982 1983 1984 1985 1986 1987',
    category: '6026',
  },
  'cutlass-supreme': {
    keywords: 'Oldsmobile Cutlass Supreme 442 Hurst 1978 1979 1980 1981 1982 1983 1984 1985 1986 1987 1988',
    category: '6026',
  },
  'regal': {
    keywords: 'Buick Regal T-Type Grand National 1978 1979 1980 1981 1982 1983 1984 1985 1986 1987',
    category: '6026',
  },
  'el-camino': {
    keywords: 'El Camino SS Conquista 1978 1979 1980 1981 1982 1983 1984 1985 1986 1987',
    category: '6026',
  },
  'malibu': {
    keywords: 'Chevy Malibu Classic 1978 1979 1980 1981 1982 1983',
    category: '6026',
  },
  'grand-prix': {
    keywords: 'Pontiac Grand Prix LJ SJ 1978 1979 1980 1981 1982 1983 1984 1985 1986 1987',
    category: '6026',
  },
};

async function fetchEbayListings(model: string): Promise<Listing[]> {
  const search = MODEL_SEARCHES[model] || MODEL_SEARCHES['monte-carlo'];
  
  if (!EBAY_APP_ID) {
    console.log('No eBay App ID configured - returning placeholder');
    return [];
  }

  const params = new URLSearchParams({
    'OPERATION-NAME': 'findItemsByKeywords',
    'SERVICE-VERSION': '1.0.0',
    'SECURITY-APPNAME': EBAY_APP_ID,
    'RESPONSE-DATA-FORMAT': 'JSON',
    'REST-PAYLOAD': '',
    'keywords': search.keywords,
    'paginationInput.entriesPerPage': '20',
    'itemFilter(0).name': 'Condition',
    'itemFilter(0).value': 'Used',
    'itemFilter(1).name': 'ListingType',
    'itemFilter(1).value': 'FixedPrice,Auction',
    'outputSelector(0)': 'GalleryURL',
    'outputSelector(1)': 'PictureURLLarge',
    'outputSelector(2)': 'Condition',
  });

  if (search.category) {
    params.append('categoryId', search.category);
  }

  try {
    const response = await fetch(
      `https://svcs.ebay.com/services/search/FindingService/v1?${params.toString()}`
    );

    const data = await response.json();
    
    if (!data.findItemsByKeywordsResponse?.searchResult?.item) {
      return [];
    }

    const items = data.findItemsByKeywordsResponse.searchResult.item;
    
    return items.map((item: any) => ({
      id: item.itemId?.[0] || `ebay-${Date.now()}`,
      title: item.title?.[0] || 'Unknown',
      price: parseFloat(item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ || '0'),
      currency: item.sellingStatus?.[0]?.currentPrice?.[0]?.['@currencyId'] || 'USD',
      location: item.location?.[0] || 'Unknown',
      image: item.galleryURL?.[0] || item.pictureURLLarge?.[0] || '/images/cars/placeholder.jpg',
      url: item.viewItemURL?.[0] || `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(search.keywords)}`,
      source: 'ebay',
      condition: item.condition?.[0]?.conditionDisplayName?.[0] || 'Used',
      endTime: item.listingInfo?.[0]?.endTime?.[0],
      bidCount: parseInt(item.sellingStatus?.[0]?.bidCount?.[0] || '0'),
    }));
  } catch (error) {
    console.error('eBay API error:', error);
    return [];
  }
}

function getMarketplaceLinks(model: string): Listing[] {
  const search = MODEL_SEARCHES[model] || MODEL_SEARCHES['monte-carlo'];
  const keywords = search.keywords.split(' ').slice(0, 3).join(' ');
  
  return [
    {
      id: `fb-${model}`,
      title: `Search ${model.replace('-', ' ')} on Facebook Marketplace`,
      price: 0,
      currency: 'USD',
      location: 'Nationwide',
      image: '/images/cars/placeholder.jpg',
      url: `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(keywords)}`,
      source: 'facebook',
    },
    {
      id: `cl-la-${model}`,
      title: `${model.replace('-', ' ').toUpperCase()} - Los Angeles`,
      price: 0,
      currency: 'USD',
      location: 'Los Angeles',
      image: '/images/cars/placeholder.jpg',
      url: `https://losangeles.craigslist.org/search/sss?query=${encodeURIComponent(keywords)}&sort=rel`,
      source: 'craigslist',
    },
    {
      id: `cl-hou-${model}`,
      title: `${model.replace('-', ' ').toUpperCase()} - Houston`,
      price: 0,
      currency: 'USD',
      location: 'Houston',
      image: '/images/cars/placeholder.jpg',
      url: `https://houston.craigslist.org/search/sss?query=${encodeURIComponent(keywords)}&sort=rel`,
      source: 'craigslist',
    },
    {
      id: `cl-atl-${model}`,
      title: `${model.replace('-', ' ').toUpperCase()} - Atlanta`,
      price: 0,
      currency: 'USD',
      location: 'Atlanta',
      image: '/images/cars/placeholder.jpg',
      url: `https://atlanta.craigslist.org/search/sss?query=${encodeURIComponent(keywords)}&sort=rel`,
      source: 'craigslist',
    },
    {
      id: `cl-det-${model}`,
      title: `${model.replace('-', ' ').toUpperCase()} - Detroit`,
      price: 0,
      currency: 'USD',
      location: 'Detroit',
      image: '/images/cars/placeholder.jpg',
      url: `https://detroit.craigslist.org/search/sss?query=${encodeURIComponent(keywords)}&sort=rel`,
      source: 'craigslist',
    },
    {
      id: `cl-phx-${model}`,
      title: `${model.replace('-', ' ').toUpperCase()} - Phoenix`,
      price: 0,
      currency: 'USD',
      location: 'Phoenix',
      image: '/images/cars/placeholder.jpg',
      url: `https://phoenix.craigslist.org/search/sss?query=${encodeURIComponent(keywords)}&sort=rel`,
      source: 'craigslist',
    },
    {
      id: `bat-${model}`,
      title: `Search ${model.replace('-', ' ')} on Bring a Trailer`,
      price: 0,
      currency: 'USD',
      location: 'Auctions',
      image: '/images/cars/placeholder.jpg',
      url: `https://bringatrailer.com/search/?q=${encodeURIComponent(keywords)}`,
      source: 'bat',
    },
    {
      id: `cars-${model}`,
      title: `Search ${model.replace('-', ' ')} on Cars.com`,
      price: 0,
      currency: 'USD',
      location: 'Nationwide',
      image: '/images/cars/placeholder.jpg',
      url: `https://www.cars.com/shopping/results/?stock_type=used&keywords=${encodeURIComponent(keywords)}`,
      source: 'cars',
    },
    {
      id: `at-${model}`,
      title: `Search ${model.replace('-', ' ')} on Autotrader`,
      price: 0,
      currency: 'USD',
      location: 'Nationwide',
      image: '/images/cars/placeholder.jpg',
      url: `https://www.autotrader.com/cars-for-sale/all-cars/${encodeURIComponent(keywords)}`,
      source: 'autotrader',
    },
  ];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const model = searchParams.get('model') || 'monte-carlo';
  
  // Fetch eBay listings (if App ID is configured)
  const ebayListings = await fetchEbayListings(model);
  
  // Get marketplace links
  const marketplaceLinks = getMarketplaceLinks(model);
  
  // Combine: eBay first, then marketplace links
  const allListings = [...ebayListings, ...marketplaceLinks];
  
  return NextResponse.json({
    model,
    total: allListings.length,
    ebayConfigured: !!EBAY_APP_ID,
    listings: allListings,
  });
}