/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google avatar
      "avatars.githubusercontent.com", // GitHub avatar
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;