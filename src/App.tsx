import { Suspense, lazy, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VercelAnalytics from '@/components/VercelAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from '@/hooks/useAuth';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

const Index = lazy(() => import('@/pages/Index'));
const ResourcesHub = lazy(() => import('@/pages/ResourcesHub'));
const Contact = lazy(() => import('@/pages/Contact'));
const BackgroundGenerator = lazy(() => import('@/pages/BackgroundGenerator'));
const MusicCopyright = lazy(() => import('@/pages/MusicCopyright'));
const Guides = lazy(() => import('@/pages/Guides'));
const GuideView = lazy(() => import('@/pages/GuideView'));
const Community = lazy(() => import('@/pages/Community'));
const AiTitleHelper = lazy(() => import('@/pages/AiTitleHelper'));
const Utils = lazy(() => import('@/pages/Utilities'));
const PlayerRenderer = lazy(() => import('@/pages/PlayerRenderer'));
const Renderbot = lazy(() => import('@/pages/Renderbot'));
const Account = lazy(() => import('@/pages/Account'));
const Admin = lazy(() => import('@/pages/Admin'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const TOS = lazy(() => import('@/pages/TOS'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Construction = lazy(() => import('@/pages/Construction'));
const TextGenerator = lazy(() => import('@/pages/TextGenerator'));
const Generators = lazy(() => import('@/pages/Generators'));
const YouTubeDownloader = lazy(() => import('@/pages/YouTubeDownloader'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Showcase = lazy(() => import('@/pages/Showcase'));
const Changelogs = lazy(() => import('@/pages/Changelogs'));
const Profile = lazy(() => import('@/pages/Profile'));

const queryClient = new QueryClient();

const LoadingFallback = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <Loader2 className="w-12 h-12 animate-spin text-cow-purple" />
    <p className="text-white/80">{message}</p>
  </div>
);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HelmetProvider>
            <TooltipProvider>
              <BrowserRouter>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/resources" element={<ResourcesHub />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/background-generator" element={<BackgroundGenerator />} />
                    <Route path="/music-copyright" element={<MusicCopyright />} />
                    <Route path="/gappa" element={<Navigate to="/music-copyright" replace />} />
                    <Route path="/guides" element={<Guides />} />
                    <Route path="/guides/:slug" element={<GuideView />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/ai-title-helper" element={<AiTitleHelper />} />
                    <Route path="/utilities" element={<Utils />} />
                    <Route path="/player-renderer" element={<PlayerRenderer />} />
                    <Route path="/renderbot" element={<Renderbot />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/tos" element={<TOS />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/construction" element={<Construction />} />
                    <Route path="/text-generator" element={<TextGenerator />} />
                    <Route path="/generators" element={<Generators />} />
                    <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
                    <Route path="/showcase" element={<Showcase />} />
                    <Route path="/u/:username" element={<Profile />} />
                    <Route path="/changelogs" element={<Changelogs />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <Toaster />
              <Sonner />
              <VercelAnalytics />
              <SpeedInsights />
            </TooltipProvider>
          </HelmetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;