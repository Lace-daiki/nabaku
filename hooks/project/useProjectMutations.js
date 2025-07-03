import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '@/services/projects/projects';

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: projectsService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    }
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => projectsService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    }
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    }
  });
};