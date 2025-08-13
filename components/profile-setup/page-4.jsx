'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '@/lib/contants';

export default function SetupPage4({ bankName, accountNumber,accountName, bank, onChange }) {
  const [banks, setBanks] = useState([]);
  const [accountNumberError, setAccountNumberError] = useState('');

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/bank/list`);
        const data = await response.json();
        
        if (data.status === "success") {
          setBanks(data.data);
        } else {
          console.error('Failed to fetch bank list:', data.message);
          toast.error('Failed to fetch bank list. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching bank list:', error);
        toast.error('Error fetching bank list. Please check your connection.');
      }
    };
    fetchBanks();
  }, []);

  const handleBankChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    
    // Only allow digits and limit to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setAccountNumberError(value.length < 10 ? 'Account number must be 10 digits' : '');
      if (onChange) {
        onChange({
          target: {
            name: 'accountNumber',
            value,
          },
        });
      }
    }
  };

  return (
    <div className="">
      <h1 className="text-[48px] text-[#1C1E4C] font-semibold">Let's have your banking information</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">This information allows us to understand you better and tailor our support to your fundraising requirements.</p>

      <div className="space-y-8 w-[886px] h-[280px] bg-[#F3F3F3] rounded-[40px] flex flex-col justify-center p-4">
        <label>
          <input
            type="text"
            name="accountName"
            placeholder="Name of organization's account"
            className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
            value={accountName}
            onChange={onChange}
          />
        </label>
        <div className="flex space-x-4">
          <div className="w-full">
            <input
              type="text"
              name="accountNumber"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Bank account number (10 digits)"
              className={`w-full h-[66px] py-[8px] px-[32px] border rounded-[64px] ${
                accountNumberError ? 'border-red-500' : 'border-[#8E92BC]'
              }`}
              value={accountNumber}
              onChange={handleAccountNumberChange}
              maxLength={10}
            />
            {accountNumberError && (
              <p className="text-red-500 text-sm mt-1 ml-4">{accountNumberError}</p>
            )}
          </div>
          <label>
            <select
              name="bankName"
              value={bankName}
              onChange={handleBankChange}
              className="w-full h-[66px] py-[8px] px-[32px] border border-[#8E92BC] rounded-[64px]"
              required
            >
              <option value="">Select Bank</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.name}>{bank.name}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
