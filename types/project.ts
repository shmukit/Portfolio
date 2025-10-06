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
