import React from 'react';
import ChartOne from './ChartOne';
import ChartTwo from './ChartTwo';

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4">
      <ChartOne />
      <ChartTwo />
    </div>
  );
};

export default DashboardCharts;
