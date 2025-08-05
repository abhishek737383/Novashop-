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
  },
  eslint: {
    // WARNING: you’ll skip *all* lint errors, including real bugs!
    ignoreDuringBuilds: true,
  },
};
