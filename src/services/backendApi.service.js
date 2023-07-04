import axios from "axios";

// Create a new instance of axios with a custom configuration
const backendApi =  axios.create({
    // We set our API's base URL so that all requests use the same base URL
    baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
  });

  // Automatically set JWT token in the headers for every request
  backendApi.interceptors.request.use(config => {
    // Retrieve the JWT token from the local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }

    return config;
  });

export default backendApi;