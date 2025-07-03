'use client';

export default function ProjectCard({ project, onClick }) {
  console.log('ProjectCard received project:', project);
  
  return (
    <div 
      className="w-[348px] h-[445px] p-2 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        alt="Project Image"
        className="w-[332px] h-[220px] object-cover rounded-lg"
        src={project.cover_image || "https://storage.googleapis.com/a1aa/image/5YbMfRay7XTjah15UB0TYoPDHRXzotmY0lmUBZ0ICXg.jpg"}
      />
      <div className="w-[328px] h-[190px] py-[16px] px-[14px] bg-[#EBEEF9] mt-4 rounded-lg shadow-md">
        <h4 className="text-[16px] w-[300px] pb-4 font-medium mb-2 break-words">
          {project.title}
        </h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500">{project.progress || 0}%</span>
        </div>
        <div className="w-full bg-[#BAC8FF] rounded-full h-2 mb-4">
          <div 
            className="bg-[#1C1E53] h-2 rounded-full" 
            style={{ width: `${project.donated_amount / project.target_amount * 100 || 0}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <span className="text-[12px]  p-[12px] border-[1px] rounded-[8px] font-medium">{project.days_left || 0} days left</span>
          <span className="text-sm ">₦{project.donated_amount || 0} / ₦{project.target_amount || 0}</span>
        </div>
      </div>
    </div>
  );
}