import React from 'react';
import AnimatedButton from '../Design/AnimatedButton';

const FilterSection = ({ 
  estimasi, 
  selectedFilter, 
  handleFilterChange, 
  cleaningCount, 
  repairCount 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bebas">
        {estimasi === "same_day"
          ? "Same Day"
          : estimasi === "next_day"
          ? "Next Day"
          : "Regular"}
      </h1>

      <div className="flex gap-2">
        <div className="relative">
          <AnimatedButton
            onClick={() => handleFilterChange("cleaning")}
            className={`ml-4 px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              selectedFilter === "cleaning"
                ? "bg-gradient-to-r from-[#5096FC] to-[#7BD1FD] text-white opacity-100"
                : "bg-[#E6EFF9] text-gray-600 opacity-100"
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
              />
            </svg>
            Cleaning
            {cleaningCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-[#FD8087] text-white rounded-full w-6 h-6 flex items-center justify-center font-montserrat text-xs">
                {cleaningCount}
              </div>
            )}
          </AnimatedButton>
        </div>
        <div className="relative">
          <AnimatedButton
            onClick={() => handleFilterChange("repair")}
            className={`ml-2 px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              selectedFilter === "repair"
                ? "bg-gradient-to-r from-[#5096FC] to-[#7BD1FD] text-white opacity-100"
                : "bg-[#E6EFF9] text-gray-600 opacity-100"
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" 
              />
            </svg>
            Repair
            {repairCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-[#FD8087] text-white rounded-full w-6 h-6 flex items-center justify-center font-montserrat text-xs">
                {repairCount}
              </div>
            )}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default FilterSection; 