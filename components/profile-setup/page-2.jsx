'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { API_BASE_URL } from '@/lib/contants';

export default function SetupPage2(props) {
  const { street, city, zipCode, onChange, error } = props;
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  useEffect(() => {
    // Fetch states from the API
    const fetchStates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/authentication/states`);
        const data = await response.json();
        
        if (data.success) {
          setStates(data.data); // Set the states array from the response
        } else {
          console.error('Failed to fetch states:', data.message);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    onChange(e); // Call the onChange function to update the form state
  };

  return (
    <div className="">
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
            onChange={onChange}
            required
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
              <option key={state} value={state}>{state}</option> // Use state name as key
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
