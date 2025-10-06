import Profile from '@/pages/Profile';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  
  return {
    title: `${username} - Profile - Renderdragon`,
    description: `View ${username}'s profile on Renderdragon.`,
    openGraph: {
      title: `${username} - Renderdragon`,
      description: `View ${username}'s profile on Renderdragon.`,
      url: `https://renderdragon.org/u/${username}`,
    },
  };
}

export default function ProfilePage() {
  return <Profile />;
}
