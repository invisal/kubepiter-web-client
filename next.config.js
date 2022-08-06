const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.resolve(__dirname, "node_modules")],
  },
  publicRuntimeConfig: {
    endpoint: process.env.ENDPOINT,
  },
};

module.exports = nextConfig;
