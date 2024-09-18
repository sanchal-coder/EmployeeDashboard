import React from 'react';

const Pagination = ({ handlePrevious, handleNext, skip, limit, total }) => {
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-between items-center mt-4 p-4 bg-white shadow-md rounded-lg">
      <button
        onClick={handlePrevious}
        disabled={skip === 0}
        className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        Previous
      </button>
      <div className="text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={handleNext}
        disabled={skip + limit >= total}
        className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;