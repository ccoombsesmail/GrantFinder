import React, { useState, useEffect } from 'react'
import styles from './Results.module.css'
import { Animated } from "react-animated-css";
import { withRouter, Link } from "react-router-dom";
import Loading from '../../Loading/Index';

const Result = ({ results, loading }) => {
  const [isVis, setIsVis] = useState(true)
  const loggedIn = useState(JSON.parse(localStorage.getItem('currentUser') || '{}').isAuthenticated)

  useEffect(() => {
    setIsVis(false)
    setTimeout(() => setIsVis(true), 100)
  }, [results])

  if (loading) return <Loading loading={loading}/>

  return (
    <>
    <div className={styles.resultsWrapper}>
      {
        results.length === 0 ? (
          <div>
            No Results
          </div>
        ) : (
          <ul>
          {
            results.map(({tags, deadline, title, _id, paymentDetails, maxAward, currency, description, link }, idx) => {
              let formattedTags = tags.map((tag) => {
                if (tag) {
                  return tag.tag
                }
              })
              const date = new Date(deadline)
              const formattedDeadline = deadline ? (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() : "No Deadline Specified"
              
              return (
              <Animated key={_id} animationIn="fadeInUp" animationOut="fadeOut" isVisible={isVis} animationInDelay={200*Math.sqrt(idx)}>
                <li>
                  {
                    (loggedIn && location.pathname === '/admin/editgrant') ? (
                      <Link className={styles.editButton} to={`/admin/editgrant/${_id}`}>Edit</Link>
                    ) : null
                  }
                  <div className={styles.resultsDetailsLeft}>
                    <h1>
                      {`${
                        title}`}  
                    </h1>
                    <h5>
                      <span>Max Award</span> 
                        {`${currency ? currency : 'N/A'}${maxAward === 0 ||  maxAward === undefined  ? '' : Number(maxAward)?.toLocaleString('en')}`}
                    </h5>
                    <h5>
                      <span>Payment Details</span> 
                      {
                      paymentDetails ? paymentDetails : 'N/A' }
                    </h5>
                    <h5>
                      <span>Deadline</span> 
                      {formattedDeadline}
                    </h5>
                    <h5>
                      <span>Tags</span> 
                      {formattedTags.join(", ")}
                    </h5>
                    <h5>
                      <span>Link</span> 
                      <a href={link} target='_blank'>
                        {`${link ? link : ''}`}
                      </a>
                    </h5>
                  </div>
                  <div className={styles.resultsDetailsRight}>
                  <p>
                    <b>Summary:</b> <br></br>{description}
                  </p>
                  </div>
                </li>
              </Animated>
              )
            })
          }
          </ul>
        )
      }
    </div>
    <div className={styles.fillerDiv}>.</div>
    </>
  )
}

export default withRouter(Result)
