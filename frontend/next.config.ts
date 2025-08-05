/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // still skips ESLint during next build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "upload.wikimedia.org",
      "images.unsplash.com",
      "localhost",
    ],
  },
  // output: 'export',    // ← removed so we get SSR / serverless functions
};

module.exports = nextConfig;
