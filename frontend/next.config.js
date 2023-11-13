/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // todo
        hostname: '*',
      },
    ],
  },
  rewrites: async () => [
    {
      destination: `${process.env.BACKEND_URL}/v1/:path*`,
      source: '/api/v1/:path*',
    },
    {
      destination: `${process.env.BACKEND_URL}/storage/:path*`,
      source: '/storage/:path*',
    },
  ],
};

module.exports = nextConfig;
