/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => {
    const api_url = `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`;
    return [
      {
        // api urls
        source: '/_f/:path*',
        destination: `${api_url}/:path*`,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
