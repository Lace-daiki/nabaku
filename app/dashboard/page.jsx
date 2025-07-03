'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import TimeStamp from '@/components/calendar';
import Income from '@/components/income';
import LiveProjects from '@/components/liveprojects';
import PriorityProjects from '@/components/projects/priority-project';

export default function DashboardPage() {

  return (
    <ProtectedRoute>
      <div className='flex justify-between gap-4'>
        <div>
          <Income />
          <LiveProjects />
        </div>
          
          <div>
            <TimeStamp />
            <PriorityProjects />  
          </div>
      </div>
    </ProtectedRoute>
  );
}