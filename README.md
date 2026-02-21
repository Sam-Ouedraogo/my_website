# Samuel W. Ouedraogo - Personal Website

Modern personal portfolio website built with Next.js 14, featuring a blog system with admin panel.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Rich Text Editor**: TipTap
- **Deployment**: Vercel

## Features

- Responsive portfolio with dark/light theme
- Blog system with pagination
- Admin panel with rich text editor
- Protected routes with NextAuth.js
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Vercel Postgres)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal_website.git
cd personal_website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:
```env
# Database
DATABASE_URL="postgres://..."
DIRECT_URL="postgres://..."

# NextAuth
AUTH_SECRET="your-secret-key"
AUTH_URL="http://localhost:3000"

# Admin
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
```

4. Set up the database:
```bash
npm run db:push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
personal_website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── blog/               # Blog pages
│   │   ├── admin/              # Admin panel
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   ├── home/               # Home page sections
│   │   ├── blog/               # Blog components
│   │   └── admin/              # Admin components
│   └── lib/
│       ├── prisma.ts           # Prisma client
│       └── auth.ts             # NextAuth config
├── prisma/
│   └── schema.prisma           # Database schema
├── public/
│   └── assets/                 # Images and files
└── scripts/
    └── seed-admin.ts           # Admin seeding script
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed admin user

## Deployment to Vercel

1. Push your code to GitHub

2. Connect the repository to Vercel

3. Add environment variables in Vercel:
   - `DATABASE_URL` (from Vercel Postgres)
   - `DIRECT_URL` (from Vercel Postgres)
   - `AUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `AUTH_URL` (your domain, e.g., `https://samuelwouedraogo.com`)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

4. Deploy! Vercel will automatically run the build command.

5. After deployment, run the seed script to create the admin user:
```bash
vercel env pull .env.local
npm run db:seed
```

## Custom Domain

1. Add your domain in Vercel project settings
2. Update DNS records as instructed by Vercel
3. The CNAME file in `/public/CNAME` will be served automatically

## License

MIT
