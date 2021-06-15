import React, { useState, useEffect } from 'react'
import Results from './Results/Results'
import TagItem from './TagItem'
import styles from './SearchBar.module.css'
import { getGrants, getAllGrants } from '../../util/grants_api_util'
import { getTags } from '../../util/tags_api_util'
import { Animated } from "react-animated-css";


const SearchBar = () => {

  const [defaultSelected, setDefaultSelected] = useState(true)
  const [selectedTags, setSelectedTags] = useState([])
  const [title, setTitle] = useState('')
  const [results, setResults] = useState(null)
  const [sort, setSort] = useState('')
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTags().then((tags) => {
      setTags(Object.values(tags.data))
    })
  }, [])

  useEffect(() => {
    if (results) handleSubmit()
  }, [sort])
  

  const update = (type) => {
    switch (type) {
      case 'selectedTags':
        return (e) => {
          setSelectedTags([[e.currentTarget.value, e.currentTarget.selectedIndex], ...selectedTags])
          e.currentTarget.options[e.currentTarget.selectedIndex].disabled = true
          setDefaultSelected(true)
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
    e?.preventDefault()
    setLoading(true)
    const tags = selectedTags.map((tag) => tag[0])
    let sortOrder = ["createdAt", -1]
    if (sort) {
      sortOrder = JSON.parse(sort).val
    }
    const filters = [title, tags, sortOrder]
    getGrants({filters})
      .then((res) => {
        setTimeout(setLoading, 750, false)
        setResults(res.data)
      })
  }

  const removeTag = (e) => {
    const idxToRemove = e.currentTarget.parentElement.dataset.idx
    const optionIdx = e.currentTarget.parentElement.dataset.optionidx
    let newSelectedTags = [...selectedTags]
    newSelectedTags.splice(idxToRemove, 1)
    setSelectedTags(newSelectedTags)
    document.getElementById('tagSelect').options[optionIdx].disabled = false
    
  }

  return (
    <section className={styles.searchBarWrapper}>
      <form onSubmit={handleSubmit}>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <input placeholder="Search All Grants" className={styles.searchBar} value={title} onChange={update('title')} />
          <button type="submit">Search</button> 
        </Animated>
        <div className={styles.filtersWrapper}>
          <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
            <select id='tagSelect' className={styles.tagSelect} onChange={update('selectedTags')} >
              <option value="">Select Tag</option>
              {
                tags.map((tag) => {
                  return <option key={tag._id} value={tag.tag}>{tag.tag}</option>
                })
              }
            </select>
          </Animated>
          <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true} animationInDelay={300}>
            <select className={styles.tagSelect} value={sort} onChange={update('sort')}>
              <option value=''>Sort By</option>
              <option value='{"val": ["createdAt", -1]}'>Newest</option>
              <option value='{"val": ["createdAt", 1]}'>Oldest</option>
              <option value='{"val": ["maxAward", 1]}'>Lowest Amount</option>
              <option value='{"val": ["maxAward", -1]}'>Highest Amount</option>
              <option value='{"val": ["deadline", 1]}'>Soonest Deadline</option> 
            </select>
          </Animated>
        
        </div>
        <ul className={styles.selectedTagsWrap}>
          {
            selectedTags.map((tag, idx) => {
              return <TagItem removeTag={removeTag} optionIdx={tag[1]} index={idx} key={tag[0]} tag={tag[0]} />
            })
          }
        </ul>
      </form>
      {
       results !== null ? <Results loading={loading} results={results} /> : null
      }
    </section>
  )
}

export default SearchBar
