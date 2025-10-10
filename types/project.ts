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
  createdAt?: string;
  updatedAt?: string;
  
  // New structured fields based on your project format
  phase?: string; // "0 to 1", "1 to n", etc.
  projectType?: string; // "Research", "Prod Dev", "Analysis"
  situation?: string; // Problem/context
  task?: string; // Your role/objective
  result?: string; // Quantifiable outcomes
  contributions?: string[]; // Specific contributions
  metrics?: {
    label: string;
    value: string;
    description?: string;
  }[];
  dashboardUrl?: string; // Link to dashboard/visualization
  tags?: string[]; // Technology tags, skills used
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
