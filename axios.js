import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.PUBLIC_API_URL}`,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
