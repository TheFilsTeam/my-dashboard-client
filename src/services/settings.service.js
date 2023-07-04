import backendApi from "./backendApi.service";

class SettingsService {
	constructor() {
		this.api = backendApi;
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

	createTimer = (timerData) => {
		return this.api.post('/api/settings/timer', timerData);
	};

	updateTimer = (id, timerData) => {
		return this.api.put('/api/settings/timer/' + id, timerData);
	};

	deleteTimer = (id) => {
		return this.api.delete('/api/settings/timer/' + id);
	};
}

// Create one instance object
const settingsService = new SettingsService();

export default settingsService;
