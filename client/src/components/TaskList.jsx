import React, { useState, useEffect } from 'react';
import API from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const fetchEmployees = async () => {
    const res = await API.get('/employees');
    setEmployees(res.data);
  };

  const updateTask = async (id, field, value) => {
    await API.patch(`/tasks/${id}`, { [field]: value });
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignedTo?.name || 'Unassigned'}</td>
              <td>{task.status}</td>
              <td>
                <select
                  value={task.status}
                  onChange={e => updateTask(task.id, 'status', e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
