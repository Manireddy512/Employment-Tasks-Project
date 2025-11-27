import React, { useEffect, useState } from 'react';
import API from '../api';


export default function TaskList() {
const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState('');
const [employeeId, setEmployeeId] = useState('');
const [employees, setEmployees] = useState([]);


const fetchData = async () => {
const t = await API.get('/tasks');
const e = await API.get('/employees');
setTasks(t.data);
setEmployees(e.data);
};


const addTask = async () => {
if (!title || !employeeId) return;
await API.post('/tasks', { title, employee_id: employeeId });
setTitle('');
setEmployeeId('');
fetchData();
};


useEffect(() => {
fetchData();
}, []);


return (
<div className="card">
<input
type="text"
placeholder="Task title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>


<select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
<option value="">Assign to employee</option>
{employees.map((e) => (
<option key={e.id} value={e.id}>{e.name}</option>
))}
</select>


<button onClick={addTask}>Add Task</button>


<ul>
{tasks.map((t) => (
<li key={t.id}>{t.title} — Assigned to Employee #{t.employee_id}</li>
))}
</ul>
</div>
);
}