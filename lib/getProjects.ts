import { supabase } from './supabase';
import { Project, Collaborator } from '../types/project';
import fs from 'fs';
import path from 'path';

interface DatabaseProject {
  id: string;
  title: string;
  year: number;
  role: string;
  company: string;
  description?: string;
  lessons?: string;
  image_url?: string;
  order_index?: number;
  category?: string;
  is_unlocked?: boolean;
  created_at?: string;
  updated_at?: string;
  phase?: string;
  project_type?: string;
  situation?: string;
  task?: string;
  result?: string;
  company_url?: string;
  project_url?: string;
  report_url?: string;
  demo_url?: string;
  company_label?: string;
  project_label?: string;
  report_label?: string;
  demo_label?: string;
  company_urls?: unknown;
  project_urls?: unknown;
  report_urls?: unknown;
  demo_urls?: unknown;
  contributions?: unknown;
  key_results?: unknown;
  tags?: unknown;
  metrics?: unknown;
  video_poster?: string;
  video_fallback?: string;
}

interface DatabaseCollaborator {
  id: string;
  project_id: string;
  name: string;
  linkedin_url?: string;
  profile_image_url?: string;
  role?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

// Helper function to fetch collaborators for a project
async function fetchCollaboratorsForProject(projectId: string): Promise<Collaborator[]> {
  try {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('collaborators')
      .select('*')
      .eq('project_id', projectId)
      .order('order_index', { ascending: true });

    if (error) {
      // If table doesn't exist, return empty array instead of throwing
      if (error.code === 'PGRST116' || error.message?.includes('relation "collaborators" does not exist')) {
        console.log('Collaborators table does not exist yet, returning empty array');
        return [];
      }
      console.error('Error fetching collaborators for project', projectId, ':', error);
      return [];
    }

    console.log(`Fetched ${data?.length || 0} collaborators for project ${projectId}:`, data?.map(c => c.name));

    return (data || []).map((collaborator: DatabaseCollaborator) => ({
      id: collaborator.id,
      projectId: collaborator.project_id,
      name: collaborator.name,
      linkedinUrl: collaborator.linkedin_url,
      profileImageUrl: collaborator.profile_image_url,
      role: collaborator.role,
      orderIndex: collaborator.order_index,
      createdAt: collaborator.created_at,
      updatedAt: collaborator.updated_at,
    }));
  } catch (err) {
    console.error('Error fetching collaborators:', err);
    return [];
  }
}

// Helper function to load static fallback
function loadStaticProjects(): Project[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(fileContents);
    console.log('📁 Loaded static projects:', projects.length);
    return projects;
  } catch (error) {
    console.error('❌ Failed to load static projects:', error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    console.log('🔄 Fetching projects server-side...');

    // Try Supabase first if available
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', { ascending: false })
          .order('order_index', { ascending: true });

        if (error) {
          console.error('❌ Supabase fetch failed:', error);
          console.log('📁 Falling back to static data...');
          return loadStaticProjects();
        }

        if (!data || data.length === 0) {
          console.log('⚠️ No projects found in Supabase, using static fallback');
          return loadStaticProjects();
        }

        console.log('✅ Fetched projects from Supabase:', data.length);

        // Transform database fields to match TypeScript interface and fetch collaborators
        const transformedProjects = await Promise.all(data.map(async (project: DatabaseProject) => {
          // Fetch collaborators for each project
          console.log(`Processing project: ${project.title} (${project.id})`);
          const collaborators = await fetchCollaboratorsForProject(project.id).catch((err) => {
            console.error(`Error fetching collaborators for ${project.title}:`, err);
            return [];
          });
          
          return {
            ...project,
            // Basic field transformations
            imageUrl: project.image_url,
            orderIndex: project.order_index,
            isUnlocked: project.is_unlocked,
            createdAt: project.created_at,
            updatedAt: project.updated_at,
            projectType: project.project_type,
            
            // URL field transformations
            companyUrl: project.company_url,
            projectUrl: project.project_url,
            reportUrl: project.report_url,
            demoUrl: project.demo_url,
            companyLabel: project.company_label,
            projectLabel: project.project_label,
            reportLabel: project.report_label,
            demoLabel: project.demo_label,
            
            // Parse JSONB fields
            companyUrls: project.company_urls ? (Array.isArray(project.company_urls) ? project.company_urls : []) : undefined,
            projectUrls: project.project_urls ? (Array.isArray(project.project_urls) ? project.project_urls : []) : undefined,
            reportUrls: project.report_urls ? (Array.isArray(project.report_urls) ? project.report_urls : []) : undefined,
            demoUrls: project.demo_urls ? (Array.isArray(project.demo_urls) ? project.demo_urls : []) : undefined,
            
            contributions: project.contributions ? (Array.isArray(project.contributions) ? project.contributions : []) : undefined,
            keyResults: project.key_results ? (Array.isArray(project.key_results) ? project.key_results : []) : undefined,
            tags: project.tags ? (Array.isArray(project.tags) ? project.tags : []) : undefined,
            metrics: project.metrics ? (Array.isArray(project.metrics) ? project.metrics : []) : undefined,
            
            // Video support
            videoPoster: project.video_poster,
            videoFallback: project.video_fallback,
            
            // Collaborators
            collaborators: collaborators,
          };
        }));

        return transformedProjects as Project[];
      } catch (supabaseError) {
        console.error('❌ Supabase connection failed:', supabaseError);
        console.log('📁 Falling back to static data...');
        return loadStaticProjects();
      }
    } else {
      console.log('⚠️ Supabase not configured, using static data...');
      return loadStaticProjects();
    }
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    console.log('📁 Falling back to static data...');
    return loadStaticProjects();
  }
}

// For revalidation - rebuild every 24 hours
export const revalidate = 86400;

