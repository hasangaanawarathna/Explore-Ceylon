import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Explore-Ceylon",
  assetPrefix: "/Explore-Ceylon/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
