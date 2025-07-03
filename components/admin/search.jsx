'use client';

import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

// const SearchProps = {
//   onSearch: (query) => {},
//   onFilterClick: () => {},
//   placeholder: '',
//   className: ''
// };


const Search = ({
  onSearch,
  onFilterClick,
  placeholder = 'Search...',
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <button
        onClick={onFilterClick}
        className="ml-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        aria-label="Filter"
      >
        <FiFilter size={20} />
      </button>
    </div>
  );
};

export default Search; 