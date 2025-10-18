import { supabase } from './supabase';
import { Project } from '../types/project';

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
}

export async function getProjects(): Promise<Project[]> {
  try {
    console.log('🔄 Fetching projects server-side...');

    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })
      .order('order_index', { ascending: true });

    if (error) {
      console.error('❌ Supabase fetch failed:', error);
      // Return empty array instead of throwing to prevent app crash
      console.log('⚠️ Returning empty projects array due to fetch error');
      return [];
    }

    if (!data || data.length === 0) {
      console.log('⚠️ No projects found');
      return [];
    }

    console.log('✅ Fetched projects:', data.length);

    // Transform database fields to match TypeScript interface
    const transformedProjects = data.map((project: DatabaseProject) => ({
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
    }));

    return transformedProjects as Project[];
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    throw error;
  }
}

// For revalidation - rebuild every 24 hours
export const revalidate = 86400;

