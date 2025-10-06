# Technical Architecture

## Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page (timeline)
│   ├── globals.css              # Global styles and Tailwind imports
│   └── components/              # Client components
│       ├── Sidebar.tsx          # Year navigation
│       ├── ProjectCard.tsx      # Individual project preview
│       ├── ProjectDetailPanel.tsx # Slide-out detail view
│       ├── Timeline.tsx         # Main timeline container
│       └── animations/          # Reusable animation components
├── lib/                         # Utility libraries
│   ├── supabase.ts              # Supabase client configuration
│   ├── hooks/                   # Custom React hooks
│   │   ├── useProjects.ts       # Data fetching hook
│   │   ├── useScrollSpy.ts      # Scroll position tracking
│   │   └── usePanelState.ts     # Panel open/close state
│   └── utils/                   # Helper functions
│       ├── animations.ts        # Animation utilities
│       └── formatting.ts        # Text and data formatting
├── types/                       # TypeScript type definitions
│   ├── project.ts               # Project data types
│   └── ui.ts                    # UI component props
├── public/                      # Static assets
│   ├── images/                  # Project thumbnails and assets
│   └── icons/                   # UI icons
└── docs/                        # Project documentation
    ├── PROJECT_SPEC.md          # High-level requirements
    ├── INTERACTION_DESIGN.md    # UX specifications
    └── STYLE_GUIDE.md           # Visual design system
```

## Component Architecture

### Data Flow
```
Supabase → useProjects Hook → Timeline Component → ProjectCard Components
    ↑                                                           ↓
    └── ProjectDetailPanel ←───────── Panel State ←──────────────┘
```

### State Management Strategy
- **Server State**: Next.js App Router handles route-based data
- **Client State**: React state for UI interactions (panel open/close)
- **URL State**: Optional query parameters for deep linking to projects
- **Scroll State**: Browser scroll position for active year tracking

## Key Components Deep Dive

### `Sidebar.tsx`
```typescript
interface SidebarProps {
  years: number[];
  activeYear: number;
  onYearClick: (year: number) => void;
}

const Sidebar = ({ years, activeYear, onYearClick }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-80 bg-white border-r">
      {/* Name and tagline */}
      <div className="sticky top-0 bg-white p-8 border-b">
        <h1 className="text-2xl font-bold">Your Name</h1>
        <p className="text-gray-600">Your Tagline</p>
      </div>

      {/* Year navigation */}
      <nav className="p-8">
        <ul className="space-y-4">
          {years.map((year) => (
            <li key={year}>
              <button
                className={cn(
                  "w-full text-left py-3 px-4 rounded-lg transition-colors",
                  activeYear === year
                    ? "bg-accent text-white"
                    : "hover:bg-gray-100"
                )}
                onClick={() => onYearClick(year)}
              >
                {year}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
```

### `ProjectCard.tsx`
```typescript
interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  priority?: boolean; // For image loading priority
}

const ProjectCard = ({ project, onClick, priority }: ProjectCardProps) => {
  return (
    <motion.article
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      onClick={() => onClick(project)}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        {project.imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={60}
              height={60}
              className="rounded-lg object-cover"
              priority={priority}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 truncate">
            {project.title}
          </h3>
          <p className="text-accent font-medium mb-2">
            {project.role} • {project.company}
          </p>
          {project.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
};
```

### `ProjectDetailPanel.tsx`
```typescript
interface ProjectDetailPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailPanel = ({ project, isOpen, onClose }: ProjectDetailPanelProps) => {
  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.aside
        className="fixed right-0 top-0 h-full w-1/2 bg-white shadow-xl z-50 overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-8 pt-16">
          <div className="max-w-2xl mx-auto">
            {/* Hero image */}
            {project.imageUrl && (
              <div className="mb-8">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            )}

            {/* Title and meta */}
            <header className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-accent text-lg">
                {project.role} at {project.company}
              </p>
            </header>

            {/* Description */}
            {project.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {/* Lessons */}
            {project.lessons && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Key Learnings</h2>
                <p className="text-gray-700 leading-relaxed">
                  {project.lessons}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
```

### `Timeline.tsx`
```typescript
interface TimelineProps {
  projects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
  onProjectClose: () => void;
}

const Timeline = ({ projects, selectedProject, onProjectSelect, onProjectClose }: TimelineProps) => {
  // Group projects by year
  const projectsByYear = useMemo(() => {
    return projects.reduce((acc, project) => {
      if (!acc[project.year]) acc[project.year] = [];
      acc[project.year].push(project);
      return acc;
    }, {} as Record<number, Project[]>);
  }, [projects]);

  return (
    <main className="ml-80 min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        {Object.entries(projectsByYear)
          .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort years descending
          .map(([year, yearProjects]) => (
            <section key={year} className="mb-16">
              {/* Year header */}
              <h2 className="text-2xl font-bold mb-8 sticky top-8 bg-white py-2">
                {year}
              </h2>

              {/* Projects */}
              <div className="space-y-6">
                {yearProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={onProjectSelect}
                    priority={parseInt(year) === Math.max(...Object.keys(projectsByYear).map(Number))}
                  />
                ))}
              </div>
            </section>
          ))}
      </div>

      {/* Detail panel */}
      <ProjectDetailPanel
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={onProjectClose}
      />
    </main>
  );
};
```

## Data Layer Architecture

### Supabase Integration
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }, // No auth needed
});
```

### Data Fetching Hooks
```typescript
// lib/hooks/useProjects.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', { ascending: false })
          .order('order_index', { ascending: true });

        if (error) throw error;

        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
```

### State Management Hooks
```typescript
// lib/hooks/usePanelState.ts
import { useState, useCallback } from 'react';

export const usePanelState = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
    // Prevent body scroll when panel is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  }, []);

  return { selectedProject, isOpen, openPanel, closePanel };
};
```

## Animation System

### Reusable Animation Variants
```typescript
// lib/utils/animations.ts
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRight: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

## Responsive Design Strategy

### Mobile-First CSS Architecture
```css
/* Base styles (mobile) */
.sidebar { width: 100%; position: fixed; top: 0; z-index: 50; }
.main-content { margin-left: 0; margin-top: 80px; }
.project-card { width: 100%; margin-bottom: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .sidebar { width: 280px; position: fixed; left: 0; top: 0; }
  .main-content { margin-left: 280px; margin-top: 0; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .project-card { width: 400px; }
  .detail-panel { width: 50vw; }
}
```

## Performance Optimizations

### Image Optimization Strategy
- **Priority loading**: First visible projects get priority
- **Responsive images**: Multiple sizes for different breakpoints
- **Lazy loading**: Intersection Observer for below-fold images
- **Modern formats**: WebP with fallbacks

### Bundle Optimization
- **Code splitting**: Route-based and component-based splitting
- **Tree shaking**: Remove unused exports
- **Dynamic imports**: Lazy load heavy components
- **Vendor splitting**: Separate vendor chunks

### Runtime Performance
- **Debounced scroll**: Prevent excessive scroll event handling
- **Intersection Observer**: Efficient visibility detection
- **Animation cleanup**: Remove unused animation instances
- **Memory management**: Proper cleanup of event listeners

This architecture provides a solid foundation for a performant, accessible, and maintainable portfolio application that delivers an excellent user experience across all devices.
