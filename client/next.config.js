/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 630782773,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "5f2a194872e025db917d8e7dc1e93040",
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
