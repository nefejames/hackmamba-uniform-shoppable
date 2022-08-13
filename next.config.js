/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    cloudname: process.env.CLOUDINARY_CLOUDNAME,
    storefront: process.env.BIGCOMMERCE_STOREFRONT,
  },
};

module.exports = nextConfig;
