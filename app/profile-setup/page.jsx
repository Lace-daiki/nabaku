'use client';
import { useState } from 'react';
import Image from 'next/image';
import SetupPage1 from '@/components/profile-setup/page-1';
import SetupPage2 from '@/components/profile-setup/page-2';
import SetupPage3 from '@/components/profile-setup/page-3';
import SetupPage4 from '@/components/profile-setup/page-4';
import SetupPage5 from '@/components/profile-setup/page-5';
import { toast } from 'react-toastify';
import SetupPage6 from '@/components/profile-setup/page-6';
import SetupPage7 from '@/components/profile-setup/page-7';
import ReviewPage from '@/components/profile-setup/page-8';

const steps = [
  'Basic Information',
  'Contact Information',
  'Legal Documents',
  'Banking Information',
  'Profile Pictures',
  'Organization Overview',
  'Social Media',
  'Review & Submit'
];

export default function ProfileSetup() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    organization_name: '',
    registration_number: '',
    confirm_registration_number: '',
    organization_address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    dob: '',
    bio: '',
    profile_image: null,
    cover_image: null, // Added cover picture state
    preferences: '',
    organizationCertificate: null,
    bankName: '',
    accountNumber: '',
    bank: '',
    overview: '', // Added overview field
    phone: '',
    email: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
  });

  const [profile_imagePreview, setProfile_imagePreview] = useState(null);
  const [cover_imagePreview, setCover_imagePreview] = useState(null);
  const [organizationCertificatePreview, setOrganizationCertificatePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in form.organization_address) {
      setForm((prev) => ({
        ...prev,
        organization_address: {
          ...prev.organization_address,
          [name]: value,
        },
      }));
    } else if (name === 'profile_image' && e.target.files[0]) {
      setForm((prev) => ({ ...prev, profile_image: e.target.files[0] }));
      setProfile_imagePreview(URL.createObjectURL(e.target.files[0]));
    } else if (name === 'cover_image' && e.target.files[0]) {
      setForm((prev) => ({ ...prev, cover_image: e.target.files[0] }));
      setCover_imagePreview(URL.createObjectURL(e.target.files[0]));
    } else if (name === 'organizationCertificate' && e.target.files[0]) {
      setForm((prev) => ({ ...prev, organizationCertificate: e.target.files[0] }));
      setOrganizationCertificatePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 0: // Basic Information
        if (!form.organization_name || !form.registration_number || !form.confirm_registration_number) {
          toast.error('Please fill in all fields.');
          return false;
        }
        if (form.registration_number !== form.confirm_registration_number) {
          toast.error('Registration numbers do not match.');
          return false;
        }
        return true;

      case 1: // Contact Information
        const { street, city, state, zipCode } = form.organization_address;
        if (!street || !city || !state || !zipCode) {
          toast.error('Please fill in all address fields.');
          return false;
        }
        return true;

      case 2: // Organization Certificate
        if (!form.organizationCertificate) {
          toast.error('Please upload your organization certificate.');
          return false;
        }
        return true;

      case 3: // Banking Info
        if (!form.bankName || !form.accountNumber || !form.bank) {
          toast.error('Please fill in all banking information fields.');
          return false;
        }
        if (form.accountNumber.length !== 10) {
          toast.error('Account number must be 10 digits.');
          return false;
        }
        return true;

      case 4: // Profile and Cover Picture
        if (!form.profile_image || !form.cover_image) {
          toast.error('Please upload both profile and cover pictures.');
          return false;
        }
        return true;

      case 5: // Overview
        if (!form.overview || form.overview.trim().length < 10) {
          toast.error('Please provide an overview with at least 10 characters.');
          return false;
        }
        return true;

      case 6: // Social Media
        if (!form.phone || !form.email) {
          toast.error('Please provide at least phone and email contact information.');
          return false;
        }
        return true;

      case 7: // Review
        // No validation needed for review step
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(step)) {
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    toast.success('Profile setup complete!');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {/* Left Section - Signup Form */}
      <div className="border-1 rounded-[40px] m-4 p-8 w-[966px] h-[730px] flex flex-col justify-center">
        <div className="mb-10">
          <Image src="/nabaku.png" alt="Illustration" width={200} height={22} />
        </div>
        <div className="flex justify-between mb-8">
          {steps.map((label, idx) => (
            <div key={label} className={`flex-1 text-center ${idx === step ? 'font-bold text-blue-700' : 'text-gray-400'}`}>
              {idx + 1}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 0 && (
            <SetupPage1
              organization_name={form.organization_name}
              registration_number={form.registration_number}
              confirm_registration_number={form.confirm_registration_number}
              onChange={handleChange}
            />
          )}
          {step === 1 && (
            <SetupPage2
              street={form.organization_address.street}
              city={form.organization_address.city}
              state={form.organization_address.state}
              zipCode={form.organization_address.zipCode}
              onChange={handleChange}
            />
          )}
          {step === 2 && (
            <SetupPage3
              organizationCertificate={form.organizationCertificate}
              organizationCertificatePreview={organizationCertificatePreview}
              setOrganizationCertificate={(file) => setForm((prev) => ({ ...prev, organizationCertificate: file }))}
            />
          )}
          {step === 3 && (
            <SetupPage4
              bankName={form.bankName}
              accountNumber={form.accountNumber}
              bank={form.bank}
              onChange={handleChange}
            />
          )}
          {step === 4 && (
            <SetupPage5
              profile_image={form.profile_image}
              profile_imagePreview={profile_imagePreview}
              cover_image={form.cover_image}
              cover_imagePreview={cover_imagePreview}
              onChange={handleChange}
            />
          )}
          {step === 5 && (
            <SetupPage6
              overview={form.overview}
              onChange={handleChange}
            />
          )}
          {step === 6 && (
            <SetupPage7
              phone={form.phone}
              email={form.email}
              youtube={form.youtube}
              instagram={form.instagram}
              facebook={form.facebook}
              twitter={form.twitter}
              onChange={handleChange}
            />
          )}
          {step === 7 && (
            <ReviewPage
              form={form}
              profile_imagePreview={profile_imagePreview}
              cover_imagePreview={cover_imagePreview}
              organizationCertificatePreview={organizationCertificatePreview}
            />
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 0}
              className="w-[52px] h-[52px] rounded-[100px] text-[#54577A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-[#8E92BC]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-15 w-10 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {step < steps.length - 1 ? (
              <button type="button" onClick={nextStep} className="px-[32px] py-[16px] rounded-[60px] bg-[#202253] font-medium text-[14px] text-white flex items-center gap-2 cursor-pointer">
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button type="submit" className="px-[32px] py-[16px] rounded-[60px] bg-[#202253] font-medium text-[14px] text-white flex items-center gap-2 cursor-pointer">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      {/* Right Section - Illustration */}
      <div className="border-1 rounded-[40px]">
        <div className="bg-[#8E92BC] rounded-[40px] p-8">
          <Image src="/login.png" alt="Illustration" width={400} height={746} />
        </div>
      </div>
    </div>
  );
}
