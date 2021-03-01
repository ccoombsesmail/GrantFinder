import React, { useState, useEffect } from 'react'
import { getTags, deleteTag } from '../../util/tags_api_util'

import styles from './DeleteTags.module.css'

const DeleteTags = () => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    getTags().then((allTags) => {
      setTags(Object.values(allTags.data))
    })
  }, [])

  const deleteTagHandler = (e) => {
    e.preventDefault()
    deleteTag(e.currentTarget.dataset.id).then((res) => {
      const deletedTag = res.data
      const newTags = []
      for (const tag of tags ) {
        if (!isEqual(tag, deletedTag)) {
          newTags.push(tag)
        }
      }
      setTags(newTags)
    })
  }

  return (
    <ul className={styles.tagsWrap}>
      {
        tags.map((tag, idx) => {
          return <li>
            {tag.tag}
            <button data-id={tag._id} onClick={deleteTagHandler}>Delete</button>
          </li>
        })
      }
    </ul>
  )
}

const isEqual = (object1, object2) => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }

  return true;
}

export default DeleteTags
