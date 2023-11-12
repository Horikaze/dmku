/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "static.zerochan.net",
      },
    ],
  },
};

module.exports = nextConfig;
