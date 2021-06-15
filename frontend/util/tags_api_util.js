import axios from 'axios';



export const getTags = () => {
  return axios.get('/api/tags')
}

export const deleteTag = (tagId) => {
  return axios.delete('/api/tags', { data: {tagId} })
}
