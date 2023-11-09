/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
      },
      {
        hostname: "static.zerochan.net",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};

module.exports = nextConfig;
