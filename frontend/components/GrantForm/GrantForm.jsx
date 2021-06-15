import React, { useState, useRef } from 'react'
import { withRouter } from "react-router-dom";

import useGetGrantEffect from './hooks/useGetGrantEffect.js'

import TagItem from '../SearchBar/TagItem'
import Loading from '../Loading/Index'

import { createGrant, editGrant } from '../../util/grants_api_util'
import getCurrencyOptions from './utils/getCurrencyOptions'

import styles from './GrantForm.module.css'
import tagInputStyles from '../SearchBar/SearchBar.module.css'
const GrantForm = ({ match }) => {
  const maxAwardInput = useRef(null);
  const [tags, setTags] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const [addTag, setAddTag] = useState('')
  const [newTags, setNewTags] = useState([])
  const [grantData, setGrantData] = useState({})
  let [loading, setLoading] = useState(false);

  useGetGrantEffect(setGrantData, setTags, setTagOptions, match.params.grantId, tagOptions)

  const currencyOptions = getCurrencyOptions()

  const update = (type) => {
    if (type === 'tags') {
        return (e) => {
        setTags([[e.currentTarget.value, e.currentTarget.selectedIndex], ...tags])
        e.currentTarget.options[e.currentTarget.selectedIndex].disabled = true
      } 
    } else if (type === 'addTag') {
        return (e) => {
        setAddTag(e.currentTarget.value)
      }
    } else {
      return (e) => {
        setGrantData( { ...grantData, [type]: e.currentTarget.value})
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const grant = {...grantData}
    grant.tags = tags.map((tag) => tag[0])
    grant.username = JSON.parse(localStorage.getItem('currentUser')).user.username
    grant.newTags = newTags
  
    match.params.grantId ? 
      editGrant(grant, grantData._id).then(() => setTimeout(setLoading, 2000, false)) : 
      createGrant(grant).then(() => setTimeout(setLoading, 2000, false))
  }

  const removeTag = (e) => {
    const idxToRemove = e.currentTarget.parentElement.dataset.idx
    const optionIdx = e.currentTarget.parentElement.dataset.optionidx
    let newSelectedTags = [...tags]
    newSelectedTags.splice(idxToRemove, 1)
    setTags(newSelectedTags)
    if (Number(optionIdx) !== -1) {
      document.getElementById('tagSelect').options[optionIdx].disabled = false
    } else {
      setNewTags(removeNewTag(e.currentTarget.parentElement.textContent.slice(1), newTags))
    }
  }

  const addNewTag = () => {
    setTags([[addTag, -1], ...tags])
    setNewTags([addTag, ...newTags])
    setAddTag('')
  }
  if (loading) return <Loading loading={loading}/>
  return (
    
    <div className={styles.grantFormWrapper}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1>
          { match.params.grantId ? 'Edit Grant' : 'Enter New Grant'}
        </h1>
        <label className={styles.formLabel}>
          <h4>Title</h4>
          <input
            required 
            maxLength={100}
            className={styles.formInput}
            type="text" 
            value={grantData.title || ''}
            onChange={update('title')}
            autoComplete="off" />
        </label>
        <label className={styles.formLabel}>
          <h4>Link</h4>
          <input
            className={styles.formInput}
            type="text"
            value={grantData.link || ''}
            onChange={update('link')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Payment Details</h4>
          <input
            className={styles.formInput}
            type="text"
            value={grantData.paymentDetails || ''}
            onChange={update('paymentDetails')} />
        </label>
        <div className={styles.awardWrapper}>
          <label className={styles.formLabel}>
            <h4>Max Award</h4>
            <input
              ref={maxAwardInput}
              className={styles.formInput}
              type="number"
              value={grantData.maxAward || ''}
              onChange={update('maxAward')} />
              
          </label>
          <label className={styles.formLabel}>
            <h4>Currency</h4>
            <select required={maxAwardInput?.current?.value} value={grantData.currency || ''} className={tagInputStyles.tagSelect} onChange={update('currency')} >
              <option value="">Select Currency</option>
              {
                currencyOptions.map((currency, idx) => {
                  return <option key={`currency${idx}`} value={currency}>{currency}</option>
                })
              }
            </select>
          </label>

        </div>
        <label className={styles.formLabel}>
          <h4>Deadline</h4>
          <input
            className={styles.formInput}
            type="date"
            value={grantData.deadline?.split('T')[0] || ''}
            onChange={update('deadline')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Disbursement</h4>
          <input
            className={styles.formInput}
            type="text"
            value={grantData.disbursement || ''}
            onChange={update('disbursement')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Status</h4>
          <input
            className={styles.formInput}
            type="text"
            value={grantData.status || ''}
            onChange={update('status')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Location Eligibility</h4>
          <input
            className={styles.formInput}
            type="text"
            value={grantData.location_elig || ''}
            onChange={update('location_elig')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Applicant Eligibility</h4>
          <input
            className={styles.formInput}
            type="text"
            value={grantData.applicant_elig || ''}
            onChange={update('applicant_elig')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Description</h4>
          <textarea
            className={styles.formInput}
            type="text"
            value={grantData.description || ''}
            onChange={update('description')} />
        </label>
        <select id='tagSelect' className={tagInputStyles.tagSelect} onChange={update('tags')} >
          <option value="">Select Tag</option>
          {
            tagOptions.map((tag, idx) => {
              return <option data-tag={tag.tag} data-id={idx+1} key={tag._id} value={tag.tag}>{tag.tag}</option>
            })
          }
        </select>
        <ul className={tagInputStyles.selectedTagsWrap}>
          {
            tags.map((tag, idx) => {
              return <TagItem removeTag={removeTag} optionIdx={tag[1]} index={idx} key={`tag[0].tag${idx}`} tag={tag[0]} />
            })
          }
        </ul>
        <label className={styles.formLabel}>
          <h4>Add Tag</h4>
          <input
            className={styles.formInput}
            type="text"
            value={addTag}
            onChange={update('addTag')} />
          <button onClick={addNewTag} type="button">Add Tag</button>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}




const removeNewTag = (tag, newTags) => {
  let newTagsToAdd = [...newTags]
  for (let i = 0; i < newTagsToAdd.length; i++) {
    if (tag === newTagsToAdd[i]) {
      newTagsToAdd.splice(i, 1)
      return newTagsToAdd
    }
  }
  return newTagsToAdd
}
export default withRouter(GrantForm)
