import Admin from '@/pages/Admin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - Renderdragon',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <Admin />;
}
