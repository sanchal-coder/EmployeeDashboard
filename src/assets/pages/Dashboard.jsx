import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';
import GridLoader from '../components/GridLoader';
import Pagination from '../components/Pagination'; 
import SearchFunc from '../components/SearchFunc';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [SearchKeyword, setSearchKeyword] = useState('');
  const limit = 30;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const result = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await result.json();
      console.log(data);

      setEmployees(data.users);
      setFilteredEmployees(data.users);
      setTotal(data.total);

      setLoading(false);
    };

    fetchUser();
  }, [skip]);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setSearchKeyword('');
  };

  const handleMultipleDelete = () => {
    const updatedEmployees = employees.filter(employee => !selectedIds.includes(employee.id));
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setSelectedIds([]);
    setSearchKeyword('');
  };

  const handleNext = () => {
    if (skip + limit < total) {
      setSkip((prevSkip) => prevSkip + limit);
    }
    setSearchKeyword('');
  };

  const handlePrevious = () => {
    if (skip > 0) {
      setSkip((prevSkip) => prevSkip - limit);
    }
    setSearchKeyword('');
  };

  return (
    <div className='flex flex-col gap-2 m-2'>
      <SearchFunc
        setFilteredEmployees={setFilteredEmployees}
        employees={employees}
        setNoResultsFound={setNoResultsFound}
        setLoading={setLoading}
        SearchKeyword={SearchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      {noResultsFound && (
        <div className="text-red-500">No results found</div>
      )}

      {selectedIds.length > 0 && (
        <button onClick={handleMultipleDelete} className="bg-red-500 text-white p-2 mb-2">
          Delete Selected ({selectedIds.length})
        </button>
      )}

      <div className='flex gap-2 flex-wrap'>
        {loading ? (
          <GridLoader />
        ) : (
          filteredEmployees.map((employee) => (
            <div className="p-2 relative" key={employee.id}>
              <Link to={`/employee/${employee.id}`} className="employee-card">
                <EmployeeCard className="hover:bg-gray-100"
                  image={employee.image}
                  name={`${employee.firstName} ${employee.lastName}`}
                  designation={employee.company.title}
                  department={employee.company.department}
                  bloodGroup={employee.bloodGroup}
                  age={employee.age}
                  salary={employee.employee_salary}
                />
              </Link>

              <button onClick={(e) => handleDelete(employee.id, e)} className="absolute top-4 right-4">Delete</button>

              <input
                type="checkbox"
                checked={selectedIds.includes(employee.id)}
                onChange={() => handleCheckboxChange(employee.id)}
                className="absolute top-4 left-4"
              />
            </div>
          ))
        )}
      </div>

      <Pagination
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        skip={skip}
        limit={limit}
        total={total}
      />
    </div>
  );
};

export default Dashboard;
