import Privacy from '@/pages/Privacy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Renderdragon',
  description: 'Learn about how we handle your data and protect your privacy at Renderdragon.',
};

export default function PrivacyPage() {
  return <Privacy />;
}
