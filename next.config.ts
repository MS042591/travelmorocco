import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/travelmorocco', // Required for GitHub Pages project sites
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
