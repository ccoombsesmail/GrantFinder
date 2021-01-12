import React, { useState, useEffect } from 'react'
import { getTags } from '../../util/tags_api_util'

import styles from './DeleteTags.module.css'

const DeleteTags = () => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    getTags().then((allTags) => {
      setTags(Object.values(allTags.data))
    })
  }, [])

  return (
    <ul className={styles.tagsWrap}>
      {
        tags.map((tag, idx) => {
          return <li>
            {tag.tag}
            <button>Delete</button>
          </li>
        })
      }
    </ul>
  )
}

export default DeleteTags
