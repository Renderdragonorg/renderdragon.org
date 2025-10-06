import TOS from '@/pages/TOS';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Renderdragon',
  description: 'Read our terms of service and usage guidelines for Renderdragon.',
};

export default function TOSPage() {
  return <TOS />;
}
