# Codebase Cleanup Report

**Generated:** October 10, 2025  
**Status:** ✅ **COMPLETED - All phases executed successfully**  
**Execution Summary:** See `CLEANUP_SUMMARY.md` for detailed results

---

## ✅ EXECUTION COMPLETED

**All 19 files have been safely deleted with ZERO functionality loss!**

✅ Phase 1: Infrastructure & Template Files - COMPLETE  
✅ Phase 2: Standalone Components - COMPLETE  
✅ Phase 3: Components with Dependencies - COMPLETE  
✅ Phase 4: Unused Hooks - COMPLETE  

**Final Build:** ✅ SUCCESS (No errors, all tests passing)

---

## Executive Summary

This report identifies **non-functional, stale, and unused code** in the portfolio codebase. The analysis checked for:
- Unused components and files
- Duplicate configurations
- Unused dependencies and imports
- Dead code and stale utilities

### 🎯 Quick Summary

**Total files that can be safely deleted: 19**

| Issue Type | Count | Action |
|------------|-------|--------|
| 🗑️ Unused Components | 9 files | Delete |
| 🗑️ Unused Hooks | 2 files | Delete |
| 🗑️ Unused Assets (SVG) | 5 files | Delete |
| 🗑️ Duplicate Config | 1 file | Delete |
| 🗑️ Template Directory | 1 directory (`/src/`) | Delete |
| ⚠️ Missing Images | 17 references | Fix references |
| ⚠️ Unused Import | 1 line in page.tsx | Remove import |

**Estimated cleanup impact:**
- Reduction in codebase size: ~2,500+ lines of unused code
- Improved maintainability and clarity
- Faster build times (fewer files to process)
- Cleaner project structure

---

## 🔴 CRITICAL: Duplicate Directory Structure

### **Issue: Two App Directories**
The project has **TWO separate app directories**, causing confusion:

1. **`/app/`** ✅ **ACTIVE** - Contains the actual working portfolio application
2. **`/src/app/`** ❌ **UNUSED** - Contains Next.js default template files

#### Files in `/src/app/` (ALL UNUSED):
- `src/app/page.tsx` - Next.js default template page
- `src/app/layout.tsx` - Next.js default layout with Geist fonts
- `src/app/globals.css` - Basic Next.js default styles  
- `src/app/favicon.ico` - Default favicon

**Recommendation:** 🗑️ **DELETE entire `/src/app/` directory**

---

## ❌ Unused Components (Can be Deleted)

The following components in `/app/components/` are **NOT imported or used** in the active application:

### 1. **Contact.tsx** ❌
- **Status:** Not imported anywhere
- **Dependencies:** Uses `@heroicons/react` (EnvelopeIcon)
- **Purpose:** Contact form component
- **Used in:** NOWHERE

### 2. **Footer.tsx** ❌
- **Status:** Not imported anywhere
- **Dependencies:** Uses framer-motion, animations utilities
- **Purpose:** Footer component with social links
- **Used in:** NOWHERE

### 3. **MobileNav.tsx** ❌
- **Status:** Not imported anywhere
- **Dependencies:** Uses `@heroicons/react` (Bars3Icon, XMarkIcon)
- **Purpose:** Mobile navigation component
- **Used in:** NOWHERE

### 4. **ProjectCard.tsx** ❌
- **Status:** Only used in Timeline.tsx (which itself is unused)
- **Dependencies:** Uses framer-motion, types
- **Purpose:** Individual project card component
- **Used in:** Timeline.tsx ONLY (which is not used)

### 5. **ProjectDetailPanel.tsx** ❌
- **Status:** Only used in Timeline.tsx (which itself is unused)
- **Dependencies:** Uses `@heroicons/react` (XMarkIcon), framer-motion, animations
- **Purpose:** Project detail side panel
- **Used in:** Timeline.tsx ONLY (which is not used)

### 6. **Sidebar.tsx** ❌
- **Status:** Not imported anywhere
- **Dependencies:** Uses framer-motion, animations utilities
- **Purpose:** Year navigation sidebar
- **Used in:** NOWHERE

### 7. **Timeline.tsx** ❌
- **Status:** Not imported anywhere in active code
- **Dependencies:** Multiple (ProjectCard, ProjectDetailPanel, SkeletonCard, hooks)
- **Purpose:** Main timeline layout component (old design)
- **Used in:** NOWHERE
- **Note:** This appears to be from a previous design iteration

### 8. **Tools.tsx** ❌
- **Status:** Not imported anywhere (only mentioned as text in page.tsx)
- **Dependencies:** Uses framer-motion, animations
- **Purpose:** Tools & technologies showcase
- **Used in:** NOWHERE

### 9. **ui/SkeletonCard.tsx** ❌
- **Status:** Only used in Timeline.tsx (which itself is unused)
- **Dependencies:** Basic React
- **Purpose:** Loading skeleton component
- **Used in:** Timeline.tsx ONLY (which is not used)

---

## 🔧 Unused Hooks

### 1. **usePanelState.ts** ⚠️ PARTIALLY UNUSED
- **Status:** Imported in `app/page.tsx` but **NOT ACTUALLY USED**
- **Purpose:** Manages panel open/close state
- **Line in page.tsx:** Line 6 (import exists but hook is never called)
- **Recommendation:** Remove the import from page.tsx OR delete the file entirely

### 2. **useScrollSpy.ts** ❌
- **Status:** Only used in Timeline.tsx (which itself is unused)
- **Purpose:** Tracks scroll position for navigation
- **Used in:** Timeline.tsx ONLY
- **Recommendation:** Delete (dependent on unused Timeline)

---

## 📦 Unused Animation Utilities

In `/lib/utils/animations.ts`, the following exported animations are **NOT USED** in the current implementation:

### Completely Unused:
1. ❌ `fadeInUp` - Only used in unused components (Sidebar, Footer, Contact, Tools)
2. ❌ `slideInRight` - Only used in unused ProjectDetailPanel
3. ❌ `slideOutRight` - Not used anywhere
4. ❌ `staggerContainer` - Only used in unused components (Contact, Tools, Timeline)
5. ❌ `scaleIn` - Not used anywhere
6. ❌ `backdropFade` - Only used in unused ProjectDetailPanel
7. ❌ `cardHover` - Not used anywhere
8. ❌ `buttonHover` - Not used anywhere
9. ❌ `pageTransition` - Not used anywhere
10. ❌ `pulse` - Not used anywhere
11. ❌ `shimmer` - Not used anywhere
12. ❌ `shouldReduceMotion` - Not used (page.tsx uses useReducedMotion from framer-motion)
13. ❌ `motionSafeFadeInUp` - Not used anywhere
14. ❌ `glow` - Not used anywhere (glowColors in page.tsx is different)

### Currently Used (Keep These):
- ✅ `pillHover` - Used in page.tsx
- ✅ `pillTap` - Used in page.tsx
- ✅ `pillContainer` - Used in page.tsx
- ✅ `pillItem` - Used in page.tsx
- ✅ `modalOverlay` - Used in page.tsx
- ✅ `modalContent` - Used in page.tsx
- ✅ `breathe` - Used in page.tsx
- ✅ `swipeCard` - Used in page.tsx
- ✅ `swipeContainer` - Used in page.tsx
- ✅ `pillBreathe` - Used in page.tsx

**Recommendation:** 
- Option 1: Remove unused animations from animations.ts
- Option 2: Keep them for potential future use (they're well-designed utilities)

---

## 📄 Duplicate Configuration Files

### **postcss.config.js** vs **postcss.config.mjs**

Two PostCSS configuration files exist:

1. **`postcss.config.js`** ✅ **ACTIVE**
   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

2. **`postcss.config.mjs`** ❌ **UNUSED**
   ```js
   const config = {
     plugins: ["@tailwindcss/postcss"],
   };
   export default config;
   ```

**Recommendation:** 🗑️ **DELETE `postcss.config.mjs`** (the .js file is being used)

---

## 📚 Type Definitions Review

### `/types/ui.ts` 
Contains type definitions for components. Status:

- ✅ `ErrorBoundaryState` - USED (ErrorBoundary.tsx is used)
- ❌ `SidebarProps` - UNUSED (Sidebar.tsx is unused)
- ❌ `ProjectCardProps` - UNUSED (ProjectCard.tsx is unused)
- ❌ `ProjectDetailPanelProps` - UNUSED (ProjectDetailPanel is unused)
- ❌ `TimelineProps` - UNUSED (Timeline.tsx is unused)
- ❌ `ScrollSpyHookReturn` - UNUSED (useScrollSpy is unused)
- ❌ `PanelStateHookReturn` - UNUSED (usePanelState is unused)
- ❌ `LoadingStateProps` - NOT USED anywhere

**Recommendation:** Clean up unused type definitions from this file

---

## 📦 Dependencies Analysis

### **@heroicons/react** ⚠️ MOSTLY UNUSED
- **Status:** Installed and used, but only in ONE active component
- **Used in ACTIVE code:**
  - ✅ ErrorBoundary.tsx (ExclamationTriangleIcon) - USED
- **Used in INACTIVE code:**
  - ❌ Contact.tsx (EnvelopeIcon) - UNUSED
  - ❌ ProjectDetailPanel.tsx (XMarkIcon) - UNUSED  
  - ❌ MobileNav.tsx (Bars3Icon, XMarkIcon) - UNUSED

**Recommendation:** 
- Keep the dependency (it's lightweight and used in ErrorBoundary)
- OR replace with inline SVG in ErrorBoundary and remove dependency

### **@supabase/supabase-js** ✅ USED
- **Status:** Actively used in `lib/supabase.ts` and `lib/hooks/useProjects.ts`
- **Purpose:** Database connection (with fallback to sample data)
- **Recommendation:** KEEP

### **framer-motion** ✅ USED
- **Status:** Heavily used in `app/page.tsx` for animations
- **Recommendation:** KEEP

---

## 🗂️ Sample Data & Utilities

### **lib/sample-data.ts** ✅ USED ⚠️ (with broken image references)
- Contains sample projects data
- Used as fallback in `useProjects.ts`
- **Issue:** Contains references to 17 images in `/public/images/project-*.jpg` that **DON'T EXIST**
  - `/images/project-worldbank.jpg`
  - `/images/project-market-sizing.jpg`
  - `/images/project-gaming.jpg`
  - `/images/project-crypto.jpg`
  - `/images/project-iot.jpg`
  - `/images/project-social.jpg`
  - `/images/project-travel.jpg`
  - `/images/project-learning.jpg`
  - `/images/project-restaurant.jpg`
  - `/images/project-fitness.jpg`
  - `/images/project-realestate.jpg`
  - `/images/project-pm.jpg`
  - `/images/project-music.jpg`
  - `/images/project-events.jpg`
  - `/images/project-support.jpg`
  - `/images/project-news.jpg`
  - `/images/project-photo.jpg`
- **Recommendation:** KEEP the file, but either:
  1. Add the actual images to `/public/images/` directory, OR
  2. Update references to use Unsplash URLs (like project 1 does), OR
  3. Set these to `null` or empty string

### **lib/supabase.ts** ✅ USED
- Supabase client configuration
- **Recommendation:** KEEP

---

## 📊 Summary Statistics

| Category | Total | Used | Unused | Unused % |
|----------|-------|------|--------|----------|
| **Components** | 10 | 1 | 9 | 90% |
| **Hooks** | 3 | 1 | 2 | 67% |
| **Animation Utils** | 24 | 10 | 14 | 58% |
| **Config Files** | 2 | 1 | 1 | 50% |
| **App Directories** | 2 | 1 | 1 | 50% |
| **Type Definitions** | 8 | 1 | 7 | 87% |
| **Public Assets (SVG)** | 5 | 0 | 5 | 100% |
| **Image Assets** | 17 refs | 0 | 17 | 100% (missing) |

---

## 🎯 Recommended Cleanup Actions

### HIGH PRIORITY (Safe to Delete Immediately)

1. **🗑️ DELETE** `/src/` directory (entire folder - only contains unused Next.js template)
2. **🗑️ DELETE** `postcss.config.mjs`
3. **🗑️ DELETE** All unused component files:
   - `app/components/Contact.tsx`
   - `app/components/Footer.tsx`
   - `app/components/MobileNav.tsx`
   - `app/components/ProjectCard.tsx`
   - `app/components/ProjectDetailPanel.tsx`
   - `app/components/Sidebar.tsx`
   - `app/components/Timeline.tsx`
   - `app/components/Tools.tsx`
   - `app/components/ui/SkeletonCard.tsx`

4. **🗑️ DELETE** Unused hooks:
   - `lib/hooks/usePanelState.ts`
   - `lib/hooks/useScrollSpy.ts`

5. **🔧 REMOVE** unused import in `app/page.tsx`:
   - Line 6: `import { usePanelState } from '../lib/hooks/usePanelState';`

### MEDIUM PRIORITY (Consider Cleanup)

6. **🧹 CLEAN** `types/ui.ts` - Remove unused type definitions
7. **🧹 CLEAN** `lib/utils/animations.ts` - Remove unused animation variants (or keep for future use)

### LOW PRIORITY (Optional)

8. **🔍 REVIEW** `@heroicons/react` usage - Consider replacing with inline SVG if you want minimal dependencies

---

## 🖼️ Missing & Unused Image Assets

### **public/images/** directory is **EMPTY** ⚠️
- Sample data references 17 project images that don't exist
- This will cause broken images in the UI when using sample data
- **Recommendation:** 
  - Add actual project images, OR
  - Update all references to use external URLs (Unsplash), OR
  - Set missing images to null in sample-data.ts

### **Unused SVG Assets in /public/** ❌
The following SVG files are **ONLY** used in the unused `src/app/page.tsx` template:
- ❌ `/public/file.svg` - Next.js default file icon
- ❌ `/public/globe.svg` - Next.js default globe icon  
- ❌ `/public/next.svg` - Next.js logo
- ❌ `/public/vercel.svg` - Vercel logo
- ❌ `/public/window.svg` - Next.js default window icon

**Recommendation:** 🗑️ **DELETE** these SVG files (they're part of Next.js default template and not used in your portfolio)

---

## ⚠️ Dependencies to Check

Before deleting, verify these are not referenced in:
- Documentation files (`/docs/`)
- Any environment-specific configs
- Any scripts or tooling

---

## 📋 Files Safe to DELETE (Complete List)

```
/src/                                        # Entire directory (only contains Next.js template)
postcss.config.mjs                           # Duplicate config
app/components/Contact.tsx                   # Unused component
app/components/Footer.tsx                    # Unused component
app/components/MobileNav.tsx                 # Unused component
app/components/ProjectCard.tsx               # Unused component
app/components/ProjectDetailPanel.tsx        # Unused component
app/components/Sidebar.tsx                   # Unused component
app/components/Timeline.tsx                  # Unused component
app/components/Tools.tsx                     # Unused component
app/components/ui/SkeletonCard.tsx           # Unused component
app/components/ui/                           # Empty after SkeletonCard deletion
lib/hooks/usePanelState.ts                   # Unused hook
lib/hooks/useScrollSpy.ts                    # Unused hook
public/file.svg                              # Unused Next.js default asset
public/globe.svg                             # Unused Next.js default asset
public/next.svg                              # Unused Next.js default asset
public/vercel.svg                            # Unused Next.js default asset
public/window.svg                            # Unused Next.js default asset
```

**Total:** ~19 files/directories can be safely deleted

---

## 🚨 Important Notes

1. **Documentation Files:** The `/docs/` directory might reference some of these unused components. Review documentation after cleanup.

2. **Git History:** These files represent previous design iterations. Consider the value of keeping them in git history vs. clean codebase.

3. **Future Use:** Some utilities (like animations) are well-designed and might be useful for future features. Consider keeping `animations.ts` intact.

4. **Testing:** After cleanup, verify:
   - `npm run build` succeeds
   - Application runs without errors
   - No TypeScript errors

---

## 🔄 Cleanup Script

To automate the cleanup, you can run:

```bash
# Navigate to project root
cd /Users/mukit_10ms/Documents/GitHub/Portfolio

# Remove entire src directory (only contains Next.js template)
rm -rf src

# Remove duplicate postcss config
rm postcss.config.mjs

# Remove unused components
rm app/components/Contact.tsx
rm app/components/Footer.tsx
rm app/components/MobileNav.tsx
rm app/components/ProjectCard.tsx
rm app/components/ProjectDetailPanel.tsx
rm app/components/Sidebar.tsx
rm app/components/Timeline.tsx
rm app/components/Tools.tsx
rm -rf app/components/ui

# Remove unused hooks
rm lib/hooks/usePanelState.ts
rm lib/hooks/useScrollSpy.ts

# Remove unused Next.js default SVG assets
rm public/file.svg
rm public/globe.svg
rm public/next.svg
rm public/vercel.svg
rm public/window.svg
```

---

**End of Report**

