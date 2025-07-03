'use client';

import { ProjectProvider } from '@/context/ProjectContext';
import ProjectDetailsContent from '@/components/projects/ProjectDetailsContent';

export default function ProjectDetailsPage({ params }) {
  return (
    <ProjectProvider projectId={params.id}>
      <ProjectDetailsContent />
    </ProjectProvider>
  );
}