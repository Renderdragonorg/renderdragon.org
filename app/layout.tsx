import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VercelAnalytics from '@/components/VercelAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from '@/hooks/useAuth';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/index.css';
import '@/global.css';
import { ReactNode } from 'react';
import Providers from './providers';

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const metadata: Metadata = {
  title: 'RenderDragon - Free Resources for Creators',
  description: 'The ultimate hub for creators. Find free resources for your next project, including music, sound effects, images, and more.',
  keywords: 'Minecraft, YouTube, Content Creator, Tools, Assets, Free, Music, SFX, Animations, Fonts, Images, Premiere Pro Presets, DaVinci Resolve Presets, AI Title Helper, YouTube Downloader, Copyright Checker, Renderdragon',
  authors: [{ name: 'Team Wheels' }],
  metadataBase: new URL('https://renderdragon.org'),
  openGraph: {
    title: 'RenderDragon - Minecraft YouTube Tools & Assets',
    description: 'Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides—all ad-free.',
    url: 'https://renderdragon.org',
    siteName: 'Renderdragon',
    images: [
      {
        url: 'https://renderdragon.org/ogimg.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RenderDragon - Minecraft YouTube Tools & Assets',
    description: 'Your ultimate toolkit for creating Minecraft YouTube content. Get free tools, assets, music, and guides—all ad-free.',
    images: ['https://renderdragon.org/ogimg.png'],
    site: '@renderdragon',
  },
  icons: {
    icon: 'https://renderdragon.org/renderdragon.png',
  },
  verification: {
    google: '_1Znm2uL6EbALUvDw11BNaWNKQQ716QK-tixIKVEf3c',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Chakra+Petch:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <link rel="canonical" href="https://renderdragon.org" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
