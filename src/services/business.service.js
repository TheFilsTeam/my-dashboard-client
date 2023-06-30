import axios from 'axios';

class BusinessService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/tasks
  createTask = requestBody => {
    return this.api.post('/api/tasks', requestBody);
  };

  // GET /api/tasks
  getAllTasks = () => {
    return this.api.get('/api/tasks');
  };

  // GET /api/SOMETHING/:id
  getSOMETHING = id => {
    return this.api.get(`/api/SOMETHING/${id}`);
  };

  updateTaskStatus = (id, done) => {
    return this.api.put(`/api/tasks/${id}/status`, {done});
  };

setTaskInProgress = id => {
    return this.updateTask(id, {finishedDate: null})
  }

  // PUT /api/task/:id
  updateTask = (id, requestBody) => {
    return this.api.put(`/api/tasks/${id}`, requestBody);
  };

  // DELETE /api/SOMETHING/:id
  deleteSOMETHING = id => {
    return this.api.delete(`/api/SOMETHING/${id}`);
  };
}

// Create one instance object
const businessService = new BusinessService();

export default businessService;
