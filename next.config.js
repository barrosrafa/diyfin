/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure we use the correct output for Cloud Run if needed
  output: 'standalone',
};

export default nextConfig;
