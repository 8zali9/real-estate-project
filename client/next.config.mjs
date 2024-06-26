/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'k4terrastorage.blob.core.windows.net',
              port: '',
              pathname: '**',
            },
          ],
    },
    reactStrictMode:false,
};

export default nextConfig;
