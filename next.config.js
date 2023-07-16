/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        formats: ['image/webp'],
        domains: ['republic-new.keep-calm.ru', 'republic.ru'],
        minimumCacheTTL: 1200,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://republic-new.keep-calm.ru/api/:path*', // Proxy to Backend
            },
        ];
    },
    webpack(config, { dev, isServer }) {
        if (dev && isServer) {
            const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
            config.plugins.push(new ForkTsCheckerWebpackPlugin());
        }
        return config;
    },
};

module.exports = nextConfig;
