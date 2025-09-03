# AI Coding Agent Instructions for Homepage Project

## Project Overview
This is a personal portfolio website built with Next.js 13+ and Nextra, showcasing product design work. The site uses MDX for content, features a custom theme system, and includes interactive canvas animations.

## Architecture & Key Patterns

### Content Structure
- **MDX Pages**: All content pages are `.mdx` files in `/pages` directory (e.g., `/pages/sberpro/index.mdx`)
- **Project Metadata**: Project cards data stored in `/pages/posts.json`
- **Static Assets**: Project images in `/pages/[project]/img/`, public assets in `/public/`

### Component Architecture
- **Theme Provider**: Custom Nextra theme at `/components/theme.tsx` handles layout, NDA protection, and metadata
- **Canvas Animation**: Interactive background animation in `/components/CanvasAnimation.js` using React hooks and canvas API
- **Card Components**: `CardsList.js` and `CardsListNdaVersion.js` for project showcase with NDA handling
- **Analytics**: Integrated Google Analytics (gtag) and Yandex Metrika for tracking

### Styling System
- **SCSS Modules**: Modular SCSS in `/styles/` with `variables.module.scss` exporting colors to JS
- **Color Theming**: Dark/light mode support via `color-scheme.scss` mixin system
- **Import Order**: `defaults.scss` → `layout.scss` → `typography-sans.scss` → `markdown.scss` → `color-scheme.scss` → `components.scss`

### NDA Protection Pattern
Pages check for `ndaPassed` cookie and show `PasswordPopup` component when accessing protected content. Cookie management uses `js-cookie` library.

## Developer Workflows

### Local Development
```bash
yarn dev        # Start development server on localhost:3000
yarn build      # Build for production
yarn start      # Start production server
```

### Adding New Projects
1. Add entry to `/pages/posts.json` with slug, image, title, tags
2. Create MDX file at `/pages/[project-name]/index.mdx`
3. Add images to `/pages/[project-name]/img/`
4. Set `nda: true` in posts.json for protected content

### Working with Components
- Components accept standard React props and spread them
- Canvas animations use `useRef` and `useEffect` for performance
- Color values imported from SCSS: `import globalColors from '../styles/variables.module.scss'`

## Important Conventions
- **Node Version**: Requires Node.js 22.x (specified in package.json)
- **Package Manager**: Uses Yarn 4.9.4 
- **Image Handling**: Next.js images are unoptimized (`unoptimized: true` in config)
- **Route Structure**: Nextra auto-generates routes from MDX file paths
- **Frontmatter**: MDX files require title, description, image, and slug metadata
