'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';
import { useAuth } from '@/context/auth/AuthContext';
import { withdrawalRequestService } from '@/services/admin/withdrawals/with_request';

// Status Dropdown Component
function StatusDropdown({ currentStatus, onStatusChange, itemId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dropdownRef = useRef(null);

  // Floating UI for popout-style menu (like right-click context menu)
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right-start',
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'in-progress', label: 'In-progress', color: 'yellow' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' },
  ];

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onStatusChange(itemId, newStatus);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Three dots button */}
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen((v) => !v)}
        disabled={isUpdating}
        className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
        aria-label="Status options"
        {...getReferenceProps()}
      >
        <svg 
          className="w-5 h-5 text-gray-500" 
          fill="currentColor" 
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
      </button>

      {/* Popout menu (portal) */}
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
            className="w-48 bg-white rounded-md shadow-lg border border-gray-200 z-[9999]"
          >
            <div className="py-1">
              <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                Change Status
              </div>
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  disabled={isUpdating || currentStatus?.toLowerCase() === option.value}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentStatus?.toLowerCase() === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      option.color === 'yellow' ? 'bg-yellow-500' :
                      option.color === 'green' ? 'bg-green-500' :
                      option.color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                  ></span>
                  {option.label}
                  {currentStatus?.toLowerCase() === option.value && (
                    <span className="ml-auto text-blue-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </FloatingPortal>
    </div>
  );
}

// Fetch transactions from API
const fetchWithdrawalRequests = async () => {
  try {
    const mapData = (arr) => (arr || []).map((w) => ({
      // IDs
      id: w._id || w.id || w.tx_ref,
      // Time
      time: w.createdAt ? new Date(w.createdAt).toLocaleString() : '',
      // Email/name
      email: w.email || w.organization?.email || '',
      name: w.fullname || w.email || w.organization?.email || 'Anonymous',
      // Reference
      reference: w.reference || w.tx_ref || '',
      // Amount (keep string for display and search)
      amount: `-₦${Number(w.amount || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      // Raw amount for calculations
      rawAmount: Number(w.amount || 0),
      // Project if available
      project: w.project || '',
      // Status (capitalize like RecentWithdrawals)
      status: w.status ? w.status.charAt(0).toUpperCase() + w.status.slice(1) : '',
      // Raw data
      raw: w,
    }));

    // 1) Try pending first
    const pendingRes = await withdrawalRequestService.getWithdrawalsRequests({ status: 'pending', page: 1, pageSize: 50 });
    if (pendingRes && (pendingRes.success || Array.isArray(pendingRes.data))) {
      const data = mapData(pendingRes.data);
      if (data.length) return data;
    }

    // 2) If no pending, fetch ALL
    const allRes = await withdrawalRequestService.getWithdrawalsRequests({ page: 1, pageSize: 50 });
    if (allRes && (allRes.success || Array.isArray(allRes.data))) {
      return mapData(allRes.data);
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch withdrawal requests', error);
    throw error;
  }
};

export default function WithdrawalRequestTable() {
  const { user } = useAuth();
  const isAuthed = !!user;
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    project: '',
    amountRange: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filterRef = useRef(null);
  const queryClient = useQueryClient();

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

  const { data: withdrawals, isLoading, isError } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: fetchWithdrawalRequests,
    enabled: isAuthed,
  });

  // Mutation for updating withdrawal status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ withdrawalId, newStatus }) => {
      // Call your PATCH endpoint here
      const response = await withdrawalRequestService.updateWithdrawalStatus(withdrawalId, newStatus);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update status');
      }
      
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['withdrawals']);
    },
    onError: (error) => {
      console.error('Error updating withdrawal status:', error);
    }
  });

  const handleStatusChange = async (withdrawalId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ withdrawalId, newStatus });
      // Success is handled by onSuccess
    } catch (error) {
      // Error is handled by onError
      throw error; // Re-throw to handle in dropdown
    }
  };

  const filterTransactions = (transactions, filters, search) => {
    return transactions.filter(tx => {
      const matchesSearch =
        (tx.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (tx.id || '').toLowerCase().includes(search.toLowerCase()) ||
        (tx.project || '').toLowerCase().includes(search.toLowerCase()) ||
        (tx.reference || '').toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        !filters.status ||
        String(tx.status).toLowerCase() === String(filters.status).toLowerCase();
      const matchesProject = !filters.project || tx.project === filters.project;

      const amountValue = tx.rawAmount || 0;
      let matchesAmount = true;
      if (filters.amountRange === 'low') matchesAmount = amountValue < 100000;
      if (filters.amountRange === 'medium') matchesAmount = amountValue >= 100000 && amountValue < 500000;
      if (filters.amountRange === 'high') matchesAmount = amountValue >= 500000;

      return matchesSearch && matchesStatus && matchesProject && matchesAmount;
    });
  };

  const filteredTransactions = filterTransactions(withdrawals || [], filters, search);
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-yellow-300 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const uniqueProjects = [...new Set((withdrawals || []).map(tx => tx.project))].filter(Boolean);
  const statusOptions = ['completed', 'pending', 'in-progress', 'cancelled'];
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

  if (!isAuthed) return (
    <div className="w-full p-6">
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        Please sign in to view withdrawal requests.
      </div>
    </div>
  );

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
        <h3 className="text-lg font-semibold text-gray-700">Recent withdrawal requests</h3>
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
              <th className="py-3 px-4">Withdrawal ID</th>
              <th className="py-3 px-4">REFERENCE</th>
              <th className="py-3 px-4">EMAIL</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody className='bg-[#E9E7FD] rounded-[80px]'>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx, index) => (
                <tr key={index} className={`bg-[#E9E7FD]`}>
                  <td className="py-3 px-4 font-medium">{tx.id}</td>
                  <td className="py-3 px-4">{tx.reference}</td>
                  <td className="py-3 px-4">{tx.email}</td>
                  <td className="py-3 px-4">{tx.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`${getStatusColor(tx.status)} py-1 px-3 rounded-full text-xs font-medium`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
            <StatusDropdown
              currentStatus={tx.status}
              onStatusChange={handleStatusChange}
              itemId={tx.raw?._id || tx.id}
            />
          </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
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