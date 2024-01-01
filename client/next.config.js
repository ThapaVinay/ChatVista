/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
