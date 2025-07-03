'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Card({ project }) {
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/${project._id}`);
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Check if project is defined
  if (!project) {
    return (
      <div className="w-[389.3333435058594px] h-[552px] p-2 bg-white rounded-lg shadow-md overflow-hidden">
        <p className="text-gray-500 text-center">No project data available</p>
      </div>
    );
  }
  
  return (
    <div 
      className="w-[389.3333435058594px] h-[552px] p-2 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <img
        alt={project.title || "Project Image"}
        className="w-full h-[318px] object-cover rounded-[10px]"
        src={project.cover_image || "https://storage.googleapis.com/a1aa/image/5YbMfRay7XTjah15UB0TYoPDHRXzotmY0lmUBZ0ICXg.jpg"}
      />
      <div className="w-full h-[204px] py-[16px] px-[14px] bg-[#EBEEF9] mt-4 rounded-lg shadow-md">
        <h4 className="text-[16px] w-[300px] pb-4 font-medium mb-2 line-clamp-2">
          {project.title}
        </h4>
        
        {/* Project Meta */}
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          {project.contributor_count || 0}
          <FontAwesomeIcon icon={faClock} className="ml-4 mr-2" />
          {project.days_left || 0} days
          <span className={`ml-4 px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
            {project.status || 'Ongoing'}
          </span>
        </div>

        <div className="w-full bg-[#BAC8FF] rounded-full h-2 mb-2">
          <div 
            className="bg-[#1C1E53] h-2 rounded-full" 
            style={{ width: `${(project.donated_amount / project.target_amount * 100) || 0}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <span className="text-[16px] text-[#1C1E4C] font-medium">₦{project.donated_amount || 0}</span>
          <span className="text-[16px] font-medium">₦{project.target_amount || 0}</span>
        </div>
      </div>
    </div>
  );
}
