import DashboardCharts from '@/components/backend/DashboardCharts';
import Heading from '@/components/backend/Heading';
import Stats from '@/components/backend/Stats';
import Table from '@/components/backend/Table';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="px-4">
      <Heading title="Dashboard Overview" />
      {/* <hr className="m-4 bg-red-300" /> */}
      <Stats />
      <DashboardCharts />
      <Table />
    </div>
  );
};

export default Dashboard;
