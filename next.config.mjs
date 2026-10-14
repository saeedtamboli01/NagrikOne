// GITHUB_PAGES=true builds a static site (no API routes) for GitHub Pages.
// Normal builds (Vercel / local) keep the full server features.
const isPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  ...(isPages && {
    output: 'export',
    basePath: '/NagrikOne',
    trailingSlash: true,
    images: { unoptimized: true }
  })
};

export default nextConfig;
