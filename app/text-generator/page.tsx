import TextGenerator from '@/pages/TextGenerator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Generator - Renderdragon',
  description: 'Generate stylized text for your Minecraft content.',
};

export default function TextGeneratorPage() {
  return <TextGenerator />;
}
