import type { Collaborator } from '../types/project';

export interface CollaboratorRow {
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

export function mapCollaboratorRow(collaborator: CollaboratorRow): Collaborator {
  return {
    id: collaborator.id,
    projectId: collaborator.project_id,
    name: collaborator.name,
    linkedinUrl: collaborator.linkedin_url,
    profileImageUrl: collaborator.profile_image_url,
    role: collaborator.role,
    orderIndex: collaborator.order_index,
    createdAt: collaborator.created_at,
    updatedAt: collaborator.updated_at,
  };
}

/** Groups collaborator rows by project_id with stable order_index sorting per project. */
export function groupCollaboratorsByProjectId(rows: CollaboratorRow[]): Map<string, Collaborator[]> {
  const map = new Map<string, Collaborator[]>();
  for (const row of rows) {
    const key = row.project_id;
    const list = map.get(key);
    if (list) {
      list.push(mapCollaboratorRow(row));
    } else {
      map.set(key, [mapCollaboratorRow(row)]);
    }
  }
  for (const list of map.values()) {
    list.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  }
  return map;
}
