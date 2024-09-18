import React from 'react';
import Loader from './Loader';

const GridLoader = ({ count = 15 }) => {
  const loaderItems = Array.from({ length: count });

  return (
    <div className="grid  sm:grid-cols-5 grid-cols-1 gap-4">
      {loaderItems.map((_, index) => (
        <Loader key={index} />
      ))}
    </div>
  );
};

export default GridLoader;