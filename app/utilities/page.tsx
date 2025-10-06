import Utilities from '@/pages/Utilities';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Useful Utilities - Renderdragon',
  description: 'A curated collection of free and premium utilities to enhance your content creation workflow.',
  openGraph: {
    title: 'Useful Utilities - Renderdragon',
    description: 'A curated collection of free and premium utilities to enhance your content creation workflow.',
    url: 'https://renderdragon.org/utilities',
  },
};

export default function UtilitiesPage() {
  return <Utilities />;
}
