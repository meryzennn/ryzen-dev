# Personal Bento-Style Link Website

A modern, customizable personal landing page inspired by Bento.me with a grid-based layout for sharing links, projects, and your online presence.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## Features

- **🎨 Beautiful Bento Grid Layout** - Flexible card-based design with multiple sizes
- **⚡ Lightning Fast** - Static generation with Next.js 14 for instant loading
- **📱 Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **🎯 Easy to Update** - No code changes needed, just edit a JSON file
- **♿ Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- **🎭 Customizable Theme** - Change colors via configuration
- **🔒 Type Safe** - Full TypeScript support with runtime validation
- **🚀 One-Click Deploy** - Deploy to Vercel in seconds

---

## Quick Start

### Prerequisites

- Node.js 18.0 or higher
- Git
- A code editor (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/personal-bento.git
cd personal-bento

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | lucide-react |
| Validation | Zod |
| Deployment | Vercel |

---

## Project Structure

```
personal-bento/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── profile/             # Profile section components
│   ├── cards/               # Card type components
│   └── grid/                # Grid layout component
├── lib/
│   ├── content.ts           # Content loader
│   ├── schemas.ts           # Zod validation schemas
│   └── utils.ts             # Utility functions
├── types/
│   └── content.ts           # TypeScript type definitions
├── data/
│   └── content.json         # ⭐ Your content (edit this!)
├── public/
│   └── images/              # Your images
├── docs/                     # Documentation
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── TECH_STACK.md
│   ├── DATA_SCHEMA.md
│   ├── ROADMAP.md
│   ├── DESIGN_SYSTEM.md
│   ├── CONTENT_GUIDE.md
│   └── DEPLOYMENT.md
└── README.md                # This file
```

---

## Updating Your Content

All your content lives in `data/content.json`. This single file controls:
- Your profile (name, bio, avatar, location)
- All your cards (links, projects, social media)
- Theme colors

### Example: Add a Social Media Link

```json
{
  "id": "twitter",
  "type": "social",
  "position": 1,
  "size": "1x1",
  "visible": true,
  "platform": "Twitter",
  "username": "@yourusername",
  "url": "https://twitter.com/yourusername",
  "icon": "twitter"
}
```

**For detailed instructions, see [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)**

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building
npm run build            # Create production build
npm run start            # Start production server (after build)

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript types
npm run format           # Format code with Prettier

# Testing (if configured)
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
```

---

## Content Schema

Your `content.json` has four main sections:

### 1. Profile

```json
"profile": {
  "name": "Your Name",
  "bio": "Your tagline or description",
  "avatar": "/images/avatar.jpg",
  "location": "City, Country"
}
```

### 2. SEO

```json
"seo": {
  "title": "Your Name - Developer",
  "description": "Personal links and portfolio...",
  "ogImage": "https://yoursite.com/og-image.jpg"
}
```

### 3. Cards

Six card types available:

| Type | Purpose |
|------|---------|
| `link` | Simple link to any URL |
| `social` | Social media profile with platform branding |
| `project` | Project showcase with image |
| `image` | Display an image or photo |
| `text` | Text content or note |
| `contact` | Email contact with pre-filled subject |

**Card sizes:** `1x1`, `1x2`, `2x1`, `2x2`

### 4. Theme

```json
"theme": {
  "primaryColor": "#3b82f6",
  "accentColor": "#8b5cf6"
}
```

**For complete schema documentation, see [DATA_SCHEMA.md](docs/DATA_SCHEMA.md)**

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Done! Your site will be live in ~2 minutes.

**For detailed deployment instructions, see [DEPLOYMENT.md](docs/DEPLOYMENT.md)**

### Other Platforms

- **Netlify:** Connect your GitHub repo in the Netlify dashboard
- **Cloudflare Pages:** Import from GitHub in Cloudflare dashboard
- **Self-hosted:** Run `npm run build` and serve the `.next` directory

---

## Customization

### Changing Colors

Edit `theme` in `data/content.json`:

```json
"theme": {
  "primaryColor": "#10b981",  // Green
  "accentColor": "#06b6d4"    // Teal
}
```

### Adding Custom Fonts

Update `app/layout.tsx`:

```typescript
import { Inter, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })
```

### Customizing Components

All components are in your project (not npm dependencies), so you can modify them directly:
- Cards: `components/cards/`
- Profile: `components/profile/`
- Grid: `components/grid/`

**For design specifications, see [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)**

---

## Development Workflow

### Making Changes

1. Edit `data/content.json` or component files
2. Save and check dev server (auto-refreshes)
3. Test on mobile (Chrome DevTools → Toggle Device Toolbar)
4. Commit changes: `git commit -m "Description"`
5. Push: `git push`
6. Vercel auto-deploys (2-3 minutes)

### Adding Images

1. Add image to `public/images/`
2. Reference in `content.json`: `"/images/filename.jpg"`
3. Images are automatically optimized by Next.js

### Testing Locally

```bash
# Test production build locally
npm run build
npm run start
```

---

## Performance

This site is optimized for speed:

- **Static Generation:** Pre-rendered at build time
- **Image Optimization:** WebP/AVIF, lazy loading, responsive sizes
- **Font Optimization:** Subsetted fonts, no layout shift
- **Bundle Size:** < 200KB initial load
- **Lighthouse Score:** 90+ across all metrics

### Optimization Tips

- Keep images under 500KB
- Limit cards to 20-30 for best performance
- Use WebP format when possible
- Compress images with [TinyPNG](https://tinypng.com)

---

## Accessibility

This site meets WCAG 2.1 AA standards:

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators on all interactive elements
- `alt` text for images

### Testing Accessibility

```bash
# Install axe DevTools browser extension
# Or run Lighthouse audit in Chrome DevTools
```

---

## Troubleshooting

### Build Fails

**Error:** "Content validation failed"

**Solution:** Check `data/content.json` syntax at [jsonlint.com](https://jsonlint.com)

Common issues:
- Missing commas between items
- Trailing commas at end of objects
- Invalid URLs (must start with `http://` or `https://`)
- Invalid hex colors (must start with `#`)

### Images Not Loading

**Solution:** 
- Check image is in `public/images/`
- Path should be `/images/file.jpg` (not `public/images/`)
- Check spelling and capitalization (case-sensitive!)

### Dev Server Won't Start

**Solution:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

---

## Documentation

Comprehensive documentation is available in the `docs/` directory:

| Document | Description |
|----------|-------------|
| [PRD.md](docs/PRD.md) | Product requirements and specifications |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture and component design |
| [TECH_STACK.md](docs/TECH_STACK.md) | Technology decisions and rationale |
| [DATA_SCHEMA.md](docs/DATA_SCHEMA.md) | Complete content.json schema reference |
| [ROADMAP.md](docs/ROADMAP.md) | Implementation timeline and milestones |
| [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Visual design specifications |
| [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) | User-friendly content update guide |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment instructions |
| [FLOWCHARTS.md](docs/FLOWCHARTS.md) | System diagrams and user flows |

---

## Contributing

This is a personal project, but feel free to fork and customize for your own use!

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/personal-bento.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add your feature"`
7. Push: `git push origin feature/your-feature`
8. Open a Pull Request

---

## License

MIT License - feel free to use this for your own personal website!

---

## Credits

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Inspired by [Bento.me](https://bento.me)

---

## Support

For questions or issues:

1. Check the [documentation](docs/)
2. Review the [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) for content updates
3. Check existing [GitHub Issues](https://github.com/yourusername/personal-bento/issues)
4. Open a new issue if needed

---

## Roadmap

### Current Version: 1.0.0
- ✅ All 6 card types
- ✅ Responsive design
- ✅ Theme customization
- ✅ JSON-based content
- ✅ One-click deployment

### Future Enhancements
- [ ] Dark mode toggle
- [ ] Admin UI for visual editing
- [ ] Contact form with backend
- [ ] Analytics dashboard
- [ ] More card types (video, embed)
- [ ] Animation presets
- [ ] Multiple page support

**See [ROADMAP.md](docs/ROADMAP.md) for detailed timeline**

---

## Quick Links

- [Live Demo](https://your-demo-site.vercel.app) (add your demo URL)
- [Documentation](docs/)
- [GitHub Repository](https://github.com/yourusername/personal-bento)
- [Vercel Deployment](https://vercel.com)

---

**Built with ❤️ and Next.js**
