'use client';

import { useParams } from 'next/navigation';
import { useProjectDetails } from '@/hooks/project/useProjectsQuery';
import ProjectDetailsContent from '@/components/projects/ProjectDetailsContent';

export default function ProjectDetailsPage() {
  const params = useParams();
  const { data: project, isLoading, isError } = useProjectDetails(params.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to load project details
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Project not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectDetailsContent project={project.data} />
    </div>
  );
} 