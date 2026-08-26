/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // The flat config serialization warning is non-critical
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;
