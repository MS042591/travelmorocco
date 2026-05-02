import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/travelmorocco', // Uncomment this if deploying to a GitHub project page (e.g., username.github.io/travelmorocco)
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
