
import React, { useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/project/useProjectsQuery';
import NewProjectModal from '@/components/projects/NewProjectModal';

const LiveProjects = () => {

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State for form data
    const [formData, setFormData] = useState({
        title: '',
        coverImage: null,
        description: '',
        mediaFiles: [],
        targetAmount: ''
    });

    // Fetch projects with React Query
    const { data: projects = [], isLoading, isError, refetch } = useProjects();
    const createProjectMutation = useCreateProject();
    const deleteProjectMutation = useDeleteProject();

    const handleCardClick = (project) => {
        setSelectedProject(project);
    };

    const handleBackToProjects = () => {
        setSelectedProject(null);
    };

    const handleNewProjectClick = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setFormData({
        title: '',
        coverImage: null,
        description: '',
        mediaFiles: [],
        targetAmount: ''
        });
        setIsModalOpen(false);
    };

    return (
        <div className="w-[798px] h-auto border border-gray-300 rounded-lg p-4 bg-white shadow-md mt-5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Live projects</h2>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={handleNewProjectClick}>New Project</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {projects.length === 0 ? (
                <div className="col-span-2 flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            No Live Projects
                        </h3>
                        <p className="text-gray-500">
                            Start by creating your first project to showcase your ideas.
                        </p>
                    </div>
                </div>
            ) : (
                projects.slice(0, 2).map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        onDelete={() => handleDeleteProject(project._id)}
                        onClick={() => handleCardClick(project)}
                    />
                ))
            )}
            </div>
            <NewProjectModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default LiveProjects;