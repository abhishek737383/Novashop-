/** @type {import('next').NextConfig} */
const nextConfig = {
  // === STATIC EXPORT ===
  // Instruct Next.js to produce a fully static site via `next export`
  output: 'export',

  // === REACT & ESLINT SETTINGS ===
  reactStrictMode: true,
  eslint: {
    // Warning: turns off all ESLint checks during `next build`
    ignoreDuringBuilds: true,
  },

  // === IMAGE DOMAINS ===
  images: {
    domains: [
      'res.cloudinary.com',
      'upload.wikimedia.org',
      'images.unsplash.com',
      'localhost',
    ],
  },

  // === (OPTIONAL) BASE PATH / ASSET PREFIX ===
  // If you ever serve from a subdirectory (e.g. GitHub Pages),
  // uncomment and adjust:
  // basePath: '/your-subdir',
  // assetPrefix: '/your-subdir/',
};

module.exports = nextConfig;
