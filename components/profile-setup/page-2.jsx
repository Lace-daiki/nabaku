'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/contants';
import { toast } from 'react-toastify';

export default function SetupPage2(props) {
  const { street, city, zipCode, onChange, error } = props;
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/authentication/states`);
        const data = await response.json();
        
        if (data.success) {
          setStates(data.data);
        } else {
          toast.error(`Failed to fetch states: ${data.message}`);
        }
      } catch (error) {
        toast.error('Error fetching states. Please try again later.');
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    onChange(e);
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      onChange(e);
      if (value.length > 0 && value.length !== 6) {
        toast.error('Zip code must be exactly 6 characters.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-[48px] text-[#1C1E4C] font-semibold">More information about your organization</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">
        We display your address to donors not just because it is a legal requirement but because having an address helps build trust with potential donors.
      </p>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-8 w-[886px] h-[266px] bg-[#F3F3F3] rounded-[40px] flex flex-col justify-center p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
            value={street}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
            value={city}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
            value={zipCode}
            onChange={handleZipCodeChange}
            required
            maxLength={6}
          />
          <select
            name="state"
            value={selectedState}
            onChange={handleStateChange}
            className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
