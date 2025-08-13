'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrgCard from '@/components/admin/organization/org_card';
import { fetchOrganizations } from '@/services/admin/organization/org';

export default function OrganizationsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
      const loadOrganizations = async () => {
          try {
              const data = await fetchOrganizations(); // Use the fetch function
              setOrganizations(data);
          } catch (err) {
              setError(err.message);
              toast.error(err.message); // Show error toast
          } finally {
              setLoading(false);
          }
      };
      loadOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading organizations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Organizations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((organization) => (
          <OrgCard key={organization.id} organization={organization} />
        ))}
      </div>
    </div>
  );
} 