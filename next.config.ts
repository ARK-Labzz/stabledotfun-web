import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { pathname: "/logos/**", protocol: "https", hostname: "cryptologos.cc" },
      {
        pathname: "/icons/**",
        protocol: "https",
        hostname: "iconic.dynamic-static-assets.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@dynamic-labs/sdk-react-core"],
  },
};

export default nextConfig;
