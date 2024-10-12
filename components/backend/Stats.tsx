import React from 'react';
import StatsCard from './StatsCard';
import { FiHome } from 'react-icons/fi';

const Stats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
      <StatsCard
        icon={<FiHome size={24} />}
        color="bg-blue-300"
        title="Home"
        price="49.99"
      />
      <StatsCard
        icon={<FiHome size={24} />}
        color="bg-green-300"
        title="Home"
        price="49.99"
      />
      <StatsCard
        icon={<FiHome size={24} />}
        color="bg-orange-300"
        title="Home"
        price="49.99"
      />
      <StatsCard
        icon={<FiHome size={24} />}
        color="bg-purple-300"
        title="Home"
        price="49.99"
      />
    </div>
  );
};

export default Stats;
