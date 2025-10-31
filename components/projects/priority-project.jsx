
import ProjectCard from '@/components/projects/ProjectCard';
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/project/useProjectsQuery';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faFilter, faFolderOpen, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ProjectDetailsContent from './ProjectDetailsContent';

const PriorityProjects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const router = useRouter();

    // Fetch projects with React Query
    const { data: projects = [], isLoading, isError, refetch } = useProjects();
    const createProjectMutation = useCreateProject();
    const deleteProjectMutation = useDeleteProject();

    const handleCardClick = (project) => {
        router.push(`/projects/details/${project._id}`);
    };

    const handleBackToProjects = () => {
        setSelectedProject(null);
    };

    if (selectedProject) {
        return (
          <div className="flex-1 bg-[#F4F6FC] min-h-screen">
            <div className="p-10">
              <button
                onClick={handleBackToProjects}
                className="flex items-center text-[#2E3E5C] mb-6 hover:text-blue-600 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Projects
              </button>
              <ProjectDetailsContent project={selectedProject} />
            </div>
          </div>
        );
      }

    return (
        <div className="w-full h-auto border border-gray-300 rounded-lg p-4 bg-white flex-col items-center shadow-md mt-5">
                <h2 className="text-[18px] font-semibold">Recent project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {projects.length === 0 ? (
                <div className="col-span-2 flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            No Priority Projects
                        </h3>
                        <p className="text-gray-500">
                            Start by creating your first project to showcase your ideas.
                        </p>
                    </div>
                </div>
            ) : (
                projects.slice(0, 1).map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        onDelete={() => handleDeleteProject(project._id)}
                        onClick={() => handleCardClick(project)}
                    />
                ))
            )}
            </div>
        </div>
    );
};

export default PriorityProjects;