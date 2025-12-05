/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
  },
}

module.exports = nextConfig
