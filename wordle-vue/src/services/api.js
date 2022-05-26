import axios from 'axios';

export default () => {
  return axios.create(
      {
        baseURL: 'http://62.113.107.12:8282/api',
      }
  );
};
