import Renderbot from '@/pages/Renderbot';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RenderBot - Renderdragon',
  description: 'Learn about RenderBot, our Discord bot for Minecraft content creators.',
  openGraph: {
    title: 'RenderBot - Renderdragon',
    description: 'Learn about RenderBot, our Discord bot for Minecraft content creators.',
    url: 'https://renderdragon.org/renderbot',
  },
};

export default function RenderbotPage() {
  return <Renderbot />;
}
