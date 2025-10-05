import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonateButton from '@/components/DonateButton';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ListTree, Loader2 } from 'lucide-react';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function GuideView() {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/guides/${slug}.md`);
        if (!res.ok) throw new Error(`Failed to load guide: ${res.status}`);
        const text = await res.text();
        if (active) setMarkdown(text);
      } catch (e: any) {
        if (active) setError(e?.message ?? 'Failed to load guide');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slug]);

  const headings = useMemo(() => {
    // Extract H2 headings as sections
    const lines = markdown.split(/\n/);
    const items: { text: string; id: string }[] = [];
    for (const line of lines) {
      const m = /^##\s+(.*)$/.exec(line.trim());
      if (m) {
        const text = m[1].trim();
        const id = slugify(text);
        items.push({ text, id });
      }
    }
    return items;
  }, [markdown]);

  const title = useMemo(() => {
    // Use first H1 or fallback to slug
    const m = /^#\s+(.*)$/m.exec(markdown);
    return m ? m[1].trim() : (slug ? slug.replace(/-/g, ' ') : 'Guide');
  }, [markdown, slug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title} - Guides - Renderdragon</title>
        <meta name="description" content={`Read the ${title} guide on Renderdragon.`} />
        <meta property="og:title" content={`${title} - Renderdragon Guides`} />
        <meta property="og:description" content={`Read the ${title} guide on Renderdragon.`} />
        <meta property="og:image" content="https://renderdragon.org/ogimg/guides.png" />
        <meta property="og:url" content={`https://renderdragon.org/guides/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Renderdragon Guides`} />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/guides.png" />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="mb-6">
                <Link to="/guides" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Guides
                </Link>
              </div>

              {loading ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading guide...</span>
                </div>
              ) : error ? (
                <div className="text-red-400">{error}</div>
              ) : (
                <article
                  className="prose prose-invert max-w-none font-geist leading-loose [&>p]:mb-4 [&>p]:leading-loose [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:mt-8 [&>h2]:mb-3 [&>ul]:my-4 [&>ol]:my-4 [&_li]:leading-relaxed"
                  style={{ wordSpacing: '0.08em' }}
                >
                  <ReactMarkdown
                    components={{
                      h1: ({ node, children, ...props }) => (
                        <h1 {...props}>{children}</h1>
                      ),
                      h2: ({ node, children, ...props }) => {
                        const text = String(children);
                        const id = slugify(text);
                        return (
                          <h2 id={id} {...props}>
                            {children}
                          </h2>
                        );
                      },
                      p: ({ children }) => (
                        <p className="font-geist leading-loose" style={{ wordSpacing: '0.08em' }}>
                          {children}
                        </p>
                      ),
                      ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 leading-relaxed">{children}</ol>,
                      ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 leading-relaxed">{children}</ul>,
                      li: ({ children }) => <li className="marker:text-muted-foreground leading-relaxed">{children}</li>,
                      a: ({ children, href }) => (
                        <a href={href} target="_blank" rel="noreferrer" className="underline">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                </article>
              )}
            </div>

            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24">
                <div className="pixel-corners border border-border p-4 bg-background/60 backdrop-blur">
                  <div className="flex items-center gap-2 mb-3">
                    <ListTree className="h-4 w-4 text-cow-purple" />
                    <h3 className="font-vt323 text-xl">Sections</h3>
                  </div>
                  {headings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No sections found.</p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="text-muted-foreground hover:text-foreground hover:underline"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <DonateButton />
    </div>
  );
}
