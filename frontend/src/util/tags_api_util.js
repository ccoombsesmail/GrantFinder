import axios from 'axios';



export const getTags = () => {
  return axios.get('/api/tags')
}
