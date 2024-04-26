import UnoCSS from '@unocss/webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      UnoCSS({
        mode: 'global',
      }),
    );
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
  transpilePackages: ["@ant-design/icons"],
};

export default nextConfig;
