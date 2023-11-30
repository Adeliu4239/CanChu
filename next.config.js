/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['i.imgur.com', 'dylan-canchu-api.octave.vip'],
  },
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
  },
  async redirects() {
    return [
      {
        source: '/(login|signup)',
        has: [
          {
            type: 'cookie',
            key: 'token',
          },
        ],
        permanent: false,
        destination: '/',
      },
      {
        source: '/(|posts/demo|user/demo|user/.*)',
        missing: [
          {
            type: 'cookie',
            key: 'token',
          },
        ],
        permanent: false,
        destination: '/login',
      },
    ];
  },
};

module.exports = nextConfig;
