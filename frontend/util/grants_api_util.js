import axios from 'axios';



export const getGrants = (tags) => {
  return axios.post('/api/grants', tags)
}



export const createGrant = (grant) => {
  return axios.post('/api/grants/admin/grants', grant)
}
