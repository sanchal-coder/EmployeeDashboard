import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './assets/pages/Dashboard'
import EmployeeDetail from './assets/pages/EmployeeDetail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Router>
    <Routes>
    <Route path="/"  element={<Dashboard/>} />
       <Route path="/employee/:Id"  element={<EmployeeDetail/>} />
    </Routes>
  </Router>
    
   </>
  )
}

export default App
