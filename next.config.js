/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: './components/theme.tsx',
  latex: true
})

module.exports = withNextra({
  // Other Next.js configurations

})