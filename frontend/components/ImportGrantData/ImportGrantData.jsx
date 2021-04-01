import React, { useState } from 'react'
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { uploadGrantData } from '../../util/grants_api_util'
import styles from './ImportGrantData.module.css'
import Loader from "react-loader-spinner";

const ImportGrantData = () => {

  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])
  const [loading, setLoading] = useState(false)

 
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    setLoading(true)
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        const colNames = resp.rows[0]
        const rows = resp.rows.slice(1)
        const grants = formatData(colNames, rows)
        // setCols(resp.rows[0])
        // setRows(resp.rows.slice())
        uploadGrantData(grants).then(() => {
          alert("Successfully Uploaded")
          setLoading(false)            
        })
      }
    });

  }
  
  return (
    <>
      <Loader
        className={styles.loader}
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={30000}
        visible={loading}
      />
    <input className={styles.fileUpload} type="file" onChange={fileHandler.bind(this)} style={{ "padding": "10px" }} />
    {/* <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /> */}
    </>
  )
}


const formatData = (cols, rows) => {
  const grants = []
  for (const row of rows) {
    let grant = {}
    for (let i = 0; i < cols.length; i++) {
      if (cols[i] === '_id' || cols[i] === 'updatedAt' || cols[i] === 'createdAt') continue
      if (cols[i] === 'tags') {
        if (row[i]) {
          grant[cols[i]] = row[i].split(',')
        } else {
          grant[cols[i]] = []
        }
        continue
      }
      grant[cols[i]] = row[i] || ''
    }
    grants.push(grant)
  }
  return grants
}

export default ImportGrantData
