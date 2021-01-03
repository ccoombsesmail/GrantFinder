import React, { useState, useEffect } from 'react'
import styles from './GrantForm.module.css'
import tagInputStyles from '../SearchBar/SearchBar.module.css'
import { createGrant } from '../../util/grants_api_util'
import TagItem from '../SearchBar/TagItem'
import { getTags } from '../../util/tags_api_util'
import { withRouter } from "react-router-dom";

const GrantForm = ({ location }) => {

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [link, setLink] = useState('')
  const [deadline, setDeadline] = useState('')
  const [disbursement, setDisbursement] = useState('')
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState('')
  const [applicantelig, setApplicantelig] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [tagOptions, setTagOptions] = useState([])

  useEffect(() => {
    getTags().then((allTags) => {
      setTagOptions(Object.values(allTags.data))
    })
    if (location.pathname === '/admin/editgrant/' ) {

    }
  }, [])


  const update = (type) => {
    switch (type) {
      case 'title':
        return (e) => {
          setTitle(e.currentTarget.value)
        }
      case 'amount':
        return (e) => {
          setAmount(e.currentTarget.value)
        }
      case 'link':
        return (e) => {
          setLink(e.currentTarget.value)
        }
      case 'deadline':
        return (e) => {
          setDeadline(e.currentTarget.value)
        }
      case 'disbursement':
        return (e) => {
          setDisbursement(e.currentTarget.value)
        }
      case 'status':
        return (e) => {
          setStatus(e.currentTarget.value)
        }
      case 'location':
        return (e) => {
          setLocation(e.currentTarget.value)
        }
      case 'applicantelig':
        return (e) => {
          setApplicantelig(e.currentTarget.value)
        }
      case 'tags':
        return (e) => {
          setTags([[e.currentTarget.value, e.currentTarget.selectedIndex], ...tags])
          e.currentTarget.options[e.currentTarget.selectedIndex].disabled = true
        } 
      case 'description':
        return (e) => {
          setDescription(e.currentTarget.value)
      }
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const grant = {
      title,
      tags,
      amount,
      link,
      deadline,
      disbursement,
      status,
      location,
      applicantelig,
      description,
      username: JSON.parse(localStorage.getItem('currentUser')).user.username 
    }
    createGrant(grant).then((res) => console.log(res))
  }

  const removeTag = (e) => {
    const idxToRemove = e.currentTarget.parentElement.dataset.idx
    const optionIdx = e.currentTarget.parentElement.dataset.optionidx
    let newSelectedTags = [...tags]
    newSelectedTags.splice(idxToRemove, 1)
    setTags(newSelectedTags)
    document.getElementById('tagSelect').options[optionIdx].disabled = false
  }

  return (
    
    <div className={styles.grantFormWrapper}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1>
          Enter New Grant
        </h1>
        <label className={styles.formLabel}>
          <h4>Title</h4>
          <input
            maxLength={100}
            className={styles.formInput}
            type="text" value={title}
            onChange={update('title')}
            autoComplete="off" />
        </label>
        <label className={styles.formLabel}>
          <h4>Link</h4>
          <input
            className={styles.formInput}
            type="text"
            value={link}
            onChange={update('link')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Amount</h4>
          <input
            className={styles.formInput}
            type="text"
            value={amount}
            onChange={update('amount')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Deadline</h4>
          <input
            className={styles.formInput}
            type="text"
            value={deadline}
            onChange={update('deadline')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Disbursement</h4>
          <input
            className={styles.formInput}
            type="text"
            value={disbursement}
            onChange={update('disbursement')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Status</h4>
          <input
            className={styles.formInput}
            type="text"
            value={status}
            onChange={update('status')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Location Eligibility</h4>
          <input
            className={styles.formInput}
            type="text"
            value={location}
            onChange={update('location')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Applicant Eligibility</h4>
          <input
            className={styles.formInput}
            type="text"
            value={applicantelig}
            onChange={update('applicantelig')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Description</h4>
          <textarea
            className={styles.formInput}
            type="text"
            value={description}
            onChange={update('description')} />
        </label>
        <select id='tagSelect' className={tagInputStyles.tagSelect} value={tags} onChange={update('tags')} >
          <option value="">Select Tag</option>
          {
            tagOptions.map((tag) => {
              return <option key={tag._id} value={tag.tag}>{tag.tag}</option>
            })
          }
        </select>
        <ul className={tagInputStyles.selectedTagsWrap}>
          {
            tags.map((tag, idx) => {
              return <TagItem removeTag={removeTag} optionIdx={tag[1]} index={idx} key={tag[0]} tag={tag[0]} />
            })
          }
        </ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default withRouter(GrantForm)
