import React, { useState, useEffect } from 'react'
import Results from './Results/Results'
import styles from './SearchBar.module.css'
import { getGrants } from '../../util/grants_api_util'
import { getTags } from '../../util/tags_api_util'
import { Animated } from "react-animated-css";


const SearchBar = () => {

  const [department, setDepartment] = useState('')
  const [title, setTitle] = useState('')
  const [results, setResults] = useState(null)
  const [sort, setSort] = useState('{"val": ["createdAt", -1]}')
  const [tags, setTags] = useState([])

  useEffect(() => {
    getTags().then((tags) => {
      setTags(Object.values(tags.data))
    })
  }, [])
  

  const update = (type) => {
    switch (type) {
      case 'department':
        return (e) => {
          setDepartment(e.currentTarget.value)
        }  
      case 'title':
        return (e) => {
          setTitle(e.currentTarget.value)
        }   
      case 'sort':
        return (e) => {
          setSort(e.currentTarget.value)
        }   
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(JSON.parse(sort))
    const filters = [title, [department], JSON.parse(sort).val]
    getGrants({filters})
      .then((res) => {
        console.log(res)
        setResults(res.data)
      })
  }

  return (
    <section className={styles.searchBarWrapper}>
      <form onSubmit={handleSubmit}>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <input placeholder="Search For Grants" className={styles.searchBar} value={title} onChange={update('title')} />
        </Animated>
        <div className={styles.tagWrapper}>
          <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
            <select className={styles.departmentSelect} value={department} onChange={update('department')} >
              <option value="" selected disabled>Select Tag</option>
              {
                tags.map((tag) => {
                  return <option key={tag._id} value={tag.tag}>{tag.tag}</option>
                })
              }
    
            </select>
          </Animated>
          <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true} animationInDelay={300}>
            <select className={styles.departmentSelect} value={sort} onChange={update('sort')}>
              <option value="" selected disabled>Sort By</option>
              <option value='{"val": ["createdAt", -1]}'>Newest</option>
              <option value='{"val": ["createdAt", 1]}'>Oldest</option>
              <option value='{"val": ["amount", -1]}'>Highest Amount</option>
              <option value='{"val": ["amount", 1]}'>Lowest Amount</option>
            </select>
          </Animated>
        </div>
      </form>
      {
       results !== null ? <Results results={results} /> : null
      }
    </section>
  )
}

export default SearchBar
