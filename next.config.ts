import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { pathname: "/logos/**", protocol: "https", hostname: "cryptologos.cc" },
    ],
  },
};

export default nextConfig;
