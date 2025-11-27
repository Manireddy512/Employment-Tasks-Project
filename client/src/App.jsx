import React from 'react';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import TaskList from './components/TaskList';


const App = () => {
return (
<div>
<Navbar />


<div className="container">
<h2>Employees</h2>
<EmployeeList />


<h2>Tasks</h2>
<TaskList />
</div>
</div>
);
};


export default App;