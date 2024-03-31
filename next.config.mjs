/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'kawa.homes',
            port: '',
            pathname: '/storage/**'
        }]
    }
};

export default nextConfig;
