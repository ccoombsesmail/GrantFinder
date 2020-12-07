import React, { useState, useEffect } from 'react'
import styles from './Results.module.css'
import { Animated } from "react-animated-css";

const Result = ({ results }) => {

  const [isVis, setIsVis] = useState(true)

  useEffect(() => {
    setIsVis(false)
    setTimeout(() => setIsVis(true), 100)
  }, [results])

  return (
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
              return (
              <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={isVis} animationInDelay={200*idx}>
                <li>
                  <div className={styles.resultsDetailsLeft}>
                    <h1>
                    {`${result.title}`}  
                    </h1>
                    {/* <h3>
                      {`Organization: ...`}
                    </h3> */}
                    <h5>
                    {`Amount: ${result.amount}`}
                    </h5>
                    <h5>
                      {`Deadline: ${result.deadline}`}
                    </h5>
                    <h5>
                      {`Tags: ${result.tags}`}
                    </h5>
                    <h5>
                      {`Link: ${result.links}`}
                    </h5>
                    <h5>
                      {`Created At: ${result.createdAt.split('T')[0]}`}
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
  )
}

export default Result
