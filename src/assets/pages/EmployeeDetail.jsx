import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
    const { Id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`https://dummyjson.com/users/${Id}`)
        .then(response => response.json())
        .then(data => setEmployee(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [Id]);
  
    const handleBack = () => {
      navigate('/');
    };
  return (
    <div className="employee-detail">
    <h1>Employee Details</h1>
    {employee ? 
            (
            <div className="border border-black p-2" key={employee.id}>
                <img src={employee.image} alt="" />
                <h3>{employee.firstName} {employee.lastName}</h3>
                <p>Salary: ${employee.employee_salary} {employee.employee_salary}</p>
                <p>BloodGroup: {employee.bloodGroup}</p>
                <p>Age: {employee.age}</p>
                <p>Designation: {employee.company.title}</p>
                <p>Department: {employee.company.department}</p>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                <button>Edit</button>
            </div>
        )
     : (
      <p>Loading employee data...</p>
    )}
    <button onClick={handleBack}>Back to Dashboard</button>
  </div>


  )
}

export default EmployeeDetail
