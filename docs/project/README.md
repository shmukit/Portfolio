# 🎨 Interactive Portfolio

A sleek, minimalist portfolio website featuring a vertical timeline layout, smooth animations, and modern design patterns.

## ✨ Features

- **Vertical Timeline**: Clean, organized project timeline by year
- **Interactive Cards**: Hover effects and smooth animations
- **Detail Panels**: Slide-in project details with rich content
- **Mobile Responsive**: Adaptive layout for all screen sizes
- **Modern Stack**: Next.js 15, Tailwind CSS, Framer Motion, Supabase
- **Performance Optimized**: Fast loading with skeleton states
- **Accessibility**: Keyboard navigation and ARIA support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **TypeScript**: Full type safety
- **Deployment**: Vercel

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── components/               # React components
│   │   ├── Sidebar.tsx           # Desktop navigation
│   │   ├── MobileNav.tsx         # Mobile navigation
│   │   ├── Timeline.tsx          # Main timeline container
│   │   ├── ProjectCard.tsx       # Individual project cards
│   │   ├── ProjectDetailPanel.tsx # Project detail modal
│   │   └── ErrorBoundary.tsx     # Error handling
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/                          # Utility libraries
│   ├── hooks/                    # Custom React hooks
│   ├── supabase.ts               # Database client
│   ├── sample-data.ts            # Development data
│   └── utils/animations.ts       # Animation utilities
├── types/                        # TypeScript definitions
└── public/                       # Static assets
```

## 🎯 Key Components

### Sidebar
Fixed left navigation with year-based timeline navigation.

### Project Cards
Interactive cards with hover animations and click-to-expand functionality.

### Detail Panel
Slide-in panel showing comprehensive project information.

### Timeline
Main container organizing projects by year with scroll animations.

## 🗄️ Database Schema

### Projects Table (Supabase)

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  lessons TEXT,
  image_url TEXT,
  order_index INTEGER,
  category TEXT,
  is_unlocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Environment Variables**: Add your Supabase credentials
3. **Deploy**: Automatic deployments on push to main

### Manual Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Adding Projects

1. **Via Supabase Dashboard**: Add records to the `projects` table
2. **Via Code**: Update `lib/sample-data.ts` for development

### Styling

- **Colors**: Modify CSS custom properties in `app/globals.css`
- **Typography**: Update font imports and CSS variables
- **Animations**: Customize Framer Motion variants in `lib/utils/animations.ts`

### Content

- **Personal Info**: Update components in `app/components/`
- **Contact Details**: Modify `Contact.tsx`
- **Tools**: Update `Tools.tsx`

## 📱 Responsive Design

- **Desktop (1200px+)**: Full sidebar + main content layout
- **Tablet (768px-1199px)**: Compact sidebar + responsive content
- **Mobile (<768px)**: Hamburger menu + full-width layout

## ⚡ Performance

- **Image Optimization**: Next.js Image component with lazy loading
- **Animation Performance**: GPU-accelerated transforms
- **Bundle Optimization**: Tree shaking and code splitting
- **Loading States**: Skeleton components for better UX

## 🔒 Security

- **CSP Headers**: Content Security Policy via Vercel
- **Environment Variables**: Secure credential management
- **Error Boundaries**: Graceful error handling

## 🎯 SEO & Accessibility

- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Descriptive labels and live regions
- **Color Contrast**: WCAG AA compliance

## 🧪 Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using modern web technologies**
