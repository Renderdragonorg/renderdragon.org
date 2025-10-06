import GuideView from '@/pages/GuideView';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Guide';
  
  return {
    title: `${title} - Guides - Renderdragon`,
    description: `Read the ${title} guide on Renderdragon.`,
    openGraph: {
      title: `${title} - Renderdragon Guides`,
      description: `Read the ${title} guide on Renderdragon.`,
      images: ['https://renderdragon.org/ogimg/guides.png'],
      url: `https://renderdragon.org/guides/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Renderdragon Guides`,
      images: ['https://renderdragon.org/ogimg/guides.png'],
    },
  };
}

export default function GuideViewPage() {
  return <GuideView />;
}
