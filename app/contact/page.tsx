import Contact from '@/pages/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Renderdragon',
  description: "Get in touch with the Renderdragon team for support, feedback, or business inquiries. We're here to help Minecraft content creators succeed.",
  openGraph: {
    title: 'Contact - Renderdragon',
    description: "Get in touch with the Renderdragon team for support, feedback, or business inquiries. We're here to help Minecraft content creators succeed.",
    images: ['https://renderdragon.org/ogimg/contact.png'],
    url: 'https://renderdragon.org/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Renderdragon',
    description: "Get in touch with the Renderdragon team for support, feedback, or business inquiries. We're here to help Minecraft content creators succeed.",
    images: ['https://renderdragon.org/ogimg/contact.png'],
  },
};

export default function ContactPage() {
  return <Contact />;
}
