import type { Metadata } from 'next';
import { Archivo, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
});

const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow-condensed',
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fort-worth-concrete.tkyy67t28j.chatgpt.site'),
  title: 'Fort Worth Concrete | Free Concrete Estimates',
  description: 'Concrete driveways, patios, sidewalks, stamped concrete and slabs in Fort Worth, Texas. Request your free estimate today.',
  icons: {
    icon: '/fort-worth-concrete-logo-tight.webp',
    apple: '/fort-worth-concrete-logo-tight.webp',
  },
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
        className={`${archivo.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
