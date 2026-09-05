import nextra from 'nextra'

/** @type {import('next').NextConfig} */
const withNextra = nextra({
  theme: './components/theme.tsx',
  staticImage: true,
  latex: true
})

export default withNextra({
  // Cloudflare и Render не умеют обслуживать серверный вывод .next —
  // сайт целиком статический, поэтому экспортируем в out/
  output: 'export',
  // Вложенные index.html вместо плоских cv.html: папку с индексом
  // умеют отдавать все статические серверы, extension fallback — не все
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
})
