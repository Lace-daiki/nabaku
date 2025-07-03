// components/SearchBar.js
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState('');
  const filterRef = useRef(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    project: '',
    amountRange: ''
  });

  const statusOptions = ['Pending', 'Completed', 'In Progress'];
  const uniqueProjects = ['Project A', 'Project B', 'Project C'];
  const amountRanges = [
    { value: '0-100', label: '$0 - $100' },
    { value: '101-500', label: '$101 - $500' },
    { value: '501-1000', label: '$501 - $1000' },
  ];

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(search);
//   };

  const clearFilters = () => {
    setFilters({
      status: '',
      project: '',
      amountRange: ''
    });
  };

  const applyFilters = () => {
    onFilter(filters);
    setShowFilters(false);
  };

  return (
    <form style={{ display: 'flex', alignItems: 'center' }}>
      <div className="relative w-[476px] flex-grow justify-between md:flex-grow-0">
        <input
          type="text"
          placeholder="Find transaction"
          className="border border-gray-300 rounded-[20px] py-[12px] px-[28px] w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="absolute py-[12px] px-[28px] right-2 top-1/2 transform -translate-y-1/2 text-gray-500" aria-label="Search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="relative ml-2" ref={filterRef}>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`border-1 border-gray-200 p-2 rounded-lg flex items-center gap-2 ${Object.values(filters).some(Boolean) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          aria-haspopup="true"
          aria-expanded={showFilters}
        >
          <FontAwesomeIcon icon={faFilter} />
          {Object.values(filters).some(Boolean) && (
            <span className="text-xs font-medium">Filtered</span>
          )}
        </button>
        
        {/* Filter Dropdown */}
        {showFilters && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-800">Filters</h4>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>
            
            {/* Status Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Statuses</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            {/* Project Filter */}
            <div className="mb -4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
                value={filters.project}
                onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Projects</option>
                {uniqueProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
            
            {/* Amount Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
              <select
                value={filters.amountRange}
                onChange={(e) => setFilters({ ...filters, amountRange: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Ranges</option>
                {amountRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={applyFilters}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;