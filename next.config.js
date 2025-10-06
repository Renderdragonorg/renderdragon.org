/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
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

  // Output configuration for static export if needed
  // output: 'export', // Uncomment for static export
  
  // Trailing slash configuration (to match Vite behavior)
  trailingSlash: false,

  // Production source maps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
