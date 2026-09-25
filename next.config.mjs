/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
