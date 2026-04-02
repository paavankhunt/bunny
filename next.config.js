/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'https://bunny-chat.vercel.app/',
      },
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

const withPWA = require('next-pwa');
module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});

module.exports = nextConfig;
