import Guides from '@/pages/Guides';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides - Renderdragon',
  description: 'Learn from comprehensive guides covering Minecraft content creation, YouTube optimization, and best practices for creators.',
  openGraph: {
    title: 'Guides - Renderdragon',
    description: 'Learn from comprehensive guides covering Minecraft content creation, YouTube optimization, and best practices for creators.',
    images: ['https://renderdragon.org/ogimg/guides.png'],
    url: 'https://renderdragon.org/guides',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides - Renderdragon',
    images: ['https://renderdragon.org/ogimg/guides.png'],
  },
};

export default function GuidesPage() {
  return <Guides />;
}
