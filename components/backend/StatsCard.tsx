import React from 'react';

interface GlassCardProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  price: string | number;
}

const StatsCard: React.FC<GlassCardProps> = ({ icon, color, title, price }) => {
  return (
    <div
      className={`p-6 w-full lg:max-w-xs rounded-md shadow-lg text-white flex flex-col items-center ${color}`}
      style={{ borderRadius: '6px' }}
    >
      {/* Icon Section */}
      <div className="p-4 rounded-full bg-white bg-opacity-20">{icon}</div>

      {/* Title */}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>

      {/* Price */}
      <p className="mt-2 text-lg font-bold">NGN {price}</p>
    </div>
  );
};

export default StatsCard;
