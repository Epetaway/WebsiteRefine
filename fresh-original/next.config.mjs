import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkCodeTitles from './src/lib/remark-code-title.mjs';
import rehypePresetMinify from 'rehype-preset-minify';
import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkCodeTitles],
    rehypePlugins: [rehypePrismPlus, rehypePresetMinify],
  },
});

const nextConfig = withMDX({
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
