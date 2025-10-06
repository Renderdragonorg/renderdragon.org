import ResourcesHub from '@/pages/ResourcesHub';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources Hub - Renderdragon',
  description: 'Browse our collection of free resources for Minecraft content creators, including music, sound effects, images, animations, and more.',
  openGraph: {
    title: 'Resources Hub - Renderdragon',
    description: 'Browse our collection of free resources for Minecraft content creators, including music, sound effects, images, animations, and more.',
    images: ['https://renderdragon.org/ogimg/resources.png'],
    url: 'https://renderdragon.org/resources',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources Hub - Renderdragon',
    images: ['https://renderdragon.org/ogimg/resources.png'],
  },
};

export default function ResourcesPage() {
  return <ResourcesHub />;
}
