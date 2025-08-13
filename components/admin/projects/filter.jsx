"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export function ProjectFilter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-[476px] bg-white flex-grow justify-between border border-[#8E92BC] py-[14px] px-[28px] rounded-[50px] md:flex-grow-0">
          <input
            type="text"
            placeholder="Search transaction"
            className=" font-normal text-[12px] text-[#54577A] w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute py-[12px] px-[28px] right-2 top-1/2 transform -translate-y-1/2 text-[#54577A] cursor-pointer" aria-label="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className='flex gap-8'>
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" border border-[#8E92BC] py-[14px] px-[28px] rounded-[50px] bg-white font-medium text-[12px] text-[#54577A]"
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            {/* Add more categories as needed */}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-[#8E92BC] py-[14px] px-[28px] rounded-[50px] bg-white font-medium text-[12px] text-[#54577A]"
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
            {/* Add more sorting options as needed */}
          </select>
        </div>
    </div>
  );
}