# Shazzad Hossain Mukit – Product Manager Portfolio

A premium, interactive portfolio showcasing project milestones through a dynamic timeline. Built with **Next.js**, **Supabase**, and **Framer Motion**, this project demonstrates a commitment to clean architecture, high-performance web standards, and exceptional UX.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🚀 Key Features

- **Interactive Timeline**: A scroll-synced experience that visualizes career progression and project impact.
- **Dynamic Project Details**: Slide-out panels providing deep dives into project STAR (Situation, Task, Action, Result) metrics.
- **Real-time Data**: Integrated with Supabase for seamless data management and secure access control.
- **Micro-interactions**: Smooth, performant animations built with Framer Motion.
- **Responsive Excellence**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State & Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + RLS)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```bash
├── app/          # Next.js App Router (UI & Layout)
├── components/   # Modular Client Components
├── database/     # SQL Schema & Seed scripts
├── docs/         # Detailed System Design & Specs
├── lib/          # Custom Hooks & Utilities
└── public/       # Optimized Assets & Icons
```

## 📖 Documentation

For a deeper dive into the engineering behind this project, please refer to:

- 🏗️ **[System Design & Architecture](docs/TECHNICAL_ARCHITECTURE.md)**: Technical deep dive and design decisions.
- 🎨 **[Style Guide](docs/STYLE_GUIDE.md)**: Visual identity and design system tokens.
- 🔍 **[Project Specification](docs/PROJECT_SPEC.md)**: High-level goals and requirements.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- Supabase Account

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shmukit/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file based on `env.example`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

4. **Initialize Database:**
   Run the SQL scripts in `database/schema.sql` within your Supabase SQL editor.

5. **Run Dev Server:**
   ```bash
   npm run dev
   ```

---
