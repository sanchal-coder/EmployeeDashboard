import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false); 
  const [SearchKeyword, setSearchKeyword] = useState('')
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
    setSearchKeyword('')
  };

  const handleMultipleDelete = () => {
    const updatedEmployees = employees.filter(employee => !selectedIds.includes(employee.id));
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setSelectedIds([]);
    setSearchKeyword('')
  };

  const handleNext = () => {
    if (skip + limit < total) {
      setSkip((prevSkip) => prevSkip + limit);
    }

    setSearchKeyword('')
  };

  const handlePrevious = () => {
    if (skip > 0) {
      setSkip((prevSkip) => prevSkip - limit);
    }

    setSearchKeyword('')
  };

  return (
    <div className='flex flex-col gap-2 m-2'>
      <Search
        setFilteredEmployees={setFilteredEmployees}
        employees={employees}
        setNoResultsFound={setNoResultsFound}  setLoading={setLoading} SearchKeyword={SearchKeyword}  setSearchKeyword={setSearchKeyword}
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
          <div>Loading employee data...</div>
        ) : (
          filteredEmployees.map((employee) => (
            <div className="border border-black p-2 relative" key={employee.id}>
              <Link to={`/employee/${employee.id}`} className="employee-card">
                <img src={employee.image} alt="" />
                <h3>{employee.firstName} {employee.lastName}</h3>
                <p>Salary: ${employee.employee_salary}</p>
                <p>BloodGroup: {employee.bloodGroup}</p>
                <p>Age: {employee.age}</p>
                <p>Designation: {employee.company.title}</p>
                <p>Department: {employee.company.department}</p>
              </Link>

              <button onClick={(e) => handleDelete(employee.id, e)} className="absolute top-2 right-2">Delete</button>

              <input
                type="checkbox"
                checked={selectedIds.includes(employee.id)}
                onChange={() => handleCheckboxChange(employee.id)}
                className="absolute top-2 left-2"
              />
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={skip === 0}
          className="p-2 border border-black"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={skip + limit >= total}
          className="p-2 border border-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
