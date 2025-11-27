import axios from 'axios';

const API = axios.create({
  baseURL: 'https://employment-tasks-project-1.onrender.com'
});

export default API;
