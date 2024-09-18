import React from 'react';

const Loader = ({ className }) => {
  return (
    <div className={`flex flex-col bg-[#F8FAFC] rounded-2xl w-[300px] h-[300px] p-3 gap-3 items-center ${className}`}>
      <div className="flex flex-col justify-center items-start gap-2 self-start">
        <div className="flex flex-col items-center gap-2">
          <div className="skeleton w-14 h-14 rounded-full"></div>
          <div className="skeleton w-24 h-4"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="skeleton w-20 h-4"></div>
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-2xl w-[280px] h-[160px] p-3 pl-2 pr-2 gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col items-center gap-1">
            <div className="skeleton w-20 h-4"></div>
            <div className="skeleton w-24 h-4"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="skeleton w-20 h-4"></div>
            <div className="skeleton w-24 h-4"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="skeleton w-5 h-5"></div>
            <div className="skeleton w-16 h-4"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="skeleton w-5 h-5"></div>
            <div className="skeleton w-16 h-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;