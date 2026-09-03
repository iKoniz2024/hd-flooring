import type { Metadata } from 'next';
import { Playfair_Display, Manrope, DM_Sans, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ModalProvider } from '@/lib/context/ModalContext';
import { BookUsModal } from '@/components/modals/BookUsModal';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HD Flooring | Professional Flooring Installation in Canada',
  description:
    'Transform your residential or commercial space with HD Flooring. Hardwood, Engineered Wood, Luxury Vinyl, Laminate, Tile & Carpet Installation with expert craftsmanship.',
  keywords: [
    'Flooring Installation Canada',
    'Hardwood Flooring Installer',
    'Luxury Vinyl Flooring',
    'Tile & Laminate Flooring',
    'Commercial Flooring Contractors',
  ],
  authors: [{ name: 'HD Flooring' }],
  openGraph: {
    title: 'HD Flooring | Professional Flooring Installation for Canadian Homes & Businesses',
    description:
      'High quality flooring installation: Hardwood, Vinyl, Laminate, Carpet & Tile. Get a free quote today.',
    url: 'https://hdflooringca.com',
    siteName: 'HD Flooring',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${manrope.variable} ${dmSans.variable} ${inter.variable}`}
    >
      <body className="font-inter min-h-screen flex flex-col antialiased selection:bg-red-500 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <BookUsModal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
