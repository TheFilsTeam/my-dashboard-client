import axios from 'axios';

class SettingsService {
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

  // POST /api/users
  // createUser = requestBody => {
  //   return this.api.post('/api/users', requestBody);
  // };

  // // GET /api/users
  // getAllUsers = () => {
  //   return this.api.get('/api/users');
  // };

  // GET /api/users/:id
  getSettings = () => {
    return this.api.get(`/api/settings`);
  };

  // PUT /api/user/:id
  updateSettings = (requestBody) => {
    return this.api.put(`/api/settings`, requestBody);
  };
}

// Create one instance object
const settingsService = new SettingsService();

export default settingsService;
