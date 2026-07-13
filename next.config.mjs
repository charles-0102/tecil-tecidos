/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Fotos dos produtos hospedadas pelo Tiny ERP (anexos no S3).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/tiny-anexos-us/**",
      },
      {
        protocol: "https",
        hostname: "tiny-anexos-us.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
