/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Ignore ESLint and TypeScript errors during build (for demo)
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    // Image optimization configuration
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        formats: ["image/avif", "image/webp"],
    },

    // Headers for security and performance
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
        ];
    },

    // Redirects
    async redirects() {
        return [
            {
                source: "/dashboard",
                destination: "/portal",
                permanent: true,
            },
            {
                source: "/signup",
                destination: "/login?signup=true",
                permanent: true,
            },
        ];
    },

    // Experimental features
    experimental: {
        // Enable server actions
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },

    // Logging configuration
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
