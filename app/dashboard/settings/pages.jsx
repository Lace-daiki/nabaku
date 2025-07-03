'use client';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C1E4C] mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Profile</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1C1E4C] focus:border-[#1C1E4C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1C1E4C] focus:border-[#1C1E4C]"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1C1E4C] hover:bg-[#8E92BC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C1E4C]"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}