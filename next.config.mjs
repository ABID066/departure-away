/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/exclusive-offers/travel-package-details',
                destination: '/shared/travel-package-details',
            },
            {
                source: '/travel-packages/travel-package-details',
                destination: '/shared/travel-package-details',
            },
        ];
    },
};

export default nextConfig;
