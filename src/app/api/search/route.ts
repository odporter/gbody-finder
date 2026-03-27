import { NextRequest, NextResponse } from 'next/server';

interface YouTubeResult {
  title: string;
  videoId: string;
  thumbnail: string;
  channel: string;
  duration: string;
  url: string;
}

interface PartResult {
  name: string;
  price: string;
  url: string;
  source: string;
  fits: string[];
}

// YouTube search - returns relevant tutorial videos
async function searchYouTube(query: string): Promise<YouTubeResult[]> {
  // In production, you'd use YouTube Data API
  // For now, return search URL that opens YouTube
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' g-body installation')}`;
  
  // Common G-Body tutorial channels
  const channels = [
    'Mike\'s Montes',
    'GBodyParts',
    'TurboBuick',
    'ScottieDTV',
  ];
  
  // Return placeholder results that link to actual searches
  return [{
    title: `Search: "${query}" on YouTube`,
    videoId: '',
    thumbnail: '',
    channel: 'YouTube',
    duration: '',
    url: searchUrl,
  }];
}

// Part search - returns vendor links
function searchParts(query: string): PartResult[] {
  const queryLower = query.toLowerCase();
  
  // Map common searches to vendors
  const results: PartResult[] = [];
  
  if (queryLower.includes('door seal') || queryLower.includes('weatherstrip')) {
    results.push({
      name: 'Door Seal Weatherstrip Kit',
      price: '$54.99',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo', 'Grand National', 'Cutlass', 'Regal'],
    });
    results.push({
      name: '9pc Weatherstrip Seal Kit',
      price: '$199.99',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo SS 1983-1988'],
    });
  }
  
  if (queryLower.includes('window switch') || queryLower.includes('power window')) {
    results.push({
      name: 'Power Window and Lock Switches',
      price: '$49.99',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo', 'Grand National', 'Cutlass', 'Regal', 'El Camino'],
    });
  }
  
  if (queryLower.includes('floor mat') || queryLower.includes('carpet')) {
    results.push({
      name: 'Carpeted Floor Mats - Monte Carlo SS Logo',
      price: '$112.99',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo SS'],
    });
  }
  
  if (queryLower.includes('bumper') || queryLower.includes('front end')) {
    results.push({
      name: 'Front Bumper Nose',
      price: '$769.00',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo SS 1983-1988'],
    });
    results.push({
      name: 'Inner Fender Pair',
      price: '$299.00',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo SS 1983-1988'],
    });
  }
  
  if (queryLower.includes('t-top') || queryLower.includes('ttop')) {
    results.push({
      name: 'T-Top Seal Kit',
      price: '$529.00',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo SS Aerocoupe'],
    });
  }
  
  if (queryLower.includes('headlight') || queryLower.includes('light')) {
    results.push({
      name: 'Smoked Headlight Covers',
      price: '$89.99',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo SS 1983-1988'],
    });
  }
  
  if (queryLower.includes('console') || queryLower.includes('center')) {
    results.push({
      name: 'Console Door Lid with Hinge',
      price: '$89.95',
      url: 'https://www.mikesmontes.com/',
      source: "Mike's Montes",
      fits: ['Monte Carlo SS'],
    });
  }
  
  // Always add general search links
  results.push({
    name: `Search "${query}" on Mike's Montes`,
    price: '',
    url: `https://www.mikesmontes.com/search.asp?keyword=${encodeURIComponent(query)}`,
    source: "Mike's Montes",
    fits: ['All G-Body'],
  });
  
  results.push({
    name: `Search "${query}" on GBodyParts`,
    price: '',
    url: `https://gbodyparts.com/search?q=${encodeURIComponent(query)}`,
    source: 'GBodyParts.com',
    fits: ['All G-Body'],
  });
  
  return results;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  
  if (!query) {
    return NextResponse.json({
      query: '',
      parts: [],
      videos: [],
      message: 'Enter a search term to find parts and tutorials',
    });
  }
  
  const parts = searchParts(query);
  const videos = await searchYouTube(query);
  
  return NextResponse.json({
    query,
    parts,
    videos,
    youtubeSearch: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' g-body monte carlo installation')}`,
  });
}