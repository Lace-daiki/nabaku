import { useQuery } from '@tanstack/react-query';
import { projectsService } from '@/services/projects/projects';

export const useProjects = (filters = {}) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectsService.getAll(filters),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
};

export const useProject = (id) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getById(id),
    enabled: !!id
  });
};

// Add to your existing hooks
export const useProjectContributors = (projectId) => {
  return useQuery({
    queryKey: ['project-contributors', projectId],
    queryFn: () => projectsService.getContributors(projectId),
    enabled: !!projectId
  });
};