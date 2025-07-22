'use client';

import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function SetupPage1(props) {
  useEffect(() => {
    if (props.error) {
      toast.error(props.error);
    }
  }, [props.error]);

  return (
    <div className="">
      <h1 className="text-[48px] text-[#1C1E4C] font-semibold">Let's begin with your CAC information</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">The information you provide would help us ensure your organization meets the SEC’s requirement for crowdfunding.</p>
      {props.error && <p className="text-red-500">{props.error}</p>}

      <div className="space-y-8 w-[886px] h-[266px] bg-[#F3F3F3] rounded-[40px] flex flex-col justify-center p-[32px] gap-4">
        <input
          type="text"
          name="organization_name"
          placeholder="Registered name of organization"
          className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
          value={props.organization_name}
          onChange={props.onChange}
          required
        />
        <div className="flex space-x-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="registration_number"
            placeholder="Company registration number"
            className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
            value={props.registration_number}
            onChange={props.onChange}
            required
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="confirm_registration_number"
            placeholder="Retype Company registration number"
            className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
            value={props.confirm_registration_number}
            onChange={props.onChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
