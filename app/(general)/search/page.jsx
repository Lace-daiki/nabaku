'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import FundraiserCard from '@/components/general/search/card';
import ContactCard from '@/components/general/contact';
import { searchOrganizations } from '@/services/general/search';

export default function GeneralSearch() {
  
  const [searchText, setSearchText] = useState('');
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  async function fetchFundraisers(query) {
    setLoading(true);
    try {
      const results = await searchOrganizations(query);
      setFundraisers(results);
    } catch (error) {
      toast.error(error.message || 'Error fetching fundraisers');
      setFundraisers([]);
    } finally {
      setLoading(false);
    }
  }
  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchText(value);
    const q = value.trim();
    if (q.length === 0) {
      setFundraisers([]);
      return;
    }
    fetchFundraisers(q);
  }
  useEffect(() => {
    // do not fetch on mount; wait until user types
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="h-[410px] bg-[#1C1E4C] py-[185px] px-[40px] flex flex-col items-center justify-center gap-8 text-white">
        <h1 className="text-[48px] font-medium tracking-wide">
          <span className='italic'>FIND</span> FUNDRAISERS
        </h1>
        <div className="mt-6 w-full max-w-2xl">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Find fundraisers by name of organizations, project, or a person's name"
            className="w-full h-[64px] py-[8px] px-[32px] bg-white rounded-full text-sm focus:outline-none text-gray-700"
          />
        </div>
      </div>


      <div className="px-[40px] py-[150px] bg-[#ffffff] rounded-t-[40px] -mt-10 ">
        <div className='bg-[#F3F3F3] mb-[60px] pt-[96px] px-[64px] pb-[32px] rounded-[40px]'>
          {searchText.trim().length > 0 && (
            <h2 className="text-[48px] font-medium text-[#1C1E4C]">Search Results for “{searchText}”</h2>
          )}

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <button className="border px-4 py-1 rounded-full text-sm text-gray-700">
              Filters
            </button>
            <select className="border px-4 py-1 rounded-full text-sm text-gray-700">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Ending Soon</option>

            </select>
          </div>

          {/* Grid */}
          {searchText.trim().length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
              {loading ? (
                <p>Loading fundraisers...</p>
              ) : fundraisers.length > 0 ? (
                fundraisers.map((item) => (
                  <FundraiserCard key={item.id} {...item} />
                ))
              ) : (
                <p>No fundraisers found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <ContactCard />
    </div>
  );
}
