import { supabase } from './supabase';
import { Project, Collaborator } from '../types/project';
import { groupCollaboratorsByProjectId, type CollaboratorRow } from './collaboratorsGrouping';
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

async function fetchCollaboratorsByProjectIds(projectIds: string[]): Promise<Map<string, Collaborator[]>> {
  const empty = new Map<string, Collaborator[]>();
  if (!supabase || projectIds.length === 0) return empty;

  const { data, error } = await supabase
    .from('collaborators')
    .select('*')
    .in('project_id', projectIds);

  if (error) {
    if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
      return empty;
    }
    console.error('Error fetching collaborators:', error);
    return empty;
  }

  return groupCollaboratorsByProjectId((data || []) as CollaboratorRow[]);
}

function loadStaticProjects(): Project[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(fileContents);
    return projects;
  } catch (error) {
    console.error('Failed to load static projects:', error);
    return [];
  }
}

function mapProjectRow(
  project: DatabaseProject,
  collaboratorsByProject: Map<string, Collaborator[]>
): Project {
  const collaborators = collaboratorsByProject.get(project.id) ?? [];
  return {
    ...project,
    imageUrl: project.image_url,
    orderIndex: project.order_index,
    isUnlocked: project.is_unlocked,
    createdAt: project.created_at,
    updatedAt: project.updated_at,
    projectType: project.project_type,
    companyUrl: project.company_url,
    projectUrl: project.project_url,
    reportUrl: project.report_url,
    demoUrl: project.demo_url,
    companyLabel: project.company_label,
    projectLabel: project.project_label,
    reportLabel: project.report_label,
    demoLabel: project.demo_label,
    companyUrls: project.company_urls ? (Array.isArray(project.company_urls) ? project.company_urls : []) : undefined,
    projectUrls: project.project_urls ? (Array.isArray(project.project_urls) ? project.project_urls : []) : undefined,
    reportUrls: project.report_urls ? (Array.isArray(project.report_urls) ? project.report_urls : []) : undefined,
    demoUrls: project.demo_urls ? (Array.isArray(project.demo_urls) ? project.demo_urls : []) : undefined,
    contributions: project.contributions ? (Array.isArray(project.contributions) ? project.contributions : []) : undefined,
    keyResults: project.key_results ? (Array.isArray(project.key_results) ? project.key_results : []) : undefined,
    tags: project.tags ? (Array.isArray(project.tags) ? project.tags : []) : undefined,
    metrics: project.metrics ? (Array.isArray(project.metrics) ? project.metrics : []) : undefined,
    videoPoster: project.video_poster,
    videoFallback: project.video_fallback,
    collaborators,
  } as Project;
}

export async function getProjects(): Promise<Project[]> {
  try {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', { ascending: false })
          .order('order_index', { ascending: true });

        if (error) {
          console.error('Supabase fetch failed:', error);
          return loadStaticProjects();
        }

        if (!data || data.length === 0) {
          return loadStaticProjects();
        }

        const projectRows = data as DatabaseProject[];
        const ids = projectRows.map((p) => p.id);
        const collaboratorsByProject = await fetchCollaboratorsByProjectIds(ids);

        return projectRows.map((project) => mapProjectRow(project, collaboratorsByProject));
      } catch (supabaseError) {
        console.error('Supabase connection failed:', supabaseError);
        return loadStaticProjects();
      }
    }

    return loadStaticProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return loadStaticProjects();
  }
}

export const revalidate = 0;
