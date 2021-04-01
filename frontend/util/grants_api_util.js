import axios from 'axios';



export const getGrants = (tags) => {
  return axios.post('/api/grants', tags)
}
export const getAllGrants = () => {
  return axios.get('/api/grants')
}


export const getGrant = (grantId) => {
  return axios.get(`/api/grants/${grantId}`, { params: { grantId } })
}


export const uploadGrantData = (grants) => {
  return axios.post('/api/grants/upload', { grants })
}

export const createGrant = (grant) => {
  return axios.post('/api/grants/admin/grants', {grant})
}

export const editGrant = (grant, id) => {
  return axios.post(`/api/grants/admin/grants/edit`, {grant}, {params: {id}})
}