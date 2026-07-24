# Product Requirements Document (PRD)
## Personal Bento-Style Link Website

**Version:** 1.0  
**Date:** 2026-07-24  
**Status:** Draft

---

## 1. Overview

### 1.1 Project Vision
A modern, customizable personal landing page inspired by Bento.me that serves as a central hub for sharing links, showcasing work, and presenting your online presence in a visually appealing grid-based layout.

### 1.2 Problem Statement
- Bento.me has shut down, leaving users without a customizable link-in-bio solution
- Existing alternatives like own.page are limited in functionality and customization
- Need a self-hosted solution that's easy to update without touching code

### 1.3 Goals
- Create a beautiful, responsive personal landing page
- Enable easy content updates without code changes
- Showcase personality through custom layouts and styling
- Fast performance and excellent UX
- Self-hosted and fully owned

---

## 2. User Personas

### Primary User: You (Content Owner)
- **Needs:** Quick updates to links, images, and content
- **Technical Level:** Developer with coding skills but wants convenience
- **Use Cases:** 
  - Update social media links
  - Add new projects or portfolio items
  - Change profile photo
  - Modify bio/description
  - Rearrange card layout

### Secondary Users: Visitors
- **Needs:** Quick access to your links and information
- **Technical Level:** Non-technical
- **Use Cases:**
  - Find social media profiles
  - Access portfolio/projects
  - Contact you
  - Learn about your work

---

## 3. Functional Requirements

### 3.1 Core Features (MVP)

#### Profile Section
- Profile photo/avatar
- Name/display name
- Bio/tagline (short description)
- Location (optional)

#### Bento Grid Layout
- Flexible grid system (customizable columns)
- Different card sizes (1x1, 1x2, 2x1, 2x2, etc.)
- Card types:
  - **Link Card:** Icon + text + URL
  - **Social Card:** Social media platform with icon
  - **Image Card:** Featured image/photo
  - **Text Card:** Longer text content
  - **Project Card:** Project showcase with image + description
  - **Contact Card:** Email/contact form trigger

#### Content Management
- JSON/YAML-based configuration file for all content
- No need to edit code for updates
- Easy to add/remove cards
- Drag-and-drop position configuration (via config)

#### Design & UX
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Hover effects on cards
- Dark mode support (optional for MVP)
- Accessibility compliant (WCAG 2.1 AA)

### 3.2 Technical Requirements

#### Performance
- Page load time < 2 seconds
- Lighthouse score > 90
- Optimized images (Next.js Image component)
- Static generation for instant loading

#### SEO & Meta
- Open Graph tags
- Twitter Card tags
- Customizable meta description
- Favicon support

#### Analytics (Optional for MVP)
- Track card clicks
- Basic visitor analytics

---

## 4. Content Management Strategy

### 4.1 Configuration File Structure
Use a single `content.json` or `content.yaml` file containing:

```json
{
  "profile": {
    "name": "Your Name",
    "bio": "Your bio",
    "avatar": "/images/avatar.jpg",
    "location": "City, Country"
  },
  "cards": [
    {
      "id": "card-1",
      "type": "link",
      "title": "GitHub",
      "icon": "github",
      "url": "https://github.com/username",
      "size": "1x1",
      "position": 0
    },
    {
      "id": "card-2",
      "type": "project",
      "title": "Project Name",
      "description": "Short description",
      "image": "/images/project.jpg",
      "url": "https://project.com",
      "size": "2x1",
      "position": 1
    }
  ],
  "theme": {
    "primaryColor": "#3b82f6",
    "accentColor": "#8b5cf6"
  }
}
```

### 4.2 Asset Management
- Store images in `/public/images/`
- Support for external image URLs
- Automatic image optimization via Next.js

### 4.3 Update Workflow
1. Edit `content.json` file
2. Commit changes (if using Git)
3. Push to deployment platform (auto-deploys)
4. Or: Use a simple admin UI (future enhancement)

---

## 5. Design Requirements

### 5.1 Visual Style
- Modern, clean aesthetic
- Card-based layout with proper spacing
- Smooth shadows and depth
- Subtle animations (hover, click)
- Consistent icon style (lucide-react or similar)

### 5.2 Layout
- Maximum width: 1200px
- Responsive breakpoints:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3-4 columns
- Configurable grid gap

### 5.3 Color Scheme
- Customizable via theme configuration
- Support for light/dark mode (future)
- Accessible color contrast ratios

### 5.4 Typography
- Clean, readable fonts
- Hierarchy: Name > Bio > Card titles > Card text
- Font stack: System fonts or Google Fonts

---

## 6. User Flows

### 6.1 Visitor Flow
1. Land on page
2. See profile section (name, avatar, bio)
3. Scroll to view Bento grid cards
4. Click on card → navigate to link/open modal
5. Interact with social cards → visit social profiles

### 6.2 Content Update Flow (Owner)
1. Open `content.json` in editor
2. Modify content (add/edit/delete cards)
3. Save file
4. Push to Git repository
5. Automatic deployment
6. View updated page

---

## 7. Technical Constraints

### 7.1 Must Have
- Fast build times
- Easy deployment (Vercel/Netlify)
- No backend database required (static generation)
- Mobile-first approach

### 7.2 Should Have
- TypeScript for type safety
- Component-based architecture
- Reusable card components
- Configuration validation

### 7.3 Nice to Have
- Admin UI for content editing
- Live preview in dev mode
- Card templates/presets
- Import from Linktree/other platforms

---

## 8. Success Metrics

### 8.1 Technical Metrics
- Lighthouse Performance Score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle size < 200KB (initial load)

### 8.2 User Experience Metrics
- Mobile responsive on all devices
- Accessible (keyboard navigation, screen readers)
- Works on all modern browsers

### 8.3 Maintenance Metrics
- Content update time < 2 minutes
- Zero downtime deployments
- Easy to understand code for future modifications

---

## 9. Out of Scope (for MVP)

- User authentication/multi-user support
- Backend API
- Database integration
- Complex analytics dashboard
- Content scheduling
- A/B testing
- Custom domain management UI
- Payment integration
- Blog/CMS functionality

---

## 10. Future Enhancements (Post-MVP)

### Phase 2
- Admin UI for content editing (no-code editor)
- Dark mode toggle
- Advanced analytics dashboard
- Custom CSS per card
- Animation presets

### Phase 3
- Multi-page support
- Contact form functionality
- Newsletter signup integration
- Social media feed integration
- QR code generator

### Phase 4
- Multi-user/multi-site support
- Template marketplace
- Export/import configurations
- Collaboration features

---

## 11. Technical Dependencies

### Core Stack
- **Framework:** Next.js 14+ (App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** lucide-react

### Additional Libraries
- **Validation:** Zod (for config validation)
- **Animation:** Framer Motion (optional)
- **Image Optimization:** Next.js Image
- **Fonts:** next/font

### Development Tools
- **Package Manager:** pnpm/npm/yarn
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode

### Deployment
- **Hosting:** Vercel (recommended) / Netlify / Cloudflare Pages
- **Domain:** Custom domain support
- **CI/CD:** Git-based deployment

---

## 12. Project Timeline (Estimated)

### Week 1: Setup & Foundation
- Project initialization
- Tech stack setup
- Base layout and routing
- Design system implementation

### Week 2: Core Features
- Profile section
- Bento grid system
- Card components (all types)
- Configuration system

### Week 3: Polish & Testing
- Responsive design refinement
- Accessibility testing
- Performance optimization
- SEO implementation

### Week 4: Deployment & Documentation
- Production deployment
- Documentation (README, setup guide)
- Content update guide
- Bug fixes and refinements

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Over-engineering the solution | High | Focus on MVP, avoid premature abstractions |
| Poor mobile experience | High | Mobile-first design approach |
| Difficult content updates | High | Simple JSON structure with clear documentation |
| Slow page load | Medium | Static generation, image optimization |
| Configuration errors | Medium | Schema validation with Zod |
| Browser compatibility | Low | Use Next.js defaults, progressive enhancement |

---

## 14. Assumptions

- Single user (you) will manage the content
- Content updates happen via Git workflow (for MVP)
- Hosting on Vercel or similar platform
- Modern browser support only (last 2 versions)
- No real-time updates needed
- Static content (no dynamic data fetching)

---

## 15. Acceptance Criteria

### MVP is complete when:
- [x] All card types are implemented and functional
- [x] Configuration file controls all content
- [x] Responsive on mobile, tablet, and desktop
- [x] Meets accessibility standards
- [x] Lighthouse score > 90
- [x] Deployed to production
- [x] Documentation complete
- [x] Content can be updated in < 2 minutes

---

## Appendix

### References
- Bento.me (archived/screenshots)
- own.page (current alternative)
- Linktree (competitor)
- Bio.link (competitor)

### Glossary
- **Bento Grid:** A flexible grid layout inspired by Japanese bento boxes
- **Link-in-bio:** A landing page for social media profile links
- **Static Generation:** Pre-rendering pages at build time
- **SSG:** Static Site Generation
