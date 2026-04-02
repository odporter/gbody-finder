import { NextResponse } from 'next/server';

const BASE_URL = 'https://gbodyfinder.com';

const STATIC_PAGES = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/listings', priority: '0.9', changefreq: 'hourly' },
  { url: '/parts', priority: '0.8', changefreq: 'weekly' },
  { url: '/market', priority: '0.9', changefreq: 'daily' },
  { url: '/build-calculator', priority: '0.7', changefreq: 'monthly' },
  { url: '/search', priority: '0.6', changefreq: 'weekly' },
  { url: '/sell', priority: '0.8', changefreq: 'monthly' },
  { url: '/dealer-program', priority: '0.7', changefreq: 'monthly' },
];

const MODEL_PAGES = [
  'monte-carlo',
  'grand-national',
  'cutlass-supreme',
  'regal',
  'el-camino',
  'malibu',
  'grand-prix',
];

function xmlEscape(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  const staticUrls = STATIC_PAGES.map(
    (page) => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('');

  const modelUrls = MODEL_PAGES.map(
    (slug) => `
  <url>
    <loc>${BASE_URL}/models/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${modelUrls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
