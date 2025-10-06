import FAQ from '@/pages/FAQ';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Renderdragon',
  description: "Find answers to frequently asked questions about Renderdragon's tools, services, and resources for Minecraft content creators.",
  openGraph: {
    title: 'FAQ - Renderdragon',
    description: "Find answers to frequently asked questions about Renderdragon's tools, services, and resources for Minecraft content creators.",
    url: 'https://renderdragon.org/faq',
  },
};

export default function FAQPage() {
  return <FAQ />;
}
