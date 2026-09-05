/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: './components/theme.tsx',
  staticImage: true,
  latex: true
})

module.exports = withNextra({
  // Cloudflare и Render не умеют обслуживать серверный вывод .next —
  // сайт целиком статический, поэтому экспортируем в out/
  output: 'export',
  images: {
    unoptimized: true,
  }
})