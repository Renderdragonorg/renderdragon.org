import YouTubeDownloader from '@/pages/YouTubeDownloader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Downloader - Renderdragon',
  description: 'Download YouTube videos and thumbnails for your content creation needs.',
};

export default function YouTubeDownloaderPage() {
  return <YouTubeDownloader />;
}
