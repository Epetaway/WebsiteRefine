/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/earldkaiju/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/earldkaiju' : '',
  transpilePackages: ['lucide-react']
}

export default nextConfig