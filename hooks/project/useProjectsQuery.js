import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '@/services/projects/projects';

export const useProjects = (filters = {}) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => {
      // Only send filters if there are projects
      return projectsService.getAllProjects(filters);
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: projectsService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};

export const useProjectDetails = (projectId) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectsService.getProjectDetails(projectId),
    enabled: !!projectId,
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => projectsService.updateProject(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['project', id]);
      queryClient.invalidateQueries(['projects']);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};