/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = {
  env: {
    TNL_API_KEY: process.env.TNL_API_KEY,
  },
};