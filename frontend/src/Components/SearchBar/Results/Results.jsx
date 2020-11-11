import React from 'react'
import styles from './Results.module.css'

const Result = ({ results }) => {
  return (
    <div className={styles.resultsWrapper}>
      <ul>
      {
        results.map((result) => {
          return (
            <li>
              <h1>
              {`Title: ${result.grant_title}`}  
              </h1>
              <div className={styles.resultsDetails}>
                <h4>
                  Summary: .....
                </h4>
                <h4>
                 {`Amount: $${result.amount}`}
                </h4>
              </div>
              <div className={styles.resultsDetails}>
              <h4>
                {`Tags: ${result.tags}`}
              </h4>
              <h3>
                {`Created At: ${result.createdAt.split('T')[0]}`}
              </h3>
              </div>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default Result
