import axios from 'axios';



export const getTags = () => {
  return axios.get('/api/tags')
}

export const deleteTag = (tagId) => {
  console.log(tagId)
  return axios.delete('/api/tags', { data: {tagId} })
}
