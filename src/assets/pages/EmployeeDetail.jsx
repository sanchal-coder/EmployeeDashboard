import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard'; 
import Loader from '../components/Loader';

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

    const handleDelete = (id) => {
    
    };

    return (
      <div className="employee-detail">
        <h1>Employee Details</h1>
        {employee ? (
          <div key={employee.id}>
            <EmployeeCard
              image={employee.image}
              name={`${employee.firstName} ${employee.lastName}`}
              designation={employee.company.title}
              department={employee.company.department}
              bloodGroup={employee.bloodGroup}
              age={employee.age}
              salary={employee.employee_salary}
            />
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
            <button>Edit</button>
          </div>
        ) : (
          <Loader />
        )}
        <button onClick={handleBack}>Back to Dashboard</button>
      </div>
    );
}

export default EmployeeDetail;
