import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, Manrope, DM_Sans, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ModalProvider } from '@/lib/context/ModalContext';
import { BookUsModal } from '@/components/modals/BookUsModal';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
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
  title: 'HD Flooring | Professional Flooring Installation in Saskatoon, SK Canada',
  description:
    'HD Flooring by Habibur Rahman (Habib). Specialized in Sheet Vinyl coving, PVC, LVP, LVT, VCT, Hardwood, Laminate, Carpet, Tiles & Self Leveling in Saskatoon, SK. Call +1 (306) 880-8404.',
  keywords: [
    'HD Flooring Saskatoon',
    'Flooring Installation Saskatoon SK',
    'Sheet Vinyl Coving',
    'LVP LVT VCT Vinyl Planking',
    'Commercial & Residential Flooring Repairs Canada',
    'Self Leveling Compound Saskatoon',
  ],
  authors: [{ name: 'HD Flooring - Habibur Rahman (Habib)' }],
  icons: {
    icon: [
      { url: '/assets/images/light-logo.png', media: '(prefers-color-scheme: light)' },
      { url: '/assets/images/dark-logo.png', media: '(prefers-color-scheme: dark)' },
      { url: '/assets/images/light-logo.png' },
    ],
    shortcut: '/assets/images/light-logo.png',
    apple: '/assets/images/light-logo.png',
  },
  openGraph: {
    title: 'HD Flooring | Professional Installation & Repairs in Saskatoon, SK',
    description:
      'Installs & Repairs: Commercial & Residential Flooring. Sheet Vinyl coving, LVP, LVT, VCT, Hardwood, Carpet & Tiles. Call +1 (306) 880-8404.',
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
      className={`${plusJakarta.variable} ${outfit.variable} ${manrope.variable} ${dmSans.variable} ${inter.variable}`}
    >
      <body className="font-inter min-h-screen flex flex-col antialiased selection:bg-[#E85D04] selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
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


