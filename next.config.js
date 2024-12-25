/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disable type checking
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout, for nextjs seo tags
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'http',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
        {
           protocol: "https",
           hostname: "**",
         },
         {
          protocol: 'http',
          hostname: '**',
        }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:5174/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
