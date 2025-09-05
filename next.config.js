/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // This is important for Cloudflare Pages
  },
};

module.exports = nextConfig;