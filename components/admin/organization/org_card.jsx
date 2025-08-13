'use client';

import { useRouter } from 'next/navigation';

export default function OrgCard({ organization }) {
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/${organization._id}`);
  }

  // Check if organization is defined
  if (!organization) {
    return (
      <div className="w-[389.3333435058594px] h-[552px] p-2 bg-white rounded-lg shadow-md overflow-hidden">
        <p className="text-gray-500 text-center">No organization data available</p>
      </div>
    );
  }
  
  return (
    <div 
      className="w-[350px] h-[140px] p-2 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex items-center"
      onClick={onClick}
    >
      <img
        alt={organization.organization_name || "Project Image"}
        className="w-full h-[48px] object-cover rounded-full"
        src={organization.cover_image || "https://storage.googleapis.com/a1aa/image/5YbMfRay7XTjah15UB0TYoPDHRXzotmY0lmUBZ0ICXg.jpg"}
      />
      <div className="w-full">
        <h4 className="text-[16px] w-[300px] pb-4 font-medium mb-2 line-clamp-2">
          {organization.organization_name}
        </h4>
      </div>
    </div>
  );
}
