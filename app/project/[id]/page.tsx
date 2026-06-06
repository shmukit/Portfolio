import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjects } from '../../../lib/getProjects';
import ProjectContent from '../../components/ProjectContent';
import { deepDiveProjects, invitationProjects } from '../../data/resources';
import { Project } from '../../../types/project';

const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getProjects();
  const allProjects = [...projects, ...deepDiveProjects, ...invitationProjects];
  
  return allProjects.map((project) => ({
    id: generateSlug(project.title),
  }));
}

// Generate dynamic metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const projects = await getProjects();
  const allProjects = [...projects, ...deepDiveProjects, ...invitationProjects];
  const project = allProjects.find((p) => generateSlug(p.title) === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Mukit - AI Product Manager`,
    description: project.description || `Case study: ${project.title} at ${project.company}`,
    openGraph: {
      title: project.title,
      description: project.description || `Case study: ${project.title} at ${project.company}`,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getProjects();
  const allProjects = [...projects, ...deepDiveProjects, ...invitationProjects];
  const project = allProjects.find((p) => generateSlug(p.title) === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            &larr; Back to Portfolio
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <span className="font-medium text-gray-900 dark:text-gray-200">{project.company}</span>
              <span>•</span>
              <span>{project.role}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            
            <ProjectContent project={project} theme="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
