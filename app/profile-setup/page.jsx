'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SetupPage1 from '@/components/profile-setup/page-1';
import SetupPage2 from '@/components/profile-setup/page-2';
import SetupPage3 from '@/components/profile-setup/page-3';
import SetupPage4 from '@/components/profile-setup/page-4';
import SetupPage5 from '@/components/profile-setup/page-5';
import SetupPage6 from '@/components/profile-setup/page-6';
import SetupPage7 from '@/components/profile-setup/page-7';
import ReviewPage from '@/components/profile-setup/page-8';
import { profileService } from '@/services/auth/profileService';
import { authService } from '@/services/auth/auth';
import { toast } from 'react-toastify';
// import ProtectedRoute from '@/components/ProtectedRoute';

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
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [form, setForm] = useState({
    confirm_registration_number: '',
    // organization_details: {
    description: '',
    profile_image: null,
    cover_image: null,
    // },
    // address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    // },
    // cac_details: {
    name: '',
    registration_number: '',
    registration_certificate: null,
    // },
    // bank_details: {
    accountName: '',
    bankName: '',
    accountNumber: '',
    // },
    // contact_details: {
    phone: '',
    email: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
    // },
    profile_step: 7,
  });

  const [profile_imagePreview, setProfile_imagePreview] = useState(null);
  const [cover_imagePreview, setCover_imagePreview] = useState(null);
  const [organizationCertificatePreview, setOrganizationCertificatePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      // Handle file uploads
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      if (name === 'profile_image') {
        setProfile_imagePreview(URL.createObjectURL(files[0]));
      } else if (name === 'cover_image') {
        setCover_imagePreview(URL.createObjectURL(files[0]));
      } else if (name === 'registration_certificate') {
        setOrganizationCertificatePreview(URL.createObjectURL(files[0]));
      }
    } else {
      // Handle text inputs
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 0:
        if (!form.name || !form.registration_number || !form.confirm_registration_number) {
          toast.error('Please fill in all fields.');
          return false;
        }
        if (form.registration_number !== form.confirm_registration_number) {
          toast.error('Registration numbers do not match.');
          return false;
        }
        return true;
      case 1:
        const { street, city, state, zipCode } = form;
        if (!street || !city || !state || !zipCode) {
          toast.error('Please fill in all address fields.');
          return false;
        }
        return true;
      case 2:
        if (!form.registration_certificate) {
          toast.error('Please upload your organization certificate.');
          return false;
        }
        return true;
      case 3:
        if (!form.accountName || !form.accountNumber) {
          toast.error('Please fill in all banking information fields.');
          return false;
        }
        if (form.accountNumber.length !== 10) {
          toast.error('Account number must be 10 digits.');
          return false;
        }
        return true;
      case 4:
        if (!form.profile_image || !form.cover_image) {
          toast.error('Please upload both profile and cover pictures.');
          return false;
        }
        return true;
      case 5:
        if (!form.description || form.description.trim().length < 10) {
          toast.error('Please provide an overview with at least 10 characters.');
          return false;
        }
        return true;
      case 6:
        if (!form.phone || !form.email) {
          toast.error('Please provide at least phone and email contact information.');
          return false;
        }
        return true;
      case 7:
        return true;
      default:
        return true;
    }
  };

  const handleImageUpload = async (file) => {
    try {
      // Step 1: Get signed upload params from server
      const sigRes = await fetch('/api/cloudinary-signature');
      const { signature, timestamp, folder, cloudName, apiKey } = await sigRes.json();

      // Step 2: Convert file to Base64 string
      const arrayBuffer = await file.arrayBuffer();
      const base64String = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const dataUri = `data:${file.type};base64,${base64String}`;

      // Step 3: Upload directly to Cloudinary without FormData
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: dataUri,
          api_key: apiKey,
          timestamp,
          signature,
          folder
        })
      });

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (step === 7) {
      setLoading(true);
      try {
        const profileImageUrl = form.profile_image ? await handleImageUpload(form.profile_image) : null;
        const coverImageUrl = form.cover_image ? await handleImageUpload(form.cover_image) : null;
        const registrationCertificateUrl = form.registration_certificate ? await handleImageUpload(form.registration_certificate) : null;


        // Structure the data according to the API format
        const profileData = {
          organization_details: {
            description: form.description,
            profile_image: profileImageUrl,
            cover_image: coverImageUrl
          },
          address: {
            street: form.street,
            city: form.city,
            state: form.state,
            zipCode: form.zipCode
          },
          cac_details: {
            name: form.name,
            registration_certificate: registrationCertificateUrl,
            registration_number: form.registration_number
          },
          bank_details: {
            bankName: form.bankName,
            accountNumber: form.accountNumber,
            accountName: form.accountName
          },
          contact_details: {
            phone: form.phone,
            email: form.email,
            youtube: form.youtube || undefined,
            facebook: form.facebook || undefined,
            instagram: form.instagram || undefined,
            twitter: form.twitter || undefined
          },
          profile_step: 7
        };

        // Remove undefined properties from contact_details
        Object.keys(profileData.contact_details).forEach(key => {
          if (profileData.contact_details[key] === undefined) {
            delete profileData.contact_details[key];
          }
        });

        const response = await profileService.updateProfile(profileData);
        console.log(profileData);

        if (response.success) {
          toast.success('Profile submitted successfully!');
          console.log('Submission response:', response);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          toast.error(response.error || 'Submission failed. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting:', error);
        toast.error('Submission failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };



  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <div className="flex h-screen items-center justify-center">
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
              name={form.name}
              registration_number={form.registration_number}
              confirm_registration_number={form.confirm_registration_number}
              onChange={handleChange}
            />
          )}
          {step === 1 && (
            <SetupPage2
              street={form.street}
              city={form.city}
              state={form.state}
              zipCode={form.zipCode}
              onChange={handleChange}
            />
          )}
          {step === 2 && (
            <SetupPage3
              registration_certificate={form.registration_certificate}
              organizationCertificatePreview={organizationCertificatePreview}
              setOrganizationCertificate={(file) => setForm((prev) => ({ ...prev, registration_certificate: file }))}
            />
          )}
          {step === 3 && (
            <SetupPage4
              accountName={form.accountName}
              bankName={form.bankName}
              accountNumber={form.accountNumber}
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
              description={form.description}
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
              <button
                type="button"
                onClick={nextStep}
                disabled={loading} // Disable button while loading
                className="px-[32px] py-[16px] rounded-[60px] bg-[#202253] font-medium text-[14px] text-white flex items-center gap-2 cursor-pointer"
              >
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
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className="px-[32px] py-[16px] rounded-[60px] bg-[#202253] font-medium text-[14px] text-white flex items-center gap-2 cursor-pointer"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="border-1 rounded-[40px]">
        <div className="bg-[#8E92BC] rounded-[40px] p-8">
          <Image src="/login.png" alt="Illustration" width={400} height={746} />
        </div>
      </div>
    </div>
  );
}

// Wrap the component with ProtectedRoute
// export default function ProtectedProfileSetup() {
//   return (
//     <ProtectedRoute>
//       <ProfileSetup />
//     </ProtectedRoute>
//   );
// }
