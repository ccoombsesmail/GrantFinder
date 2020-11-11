import axios from 'axios';



export const getGrants = (tags) => {
  return axios.post('/api/grants', tags)
}
