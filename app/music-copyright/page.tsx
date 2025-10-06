import MusicCopyright from '@/pages/MusicCopyright';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Copyright Checker - Renderdragon',
  description: 'Check if a song is copyrighted before using it in your YouTube videos. Free and easy to use copyright checker tool.',
  openGraph: {
    title: 'Music Copyright Checker - Renderdragon',
    description: 'Check if a song is copyrighted before using it in your YouTube videos. Free and easy to use copyright checker tool.',
    images: ['https://renderdragon.org/ogimg/gappa.png'],
    url: 'https://renderdragon.org/music-copyright',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Copyright Checker - Renderdragon',
    images: ['https://renderdragon.org/ogimg/gappa.png'],
  },
};

export default function MusicCopyrightPage() {
  return <MusicCopyright />;
}
