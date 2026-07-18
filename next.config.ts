import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.66'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dgad4xyuc/**', // your Cloudinary cloud name — narrows the allow-list to just your account
      },
    ],
  },
};

export default nextConfig;