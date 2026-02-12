/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable static export for optimal SEO and performance
  // Comment this out if you need server-side features
  // output: 'export',

  // Image optimization
  images: {
    unoptimized: false,
  },

  // Compiler options for styled-components
  compiler: {
    styledComponents: true,
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Webpack config for Three.js and other dependencies
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }]
    return config
  },
}

module.exports = nextConfig
