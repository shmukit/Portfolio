# Database Scripts

This folder contains all SQL scripts for database management, organized by purpose.

## 📁 Folder Structure

### `/sql/schema/`
- **Purpose**: Database schema definitions and table creation
- **Files**:
  - `add-collaborators-failures-schema.sql` - Creates collaborators and failures tables
  - `supabase-schema-corrected.sql` - Main database schema

### `/sql/data/`
- **Purpose**: Data insertion scripts
- **Files**:
  - `insert-collaborators.sql` - Insert collaborator data (⚠️ Has wrong project IDs - needs fixing)
  - `insert-failures.sql` - Insert failure data
  - `insert-projects-final-updated.sql` - Main projects data
  - `insert-additional-projects-2025.sql` - Additional 2025 projects
  - `insert-new-projects-2025.sql` - New 2025 projects

### `/sql/fixes/`
- **Purpose**: Data correction and bug fixes
- **Files**:
  - `fix-collaborators-genai-idrc.sql` - Fix collaborator project ID issues
  - `fix-collaborators-step-by-step.sql` - Step-by-step collaborator fix guide
  - `fix-actual-broken-images.sql` - Fix broken image references
  - `fix-all-images-complete.sql` - Complete image fix
  - `fix-broken-images.sql` - General image fixes

### `/sql/updates/`
- **Purpose**: Data updates and modifications
- **Files**:
  - `update-*.sql` - Various data update scripts
  - `add-*.sql` - Data addition scripts
  - `clear-*.sql` - Data cleanup scripts

## 🚨 Important Notes

1. **Collaborators Issue**: The `insert-collaborators.sql` file has wrong project IDs that need to be fixed using `fix-collaborators-step-by-step.sql`

2. **Execution Order**: Run scripts in this order:
   1. Schema files first
   2. Data insertion files
   3. Fix files for corrections
   4. Update files for modifications

3. **Backup**: Always backup your database before running any scripts

## 🔧 Quick Fix for Collaborators

To fix the current collaborator display issue:

1. Open Supabase SQL Editor
2. Run `fix-collaborators-step-by-step.sql` step by step
3. This will correct the wrong project ID associations
