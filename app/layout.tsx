import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fort Worth Concrete | Free Concrete Estimates',
  description: 'Concrete driveways, patios, sidewalks, stamped concrete and slabs in Fort Worth, Texas. Request your free estimate today.',
  openGraph: {
    title: 'Fort Worth Concrete | Installation You Can Count On',
    description: 'Request a free estimate for concrete driveways, patios, sidewalks, stamped concrete, and slabs in Fort Worth, Texas.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Fort Worth Concrete' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fort Worth Concrete | Installation You Can Count On',
    description: 'Request a free concrete estimate in Fort Worth, Texas.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
