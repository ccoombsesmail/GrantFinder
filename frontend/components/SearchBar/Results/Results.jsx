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
            results.map((result, idx) => {
              let tags = result.tags.map((tag) => {
                if (tag) {
                  return tag.tag
                }
              })
              const date = new Date(result.deadline)
              let deadline = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
              if (date.getFullYear() === 2050) {
                deadline = 'No Deadline Specified'
              }
              return (
              <Animated key={result._id} animationIn="fadeInUp" animationOut="fadeOut" isVisible={isVis} animationInDelay={200*Math.sqrt(idx)}>
                <li>
                  {
                    (loggedIn && location.pathname === '/admin/editgrant') ? (
                      <Link className={styles.editButton} to={`/admin/editgrant/${result._id}`}>Edit</Link>
                    ) : null
                  }
                  <div className={styles.resultsDetailsLeft}>
                    <h1>
                      {`${result.title}`}  
                    </h1>
                    <h5>
                      <span>Max Award</span> 
                        {`${result.currency ? result.currency : 'N/A'}${result.maxAward === 0 || result.maxAward === undefined  ? '' : Number(result.maxAward)?.toLocaleString('en')}`}
                    </h5>
                    <h5>
                      <span>Payment Details</span> 
                      {result.paymentDetails ? result.paymentDetails : 'N/A' }
                    </h5>
                    <h5>
                      <span>Deadline</span> 
                      {deadline}
                    </h5>
                    <h5>
                      <span>Tags</span> 
                      {tags.join(", ")}
                    </h5>
                    <h5>
                      <span>Link</span> 
                      <a href={result.link} target='_blank'>
                        {` ${result.link}`}
                      </a>
                    </h5>
                  </div>
                  <div className={styles.resultsDetailsRight}>
                  <p>
                    <b>Summary:</b> <br></br>{result.description}
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
