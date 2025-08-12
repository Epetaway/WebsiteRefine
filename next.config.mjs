import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrismPlus, rehypePresetMinify],
  },
});

const nextConfig = withMDX({
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/earldkaiju/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/earldkaiju' : '',
  transpilePackages: ['lucide-react']
});

export default nextConfig;