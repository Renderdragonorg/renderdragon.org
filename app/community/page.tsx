import Community from '@/pages/Community';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community - Renderdragon',
  description: 'Join our community of Minecraft content creators. Find helpful tutorials, guides, and Discord servers to connect with other creators.',
  openGraph: {
    title: 'Community - Renderdragon',
    description: 'Join our community of Minecraft content creators. Find helpful tutorials, guides, and Discord servers to connect with other creators.',
    images: ['https://renderdragon.org/ogimg/community.png'],
    url: 'https://renderdragon.org/community',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community - Renderdragon',
    images: ['https://renderdragon.org/ogimg/community.png'],
  },
};

export default function CommunityPage() {
  return <Community />;
}
