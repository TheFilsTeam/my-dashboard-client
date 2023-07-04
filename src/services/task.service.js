import backendApi from './backendApi.service';

class TaskService {
  constructor() {
    this.api = backendApi;
  }

  // POST /api/tasks
  createTask = requestBody => {
    return this.api.post('/api/tasks', requestBody);
  };

  // GET /api/tasks
  getAllTasks = () => {
    return this.api.get('/api/tasks');
  };

  // GET /api/tasks/:id
  getTasks = id => {
    return this.api.get(`/api/tasks/${id}`);
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

  // DELETE /api/tasks/:id
  deleteTask = id => {
    return this.api.delete(`/api/tasks/${id}`);
  };
}

// Create one instance object
const taskService = new TaskService();

export default taskService;
