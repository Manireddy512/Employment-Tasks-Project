import React, { useEffect, useState } from 'react';
import API from '../api';


export default function EmployeeList() {
const [employees, setEmployees] = useState([]);
const [name, setName] = useState('');
const [role, setRole] = useState('');


const fetchEmployees = async () => {
const res = await API.get('/employees');
setEmployees(res.data);
};


const addEmployee = async () => {
if (!name || !role) return;
await API.post('/employees', { name, role });
setName('');
setRole('');
fetchEmployees();
};


useEffect(() => {
fetchEmployees();
}, []);


return (
<div className="card">
<input
type="text"
placeholder="Employee name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<input
type="text"
placeholder="Role"
value={role}
onChange={(e) => setRole(e.target.value)}
/>
<button onClick={addEmployee}>Add Employee</button>


<ul>
{employees.map((e) => (
<li key={e.id}>{e.name} — {e.role}</li>
))}
</ul>
</div>
);
}