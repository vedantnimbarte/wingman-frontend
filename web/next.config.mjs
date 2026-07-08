/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site — export to `out/` so any static host (and the
  // Pagefind full-text index) can serve it directly.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
