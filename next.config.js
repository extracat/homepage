/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: './components/theme.tsx',
  staticImage: true,
  latex: true
})

module.exports = withNextra({
  // Other Next.js configurations
  images: {
    unoptimized: true,
  }
})