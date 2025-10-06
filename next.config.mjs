/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configure rewrites for API proxy (similar to Vite proxy)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },

  // Environment variables accessible on client side
  env: {
    // Next.js automatically loads .env files
    // All environment variables are accessible via process.env
  },

  // Skip type checking and linting during build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Webpack configuration for environment variables
  webpack: (config, { isServer }) => {
    // Make all environment variables available
    config.plugins = config.plugins || [];
    
    return config;
  },

  // Image optimization
  images: {
    domains: ['renderdragon.org', 'api.mineatar.io', 'vzge.me', 'nmsr.nickac.dev'],
    unoptimized: false,
  },

  // Disable static generation - this is a client-side app
  // output: 'export', // Uncomment for static export
  
  // Trailing slash configuration (to match Vite behavior)
  trailingSlash: false,
  
  // Experimental features for app directory
  experimental: {
    // Force dynamic rendering for all routes
  },

  // Production source maps
  productionBrowserSourceMaps: false,
};

export default nextConfig;
