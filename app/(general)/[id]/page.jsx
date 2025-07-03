'use client';

import { use } from 'react';
import { useProjectDetails } from '@/hooks/project/useProjectsQuery';
import CardDetails from '@/components/general/card-details';

export default function ProjectPage({ params }) {
  const unwrappedParams = use(params);
  const { data: project, isLoading, isError } = useProjectDetails(unwrappedParams.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading project details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load project details</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-yellow-500">Project not found</p>
      </div>
    );
  }

  return <CardDetails project={project.data} />;
} 