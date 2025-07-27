import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { pathname: "/logos/**", protocol: "https", hostname: "cryptologos.cc" },
    ],
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cryptologos\.cc\/logos\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'crypto-logos',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, 
        },
      },
    },
  ],
  // @ts-ignore - Type compatibility issue between Next.js and next-pwa
})(nextConfig);