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
  },
  // Сборка в один поток для платформ с маленьким билд-контейнером
  // (Deno Deploy даёт 3 GiB). Включается только через LOW_MEMORY_BUILD.
  ...(process.env.LOW_MEMORY_BUILD === '1'
    ? { experimental: { cpus: 1, workerThreads: false } }
    : {})
})