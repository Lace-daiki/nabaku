'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth/AuthContext';
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/project/useProjectsQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faFilter, faFolderOpen, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SearchBar from "@/components/searchbar";
import NewProjectModal from '@/components/projects/NewProjectModal';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectDetailsContent from '@/components/projects/ProjectDetailsContent';
import { toast } from 'react-toastify';

export default function Projects() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    dateRange: ''
  });

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    coverImage: null,
    description: '',
    mediaFiles: [],
    targetAmount: ''
  });

  // Fetch projects with React Query
  const { data: projects = [], isLoading, isError, refetch } = useProjects(filters);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = field === 'mediaFiles' ? Array.from(e.target.files) : e.target.files[0];
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProjectMutation.mutateAsync(formData);
      handleCloseModal();
      toast.success('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Error creating project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProjectMutation.mutateAsync(projectId);
        if (selectedProject?._id === projectId) {
          setSelectedProject(null);
        }
        refetch(); // Refresh the projects list
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Error deleting project');
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      category: '',
      dateRange: ''
    });
  };

  if (isLoading) return (
    <div className="flex-1 p-10 bg-white p-6 rounded-lg shadow-md flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
    </div>
  );

  if (isError) return (
    <div className="flex-1 p-10 bg-white p-6 rounded-lg shadow-md">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Failed to load projects
      </div>
      {toast.error('Failed to load projects')}
    </div>
  );

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
    <div className="flex-1 p-10 bg-white p-6 rounded-lg shadow-md">
      {/* Header with filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Your projects</h3>
          <span className="text-gray-500 text-[16px] font-normal border-1 rounded-[800px] py-2 px-4 ml-4">
            {projects.length}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <SearchBar />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`ml-2 p-2 rounded-lg flex items-center gap-1 ${
                Object.values(filters).some(Boolean) 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
              {Object.values(filters).some(Boolean) && (
                <span className="text-xs font-medium">Filtered</span>
              )}
            </button>
          </div>
          
          <button 
            className="bg-blue-900 text-white rounded-full py-2 px-4" 
            onClick={handleNewProjectClick}
          >
            New Project
          </button>
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
          <div className="relative mb-8">
            <FontAwesomeIcon 
              icon={faFolderOpen} 
              className="text-gray-300 text-7xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-100 rounded-full p-3">
              <FontAwesomeIcon 
                icon={faPlus} 
                className="text-blue-600 text-xl"
              />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            No Projects Yet
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-8">
            Start your journey by creating your first project. Showcase your ideas and bring them to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="bg-blue-900 text-white rounded-full py-3 px-6 hover:bg-blue-800 transition-colors flex items-center gap-2"
              onClick={handleNewProjectClick}
            >
              <FontAwesomeIcon icon={faPlus} />
              Create Your First Project
            </button>
            <button 
              className="border border-gray-300 text-gray-700 rounded-full py-3 px-6 hover:bg-gray-50 transition-colors"
              onClick={() => window.open('https://docs.example.com/projects', '_blank')}
            >
              Learn More About Projects
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project._id} 
              project={project}
              onDelete={() => handleDeleteProject(project._id)}
              onClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      )}

      {/* New Project Modal */}
      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  );
}