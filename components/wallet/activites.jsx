'use client';

import { useState, useEffect } from 'react';
import { getWalletActivities } from '@/services/wallet/withdrawals/withdrawals';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WalletActivity() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getWalletActivities();
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setActivities(sortedData);
            } catch (error) {
                console.error("Failed to fetch activities", error);
                toast.error("Could not load activities. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    if (loading) {
        return (
            <div className="w-[372px] h-[498px] bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Activity</h3>
                <p>Loading activities...</p>
            </div>
        );
    }

    return (
        <div className="w-[372px] h-[498px] bg-white p-6 rounded-lg shadow-sm">
            {/* ToastContainer is used to render the toast notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <h3 className="text-lg font-semibold mb-4">Activity</h3>
            {activities.length > 0 ? (
                <div className="space-y-3">
                    {activities.slice(0, 5).map((item) => (
                        <div key={item._id} className="flex justify-between text-sm border-b pb-2">
                            <div>
                                <p className='capitalize'>{item.type} from {item.anonymous ? 'Anonymous' : item.fullname || 'N/A'}</p>
                                <p className="text-gray-500 capitalize">{new Date(item.createdAt).toLocaleDateString()} | {item.status}</p>
                            </div>
                            <div className={`font-semibold ${item.type === 'donation' ? 'text-indigo-600' : 'text-red-600'}`}>
                                {item.type === 'donation' ? '+' : '-'}₦{item.amount.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No activities found.</p>
            )}
            {activities.length > 5 && <button className="mt-4 text-blue-500 hover:underline">See more</button>}
        </div>
    );
}