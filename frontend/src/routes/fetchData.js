import axios from 'axios';
import routes from './routes.js';

const fetchData = async (getAuthHeader) => {
  const { data } = await axios.get(routes.data(), { headers: getAuthHeader() });
  return data;
};

export default fetchData;
