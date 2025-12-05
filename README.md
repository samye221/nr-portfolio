# NR - Photography Portfolio

Elegant and minimalist photography portfolio for luxury & fashion photographer.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Images**: Cloudinary + next-cloudinary
- **Hosting**: Vercel

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your Cloudinary credentials in .env.local
```

## Environment Variables

### GitHub Secrets (already configured)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Local (.env.local)
Use the same variable names for local development.

## Development

```bash
# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint

# Format code
npm run format
```

Site will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nr-portfolio/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── gallery/          # Gallery components
│   ├── ui/               # Reusable UI components
│   └── contact/          # Contact form components
├── lib/                   # Utilities and configurations
│   ├── cloudinary.ts     # Cloudinary config (client)
│   └── cloudinary-server.ts # Cloudinary API (server)
├── types/                 # TypeScript types
│   ├── image.ts
│   └── project.ts
└── public/               # Static assets
    ├── fonts/
    └── images/
```

## Cloudinary Configuration

### Folder Structure

```
nr-portfolio/
├── projects/
│   ├── chanel-2024/
│   │   ├── cover.jpg
│   │   ├── 001.jpg
│   │   └── 002.jpg
│   └── dior-fw23/
│       └── ...
└── portfolio/
    ├── img-001.jpg
    └── img-002.jpg
```

### Naming Convention

- **Projects**: `projects/{slug}/{number}.{ext}`
- **Project cover**: `projects/{slug}/cover.{ext}`
- **Portfolio**: `portfolio/{id}.{ext}`

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Environment variables (already configured in GitHub)
# Vercel will automatically sync them from GitHub

# Production deployment
vercel --prod
```

### Automatic Configuration

Vercel automatically detects Next.js and configures:
- Optimized build
- Global edge CDN
- Automatic HTTPS
- Image optimization
- Brotli compression

## Performance

- **SSR/SSG**: Pre-rendered pages for optimal SEO
- **Image Optimization**: Cloudinary + Next.js Image
- **Lazy Loading**: On-demand image loading
- **Modern Formats**: Automatic WebP/AVIF
- **Optimized Bundle**: Code splitting per route

## License

Private - All rights reserved
