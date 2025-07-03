'use client';

import { createContext, useContext } from 'react';
import { useProject } from '@/hooks/project/useProjects';

const ProjectContext = createContext();

export function ProjectsProvider({ children, projectId }) {
  const { data: project, isLoading, isError } = useProject(projectId);

  const value = {
    project,
    isLoading,
    isError
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);