import Account from '@/pages/Account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account - Renderdragon',
  description: 'Manage your Renderdragon account settings and profile information.',
};

export default function AccountPage() {
  return <Account />;
}
