'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClock } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useDeleteProject } from '@/hooks/project/useProjectMutations';

export default function ProjectDetailsContent({ project }) {
  const router = useRouter();
  const deleteMutation = useDeleteProject();

  const handleEndProject = async () => {
    try {
      await deleteMutation.mutateAsync(project._id);
      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Error ending project:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-[1156px] h-full mx-auto bg-white shadow-lg rounded-[20px] p-2 gap-4 overflow-hidden mt-10">
      {/* Project Cover Image with Progress */}
      <div className="relative w-[1136px] h-[360px]">
        <img 
          alt={project.title} 
          className="w-full h-full object-cover rounded-[10px] mb-2" 
          src={project.cover_image || "https://storage.googleapis.com/a1aa/image/KJAzFqkajDy_jVj8FvCZlBuoagQtHix-nRPniBlisJI.jpg"}
        />
        <div className="absolute inset-3 flex items-end justify-center">
          <div className="bg-white rounded-[16px] px-4 py-2 shadow-lg flex items-center">
            <div className="w-[696px] h-[6px] bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-[6px]" 
                style={{ width: `${(project.donated_amount / project.target_amount * 100) || 0}%` }}
              ></div>
            </div>
            <span className="ml-4 text-gray-700">
              ₦{project.donated_amount || 0} / ₦{project.target_amount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 bg-[#EBEEF9] rounded-[10px] mt-4">
        <h1 className="text-2xl font-bold mb-2">
          {project.title}
        </h1>
        
        {/* Project Meta */}
        <div className="flex items-center text-gray-600 mb-4">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          {project.contributor_count || 0} Contributors
          <FontAwesomeIcon icon={faClock} className="ml-4 mr-2" />
          {project.days_left || 0} days left
          <span className={`ml-4 px-2 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
            {project.status || 'Ongoing'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col float-right justify-end space-x-4 space-y-4 mb-6">
          <button 
            onClick={handleEndProject}
            className="w-[216px] h-[44px] bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Processing...' : 'Delete Project'}
          </button>
          <button className="w-[216px] h-[44px] border text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
            Edit Project
          </button>
          {/* <button className="w-[216px] h-[44px] border text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
            More options
          </button> */}
        </div>

        {/* Project Description */}
        <div className="mb-8 w-[745px] h-[416px]">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <div className="prose max-w-none">
            {project.description ? (
              <p className="text-gray-700 whitespace-pre-line break-words line-clamp-3">{project.description}</p>
            ) : (
              <p className="text-gray-500 italic">No description provided</p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Funding Progress</h3>
          <div className="w-full bg-[#BAC8FF] rounded-full h-4 mb-2">
            <div 
              className="bg-[#1C1E53] h-4 rounded-full" 
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{project.progress || 0}% Funded</span>
            <span>₦{project.donated_amount || 0} raised of ₦{project.target_amount || 0}</span>
          </div>
        </div> */}

        {/* QR Code for Donations */}
        <div className="flex justify-end">
          <img 
            alt="QR code for project donation" 
            className="w-24 h-24" 
            src={project.qr_code || "https://storage.googleapis.com/a1aa/image/26b4mUXWRKqb1XpCV8tOVs3HkF6jvUWB09Fnh398fVM.jpg"}
          />
        </div>
      </div>
    </div>
  );
}