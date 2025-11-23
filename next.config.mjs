/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bukukita.com",
      },
      {
        protocol: "https",
        hostname: "cdn.bukukita.com", // jaga-jaga kalau dia pakai cdn
      },
    ],
  },
};

export default nextConfig;
