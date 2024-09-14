/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Allow both HTTP and HTTPS
        hostname: '**', // Allow any hostname
        port: '', // Allow any port
        pathname: '**', // Allow any path
      },
    ],
  },
}

export default nextConfig
