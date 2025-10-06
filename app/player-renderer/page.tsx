import PlayerRenderer from '@/pages/PlayerRenderer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Player Renderer - Renderdragon',
  description: 'Generate and download Minecraft player renders using different rendering services.',
  openGraph: {
    title: 'Player Renderer - Renderdragon',
    description: 'Generate and download Minecraft player renders using different rendering services.',
    url: 'https://renderdragon.org/player-renderer',
  },
};

export default function PlayerRendererPage() {
  return <PlayerRenderer />;
}
