/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/chainsearch' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/chainsearch/' : '',
}

module.exports = nextConfig
