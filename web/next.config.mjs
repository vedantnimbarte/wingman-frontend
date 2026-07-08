/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Marketing site is fully static; keep it that way.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
