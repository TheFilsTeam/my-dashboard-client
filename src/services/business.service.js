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

  // POST /api/SOMETHING
  createSOMETHING = requestBody => {
    return this.api.post('/api/SOMETHING', requestBody);
  };

  // GET /api/SOMETHING
  getAllSOMETHING = () => {
    return this.api.get('/api/SOMETHING');
  };

  // GET /api/SOMETHING/:id
  getSOMETHING = id => {
    return this.api.get(`/api/SOMETHING/${id}`);
  };

  // PUT /api/SOMETHING/:id
  updateSOMETHING = (id, requestBody) => {
    return this.api.put(`/api/SOMETHING/${id}`, requestBody);
  };

  // DELETE /api/SOMETHING/:id
  deleteSOMETHING = id => {
    return this.api.delete(`/api/SOMETHING/${id}`);
  };
}

// Create one instance object
const projectsService = new BusinessService();

export default projectsService;
