/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // تقليل حجم bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
export default nextConfig
