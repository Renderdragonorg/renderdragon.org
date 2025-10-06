import Generators from '@/pages/Generators';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Generators - Renderdragon',
  description: 'Access various generators and tools for Minecraft content creation.',
};

export default function GeneratorsPage() {
  return <Generators />;
}
