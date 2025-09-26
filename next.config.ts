import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour hébergement statique IONOS
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Optimisation des images pour hébergement statique
  images: {
    unoptimized: true,
  },
  
  // Désactiver ESLint pour le build de production
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Désactiver TypeScript errors pour le build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
