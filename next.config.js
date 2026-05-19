/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jobandu.de',
      },
    ],
  },
}

module.exports = nextConfig
