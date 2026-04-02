import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G-Body Finder | Monte Carlo, Grand National, Cutlass & More",
  description: "The ultimate marketplace for G-Body classics. Find 1978-1988 Monte Carlos, Grand Nationals, Cutlass Supremes, Regals & Grand Prix. Browse listings from across the web in one place.",
  keywords: "G-Body, Monte Carlo, Grand National, Cutlass Supreme, Regal, Grand Prix, 442, classic car, muscle car, for sale",
  openGraph: {
    title: "G-Body Finder | Find Your Classic G-Body",
    description: "The ultimate marketplace for G-Body classics. Monte Carlos, Grand Nationals, Cutlass Supremes & more.",
    type: "website",
    url: "https://gbodyfinder.com",
  },
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "G-Body Finder",
  "url": "https://gbodyfinder.com",
  "logo": "https://gbodyfinder.com/logo.svg",
  "description": "The #1 marketplace for G-Body classic muscle cars. Monte Carlo SS, Grand National, Cutlass 442, El Camino, Malibu, Regal, and Grand Prix from 1978-1988.",
  "sameAs": [
    "https://www.facebook.com/gbodyfinder",
    "https://www.instagram.com/gbodyfinder"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@gbodyfinder.com",
    "contactType": "Customer Support"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}// Build 1774614928
