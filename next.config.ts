import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'magazine.urbanicon.co.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wallpapers-clan.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ao7yj2lbhl.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'www.lemocovuxypy.us',
      'www.nedabyvyqoz.tv',
      'www.bamybymuseribib.info',
      'mawatu.co.id',
      'magazine.urbanicon.co.id',
      'wallpapers-clan.com',
      'encrypted-tbn0.gstatic.com',
      'ao7yj2lbhl.ufs.sh'
    ],
  },
};

export default nextConfig;
