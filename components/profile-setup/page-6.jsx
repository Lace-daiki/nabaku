'use client';

import { toast } from 'react-toastify';

export default function SetupPage6({ overview, onChange }) {

  return (
    <div className="">
      <h1 className="text-[48px] text-[#1C1E4C] font-medium"><span className='font-bold italic'>great!</span> Now write an overview to tell the world about your organization.</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">
        Help people get to know about your organization at glance. You can always edit later, however, make sure you proofread before you submit.
      </p>

      <div className="space-y-8 w-[886px] h-[266px] bg-[#F3F3F3] rounded-[40px] flex flex-col justify-center p-4">
      <textarea
        name="overview"
        value={overview}
        onChange={onChange}
        placeholder="Your overview"
        className="w-full h-40 p-4 rounded-[20px] border border-[#8E92BC] text-[16px] text-[#1C1E4C] resize-none focus:outline-none focus:ring-2 focus:ring-[#202253] bg-white"
      />
      </div>
    </div>
  );
}
