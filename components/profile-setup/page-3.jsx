'use client';

import { useRef } from 'react';
import NextImage from 'next/image';
import { toast } from 'react-toastify';

export default function SetupPage3({ organizationCertificate, setOrganizationCertificate }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setOrganizationCertificate(uploaded);
    toast.success('File uploaded successfully!');
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div className="">
      <h1 className="text-[48px] text-[#1C1E4C] font-semibold">Organization’s legal documents</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">To ensure transparency and compliance it is important to have a copy of these documents to assure any relevant authority and donor that you are compliant with the SEC’s requirements</p>

      <div className="space-y-8 w-[886px] h-[296px] bg-[#F3F3F3] rounded-[40px] flex justify-center p-[32px]">
        <div className="w-full h-[232px] flex items-center bg-white p-[16px] rounded-[36px] gap-[64px]">
          <div className="rounded-lg">
            <NextImage src="/document.png" alt="Illustration" width={200} height={200} />
          </div>
          <div className="flex flex-col gap-[34px]">
            <div>
              <h2 className="font-semibold text-[20px] text-[#202253] mb-4">Upload Organization Certificate</h2>
              <p className="text-[12px] font-normal text-[#8B8D97]">File Format <b className='text-[#2C2D33]'>jpeg, png</b>. Recommended Size <b className='text-[#2C2D33]'>600x600 (1:1)</b></p>
            </div>
            <input
              type="file"
              accept=".jpeg,.png"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the input
              name="organizationCertificate"
            />
            <button
              className="w-[274px] h-[56px] px-[32px] py-[16px] bg-[#1C1E4C] text-white text-[14px] font-medium rounded-[60px] gap-3 cursor-pointer"
              onClick={handleButtonClick}
            >
              Register your organization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
