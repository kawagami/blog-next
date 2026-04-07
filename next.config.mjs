/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'axum.kawa.homes',
                port: '',
                pathname: '/uploads/**'
            },
        ]
    },
    reactStrictMode: false,
    experimental: {
        serverActions: {
            allowedOrigins: ["kawa.homes", "next-blog:3000"]
        }
    }
};

export default nextConfig;
