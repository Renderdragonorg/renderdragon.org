import Changelogs from '@/pages/Changelogs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelogs - Renderdragon',
  description: 'See the latest improvements and updates to Renderdragon.',
  openGraph: {
    title: 'Changelogs - Renderdragon',
    description: 'See the latest improvements and updates to Renderdragon.',
    images: ['https://renderdragon.org/ogimg/og.png'],
    url: 'https://renderdragon.org/changelogs',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function ChangelogsPage() {
  return <Changelogs />;
}
