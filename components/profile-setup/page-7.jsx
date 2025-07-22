'use client';

import { FiPhone, FiMail, FiYoutube, FiInstagram, FiFacebook, FiX } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

export default function SetupPage7({ phone, email, youtube, instagram, facebook, twitter, onChange }) {

  return (
    <div className="">
      <h1 className="text-[48px] text-[#1C1E4C] font-medium"><span className='font-bold italic'>finally</span> provide details about how your organization can be contacted</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">
        Whether it's for questions, support, collaboration, or just to keep track of the organization’s activities, donors may want to connect with you.
      </p>

      <div className="space-y-4 w-[886px] bg-[#F3F3F3] rounded-[40px] flex justify-evenly p-6 gap-4">
          <div className='w-full flex flex-col space-y-4'>
            <ContactInput
              icon={<FiPhone />}
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={onChange}
            />
            <ContactInput
              icon={<FiMail />}
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
            <ContactInput
              icon={<FiYoutube />}
              name="youtube"
              placeholder="Youtube"
              value={youtube}
              onChange={onChange}
            />
          </div>
          <div className='w-full flex flex-col space-y-4'>
            <ContactInput
              icon={<FiInstagram />}
              name="instagram"
              placeholder="Instagram"
              value={instagram}
              onChange={onChange}
            />
            <ContactInput
              icon={<FiFacebook />}
              name="facebook"
              placeholder="Facebook"
              value={facebook}
              onChange={onChange}
            />
            <ContactInput
              icon={<FaXTwitter />}
              name="twitter"
              placeholder="X (Formerly Twitter)"
              value={twitter}
              onChange={onChange}
            />
          </div>
      </div>
    </div>
  );
}


// Reusable Contact Input
function ContactInput({ icon, name, placeholder, value, onChange }) {
  return (
    <div className="flex items-center">
      <label className="text-[#54577A] mr-3 text-lg border border-[#8E92BC] rounded-[40px] p-[11px]">{icon}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-[40px] py-[8px] text-[16px] font-normal px-[32px] border border-[#8E92BC] rounded-[64px]"
      />
    </div>
  );
}