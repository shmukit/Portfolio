export interface Project {
  id: string;
  title: string;
  year: number;
  role: string;
  company: string;
  description?: string;
  lessons?: string;
  imageUrl?: string;
  orderIndex?: number;
  category?: string;
  isUnlocked?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  
  // New structured fields from database
  phase?: string; // "0 to 1", "1 to n", etc.
  projectType?: string; // "Research", "Prod Dev", "Analysis"
  situation?: string; // Problem/context
  task?: string; // Your role/objective
  result?: string; // Quantifiable outcomes
  
  // JSONB structured data
  contributions?: Contribution[];
  keyResults?: KeyResult[];
  tags?: string[]; // Technology tags, skills used
  metrics?: Record<string, any>; // Additional structured data
  
  // URL fields for external links
  companyUrl?: string; // Company website URL (single)
  projectUrl?: string; // Project-specific URL (single)
  reportUrl?: string; // Report/document URL (single)
  demoUrl?: string; // Demo URL (single)
  
  // URL labels for custom naming
  companyLabel?: string; // Custom label for company URL
  projectLabel?: string; // Custom label for project URL
  reportLabel?: string; // Custom label for report URL
  demoLabel?: string; // Custom label for demo URL
  
  // Multiple URLs support (JSON arrays)
  companyUrls?: UrlWithLabel[]; // Multiple company URLs
  projectUrls?: UrlWithLabel[]; // Multiple project URLs
  reportUrls?: UrlWithLabel[]; // Multiple report URLs
  demoUrls?: UrlWithLabel[]; // Multiple demo URLs
  
  // Video support for motion assets
  videoPoster?: string; // Poster image for video
  videoFallback?: string; // Fallback image/video for unsupported browsers
  
  // Collaborators
  collaborators?: Collaborator[];
}

export interface Contribution {
  contribution: string;
  value_chain_position: 'upstream' | 'downstream';
  type: 'Data Analysis' | 'UX Design' | 'Decision Strategy';
}

export interface KeyResult {
  value: string;
  label: string;
  description: string;
  category: string;
}

export interface UrlWithLabel {
  url: string;
  label: string;
  description?: string;
}

export interface ProjectsByYear {
  [year: number]: Project[];
}

export interface ProjectFormData {
  title: string;
  year: number;
  role: string;
  company: string;
  description?: string;
  lessons?: string;
  imageUrl?: string;
  orderIndex?: number;
  category?: string;
}

// New interfaces for collaborators and failures
export interface Collaborator {
  id: string;
  projectId: string;
  name: string;
  linkedinUrl?: string;
  profileImageUrl?: string;
  role?: string;
  orderIndex?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Failure {
  id: string;
  title: string;
  year: number;
  company?: string;
  role?: string;
  description?: string;
  lessons?: string;
  imageUrl?: string;
  orderIndex?: number;
  category?: string;
  isUnlocked?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  
  // Additional fields similar to projects
  phase?: string;
  projectType?: string;
  situation?: string;
  task?: string;
  result?: string;
  contributions?: Contribution[];
  keyResults?: KeyResult[];
  tags?: string[];
  metrics?: Record<string, any>;
  
  // URL fields
  companyUrl?: string;
  projectUrl?: string;
  reportUrl?: string;
  demoUrl?: string;
  companyLabel?: string;
  projectLabel?: string;
  reportLabel?: string;
  demoLabel?: string;
  companyUrls?: UrlWithLabel[];
  projectUrls?: UrlWithLabel[];
  reportUrls?: UrlWithLabel[];
  demoUrls?: UrlWithLabel[];
  videoPoster?: string;
  videoFallback?: string;
}

export interface FailuresByYear {
  [year: number]: Failure[];
}
