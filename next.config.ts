import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sgoncopyjgkcjgbnyrif.supabase.co',
      },
     
    ]
  }
};

export default nextConfig;
