'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import WeeklyEvents from '@/components/general/search/events';
import OngoingProjectsClient from '@/components/general/search/proj-carousel';
import { getOrganizationDetails } from '@/services/general/search';
import { useParams } from 'next/navigation';

export default function OrgDetails() {
  const params = useParams();
  const id = params?.id;
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchOrganizationData = async () => {
      try {
        const orgData = await getOrganizationDetails(id);
        if (orgData) {
          setOrganization(orgData);
        } else {
          toast.error('Organization not found.');
        }
      } catch (error) {
        toast.error('Failed to load organization data');
        console.error('Error fetching organization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading organization data...</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex items-center justify-center">
        <div className="text-center">
          <p className="mt-2 text-gray-600">Organization not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#1C1E4C]">
      {/* Cover and Logo */}
      <div className="w-full h-[600px] bg-gray-200 rounded-[40px] overflow-hidden relative z-0">
        {organization.cover_image ? (
          <Image
            src={organization.cover_image}
            alt="Cover banner"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No cover image</span>
          </div>
        )}
      </div>

      <div className='bg-white rounded-t-[40px] p-[40px] -mt-[240px] relative z-10'>
        <div className='relative mb-16'>
          <div className="absolute bottom-[-32px] left-6">
            <div className="w-[300px] h-[300px] rounded-[20px] border-[8px] border-white bg-white overflow-hidden shadow relative">
              {organization.profile_image ? (
                <Image
                  src={organization.profile_image}
                  alt="Organization logo"
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Logo</span>
                </div>
              )}
            </div>
          </div>
          <div className='ml-[370px]'>
            <h3 className='font-bold text-[32px] text-[#1C1E4C]'>{organization.name || 'Organization Name'}</h3>
            {/* <p className='font-medium text-[18px] text-[#1C1E4C]'>{organization.type || 'Organization Type'}</p> */}
          </div>
        </div>
        <h2 className='font-medium text-[48px] text-[#1C1E4C] ml-[50px] mb-[50px]'><span className='font-bold italic'>organization's</span> overview</h2>
        {/* About Section */}
        <div className="bg-[#F3F3F3] py-[96px] px-[64px] rounded-[40px] flex justify-between shadow mb-8">
          <div className='w-[656px] flex flex-col gap-4'>
            <h4 className="text-[24px] font-bold self-start text-[#1C1E4C]">About us</h4>
            <p className="text-[18px] font-medium text-[#1C1E4C]">
              {organization.description || 'No description available.'}
            </p>
          </div>
          <div className='w-[521px] text-[#1C1E4C] flex flex-col items-center gap-10'>
            <div className='w-full flex  gap-25 mb-[20px]'>
              <div className='flex flex-col justify-between gap-5'>
                <p className='text-[14px] font-medium'>Location</p>
                <p className='text-[18px] font-bold'>{organization.address?.city || 'Not specified'}</p>
              </div>
              <div className='flex flex-col justify-between gap-5'>
                <p className='text-[14px] font-medium'>Website</p>
                <p className='text-[18px] font-bold'>-</p>
              </div>
            </div>
            <div className='w-full flex  gap-25'>
              <div className='flex flex-col justify-between gap-5'>
                <p className='text-[14px] font-medium'>Telephone</p>
                <p className='text-[18px] font-bold'>{organization.contact?.phone || organization.phone || 'Not specified'}</p>
              </div>
              <div className='flex flex-col justify-between gap-5'>
                <p className='text-[14px] font-medium'>Email</p>
                <p className='text-[18px] font-bold'>{organization.contact?.email || organization.email || 'Not specified'}</p>
              </div>
            </div>
            <div className='flex gap-[32px] self-start'>
              {organization.contact?.instagram && (
                <Link href={organization.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className='w-[40px] h-[40px] border border-[#8E92BC] p-[11px] rounded-[40px] items-center flex'>
                  <Image src="/insta.png" alt="Instagram Icon" width={18} height={18} />
                </Link>
              )}
              {organization.contact?.twitter && (
                <Link href={organization.contact.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className='w-[40px] h-[40px] border border-[#8E92BC] p-[11px] rounded-[40px] items-center flex'>
                  <Image src="/X.png" alt="Twitter Icon" width={21} height={20} />
                </Link>
              )}
              {organization.contact?.youtube && (
                <Link href={organization.contact.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className='w-[40px] h-[40px] border border-[#8E92BC] p-[11px] rounded-[40px] items-center flex'>
                  <Image src="/youtube.png" alt="YouTube Icon" width={20.73} height={15.11} />
                </Link>
              )}
              {organization.contact?.facebook && (
                <Link href={organization.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className='w-[40px] h-[40px] border border-[#8E92BC] p-[11px] rounded-[40px] items-center flex'>
                  <Image src="/Facebook.png" alt="Facebook Icon" width={11} height={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
        <section className='mb-[180px]'>
          <h2 className='font-medium text-[48px] text-[#1C1E4C] ml-[50px] mb-[30px]'><span className='font-bold italic'>weekly</span> events</h2>
          <WeeklyEvents />
        </section>
        <section className='mb-[180px]'>
          <h2 className='font-medium text-[48px] text-[#1C1E4C] ml-[50px] mb-[30px]'><span className='font-bold italic'>ongoing</span> projects</h2>
          <OngoingProjectsClient organizationId={id} />
        </section>
      </div>
    </div>

  );
}