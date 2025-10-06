import AiTitleHelper from '@/pages/AiTitleHelper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Title Helper - Renderdragon',
  description: 'Generate engaging video titles with AI.',
  openGraph: {
    title: 'AI Title Helper - Renderdragon',
    description: 'Generate engaging video titles with AI.',
    url: 'https://renderdragon.org/ai-title-helper',
  },
};

export default function AiTitleHelperPage() {
  return <AiTitleHelper />;
}
