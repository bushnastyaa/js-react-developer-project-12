import axios from 'axios';
import routes from './routes.js';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const fetchData = async () => {
  const { data } = await axios.get(routes.data(), { headers: getAuthHeader() });
  return data;
};

export default fetchData;
