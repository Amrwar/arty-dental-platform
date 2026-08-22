/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // `domains` was the old spelling of this and Next warns on it now.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
