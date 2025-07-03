'use client'

import { FiSearch } from 'react-icons/fi';

export default function ImageOverlay() {
  return (
    <div className="w-full h-[734px] bg-[#12175B] text-white p-8 flex relative">
      <div className='w-[1360px] h-[346px] flex flex-col justify-evenly mt-6'>
        <div className='w-full h-full text-[100px] text-white leading-none mt-10'>
          <p>EMPOWERING</p>
          <div className='flex gap-4'>
            <img src="/Vector.png" alt="" className='w-[50px] h-[72px] mt-3'/>
            <p className='italic'>INITIATIVE</p>
          </div>
          <p className='w-[1360px]'>THROUGH DONATIONS</p>
        </div>
        
        <div className="w-[729px] ml-15 mt-6">
          <p className=' text-[18px] font-normal'>From community centers to mission trips, we translate faith into impactful <br /> transformations</p>
          <div className="relative mt-18">
            <input
              type="text"
              placeholder="Find fundraisers by name of organizations, project, or a person’s name"
              className="w-[602px] h-[64px] px-12 py-3 rounded-full text-[16px] font-medium bg-white text-black"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FiSearch size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-[875px] h-[626px] absolute right-0'>
        <img src="/overlay.png" alt="" width={875} height={626}/>
      </div>
    </div>
  );
}
