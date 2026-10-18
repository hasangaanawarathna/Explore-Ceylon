import type { NextConfig } from "next";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseImagePattern = supabaseUrl
  ? new URL("/storage/v1/object/public/**", supabaseUrl)
  : undefined;

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
      }
    : {}),
  images: {
    unoptimized: true,
    ...(supabaseImagePattern ? { remotePatterns: [supabaseImagePattern] } : {}),
  },
};

export default nextConfig;
