import React, { useState } from 'react';

const Search = ({ setFilteredEmployees, employees, setNoResultsFound , setLoading , SearchKeyword , setSearchKeyword }) => {

  
  
  const handleSearch = async (searchTerm) => {
    
    setSearchKeyword(searchTerm)

    setLoading(true)

    if(searchTerm==''){
        setFilteredEmployees(employees)
        setNoResultsFound(false);
        setLoading(false);
        return
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    const result = employees.filter(emp => emp.id === parseInt(searchTerm));
    if (result.length > 0) {
      setFilteredEmployees(result);
      setNoResultsFound(false);
    } else {
      setFilteredEmployees([]);
      setNoResultsFound(true);
    }
  


    setLoading(false)
  
  };

  return (
    <div>
      <input
        className='border border-gray-400 py-1 px-2'
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        value={SearchKeyword}
        placeholder='Search Employee with ID'
      />
      <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
    </div>
  );
};

export default Search;
