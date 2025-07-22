'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(
    `Celebration Church International is a prolific teaching ministry where we envision all men celebrating endless life in Christ Jesus.
Celebration Church was established in November 2012, and is led by Apostle Emmanuel Iren, who partners with the faith. At Celebration Church International, we believe fully in the death, burial, and resurrection of Christ; and in the saving power of the gospel.
We are committed to knowing Christ and making Him known. We grow in the knowledge of Christ, and build ourselves up through regular in-depth teaching services, prayer sessions, and evangelistic outreaches.
We are a mission-minded church that believes in spreading the gospel to the uttermost ends of the earth, because we are the hands and feet of Christ on the earth. We believe that the gifts of the Spirit are at work in the life of the believer, so our services are an experience of the uninhibited flow of the Spirit through prayer...`
  );

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage how your organization appears to the public on Nabaku.
      </p>

      {/* Cover and Logo */}
      <div className="relative mb-10">
        <img
          src="/cover.jpg" // Replace with actual cover image path
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
        <img
          src="/logo.png" // Replace with actual logo path
          alt="Logo"
          className="w-20 h-20 object-cover rounded-lg absolute bottom-[-40px] left-8 border-4 border-white"
        />
        <button className="absolute right-8 bottom-4 text-sm text-blue-500 underline">
          See public view
        </button>
      </div>

      {/* About Your Organization */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">About your organization</h2>
            <p className="text-sm text-gray-500">
              Help people get to know about your organization at a glance
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-500 underline"
          >
            {isEditing ? 'Save' : 'Edit ✎'}
          </button>
        </div>
        <div className="mt-4">
          {isEditing ? (
            <textarea
              rows="6"
              className="w-full p-4 border rounded-md text-sm"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
            />
          ) : (
            <div className="bg-indigo-50 p-4 rounded-md text-sm whitespace-pre-wrap">
              {aboutText}
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Social network links</h2>
        <p className="text-sm text-gray-500 mb-4">
          Connect your organization's social media profiles to your Nabaku account
        </p>
        <div className="grid grid-cols-2 gap-4">
          {['Phone', 'Email', 'YouTube', 'Instagram'].map((label) => (
            <input
              key={label}
              type="text"
              placeholder={label}
              className="border rounded-md p-2 text-sm w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}