import Showcase from '@/pages/Showcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showcase - Renderdragon',
  description: 'Showcase your Minecraft content and discover amazing creations from the community.',
  openGraph: {
    title: 'Showcase - Renderdragon',
    description: 'Showcase your Minecraft content and discover amazing creations from the community.',
    url: 'https://renderdragon.org/showcase',
  },
};

export default function ShowcasePage() {
  return <Showcase />;
}
