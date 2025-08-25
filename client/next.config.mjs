/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Keep the old one just in case
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Add the new Pexels hostname
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
