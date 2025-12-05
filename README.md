# NR Portfolio

Minimalist photography portfolio for Nathan Robin, a luxury & fashion photographer.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Cloudinary (Node SDK)
- **Hosting**: Vercel

## Features

- **Dual Navigation**: Toggle between Projects view (grouped by project) and Portfolio view (all images)
- **Gallery**: Full-screen image viewer with keyboard navigation and swipe support
- **Custom Cursor**: Branded cursor with contextual states
- **SEO Optimized**: Dynamic metadata, Open Graph images, structured data
- **Responsive**: Mobile-first design with fluid typography

## Installation

```bash
pnpm install

cp .env.example .env.local
```

Configure Cloudinary credentials in `.env.local`:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Development

```bash
pnpm dev         # Start dev server (Turbopack) at http://localhost:3000
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # Lint code
pnpm format      # Format code with Prettier
```

## Project Structure

```
nr-portfolio/
├── app/                    # Next.js App Router pages
│   ├── [slug]/            # Project routes
│   ├── portfolio/         # Portfolio routes
│   └── globals.css        # Global styles
├── components/
│   ├── cursor/            # Custom cursor system
│   ├── gallery/           # Image gallery components
│   ├── layout/            # Header, Initials
│   ├── portfolio/         # Portfolio-specific components
│   └── project/           # Project-specific components
├── lib/
│   ├── services/          # Cloudinary data fetching
│   └── constants.ts       # Site configuration
└── types/                 # TypeScript definitions
```

## Cloudinary Setup

Images are organized in folders per project:
```
nr-portfolio/
└── projects/
    ├── project-slug/
    │   ├── image-001.jpg
    │   └── image-002.jpg
    └── another-project/
```

Image metadata (caption, credits, alt text) is managed via Cloudinary context fields.

## License

Private - All rights reserved
