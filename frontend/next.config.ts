/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "upload.wikimedia.org",
      "images.unsplash.com",
      "localhost",
    ],
  eslint: {
    // Warning: turns off all ESLint checks during `next build`
    ignoreDuringBuilds: true,
  },
  },
};
