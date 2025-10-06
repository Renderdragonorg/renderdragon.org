import BackgroundGenerator from '@/pages/BackgroundGenerator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Background Generator - Renderdragon',
  description: 'Create unique and engaging backgrounds for your Minecraft YouTube thumbnails and channel art with our background generator tool.',
  openGraph: {
    title: 'Background Generator - Renderdragon',
    description: 'Create unique and engaging backgrounds for your Minecraft YouTube thumbnails and channel art with our background generator tool.',
    images: ['https://renderdragon.org/ogimg/background.png'],
    url: 'https://renderdragon.org/background-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Background Generator - Renderdragon',
    images: ['https://renderdragon.org/ogimg/background.png'],
  },
};

export default function BackgroundGeneratorPage() {
  return <BackgroundGenerator />;
}
