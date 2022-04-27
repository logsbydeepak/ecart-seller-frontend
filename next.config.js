/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx"],
  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
};

module.exports = nextConfig;
