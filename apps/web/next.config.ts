import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(test|spec)\.(ts|tsx)$/,
        loader: 'ignore-loader',
      });
    }
    return config;
  },
};

export default nextConfig;