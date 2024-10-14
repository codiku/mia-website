/** @type {import('next').NextConfig} */

const config = {
  reactStrictMode: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default config;
