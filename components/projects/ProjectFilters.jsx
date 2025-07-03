'use client';

import { useProject } from '@/hooks/useProjects';

export default function ProjectDetails({ params }) {
  const { id } = params;
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading project</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <div className="mt-4">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-2 text-gray-700">{project.description}</p>
        </div>
      </div>
    </div>
  );
}