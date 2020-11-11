import React, { useState } from 'react'
import Results from './Results/Results'
import styles from './SearchBar.module.css'
import { getGrants } from '../../util/grants_api_util'


const SearchBar = () => {

  const [department, setDepartment] = useState('')
  const [title, setTitle] = useState('')
  const [results, setResults] = useState([])

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
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const filters = [title, [department]]
    getGrants({filters})
      .then((res) => {
        console.log(res)
        setResults(res.data)
      })
  }

  return (
    <section className={styles.searchBarWrapper}>
      <form onSubmit={handleSubmit}>
        <input placeholder="Search For Grants" className={styles.searchBar} value={title} onChange={update('title')} />
        <div className={styles.tagWrapper}>
          <select className={styles.departmentSelect} value={department} onChange={update('department')} >
            <option value="" selected disabled>Select Department</option>
            <option value="physics">Physics</option>
            <option value="Engineering">Engineering</option>
            <option value="Something">Something</option>
          </select>
          <select className={styles.departmentSelect} >
            <option value="" selected disabled hidden>Sort By</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="high">Highest Amount</option>
          </select>
        </div>
      </form>
      {
       results.length !== 0 ? <Results results={results} /> : null
      }
    </section>
  )
}

export default SearchBar
