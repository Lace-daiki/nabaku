'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { transactionsService } from '@/services/transactions/transactions';

// Fetch transactions from API
const fetchTransactions = async () => {
  const response = await transactionsService.getAllTransactions();
  // Map API data to table format
  if (response && response.data) {
    return response.data.map((tx) => ({
      id: tx.tx_ref || tx._id,
      time: new Date(tx.createdAt).toLocaleString(),
      name: tx.fullname || tx.email || 'Anonymous',
      amount: `N${Number(tx.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      project: tx.project || '',
      status: tx.status || '',
      raw: tx, // keep original for future use
    }));
  }
  return [];
};

export default function TransactionsTable() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    project: '',
    amountRange: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  const filterRef = useRef(null);

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

  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  const filterTransactions = (transactions, filters, search) => {
    return transactions.filter(tx => {
      const matchesSearch = 
        tx.name.toLowerCase().includes(search.toLowerCase()) ||
        tx.id.toLowerCase().includes(search.toLowerCase()) ||
        tx.project.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = !filters.status || tx.status === filters.status;
      const matchesProject = !filters.project || tx.project === filters.project;

      const amountValue = parseFloat(tx.amount.replace(/[^0-9.]/g, ''));
      let matchesAmount = true;
      if (filters.amountRange === 'low') matchesAmount = amountValue < 100000;
      if (filters.amountRange === 'medium') matchesAmount = amountValue >= 100000 && amountValue < 500000;
      if (filters.amountRange === 'high') matchesAmount = amountValue >= 500000;

      return matchesSearch && matchesStatus && matchesProject && matchesAmount;
    });
  };

  const filteredTransactions = filterTransactions(transactions || [], filters, search);
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'successful': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const uniqueProjects = [...new Set(transactions?.map(tx => tx.project))];
  const statusOptions = ['Successful', 'Pending', 'Failed'];
  const amountRanges = [
    { value: 'low', label: 'Low (< N100,000)' },
    { value: 'medium', label: 'Medium (N100,000 - N500,000)' },
    { value: 'high', label: 'High (> N500,000)' }
  ];

  const clearFilters = () => {
    setFilters({
      status: '',
      project: '',
      amountRange: ''
    });
  };

  if (isLoading) return (
    <div className="w-full p-6">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="w-full p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Failed to load transactions
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      {/* Table Header with Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-700">Recent transactions</h3>
        <div className="flex items-center w-full md:w-auto gap-2">
          {/* Search Input */}
          <div className="relative w-[476px] flex-grow md:flex-grow-0">
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
          
          {/* Filter Button with Dropdown */}
          <div className="relative" ref={filterRef}>
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
                <div className="mb-4">
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
                  onClick={() => setShowFilters(false)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[13px] font-medium text-[#8B909A]">
              <th className="py-3 px-4">TRANSACTION ID</th>
              <th className="py-3 px-4">TIME</th>
              <th className="py-3 px-4">NAME</th>
              <th className="py-3 px-4">TOTAL</th>
              <th className="py-3 px-4">PROJECT</th>
              <th className="py-3 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody className='bg-[#E9E7FD] rounded-[80px]'>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx, index) => (
                <tr key={index} className={`bg-[#E9E7FD]`}>
                  <td className="py-3 px-4 font-medium">{tx.id}</td>
                  <td className="py-3 px-4">{tx.time}</td>
                  <td className="py-3 px-4">{tx.name}</td>
                  <td className="py-3 px-4">{tx.amount}</td>
                  <td className="py-3 px-4">{tx.project}</td>
                  <td className="py-3 px-4">
                    <span className={`${getStatusColor(tx.status)} py-1 px-3 rounded-full text-xs font-medium`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No transactions found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="px-3 py-1 border rounded-lg bg-blue-900 text-white">
            {currentPage}
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTransactions.length / itemsPerPage)))}
            className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100"
            disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}