const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
            { protocol: 'https', hostname: 'mineskin.eu' },
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import '@style/variables.scss'; @import '@style/mixin';`,
    },
    async rewrites() {
        return [
            {
                source: '/api/minecraft/:path*',
                destination: 'https://api.tatamiserver.com/minecraft/:path*',
            },
        ];
    },
}

module.exports = nextConfig
