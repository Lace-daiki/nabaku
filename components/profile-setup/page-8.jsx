import React from 'react';

const ReviewPage = ({ form, profile_imagePreview, cover_imagePreview, organizationCertificatePreview }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-[48px] text-[#1C1E4C] font-semibold">Review Your Information</h1>
      <p className="text-[18px] text-[#1C1E4C] mb-6">Please review all the information you've provided before final submission.</p>
      <div className="space-y-8 w-[886px] bg-[#F3F3F3] rounded-[40px] p-8">
        {/* Basic Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1E4C]">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{form.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Registration Number</p>
              <p className="font-medium">{form.registration_number}</p>
            </div>
          </div>
        </section>
        {/* Contact Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1E4C]">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Street</p>
              <p className="font-medium">{form.street}</p>
            </div>
            <div>
              <p className="text-gray-600">City</p>
              <p className="font-medium">{form.city}</p>
            </div>
            <div>
              <p className="text-gray-600">State</p>
              <p className="font-medium">{form.state}</p>
            </div>
            <div>
              <p className="text-gray-600">Zip Code</p>
              <p className="font-medium">{form.zipCode}</p>
            </div>
          </div>
        </section>
        {/* Legal Documents */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1E4C]">Legal Documents</h2>
          <div>
            {organizationCertificatePreview ? (
              <div className="mt-2">
                <img src={organizationCertificatePreview} alt="Certificate Preview" className="w-32 h-20 object-cover rounded-lg" />
              </div>
            ) : (
              <p className="font-medium">{form.registration_certificate?.name || 'No file uploaded'}</p>
            )}
          </div>
        </section>
        {/* Banking Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1E4C]">Banking Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Bank Name</p>
              <p className="font-medium">{form.accountName}</p>
            </div>
            <div>
              <p className="text-gray-600">Account Number</p>
              <p className="font-medium">{form.accountNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Bank</p>
              <p className="font-medium">{form.bankName}</p>
            </div>
          </div>
        </section>
        {/* Profile Pictures */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1E4C]">Profile Pictures</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Profile Picture</p>
              {profile_imagePreview ? (
                <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden">
                  <img src={profile_imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <p className="font-medium">No image uploaded</p>
              )}
            </div>
            <div>
              <p className="text-gray-600">Cover Picture</p>
              {cover_imagePreview ? (
                <div className="mt-2 w-40 h-20 rounded-lg overflow-hidden">
                  <img src={cover_imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <p className="font-medium">No image uploaded</p>
              )}
            </div>
          </div>
        </section>
        {/* Organization Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1E4C]">Organization Overview</h2>
          <div>
            <p className="text-gray-600">Overview</p>
            <p className="font-medium whitespace-pre-wrap">{form.description}</p>
          </div>
        </section>
        {/* Social Media */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1C1E4C]">Contact & Social Media</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-medium">{form.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{form.email}</p>
            </div>
            <div>
              <p className="text-gray-600">YouTube</p>
              <p className="font-medium">{form.youtube || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Instagram</p>
              <p className="font-medium">{form.instagram || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Facebook</p>
              <p className="font-medium">{form.facebook || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Twitter</p>
              <p className="font-medium">{form.twitter || 'Not provided'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReviewPage;