/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sku/:slug",
        destination: "/p/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;


