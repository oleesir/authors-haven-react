import axios from '../../axios';

const AuthService = {
	signupUser(formData) {
		return axios.post('/auth/signup', formData);
	},
	loginUser(formData) {
		return axios.post('/auth/signin', formData);
	},
	loggedIn() {
		return axios.get('/auth/loggedin');
	},
};

export default AuthService;
