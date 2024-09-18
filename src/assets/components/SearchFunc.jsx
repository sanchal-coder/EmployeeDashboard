import React, { useState } from 'react';
import Search from './Search';

const SearchFunc = ({ setFilteredEmployees, employees, setNoResultsFound, setLoading, SearchKeyword, setSearchKeyword }) => {



  const handleSearch = async (searchTerm) => {

    setSearchKeyword(searchTerm)

    setLoading(true)

    if (searchTerm == '') {
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
    <Search SearchKeyword={SearchKeyword} handleSearch={handleSearch} />
  );
};

export default SearchFunc;
