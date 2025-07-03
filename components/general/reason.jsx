'use client';

import Image from 'next/image';

export default function Reason() {

  return (
      <div className="w-full h-[535px] flex flex-col md:flex-row gap-4 mb-10">
          <Image 
            src="/image 40.png" 
            alt="Reason for choosing us" 
            width={314} 
            height={535} 
            className="object-cover" 
          />
        <div className="w-full h-[535px] bg-[#F3F3F3] rounded-[20px] py-[94px] px-[64px] text-gray-800">
          <h3 className="text-[48px] text-[#1C1E4C] font-[540] italic mb-[60px]">Who <span className='not-italic font-medium'>we are</span></h3>
          <p className="text-[18px] font-medium text-[#1C1E4CCC] mb-[60px]">
            Welcome to Na Ba Ku, your dedicated platform for facilitating seamless donations to both
            charitable causes and religious organizations worldwide. Our mission is to empower
            individuals and organizations to support their chosen causes with ease and efficiency,
            eliminating the need for cumbersome communication methods such as phone calls or emails.
          </p>
          <button className="mt-2 bg-white text-[#1e1b4b] text-[14px] font-medium py-[16px] px-[32px] rounded-full border hover:bg-gray-100 transition">
            See More ↑
          </button>
        </div>
      </div>
  );
}