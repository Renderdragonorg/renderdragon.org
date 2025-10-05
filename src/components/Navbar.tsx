// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sun,
  Moon,
  Skull,
  ExternalLink
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Keep for now in case it's a dependency of drawer
import { Toggle } from "@/components/ui/toggle";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Logo from './Logo';
import PixelSvgIcon from './PixelSvgIcon';
import AuthDialog from './auth/AuthDialog'; // Added for auth
import UserMenu from './auth/UserMenu'; // Added for auth
import { useAuth } from '@/hooks/useAuth'; // Added for auth
import { useProfile } from '@/hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavLink {
  name: string;
  path: string;
  icon: string;
  tag?: string; // optional badge/tag (e.g. "NEW")
}

interface NavDropdown {
  name: string;
  icon: string;
  links: NavLink[];
}

const mainLinks: (NavLink | NavDropdown)[] = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Contact', path: '/contact', icon: 'contact' },
  { 
    name: 'Resources', 
    icon: 'resources',
    links: [
      { name: 'Resources Hub', path: '/resources', icon: 'resources-hub' },
      { name: 'Guides', path: '/guides', icon: 'guides' },
      { name: 'Utilities', path: '/utilities', icon: 'software' },
      { name: 'Community Assets', path: '/showcase', icon: 'yt-videos', tag: 'NEW' },
      { name: 'Community', path: '/community', icon: 'yt-videos' },
    ]
  },
  {
    name: 'Tools',
    icon: 'tools',
    links: [
      { name: 'Music Copyright Checker', path: '/gappa', icon: 'music' },
      { name: 'Background Generator', path: '/background-generator', icon: 'background' },
      { name: 'Player Renderer', path: '/player-renderer', icon: 'player' },
      { name: 'Text Generator', path: '/text-generator', icon: 'text' },
      { name: 'Youtube Tools', path: '/youtube-downloader', icon: 'yt-downloader', tag: 'NEW' },
      { name: 'AI Title Helper', path: '/ai-title-helper', icon: 'text', tag: 'NEW' },
      { name: 'Content Generators', path: '/generators', icon: 'text' },
      { name: 's0', path: 'https://s0.renderdragon.org/docs', icon: 'external', tag: 'NEW' }
    ]
  }
];

// Small badge for marking new/updated links
function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-cow-purple text-white text-[10px] leading-none uppercase tracking-wide">
      {label}
    </span>
  );
}

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Kept, but managed by Drawer now
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileCollapsible, setOpenMobileCollapsible] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const isMobile = useIsMobile();
  const [authDialogOpen, setAuthDialogOpen] = useState(false); // Added for auth
  const { user, loading } = useAuth(); // Added for auth
  const { profile } = useProfile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Manages Drawer open state
  const [showChangelogBanner, setShowChangelogBanner] = useState(true);

  // Initialize banner state from localStorage
  useEffect(() => {
    const hidden = localStorage.getItem('hideChangelogBanner');
    if (hidden === '1') setShowChangelogBanner(false);
  }, []);

  const dismissBanner = () => {
    setShowChangelogBanner(false);
    localStorage.setItem('hideChangelogBanner', '1');
  };

  // Derive avatar URL and display name for both desktop and mobile renderers
  const meta = (user?.user_metadata ?? {}) as {
    avatar_url?: string;
    picture?: string;
    display_name?: string;
  };
  const identities = (user?.identities ?? []) as Array<{
    identity_data?: Record<string, unknown> | null;
    provider?: string | null;
  }>;

  // Extract possible URLs from identities (GitHub/Discord sometimes store here)
  const identityAvatar = identities
    .map((i) => (i.identity_data || {}))
    .map((d) => (d?.avatar_url as string) || (d?.picture as string) || (d?.avatar as string) || '')
    .find((u) => !!u);

  let avatarUrl = profile?.avatar_url || meta.avatar_url || meta.picture || identityAvatar || '';
  const displayName = (profile?.display_name as string | undefined) || meta.display_name || user?.email || '';

  // For Discord, if identity has id+avatar hash but no full URL, construct it
  if (!avatarUrl && identities?.length) {
    for (const ident of identities) {
      const provider = (ident.provider || '').toLowerCase();
      if (provider === 'discord') {
        const data = ident.identity_data || {};
        const discordId = data.id as string | undefined;
        const avatarHash = data.avatar as string | undefined;
        if (discordId && avatarHash) {
          avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.png?size=128`;
          break;
        }
      }
    }
  }

  const toSafeHttpUrl = (url?: string | null) => {
    if (!url) return undefined;
    try {
      const u = new URL(url);
      if (u.protocol === 'http:' || u.protocol === 'https:' || u.protocol === 'data:') return u.toString();
      return undefined;
    } catch {
      return undefined;
    }
  };
  const safeAvatarUrl = toSafeHttpUrl(avatarUrl);
  const getInitials = (display: string) => {
    if (!display) return 'U';
    return display.split(' ').join('').slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(offset / 300, 1);
      
      setScrolled(offset > 50);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false); // This will still close the old mobile menu state, but is less critical now
        setIsDrawerOpen(false); // Close drawer on desktop size
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false); // Close old mobile menu state on location change
    setIsDrawerOpen(false); // Close drawer on location change
    setActiveDropdown(null); // Close desktop dropdowns on page change
  }, [location]);

  // Handle favorites visibility
  const handleShowFavorites = () => {
    if (location.pathname === '/resources') {
      // If already on resources page, just dispatch event
      window.dispatchEvent(new CustomEvent('showFavorites'));
    } else {
      // Navigate to resources page with favorites tab
      window.location.href = '/resources?tab=favorites';
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleDropdownMouseEnter = (dropdownName: string) => {
    if (!isMobile) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const handleMobileCollapsibleToggle = (name: string) => {
    setOpenMobileCollapsible(prev => prev === name ? null : name);
  };

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isDropdownActive = (dropdown: NavDropdown) => {
    return dropdown.links.some(link => isLinkActive(link.path));
  };

  const getBackgroundStyle = () => {
    let baseStyle: React.CSSProperties = {};
    if (scrolled) {
      baseStyle = {
        opacity: Math.min(scrollProgress * 1.5, 0.98),
        backdropFilter: `blur(${scrollProgress * 8}px)`,
      };
    }

    if (!isMobile) {
      return {
        ...baseStyle,
        width: 'calc(100% - 17px)', // Standard scrollbar width
        right: '17px', // Offset for scrollbar
      };
    }

    return baseStyle;
  };

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      {showChangelogBanner && (
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <div className="w-full bg-gradient-to-r from-cow-purple/90 via-cow-purple to-cow-purple/90 text-white">
            <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm">
              <span className="font-vt323">Check out new improvements on the</span>
              <Link to="/changelogs" className="underline underline-offset-2 font-vt323">
                changelog page
              </Link>
              <button
                aria-label="Dismiss"
                onClick={dismissBanner}
                className="ml-3 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 py-4 ${
          scrolled ? 'shadow-lg' : ''
        }`}
        style={{ top: showChangelogBanner ? 36 : 0 }}
      >
        <div 
          className={`absolute inset-0 z-[-1] pointer-events-none transition-all duration-300 ${
            isTransparent 
              ? 'bg-transparent' 
              : 'bg-gradient-to-r from-background/80 via-background/90 to-background/80 dark:from-background/80 dark:via-background/90 dark:to-background/80'
          }`}
          style={getBackgroundStyle()}
        />
        <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl md:text-2xl font-bold tracking-wider"
          >
            <div className="flex items-center justify-center">
              <Logo size={isMobile ? "sm" : "md"} />
            </div>
            {!isMobile && (
              <span className="hidden md:inline animate-glow font-vt323">Renderdragon</span>
            )}
            {isMobile && <span className="font-vt323">RD</span>}
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {mainLinks.map((link, index) => (
              'path' in link ? (
                <Link 
                  key={index} 
                  to={link.path} 
                  className={`flex items-center gap-1 transition-colors font-vt323 text-xl ${isLinkActive(link.path) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                >
                  {/* no icons for desktop */}
                  <span>{link.name}</span>
                  {link.tag && <TagBadge label={link.tag} />}
                </Link>
              ) : (
                <div 
                  key={index}
                  className="relative"
                >
                  <DropdownMenu
                    open={activeDropdown === link.name}
                    onOpenChange={(open) => {
                      if (!open) setActiveDropdown(null);
                      if (open) setActiveDropdown(link.name);
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={`flex items-center transition-colors font-vt323 text-xl ${isDropdownActive(link) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                        style={{ transform: 'none' }}
                        onPointerEnter={() => setActiveDropdown(link.name)}
                        onPointerDown={() => setActiveDropdown(null)}
                      >
                        {/* no icons on desktop */}
                        <span>{link.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-56 bg-popover border border-border z-50 pixel-corners"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <DropdownMenuGroup>
                        {link.links.map((subLink, subIndex) => (
                          <DropdownMenuItem key={subIndex} asChild onSelect={() => setActiveDropdown(null)}>
                            {String(subLink.path).startsWith('http') ? (
                              <a
                                href={subLink.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1 px-2 py-2 cursor-pointer font-vt323 text-xl pixel-corners`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span>{subLink.name}</span>
                                {(subLink as NavLink).tag && (
                                  <TagBadge label={(subLink as NavLink).tag!} />
                                )}
                                <ExternalLink className="w-5 h-5 ml-auto pl-2 opacity-80" />
                              </a>
                            ) : (
                              <Link 
                                to={subLink.path} 
                                className={`flex items-center gap-1 px-2 py-2 cursor-pointer font-vt323 text-xl pixel-corners ${isLinkActive(subLink.path) ? 'text-primary bg-accent/50' : ''}`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {/* sub link name */}
                                <span>{subLink.name}</span>
                                {(subLink as NavLink).tag && (
                                  <TagBadge label={(subLink as NavLink).tag!} />
                                )}
                              </Link>
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex">
              {loading ? (
                <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
              ) : user ? (
                <UserMenu onShowFavorites={handleShowFavorites} />
              ) : (
                <Button
                  onClick={() => setAuthDialogOpen(true)}
                  className="pixel-btn-primary"
                >
                  Sign In
                </Button>
              )}
            </div>
            {/* Desktop Theme Toggle */}
            <ThemeToggle className="hidden md:block" />
            
            {/* Mobile Menu Trigger */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[90vh] rounded-t-xl bg-background border-t border-border">
                <div className="px-4 py-6 max-h-[calc(100%-60px)] overflow-auto">
                  <div className="flex items-center justify-between mb-6">
                    <Link 
                      to="/" 
                      className="flex items-center space-x-2 text-xl font-bold"
                      onClick={() => setIsDrawerOpen(false)} // Close drawer on logo click
                    >
                      <div className="w-8 h-8 flex items-center justify-center font-bold text-xs">
                        <Logo size="sm" />
                      </div>
                      <span className="font-vt323">Renderdragon</span>
                    </Link>
                  </div>
                  
                  <nav className="space-y-4">
                    {mainLinks.map((link, index) => (
                      'path' in link ? (
                        <Link 
                          key={index} 
                          to={link.path} 
                          className={`flex items-center gap-1 text-xl py-3 border-b border-border font-vt323 ${isLinkActive(link.path) ? 'text-primary' : ''}`}
                          onClick={() => setIsDrawerOpen(false)} // Close drawer on link click
                        >
                          <span>{link.name}</span>
                          {link.tag && <TagBadge label={link.tag} />}
                        </Link>
                      ) : (
                        <Collapsible 
                          key={index} 
                          className="w-full border-b border-border"
                          open={openMobileCollapsible === link.name}
                          onOpenChange={() => handleMobileCollapsibleToggle(link.name)}
                        >
                          <CollapsibleTrigger className="w-full flex items-center justify-between text-xl py-3">
                            <div className="flex items-center space-x-3 font-vt323">
                              <span>{link.name}</span>
                              {link.tag && <TagBadge label={link.tag} />}
                            </div>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform duration-300 ${
                                openMobileCollapsible === link.name ? 'rotate-180' : ''
                              }`} 
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="animate-accordion-down">
                            <div className="pl-8 pb-3 space-y-3">
                              {link.links.map((subLink, subIndex) => (
                                String(subLink.path).startsWith('http') ? (
                                  <a
                                    key={subIndex}
                                    href={subLink.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center space-x-3 py-2 font-vt323 text-xl text-muted-foreground hover:text-foreground`}
                                    onClick={() => setIsDrawerOpen(false)}
                                  >
                                    <span>{subLink.name}</span>
                                    {(subLink as NavLink).tag && (
                                      <TagBadge label={(subLink as NavLink).tag!} />
                                    )}
                                    <ExternalLink className="w-5 h-5 ml-auto pl-2 opacity-80" />
                                  </a>
                                ) : (
                                  <Link 
                                    key={subIndex}
                                    to={subLink.path}
                                    className={`flex items-center space-x-3 py-2 font-vt323 text-xl ${isLinkActive(subLink.path) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => setIsDrawerOpen(false)} // Close drawer on sub-link click
                                  >
                                    <span>{subLink.name}</span>
                                    {(subLink as NavLink).tag && (
                                      <TagBadge label={(subLink as NavLink).tag!} />
                                    )}
                                  </Link>
                                )
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    ))}
                  </nav>
                  {/* Mobile Auth Section */}
                  <div className="pt-4 border-t border-border mt-4">
                    {loading ? (
                      <div className="w-full h-10 animate-pulse bg-muted rounded-md" />
                    ) : user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {safeAvatarUrl && (
                              <AvatarImage src={safeAvatarUrl} alt="User avatar" referrerPolicy="no-referrer" />
                            )}
                            <AvatarFallback className="bg-cow-purple text-white text-xs">
                              {getInitials(displayName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">{displayName || 'User'}</div>
                            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                          </div>
                        </div>
                        <Button
                          onClick={() => { handleShowFavorites(); setIsDrawerOpen(false); }}
                          variant="outline"
                          className="w-full pixel-corners font-vt323"
                        >
                          My Favorites
                        </Button>
                        <Button
                          onClick={() => {
                            // Assuming sign out logic is handled elsewhere, e.g., via useAuth context
                            // You might need to add a sign-out function here if useAuth doesn't provide one
                            // Example: signOut();
                            setIsDrawerOpen(false);
                          }}
                          variant="outline"
                          className="w-full pixel-corners font-vt323"
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setAuthDialogOpen(true);
                          setIsDrawerOpen(false); // Close drawer when opening auth dialog
                        }}
                        className="w-full pixel-btn-primary font-vt323"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center border-t border-border bg-background">
                  <Toggle 
                    pressed={theme === 'dark'} 
                    onPressedChange={toggleTheme}
                    className="w-full flex items-center justify-center gap-2 py-2 font-vt323"
                  >
                    {theme === 'dark' ? (
                      <>
                        <PixelSvgIcon name="moon" className="h-5 w-5" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <PixelSvgIcon name="sun" className="h-5 w-5" />
                        <span>Light Mode</span>
                      </>
                    )}
                  </Toggle>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        
        {scrolled && (
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-background/20 z-20">
            <div 
              className="h-full bg-cow-purple transition-all duration-300 animate-pulse-neon"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>
        )}
      </header>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </>
  );
};

export default React.memo(Navbar);