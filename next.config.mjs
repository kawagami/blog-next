/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'kawa.homes',
                port: '',
                pathname: '/storage/**'
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/**'
            },
        ]
    },
    env: {
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    },
    reactStrictMode: false,
    experimental: {
        serverActions: {
            allowedOrigins: ["kawa.homes", "next-blog.kawa.homes", "next-blog:3000"]
        }
    }
};

export default nextConfig;
