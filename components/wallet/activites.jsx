

export default function WalletActivity () {
    return (
        <div className="w-[372px] h-[498px] bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity</h3>
          <div className="space-y-3">
            {data.activity.map((item) => (
              <div key={item.id} className="flex justify-between text-sm border-b pb-2">
                <div>
                  <p>Donation from ****1234</p>
                  <p className="text-gray-500">{item.date} | {item.status}</p>
                </div>
                <div className="text-indigo-600 font-semibold">+₦{item.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-500 hover:underline">See more</button>
        </div>
    );
}