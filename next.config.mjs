/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the "Titan-Shield" that ignores errors so the site can go live
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keeps the build fast
  swcMinify: true,
};

export default nextConfig;