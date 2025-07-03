import { useQuery } from 'react-query';
import axios from 'axios';

const fetchData = async () => {
  const { data } = await axios.get('/api/dashboard-data');
  return data;
};

export default function DashboardContent() {
  const { data, error, isLoading } = useQuery('dashboardData', fetchData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="w-4/5 p-6">
      <h2 className="text-2xl font-semibold">Income Overview</h2>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold">Running Projects</h3>
          <p className="text-2xl">{data.runningProjects}</p>
        </div>
        <div className="p-4 bg-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold">Funds Raised</h3>
          <p className="text-2xl">{data.fundsRaised}</p>
        </div>
        <div className="p-4 bg-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold">Activity</h3>
          <p className="text-2xl">{data.activity}</p>
        </div>
      </div>
    </div>
  );
}